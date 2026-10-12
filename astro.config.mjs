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
	adapter: vercel({ webAnalytics: { enabled: true } }),

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
			filter: (page) => !page.includes('/drafts/') && !page.includes('styleguide'),
		}),
	],

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