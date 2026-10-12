import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, lang } = await request.json();
    if (!email) return new Response(JSON.stringify({ ok: false, error: 'email_required' }), { status: 400, headers: { 'content-type': 'application/json' } });
    // TODO: persist subscriber (Resend Audience/DB). Never log PII.
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
};
