import { generateText, modelList } from '@/lib/ai/client';

export async function generateNewsletterEmail(opts: {
  lang: 'en' | 'ar';
  posts: Array<{ title: string; href: string; description: string }>;
}) {
  const postsList = opts.posts
    .map((p, i) => `${i + 1}. ${p.title}\n   ${p.href}\n   ${p.description}`)
    .join('\n');

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
    models: modelList('GEMINI_FLASH_MODEL', ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.1-flash-lite-preview']),
  });
  return JSON.parse(raw) as {
    subject: string;
    preheader: string;
    html: string;
    text: string;
  };
}
