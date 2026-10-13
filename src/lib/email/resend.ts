import { Resend } from 'resend';
import { serverEnv } from '@/lib/env';

const apiKey = serverEnv('RESEND_API_KEY');
const resend = apiKey ? new Resend(apiKey) : null;

export async function sendEmail(opts: {
  to: string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}) {
  if (!resend) throw new Error('RESEND_API_KEY missing');
  const from = serverEnv('EMAIL_FROM') ?? 'Wfrlee.com <info@wfrlee.com>';
  return resend.emails.send({
    from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    replyTo: opts.replyTo ?? serverEnv('EMAIL_REPLY_TO'),
  });
}

export function isEmailConfigured(): boolean {
  return Boolean(resend);
}

/** Best-effort welcome email sent when someone first subscribes. */
export async function sendSubscribeConfirmation(to: string, lang: 'en' | 'ar' = 'en') {
  const site = 'https://wfrlee.com';
  const ar = lang === 'ar';
  const subject = ar ? 'تأكيد الاشتراك – Wfrlee.com' : 'Subscription confirmed – Wfrlee.com';
  const heading = ar ? 'أنت على القائمة!' : "You're on the list!";
  const line = ar
    ? 'شكراً لاشتراكك في نشرة Wfrlee.com. ستصلك أحدث أدلة الإقامة القصيرة في المدن السعودية.'
    : "Thanks for subscribing to the Wfrlee.com newsletter. You'll get our latest short-stay guides across Saudi cities.";
  const cta = ar ? 'تصفح المدن' : 'Browse cities';
  const link = ar ? `${site}/ar/` : `${site}/`;
  const html = `<div style="font-family:sans-serif;max-width:520px;margin:auto"><h1 style="font-size:20px">${heading}</h1><p>${line}</p><p><a href="${link}">${cta}</a></p></div>`;
  const text = `${heading}\n\n${line}\n\n${cta}: ${link}`;
  return sendEmail({ to: [to], subject, html, text });
}

// ---------------------------------------------------------------------------
// Subscribers: persisted as Resend contacts inside a "segment" (formerly
// known as an Audience). The newsletter send pulls from the same segment the
// signup form writes to, so subscribing is actually connected to the AI
// newsletter generation step.
// ---------------------------------------------------------------------------

let cachedSegmentId: string | undefined;

function segmentName(): string {
  return serverEnv('RESEND_SEGMENT_NAME') ?? 'wfrlee-newsletter';
}

/** Find the segment by name (creating it) so we always have a stable id. */
async function ensureSegment(): Promise<string> {
  if (cachedSegmentId) return cachedSegmentId;
  if (!resend) throw new Error('RESEND_API_KEY missing');

  const name = segmentName();
  let after: string | undefined;
  for (let page = 0; page < 10; page++) {
    const { data, error } = await resend.segments.list({ limit: 100, after });
    if (error || !data) throw new Error(error?.message ?? 'Resend segments.list failed');
    const match = data.data.find((segment) => segment.name === name);
    if (match) {
      cachedSegmentId = match.id;
      return match.id;
    }
    if (!data.has_more) break;
    after = data.data[data.data.length - 1]?.id;
  }

  const created = await resend.segments.create({ name });
  if (created.error || !created.data) {
    throw new Error(created.error?.message ?? 'Resend segment create failed');
  }
  cachedSegmentId = created.data.id;
  return created.data.id;
}

/**
 * Add an email to the newsletter segment. Idempotent: if the contact already
 * exists it is just attached to the segment (or already is).
 */
export async function addSubscriber(email: string): Promise<{ created: boolean }> {
  if (!resend) throw new Error('RESEND_API_KEY missing');
  const normalized = email.trim().toLowerCase();
  const segmentId = await ensureSegment();

  const existing = await resend.contacts.get(normalized);
  if (existing.error && existing.error.name !== 'not_found') {
    throw new Error(existing.error.message ?? 'Resend contact lookup failed');
  }
  if (existing.data) {
    const add = await resend.contacts.segments.add({ email: normalized, segmentId });
    if (add.error || !add.data) throw new Error(add.error?.message ?? 'Resend segment add failed');
    return { created: false };
  }

  const created = await resend.contacts.create({ email: normalized, segments: [{ id: segmentId }] });
  if (created.error || !created.data) {
    throw new Error(created.error?.message ?? 'Resend contact create failed');
  }
  return { created: true };
}

/** All active (non-unsubscribed) subscriber emails in the newsletter segment. */
export async function listSubscriberEmails(): Promise<string[]> {
  if (!resend) throw new Error('RESEND_API_KEY missing');
  const segmentId = await ensureSegment();
  const emails: string[] = [];
  let after: string | undefined;

  for (let page = 0; page < 20; page++) {
    const { data, error } = await resend.contacts.list({ segmentId, limit: 100, after });
    if (error || !data) throw new Error(error?.message ?? 'Resend contacts.list failed');
    for (const contact of data.data) {
      if (!contact.unsubscribed) emails.push(contact.email);
    }
    if (!data.has_more) break;
    after = data.data[data.data.length - 1]?.id;
  }
  return emails;
}