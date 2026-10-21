/**
 * Post-build fixups for the Cloudflare Pages deploy.
 *
 * Astro copies `public/` into the base path (`dist/blog/`), but wrangler
 * looks for `.assetsignore` at the ROOT of the asset directory. Without it,
 * `wrangler pages deploy` refuses to upload the SSR `_worker.js/` directory:
 *
 *   ✘ [ERROR] Uploading a Pages _worker.js directory as an asset.
 *
 * An empty `.assetsignore` at `dist/` confirms the upload is intended
 * (Pages runs `_worker.js` in advanced mode) and silences the error.
 */
import { writeFileSync } from 'node:fs';

writeFileSync(new URL('../dist/.assetsignore', import.meta.url), '');
console.log('[postbuild] wrote dist/.assetsignore');
