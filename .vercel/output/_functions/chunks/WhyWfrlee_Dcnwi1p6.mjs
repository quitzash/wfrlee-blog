import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from './astro/server_BYpsH1Ip.mjs';
import 'piccolore';
import { p as pageHref, $ as $$BaseLayout, b as pageAlternateHref } from './BaseLayout_JdXKQNSL.mjs';
import { $ as $$JsonLd } from './JsonLd_C64jg7Vg.mjs';
import { B as BOOKING_URL } from './consts_BqY5v2Pi.mjs';
import { u as useTranslations } from './blog_BWAOoHv7.mjs';

const $$Astro = createAstro("https://wfrlee.com");
const $$WhyWfrlee = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$WhyWfrlee;
  const { lang } = Astro2.props;
  const t = useTranslations(lang);
  const alternateUrl = pageAlternateHref("why-wfrlee", lang);
  const arrow = lang === "ar" ? "\u2190" : "\u2192";
  const reasons = [
    { title: t("why.reason1Title"), text: t("why.reason1Text") },
    { title: t("why.reason2Title"), text: t("why.reason2Text") },
    { title: t("why.reason3Title"), text: t("why.reason3Text") },
    { title: t("why.reason4Title"), text: t("why.reason4Text") },
    { title: t("why.reason5Title"), text: t("why.reason5Text") },
    { title: t("why.reason6Title"), text: t("why.reason6Text") }
  ];
  const crumbs = [
    { name: t("nav.home"), url: lang === "en" ? "/" : "/ar/" },
    { name: t("why.kicker"), url: pageHref("why-wfrlee", lang) }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "lang": lang, "title": t("why.title"), "description": t("why.lead"), "alternateUrl": alternateUrl }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "JsonLd", $$JsonLd, { "lang": lang, "breadcrumbs": crumbs })} ${maybeRenderHead()}<section class="border-b border-slate-200 bg-slate-50"> <div class="container-page py-12 lg:py-16"> <p class="text-sm font-semibold uppercase tracking-wide text-brand-700">${t("why.kicker")}</p> <h1 class="mt-3 max-w-3xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl"> ${t("why.title")} </h1> <p class="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">${t("why.lead")}</p> </div> </section> <section class="container-page py-12 lg:py-16"> <h2 class="text-2xl font-bold text-slate-900">${t("why.reasonsTitle")}</h2> <div class="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"> ${reasons.map((reason) => renderTemplate`<div class="rounded-xl border border-slate-200 bg-slate-50 p-6"> <h3 class="font-bold text-slate-900">${reason.title}</h3> <p class="mt-2 text-sm leading-relaxed text-slate-600">${reason.text}</p> </div>`)} </div> <div class="mt-14 flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:flex-row sm:text-start"> <div> <p class="font-semibold text-slate-900">${t("why.ctaTitle")}</p> <p class="mt-1 text-sm text-slate-600">${t("why.ctaText")}</p> </div> <a${addAttribute(BOOKING_URL, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex flex-none items-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"> ${t("why.ctaButton")} <span aria-hidden="true" class="ms-1">${arrow}</span> </a> </div> </section> ` })}`;
}, "C:/Users/Walid AlDebai/Documents/Wfrlee.com-blog/src/components/WhyWfrlee.astro", void 0);

export { $$WhyWfrlee as $ };
