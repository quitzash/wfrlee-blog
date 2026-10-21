globalThis.process ??= {}; globalThis.process.env ??= {};
import { g as getPosts, a as getPostSlug } from '../../../chunks/blog_DGalGtKD.mjs';
import { g as generateText, m as modelList } from '../../../chunks/client_mBwPEIjQ.mjs';
import { l as listSubscriberEmails, s as sendEmail } from '../../../chunks/resend_CAWfdVqV.mjs';
import { w as withSecurityHeaders, s as serverEnv, f as constantTimeEqual, S as SESSION_COOKIE, e as isAdminAuthed, i as isTrustedOrigin, c as clientIp, a as isRateLimited } from '../../../chunks/auth_BCnYD5b9.mjs';
import { o as object, _ as _enum } from '../../../chunks/schemas_Dv1TULK3.mjs';
export { renderers } from '../../../renderers.mjs';

async function generateNewsletterEmail(opts) {
  const postsList = opts.posts.map((p, i) => `${i + 1}. ${p.title}
   ${p.href}
   ${p.description}`).join("\n");
  const prompt = `Write a short Wfrlee.com newsletter email.

Language: ${opts.lang}

Latest posts:
${postsList}

Rules:
- Subject max 40 chars, preheader max 100 chars.
- Body: intro, a blurb for each post (title + 1-2 lines + a "Read guide" CTA), a final CTA to the blog, an unsubscribe link placeholder {{UNSUBSCRIBE_URL}}, and a view-in-browser placeholder {{WEB_URL}}.
- Use only ${opts.lang}. Include a booking CTA to https://wfrlee.com.
- Return ONLY valid JSON: {"subject":"...","preheader":"...","html":"...","text":"..."}`;
  const raw = await generateText({
    prompt,
    models: modelList("CLAUDE_FAST_MODEL", ["claude-haiku-5-5", "claude-sonnet-5-5", "claude-sonnet-5"])
  });
  return JSON.parse(raw);
}

const prerender = false;
const sendSchema = object({
  lang: _enum(["en", "ar"])
});
const SEND_CHUNK_SIZE = 100;
function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" }
  });
}
async function sendInChunks(recipients, email) {
  for (let i = 0; i < recipients.length; i += SEND_CHUNK_SIZE) {
    const chunk = recipients.slice(i, i + SEND_CHUNK_SIZE);
    await sendEmail({ to: chunk, subject: email.subject, html: email.html, text: email.text });
  }
}
async function runSend(request, cookies, lang) {
  if (!serverEnv("ADMIN_TOKEN")?.trim()) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: "Server misconfigured: ADMIN_TOKEN is not set on Vercel." }, 500));
  }
  const cronSecret = serverEnv("CRON_SECRET")?.trim();
  const authHeader = request.headers.get("authorization") ?? "";
  const isCron = Boolean(cronSecret) && constantTimeEqual(authHeader, `Bearer ${cronSecret}`);
  if (!isCron) {
    const sessionCookie = cookies.get(SESSION_COOKIE)?.value ?? null;
    if (!isAdminAuthed(request, sessionCookie)) {
      return withSecurityHeaders(jsonResponse({ ok: false, error: "Unauthorized" }, 401));
    }
    if (!isTrustedOrigin(request)) {
      return withSecurityHeaders(jsonResponse({ ok: false, error: "forbidden" }, 403));
    }
    const ip = clientIp(request);
    if (isRateLimited(`newsletter-send:${ip}`, 5, 60 * 60 * 1e3)) {
      return withSecurityHeaders(jsonResponse({ ok: false, error: "Too many requests. Try again later." }, 429));
    }
  }
  try {
    const posts = (await getPosts(lang)).slice(0, 4).map((p) => {
      const slug = getPostSlug(p);
      return {
        title: p.data.title,
        href: lang === "en" ? `/blog/${slug}/` : `/ar/blog/${slug}/`,
        description: p.data.description
      };
    });
    const email = await generateNewsletterEmail({ lang, posts });
    const manual = (serverEnv("MANUAL_TEST_EMAILS") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
    const recipients = manual.length > 0 ? manual : await listSubscriberEmails();
    if (recipients.length > 0) {
      await sendInChunks(recipients, email);
    }
    return withSecurityHeaders(jsonResponse({ ok: true, sent: recipients.length, lang }, 200));
  } catch (e) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: e?.message ?? "error" }, 500));
  }
}
const POST = async ({ request, cookies }) => {
  let lang;
  try {
    lang = sendSchema.parse(await request.json()).lang;
  } catch {
    return withSecurityHeaders(jsonResponse({ ok: false, error: "Invalid request body." }, 400));
  }
  return runSend(request, cookies, lang);
};
const GET = async ({ request, cookies, url }) => {
  const lang = url.searchParams.get("lang") === "ar" ? "ar" : "en";
  return runSend(request, cookies, lang);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
