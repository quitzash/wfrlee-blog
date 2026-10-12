import rss from '@astrojs/rss';
import { g as getPosts, a as getPostSlug } from '../chunks/blog_BWAOoHv7.mjs';
import { b as SITE_DESCRIPTION, d as SITE_TITLE } from '../chunks/consts_BqY5v2Pi.mjs';
export { renderers } from '../renderers.mjs';

async function GET(context) {
  const posts = await getPosts("en");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site ?? "https://wfrlee.com",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${getPostSlug(post)}/`,
      categories: post.data.tags,
      author: post.data.author
    })),
    customData: `<language>en</language>`
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
