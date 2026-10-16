import { generateText, modelList } from '@/lib/ai/client';

/**
 * Hero-image library. Each entry is served from /public/images. The AI picks
 * the single best fit for the guide's topic, city and language from this list.
 */
const IMAGE_LIBRARY: Array<{ path: string; alt: string }> = [
  { path: '/images/pexels-clickerhappy-36983.jpg', alt: 'A traveler sitting indoors, looking out a large window in an airport or station waiting area' },
  { path: '/images/pexels-railgunbreaker-38876606.jpg', alt: 'A modern airport or railway terminal hall with a glass ceiling and structural beams' },
  { path: '/images/pexels-nicolas-rueda-175965148-12639108.jpg', alt: 'An airplane wing and engine over the tarmac' },
  { path: '/images/pexels-pavel-danilyuk-7654190.jpg', alt: 'A person working at a desk with a laptop, calculator and documents' },
  { path: '/images/pexels-n-voitkevich-8062355.jpg', alt: 'A laptop workspace showing charts and graphs on screen' },
  { path: '/images/pexels-anete-lusina-5721001.jpg', alt: 'A person using a smartphone while sitting next to a laptop' },
  { path: '/images/pexels-jagaba-35299915.jpg', alt: 'A blue sky with a distant airplane vapor trail' },
  { path: '/images/pexels-wanderinglenses-36856287.jpg', alt: 'A blue sky with clouds and a small airplane flying through it' },
  { path: '/images/pexels-zhicheng-zhang-312594413-38809871.jpg', alt: 'An airplane flying against a twilight sky fading from blue to orange' },
  { path: '/images/pexels-oktay-koseoglu-42034955-37644602.jpg', alt: 'An airplane soaring in a clear blue sky above treetops' },
  { path: '/images/pexels-andromeda99-19924689.jpg', alt: 'An Emirates commercial airplane in a clear blue sky' },
  { path: '/images/pexels-planespotter-geneva-1877406873-29894746.jpg', alt: 'The nose of a commercial airliner on the tarmac with a worker nearby' },
  { path: '/images/pexels-khadijah-36367191.jpg', alt: 'A person in traditional attire standing outdoors on a city sidewalk with luggage' },
  { path: '/images/pexels-abul-lais-2161703794-39470815.jpg', alt: 'A Saudi Arabian flag seen through an architectural archway against a cloudy sky' },
  { path: '/images/pexels-abul-lais-2161703794-39470846.jpg', alt: 'A panoramic city skyline at dusk with tall towers and glowing lights' },
  { path: '/images/pexels-konevi-34246941.jpg', alt: 'A silhouette skyline of buildings and minarets at sunset' },
  { path: '/images/pexels-konevi-34246946.jpg', alt: "The Prophet's Mosque in Madinah illuminated at night" },
  { path: '/images/pexels-abul-lais-2161703794-39470841.jpg', alt: 'A nighttime aerial view of a brightly lit highway interchange and city' },
  { path: '/images/pexels-al-amin-muhammad-988616478-34214025.jpg', alt: 'A cityscape with rugged mountains in the background at golden hour' },
  { path: '/images/pexels-grbr-snts-323519936-33763650.jpg', alt: 'A prominent modern skyscraper towering above the city at sunset' },
  { path: '/images/pexels-faris-purnawarman-537694366-16539460.jpg', alt: 'An ornate architectural ceiling and window tracery' },
  { path: '/images/pexels-enginakyurt-15483696.jpg', alt: 'The green Saudi Arabian flag with Arabic calligraphy fluttering in the wind' },
  { path: '/images/pexels-hussain-awan-2780712-4321707.jpg', alt: 'A dense city skyline seen from above at twilight' },
  { path: '/images/pexels-aboodi-13884417.jpg', alt: 'A Saudi Arabian flag on a flagpole against a crisp blue sky' },
  { path: '/images/pexels-omar-ramadan-1739260-19671961.jpg', alt: 'A person holding a passport in front of a glass terminal window' },
  { path: '/images/pexels-fernanda-da-silva-lopes-2055473628-29379902.jpg', alt: 'A professional woman working at a computer desk in an office' },
  { path: '/images/pexels-pavel-danilyuk-6812435.jpg', alt: 'People interacting at a reception or service counter in a modern space' },
  { path: '/images/pexels-ketut-subiyanto-4907455.jpg', alt: 'A group of people conversing around a service desk' },
  { path: '/images/pexels-katianaidenko-7512139.jpg', alt: 'A high-angle view of a modern hotel lobby or lounge with people seated' },
];

const IMAGE_MENU = IMAGE_LIBRARY.map((image) => `- ${image.path} — ${image.alt}`).join('\n');

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
- heroImage MUST be exactly one of the paths in the image library below. Pick the SINGLE image that best matches the guide's topic, city and language (e.g. a Madinah/pilgrimage guide → the Prophet's Mosque; an airport layover → a terminal/plane; an office or remote-work post → a desk/workspace; a Riyadh city post → the Riyadh skyline/skyscraper).
- Image library:
${IMAGE_MENU}
- Keep factual, avoid medical/legal claims. Link to booking https://wfrlee.com. Respect brand tone (concise, direct).
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

Requirements:
- Return valid Markdown with YAML frontmatter matching the src/content/blog/${params.lang}/ schema (pubDate today, updatedDate today, draft: false, category suggested, translationKey kebab-case).
- The description field MUST be 150-160 characters long and wrapped in double quotes.
- heroImage MUST be exactly one of the paths in the image library below, chosen as the single best visual match for this specific guide.
- Image library:
${IMAGE_MENU}
- Suggested word count 600-900. Include intro, a comparison table (2-3 rows), highlights, a short practical plan, CTA linking to https://wfrlee.com, internal links to relevant city pages, and FAQ (3 Qs).
- Be concise and efficient: no filler, no repeated sections. Keep generation fast.
- SEO: write compelling title (<=60 chars) + meta description, include alt text suggestions for the hero image.
- For AR, use natural Saudi/MENA phrasing.
- Output ONLY the Markdown document, no code fences, no extra commentary.
- mention wfrlee`;

  const markdown = await generateText({
    prompt,
    systemInstruction: SYSTEM_INSTRUCTION,
    models: modelList('CLAUDE_MODEL', ['claude-sonnet-5-5', 'claude-sonnet-5', 'claude-haiku-5-5', 'claude-sonnet-4-6']),
    budgetMs: opts.budgetMs ?? 45_000,
    timeoutMs: opts.timeoutMs ?? 30_000,
  });
  return cleanMarkdown(markdown);
}
