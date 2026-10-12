import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPostSlug, getPosts } from '@/lib/blog';

export async function GET(context: APIContext) {
	const posts = await getPosts('ar');

	return rss({
		title: 'مدونة وفرلي.كوم',
		description:
			'أدلة الإقامات القصيرة ونصائح التوقف في المطارات والتنقّل للمسافرين في السعودية ومنطقة الشرق الأوسط.',
		site: context.site ?? 'https://wfrlee.com',
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/ar/blog/${getPostSlug(post)}/`,
			categories: post.data.tags,
			author: post.data.author,
		})),
		customData: `<language>ar</language>`,
	});
}
