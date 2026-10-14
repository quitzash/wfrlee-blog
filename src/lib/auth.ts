/**
 * Admin auth & request hardening.
 *
 * Everything in here keeps the admin creation panel (AI Content Studio) safe:
 *  - constant-time token comparison (no timing side channel)
 *  - short-lived, HMAC-signed, httpOnly session cookies (the raw ADMIN_TOKEN
 *    is never exposed to page JavaScript)
 *  - in-memory sliding-window rate limiting (brute-force / cost abuse)
 *  - same-origin checks for cookie-authenticated requests (CSRF defense)
 *  - security headers for every admin response
 */
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { serverEnv } from '@/lib/env';
import { SITE_URL } from '@/consts';

export const SESSION_COOKIE = 'admin_session';
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes

/** Hash both sides to equalize length so timing can't leak the token size. */
export function constantTimeEqual(a: string, b: string): boolean {
  const left = createHmac('sha256', 'wfrlee-admin-auth').update(a).digest();
  const right = createHmac('sha256', 'wfrlee-admin-auth').update(b).digest();
  return timingSafeEqual(left, right);
}

/** Compare a candidate token against the configured ADMIN_TOKEN. */
export function verifyAdminToken(candidateToken: string | null | undefined): boolean {
  const expected = serverEnv('ADMIN_TOKEN')?.trim();
  if (!expected || !candidateToken) return false;
  return constantTimeEqual(candidateToken, expected);
}

/**
 * Secret used to sign session cookies. Defaults to ADMIN_TOKEN so no extra env
 * var is required, but a dedicated value can be supplied via ADMIN_SESSION_SECRET.
 */
function sessionSecret(): string {
  return serverEnv('ADMIN_SESSION_SECRET')?.trim() || serverEnv('ADMIN_TOKEN')?.trim() || '';
}

function signSession(body: string): string {
  return createHmac('sha256', sessionSecret()).update(body).digest('base64url');
}

/** Create a signed session cookie value: v1.<expiryMs>.<nonce>.<hmac>. */
export function createAdminSession(): string {
  if (!sessionSecret()) throw new Error('ADMIN_TOKEN is not configured');
  const body = `v1.${Date.now() + SESSION_TTL_MS}.${randomBytes(12).toString('base64url')}`;
  return `${body}.${signSession(body)}`;
}

/** True when the signed cookie is authentic and not expired. */
export function verifyAdminSession(cookieValue: string | null | undefined): boolean {
  if (!cookieValue) return false;
  const parts = cookieValue.split('.');
  if (parts.length !== 4 || parts[0] !== 'v1') return false;
  const expiry = Number(parts[1]);
  if (!Number.isFinite(expiry) || Date.now() > expiry) return false;
  const body = `${parts[0]}.${parts[1]}.${parts[2]}`;
  return constantTimeEqual(signSession(body), parts[3]);
}

/**
 * In-memory sliding-window rate limiter. Per warm serverless instance, so it is
 * best-effort on Vercel — but it still stops single-instance brute force and
 * accidental cost runaway. Old buckets are pruned to avoid unbounded growth.
 */
const buckets = new Map<string, number[]>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;
  const hits = (buckets.get(key) ?? []).filter((t) => t >= windowStart);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return true;
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 10_000) {
    for (const [k, stamps] of buckets) {
      const kept = stamps.filter((t) => t >= now - windowMs);
      if (kept.length === 0) buckets.delete(k);
      else buckets.set(k, kept);
    }
  }
  return false;
}

/** Best-effort visitor IP for rate limiting (trusts the first hop on Vercel). */
export function clientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

/**
 * Cookie-authenticated requests must come from a trusted origin (CSRF defense).
 * Non-browser clients (curl, cron) send no Origin header and are allowed through;
 * they must use the x-admin-token header instead.
 */
export function isTrustedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    const host = new URL(origin).hostname;
    if (host === 'localhost') return true;
    if (host.endsWith('.vercel.app')) return true;
    return host === new URL(SITE_URL).hostname;
  } catch {
    return false;
  }
}

/** True when an admin session cookie or the x-admin-token header authenticates the request. */
export function isAdminAuthed(request: Request, sessionCookie: string | null | undefined): boolean {
  return verifyAdminSession(sessionCookie) || verifyAdminToken(request.headers.get('x-admin-token'));
}

const BASE_SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
};
const NO_STORE = 'no-store, no-cache, must-revalidate, max-age=0';

/**
 * CSP for admin pages. Astro bundles page scripts to self-hosted files and
 * inlines @font-face styles, hence the style-src allowance. No third-party
 * scripts/domains are used on admin pages.
 */
export const ADMIN_CSP =
  "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; " +
  "script-src 'self'; font-src 'self' data:; connect-src 'self'; base-uri 'self'; " +
  "form-action 'self'; frame-ancestors 'none'; object-src 'none'";

/** Clone a Response with security headers applied (no-store by default). */
export function withSecurityHeaders(
  response: Response,
  { csp = false, noStore = true }: { csp?: boolean; noStore?: boolean } = {},
): Response {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(BASE_SECURITY_HEADERS)) {
    headers.set(name, value);
  }
  headers.set('Cache-Control', noStore ? NO_STORE : headers.get('Cache-Control') ?? NO_STORE);
  if (csp) headers.set('Content-Security-Policy', ADMIN_CSP);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}