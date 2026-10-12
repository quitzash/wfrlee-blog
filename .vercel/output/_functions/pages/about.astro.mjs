import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_BYpsH1Ip.mjs';
import 'piccolore';
import { $ as $$AboutPage } from '../chunks/AboutPage_DRueqc4E.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AboutPage", $$AboutPage, { "lang": "en" })}`;
}, "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/pages/about.astro", void 0);

const $$file = "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$About,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
