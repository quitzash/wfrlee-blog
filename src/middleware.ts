/**
 * Baseline security headers for every rendered response.
 *
 * `public/.htaccess` and `public/web.config` carry the same policy for the
 * Apache/IIS hosts; the VM runs nginx, which ignores both. This middleware
 * covers the pages the Node server renders at request time (home, admin, API
 * routes). The prerendered HTML and static assets bypass middleware, so
 * `deploy/nginx.conf` adds the same headers to those.
 */
import { defineMiddleware } from 'astro:middleware';

/**
 * CSP for the public pages. Mirrors the stricter admin policy in
 * `src/lib/auth.ts`, but allows the site to frame itself.
 *
 * A strict policy is safe here because every resource is self-hosted:
 * Astro's Font API downloads the webfont at build time, the theme's script
 * is emitted as its own file (`vite.build.assetsInlineLimit: 0`), and the
 * only inline `<script>` tags are JSON-LD data blocks, which CSP does not
 * restrict.
 */
const PUBLIC_CSP =
	"default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; " +
	"script-src 'self'; font-src 'self' data:; connect-src 'self'; base-uri 'self'; " +
	"form-action 'self'; frame-ancestors 'self'; object-src 'none'";

const SECURITY_HEADERS: Record<string, string> = {
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'SAMEORIGIN',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
	'Cross-Origin-Opener-Policy': 'same-origin',
};

export const onRequest = defineMiddleware(async (context, next) => {
	const response = await next();

	// Only fill in what the route did not set itself: the admin pages use a
	// stricter policy (X-Frame-Options: DENY, frame-ancestors 'none') and the
	// API routes set their own no-store headers.
	for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
		if (!response.headers.has(name)) response.headers.set(name, value);
	}

	// The dev server injects inline scripts (toolbar, HMR), so the CSP and
	// HSTS only apply to production builds.
	if (import.meta.env.PROD) {
		if (!response.headers.has('Content-Security-Policy')) {
			response.headers.set('Content-Security-Policy', PUBLIC_CSP);
		}
		if (
			!response.headers.has('Strict-Transport-Security') &&
			context.url.protocol === 'https:'
		) {
			response.headers.set(
				'Strict-Transport-Security',
				'max-age=31536000; includeSubDomains',
			);
		}
	}

	return response;
});
