import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPostSlug, getPosts } from '@/lib/blog';
import { SITE_DESCRIPTION, SITE_TITLE } from '@/consts';

export const prerender = true;

export async function GET(context: APIContext) {
	const posts = await getPosts('en');

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site ?? 'https://blog.wfrlee.com',
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${getPostSlug(post)}/`,
			categories: post.data.tags,
			author: post.data.author,
		})),
		customData: `<language>en</language>`,
	});
}
