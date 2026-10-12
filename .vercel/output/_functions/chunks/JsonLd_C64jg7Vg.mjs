import { d as createAstro, c as createComponent, a as renderTemplate, u as unescapeHTML } from './astro/server_BYpsH1Ip.mjs';
import 'piccolore';
import 'clsx';
import { e as SITE_URL, d as SITE_TITLE, f as SITE_AUTHOR } from './consts_BqY5v2Pi.mjs';
import { j as getPostLang, p as postHref } from './blog_BWAOoHv7.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://wfrlee.com");
const $$JsonLd = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$JsonLd;
  const {
    post,
    breadcrumbs = [],
    website = false,
    lang = "en",
    description = "Hourly micro-stay hotel booking for airport layovers and short stays in Saudi Arabia and the MENA region."
  } = Astro2.props;
  const toAbsolute = (path) => new URL(path, SITE_URL).toString();
  const schemas = [];
  const organization = {
    "@type": "Organization",
    name: lang === "ar" ? "\u0648\u0641\u0631\u0644\u064A.\u0643\u0648\u0645" : "Wfrlee.com",
    url: SITE_URL
  };
  if (website) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: lang === "ar" ? "\u0645\u062F\u0648\u0646\u0629 \u0648\u0641\u0631\u0644\u064A.\u0643\u0648\u0645" : SITE_TITLE,
      url: lang === "ar" ? toAbsolute("/ar/") : SITE_URL,
      inLanguage: lang,
      description,
      publisher: organization
    });
  }
  if (post) {
    const { title, description: postDescription, pubDate, updatedDate, author, heroImage, tags, category } = post.data;
    const postLang = getPostLang(post);
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description: postDescription,
      image: [toAbsolute(heroImage)],
      datePublished: pubDate.toISOString(),
      dateModified: (updatedDate ?? pubDate).toISOString(),
      author: {
        "@type": "Person",
        name: author
      },
      publisher: organization,
      keywords: tags.join(", "),
      articleSection: category,
      inLanguage: postLang,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": toAbsolute(postHref(post))
      }
    });
  }
  if (breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: toAbsolute(crumb.url)
      }))
    });
  }
  if (schemas.length === 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_TITLE,
      url: SITE_URL,
      founder: { "@type": "Person", name: SITE_AUTHOR }
    });
  }
  return renderTemplate`${schemas.map((schema) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema))))}`;
}, "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/components/seo/JsonLd.astro", void 0);

export { $$JsonLd as $ };
