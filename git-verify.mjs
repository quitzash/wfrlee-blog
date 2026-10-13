import { Octokit } from "@octokit/rest";
const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPO || "quitzash/wfrlee-blog";
const [owner, reponame] = repo.split("/");
const octokit = new Octokit({ auth: token });

try {
  const { data: repoInfo } = await octokit.rest.repos.get({ owner, repo: reponame });
  console.log("1. repos.get OK, default_branch =", repoInfo.default_branch);
} catch (e) {
  console.log("1. repos.get FAILED:", e.status ?? e.message);
  process.exit(1);
}

const { branch, sha } = await (async () => {
  try {
    const { data } = await octokit.rest.git.getRef({ owner, repo: reponame, ref: "heads/master" });
    console.log("2. git.getRef heads/master OK, sha =", data.object.sha.slice(0, 7));
    return { branch: "master", sha: data.object.sha };
  } catch (e) {
    console.log("2. git.getRef FAILED:", "status" in e ? `HTTP ${e.status}: ${e.message}` : e.message);
    process.exit(1);
  }
})();

try {
  const commit = await octokit.rest.git.getCommit({ owner, repo: reponame, commit_sha: sha });
  console.log("3. git.getCommit OK (tree =", commit.data.tree.sha.slice(0, 7) + ")");
  const blob = await octokit.rest.git.createBlob({
    owner,
    repo: reponame,
    content: "token-flow-verification\n",
    encoding: "utf-8",
  });
  console.log("4. git.createBlob OK (WRITE works)");
  const tree = await octokit.rest.git.createTree({
    owner,
    repo: reponame,
    base_tree: commit.data.tree.sha,
    tree: [{ path: "WFRLEE_TOKEN_VERIFICATION.txt", type: "blob", mode: "100644", sha: blob.data.sha }],
  });
  console.log("5. git.createTree OK");
  await octokit.rest.git.createCommit({
    owner,
    repo: reponame,
    message: "chore: verify write access (not pushed)",
    tree: tree.data.sha,
    parents: [sha],
  });
  console.log("6. git.createCommit OK (WRITE full path works)");
  console.log("RESULT: ALL WRITE OPERATIONS SUCCEEDED");
} catch (e) {
  console.log("WRITE STEP FAILED:", "status" in e ? `HTTP ${e.status}: ${e.message}` : e.message);
  process.exit(1);
}