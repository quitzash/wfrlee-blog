globalThis.process ??= {}; globalThis.process.env ??= {};
import { a as addSubscriber, b as sendSubscribeConfirmation } from '../../../chunks/resend_CAWfdVqV.mjs';
import { c as clientIp, a as isRateLimited, w as withSecurityHeaders, s as serverEnv } from '../../../chunks/auth_BCnYD5b9.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" }
  });
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const POST = async ({ request }) => {
  const ip = clientIp(request);
  if (isRateLimited(`subscribe:${ip}`, 10, 6e4)) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: "Too many requests. Try again shortly." }, 429));
  }
  let email;
  let lang;
  try {
    const body = await request.json();
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    lang = body.lang === "ar" || body.lang === "en" ? body.lang : "en";
  } catch {
    return withSecurityHeaders(jsonResponse({ ok: false, error: "invalid_body" }, 400));
  }
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: "invalid_email" }, 400));
  }
  if (!serverEnv("RESEND_API_KEY")?.trim()) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: "Server misconfigured: RESEND_API_KEY is not set." }, 500));
  }
  try {
    const { created } = await addSubscriber(email);
    if (created) {
      try {
        await sendSubscribeConfirmation(email, lang);
      } catch {
      }
    }
    return withSecurityHeaders(jsonResponse({ ok: true, subscribed: true, created }, 201));
  } catch (e) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: e?.message ?? "subscribe_failed" }, 500));
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
