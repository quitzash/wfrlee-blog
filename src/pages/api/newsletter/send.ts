import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getPosts, getPostSlug } from '@/lib/blog';
import { generateNewsletterEmail } from '@/lib/ai/email';
import { sendEmail } from '@/lib/email/resend';
import { serverEnv } from '@/lib/env';
import {
  SESSION_COOKIE,
  clientIp,
  isAdminAuthed,
  isRateLimited,
  isTrustedOrigin,
  withSecurityHeaders,
} from '@/lib/auth';

export const prerender = false;

const sendSchema = z.object({
  lang: z.enum(['en', 'ar']),
});

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!serverEnv('ADMIN_TOKEN')?.trim()) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Server misconfigured: ADMIN_TOKEN is not set on Vercel.' }, 500));
  }

  const sessionCookie = cookies.get(SESSION_COOKIE)?.value ?? null;
  if (!isAdminAuthed(request, sessionCookie)) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Unauthorized' }, 401));
  }
  if (!isTrustedOrigin(request)) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'forbidden' }, 403));
  }

  const ip = clientIp(request);
  if (isRateLimited(`newsletter-send:${ip}`, 5, 60 * 60 * 1000)) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Too many requests. Try again later.' }, 429));
  }

  let lang: 'en' | 'ar';
  try {
    lang = sendSchema.parse(await request.json()).lang;
  } catch {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Invalid request body.' }, 400));
  }

  try {
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
    return withSecurityHeaders(jsonResponse({ ok: true, sent: subscribers.length }, 200));
  } catch (e: any) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: e?.message ?? 'error' }, 500));
  }
};