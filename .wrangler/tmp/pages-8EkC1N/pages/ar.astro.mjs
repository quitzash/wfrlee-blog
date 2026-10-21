globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DurfZ5ve.mjs';
import { $ as $$BlogIndex } from '../chunks/BlogIndex_DefvZOId.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BlogIndex", $$BlogIndex, { "lang": "ar" })}`;
}, "C:/Users/20190026516/wfrlee-blog/src/pages/ar/index.astro", void 0);

const $$file = "C:/Users/20190026516/wfrlee-blog/src/pages/ar/index.astro";
const $$url = "/blog/ar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
