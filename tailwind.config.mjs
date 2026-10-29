import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				// Wfrlee brand blue, anchored on #374a77.
				brand: {
					50: '#f3f5fa',
					100: '#e6eaf3',
					200: '#c8d1e6',
					300: '#9fb0d1',
					400: '#7089b8',
					500: '#4f6a9f',
					600: '#374a77',
					700: '#2e3d62',
					800: '#293552',
					900: '#263047',
					950: '#191f2e',
				},
				sand: {
					50: '#fdf8f1',
					100: '#f9edda',
					200: '#f2d8b4',
					300: '#e9bd83',
					400: '#df9a51',
					500: '#d8802f',
					600: '#c96824',
					700: '#a75020',
					800: '#864120',
					900: '#6d371e',
				},
			},
			fontFamily: {
				sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				// The whole site uses one typeface, so the serif/arabic utilities
				// are kept as aliases pointing at the same family.
				serif: ['var(--font-sans)', 'Georgia', 'Cambria', 'serif'],
				arabic: ['var(--font-sans)', 'Segoe UI', 'Tahoma', 'sans-serif'],
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '72ch',
						'table th': {
							backgroundColor: '#f8fafc',
						},
					},
				},
			},
		},
	},
	plugins: [typography],
};
