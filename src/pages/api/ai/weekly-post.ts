import type { APIRoute } from 'astro';
import { z } from 'zod';
import { researchKeywords } from '@/lib/ai/keywords';
import { generateAndPublishPost } from '@/lib/ai/post';
import { listMarkdownFiles } from '@/lib/publish/github';
import { cities } from '@/lib/cities';
import { serverEnv } from '@/lib/env';
import {
  SESSION_COOKIE,
  clientIp,
  constantTimeEqual,
  isAdminAuthed,
  isRateLimited,
  isTrustedOrigin,
  withSecurityHeaders,
} from '@/lib/auth';

export const prerender = false;

const BLOG_PREFIX = 'src/content/blog/';
const LANGUAGES = ['en', 'ar'] as const;
type Lang = (typeof LANGUAGES)[number];

const langSchema = z.enum(['en', 'ar', 'auto']).optional();

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

/** One ISO week in milliseconds — used to alternate languages and rotate seeds. */
const WEEK_MS = 604_800_000;

function currentWeekIndex(): number {
  return Math.floor(Date.now() / WEEK_MS);
}

/** Alternate EN/AR each week so both audiences keep getting fresh guides. */
function autoLang(): Lang {
  return currentWeekIndex() % 2 === 0 ? 'en' : 'ar';
}

/** Slugs of every published post (both languages), used to avoid duplicates. */
async function existingSlugs(): Promise<string[]> {
  const results = await Promise.allSettled(
    LANGUAGES.map((lang) => listMarkdownFiles(`${BLOG_PREFIX}${lang}`)),
  );
  return results.flatMap((result) =>
    result.status === 'fulfilled'
      ? result.value.map((file) => file.name.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.(md|mdx)$/i, ''))
      : [],
  );
}

/** Match a keyword to a known city so the generated guide is anchored. */
function detectCity(keyword: string): string | undefined {
  const lower = keyword.toLowerCase();
  const city = cities.find(
    (entry) =>
      lower.includes(entry.name.en.toLowerCase()) ||
      lower.includes(entry.slug.replace(/-/g, ' ')),
  );
  return city?.name.en;
}

function buildTags(keyword: string, lang: Lang, city?: string): string[] {
  const tags = new Set<string>();
  if (city) tags.add(city.toLowerCase());
  const intent: Array<[RegExp, string]> = [
    [/layover|transit|ترانزيت/i, 'layover'],
    [/airport|مطار/i, 'airport'],
    [/hourly|hour|بالساعة/i, 'micro-stays'],
    [/day.?use|نهاري/i, 'day-use rooms'],
    [/stopover|توقف/i, 'stopover'],
  ];
  for (const [pattern, tag] of intent) {
    if (pattern.test(keyword)) tags.add(tag);
    if (tags.size >= 5) break;
  }
  tags.add(lang === 'ar' ? 'وفرلي' : 'wfrlee.com');
  return Array.from(tags).slice(0, 8);
}

async function runWeekly(
  request: Request,
  cookies: { get(name: string): { value: string } | undefined },
  langChoice: Lang | 'auto',
): Promise<Response> {
  if (!serverEnv('ADMIN_TOKEN')?.trim()) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Server misconfigured: ADMIN_TOKEN is not set on Vercel.' }, 500));
  }

  // Vercel cron jobs send `Authorization: Bearer <CRON_SECRET>` automatically
  // once CRON_SECRET is configured, so the weekly post can run unattended.
  const cronSecret = serverEnv('CRON_SECRET')?.trim();
  const authHeader = request.headers.get('authorization') ?? '';
  const isCron = Boolean(cronSecret) && constantTimeEqual(authHeader, `Bearer ${cronSecret}`);

  if (!isCron) {
    const sessionCookie = cookies.get(SESSION_COOKIE)?.value ?? null;
    if (!isAdminAuthed(request, sessionCookie)) {
      return withSecurityHeaders(jsonResponse({ ok: false, error: 'Unauthorized' }, 401));
    }
    if (!isTrustedOrigin(request)) {
      return withSecurityHeaders(jsonResponse({ ok: false, error: 'forbidden' }, 403));
    }
    const ip = clientIp(request);
    if (isRateLimited(`weekly-post:${ip}`, 4, 60 * 60 * 1000)) {
      return withSecurityHeaders(jsonResponse({ ok: false, error: 'Too many requests. Try again later.' }, 429));
    }
  }

  const lang: Lang = langChoice === 'auto' ? autoLang() : langChoice;

  let ranked;
  try {
    ranked = await researchKeywords({
      lang,
      existingKeywords: await existingSlugs(),
      limit: 12,
      weekIndex: currentWeekIndex(),
    });
  } catch (e: any) {
    return withSecurityHeaders(jsonResponse({ ok: false, step: 'research', error: e?.message ?? 'Keyword research failed' }, 502));
  }

  if (ranked.length === 0) {
    return withSecurityHeaders(jsonResponse({ ok: false, step: 'research', error: 'No keyword candidates found.' }, 502));
  }

  const pick = ranked[0];
  const city = detectCity(pick.keyword);
  const topic = pick.keyword.charAt(0).toUpperCase() + pick.keyword.slice(1);

  try {
    const published = await generateAndPublishPost(
      {
        lang,
        topic,
        primaryKeyword: pick.keyword,
        city,
        tags: buildTags(pick.keyword, lang, city),
        includeFaq: true,
      },
      // Research already spent up to ~12s + suggest; keep the guide within the
      // remaining slice of the 60s Vercel Hobby function limit.
      { budgetMs: 35_000, timeoutMs: 25_000 },
    );
    return withSecurityHeaders(
      jsonResponse(
        {
          ok: true,
          lang,
          keyword: pick.keyword,
          scores: { overall: pick.score, ranking: pick.ranking, trend: pick.trend, visibility: pick.visibility },
          reason: pick.reason,
          path: published.path,
          filename: published.filename,
          commitSha: published.commitSha,
          branch: published.branch,
          alternates: ranked.slice(1, 6).map((entry) => entry.keyword),
        },
        200,
      ),
    );
  } catch (e: any) {
    return withSecurityHeaders(jsonResponse({ ok: false, step: 'publish', keyword: pick.keyword, error: e?.message ?? 'Publish failed' }, 502));
  }
}

export const POST: APIRoute = async ({ request, cookies }) => {
  let langChoice: Lang | 'auto' = 'auto';
  try {
    const body = (await request.json().catch(() => ({}))) as { lang?: unknown };
    langChoice = langSchema.parse(body.lang) ?? 'auto';
  } catch {
    return withSecurityHeaders(jsonResponse({ ok: false, error: 'Invalid request body.' }, 400));
  }
  return runWeekly(request, cookies, langChoice);
};

/** Vercel cron entry point. Language alternates weekly unless `?lang=` is given. */
export const GET: APIRoute = async ({ request, cookies, url }) => {
  const raw = url.searchParams.get('lang');
  const langChoice: Lang | 'auto' = raw === 'en' || raw === 'ar' ? raw : 'auto';
  return runWeekly(request, cookies, langChoice);
};
