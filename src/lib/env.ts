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
  // Vercel stores values literally, so trim whitespace and strip quotes that are
  // often included by accident when pasting from a .env file.
  const trimmed = raw.trim();
  const unquoted = /^(["']).*\1$/.test(trimmed) ? trimmed.slice(1, -1).trim() : trimmed;
  return unquoted.length > 0 ? unquoted : undefined;
}
