import { GoogleGenerativeAI } from '@google/generative-ai';
export { renderers } from '../../../renderers.mjs';

const apiKey = "AQ.Ab8RN6JhHNik-T4FXN-b5crYlndVs8uv1OPUaXqrLd-2Ou8oqw";
const modelName = "gemini-2.5-pro";
const genAI = new GoogleGenerativeAI(apiKey) ;
const model = genAI ? genAI.getGenerativeModel({
  model: modelName,
  systemInstruction: `You are the Wfrlee.com SEO content editor for EN+AR.

Brand: Wfrlee.com (Arabic brand: وفرلي.كوم). Focus: hourly micro-stays, airport layovers, Saudi Arabia (Jeddah, Riyadh, Dammam, Al Khobar, Jazan, Al Madinah), MENA.

Rules:
- Write SEO-optimized content: title (<=60), meta description (140-160 ideal), H1, intro, TOC, H2/H3, FAQ with Schema-ready Q/A, internal links to /cities/[city]/ (and /ar/ equivalents), canonical, hreflang-aware.
- Language separation: EN only on EN routes, AR only on AR routes. Never mix full paragraphs.
- Include E-E-A-T: clear author (Wfrlee Travel Team), updated date, city/airport names, practical steps.
- Use keyword intent (layover/transit/micro-stay). Include location terms + "by the hour".
- Output Markdown with frontmatter (Astro Content Collections): title, description, pubDate (ISO), updatedDate, heroImage, author, category, tags, primaryKeyword, translationKey, draft (true by default).
- Keep factual, avoid medical/legal claims. Link to booking https://wfrlee.com. Respect brand tone (concise, direct).`
}) : null;
async function generateGuide(params) {
  if (!model) throw new Error("GEMINI_API_KEY missing");
  const prompt = `Generate a complete blog guide for Wfrlee.com.

Language: ${params.lang}
Topic: ${params.topic}
City: ${params.city ?? "n/a"}
Primary keyword: ${params.primaryKeyword}
Tags: ${(params.tags ?? []).join(", ")}
Include FAQ (Schema.org FAQPage): ${params.includeFaq ? "yes" : "no"}

Requirements:
- Return valid Markdown with YAML frontmatter matching the src/content/blog/${params.lang}/ schema (pubDate today, updatedDate today, draft: true, category suggested, translationKey kebab-case).
- Suggested word count 800-1500. Include intro, comparison table, highlights, practical plan, CTA linking to https://wfrlee.com, internal links to relevant city pages, and FAQ (3-6 Qs).
- SEO: write compelling title + meta description, include alt text suggestions for hero image.
- For AR, use natural Saudi/MENA phrasing.`;
  const { response } = await model.generateContent(prompt);
  return response.text();
}

async function commitMarkdownFile(path, content, message) {
  throw new Error("GITHUB_TOKEN missing");
}

function toKebab(s) {
  return s.toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}

const prerender = false;
const POST = async ({ request }) => {
  const token = request.headers.get("x-admin-token");
  if (token !== "e5562d34-b6e1-47db-89a6-2dc16ccb97cd") return new Response("Unauthorized", { status: 401 });
  try {
    const body = await request.json();
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const slug = toKebab(body.topic);
    const filename = today + "-" + slug + ".md";
    const content = await generateGuide(body);
    const targetPath = "src/content/blog/" + body.lang + "/" + filename;
    await commitMarkdownFile(targetPath, content, "feat(ai): add draft guide " + filename + " (" + body.lang + ")");
    return new Response(JSON.stringify({ ok: true, draft: true, path: targetPath, filename }), { status: 200, headers: { "content-type": "application/json" } });
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
