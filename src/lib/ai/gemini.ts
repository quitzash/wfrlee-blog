import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.GEMINI_API_KEY;
const modelName = import.meta.env.GEMINI_MODEL ?? 'gemini-2.5-pro';

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI
  ? genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: `You are the Wfrlee.com SEO content editor for EN+AR.

Brand: Wfrlee.com (Arabic brand: وفرلي.كوم). Focus: hourly micro-stays, airport layovers, Saudi Arabia (Jeddah, Riyadh, Dammam, Al Khobar, Jazan, Al Madinah), MENA.

Rules:
- Write SEO-optimized content: title (<=60), meta description (140-160 ideal), H1, intro, TOC, H2/H3, FAQ with Schema-ready Q/A, internal links to /cities/[city]/ (and /ar/ equivalents), canonical, hreflang-aware.
- Language separation: EN only on EN routes, AR only on AR routes. Never mix full paragraphs.
- Include E-E-A-T: clear author (Wfrlee Travel Team), updated date, city/airport names, practical steps.
- Use keyword intent (layover/transit/micro-stay). Include location terms + "by the hour".
- Output Markdown with frontmatter (Astro Content Collections): title, description, pubDate (ISO), updatedDate, heroImage, author, category, tags, primaryKeyword, translationKey, draft (true by default).
- Keep factual, avoid medical/legal claims. Link to booking https://wfrlee.com. Respect brand tone (concise, direct).`,
    })
  : null;

export async function generateGuide(params: {
  lang: 'en' | 'ar';
  topic: string;
  city?: string;
  primaryKeyword: string;
  tags?: string[];
  includeFaq?: boolean;
}) {
  if (!model) throw new Error('GEMINI_API_KEY missing');
  const prompt = `Generate a complete blog guide for Wfrlee.com.

Language: ${params.lang}
Topic: ${params.topic}
City: ${params.city ?? 'n/a'}
Primary keyword: ${params.primaryKeyword}
Tags: ${(params.tags ?? []).join(', ')}
Include FAQ (Schema.org FAQPage): ${params.includeFaq ? 'yes' : 'no'}

Requirements:
- Return valid Markdown with YAML frontmatter matching the src/content/blog/${params.lang}/ schema (pubDate today, updatedDate today, draft: true, category suggested, translationKey kebab-case).
- Suggested word count 800-1500. Include intro, comparison table, highlights, practical plan, CTA linking to https://wfrlee.com, internal links to relevant city pages, and FAQ (3-6 Qs).
- SEO: write compelling title + meta description, include alt text suggestions for hero image.
- For AR, use natural Saudi/MENA phrasing.`;

  const { response } = await model.generateContent(prompt);
  return response.text();
}
