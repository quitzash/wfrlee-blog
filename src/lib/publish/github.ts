import { Octokit } from '@octokit/rest';
import { serverEnv } from '@/lib/env';

type OctokitClient = InstanceType<typeof Octokit>;

async function resolveBranchSha(
  octokit: OctokitClient,
  owner: string,
  repo: string,
  defaultBranch: string,
  requested: string | undefined,
): Promise<{ branch: string; sha: string }> {
  let lastRefError: unknown = null;
  const tryRef = async (branch: string) => {
    try {
      const { data } = await octokit.rest.git.getRef({ owner, repo, ref: `heads/${branch}` });
      return data.object.sha;
    } catch (error) {
      lastRefError = error;
      return null;
    }
  };

  // Commit to the repo's real default branch (authoritative). GITHUB_BRANCH is
  // only an override for non-default workflows — a stale value like "main" is
  // never allowed to fail the publish or shadow the actual branch.
  const branchOrder = [defaultBranch];
  if (requested && requested !== defaultBranch) branchOrder.push(requested);

  // Report branchOrder, not the stale requested value, when everything fails.
  const branchLabel = branchOrder.join('", "');
  for (const branch of branchOrder) {
    const sha = await tryRef(branch);
    if (sha) return { branch, sha };
  }

  const status = Number((lastRefError as any)?.status);
  const rawMessage = lastRefError instanceof Error ? lastRefError.message : String(lastRefError ?? '');
  const hint = [401, 403].includes(status)
    ? ' The token cannot read refs — give it "Contents: Read and write" access to this repository.'
    : status === 404
      ? ' The branch does not exist, or the token cannot read refs on this repository (private repos need "Contents: Read and write").'
      : '';
  throw new Error(
    `Could not resolve branch "${branchLabel}" on ${owner}/${repo}` +
      (status ? ` (HTTP ${status})` : '') +
      (rawMessage ? ` Detail: ${rawMessage.slice(0, 240)}` : '') +
      hint,
  );
}

interface RepoContext {
  octokit: OctokitClient;
  owner: string;
  repo: string;
  branch: string;
  headSha: string;
}

/** Validate config + token, resolve the target branch, and return a ready client. */
async function repoContext(): Promise<RepoContext> {
  const token = serverEnv('GITHUB_TOKEN')?.trim();
  const repoEnv = (serverEnv('GITHUB_REPO') ?? '').trim();
  if (!token) throw new Error('GITHUB_TOKEN is not set');

  const parts = repoEnv.split('/').map((part) => part.trim()).filter(Boolean);
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new Error('GITHUB_REPO must be in format "owner/repo" (e.g. quitzash/wfrlee-blog)');
  }
  const [owner, repo] = parts;

  const octokit = new Octokit({ auth: token });

  // Validate the repo + token up front so access problems are reported clearly.
  let defaultBranch: string;
  try {
    const { data } = await octokit.rest.repos.get({ owner, repo });
    defaultBranch = data.default_branch;
  } catch (e: any) {
    const status = Number(e?.status);
    if (status === 404) {
      throw new Error(
        `Repository "${owner}/${repo}" was not found or GITHUB_TOKEN cannot access it. ` +
          `Check GITHUB_REPO, and make sure the token has access to this repository ` +
          `(fine-grained tokens must list it under Repository access with "Contents: Read and write").`,
      );
    }
    if (status === 401) throw new Error('GITHUB_TOKEN is invalid or expired. Generate a new token.');
    if (status === 403) {
      throw new Error('GITHUB_TOKEN is missing a required permission (needs "Contents: Read and write").');
    }
    throw new Error(`GitHub repo lookup failed for ${owner}/${repo}: ${e?.message ?? e}`);
  }

  const { branch, sha } = await resolveBranchSha(
    octokit,
    owner,
    repo,
    defaultBranch,
    serverEnv('GITHUB_BRANCH')?.trim(),
  );
  return { octokit, owner, repo, branch, headSha: sha };
}

function committer() {
  return {
    name: serverEnv('GITHUB_COMMITTER_NAME') ?? 'Wfrlee AI',
    email: serverEnv('GITHUB_COMMITTER_EMAIL') ?? 'info@wfrlee.com',
  };
}

export async function commitMarkdownFile(path: string, content: string, message: string) {
  const { octokit, owner, repo, branch, headSha } = await repoContext();
  const { name, email } = committer();

  const { data: commit } = await octokit.rest.git.getCommit({ owner, repo, commit_sha: headSha });
  const { data: blob } = await octokit.rest.git.createBlob({ owner, repo, content, encoding: 'utf-8' });
  const { data: tree } = await octokit.rest.git.createTree({
    owner,
    repo,
    base_tree: commit.tree.sha,
    tree: [{ path, type: 'blob', mode: '100644', sha: blob.sha }],
  });
  const { data: newCommit } = await octokit.rest.git.createCommit({
    owner,
    repo,
    message,
    tree: tree.sha,
    parents: [headSha],
    author: { name, email },
    committer: { name, email },
  });
  await octokit.rest.git.updateRef({ owner, repo, ref: `heads/${branch}`, sha: newCommit.sha });
  return { commitSha: newCommit.sha, branch };
}

/** List the markdown files directly inside a repository directory. */
export async function listMarkdownFiles(dir: string): Promise<{ path: string; name: string }[]> {
  const { octokit, owner, repo, branch } = await repoContext();
  const { data } = await octokit.rest.repos.getContent({ owner, repo, path: dir, ref: branch });
  if (!Array.isArray(data)) throw new Error(`Expected a directory at "${dir}"`);
  return data
    .filter((entry) => entry.type === 'file' && /\.(md|mdx)$/i.test(entry.name))
    .map((entry) => ({ path: entry.path, name: entry.name }));
}

/** Read a single file's raw text content. */
export async function readMarkdownFile(path: string): Promise<string> {
  const { octokit, owner, repo, branch } = await repoContext();
  const { data } = await octokit.rest.repos.getContent({ owner, repo, path, ref: branch });
  if (Array.isArray(data) || data.type !== 'file') throw new Error(`Expected a file at "${path}"`);
  return Buffer.from(data.content, 'base64').toString('utf-8');
}

/** Commit the deletion of a file from the branch. */
export async function deleteMarkdownFile(path: string, message: string) {
  const { octokit, owner, repo, branch, headSha } = await repoContext();
  const { name, email } = committer();

  const { data: commit } = await octokit.rest.git.getCommit({ owner, repo, commit_sha: headSha });
  const { data: tree } = await octokit.rest.git.createTree({
    owner,
    repo,
    base_tree: commit.tree.sha,
    // A null sha removes the path from the tree.
    tree: [{ path, mode: '100644', type: 'blob', sha: null as unknown as string }],
  });
  const { data: newCommit } = await octokit.rest.git.createCommit({
    owner,
    repo,
    message,
    tree: tree.sha,
    parents: [headSha],
    author: { name, email },
    committer: { name, email },
  });
  await octokit.rest.git.updateRef({ owner, repo, ref: `heads/${branch}`, sha: newCommit.sha });
  return { commitSha: newCommit.sha, branch };
}