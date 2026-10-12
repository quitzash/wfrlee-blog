import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI ? genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }) : null;

export async function generateNewsletterEmail(opts: {
  lang: 'en' | 'ar';
  posts: Array<{ title: string; href: string; description: string }>;
}) {
  if (!model) throw new Error('GEMINI_API_KEY missing');
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

  const r = await model.generateContent(prompt);
  return JSON.parse(r.response.text()) as {
    subject: string;
    preheader: string;
    html: string;
    text: string;
  };
}
