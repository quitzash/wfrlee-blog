import type { APIRoute } from 'astro';
import { getPosts, getPostSlug } from '@/lib/blog';
import { generateNewsletterEmail } from '@/lib/ai/email';
import { sendEmail } from '@/lib/email/resend';
import { serverEnv } from '@/lib/env';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const expected = serverEnv('ADMIN_TOKEN');
  if (!expected) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Server misconfigured: ADMIN_TOKEN is not set on Vercel.' }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    );
  }
  const token = request.headers.get('x-admin-token');
  if (token !== expected) return new Response('Unauthorized', { status: 401 });
  try {
    const body = await request.json() as { lang: 'en' | 'ar' };
    const lang = body.lang;
    const posts = (await getPosts(lang)).slice(0, 4).map((p) => {
      const slug = getPostSlug(p);
      return {
        title: p.data.title,
        href: lang === 'en' ? `/blog/${slug}/` : `/ar/blog/${slug}/`,
        description: p.data.description,
      };
    });
    const email = await generateNewsletterEmail({ lang, posts });
    const subscribers = (serverEnv('MANUAL_TEST_EMAILS') ?? '')
      .split(',')
      .map((s: string) => s.trim())
      .filter(Boolean);
    if (subscribers.length > 0) {
      await sendEmail({ to: subscribers, subject: email.subject, html: email.html, text: email.text });
    }
    return new Response(JSON.stringify({ ok: true, sent: subscribers.length }), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e?.message ?? 'error' }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
};
