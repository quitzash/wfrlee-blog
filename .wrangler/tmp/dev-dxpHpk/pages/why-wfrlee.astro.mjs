globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DurfZ5ve.mjs';
import { $ as $$WhyWfrlee$1 } from '../chunks/WhyWfrlee_CiUGLr3m.mjs';
export { renderers } from '../renderers.mjs';

const $$WhyWfrlee = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "WhyWfrlee", $$WhyWfrlee$1, { "lang": "en" })}`;
}, "C:/Users/20190026516/wfrlee-blog/src/pages/why-wfrlee.astro", void 0);

const $$file = "C:/Users/20190026516/wfrlee-blog/src/pages/why-wfrlee.astro";
const $$url = "/blog/why-wfrlee";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$WhyWfrlee,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
