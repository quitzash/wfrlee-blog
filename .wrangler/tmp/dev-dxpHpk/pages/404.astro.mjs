globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_DurfZ5ve.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_3gyObX10.mjs';
import { h as homeHref } from '../chunks/blog_DGalGtKD.mjs';
import { B as BOOKING_URL } from '../chunks/consts_C0nSLXrW.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  const title = "Page not found";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "lang": "en", "title": title, "description": "The page you are looking for could not be found.", "noindex": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center"> <p class="font-sans text-6xl font-extrabold text-brand-600 sm:text-7xl">404</p> <h1 class="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">${title}</h1> <p class="mt-4 max-w-md text-slate-600">
We couldn't find that page. It may have moved, or the link might be out of date.
</p> <div class="mt-8 flex flex-wrap items-center justify-center gap-3"> <a${addAttribute(homeHref("en"), "href")} class="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700">
Back to the blog
</a> <a${addAttribute(`${homeHref("en")}#guides`, "href")} class="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
Browse all guides
</a> <a${addAttribute(BOOKING_URL, "href")} target="_blank" rel="noopener noreferrer" class="rounded-lg px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50">
Book a micro-stay
</a> </div> <p class="mt-8 text-sm text-slate-500">
هل تتحدث العربية؟
<a href="/ar/" lang="ar" class="font-semibold text-brand-700 hover:underline">
تفضّل بزيارة النسخة العربية
</a> </p> </section> ` })}`;
}, "C:/Users/20190026516/wfrlee-blog/src/pages/404.astro", void 0);

const $$file = "C:/Users/20190026516/wfrlee-blog/src/pages/404.astro";
const $$url = "/blog/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
