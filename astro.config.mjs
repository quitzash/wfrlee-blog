// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	// Canonical origin for the blog. Must include the scheme: Astro validates
	// `site` with z.string().url(), and a scheme-less value aborts the build
	// with "site: Invalid url".
	site: 'https://blog.wfrlee.com',
	// The blog is served from the root of its own host, so no base prefix.
	// The `/blog` segment that appears in post URLs comes from the route
	// itself (src/pages/blog/[...slug].astro), not from `base`.
	base: '/',
	output: 'server',
	adapter: cloudflare({
		// Optimize images at build time with sharp. (The default for this
		// adapter version, set explicitly to suppress the runtime-sharp
		// warning; runtime transforms would need Cloudflare Images.)
		imageService: 'compile',
	}),

	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'ar'],
		routing: {
			prefixDefaultLocale: false,
		},
	},

	integrations: [
		mdx(),
		tailwind({ applyBaseStyles: false }),
		sitemap({
			filter: (page) =>
				!page.includes('/drafts/') &&
				!page.includes('styleguide') &&
				!page.includes('/admin'),
		}),
	],

	// Admin page scripts must be real files: Vite inlines small
	// scripts (< Vite's default 4KB assetsInlineLimit) directly into SSR HTML,
	// and the admin CSP (script-src 'self') blocks inline scripts — which would
	// silently kill the admin login button. Disable inlining so every script is
	// served as a self-hosted static asset.
	vite: {
		build: {
			assetsInlineLimit: 0,
		},
	},

	experimental: {
		fonts: [
			{
				name: 'IBM Plex Sans Arabic',
				cssVariable: '--font-sans',
				provider: fontProviders.google(),
				weights: ['400', '500', '600', '700'],
				styles: ['normal'],
				subsets: ['arabic', 'latin'],
				fallbacks: ['Segoe UI', 'Tahoma', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
		],
	},
});
