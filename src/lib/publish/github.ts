import { Octokit } from '@octokit/rest';
import { serverEnv } from '@/lib/env';

const token = serverEnv('GITHUB_TOKEN');
const repoEnv = serverEnv('GITHUB_REPO') ?? '';

export async function commitMarkdownFile(path: string, content: string, message: string) {
  if (!token) throw new Error('GITHUB_TOKEN missing');
  if (!repoEnv.includes('/')) throw new Error('GITHUB_REPO must be in format owner/repo');
  const [owner, repo] = repoEnv.split('/');
  const branch = serverEnv('GITHUB_BRANCH') ?? 'master';
  const name = serverEnv('GITHUB_COMMITTER_NAME') ?? 'Wfrlee AI';
  const email = serverEnv('GITHUB_COMMITTER_EMAIL') ?? 'info@wfrlee.com';

  const octokit = new Octokit({ auth: token });
  const { data: ref } = await octokit.rest.git.getRef({ owner, repo, ref: `heads/${branch}` });
  const sha = ref.object.sha;
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
  return { commitSha: newCommit.sha };
}
