import { generateText, modelList } from '@/lib/ai/client';

const HERO_IMAGES = [
  '/images/og-default.jpg',
  '/images/ultimate-jeddah-layover-guide.jpg',
  '/images/riyadh-airport-layover.jpg',
  '/images/dubai-stopover.jpg',
  '/images/hourly-micro-stays.jpg',
];

const SYSTEM_INSTRUCTION = `You are the SEO editor for Wfrlee.com.

Brand: Wfrlee.com (Arabic brand: وفرلي.كوم). Focus: hourly micro-stays, airport layovers, Saudi Arabia (Jeddah, Riyadh, Dammam, Al Khobar, Jazan, Al Madinah), MENA.

Rules:
- Write SEO-optimized content: title (<=60), meta description (150-160 characters, MUST be within this range), H1, intro, TOC, H2/H3, FAQ with Schema-ready Q/A, internal links to /cities/[city]/ (and /ar/ equivalents), canonical, hreflang-aware.
- Language separation: EN only on EN routes, AR only on AR routes. Never mix full paragraphs.
- Include E-E-A-T: clear author (Wfrlee Travel Team), updated date, city/airport names, practical steps.
- Use keyword intent (layover/transit/micro-stay). Include location terms + "by the hour".
- Output ONLY the Markdown document. Never wrap it in a code fence and never add commentary before or after.
- Frontmatter (Astro Content Collections): title, description, pubDate (ISO), updatedDate, heroImage, author, category, city, tags, primaryKeyword, translationKey, draft. Set draft: false so the post publishes immediately.
- "city" MUST be the exact primary city value given below (e.g. "Jeddah"), or "Saudi Arabia" when the guide is not about one specific city.
- heroImage MUST be exactly one of: ${HERO_IMAGES.join(', ')}.
- Keep factual, avoid medical/legal claims. Link to booking https://wfrlee.com. Respect brand tone (concise, direct).`;

/** Strip a surrounding code fence or any leading prose so the file starts with `---`. */
function cleanMarkdown(raw: string): string {
  let text = raw.trim();
  const fence = text.match(/^```[a-zA-Z]*\s*\n([\s\S]*?)\n```$/);
  if (fence) text = fence[1].trim();
  if (!text.startsWith('---')) {
    const frontmatterStart = text.indexOf('---');
    if (frontmatterStart > 0) text = text.slice(frontmatterStart).trim();
  }
  return text.endsWith('\n') ? text : `${text}\n`;
}

export async function generateGuide(
  params: {
    lang: 'en' | 'ar';
    topic: string;
    city?: string;
    primaryKeyword: string;
    tags?: string[];
    includeFaq?: boolean;
  },
  opts: { budgetMs?: number; timeoutMs?: number } = {},
) {
  const prompt = `Generate a complete, publish-ready blog guide for Wfrlee.com.

Language: ${params.lang}
Topic: ${params.topic}
City: ${params.city ?? 'n/a'}
Primary keyword: ${params.primaryKeyword}
Tags: ${(params.tags ?? []).join(', ')}
Include FAQ (Schema.org FAQPage): ${params.includeFaq ? 'yes' : 'no'}

Requirements:
- Return valid Markdown with YAML frontmatter matching the src/content/blog/${params.lang}/ schema (pubDate today, updatedDate today, draft: false, category suggested, translationKey kebab-case).
- The description field MUST be 150-160 characters long and wrapped in double quotes.
- heroImage MUST be exactly one of: ${HERO_IMAGES.join(', ')}.
- Suggested word count 600-900. Include intro, a comparison table (2-3 rows), highlights, a short practical plan, CTA linking to https://wfrlee.com, internal links to relevant city pages, and FAQ (3 Qs).
- Be concise and efficient: no filler, no repeated sections. Keep generation fast.
- SEO: write compelling title (<=60 chars) + meta description, include alt text suggestions for the hero image.
- For AR, use natural Saudi/MENA phrasing.
- Output ONLY the Markdown document, no code fences, no extra commentary.`;

  const markdown = await generateText({
    prompt,
    systemInstruction: SYSTEM_INSTRUCTION,
    models: modelList('GEMINI_MODEL', ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.1-flash-lite-preview']),
    budgetMs: opts.budgetMs ?? 45_000,
    timeoutMs: opts.timeoutMs ?? 30_000,
  });
  return cleanMarkdown(markdown);
}
