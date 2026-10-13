/**
 * Thin wrapper around the Gemini SDK with automatic model fallback.
 *
 * Free-tier API keys can only use Flash-family models, and those frequently
 * return 429 (quota / paid-only) or 503 (high demand). Instead of failing a
 * publish, iterate through a model list — skip 400/401/403/404 (permanent
 * failures) but retry on transient errors like 429/500/503.
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

function isRetryable(status: number | undefined): boolean {
  return status === 429 || status === 500 || status === 503;
}

/** Call generateContent, falling back to the next model in `models` on transient errors. */
export async function generateText(options: {
  prompt: string;
  systemInstruction?: string;
  models: string[];
}): Promise<string> {
  if (!apiKey) throw new Error('GEMINI_API_KEY missing');
  const genAI = new GoogleGenerativeAI(apiKey);
  let lastError: unknown = null;

  for (const modelName of options.models) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: options.systemInstruction,
      });
      const { response } = await model.generateContent(options.prompt);
      return response.text();
    } catch (error: any) {
      lastError = error;
      if (!isRetryable(Number(error?.status))) throw error;
      // Transient: brief pause before trying the next model.
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  const detail = lastError instanceof Error ? lastError.message : String(lastError);
  throw new Error(
    `All Gemini models are unavailable right now (tried: ${options.models.join(', ')}). ${detail}`,
  );
}