import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from './astro/server_BYpsH1Ip.mjs';
import 'piccolore';
import { $ as $$Image } from './_astro_assets_QcFncbZ7.mjs';
import { $ as $$BaseLayout, c as cities, e as cityHref, a as citiesHref } from './BaseLayout_DFZy_VF1.mjs';
import { $ as $$JsonLd } from './JsonLd_C64jg7Vg.mjs';
import { S as SITE_BRAND_AR, B as BOOKING_URL } from './consts_BqY5v2Pi.mjs';
import { u as useTranslations } from './blog_BWAOoHv7.mjs';

const $$Astro = createAstro("https://wfrlee.com");
const $$CitiesIndex = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CitiesIndex;
  const { lang } = Astro2.props;
  const t = useTranslations(lang);
  const otherLang = lang === "en" ? "ar" : "en";
  const alternateUrl = citiesHref(otherLang);
  const arrow = lang === "ar" ? "\u2190" : "\u2192";
  const price = (n) => lang === "ar" ? `${n} \u0631\u064A\u0627\u0644` : `SAR ${n}`;
  const homeLabel = t("nav.home");
  const destinLabel = t("cities.title");
  const crumbs = [
    { name: homeLabel, url: lang === "en" ? "/" : "/ar/" },
    { name: destinLabel, url: citiesHref(lang) }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "lang": lang, "title": t("cities.title"), "description": t("cities.intro"), "alternateUrl": alternateUrl }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "JsonLd", $$JsonLd, { "lang": lang, "breadcrumbs": crumbs })} ${maybeRenderHead()}<section class="border-b border-slate-200 bg-slate-50"> <div class="container-page py-12 lg:py-16"> <p class="text-sm font-semibold uppercase tracking-wide text-brand-700"> ${t("cities.kicker")} </p> <h1 class="mt-3 max-w-3xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl"> ${t("cities.title")} </h1> <p class="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">${t("cities.intro")}</p> </div> </section> <section class="container-page py-12 lg:py-16"> <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"> ${cities.map((city) => renderTemplate`<li> <a${addAttribute(cityHref(city, lang), "href")} class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors hover:border-brand-300"> ${renderComponent($$result2, "Image", $$Image, { "src": city.image, "alt": city.imageAlt[lang], "width": 640, "height": 360, "loading": "lazy", "decoding": "async", "class": "aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105" })} <div class="flex flex-1 flex-col p-6"> <div class="flex items-start justify-between gap-3"> <div> <h2 class="text-xl font-bold text-slate-900 group-hover:text-brand-700"> ${city.name[lang]} </h2> <p class="mt-1 text-sm text-slate-500">${city.region[lang]}</p> </div> <span class="flex-none rounded-md bg-brand-50 px-2 py-1 text-xs font-bold text-brand-700"> ${city.airport.code} </span> </div> <p class="mt-4 flex-1 text-sm leading-relaxed text-slate-600"> ${city.tagline[lang]} </p> <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"> <span class="text-sm text-slate-500"> ${t("cities.from")}${" "} <span class="font-bold text-slate-900">${price(city.startingPrice)}</span> </span> <span class="text-sm font-semibold text-brand-600 group-hover:text-brand-700"> ${t("cities.viewCity")} <span aria-hidden="true">${arrow}</span> </span> </div> </div> </a> </li>`)} </ul> <div class="mt-14 flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:flex-row sm:text-start"> <div> <p class="font-semibold text-slate-900">${lang === "ar" ? SITE_BRAND_AR : "Wfrlee.com"}</p> <p class="mt-1 text-sm text-slate-600">${t("cities.durationsText")}</p> </div> <a${addAttribute(BOOKING_URL, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex flex-none items-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"> ${t("footer.book")} </a> </div> </section> ` })}`;
}, "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/components/CitiesIndex.astro", void 0);

export { $$CitiesIndex as $ };
