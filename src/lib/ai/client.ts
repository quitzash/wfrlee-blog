/**
 * Thin wrapper around the Gemini SDK with automatic model fallback.
 *
 * Free-tier API keys can only use Flash-family models, and those frequently
 * return 429 (quota / paid-only) or 503 (high demand). Instead of failing a
 * publish, iterate through a model list:
 *  - transport errors ("fetch failed", no HTTP status) get same-model retries
 *    with backoff (first-request DNS/TLS blips after a cold start);
 *  - 400/404 (bad model name on this key) skip to the next model;
 *  - 429/500/503 skip to the next model after a brief pause;
 *  - 401/403 (auth) throw — no other model will help.
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

/** True when an HTTP error means "this model won't work on this key" — skip it. */
function isModelLevelError(status: number | undefined): boolean {
  return status === 400 || status === 404;
}

/** True when the error is fatal and no other model can help. */
function isFatal(status: number | undefined): boolean {
  return status === 401 || status === 403;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Call generateContent, retrying/falling back per the model list. */
export async function generateText(options: {
  prompt: string;
  systemInstruction?: string;
  models: string[];
}): Promise<string> {
  if (!apiKey) throw new Error('GEMINI_API_KEY missing');
  const genAI = new GoogleGenerativeAI(apiKey);
  let lastError: unknown = null;

  for (const modelName of options.models) {
    const attempts = 3; // transport blips are common on cold-start DNS
    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: options.systemInstruction,
          requestOptions: { timeout: 45_000 }, // fail fast so retry/fallback fits in maxDuration 60
        });
        const { response } = await model.generateContent(options.prompt);
        return response.text();
      } catch (error: any) {
        lastError = error;
        const status = Number(error?.status);
        if (isFatal(Number.isNaN(status) ? undefined : status)) throw error;
        if (isModelLevelError(Number.isNaN(status) ? undefined : status)) break; // next model
        // Transient or transport error: back off, then retry the same model.
        if (attempt < attempts) {
          await sleep(300 * attempt);
        }
      }
    }
  }

  const detail = lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(
    `All Gemini models are unavailable right now (tried: ${options.models.join(', ')}). ${detail}`,
  );
}