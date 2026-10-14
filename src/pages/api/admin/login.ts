import type { APIRoute } from 'astro';
import { serverEnv } from '@/lib/env';
import {
  SESSION_COOKIE,
  clientIp,
  createAdminSession,
  isRateLimited,
  isTrustedOrigin,
  verifyAdminToken,
  withSecurityHeaders,
} from '@/lib/auth';

export const prerender = false;

const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export const POST: APIRoute = async ({ request, cookies }) => {
  // Fail fast before the origin/rate-limit gates: a deployment with no
  // ADMIN_TOKEN can never authenticate, and reporting that as "invalid
  // credentials" just sends the user down the wrong path.
  if (!serverEnv('ADMIN_TOKEN')?.trim()) {
    return withSecurityHeaders(
      new Response(
        JSON.stringify({
          ok: false,
          error:
            'Server misconfigured: ADMIN_TOKEN is not set in this deployment. Add it in Vercel → Settings → Environment Variables (Production), then redeploy.',
        }),
        { status: 500, headers: { 'content-type': 'application/json' } },
      ),
    );
  }

  if (!isTrustedOrigin(request)) {
    return withSecurityHeaders(new Response(JSON.stringify({ ok: false, error: 'forbidden' }), { status: 403, headers: { 'content-type': 'application/json' } }));
  }

  const ip = clientIp(request);
  if (isRateLimited(`admin-login:${ip}`, MAX_LOGIN_ATTEMPTS, LOGIN_WINDOW_MS)) {
    return withSecurityHeaders(new Response(JSON.stringify({ ok: false, error: 'Too many login attempts. Try again later.' }), { status: 429, headers: { 'content-type': 'application/json' } }));
  }

  const body = (await request.json().catch(() => ({}))) as { token?: unknown };
  const candidate = typeof body.token === 'string' ? body.token.trim() : '';

  if (!candidate || !verifyAdminToken(candidate)) {
    // Constant delay keeps timing uniform and slows brute force.
    await new Promise((resolve) => setTimeout(resolve, 400));
    return withSecurityHeaders(new Response(JSON.stringify({ ok: false, error: 'invalid_credentials' }), { status: 401, headers: { 'content-type': 'application/json' } }));
  }

  try {
    const session = createAdminSession();
    cookies.set(SESSION_COOKIE, session, {
      httpOnly: true,
      sameSite: 'strict',
      secure: import.meta.env.PROD,
      path: '/',
      maxAge: 30 * 60,
    });
    return withSecurityHeaders(new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json' } }));
  } catch {
    return withSecurityHeaders(new Response(JSON.stringify({ ok: false, error: 'Server misconfigured: ADMIN_TOKEN is not set on Vercel.' }), { status: 500, headers: { 'content-type': 'application/json' } }));
  }
};