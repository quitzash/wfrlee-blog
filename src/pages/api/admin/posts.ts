import type { APIRoute } from 'astro';
import { z } from 'zod';
import {
  commitMarkdownFile,
  deleteMarkdownFile,
  listMarkdownFiles,
  readMarkdownFile,
} from '@/lib/publish/github';
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

const BLOG_PREFIX = 'src/content/blog/';
const MAX_CONTENT_CHARS = 200_000;

const LANGUAGES = ['en', 'ar'] as const;
type Lang = (typeof LANGUAGES)[number];

const saveSchema = z.object({
  path: z.string().trim().min(1),
  content: z.string().min(1).max(MAX_CONTENT_CHARS),
});

const deleteSchema = z.object({
  path: z.string().trim().min(1),
});

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

/** Only allow editing markdown files that live inside the blog content folder. */
function isBlogPath(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.startsWith(BLOG_PREFIX) &&
    /\.(md|mdx)$/i.test(value) &&
    !value.includes('..')
  );
}

function filenameOf(path: string): string {
  return path.slice(path.lastIndexOf('/') + 1);
}

function frontmatterValue(content: string, key: string): string {
  const match = content.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!match) return '';
  const raw = match[1].trim();
  const quoted = raw.match(/^(["'])([\s\S]*)\1$/);
  return quoted ? quoted[2] : raw;
}

/** Pull the handful of fields the post list needs out of a markdown file. */
function parseMeta(content: string) {
  return {
    title: frontmatterValue(content, 'title'),
    city: frontmatterValue(content, 'city'),
    category: frontmatterValue(content, 'category'),
    pubDate: frontmatterValue(content, 'pubDate'),
    draft: /^true$/i.test(frontmatterValue(content, 'draft')),
  };
}

function guard(request: Request, cookies: { get: (name: string) => { value?: string } | undefined }, bucket: string, limit: number, windowMs: number): Response | null {
  const sessionCookie = cookies.get(SESSION_COOKIE)?.value ?? null;
  if (!isAdminAuthed(request, sessionCookie)) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Unauthorized' }, 401));
  }
  if (!isTrustedOrigin(request)) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'forbidden' }, 403));
  }
  if (isRateLimited(`${bucket}:${clientIp(request)}`, limit, windowMs)) {
    return withSecurityHeaders(
      jsonResponse({ ok: false, error: 'Too many requests. Try again shortly.' }, 429),
    );
  }
  return null;
}

export const GET: APIRoute = async ({ request, cookies, url }) => {
  if (!serverEnv('ADMIN_TOKEN')?.trim()) {
    return withSecurityHeaders(
      jsonResponse({ ok: false, error: 'Server misconfigured: ADMIN_TOKEN is not set on Vercel.' }, 500),
    );
  }

  const blocked = guard(request, cookies, 'admin-posts', 120, 60_000);
  if (blocked) return blocked;

  const rawPath = url.searchParams.get('path');
  if (rawPath) {
    if (!isBlogPath(rawPath)) {
      return withSecurityHeaders(jsonResponse({ ok: false, error: 'Invalid path.' }, 400));
    }
    try {
      const content = await readMarkdownFile(rawPath);
      return withSecurityHeaders(jsonResponse({ ok: true, path: rawPath, content }, 200));
    } catch (e: any) {
      return withSecurityHeaders(
        jsonResponse({ ok: false, error: e?.message ?? 'Could not read the file.' }, 502),
      );
    }
  }

  const lang = (url.searchParams.get('lang') ?? 'en') as Lang;
  if (!LANGUAGES.includes(lang)) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Invalid language.' }, 400));
  }

  try {
    const files = await listMarkdownFiles(`${BLOG_PREFIX}${lang}`);
    const posts = await Promise.all(
      files.map(async (file) => {
        try {
          const content = await readMarkdownFile(file.path);
          return { path: file.path, name: file.name, ...parseMeta(content) };
        } catch {
          return { path: file.path, name: file.name, title: file.name, city: '', category: '', pubDate: '', draft: false };
        }
      }),
    );
    posts.sort((a, b) => (a.pubDate < b.pubDate ? 1 : a.pubDate > b.pubDate ? -1 : a.name.localeCompare(b.name)));
    return withSecurityHeaders(jsonResponse({ ok: true, lang, posts }, 200));
  } catch (e: any) {
    return withSecurityHeaders(
      jsonResponse({ ok: false, error: e?.message ?? 'Could not list posts.' }, 502),
    );
  }
};

export const PUT: APIRoute = async ({ request, cookies }) => {
  if (!serverEnv('ADMIN_TOKEN')?.trim()) {
    return withSecurityHeaders(
      jsonResponse({ ok: false, error: 'Server misconfigured: ADMIN_TOKEN is not set on Vercel.' }, 500),
    );
  }

  const blocked = guard(request, cookies, 'admin-posts', 60, 60_000);
  if (blocked) return blocked;

  let body;
  try {
    body = saveSchema.parse(await request.json());
  } catch {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Invalid request body.' }, 400));
  }

  if (!isBlogPath(body.path)) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Invalid path.' }, 400));
  }
  if (!body.content.trimStart().startsWith('---')) {
    return withSecurityHeaders(
      jsonResponse({ ok: false, error: 'Post content must start with a YAML frontmatter block (---).' }, 400),
    );
  }

  const name = filenameOf(body.path);
  try {
    const { commitSha, branch } = await commitMarkdownFile(
      body.path,
      body.content,
      `chore(admin): update ${name}`,
    );
    return withSecurityHeaders(jsonResponse({ ok: true, path: body.path, commitSha, branch }, 200));
  } catch (e: any) {
    return withSecurityHeaders(
      jsonResponse({ ok: false, step: 'publish', error: e?.message ?? 'Save failed.' }, 502),
    );
  }
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  if (!serverEnv('ADMIN_TOKEN')?.trim()) {
    return withSecurityHeaders(
      jsonResponse({ ok: false, error: 'Server misconfigured: ADMIN_TOKEN is not set on Vercel.' }, 500),
    );
  }

  const blocked = guard(request, cookies, 'admin-posts', 60, 60_000);
  if (blocked) return blocked;

  let body;
  try {
    body = deleteSchema.parse(await request.json());
  } catch {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Invalid request body.' }, 400));
  }

  if (!isBlogPath(body.path)) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Invalid path.' }, 400));
  }

  const name = filenameOf(body.path);
  try {
    const { commitSha, branch } = await deleteMarkdownFile(
      body.path,
      `chore(admin): delete ${name}`,
    );
    return withSecurityHeaders(jsonResponse({ ok: true, path: body.path, commitSha, branch }, 200));
  } catch (e: any) {
    return withSecurityHeaders(
      jsonResponse({ ok: false, step: 'publish', error: e?.message ?? 'Delete failed.' }, 502),
    );
  }
};
