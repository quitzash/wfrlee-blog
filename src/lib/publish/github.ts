import { Octokit } from '@octokit/rest';
import { serverEnv } from '@/lib/env';

type OctokitClient = InstanceType<typeof Octokit>;

async function resolveBranch(
  octokit: OctokitClient,
  owner: string,
  repo: string,
  requested: string | undefined,
): Promise<{ branch: string; sha: string }> {
  const tryRef = async (branch: string) => {
    try {
      const { data } = await octokit.rest.git.getRef({ owner, repo, ref: `heads/${branch}` });
      return data.object.sha;
    } catch {
      return null;
    }
  };

  // Prefer the configured branch, but tolerate a stale value (e.g. "main" on a
  // repo whose default is "master") by falling back to the repo's default branch.
  if (requested) {
    const sha = await tryRef(requested);
    if (sha) return { branch: requested, sha };
  }

  const { data: repoData } = await octokit.rest.repos.get({ owner, repo });
  const fallback = repoData.default_branch;
  const sha = await tryRef(fallback);
  if (!sha) {
    throw new Error(`Could not resolve branch "${requested ?? fallback}" on ${owner}/${repo}`);
  }
  return { branch: fallback, sha };
}

export async function commitMarkdownFile(path: string, content: string, message: string) {
  const token = serverEnv('GITHUB_TOKEN')?.trim();
  const repoEnv = (serverEnv('GITHUB_REPO') ?? '').trim();
  if (!token) throw new Error('GITHUB_TOKEN is not set');
  if (!repoEnv.includes('/')) throw new Error('GITHUB_REPO must be in format owner/repo');

  const [owner, repo] = repoEnv.split('/').map((part) => part.trim());
  if (!owner || !repo) throw new Error('GITHUB_REPO must be in format owner/repo');

  const octokit = new Octokit({ auth: token });
  const { branch, sha } = await resolveBranch(octokit, owner, repo, serverEnv('GITHUB_BRANCH')?.trim());
  const name = serverEnv('GITHUB_COMMITTER_NAME') ?? 'Wfrlee AI';
  const email = serverEnv('GITHUB_COMMITTER_EMAIL') ?? 'info@wfrlee.com';

  const { data: commit } = await octokit.rest.git.getCommit({ owner, repo, commit_sha: sha });
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
    parents: [sha],
    author: { name, email },
    committer: { name, email },
  });
  await octokit.rest.git.updateRef({ owner, repo, ref: `heads/${branch}`, sha: newCommit.sha });
  return { commitSha: newCommit.sha, branch };
}