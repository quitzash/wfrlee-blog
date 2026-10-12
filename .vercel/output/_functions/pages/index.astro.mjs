import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_BYpsH1Ip.mjs';
import 'piccolore';
import { $ as $$BlogIndex } from '../chunks/BlogIndex_CpAQFeFZ.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BlogIndex", $$BlogIndex, { "lang": "en" })}`;
}, "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/pages/index.astro", void 0);

const $$file = "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
