import rss from '@astrojs/rss';
import { g as getPosts, a as getPostSlug } from '../../chunks/blog_BWAOoHv7.mjs';
export { renderers } from '../../renderers.mjs';

async function GET(context) {
  const posts = await getPosts("ar");
  return rss({
    title: "مدونة وفرلي.كوم",
    description: "أدلة الإقامات القصيرة ونصائح التوقف في المطارات والتنقّل للمسافرين في السعودية ومنطقة الشرق الأوسط.",
    site: context.site ?? "https://wfrlee.com",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/ar/blog/${getPostSlug(post)}/`,
      categories: post.data.tags,
      author: post.data.author
    })),
    customData: `<language>ar</language>`
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
