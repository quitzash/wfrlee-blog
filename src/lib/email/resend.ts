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
  const from = serverEnv('EMAIL_FROM') ?? 'Wfrlee.com <news@wfrlee.com>';
  return resend.emails.send({
    from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    replyTo: opts.replyTo ?? serverEnv('EMAIL_REPLY_TO'),
  });
}
