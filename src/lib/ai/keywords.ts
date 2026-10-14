/**
 * Keyword research for the weekly auto-publish job.
 *
 * Criteria: surface a keyword that is likely to (a) rank — long-tail and
 * on-brand, (b) be trending — current/seasonal interest, and (c) be
 * high-visibility — a query real travellers actually type.
 *
 * Pipeline:
 *  1. Build on-brand seed phrases (cities x stay styles), rotated by week so
 *     different weeks explore different corners of the niche.
 *  2. Expand each seed with Google's free autocomplete endpoint — a real signal
 *     of what people search (visibility) and how prominent it is (its rank in
 *     the suggestion list).
 *  3. Score every candidate locally on ranking / trend / visibility and return
 *     a ranked list.
 *
 * No AI call happens here on purpose: the weekly job must fit inside the 60s
 * serverless limit (Vercel Hobby) with a single Gemini call left for the guide
 * itself. An extra scoring round-trip made the whole job time out.
 */
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

/** Season/event words that signal current, higher-momentum demand. */
const TREND_BOOSTERS_EN = [
  'umrah',
  'hajj',
  'eid',
  'ramadan',
  'summer',
  'winter',
  'holiday',
  'riyadh season',
  'f1',
  'grand prix',
  'expo',
  'world cup',
  'new year',
  '2026',
];

const TREND_BOOSTERS_AR = [
  'عمرة',
  'حج',
  'عيد',
  'رمضان',
  'الصيف',
  'الشتاء',
  'العطلات',
  'موسم الرياض',
  'كأس',
  'معرض',
  'رأس السنة',
];

const INTENT_TERMS_EN = ['layover', 'airport', 'hourly', 'hour', 'micro', 'transit', 'stopover', 'day use', 'day-use'];
const INTENT_TERMS_AR = ['ترانزيت', 'بالساعة', 'مطار', 'قصيرة', 'نهاري', 'توقف'];

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

interface RawCandidate {
  keyword: string;
  /** Best (lowest) position across all suggestion lists; lower = more popular. */
  bestIndex: number;
  fromSuggest: boolean;
}

function collectCandidates(suggestLists: string[][], seeds: string[]): RawCandidate[] {
  const byKey = new Map<string, RawCandidate>();
  const consider = (keyword: string, index: number, fromSuggest: boolean) => {
    const trimmed = keyword.trim();
    const key = trimmed.toLowerCase();
    if (!trimmed) return;
    const existing = byKey.get(key);
    if (existing) {
      if (fromSuggest && index < existing.bestIndex) {
        existing.bestIndex = index;
        existing.fromSuggest = true;
      }
      return;
    }
    if (byKey.size >= MAX_CANDIDATES) return;
    byKey.set(key, { keyword: trimmed, bestIndex: index, fromSuggest });
  };

  for (const list of suggestLists) {
    list.forEach((keyword, index) => consider(keyword, index, true));
  }
  // Seeds themselves are always candidates (cover offline / empty-suggest runs).
  for (const seed of seeds) consider(seed, 20, false);

  return Array.from(byKey.values());
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

/** Local, dependency-free three-axis score. */
function scoreCandidates(candidates: RawCandidate[], lang: KeywordLang): ScoredKeyword[] {
  const cityTerms = cities
    .map((city) => (lang === 'ar' ? city.name.ar : city.name.en).toLowerCase())
    .concat(cities.map((city) => city.slug));
  const intentTerms = lang === 'ar' ? INTENT_TERMS_AR : INTENT_TERMS_EN;
  const boosters = lang === 'ar' ? TREND_BOOSTERS_AR : TREND_BOOSTERS_EN;

  return candidates.map((candidate) => {
    const lower = candidate.keyword.toLowerCase();
    const words = lower.split(/\s+/).filter(Boolean).length;
    const hasCity = cityTerms.some((term) => lower.includes(term));
    const hasIntent = intentTerms.some((term) => lower.includes(term));
    const booster = boosters.find((term) => lower.includes(term));

    // Ranking potential: long-tail + city + intent is the sweet spot to rank.
    const ranking = clampScore(
      45 + (hasCity ? 22 : 0) + (hasIntent ? 18 : 0) + (words >= 4 ? 10 : 0) - (words <= 2 ? 15 : 0),
    );

    // Visibility: how prominent the query is in autocomplete (lower index wins).
    const prominence = candidate.fromSuggest ? clampScore(100 - candidate.bestIndex * 8) : 45;
    const visibility = clampScore(prominence * 0.7 + (hasIntent ? 20 : 0) + (hasCity ? 10 : 0));

    // Trend: season/event keywords get a momentum boost, otherwise neutral.
    const trend = clampScore(50 + (booster ? 25 : 0) + (hasIntent ? 5 : 0));

    const score = clampScore(ranking * 0.45 + trend * 0.25 + visibility * 0.3);
    const reasonBits = [
      candidate.fromSuggest ? `Google suggest #${candidate.bestIndex + 1}` : 'seed term',
      hasCity ? 'city match' : '',
      hasIntent ? 'intent match' : '',
      booster ? `trend: ${booster}` : '',
    ].filter(Boolean);
    return {
      keyword: candidate.keyword,
      score,
      ranking,
      trend,
      visibility,
      intent: hasIntent ? 'transactional' : 'informational',
      reason: reasonBits.join(' · '),
    };
  });
}

export interface ResearchOptions {
  lang: KeywordLang;
  /** Slugs of posts already published, used to avoid duplicates. */
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
 * non-empty list when the niche has any seeds, so callers can safely publish
 * `results[0]`.
 */
export async function researchKeywords(options: ResearchOptions): Promise<ScoredKeyword[]> {
  const { lang } = options;
  const limit = options.limit ?? 12;
  const weekIndex = options.weekIndex ?? Math.floor(Date.now() / 604_800_000);
  const existing = options.existingKeywords ?? [];

  const seeds = seedKeywords(lang, weekIndex);
  const suggestResults = await Promise.allSettled(seeds.map((seed) => fetchGoogleSuggest(seed, lang)));
  const suggestLists = suggestResults
    .filter((result): result is PromiseFulfilledResult<string[]> => result.status === 'fulfilled')
    .map((result) => result.value);

  const candidates = collectCandidates(suggestLists, seeds);
  if (candidates.length === 0) return [];

  return scoreCandidates(candidates, lang)
    .filter((entry) => !alreadyCovered(entry.keyword, existing))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
