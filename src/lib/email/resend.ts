import { Resend } from 'resend';

const apiKey = import.meta.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export async function sendEmail(opts: {
  to: string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}) {
  if (!resend) throw new Error('RESEND_API_KEY missing');
  const from = import.meta.env.EMAIL_FROM ?? 'Wfrlee.com <news@wfrlee.com>';
  return resend.emails.send({
    from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    replyTo: opts.replyTo ?? import.meta.env.EMAIL_REPLY_TO,
  });
}
