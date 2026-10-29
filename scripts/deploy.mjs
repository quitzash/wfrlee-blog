/**
 * Deploy the built site to Cloudflare Pages.
 *
 * Wraps `wrangler pages deploy` so the deploy is deterministic in CI:
 *
 *   - the project name is always explicit. The Pages build container clones
 *     the repository into `/opt/buildhome/repo`, so Wrangler would otherwise
 *     guess the project name from the folder ("repo") instead of
 *     "wfrlee-blog";
 *   - the branch comes from `CF_PAGES_BRANCH` (injected by Cloudflare during a
 *     Git-integrated build) and falls back to the current git branch. A
 *     detached HEAD is ignored on purpose: Wrangler would send the literal
 *     branch "HEAD" to Pages, which does not match the production branch and
 *     would turn a production build into a preview deployment;
 *   - the commit hash comes from `CF_PAGES_COMMIT_SHA` and falls back to git.
 *
 * Usage: `npm run deploy` (run `npm run build` first).
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const PROJECT_NAME = 'wfrlee-blog';
const OUT_DIR = 'dist';

function git(args) {
	const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
	return result.status === 0 ? result.stdout.trim() : '';
}

function fail(message) {
	console.error(`[deploy] ${message}`);
	process.exit(1);
}

if (!existsSync(resolve(root, OUT_DIR))) {
	fail(`No "${OUT_DIR}/" directory found. Run "npm run build" first.`);
}

const wrangler = resolve(root, 'node_modules/wrangler/bin/wrangler.js');
if (!existsSync(wrangler)) {
	fail('Wrangler is not installed. Run "npm ci" first.');
}

const args = ['pages', 'deploy', OUT_DIR, '--project-name', PROJECT_NAME];

const branch = process.env.CF_PAGES_BRANCH || git(['rev-parse', '--abbrev-ref', 'HEAD']);
if (branch && branch !== 'HEAD') {
	args.push('--branch', branch);
}

const commitHash = process.env.CF_PAGES_COMMIT_SHA || git(['rev-parse', 'HEAD']);
if (commitHash) {
	args.push('--commit-hash', commitHash);
}

console.log(
	`[deploy] project=${PROJECT_NAME} branch=${branch && branch !== 'HEAD' ? branch : 'detached'} out=${OUT_DIR}`
);

const result = spawnSync(process.execPath, [wrangler, ...args], {
	cwd: root,
	stdio: 'inherit',
});

if (result.error) {
	fail(`Could not run Wrangler: ${result.error.message}`);
}

if (result.status !== 0) {
	console.error('[deploy] `wrangler pages deploy` failed.');
	if (!process.env.CLOUDFLARE_API_TOKEN) {
		console.error('[deploy] No CLOUDFLARE_API_TOKEN in this environment. On Cloudflare');
		console.error('[deploy] Pages, set it under Settings -> Variables and Secrets.');
	}
	process.exit(result.status ?? 1);
}
