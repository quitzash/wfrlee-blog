import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, type Locale } from '@/i18n/ui';

export type Post = CollectionEntry<'blog'>;

/** The locale a post belongs to, derived from its `en/` or `ar/` folder. */
export function getPostLang(post: Post): Locale {
	const prefix = post.id.split('/')[0];
	return prefix === 'ar' ? 'ar' : defaultLang;
}

/** The post slug without its locale folder. */
export function getPostSlug(post: Post): string {
	const parts = post.id.split('/');
	return parts.length > 1 ? parts.slice(1).join('/') : post.id;
}

export function homeHref(lang: Locale): string {
	return lang === defaultLang ? '/' : `/${lang}/`;
}

export function postHref(post: Post): string {
	const lang = getPostLang(post);
	return `${homeHref(lang)}blog/${getPostSlug(post)}/`;
}

export function rssHref(lang: Locale): string {
	return `${homeHref(lang)}rss.xml`;
}

/** All non-draft posts across every language, newest first. */
export async function getAllPosts(): Promise<Post[]> {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Non-draft posts for a single language, newest first. */
export async function getPosts(lang: Locale): Promise<Post[]> {
	const posts = await getCollection(
		'blog',
		({ data, id }) => !data.draft && id.startsWith(`${lang}/`),
	);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** The translated counterpart of a post, if one exists. */
export function findTranslation(post: Post, all: Post[]): Post | undefined {
	const lang = getPostLang(post);
	return all.find(
		(candidate) =>
			candidate.data.translationKey === post.data.translationKey &&
			getPostLang(candidate) !== lang,
	);
}

/**
 * URL of the post's translation in the other language, or `undefined` when no
 * translation exists. Callers must only use this for hreflang annotations:
 * pointing hreflang at the other language's homepage would declare a false
 * equivalence to Google.
 */
export function alternateHref(post: Post, all: Post[]): string | undefined {
	const translation = findTranslation(post, all);
	return translation ? postHref(translation) : undefined;
}

export function formatDate(date: Date, lang: Locale): string {
	return date.toLocaleDateString(lang === 'ar' ? 'ar' : 'en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export function formatDateShort(date: Date, lang: Locale): string {
	return date.toLocaleDateString(lang === 'ar' ? 'ar' : 'en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}

/** Estimated reading time in whole minutes (based on ~200 wpm). */
export function readingMinutes(post: Post): number {
	const text = post.body ?? post.data.description;
	const words = text.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

/** Posts sharing a category or tags with `current`, within the same language. */
export function relatedPosts(current: Post, all: Post[], limit = 3): Post[] {
	const lang = getPostLang(current);
	return all
		.filter((post) => post.id !== current.id && getPostLang(post) === lang)
		.map((post) => {
			const sharedTags = post.data.tags.filter((tag) =>
				current.data.tags.includes(tag),
			).length;
			const sameCategory = post.data.category === current.data.category ? 1 : 0;
			return { post, score: sharedTags * 2 + sameCategory };
		})
		.sort(
			(a, b) =>
				b.score - a.score ||
				b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf(),
		)
		.slice(0, limit)
		.map((entry) => entry.post);
}
