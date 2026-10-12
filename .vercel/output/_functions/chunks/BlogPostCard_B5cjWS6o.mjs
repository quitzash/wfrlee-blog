import { d as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, r as renderComponent, a as renderTemplate } from './astro/server_BYpsH1Ip.mjs';
import 'piccolore';
import { $ as $$Image } from './_astro_assets_QcFncbZ7.mjs';
import { j as getPostLang, p as postHref, i as formatDateShort, e as readingMinutes, u as useTranslations } from './blog_BWAOoHv7.mjs';

const $$Astro = createAstro("https://wfrlee.com");
const $$BlogPostCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogPostCard;
  const { post } = Astro2.props;
  const lang = getPostLang(post);
  const t = useTranslations(lang);
  const { title, description, pubDate, heroImage, category } = post.data;
  const href = postHref(post);
  const dateTime = pubDate.toISOString();
  const dateLabel = formatDateShort(pubDate, lang);
  const readTime = readingMinutes(post);
  return renderTemplate`${maybeRenderHead()}<article class="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors hover:border-brand-300"> <a${addAttribute(href, "href")} tabindex="-1" aria-hidden="true" class="block overflow-hidden bg-slate-100"> ${renderComponent($$result, "Image", $$Image, { "src": heroImage, "alt": "", "width": 640, "height": 360, "loading": "lazy", "decoding": "async", "class": "aspect-video h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" })} </a> <div class="flex flex-1 flex-col p-5"> <p class="text-xs font-semibold uppercase tracking-wide text-brand-700">${category}</p> <h3 class="mt-2 text-lg font-bold leading-snug text-slate-900"> <a${addAttribute(href, "href")} class="hover:text-brand-700">${title}</a> </h3> <p class="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600"> ${description} </p> <div class="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500"> <time${addAttribute(dateTime, "datetime")}>${dateLabel}</time> <span aria-hidden="true">·</span> <span>${readTime} ${t("card.readTime")}</span> </div> </div> </article>`;
}, "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/components/BlogPostCard.astro", void 0);

export { $$BlogPostCard as $ };
