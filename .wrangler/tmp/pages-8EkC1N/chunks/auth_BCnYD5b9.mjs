globalThis.process ??= {}; globalThis.process.env ??= {};
import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';
import { S as SITE_URL } from './consts_C0nSLXrW.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/blog", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://wfrlee.com", "SSR": true};
function serverEnv(name) {
  const raw = typeof process !== "undefined" && process.env && process.env[name] ? process.env[name] : Object.assign(__vite_import_meta_env__, {})?.[name];
  if (raw === void 0) return void 0;
  return normalize(name, raw);
}
function normalize(name, raw) {
  const stripQuotes = (value2) => {
    const match = value2.match(/^(["'])(.*)\1$/);
    return match ? match[2].trim() : value2;
  };
  let value = stripQuotes(raw.trim());
  const prefix = `${name.toUpperCase()}=`;
  if (value.toUpperCase().startsWith(prefix)) {
    value = stripQuotes(value.slice(prefix.length).trim());
  }
  return value.length > 0 ? value : void 0;
}

const SESSION_COOKIE = "admin_session";
const SESSION_TTL_MS = 30 * 60 * 1e3;
function constantTimeEqual(a, b) {
  const left = createHmac("sha256", "wfrlee-admin-auth").update(a).digest();
  const right = createHmac("sha256", "wfrlee-admin-auth").update(b).digest();
  return timingSafeEqual(left, right);
}
function verifyAdminToken(candidateToken) {
  const expected = serverEnv("ADMIN_TOKEN")?.trim();
  if (!expected || !candidateToken) return false;
  return constantTimeEqual(candidateToken, expected);
}
function sessionSecret() {
  return serverEnv("ADMIN_SESSION_SECRET")?.trim() || serverEnv("ADMIN_TOKEN")?.trim() || "";
}
function signSession(body) {
  return createHmac("sha256", sessionSecret()).update(body).digest("base64url");
}
function createAdminSession() {
  if (!sessionSecret()) throw new Error("ADMIN_TOKEN is not configured");
  const body = `v1.${Date.now() + SESSION_TTL_MS}.${randomBytes(12).toString("base64url")}`;
  return `${body}.${signSession(body)}`;
}
function verifyAdminSession(cookieValue) {
  if (!cookieValue) return false;
  const parts = cookieValue.split(".");
  if (parts.length !== 4 || parts[0] !== "v1") return false;
  const expiry = Number(parts[1]);
  if (!Number.isFinite(expiry) || Date.now() > expiry) return false;
  const body = `${parts[0]}.${parts[1]}.${parts[2]}`;
  return constantTimeEqual(signSession(body), parts[3]);
}
const buckets = /* @__PURE__ */ new Map();
function isRateLimited(key, limit, windowMs) {
  const now = Date.now();
  const windowStart = now - windowMs;
  const hits = (buckets.get(key) ?? []).filter((t) => t >= windowStart);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return true;
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 1e4) {
    for (const [k, stamps] of buckets) {
      const kept = stamps.filter((t) => t >= now - windowMs);
      if (kept.length === 0) buckets.delete(k);
      else buckets.set(k, kept);
    }
  }
  return false;
}
function clientIp(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}
function isTrustedOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const host = new URL(origin).hostname;
    if (host === "localhost") return true;
    if (host.endsWith(".vercel.app")) return true;
    return host === new URL(SITE_URL).hostname;
  } catch {
    return false;
  }
}
function isAdminAuthed(request, sessionCookie) {
  return verifyAdminSession(sessionCookie) || verifyAdminToken(request.headers.get("x-admin-token"));
}
const BASE_SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  "Cross-Origin-Opener-Policy": "same-origin"
};
const NO_STORE = "no-store, no-cache, must-revalidate, max-age=0";
const ADMIN_CSP = "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self' data:; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'";
function withSecurityHeaders(response, { csp = false, noStore = true } = {}) {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(BASE_SECURITY_HEADERS)) {
    headers.set(name, value);
  }
  headers.set("Cache-Control", noStore ? NO_STORE : headers.get("Cache-Control") ?? NO_STORE);
  if (csp) headers.set("Content-Security-Policy", ADMIN_CSP);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

export { ADMIN_CSP as A, SESSION_COOKIE as S, isRateLimited as a, verifyAdminToken as b, clientIp as c, createAdminSession as d, isAdminAuthed as e, constantTimeEqual as f, isTrustedOrigin as i, serverEnv as s, verifyAdminSession as v, withSecurityHeaders as w };
