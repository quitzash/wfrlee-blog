import type { APIRoute } from 'astro';
import { z } from 'zod';
import { generateGuide } from '@/lib/ai/guide';
import { prepareGeneratedPost } from '@/lib/ai/post';
import { commitMarkdownFile } from '@/lib/publish/github';
import { toKebab } from '@/lib/utils';
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

const MAX_BODY_BYTES = 10_000;

const generateSchema = z.object({
  lang: z.enum(['en', 'ar']),
  topic: z.string().trim().min(3).max(80),
  city: z.string().trim().max(40).optional(),
  primaryKeyword: z.string().trim().min(3).max(80),
  tags: z.array(z.string().trim().min(1).max(30)).max(8).optional(),
  includeFaq: z.boolean().optional(),
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
  if (isRateLimited(`generate:${ip}`, 8, 60_000)) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Too many requests. Try again shortly.' }, 429));
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Payload too large.' }, 413));
  }

  let parsed;
  try {
    parsed = generateSchema.parse(await request.json());
  } catch {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Invalid request body.' }, 400));
  }

  const today = new Date().toISOString().slice(0, 10);
  const slug = toKebab(parsed.topic);
  const filename = `${today}-${slug}.md`;
  const targetPath = `src/content/blog/${parsed.lang}/${filename}`;

  let content: string;
  try {
    content = await generateGuide(parsed);
  } catch (e: any) {
    return withSecurityHeaders(jsonResponse({ ok: false, step: 'generate', error: e?.message ?? 'Generation failed' }, 500));
  }

  content = prepareGeneratedPost(content, { city: parsed.city });

  try {
    const { commitSha, branch } = await commitMarkdownFile(
      targetPath,
      content,
      `feat(ai): publish ${filename} (${parsed.lang})`,
    );
    return withSecurityHeaders(
      jsonResponse({ ok: true, published: true, path: targetPath, filename, commitSha, branch }, 200),
    );
  } catch (e: any) {
    return withSecurityHeaders(jsonResponse({ ok: false, step: 'publish', error: e?.message ?? 'Publish failed' }, 502));
  }
};