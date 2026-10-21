import { generateText, modelList } from '@/lib/ai/client';

/**
 * Hero-image library. Each entry is served from /public/images. The AI picks
 * the single best fit for the guide's topic, city and language from this list.
 */
const IMAGE_LIBRARY: Array<{ path: string; alt: string }> = [
  { path: '/images/pexels-railgunbreaker-38876606.jpg', alt: 'A modern airport or railway terminal hall with a glass ceiling and structural beams' },
  { path: '/images/pexels-nicolas-rueda-175965148-12639108.jpg', alt: 'An airplane wing and engine over the tarmac' },
  { path: '/images/pexels-pavel-danilyuk-7654190.jpg', alt: 'A person working at a desk with a laptop, calculator and documents' },
  { path: '/images/pexels-fernanda-da-silva-lopes-2055473628-29379902.jpg', alt: 'A professional woman working at a computer desk in an office' },
  { path: '/images/pexels-zhicheng-zhang-312594413-38809871.jpg', alt: 'An airplane flying against a twilight sky fading from blue to orange' },
  { path: '/images/pexels-oktay-koseoglu-42034955-37644602.jpg', alt: 'An airplane soaring in a clear blue sky above treetops' },
  { path: '/images/pexels-andromeda99-19924689.jpg', alt: 'An Emirates commercial airplane in a clear blue sky' },
  { path: '/images/pexels-planespotter-geneva-1877406873-29894746.jpg', alt: 'The nose of a commercial airliner on the tarmac with a worker nearby' },
  { path: '/images/pexels-abul-lais-2161703794-39470815.jpg', alt: 'A Saudi Arabian flag seen through an architectural archway against a cloudy sky' },
  { path: '/images/pexels-abul-lais-2161703794-39470846.jpg', alt: 'A panoramic city skyline at dusk with tall towers and glowing lights' },
  { path: '/images/pexels-konevi-34246941.jpg', alt: 'A silhouette skyline of buildings and minarets at sunset' },
  { path: '/images/pexels-konevi-34246946.jpg', alt: "The Prophet's Mosque in Madinah illuminated at night" },
  { path: '/images/pexels-abul-lais-2161703794-39470841.jpg', alt: 'A nighttime aerial view of a brightly lit highway interchange and city' },
  { path: '/images/pexels-al-amin-muhammad-988616478-34214025.jpg', alt: 'A cityscape with rugged mountains in the background at golden hour' },
  { path: '/images/pexels-enginakyurt-15483696.jpg', alt: 'The green Saudi Arabian flag with Arabic calligraphy fluttering in the wind' },
  { path: '/images/pexels-hussain-awan-2780712-4321707.jpg', alt: 'A dense city skyline seen from above at twilight' },
  { path: '/images/pexels-pavel-danilyuk-6812435.jpg', alt: 'People interacting at a reception or service counter in a modern space' },
  { path: '/images/pexels-ketut-subiyanto-4907455.jpg', alt: 'A group of people conversing around a service desk' },
  { path: '/images/pexels-curtis-cheng-2154926261-38490446.jpg', alt: 'Aerial view of an airport runway and terminal with planes parked at gates' },
  { path: '/images/pexels-rrodriguesim-16108899.jpg', alt: 'Airliners taxiing on a sunny runway ready for takeoff' },
  { path: '/images/pexels-ocean-19947936.jpg', alt: 'Interior of a modern hotel restaurant or lounge with contemporary seating' },
  { path: '/images/pexels-olly-3768095.jpg', alt: 'Close-up of a hotel reception desk with a service bell and signage' },
  { path: '/images/pexels-mikhail-nilov-7820326.jpg', alt: 'A hotel guest holding a check-in card while paying by card at reception' },
  { path: '/images/pexels-louie-alma-2154387078-33197282.jpg', alt: 'A modern cozy bedroom with neutral beige decor, typical of a quality hotel room' },
  { path: '/images/pexels-2375361-10585076.jpg', alt: 'Sunglasses, a sun hat and a vintage camera resting on a travel brochure' },
  { path: '/images/pexels-nietjuhart-14131701.jpg', alt: 'Scrabble tiles on a vintage map arranged with travel accessories in a flat lay' },
  { path: '/images/pexels-homegrounds-co-3480562-5200278.jpg', alt: 'Letter tiles, a brown envelope and white flowers in a vintage stationery flat lay' },
  { path: '/images/pexels-mdamirumar-34744916.jpg', alt: 'Morning view of the Jeddah Corniche with palm trees and ocean waves' },
  { path: '/images/pexels-kashyap197-37909605.jpg', alt: 'A palm-lined coastal road along the Jeddah Corniche on a sunny day' },
  { path: '/images/pexels-kashyap197-37909633.jpg', alt: 'The Jeddah Corniche waterfront with modern buildings and palm trees under a bright sky' },
  { path: '/images/pexels-mloky96-35761.jpg', alt: 'The illuminated Kingdom Centre tower on the Riyadh skyline at twilight' },
];

const IMAGE_MENU = IMAGE_LIBRARY.map((image) => `- ${image.path} — ${image.alt}`).join('\n');

const SYSTEM_INSTRUCTION = `You are the SEO editor for Wfrlee.com.

Brand: Wfrlee.com (Arabic brand: وفرلي.كوم). Focus: hourly micro-stays and airport layovers in the Kingdom of Saudi Arabia (Jeddah, Riyadh, Dammam, Al Khobar, Jazan, Al Madinah).

Rules:
- KSA-ONLY (STRICT): every guide must be about Saudi Arabia. Reference only Saudi cities, airports, highways, landmarks and travel context. Never feature, recommend or compare accommodation in any other country (e.g. UAE, Bahrain, Qatar, Kuwait, Oman, Jordan, Egypt) and never treat "MENA" as the scope. A neighbouring country may appear only if unavoidable to describe a transit route, and never as a place to stay or book.
- Write SEO-optimized content: title (<=60), meta description (150-160 characters, MUST be within this range), H1, intro, TOC, H2/H3, FAQ with Schema-ready Q/A, internal links to /cities/[city]/ (and /ar/ equivalents), canonical, hreflang-aware.
- Paragraph depth (IMPORTANT): write developed, magazine-style prose. Every body paragraph must be 3-6 full sentences and roughly 70-120 words. Never write one- or two-sentence paragraphs, and never turn a section into only a bullet list — open each H2 with at least one substantial paragraph before any list or table. Prefer showing the "why" and a concrete traveller scenario in each paragraph rather than compressing ideas into single lines.
- Language separation: EN only on EN routes, AR only on AR routes. Never mix full paragraphs.
- Include E-E-A-T: clear author (Wfrlee Travel Team), updated date, city/airport names, practical steps.
- Use keyword intent (layover/transit/micro-stay). Include location terms + "by the hour".
- Output ONLY the Markdown document. Never wrap it in a code fence and never add commentary before or after.
- Frontmatter (Astro Content Collections): title, description, pubDate (ISO), updatedDate, heroImage, author, category, city, tags, primaryKeyword, translationKey, draft. Set draft: false so the post publishes immediately.
- "city" MUST be the exact primary city value given below (e.g. "Jeddah"), or "Saudi Arabia" when the guide is not about one specific city.
- heroImage MUST be exactly one of the paths in the image library below. Pick the SINGLE image that best matches the guide's topic, city and language (e.g. a Madinah/pilgrimage guide → the Prophet's Mosque; an airport layover → a terminal/plane; an office or remote-work post → a desk/workspace; a Riyadh city post → the Riyadh skyline/skyscraper).
- Image library:
${IMAGE_MENU}
- Keep factual, avoid medical/legal claims. Link to booking https://wfrlee.com. Respect brand tone (clear and direct, but fully developed — never terse or clipped).
- make sure to mention wfrlee`;

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
Today's date: ${new Date().toISOString().slice(0, 10)}

Requirements:
- Return valid Markdown with YAML frontmatter matching the src/content/blog/${params.lang}/ schema (pubDate today, updatedDate today, draft: false, category suggested, translationKey kebab-case).
- Use today's date (given above) for pubDate, updatedDate and any "last updated" / byline date in the body. Never invent a different date.
- The description field MUST be 150-160 characters long and wrapped in double quotes.
- heroImage MUST be exactly one of the paths in the image library below, chosen as the single best visual match for this specific guide.
- Image library:
${IMAGE_MENU}
- Target 1000-1400 words of developed prose. Write substantial paragraphs: each body paragraph 3-6 sentences (~70-120 words). Never use one-sentence paragraphs, and never make a section only a bullet list — every H2/H3 opens with at least one full paragraph. Include intro, a comparison table (2-4 rows), highlights, a short practical plan, CTA linking to https://wfrlee.com, internal links to relevant city pages, and FAQ (3-5 Qs).
- Depth over filler: do not pad with repetition or generic slogans, but do fully explain each point, why it matters, and give a concrete traveller scenario so the guide reads like a well-researched article rather than a summary.
- SEO: write compelling title (<=60 chars) + meta description, include alt text suggestions for the hero image.
- KSA focus: the entire guide must be about Saudi Arabia only. Do not include or recommend stays, cities or attractions in other countries.
- For AR, use natural Saudi (KSA) phrasing with the same multi-sentence paragraph depth.
- Output ONLY the Markdown document, no code fences, no extra commentary.
- mention wfrlee`;

  const markdown = await generateText({
    prompt,
    systemInstruction: SYSTEM_INSTRUCTION,
    models: modelList('CLAUDE_MODEL', ['claude-sonnet-5-5', 'claude-sonnet-5', 'claude-haiku-5-5', 'claude-sonnet-4-6']),
    budgetMs: opts.budgetMs ?? 240_000,
    timeoutMs: opts.timeoutMs ?? 120_000,
  });
  return cleanMarkdown(markdown);
}
