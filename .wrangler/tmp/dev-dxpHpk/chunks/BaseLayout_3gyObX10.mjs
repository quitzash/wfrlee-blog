globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createAstro, c as createComponent, b as addAttribute, a as renderTemplate, r as renderComponent, m as maybeRenderHead, e as renderScript, g as renderHead, f as renderSlot } from './astro/server_DurfZ5ve.mjs';
/* empty css                         */
import { a as $$Font, $ as $$Image } from './_astro_assets_D1AERdaC.mjs';
import { c as SITE_DESCRIPTION, D as DEFAULT_OG_IMAGE, s as siteKeywords, d as SITE_TITLE_AR, e as SITE_TITLE, h as SITE_LOCALES, T as TWITTER_HANDLE, b as SITE_DESCRIPTION_AR, a as SITE_BRAND_AR, B as BOOKING_URL, M as MAIN_SITE_LINKS, C as CONTACT_EMAIL, i as SITE_BRAND, A as APP_LINKS, f as SOCIAL_LINKS } from './consts_C0nSLXrW.mjs';
import { d as defaultLang, l as languages, u as useTranslations } from './ui_DnN7TVII.mjs';
import { h as homeHref } from './blog_DGalGtKD.mjs';
import { a as citiesHref, c as cities, d as cityHref } from './cities_DruEJ56b.mjs';

const $$Astro$3 = createAstro("https://wfrlee.com");
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const {
    title,
    lang,
    description = SITE_DESCRIPTION,
    image = DEFAULT_OG_IMAGE,
    type = "website",
    canonicalURL,
    alternateUrl,
    publishedTime,
    modifiedTime,
    author,
    keywords = [],
    noindex = false
  } = Astro2.props;
  const metaKeywords = [...siteKeywords(lang), ...keywords].filter(
    (keyword, index, list) => list.findIndex((entry) => entry.toLowerCase() === keyword.toLowerCase()) === index
  );
  const siteName = lang === "ar" ? SITE_TITLE_AR : SITE_TITLE;
  const pageTitle = title === siteName ? title : `${title} | ${siteName}`;
  const canonical = canonicalURL ? new URL(canonicalURL, Astro2.site) : new URL(Astro2.url.pathname, Astro2.site);
  const alternate = alternateUrl ? new URL(alternateUrl, Astro2.site) : void 0;
  const xDefault = lang === defaultLang ? canonical : alternate ?? void 0;
  const ogImage = new URL(image, Astro2.site);
  const ogUrl = new URL(Astro2.url.pathname, Astro2.site);
  const otherLang = lang === "en" ? "ar" : "en";
  const rssUrl = new URL(lang === defaultLang ? "rss.xml" : `${lang}/rss.xml`, Astro2.site);
  return renderTemplate`<!-- Global metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico" sizes="any"><!-- Feeds & sitemap discovery --><link rel="sitemap" type="application/xml" href="/sitemap-index.xml"><link rel="alternate" type="application/rss+xml"${addAttribute(`${siteName} (${languages[lang]})`, "title")}${addAttribute(rssUrl, "href")}><!-- Language alternates --><link rel="alternate"${addAttribute(lang, "hreflang")}${addAttribute(canonical, "href")}>${alternate && renderTemplate`<link rel="alternate"${addAttribute(otherLang, "hreflang")}${addAttribute(alternate, "href")}>`}${xDefault && renderTemplate`<link rel="alternate" hreflang="x-default"${addAttribute(xDefault, "href")}>`}<!-- Performance: preload the webfont that paints first to protect LCP -->${renderComponent($$result, "Font", $$Font, { "cssVariable": "--font-sans", "preload": true })}<!-- Primary meta tags --><title>${pageTitle}</title><meta name="description"${addAttribute(description, "content")}><meta name="author"${addAttribute(author ?? siteName, "content")}><meta name="keywords"${addAttribute(metaKeywords.join(", "), "content")}>${noindex && renderTemplate`<meta name="robots" content="noindex, nofollow">`}<!-- Canonical URL --><link rel="canonical"${addAttribute(canonical, "href")}><!-- Open Graph --><meta property="og:type"${addAttribute(type, "content")}><meta property="og:site_name"${addAttribute(siteName, "content")}><meta property="og:locale"${addAttribute(SITE_LOCALES[lang], "content")}><meta property="og:locale:alternate"${addAttribute(SITE_LOCALES[otherLang], "content")}><meta property="og:url"${addAttribute(ogUrl, "content")}><meta property="og:title"${addAttribute(pageTitle, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(ogImage, "content")}><meta property="og:image:alt"${addAttribute(title, "content")}>${publishedTime && renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime.toISOString(), "content")}>`}${modifiedTime && renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime.toISOString(), "content")}>`}${author && renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`}<!-- Twitter / X --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site"${addAttribute(TWITTER_HANDLE, "content")}><meta name="twitter:title"${addAttribute(pageTitle, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(ogImage, "content")}>`;
}, "C:/Users/20190026516/wfrlee-blog/src/components/seo/BaseHead.astro", void 0);

const logo = new Proxy({"src":"/blog/_astro/wfrlee-logo.96DRj3XK.png","width":512,"height":512,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/20190026516/wfrlee-blog/src/assets/wfrlee-logo.png";
							}
							
							return target[name];
						}
					});

function pageHref(page, lang) {
  const prefix = lang === defaultLang ? "/" : `/${lang}/`;
  return `${prefix}${page}/`;
}
function pageAlternateHref(page, lang) {
  return pageHref(page, lang === "en" ? "ar" : "en");
}

const $$Astro$2 = createAstro("https://wfrlee.com");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  const { lang, alternateUrl } = Astro2.props;
  const t = useTranslations(lang);
  const otherLang = lang === "en" ? "ar" : "en";
  const switchHref = alternateUrl ?? homeHref(otherLang);
  const navLinks = [
    { href: homeHref(lang), label: t("nav.home") },
    { href: citiesHref(lang), label: t("nav.destinations") },
    { href: `${homeHref(lang)}#guides`, label: t("nav.guides") },
    { href: pageHref("about", lang), label: t("nav.about") },
    { href: pageHref("why-wfrlee", lang), label: t("nav.why") }
  ];
  const path = Astro2.url.pathname;
  const isActive = (href) => {
    if (href.includes("#")) return false;
    if (href === homeHref(lang)) return path === homeHref(lang);
    return path.startsWith(href);
  };
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur"> <div class="container-page flex h-16 items-center justify-between gap-4"> <a${addAttribute(homeHref(lang), "href")} class="flex items-center gap-2.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"> ${renderComponent($$result, "Image", $$Image, { "src": logo, "alt": "Wfrlee logo", "width": 36, "height": 36, "loading": "eager", "class": "h-9 w-9 flex-none rounded-lg object-contain" })} <span class="flex flex-col leading-tight"> ${lang === "ar" ? renderTemplate`<span lang="ar" dir="rtl" class="text-lg font-bold tracking-tight text-slate-900"> ${SITE_BRAND_AR} </span>` : renderTemplate`<span class="text-lg font-bold tracking-tight text-slate-900">
Wfrlee<span class="text-brand-600">.com</span> </span>`} </span> <span class="sr-only">${lang === "ar" ? SITE_DESCRIPTION_AR : SITE_DESCRIPTION}</span> </a> <nav aria-label="Primary" class="hidden lg:block"> <ul class="flex items-center gap-6"> ${navLinks.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")}${addAttribute(isActive(link.href) ? "page" : void 0, "aria-current")}${addAttribute([
    "text-sm font-medium transition-colors hover:text-brand-700",
    isActive(link.href) ? "text-brand-700" : "text-slate-600"
  ], "class:list")}> ${link.label} </a> </li>`)} </ul> </nav> <div class="flex items-center gap-2"> ${renderTemplate`<a${addAttribute(switchHref, "href")}${addAttribute(otherLang, "lang")} class="hidden items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-brand-300 hover:text-brand-700 sm:inline-flex"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"> <circle cx="12" cy="12" r="10"></circle> <path d="M2 12h20"></path> <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path> </svg> ${t("lang.switch")} </a>`} <a${addAttribute(BOOKING_URL, "href")} target="_blank" rel="noopener noreferrer" class="hidden rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:inline-flex"> ${t("nav.book")} </a> <details class="group relative lg:hidden"> <summary class="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-slate-200 text-slate-600 [&::-webkit-details-marker]:hidden"${addAttribute(t("nav.menu"), "aria-label")}> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"> <line x1="4" y1="7" x2="20" y2="7"></line> <line x1="4" y1="12" x2="20" y2="12"></line> <line x1="4" y1="17" x2="20" y2="17"></line> </svg> </summary> <div class="absolute end-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg"> <ul class="flex flex-col"> ${navLinks.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-700"> ${link.label} </a> </li>`)} <li class="mt-1 border-t border-slate-100 pt-1"> <a${addAttribute(BOOKING_URL, "href")} target="_blank" rel="noopener noreferrer" class="block rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"> ${t("nav.book")} </a> </li> <li class="mt-1 border-t border-slate-100 pt-1"> <a${addAttribute(switchHref, "href")}${addAttribute(otherLang, "lang")} class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-700"> ${t("lang.switch")} </a> </li> </ul> </div> </details> </div> </div> </header>`;
}, "C:/Users/20190026516/wfrlee-blog/src/components/Header.astro", void 0);

const $$Astro$1 = createAstro("https://wfrlee.com");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  const { lang } = Astro2.props;
  const t = useTranslations(lang);
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const destinations = cities.map((city) => ({
    href: cityHref(city, lang),
    label: city.name[lang]
  }));
  const company = [
    { href: MAIN_SITE_LINKS.faq, label: t("footer.faq") },
    { href: MAIN_SITE_LINKS.offers, label: t("footer.offers") },
    { href: MAIN_SITE_LINKS.careers, label: t("footer.careers") },
    { href: pageHref("about", lang), label: t("footer.aboutUs") },
    { href: MAIN_SITE_LINKS.contact, label: t("footer.contactUs") },
    { href: pageHref("why-wfrlee", lang), label: t("footer.why") },
    { href: homeHref(lang), label: t("footer.wfrleeBlog") }
  ];
  const otherLinks = [
    { href: MAIN_SITE_LINKS.referral, label: t("footer.referral") },
    { href: MAIN_SITE_LINKS.privacy, label: t("footer.privacyPolicy") },
    { href: MAIN_SITE_LINKS.safety, label: t("footer.safety") },
    { href: MAIN_SITE_LINKS.terms, label: t("footer.terms") },
    { href: MAIN_SITE_LINKS.partner, label: t("footer.partner") }
  ];
  const linkClass = "text-sm text-brand-200 transition-colors hover:text-white";
  const headingClass = "text-sm font-semibold text-white";
  const isExternal = (href) => /^https?:\/\//.test(href);
  return renderTemplate`${maybeRenderHead()}<footer class="mt-16 bg-brand-800 text-brand-100"> <div class="border-b border-white/10"> <div class="container-page flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center"> <div> <p class="text-lg font-bold text-white">${t("footer.newsletterTitle")}</p> <p class="mt-1 text-sm text-brand-200">${t("footer.newsletterText")}</p> </div> <form class="w-full sm:w-auto" method="post" action="/api/newsletter/subscribe"${addAttribute(t("footer.newsletterTitle"), "aria-label")} data-subscribe-form> <div class="flex flex-col gap-2 sm:flex-row"> <label class="sr-only" for="footer-email">${t("footer.emailPlaceholder")}</label> <input id="footer-email" type="email" name="email" required autocomplete="email" maxlength="254"${addAttribute(t("footer.emailPlaceholder"), "placeholder")} class="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-brand-200 focus:border-white focus:outline-none sm:w-64"> <button type="submit" data-subscribe-btn class="flex-none rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-60"> ${t("footer.subscribe")} </button> </div> <p data-subscribe-status aria-live="polite" class="mt-2 text-xs text-brand-300"> ${t("footer.newsletterNote")} </p> </form> </div> </div> <div class="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12"> <div class="lg:col-span-4"> <a${addAttribute(homeHref(lang), "href")} class="flex items-center gap-2.5"> <span class="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-white p-1"> ${renderComponent($$result, "Image", $$Image, { "src": logo, "alt": "Wfrlee logo", "width": 32, "height": 32, "class": "h-full w-full object-contain" })} </span> <span class="flex flex-col leading-tight"> ${lang === "ar" ? renderTemplate`<span lang="ar" dir="rtl" class="text-lg font-bold tracking-tight text-white"> ${SITE_BRAND_AR} </span>` : renderTemplate`<span class="text-lg font-bold tracking-tight text-white">
Wfrlee<span class="text-brand-200">.com</span> </span>`} </span> </a> <p class="mt-4 max-w-sm text-sm leading-relaxed text-brand-200">${t("footer.tagline")}</p> <div class="mt-6"> <h2${addAttribute(headingClass, "class")}>${t("footer.talkToUs")}</h2> <ul class="mt-3 space-y-2"> <li> <a${addAttribute(`mailto:${CONTACT_EMAIL}`, "href")}${addAttribute(linkClass, "class")}>${CONTACT_EMAIL}</a> </li> <li> <a${addAttribute(BOOKING_URL, "href")} target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-white hover:text-brand-100"> ${t("footer.book")} </a> </li> </ul> </div> <div class="mt-6"> <h2${addAttribute(headingClass, "class")}>${t("footer.getApp")}</h2> <div class="mt-3 flex flex-wrap gap-2"> <a${addAttribute(APP_LINKS.ios, "href")} target="_blank" rel="noopener noreferrer" class="rounded-lg border border-white/20 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10"> ${t("footer.appIos")} </a> <a${addAttribute(APP_LINKS.android, "href")} target="_blank" rel="noopener noreferrer" class="rounded-lg border border-white/20 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10"> ${t("footer.appAndroid")} </a> </div> </div> <div class="mt-6 flex flex-wrap gap-3"> ${SOCIAL_LINKS.map((social) => renderTemplate`<a${addAttribute(social.href, "href")} target="_blank" rel="noopener noreferrer" class="text-sm font-medium text-brand-200 hover:text-white"> ${social.label} </a>`)} </div> </div> <nav${addAttribute(t("footer.destinations"), "aria-label")} class="lg:col-span-2"> <h2${addAttribute(headingClass, "class")}>${t("footer.destinations")}</h2> <ul class="mt-4 space-y-2"> ${destinations.map((item) => renderTemplate`<li> <a${addAttribute(item.href, "href")}${addAttribute(linkClass, "class")}>${item.label}</a> </li>`)} <li> <a${addAttribute(citiesHref(lang), "href")}${addAttribute(linkClass, "class")}>${t("cities.back")}</a> </li> </ul> </nav> <nav${addAttribute(t("footer.company"), "aria-label")} class="lg:col-span-3"> <h2${addAttribute(headingClass, "class")}>${t("footer.company")}</h2> <ul class="mt-4 space-y-2"> ${company.map((item) => renderTemplate`<li> <a${addAttribute(item.href, "href")}${addAttribute(isExternal(item.href) ? "_blank" : void 0, "target")}${addAttribute(isExternal(item.href) ? "noopener noreferrer" : void 0, "rel")}${addAttribute(linkClass, "class")}> ${item.label} </a> </li>`)} </ul> </nav> <nav${addAttribute(t("footer.otherLinks"), "aria-label")} class="lg:col-span-3"> <h2${addAttribute(headingClass, "class")}>${t("footer.otherLinks")}</h2> <ul class="mt-4 space-y-2"> ${otherLinks.map((item) => renderTemplate`<li> <a${addAttribute(item.href, "href")}${addAttribute(isExternal(item.href) ? "_blank" : void 0, "target")}${addAttribute(isExternal(item.href) ? "noopener noreferrer" : void 0, "rel")}${addAttribute(linkClass, "class")}> ${item.label} </a> </li>`)} </ul> </nav> </div> <div class="border-t border-white/10"> <div class="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-brand-300 sm:flex-row"> <p>
© ${year} ${lang === "ar" ? `${SITE_BRAND_AR} \u2014 ${SITE_TITLE_AR}` : `${SITE_BRAND} \u2014 ${SITE_TITLE}`}. ${t("footer.rights")} </p> <p>${t("footer.tagline")}</p> </div> </div> </footer> ${renderScript($$result, "C:/Users/20190026516/wfrlee-blog/src/components/Footer.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/20190026516/wfrlee-blog/src/components/Footer.astro", void 0);

const $$Astro = createAstro("https://wfrlee.com");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    lang,
    title,
    description,
    image,
    type,
    canonicalURL,
    alternateUrl,
    publishedTime,
    modifiedTime,
    author,
    keywords,
    noindex
  } = Astro2.props;
  const dir = lang === "ar" ? "rtl" : "ltr";
  return renderTemplate`<html${addAttribute(lang, "lang")}${addAttribute(dir, "dir")}> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "lang": lang, "description": description, "image": image, "type": type, "canonicalURL": canonicalURL, "alternateUrl": alternateUrl, "publishedTime": publishedTime, "modifiedTime": modifiedTime, "author": author, "keywords": keywords, "noindex": noindex })}${renderHead()}</head> <body class="flex min-h-screen flex-col bg-white"> <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"> ${lang === "ar" ? "\u062A\u062E\u0637\u064E\u0651 \u0625\u0644\u0649 \u0627\u0644\u0645\u062D\u062A\u0648\u0649" : "Skip to content"} </a> ${renderComponent($$result, "Header", $$Header, { "lang": lang, "alternateUrl": alternateUrl })} <main id="main" class="flex-1"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "lang": lang })} </body></html>`;
}, "C:/Users/20190026516/wfrlee-blog/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, pageAlternateHref as a, pageHref as p };
