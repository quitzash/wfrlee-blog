import type { APIRoute } from 'astro';
import { addSubscriber, sendSubscribeConfirmation } from '@/lib/email/resend';
import { serverEnv } from '@/lib/env';
import { clientIp, isRateLimited, withSecurityHeaders } from '@/lib/auth';

export const prerender = false;

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const POST: APIRoute = async ({ request }) => {
  const ip = clientIp(request);
  if (isRateLimited(`subscribe:${ip}`, 10, 60_000)) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Too many requests. Try again shortly.' }, 429));
  }

  let email: string;
  let lang: 'en' | 'ar';
  try {
    const body = (await request.json()) as { email?: unknown; lang?: unknown };
    email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    lang = body.lang === 'ar' || body.lang === 'en' ? body.lang : 'en';
  } catch {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'invalid_body' }, 400));
  }

  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'invalid_email' }, 400));
  }

  if (!serverEnv('RESEND_API_KEY')?.trim()) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Server misconfigured: RESEND_API_KEY is not set.' }, 500));
  }

  try {
    // Never log the subscriber address — it is PII.
    const { created } = await addSubscriber(email);
    if (created) {
      // Best-effort: a failed welcome email must not fail the subscription.
      try {
        await sendSubscribeConfirmation(email, lang);
      } catch {
        /* ignore confirmation failure */
      }
    }
    return withSecurityHeaders(jsonResponse({ ok: true, subscribed: true, created }, 201));
  } catch (e: any) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: e?.message ?? 'subscribe_failed' }, 500));
  }
};