// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	site: 'https://wfrlee.com',
	output: 'server',
	adapter: vercel({
		imageService: true,
		webAnalytics: { enabled: true },
		// Claude guide generation commonly takes 20-60s; without this, Vercel
		// (Hobby default ~10s) kills the function mid-request and the browser
		// shows "Failed to fetch". 60s is the Hobby ceiling, Pro allows more.
		maxDuration: 60,
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