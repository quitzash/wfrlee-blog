import { defaultLang, type Locale } from '@/i18n/ui';

export type StaticPage = 'about' | 'why-wfrlee';

/** Localized URL for a top-level static page (e.g. About, Why Wfrlee). */
export function pageHref(page: StaticPage, lang: Locale): string {
	const prefix = lang === defaultLang ? '/' : `/${lang}/`;
	return `${prefix}${page}/`;
}

/** The same static page in the other language. */
export function pageAlternateHref(page: StaticPage, lang: Locale): string {
	return pageHref(page, lang === 'en' ? 'ar' : 'en');
}
