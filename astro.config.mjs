// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	site: 'https://wfrlee.com',
	base: '/blog',
	output: 'server',
	adapter: vercel({
		imageService: true,
		webAnalytics: { enabled: true },
		// Guide generation with the larger word/paragraph target can take well
		// over a minute. Vercel Hobby caps functions at 60s; Pro allows up to
		// 300s. Raise this to 300 if you are on a Pro plan so the whole guide
		// finishes in one request instead of being killed mid-stream.
		maxDuration: 300,
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

	// Admin page scripts must be real files: @astrojs/vercel inlines small
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