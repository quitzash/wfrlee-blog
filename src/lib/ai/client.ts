/**
 * Thin wrapper around the Gemini SDK with automatic model fallback.
 *
 * Free-tier API keys can only use Flash-family models, and those frequently
 * return 429 (quota / paid-only) or 503 (high demand). Instead of failing a
 * publish, iterate through a model list:
 *  - transport errors ("fetch failed", no HTTP status) get same-model retries
 *    with backoff (first-request DNS/TLS blips after a cold start);
 *  - 400/401/403/404 skip to the next model (a model that needs OAuth, is
 *    paid-only, or doesn't exist on this key must never abort the chain);
 *  - 429/500/503 retry the same model a few times, then skip to the next one.
 */
import { GoogleGenerativeAI } from '@google/generative-ai';
import { serverEnv } from '@/lib/env';

const apiKey = serverEnv('GEMINI_API_KEY');

/** Build a de-duplicated model list: primary env var first, then fallbacks. */
export function modelList(primaryEnv: string, defaultFallbacks: string[]): string[] {
  const list: string[] = [];
  const push = (name: string) => {
    const trimmed = (name ?? '').trim();
    if (trimmed && !list.includes(trimmed)) list.push(trimmed);
  };
  push(serverEnv(primaryEnv) ?? '');
  for (const name of (serverEnv('GEMINI_FALLBACK_MODELS') ?? '').split(',')) push(name);
  for (const name of defaultFallbacks) push(name);
  if (list.length === 0) push('gemini-2.5-flash');
  return list;
}

/** True when this one model won't work on this key — skip to the next model. */
function isModelLevelError(status: number | undefined): boolean {
  // 400/404: bad model name. 401/403: needs OAuth (pro/paid-only) or is not
  // usable with an API key — the key itself may still be fine for flash models.
  return status === 400 || status === 401 || status === 403 || status === 404;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Total wall-clock budget shared across every model and retry. Vercel Hobby
 * kills a function at 60s, so we stop ourselves a little early and throw a
 * readable error instead of letting the platform return an opaque 504.
 */
const DEFAULT_BUDGET_MS = 45_000;
/** Ceiling for a single generateContent request. */
const DEFAULT_REQUEST_TIMEOUT_MS = 30_000;
/** Never start another request with less than this much budget left. */
const MIN_ATTEMPT_MS = 1_500;

/** Call generateContent, retrying/falling back per the model list. */
export async function generateText(options: {
  prompt: string;
  systemInstruction?: string;
  models: string[];
  /** Total wall-clock budget across every model and retry (default 45s). */
  budgetMs?: number;
  /** Per-request timeout ceiling (default 30s). */
  timeoutMs?: number;
}): Promise<string> {
  if (!apiKey) throw new Error('GEMINI_API_KEY missing');
  const genAI = new GoogleGenerativeAI(apiKey);
  const budgetMs = options.budgetMs ?? DEFAULT_BUDGET_MS;
  const requestTimeoutMs = options.timeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS;
  const deadline = Date.now() + budgetMs;
  let lastError: unknown = null;
  let exhausted = false;

  for (const modelName of options.models) {
    if (exhausted) break;
    const attempts = 3; // transport blips are common on cold-start DNS
    for (let attempt = 1; attempt <= attempts; attempt++) {
      const remaining = deadline - Date.now();
      if (remaining < MIN_ATTEMPT_MS) {
        exhausted = true;
        break;
      }
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: options.systemInstruction,
        });
        const { response } = await model.generateContent(options.prompt, {
          // Fail fast so retry/fallback fits in the 60s function limit.
          timeout: Math.min(requestTimeoutMs, remaining),
        });
        return response.text();
      } catch (error: any) {
        lastError = error;
        const rawStatus = Number(error?.status);
        const status = Number.isNaN(rawStatus) ? undefined : rawStatus;
        if (isModelLevelError(status)) break; // next model
        // Transient: back off, then retry the same model — but only if the
        // backoff still leaves room for another request.
        if (attempt < attempts) {
          const backoff = 300 * attempt;
          if (Date.now() + backoff + MIN_ATTEMPT_MS >= deadline) {
            exhausted = true;
            break;
          }
          await sleep(backoff);
        }
      }
    }
  }

  if (!lastError) {
    throw new Error(
      `Gemini did not finish within ${Math.round(budgetMs / 1000)}s (tried: ${options.models.join(', ')}). ` +
        'The serverless function has a 60s limit — try again shortly.',
    );
  }

  const rawStatus = Number((lastError as any)?.status);
  const authStatus = Number.isNaN(rawStatus) ? undefined : rawStatus;
  const detail = lastError instanceof Error ? lastError.message : String(lastError);
  const authHint =
    authStatus === 401 || authStatus === 403
      ? ' The last error was an auth rejection (HTTP ' +
        authStatus +
        ') on EVERY model — the GEMINI_API_KEY on this deployment is invalid, revoked, or restricted. Copy the exact value from the GEMINI_API_KEY line in your local .env.'
      : authStatus === 429
        ? ' The last error was "quota exceeded" (HTTP 429) — the key has no free quota left right now. Wait, or use a different GEMINI_API_KEY.'
        : '';
  const budgetHint = exhausted
    ? ' The time budget ran out before any model finished — the serverless function has a 60s limit, so try again shortly.'
    : '';
  throw new Error(
    `All Gemini models are unavailable right now (tried: ${options.models.join(', ')}). ${detail}${authHint}${budgetHint}`,
  );
}