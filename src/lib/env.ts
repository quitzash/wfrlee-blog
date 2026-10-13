/**
 * Read a server-side secret at runtime.
 *
 * Vite inlines `import.meta.env.*` at build time, which bakes secrets into the
 * build output and means a missing variable at build time can never be fixed at
 * runtime. On Vercel, project environment variables are injected into
 * `process.env`, so prefer that and fall back to `import.meta.env` for local dev.
 */
export function serverEnv(name: string): string | undefined {
  if (typeof process !== 'undefined' && process.env && process.env[name]) {
    return process.env[name];
  }
  const metaEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  return metaEnv?.[name];
}
