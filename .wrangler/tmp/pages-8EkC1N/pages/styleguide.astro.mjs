globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_DurfZ5ve.mjs';
import { $ as $$Styleguide$1 } from '../chunks/Styleguide_MN6PiZs5.mjs';
export { renderers } from '../renderers.mjs';

const $$Styleguide = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Styleguide", $$Styleguide$1, { "lang": "en" })}`;
}, "C:/Users/20190026516/wfrlee-blog/src/pages/styleguide.astro", void 0);

const $$file = "C:/Users/20190026516/wfrlee-blog/src/pages/styleguide.astro";
const $$url = "/blog/styleguide";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Styleguide,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
