/**
 * Read a server-side secret at runtime.
 *
 * Vite inlines `import.meta.env.*` at build time, which bakes secrets into the
 * build output and means a missing variable at build time can never be fixed at
 * runtime. On Vercel, project environment variables are injected into
 * `process.env`, so prefer that and fall back to `import.meta.env` for local dev.
 */
export function serverEnv(name: string): string | undefined {
  const raw =
    typeof process !== 'undefined' && process.env && process.env[name]
      ? process.env[name]
      : (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.[name];
  if (raw === undefined) return undefined;
  return normalize(name, raw);
}

/**
 * Vercel stores values literally, so clean up the sloppy-but-common mistakes
 * that happen when pasting from a .env file: surrounding whitespace, wrapping
 * quotes, and a leading `NAME=` prefix (e.g. a value of
 * `GEMINI_MODEL=gemini-3.1-pro-preview`).
 */
function normalize(name: string, raw: string): string | undefined {
  const stripQuotes = (value: string) => {
    const match = value.match(/^(["'])(.*)\1$/);
    return match ? match[2].trim() : value;
  };

  let value = stripQuotes(raw.trim());

  const prefix = `${name.toUpperCase()}=`;
  if (value.toUpperCase().startsWith(prefix)) {
    value = stripQuotes(value.slice(prefix.length).trim());
  }

  return value.length > 0 ? value : undefined;
}
