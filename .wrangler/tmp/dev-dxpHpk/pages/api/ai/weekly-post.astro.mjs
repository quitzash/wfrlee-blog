globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as cities } from '../../../chunks/cities_DruEJ56b.mjs';
import { t as toKebab, a as generateAndPublishPost } from '../../../chunks/post_DO_0gzjG.mjs';
import { l as listMarkdownFiles } from '../../../chunks/github_B_n3j09G.mjs';
import { w as withSecurityHeaders, s as serverEnv, f as constantTimeEqual, S as SESSION_COOKIE, e as isAdminAuthed, i as isTrustedOrigin, c as clientIp, a as isRateLimited } from '../../../chunks/auth_BCnYD5b9.mjs';
import { _ as _enum } from '../../../chunks/schemas_Dv1TULK3.mjs';
export { renderers } from '../../../renderers.mjs';

const SUGGEST_TIMEOUT_MS = 5e3;
const MAX_CANDIDATES = 45;
const MAX_SEEDS = 14;
const STAY_STYLES_EN = [
  "hourly hotel",
  "micro-stay",
  "day-use room",
  "layover hotel",
  "airport hotel",
  "short stay hotel",
  "stopover hotel",
  "last minute hotel",
  "hotel by the hour",
  "rest stop near airport"
];
const STAY_STYLES_AR = [
  "فندق بالساعة",
  "إقامة قصيرة",
  "غرفة نهارية",
  "فندق مطار",
  "فندق قرب المطار",
  "حجز فندق بالساعة",
  "استراحة قصيرة",
  "فندق ترانزيت"
];
const GENERIC_SEEDS_EN = [
  "airport layover hotel",
  "things to do on a long layover",
  "day use hotel near airport",
  "umrah short stay"
];
const GENERIC_SEEDS_AR = [
  "فندق ترانزيت مطار",
  "ماذا أفعل في الترانزيت",
  "فندق بالساعة جدة",
  "إقامة قريبة من الحرم"
];
const TREND_BOOSTERS_EN = [
  "umrah",
  "hajj",
  "eid",
  "ramadan",
  "summer",
  "winter",
  "holiday",
  "riyadh season",
  "f1",
  "grand prix",
  "expo",
  "world cup",
  "new year",
  "2026"
];
const TREND_BOOSTERS_AR = [
  "عمرة",
  "حج",
  "عيد",
  "رمضان",
  "الصيف",
  "الشتاء",
  "العطلات",
  "موسم الرياض",
  "كأس",
  "معرض",
  "رأس السنة"
];
const INTENT_TERMS_EN = ["layover", "airport", "hourly", "hour", "micro", "transit", "stopover", "day use", "day-use"];
const INTENT_TERMS_AR = ["ترانزيت", "بالساعة", "مطار", "قصيرة", "نهاري", "توقف"];
function seedKeywords(lang, weekIndex) {
  const cityNames = cities.map((city) => lang === "ar" ? city.name.ar : city.name.en);
  const styles = lang === "ar" ? STAY_STYLES_AR : STAY_STYLES_EN;
  const generic = lang === "ar" ? GENERIC_SEEDS_AR : GENERIC_SEEDS_EN;
  const seeds = [];
  cityNames.forEach((city, i) => {
    seeds.push(`${city} ${styles[(weekIndex + i) % styles.length]}`);
    seeds.push(`${styles[(weekIndex + i + 3) % styles.length]} ${city}`);
  });
  seeds.push(...generic);
  return seeds.map((seed, i) => ({ seed, order: (i * 7 + weekIndex * 13) % seeds.length })).sort((a, b) => a.order - b.order).slice(0, MAX_SEEDS).map((entry) => entry.seed);
}
async function fetchGoogleSuggest(seed, lang) {
  const hl = lang === "ar" ? "ar" : "en";
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=${hl}&gl=sa&q=${encodeURIComponent(seed)}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SUGGEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; WfrleeBot/1.0)" },
      signal: controller.signal
    });
    if (!response.ok) return [];
    const data = await response.json();
    const list = Array.isArray(data) && Array.isArray(data[1]) ? data[1] : [];
    return list.filter((item) => typeof item === "string").map((item) => item.trim()).filter((item) => item.length >= 3 && item.length <= 80);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}
function collectCandidates(suggestLists, seeds) {
  const byKey = /* @__PURE__ */ new Map();
  const consider = (keyword, index, fromSuggest) => {
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
  for (const seed of seeds) consider(seed, 20, false);
  return Array.from(byKey.values());
}
function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}
function scoreCandidates(candidates, lang) {
  const cityTerms = cities.map((city) => (lang === "ar" ? city.name.ar : city.name.en).toLowerCase()).concat(cities.map((city) => city.slug));
  const intentTerms = lang === "ar" ? INTENT_TERMS_AR : INTENT_TERMS_EN;
  const boosters = lang === "ar" ? TREND_BOOSTERS_AR : TREND_BOOSTERS_EN;
  return candidates.map((candidate) => {
    const lower = candidate.keyword.toLowerCase();
    const words = lower.split(/\s+/).filter(Boolean).length;
    const hasCity = cityTerms.some((term) => lower.includes(term));
    const hasIntent = intentTerms.some((term) => lower.includes(term));
    const booster = boosters.find((term) => lower.includes(term));
    const ranking = clampScore(
      45 + (hasCity ? 22 : 0) + (hasIntent ? 18 : 0) + (words >= 4 ? 10 : 0) - (words <= 2 ? 15 : 0)
    );
    const prominence = candidate.fromSuggest ? clampScore(100 - candidate.bestIndex * 8) : 45;
    const visibility = clampScore(prominence * 0.7 + (hasIntent ? 20 : 0) + (hasCity ? 10 : 0));
    const trend = clampScore(50 + (booster ? 25 : 0) + (hasIntent ? 5 : 0));
    const score = clampScore(ranking * 0.45 + trend * 0.25 + visibility * 0.3);
    const reasonBits = [
      candidate.fromSuggest ? `Google suggest #${candidate.bestIndex + 1}` : "seed term",
      hasCity ? "city match" : "",
      hasIntent ? "intent match" : "",
      booster ? `trend: ${booster}` : ""
    ].filter(Boolean);
    return {
      keyword: candidate.keyword,
      score,
      ranking,
      trend,
      visibility,
      intent: hasIntent ? "transactional" : "informational",
      reason: reasonBits.join(" · ")
    };
  });
}
function alreadyCovered(keyword, existing) {
  const slug = toKebab(keyword);
  if (!slug) return false;
  return existing.some((value) => {
    const existingSlug = toKebab(value);
    if (!existingSlug) return false;
    return existingSlug === slug || existingSlug.includes(slug) || slug.includes(existingSlug);
  });
}
async function researchKeywords(options) {
  const { lang } = options;
  const limit = options.limit ?? 12;
  const weekIndex = options.weekIndex ?? Math.floor(Date.now() / 6048e5);
  const existing = options.existingKeywords ?? [];
  const seeds = seedKeywords(lang, weekIndex);
  const suggestResults = await Promise.allSettled(seeds.map((seed) => fetchGoogleSuggest(seed, lang)));
  const suggestLists = suggestResults.filter((result) => result.status === "fulfilled").map((result) => result.value);
  const candidates = collectCandidates(suggestLists, seeds);
  if (candidates.length === 0) return [];
  return scoreCandidates(candidates, lang).filter((entry) => !alreadyCovered(entry.keyword, existing)).sort((a, b) => b.score - a.score).slice(0, limit);
}

const prerender = false;
const BLOG_PREFIX = "src/content/blog/";
const LANGUAGES = ["en", "ar"];
const langSchema = _enum(["en", "ar", "auto"]).optional();
const CRON_SCHEDULE_EN = "0 7 * * 1";
const CRON_SCHEDULE_AR = "30 7 * * 1";
function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" }
  });
}
const WEEK_MS = 6048e5;
function currentWeekIndex() {
  return Math.floor(Date.now() / WEEK_MS);
}
function autoLang() {
  return currentWeekIndex() % 2 === 0 ? "en" : "ar";
}
function langFromCronSchedule(request) {
  const schedule = (request.headers.get("x-vercel-cron-schedule") ?? "").trim();
  if (schedule === CRON_SCHEDULE_AR) return "ar";
  if (schedule === CRON_SCHEDULE_EN) return "en";
  return void 0;
}
async function existingSlugs() {
  const results = await Promise.allSettled(
    LANGUAGES.map((lang) => listMarkdownFiles(`${BLOG_PREFIX}${lang}`))
  );
  return results.flatMap(
    (result) => result.status === "fulfilled" ? result.value.map((file) => file.name.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.(md|mdx)$/i, "")) : []
  );
}
function detectCity(keyword) {
  const lower = keyword.toLowerCase();
  const city = cities.find(
    (entry) => lower.includes(entry.name.en.toLowerCase()) || lower.includes(entry.slug.replace(/-/g, " "))
  );
  return city?.name.en;
}
function buildTags(keyword, lang, city) {
  const tags = /* @__PURE__ */ new Set();
  if (city) tags.add(city.toLowerCase());
  const intent = [
    [/layover|transit|ترانزيت/i, "layover"],
    [/airport|مطار/i, "airport"],
    [/hourly|hour|بالساعة/i, "micro-stays"],
    [/day.?use|نهاري/i, "day-use rooms"],
    [/stopover|توقف/i, "stopover"]
  ];
  for (const [pattern, tag] of intent) {
    if (pattern.test(keyword)) tags.add(tag);
    if (tags.size >= 5) break;
  }
  tags.add(lang === "ar" ? "وفرلي" : "wfrlee.com");
  return Array.from(tags).slice(0, 8);
}
async function runWeekly(request, cookies, langChoice) {
  if (!serverEnv("ADMIN_TOKEN")?.trim()) {
    return withSecurityHeaders(jsonResponse({ ok: false, error: "Server misconfigured: ADMIN_TOKEN is not set on Vercel." }, 500));
  }
  const cronSecret = serverEnv("CRON_SECRET")?.trim();
  const authHeader = request.headers.get("authorization") ?? "";
  const isCron = Boolean(cronSecret) && constantTimeEqual(authHeader, `Bearer ${cronSecret}`);
  if (!isCron) {
    const sessionCookie = cookies.get(SESSION_COOKIE)?.value ?? null;
    if (!isAdminAuthed(request, sessionCookie)) {
      return withSecurityHeaders(jsonResponse({ ok: false, error: "Unauthorized" }, 401));
    }
    if (!isTrustedOrigin(request)) {
      return withSecurityHeaders(jsonResponse({ ok: false, error: "forbidden" }, 403));
    }
    const ip = clientIp(request);
    if (isRateLimited(`weekly-post:${ip}`, 4, 60 * 60 * 1e3)) {
      return withSecurityHeaders(jsonResponse({ ok: false, error: "Too many requests. Try again later." }, 429));
    }
  }
  const lang = langChoice === "auto" ? autoLang() : langChoice;
  let ranked;
  try {
    ranked = await researchKeywords({
      lang,
      existingKeywords: await existingSlugs(),
      limit: 12,
      weekIndex: currentWeekIndex()
    });
  } catch (e) {
    return withSecurityHeaders(jsonResponse({ ok: false, step: "research", error: e?.message ?? "Keyword research failed" }, 502));
  }
  if (ranked.length === 0) {
    return withSecurityHeaders(jsonResponse({ ok: false, step: "research", error: "No keyword candidates found." }, 502));
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
        includeFaq: true
      },
      // Keyword research is now local + Suggest only, so the guide gets the
      // bulk of the function's maxDuration (see astro.config.mjs).
      { budgetMs: 24e4, timeoutMs: 12e4 }
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
          alternates: ranked.slice(1, 6).map((entry) => entry.keyword)
        },
        200
      )
    );
  } catch (e) {
    const step = e?.step === "generate" ? "generate" : "publish";
    return withSecurityHeaders(jsonResponse({ ok: false, step, keyword: pick.keyword, error: e?.message ?? "Publish failed" }, 502));
  }
}
const POST = async ({ request, cookies }) => {
  let langChoice = "auto";
  try {
    const body = await request.json().catch(() => ({}));
    langChoice = langSchema.parse(body.lang) ?? "auto";
  } catch {
    return withSecurityHeaders(jsonResponse({ ok: false, error: "Invalid request body." }, 400));
  }
  return runWeekly(request, cookies, langChoice);
};
const GET = async ({ request, cookies, url }) => {
  const raw = url.searchParams.get("lang");
  const langChoice = raw === "en" || raw === "ar" ? raw : langFromCronSchedule(request) ?? "auto";
  return runWeekly(request, cookies, langChoice);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
