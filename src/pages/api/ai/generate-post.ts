import type { APIRoute } from 'astro';
import { z } from 'zod';
import { generateGuide } from '@/lib/ai/gemini';
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

const MIN_DESC = 150;
const MAX_DESC = 160;
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

/** Rewrite a top-level frontmatter field, always quoting the value for YAML safety. */
function setFrontmatterField(
  markdown: string,
  field: string,
  transform: (value: string) => string,
): string {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return markdown;
  const lines = match[1].split(/\r?\n/);
  const index = lines.findIndex((line) => new RegExp(`^${field}\\s*:`).test(line.trim()));
  if (index === -1) return markdown;
  let value = lines[index].slice(lines[index].indexOf(':') + 1).trim();
  if (/^(["']).*\1$/.test(value)) value = value.slice(1, -1);
  value = transform(value);
  lines[index] = `${field}: "${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  return markdown.replace(match[1], lines.join('\n'));
}

/** Set a frontmatter field, inserting it after `category` when the model omitted it. */
function upsertFrontmatterField(markdown: string, field: string, value: string): string {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return markdown;
  const lines = match[1].split(/\r?\n/);
  const quoted = `${field}: "${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  const index = lines.findIndex((line) => new RegExp(`^${field}\\s*:`).test(line.trim()));
  if (index !== -1) {
    lines[index] = quoted;
  } else {
    const after = lines.findIndex((line) => /^category\s*:/.test(line.trim()));
    if (after === -1) lines.push(quoted);
    else lines.splice(after + 1, 0, quoted);
  }
  return markdown.replace(match[1], lines.join('\n'));
}

/** Keep the meta description inside the schema's 150-160 character window. */
function fitDescription(value: string): string {
  const suffix = ' Book hourly rooms with Wfrlee.com.';
  let out = value.trim();
  if (out.length > MAX_DESC) out = out.slice(0, MAX_DESC).trim();
  while (out.length < MIN_DESC) out += suffix;
  if (out.length > MAX_DESC) out = `${out.slice(0, MAX_DESC - 3).trimEnd()}...`;
  while (out.length < MIN_DESC) out += suffix;
  return out;
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

  content = setFrontmatterField(content, 'title', (value) => value.trim());
  content = setFrontmatterField(content, 'description', fitDescription);
  content = setFrontmatterField(content, 'primaryKeyword', (value) => value.trim());
  content = setFrontmatterField(content, 'category', (value) => value.trim());
  if (parsed.city) content = upsertFrontmatterField(content, 'city', parsed.city);

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