globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_DurfZ5ve.mjs';
import { $ as $$CitiesIndex } from '../../chunks/CitiesIndex_DcS5y4IR.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "CitiesIndex", $$CitiesIndex, { "lang": "ar" })}`;
}, "C:/Users/20190026516/wfrlee-blog/src/pages/ar/cities/index.astro", void 0);

const $$file = "C:/Users/20190026516/wfrlee-blog/src/pages/ar/cities/index.astro";
const $$url = "/blog/ar/cities";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
