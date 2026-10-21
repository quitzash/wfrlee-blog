globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from './astro/server_DurfZ5ve.mjs';
import { p as pageHref, $ as $$BaseLayout, a as pageAlternateHref } from './BaseLayout_3gyObX10.mjs';
import { $ as $$JsonLd } from './JsonLd_xpK02Jzr.mjs';
import { B as BOOKING_URL } from './consts_C0nSLXrW.mjs';
import { c as cities, a as citiesHref } from './cities_DruEJ56b.mjs';
import { u as useTranslations } from './ui_DnN7TVII.mjs';

const $$Astro = createAstro("https://wfrlee.com");
const $$AboutPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AboutPage;
  const { lang } = Astro2.props;
  const t = useTranslations(lang);
  const alternateUrl = pageAlternateHref("about", lang);
  const arrow = lang === "ar" ? "\u2190" : "\u2192";
  const values = [
    { title: t("about.value1Title"), text: t("about.value1Text") },
    { title: t("about.value2Title"), text: t("about.value2Text") },
    { title: t("about.value3Title"), text: t("about.value3Text") }
  ];
  const crumbs = [
    { name: t("nav.home"), url: lang === "en" ? "/" : "/ar/" },
    { name: t("about.kicker"), url: pageHref("about", lang) }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "lang": lang, "title": t("about.title"), "description": t("about.lead"), "alternateUrl": alternateUrl }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "JsonLd", $$JsonLd, { "lang": lang, "breadcrumbs": crumbs })} ${maybeRenderHead()}<section class="border-b border-slate-200 bg-slate-50"> <div class="container-page py-12 lg:py-16"> <p class="text-sm font-semibold uppercase tracking-wide text-brand-700">${t("about.kicker")}</p> <h1 class="mt-3 max-w-3xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl"> ${t("about.title")} </h1> <p class="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">${t("about.lead")}</p> </div> </section> <section class="container-page py-12 lg:py-16"> <div class="max-w-3xl"> <h2 class="text-2xl font-bold text-slate-900">${t("about.storyTitle")}</h2> <p class="mt-4 text-lg leading-relaxed text-slate-700">${t("about.storyText")}</p> </div> <div class="mt-14"> <h2 class="text-2xl font-bold text-slate-900">${t("about.howTitle")}</h2> <div class="mt-6 grid gap-6 md:grid-cols-3"> ${values.map((value) => renderTemplate`<div class="rounded-xl border border-slate-200 bg-slate-50 p-6"> <h3 class="font-bold text-slate-900">${value.title}</h3> <p class="mt-2 text-sm leading-relaxed text-slate-600">${value.text}</p> </div>`)} </div> </div> <div class="mt-14 rounded-2xl border border-slate-200 bg-white p-8"> <h2 class="text-2xl font-bold text-slate-900">${t("about.cityTitle")}</h2> <p class="mt-3 max-w-2xl leading-relaxed text-slate-600">${t("about.cityText")}</p> <ul class="mt-5 flex flex-wrap gap-3"> ${cities.map((city) => renderTemplate`<li> <a${addAttribute(`${citiesHref(lang)}${city.slug}/`, "href")} class="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"> ${city.name[lang]} </a> </li>`)} </ul> </div> <div class="mt-14 flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:flex-row sm:text-start"> <div> <p class="font-semibold text-slate-900">${t("about.ctaTitle")}</p> <p class="mt-1 text-sm text-slate-600">${t("about.ctaText")}</p> </div> <a${addAttribute(BOOKING_URL, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex flex-none items-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"> ${t("about.ctaButton")} <span aria-hidden="true" class="ms-1">${arrow}</span> </a> </div> </section> ` })}`;
}, "C:/Users/20190026516/wfrlee-blog/src/components/AboutPage.astro", void 0);

export { $$AboutPage as $ };
