import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getPosts, getPostSlug } from '@/lib/blog';
import { generateNewsletterEmail } from '@/lib/ai/email';
import { listSubscriberEmails, sendEmail } from '@/lib/email/resend';
import { serverEnv } from '@/lib/env';
import {
  SESSION_COOKIE,
  clientIp,
  isAdminAuthed,
  isCronRequest,
  isRateLimited,
  isTrustedOrigin,
  withSecurityHeaders,
} from '@/lib/auth';

export const prerender = false;

const sendSchema = z.object({
  lang: z.enum(['en', 'ar']),
});

const SEND_CHUNK_SIZE = 100;

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

async function sendInChunks(recipients: string[], email: { subject: string; html: string; text: string }) {
  for (let i = 0; i < recipients.length; i += SEND_CHUNK_SIZE) {
    const chunk = recipients.slice(i, i + SEND_CHUNK_SIZE);
    await sendEmail({ to: chunk, subject: email.subject, html: email.html, text: email.text });
  }
}

/** Shared auth + send flow for both the admin action (POST) and Vercel cron (GET). */
async function runSend(
  request: Request,
  cookies: { get(name: string): { value: string } | undefined },
  lang: 'en' | 'ar',
): Promise<Response> {
  if (!serverEnv('ADMIN_TOKEN')?.trim()) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Server misconfigured: ADMIN_TOKEN is not set in this deployment.' }, 500));
  }

  // Cron jobs authenticate with the shared CRON_SECRET: Vercel sends it as
  // `Authorization: Bearer <secret>`, Cloudflare as `CF-Authorization`.
  const isCron = isCronRequest(request);

  if (!isCron) {
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

    // Manual test recipients override the live subscriber list, so a dev send
    // never spams real subscribers. Without it, send to everyone who signed up.
    const manual = (serverEnv('MANUAL_TEST_EMAILS') ?? '')
      .split(',')
      .map((s: string) => s.trim())
      .filter(Boolean);
    const recipients = manual.length > 0 ? manual : await listSubscriberEmails();

    if (recipients.length > 0) {
      await sendInChunks(recipients, email);
    }
    return withSecurityHeaders(jsonResponse({ ok: true, sent: recipients.length, lang }, 200));
  } catch (e: any) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: e?.message ?? 'error' }, 500));
  }
}

export const POST: APIRoute = async ({ request, cookies }) => {
  let lang: 'en' | 'ar';
  try {
    lang = sendSchema.parse(await request.json()).lang;
  } catch {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Invalid request body.' }, 400));
  }
  return runSend(request, cookies, lang);
};

/** Vercel cron entry point. Language comes from `?lang=` (defaults to English). */
export const GET: APIRoute = async ({ request, cookies, url }) => {
  const lang = url.searchParams.get('lang') === 'ar' ? 'ar' : 'en';
  return runSend(request, cookies, lang);
};