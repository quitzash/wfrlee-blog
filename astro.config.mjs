// @ts-check

import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	// Canonical production origin. Used for sitemap URLs, canonical tags,
	// Open Graph URLs and absolute links inside the RSS feed.
	site: 'https://wfrlee.com',

	// English is served from the site root, Arabic from /ar/ (RTL).
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'ar'],
		routing: {
			prefixDefaultLocale: false,
		},
	},

	integrations: [
		mdx(),
		// Tailwind is loaded through the official integration. Base styles are
		// applied manually from `src/styles/global.css` so they can be shared by
		// every layout.
		tailwind({ applyBaseStyles: false }),
		sitemap({
			// Keep draft routes and the internal style guide out of the sitemap.
			filter: (page) => !page.includes('/drafts/') && !page.includes('styleguide'),
		}),
	],

	// The Fonts API is still flagged as experimental in Astro 5.x.
	experimental: {
		fonts: [
			{
				// One typeface for the whole site. IBM Plex Sans Arabic ships a
				// full Latin subset, so the English and Arabic versions render in
				// the exact same font.
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
