import { g as getPosts, a as getPostSlug } from '../../../chunks/blog_BWAOoHv7.mjs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'resend';
export { renderers } from '../../../renderers.mjs';

const apiKey = "AQ.Ab8RN6JhHNik-T4FXN-b5crYlndVs8uv1OPUaXqrLd-2Ou8oqw";
const genAI = new GoogleGenerativeAI(apiKey) ;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-2.5-flash" }) : null;
async function generateNewsletterEmail(opts) {
  if (!model) throw new Error("GEMINI_API_KEY missing");
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
  const r = await model.generateContent(prompt);
  return JSON.parse(r.response.text());
}

async function sendEmail(opts) {
  throw new Error("RESEND_API_KEY missing");
}

const prerender = false;
const POST = async ({ request }) => {
  const token = request.headers.get("x-admin-token");
  if (token !== "e5562d34-b6e1-47db-89a6-2dc16ccb97cd") return new Response("Unauthorized", { status: 401 });
  try {
    const body = await request.json();
    const lang = body.lang;
    const posts = (await getPosts(lang)).slice(0, 4).map((p) => {
      const slug = getPostSlug(p);
      return {
        title: p.data.title,
        href: lang === "en" ? `/blog/${slug}/` : `/ar/blog/${slug}/`,
        description: p.data.description
      };
    });
    const email = await generateNewsletterEmail({ lang, posts });
    const subscribers = (undefined                                   ?? "").split(",").map((s) => s.trim()).filter(Boolean);
    if (subscribers.length > 0) {
      await sendEmail({ to: subscribers, subject: email.subject, html: email.html, text: email.text });
    }
    return new Response(JSON.stringify({ ok: true, sent: subscribers.length }), { status: 200, headers: { "content-type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e?.message ?? "error" }), { status: 500, headers: { "content-type": "application/json" } });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
