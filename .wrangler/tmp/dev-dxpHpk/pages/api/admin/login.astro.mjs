globalThis.process ??= {}; globalThis.process.env ??= {};
import { s as serverEnv, w as withSecurityHeaders, i as isTrustedOrigin, c as clientIp, a as isRateLimited, b as verifyAdminToken, d as createAdminSession, S as SESSION_COOKIE } from '../../../chunks/auth_BCnYD5b9.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1e3;
const POST = async ({ request, cookies }) => {
  if (!serverEnv("ADMIN_TOKEN")?.trim()) {
    return withSecurityHeaders(
      new Response(
        JSON.stringify({
          ok: false,
          error: "Server misconfigured: ADMIN_TOKEN is not set in this deployment. Add it in Vercel → Settings → Environment Variables (Production), then redeploy."
        }),
        { status: 500, headers: { "content-type": "application/json" } }
      )
    );
  }
  if (!isTrustedOrigin(request)) {
    return withSecurityHeaders(new Response(JSON.stringify({ ok: false, error: "forbidden" }), { status: 403, headers: { "content-type": "application/json" } }));
  }
  const ip = clientIp(request);
  if (isRateLimited(`admin-login:${ip}`, MAX_LOGIN_ATTEMPTS, LOGIN_WINDOW_MS)) {
    return withSecurityHeaders(new Response(JSON.stringify({ ok: false, error: "Too many login attempts. Try again later." }), { status: 429, headers: { "content-type": "application/json" } }));
  }
  const body = await request.json().catch(() => ({}));
  const candidate = typeof body.token === "string" ? body.token.trim() : "";
  if (!candidate || !verifyAdminToken(candidate)) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return withSecurityHeaders(new Response(JSON.stringify({ ok: false, error: "invalid_credentials" }), { status: 401, headers: { "content-type": "application/json" } }));
  }
  try {
    const session = createAdminSession();
    cookies.set(SESSION_COOKIE, session, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
      maxAge: 30 * 60
    });
    return withSecurityHeaders(new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json" } }));
  } catch {
    return withSecurityHeaders(new Response(JSON.stringify({ ok: false, error: "Server misconfigured: ADMIN_TOKEN is not set on Vercel." }), { status: 500, headers: { "content-type": "application/json" } }));
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
