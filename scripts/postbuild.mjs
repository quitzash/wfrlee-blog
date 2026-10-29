/**
 * Post-build fixups for the Cloudflare Pages deploy.
 *
 * Astro copies `public/` into the root of the build output (`dist/`), but
 * Wrangler looks for `.assetsignore` at the ROOT of the asset directory and
 * reads it as a list of glob patterns.
 *
 * The Astro Cloudflare adapter builds the server bundle into `dist/_worker.js/`
 * (a directory). Without a matching `.assetsignore` pattern Wrangler refuses
 * to upload it:
 *
 *   [ERROR] Uploading a Pages _worker.js directory as an asset.
 *
 * and an *empty* `.assetsignore` only silences that error — the server-side
 * chunks would then be uploaded as public static assets. Excluding them keeps
 * the Worker code private.
 *
 * `_routes.json` is uploaded separately by Wrangler (it controls which routes
 * invoke the Worker), so it is excluded from the static asset manifest too.
 */
import { writeFileSync } from 'node:fs';

const ASSETS_IGNORE = ['_worker.js', '_routes.json', ''].join('\n');

writeFileSync(new URL('../dist/.assetsignore', import.meta.url), ASSETS_IGNORE);
console.log('[postbuild] wrote dist/.assetsignore');
