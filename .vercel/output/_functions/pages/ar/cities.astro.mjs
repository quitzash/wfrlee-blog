import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_BYpsH1Ip.mjs';
import 'piccolore';
import { $ as $$CitiesIndex } from '../../chunks/CitiesIndex_B9uKlOzi.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "CitiesIndex", $$CitiesIndex, { "lang": "ar" })}`;
}, "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/pages/ar/cities/index.astro", void 0);

const $$file = "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/pages/ar/cities/index.astro";
const $$url = "/ar/cities";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
