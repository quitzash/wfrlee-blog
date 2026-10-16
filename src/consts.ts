// Global site data. Import anywhere with: import { SITE_TITLE } from '@/consts';

export const SITE_URL = 'https://wfrlee.com';
export const SITE_TITLE = 'Wfrlee Blog';
/** Arabic blog/site title, shown on /ar/ pages only. */
export const SITE_TITLE_AR = 'مدونة وفرلي.كوم';
export const SITE_BRAND = 'Wfrlee.com';
/** Arabic brand name — "وفّر لي" (save for me). */
export const SITE_BRAND_AR = 'وفرلي.كوم';
export const SITE_DESCRIPTION =
	'Micro-stay guides, airport layover survival tips, and hourly hotel booking advice for travelers across Saudi Arabia and the wider MENA region.';
/** Arabic site description, shown on /ar/ pages only. */
export const SITE_DESCRIPTION_AR =
	'أدلة الإقامات القصيرة ونصائح التوقف في المطارات والتنقّل للمسافرين في السعودية ومنطقة الشرق الأوسط.';

/**
 * Site-wide SEO keywords. Emitted as `<meta name="keywords">` on every page and
 * merged into the BlogPosting JSON-LD `keywords`, so each guide always carries a
 * shared base set of high-value terms alongside its own tags.
 */
export const SITE_KEYWORDS = [
	'short stays',
	'booking',
	'hourly hotels',
	'micro-stay hotels',
	'day-use rooms',
	'airport layover hotels',
	'Saudi Arabia',
	'KSA',
	'budget travel',
	'transit hotels',
];

/** Arabic equivalent of {@link SITE_KEYWORDS}. */
export const SITE_KEYWORDS_AR = [
	'إقامة قصيرة',
	'حجز فنادق',
	'فنادق بالساعة',
	'إقامة بالساعة',
	'غرف استخدام يومي',
	'حجز فندق بالمطار',
	'السعودية',
	'سفر اقتصادي',
	'فنادق الترانزيت',
];

/** The base keyword list for a given locale. */
export function siteKeywords(lang: 'en' | 'ar'): string[] {
	return lang === 'ar' ? SITE_KEYWORDS_AR : SITE_KEYWORDS;
}
export const SITE_TAGLINE = 'Pay as you stay';
export const SITE_AUTHOR = 'Wfrlee Travel Team';
export const TWITTER_HANDLE = '@wfrlee';
export const DEFAULT_OG_IMAGE = '/images/og-default.jpg';
export const BOOKING_URL = 'https://wfrlee.com';
export const CONTACT_EMAIL = 'info@wfrlee.com';

/** Open Graph locales for each supported language. */
export const SITE_LOCALES = {
	en: 'en_US',
	ar: 'ar_AR',
} as const;

/** iOS / Android download links for the Wfrlee app. */
export const APP_LINKS = {
	ios: 'https://apps.apple.com/app/id1672569695',
	android: 'https://play.google.com/store/apps/details?id=com.wfrlee',
} as const;

/** Social links shown in the footer. They all point to the main Wfrlee.com site. */
export const SOCIAL_LINKS = [
	{ label: 'X', href: "https://twitter.com/wfrlee" },
	{ label: 'Instagram', href: "https://www.instagram.com/wfrlee.co" },
	{ label: 'Facebook', href: "https://www.facebook.com/wfrlee.co" },
	{ label: 'TikTok', href: "https://www.tiktok.com/@wfrlee.com" },
] as const;

/** Pages that live on the main wfrlee.com site (not on this blog). */
export const MAIN_SITE_LINKS = {
	faq: 'https://wfrlee.com/faq',
	offers: 'https://wfrlee.com/offers',
	careers: 'https://wfrlee.com/careers',
	contact: 'https://wfrlee.com/contactus',
	referral: 'https://wfrlee.com/referral',
	privacy: 'https://wfrlee.com/privacy-policy',
	safety: 'https://wfrlee.com/safety',
	terms: 'https://wfrlee.com/terms',
	partner: 'https://wfrlee.com/partner',
} as const;
