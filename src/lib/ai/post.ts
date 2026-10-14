/**
 * Shared logic for turning a brief (topic + keyword) into a publish-ready
 * markdown file and committing it to GitHub.
 *
 * Used by both the manual admin endpoint (`/api/ai/generate-post`) and the
 * weekly keyword-driven job (`/api/ai/weekly-post`), so the frontmatter
 * cleanup and the schema's description window stay consistent everywhere.
 */
import { generateGuide } from '@/lib/ai/gemini';
import { commitMarkdownFile } from '@/lib/publish/github';
import { toKebab } from '@/lib/utils';

const MIN_DESC = 150;
const MAX_DESC = 160;

export interface GeneratePostParams {
  lang: 'en' | 'ar';
  topic: string;
  city?: string;
  primaryKeyword: string;
  tags?: string[];
  includeFaq?: boolean;
}

export interface PublishedPost {
  content: string;
  filename: string;
  path: string;
  commitSha: string;
  branch: string;
}

/** Rewrite a top-level frontmatter field, always quoting the value for YAML safety. */
export function setFrontmatterField(
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
export function upsertFrontmatterField(markdown: string, field: string, value: string): string {
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
export function fitDescription(value: string): string {
  const suffix = ' Book hourly rooms with Wfrlee.com.';
  let out = value.trim();
  if (out.length > MAX_DESC) out = out.slice(0, MAX_DESC).trim();
  while (out.length < MIN_DESC) out += suffix;
  if (out.length > MAX_DESC) out = `${out.slice(0, MAX_DESC - 3).trimEnd()}...`;
  while (out.length < MIN_DESC) out += suffix;
  return out;
}

/** Normalize a model-produced document so it passes the content schema. */
export function prepareGeneratedPost(content: string, opts: { city?: string } = {}): string {
  let out = content;
  out = setFrontmatterField(out, 'title', (value) => value.trim());
  out = setFrontmatterField(out, 'description', fitDescription);
  out = setFrontmatterField(out, 'primaryKeyword', (value) => value.trim());
  out = setFrontmatterField(out, 'category', (value) => value.trim());
  if (opts.city) out = upsertFrontmatterField(out, 'city', opts.city);
  return out;
}

/** A generation or publish failure, tagged so callers can report the right step. */
export interface PostPublishError extends Error {
  step: 'generate' | 'publish';
}

function tagStep(error: unknown, step: 'generate' | 'publish'): PostPublishError {
  const tagged = (error instanceof Error ? error : new Error(String(error))) as PostPublishError;
  tagged.step = step;
  return tagged;
}

/** Generate a guide for the brief and commit it to the content collection. */
export async function generateAndPublishPost(
  params: GeneratePostParams,
  opts: { budgetMs?: number; timeoutMs?: number } = {},
): Promise<PublishedPost> {
  const today = new Date().toISOString().slice(0, 10);
  const slug = toKebab(params.topic);
  const filename = `${today}-${slug}.md`;
  const path = `src/content/blog/${params.lang}/${filename}`;

  let content: string;
  try {
    content = prepareGeneratedPost(await generateGuide(params, opts), { city: params.city });
  } catch (error) {
    throw tagStep(error, 'generate');
  }

  try {
    const { commitSha, branch } = await commitMarkdownFile(
      path,
      content,
      `feat(ai): publish ${filename} (${params.lang})`,
    );
    return { content, filename, path, commitSha, branch };
  } catch (error) {
    throw tagStep(error, 'publish');
  }
}
