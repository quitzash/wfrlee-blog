import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_C64qP00l.mjs';
import { manifest } from './manifest_DXkrBLTP.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/ai/generate-post.astro.mjs');
const _page4 = () => import('./pages/api/newsletter/send.astro.mjs');
const _page5 = () => import('./pages/api/newsletter/subscribe.astro.mjs');
const _page6 = () => import('./pages/ar/about.astro.mjs');
const _page7 = () => import('./pages/ar/blog/_---slug_.astro.mjs');
const _page8 = () => import('./pages/ar/cities/_city_.astro.mjs');
const _page9 = () => import('./pages/ar/cities.astro.mjs');
const _page10 = () => import('./pages/ar/rss.xml.astro.mjs');
const _page11 = () => import('./pages/ar/styleguide.astro.mjs');
const _page12 = () => import('./pages/ar/why-wfrlee.astro.mjs');
const _page13 = () => import('./pages/ar.astro.mjs');
const _page14 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page15 = () => import('./pages/cities/_city_.astro.mjs');
const _page16 = () => import('./pages/cities.astro.mjs');
const _page17 = () => import('./pages/robots.txt.astro.mjs');
const _page18 = () => import('./pages/rss.xml.astro.mjs');
const _page19 = () => import('./pages/styleguide.astro.mjs');
const _page20 = () => import('./pages/why-wfrlee.astro.mjs');
const _page21 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/ai/generate-post.ts", _page3],
    ["src/pages/api/newsletter/send.ts", _page4],
    ["src/pages/api/newsletter/subscribe.ts", _page5],
    ["src/pages/ar/about.astro", _page6],
    ["src/pages/ar/blog/[...slug].astro", _page7],
    ["src/pages/ar/cities/[city].astro", _page8],
    ["src/pages/ar/cities/index.astro", _page9],
    ["src/pages/ar/rss.xml.ts", _page10],
    ["src/pages/ar/styleguide.astro", _page11],
    ["src/pages/ar/why-wfrlee.astro", _page12],
    ["src/pages/ar/index.astro", _page13],
    ["src/pages/blog/[...slug].astro", _page14],
    ["src/pages/cities/[city].astro", _page15],
    ["src/pages/cities/index.astro", _page16],
    ["src/pages/robots.txt.ts", _page17],
    ["src/pages/rss.xml.ts", _page18],
    ["src/pages/styleguide.astro", _page19],
    ["src/pages/why-wfrlee.astro", _page20],
    ["src/pages/index.astro", _page21]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "33932167-c173-4457-a81e-ae379b92f39f",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
