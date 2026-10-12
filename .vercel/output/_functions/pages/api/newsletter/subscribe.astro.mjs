export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const { email, lang } = await request.json();
    if (!email) return new Response(JSON.stringify({ ok: false, error: "email_required" }), { status: 400, headers: { "content-type": "application/json" } });
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }), { status: 500, headers: { "content-type": "application/json" } });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
