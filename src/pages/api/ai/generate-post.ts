import type { APIRoute } from 'astro';
import { generateGuide } from '@/lib/ai/gemini';
import { commitMarkdownFile } from '@/lib/publish/github';
import { serverEnv } from '@/lib/env';
import { toKebab } from '@/lib/utils';

export const prerender = false;

const MIN_DESC = 150;
const MAX_DESC = 160;

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

export const POST: APIRoute = async ({ request }) => {
  const expected = serverEnv('ADMIN_TOKEN');
  if (!expected) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Server misconfigured: ADMIN_TOKEN is not set on Vercel.' }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    );
  }
  const token = request.headers.get('x-admin-token');
  if (token !== expected) return new Response('Unauthorized', { status: 401 });
  try {
    const body = (await request.json()) as {
      lang: 'en' | 'ar';
      topic: string;
      city?: string;
      primaryKeyword: string;
      tags?: string[];
      includeFaq?: boolean;
    };
    const today = new Date().toISOString().slice(0, 10);
    const slug = toKebab(body.topic);
    const filename = `${today}-${slug}.md`;
    let content = await generateGuide(body);
    content = setFrontmatterField(content, 'title', (value) => value.trim());
    content = setFrontmatterField(content, 'description', fitDescription);
    content = setFrontmatterField(content, 'primaryKeyword', (value) => value.trim());
    content = setFrontmatterField(content, 'category', (value) => value.trim());
    const targetPath = `src/content/blog/${body.lang}/${filename}`;
    await commitMarkdownFile(
      targetPath,
      content,
      `feat(ai): publish ${filename} (${body.lang})`,
    );
    return new Response(
      JSON.stringify({ ok: true, published: true, path: targetPath, filename }),
      { status: 200, headers: { 'content-type': 'application/json' } },
    );
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e?.message ?? 'error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
};
