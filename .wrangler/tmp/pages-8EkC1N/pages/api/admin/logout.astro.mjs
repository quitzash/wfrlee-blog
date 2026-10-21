globalThis.process ??= {}; globalThis.process.env ??= {};
import { S as SESSION_COOKIE, w as withSecurityHeaders } from '../../../chunks/auth_BCnYD5b9.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ cookies }) => {
  cookies.delete(SESSION_COOKIE, { path: "/" });
  return withSecurityHeaders(new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json" } }));
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
