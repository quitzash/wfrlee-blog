globalThis.process ??= {}; globalThis.process.env ??= {};
import { t as toKebab, g as generateGuide, p as prepareGeneratedPost } from '../../../chunks/post_DO_0gzjG.mjs';
import { c as commitMarkdownFile } from '../../../chunks/github_B_n3j09G.mjs';
import { s as serverEnv, w as withSecurityHeaders, S as SESSION_COOKIE, e as isAdminAuthed, i as isTrustedOrigin, c as clientIp, a as isRateLimited } from '../../../chunks/auth_BCnYD5b9.mjs';
import { o as object, b as boolean, a as array, s as string, _ as _enum } from '../../../chunks/schemas_Dv1TULK3.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const MAX_BODY_BYTES = 1e4;
const generateSchema = object({
  lang: _enum(["en", "ar"]),
  topic: string().trim().min(3).max(80),
  city: string().trim().max(40).optional(),
  primaryKeyword: string().trim().min(3).max(80),
  tags: array(string().trim().min(1).max(30)).max(8).optional(),
  includeFaq: boolean().optional()
});
function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" }
  });
}
const POST = async ({ request, cookies }) => {
  if (!serverEnv("ADMIN_TOKEN")?.trim()) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: "Server misconfigured: ADMIN_TOKEN is not set on Vercel." }, 500));
  }
  const sessionCookie = cookies.get(SESSION_COOKIE)?.value ?? null;
  if (!isAdminAuthed(request, sessionCookie)) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: "Unauthorized" }, 401));
  }
  if (!isTrustedOrigin(request)) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: "forbidden" }, 403));
  }
  const ip = clientIp(request);
  if (isRateLimited(`generate:${ip}`, 8, 6e4)) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: "Too many requests. Try again shortly." }, 429));
  }
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: "Payload too large." }, 413));
  }
  let parsed;
  try {
    parsed = generateSchema.parse(await request.json());
  } catch {
    return withSecurityHeaders(jsonResponse({ ok: false, error: "Invalid request body." }, 400));
  }
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const slug = toKebab(parsed.topic);
  const filename = `${today}-${slug}.md`;
  const targetPath = `src/content/blog/${parsed.lang}/${filename}`;
  let content;
  try {
    content = await generateGuide(parsed);
  } catch (e) {
    return withSecurityHeaders(jsonResponse({ ok: false, step: "generate", error: e?.message ?? "Generation failed" }, 500));
  }
  content = prepareGeneratedPost(content, { city: parsed.city });
  try {
    const { commitSha, branch } = await commitMarkdownFile(
      targetPath,
      content,
      `feat(ai): publish ${filename} (${parsed.lang})`
    );
    return withSecurityHeaders(
      jsonResponse({ ok: true, published: true, path: targetPath, filename, commitSha, branch }, 200)
    );
  } catch (e) {
    return withSecurityHeaders(jsonResponse({ ok: false, step: "publish", error: e?.message ?? "Publish failed" }, 502));
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
