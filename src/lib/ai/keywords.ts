/**
 * Keyword research for the weekly auto-publish job.
 *
 * Goal: surface one keyword per week that is likely to (a) rank — long-tail and
 * on-brand, (b) be trending — current demand/momentum, and (c) be high-visibility
 * — a query real travellers actually type.
 *
 * Pipeline:
 *  1. Build on-brand seed phrases (cities x stay styles), rotated by week so
 *     different weeks explore different corners of the niche.
 *  2. Expand each seed with Google's free autocomplete endpoint — a real signal
 *     of what people search (visibility), with no API key required.
 *  3. Ask Gemini to generate a few additional rising keywords and score every
 *     candidate on ranking difficulty, trend, and visibility, returning a
 *     ranked JSON list.
 *  4. Fall back to a local heuristic score if Gemini is unavailable, so the
 *     cron never hard-fails on a quota hiccup.
 */
import { generateText, modelList } from '@/lib/ai/client';
import { cities } from '@/lib/cities';
import { toKebab } from '@/lib/utils';

export type KeywordLang = 'en' | 'ar';

export interface ScoredKeyword {
  keyword: string;
  /** Combined 0-100 score; the job publishes the highest. */
  score: number;
  /** 0-100: how realistic it is for Wfrlee to rank (higher = easier/on-brand). */
  ranking: number;
  /** 0-100: current momentum / seasonality. */
  trend: number;
  /** 0-100: estimated search demand. */
  visibility: number;
  intent: string;
  reason: string;
}

const SUGGEST_TIMEOUT_MS = 5_000;
const MAX_CANDIDATES = 45;
const MAX_SEEDS = 14;

const STAY_STYLES_EN = [
  'hourly hotel',
  'micro-stay',
  'day-use room',
  'layover hotel',
  'airport hotel',
  'short stay hotel',
  'stopover hotel',
  'last minute hotel',
  'hotel by the hour',
  'rest stop near airport',
];

const STAY_STYLES_AR = [
  'فندق بالساعة',
  'إقامة قصيرة',
  'غرفة نهارية',
  'فندق مطار',
  'فندق قرب المطار',
  'حجز فندق بالساعة',
  'استراحة قصيرة',
  'فندق ترانزيت',
];

const GENERIC_SEEDS_EN = [
  'airport layover hotel',
  'things to do on a long layover',
  'day use hotel near airport',
  'umrah short stay',
];

const GENERIC_SEEDS_AR = [
  'فندق ترانزيت مطار',
  'ماذا أفعل في الترانزيت',
  'فندق بالساعة جدة',
  'إقامة قريبة من الحرم',
];

/** Rotate the seed list by week so consecutive runs don't chase the same terms. */
function seedKeywords(lang: KeywordLang, weekIndex: number): string[] {
  const cityNames = cities.map((city) => (lang === 'ar' ? city.name.ar : city.name.en));
  const styles = lang === 'ar' ? STAY_STYLES_AR : STAY_STYLES_EN;
  const generic = lang === 'ar' ? GENERIC_SEEDS_AR : GENERIC_SEEDS_EN;

  const seeds: string[] = [];
  // Pair each city with a couple of styles, offset per week.
  cityNames.forEach((city, i) => {
    seeds.push(`${city} ${styles[(weekIndex + i) % styles.length]}`);
    seeds.push(`${styles[(weekIndex + i + 3) % styles.length]} ${city}`);
  });
  seeds.push(...generic);

  // Shuffle deterministically by week, then cap so the number of network calls
  // (and total runtime, capped at 60s on the cron) stays bounded.
  return seeds
    .map((seed, i) => ({ seed, order: (i * 7 + weekIndex * 13) % seeds.length }))
    .sort((a, b) => a.order - b.order)
    .slice(0, MAX_SEEDS)
    .map((entry) => entry.seed);
}

/** Expand one seed with Google's autocomplete endpoint (free, no key). */
async function fetchGoogleSuggest(seed: string, lang: KeywordLang): Promise<string[]> {
  const hl = lang === 'ar' ? 'ar' : 'en';
  const url =
    'https://suggestqueries.google.com/complete/search?client=firefox' +
    `&hl=${hl}&gl=sa&q=${encodeURIComponent(seed)}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SUGGEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; WfrleeBot/1.0)' },
      signal: controller.signal,
    });
    if (!response.ok) return [];
    const data = (await response.json()) as unknown;
    const list = Array.isArray(data) && Array.isArray((data as unknown[])[1]) ? ((data as unknown[])[1] as unknown[]) : [];
    return list
      .filter((item): item is string => typeof item === 'string')
      .map((item) => item.trim())
      .filter((item) => item.length >= 3 && item.length <= 80);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

function uniqueCandidates(items: string[], limit = MAX_CANDIDATES): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const key = item.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item.trim());
    if (out.length >= limit) break;
  }
  return out;
}

function clampScore(value: unknown): number {
  const num = Math.round(Number(value));
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, Math.min(100, num));
}

/** Parse a JSON array of scored keywords out of a possibly fenced model reply. */
function parseScored(raw: string): ScoredKeyword[] {
  let text = raw.trim();
  const fence = text.match(/```[a-zA-Z]*\s*([\s\S]*?)\s*```/);
  if (fence) text = fence[1].trim();
  const start = text.indexOf('[');
  const end = text.lastIndexOf(']');
  if (start === -1 || end === -1 || end < start) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(text.slice(start, end + 1));
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  const results: ScoredKeyword[] = [];
  for (const entry of parsed) {
    if (!entry || typeof entry !== 'object') continue;
    const record = entry as Record<string, unknown>;
    const keyword = typeof record.keyword === 'string' ? record.keyword.trim() : '';
    if (!keyword) continue;
    const ranking = clampScore(record.ranking);
    const trend = clampScore(record.trend);
    const visibility = clampScore(record.visibility);
    const score = clampScore(record.score) || Math.round(ranking * 0.45 + trend * 0.25 + visibility * 0.3);
    results.push({
      keyword,
      score,
      ranking,
      trend,
      visibility,
      intent: typeof record.intent === 'string' ? record.intent.slice(0, 40) : '',
      reason: typeof record.reason === 'string' ? record.reason.slice(0, 240) : '',
    });
  }
  return results;
}

/** Local, dependency-free score used when Gemini is unavailable. */
function heuristicScore(candidates: string[], lang: KeywordLang): ScoredKeyword[] {
  const cityTerms = cities
    .map((city) => (lang === 'ar' ? city.name.ar : city.name.en).toLowerCase())
    .concat(cities.map((city) => city.slug));
  const intentTerms = ['layover', 'airport', 'hourly', 'hour', 'micro', 'transit', 'stopover', 'day use', 'ترانزيت', 'بالساعة', 'مطار'];

  return candidates.map((keyword) => {
    const lower = keyword.toLowerCase();
    const words = lower.split(/\s+/).filter(Boolean).length;
    const hasCity = cityTerms.some((term) => lower.includes(term));
    const hasIntent = intentTerms.some((term) => lower.includes(term));
    // Long-tail (3-6 words) with a city + intent signal is the sweet spot.
    const ranking = Math.min(100, 40 + (hasCity ? 25 : 0) + (hasIntent ? 20 : 0) + (words >= 4 ? 10 : 0));
    const visibility = Math.min(100, 35 + (hasIntent ? 25 : 0) + (words <= 5 ? 15 : 0) + (hasCity ? 15 : 0));
    const trend = 50;
    const score = Math.round(ranking * 0.45 + trend * 0.25 + visibility * 0.3);
    return { keyword, score, ranking, trend, visibility, intent: '', reason: 'heuristic (Gemini unavailable)' };
  });
}

/** Ask Gemini to add trending candidates and score the whole pool. */
async function scoreWithGemini(
  candidates: string[],
  lang: KeywordLang,
  existing: string[],
): Promise<ScoredKeyword[]> {
  const list = candidates.map((keyword, i) => `${i + 1}. ${keyword}`).join('\n');
  const coverage = existing.slice(0, 40).join(', ') || '(none)';
  const prompt = `You are the SEO strategist for Wfrlee.com, which sells hourly micro-stays and day-use rooms for airport layovers across Saudi Arabia and MENA.

Language of the keyword set: ${lang}
Coverage already published (do NOT return these): ${coverage}

Candidate keywords collected from Google autocomplete:
${list}

Task:
1. Add up to 8 additional RISING/trending keyword ideas in ${lang} that fit the niche and are not in the coverage list.
2. Score every candidate (the autocomplete list plus your additions) on three 0-100 axes:
   - "ranking": how realistic it is for Wfrlee to rank (favour long-tail, on-brand, low-competition terms).
   - "trend": current momentum and seasonality.
   - "visibility": estimated search demand.
   - also give "score" (0-100 overall), a short "intent" label, and a one-sentence "reason".

Return ONLY a JSON array of the top 12 by score, no prose, no code fence. Each item:
{"keyword":"...","score":0,"ranking":0,"trend":0,"visibility":0,"intent":"...","reason":"..."}`;

  const raw = await generateText({
    prompt,
    models: modelList('GEMINI_FLASH_MODEL', [
      'gemini-3.6-flash',
      'gemini-3.5-flash',
      'gemini-3.8-flash',
      'gemini-3.7-flash',
      'gemini-3.1-flash-lite-preview',
    ]),
    // Keyword scoring returns a short JSON list, so a small budget keeps the
    // whole weekly job (research + guide) inside the 60s serverless limit.
    budgetMs: 12_000,
    timeoutMs: 10_000,
  });
  return parseScored(raw);
}

export interface ResearchOptions {
  lang: KeywordLang;
  /** Filenames/slugs of posts already published, used to avoid duplicates. */
  existingKeywords?: string[];
  limit?: number;
  /** Used for deterministic seed rotation; defaults to the current week. */
  weekIndex?: number;
}

/** True when a candidate has likely already been covered by an existing post. */
function alreadyCovered(keyword: string, existing: string[]): boolean {
  const slug = toKebab(keyword);
  if (!slug) return false;
  return existing.some((value) => {
    const existingSlug = toKebab(value);
    if (!existingSlug) return false;
    return existingSlug === slug || existingSlug.includes(slug) || slug.includes(existingSlug);
  });
}

/**
 * Run the full pipeline and return ranked keywords. Always resolves to a
 * non-empty list when the niche has any seeds (heuristic fallback), so callers
 * can safely publish `results[0]`.
 */
export async function researchKeywords(options: ResearchOptions): Promise<ScoredKeyword[]> {
  const { lang } = options;
  const limit = options.limit ?? 12;
  const weekIndex = options.weekIndex ?? Math.floor(Date.now() / 604_800_000);
  const existing = options.existingKeywords ?? [];

  const seeds = seedKeywords(lang, weekIndex);
  const suggestResults = await Promise.allSettled(seeds.map((seed) => fetchGoogleSuggest(seed, lang)));
  const fromSuggest = suggestResults.flatMap((result) => (result.status === 'fulfilled' ? result.value : []));

  // Seeds themselves are always candidates (cover offline / empty-suggest runs).
  const candidates = uniqueCandidates([...fromSuggest, ...seeds]);
  if (candidates.length === 0) return [];

  let scored: ScoredKeyword[];
  try {
    scored = await scoreWithGemini(candidates, lang, existing);
  } catch {
    scored = [];
  }
  const basePool = scored.length > 0 ? scored : heuristicScore(candidates, lang);

  // Merge anything Gemini dropped back in with a heuristic score so the pool is
  // complete, then filter duplicates and rank.
  const scoredKeys = new Set(basePool.map((entry) => entry.keyword.toLowerCase()));
  const remainder = heuristicScore(
    candidates.filter((candidate) => !scoredKeys.has(candidate.toLowerCase())),
    lang,
  );
  const merged = [...basePool, ...remainder]
    .filter((entry) => !alreadyCovered(entry.keyword, existing))
    .sort((a, b) => b.score - a.score);

  return merged.slice(0, limit);
}
