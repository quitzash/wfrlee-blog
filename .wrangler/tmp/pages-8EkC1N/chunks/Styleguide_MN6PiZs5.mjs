globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from './astro/server_DurfZ5ve.mjs';
import { $ as $$Image } from './_astro_assets_D1AERdaC.mjs';
import { $ as $$BaseLayout } from './BaseLayout_3gyObX10.mjs';
import { $ as $$BlogPostCard } from './BlogPostCard_DYYY72Pr.mjs';
import { B as BOOKING_URL } from './consts_C0nSLXrW.mjs';
import { g as getPosts, h as homeHref, p as postHref } from './blog_DGalGtKD.mjs';
import { u as useTranslations } from './ui_DnN7TVII.mjs';

const $$Astro = createAstro("https://wfrlee.com");
const $$Styleguide = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Styleguide;
  const { lang } = Astro2.props;
  const t = useTranslations(lang);
  const posts = await getPosts(lang);
  const samplePost = posts[0];
  const selfHref = lang === "en" ? "/styleguide/" : "/ar/styleguide/";
  const alternateUrl = lang === "en" ? "/ar/styleguide/" : "/styleguide/";
  const copy = {
    en: {
      title: "Style Guide & Component Gallery",
      intro: "A living reference for every building block on the Wfrlee blog \u2014 typography, colors, buttons, cards, tables, prose, and more.",
      note: "This page is a demo and is excluded from search engines.",
      contents: "On this page",
      colors: "Color palette",
      colorsDesc: "Brand blue for actions, warm sand for accents, slate for structure.",
      typography: "Typography",
      buttons: "Buttons",
      badges: "Badges & tags",
      cards: "Cards",
      featured: "Featured article",
      table: "Table",
      prose: "Article prose",
      figure: "Figure & image",
      callout: "Callouts",
      cta: "Call to action",
      forms: "Forms",
      breadcrumbs: "Breadcrumbs",
      lead: "The lead paragraph is set larger to ease readers into an article.",
      body: "Body copy is set in IBM Plex Sans Arabic at a comfortable reading size with generous line height. Use it for the bulk of every guide.",
      small: "This is small helper text, often used for captions and metadata.",
      linkInline: "Inline links use the brand color and underline on hover.",
      listUnordered: "What is included",
      listOrdered: "How it works",
      quote: "Napping between flights is the difference between arriving ready and arriving wrecked.",
      quoteCite: "Wfrlee Travel Team",
      primary: "Primary",
      secondary: "Secondary",
      ghost: "Ghost",
      link: "Link button",
      disabled: "Disabled",
      small_: "Small",
      base: "Default",
      large: "Large",
      category: "Category label",
      info: "Included",
      success: "Confirmed",
      warning: "Few rooms left",
      cardTitle: "Relax in a private room",
      cardText: "Clean, private, bookable by the hour \u2014 from 70 SAR. Save up to 75% versus a full-day rate.",
      bookNow: "Book a micro-stay",
      learnMore: "Learn more",
      calloutInfo: "Info callouts highlight neutral, useful context.",
      calloutSuccess: "Success confirms a booking or state.",
      calloutWarning: "Warnings flag scarcity or time pressure.",
      fieldName: "Full name",
      fieldEmail: "Email address",
      fieldCity: "City",
      fieldMessage: "Message",
      placeholderName: "e.g. Sara Al-Otaibi",
      placeholderEmail: "you@example.com",
      placeholderMessage: "Tell us about your layover\u2026",
      submit: "Send message",
      selectPlaceholder: "Choose a city",
      agree: "Email me layover tips"
    },
    ar: {
      title: "\u062F\u0644\u064A\u0644 \u0627\u0644\u0623\u0646\u0645\u0627\u0637 \u0648\u0645\u0639\u0631\u0636 \u0627\u0644\u0645\u0643\u0648\u0651\u0646\u0627\u062A",
      intro: "\u0645\u0631\u062C\u0639 \u062D\u064A\u0651 \u0644\u0643\u0644 \u0639\u0646\u0635\u0631 \u0641\u064A \u0645\u062F\u0648\u0646\u0629 \u0648\u0641\u0631\u0644\u064A.\u0643\u0648\u0645 \u2014 \u0627\u0644\u062E\u0637\u0648\u0637 \u0648\u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u0648\u0627\u0644\u0623\u0632\u0631\u0627\u0631 \u0648\u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0648\u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0648\u0627\u0644\u0646\u0635\u0648\u0635 \u0648\u0627\u0644\u0645\u0632\u064A\u062F.",
      note: "\u0647\u0630\u0647 \u0635\u0641\u062D\u0629 \u062A\u062C\u0631\u064A\u0628\u064A\u0629 \u0648\u0645\u0633\u062A\u0628\u0639\u062F\u0629 \u0645\u0646 \u0645\u062D\u0631\u0651\u0643\u0627\u062A \u0627\u0644\u0628\u062D\u062B.",
      contents: "\u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629",
      colors: "\u0644\u0648\u062D\u0629 \u0627\u0644\u0623\u0644\u0648\u0627\u0646",
      colorsDesc: "\u0627\u0644\u0623\u0632\u0631\u0642 \u0644\u0644\u062A\u0641\u0627\u0639\u0644\u060C \u0648\u0627\u0644\u0631\u0645\u0644\u064A \u0644\u0644\u0651\u0645\u0633\u0627\u062A\u060C \u0648\u0627\u0644\u0631\u0645\u0627\u062F\u064A \u0644\u0644\u0628\u0646\u064A\u0629.",
      typography: "\u0627\u0644\u062E\u0637\u0648\u0637",
      buttons: "\u0627\u0644\u0623\u0632\u0631\u0627\u0631",
      badges: "\u0627\u0644\u0634\u0627\u0631\u0627\u062A \u0648\u0627\u0644\u0648\u0633\u0648\u0645",
      cards: "\u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A",
      featured: "\u0645\u0642\u0627\u0644 \u0645\u0645\u064A\u0651\u0632",
      table: "\u0627\u0644\u062C\u062F\u0648\u0644",
      prose: "\u0646\u0635 \u0627\u0644\u0645\u0642\u0627\u0644",
      figure: "\u0627\u0644\u0635\u0648\u0631\u0629 \u0648\u0627\u0644\u062A\u0633\u0645\u064A\u0629",
      callout: "\u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A",
      cta: "\u062F\u0639\u0648\u0629 \u0644\u0627\u062A\u062E\u0627\u0630 \u0625\u062C\u0631\u0627\u0621",
      forms: "\u0627\u0644\u0646\u0645\u0627\u0630\u062C",
      breadcrumbs: "\u0645\u0633\u0627\u0631 \u0627\u0644\u062A\u0646\u0642\u0651\u0644",
      lead: "\u0641\u0642\u0631\u0629 \u0627\u0644\u0627\u0641\u062A\u062A\u0627\u062D \u0623\u0643\u0628\u0631 \u062D\u062C\u0645\u064B\u0627 \u0644\u062A\u0633\u0647\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0644.",
      body: "\u0627\u0644\u0646\u0635 \u0627\u0644\u0623\u0633\u0627\u0633\u064A \u0628\u062E\u0637 IBM Plex Sans Arabic \u0628\u062D\u062C\u0645 \u0645\u0631\u064A\u062D \u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0645\u0639 \u0627\u0631\u062A\u0641\u0627\u0639 \u0633\u0637\u0631 \u0648\u0627\u0633\u0639. \u0627\u0633\u062A\u062E\u062F\u0645\u0647 \u0644\u0645\u0639\u0638\u0645 \u0645\u062D\u062A\u0648\u0649 \u0643\u0644 \u062F\u0644\u064A\u0644.",
      small: "\u0647\u0630\u0627 \u0646\u0635 \u0645\u0633\u0627\u0639\u062F \u0635\u063A\u064A\u0631 \u064A\u064F\u0633\u062A\u062E\u062F\u0645 \u063A\u0627\u0644\u0628\u064B\u0627 \u0644\u0644\u062A\u0633\u0645\u064A\u0627\u062A \u0648\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0648\u0635\u0641\u064A\u0629.",
      linkInline: "\u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0627\u0644\u0645\u0636\u0645\u0651\u0646\u0629 \u062A\u0633\u062A\u062E\u062F\u0645 \u0644\u0648\u0646 \u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0645\u0639 \u0627\u0644\u062A\u0633\u0637\u064A\u0631 \u0639\u0646\u062F \u0627\u0644\u0645\u0631\u0648\u0631.",
      listUnordered: "\u0645\u0627 \u064A\u062A\u0636\u0645\u0651\u0646\u0647",
      listOrdered: "\u0643\u064A\u0641 \u064A\u0639\u0645\u0644",
      quote: "\u0642\u064A\u0644\u0648\u0644\u0629 \u0628\u064A\u0646 \u0627\u0644\u0631\u062D\u0644\u0627\u062A \u0647\u064A \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 \u0648\u0635\u0648\u0644 \u0645\u0631\u062A\u0627\u062D \u0648\u0648\u0635\u0648\u0644 \u0645\u0646\u0647\u0643.",
      quoteCite: "\u0641\u0631\u064A\u0642 \u0648\u0641\u0631\u0644\u064A.\u0643\u0648\u0645 \u0644\u0644\u0633\u0641\u0631",
      primary: "\u0623\u0633\u0627\u0633\u064A",
      secondary: "\u062B\u0627\u0646\u0648\u064A",
      ghost: "\u0634\u0641\u0627\u0641",
      link: "\u0632\u0631 \u0646\u0635\u064A",
      disabled: "\u0645\u0639\u0637\u0651\u0644",
      small_: "\u0635\u063A\u064A\u0631",
      base: "\u0627\u0641\u062A\u0631\u0627\u0636\u064A",
      large: "\u0643\u0628\u064A\u0631",
      category: "\u062A\u0635\u0646\u064A\u0641",
      info: "\u0645\u0634\u0645\u0648\u0644",
      success: "\u0645\u0624\u0643\u064E\u0651\u062F",
      warning: "\u063A\u0631\u0641 \u0645\u062D\u062F\u0648\u062F\u0629",
      cardTitle: "\u0627\u0633\u062A\u0631\u062D \u0641\u064A \u063A\u0631\u0641\u0629 \u062E\u0627\u0635\u0629",
      cardText: "\u063A\u0631\u0641\u0629 \u0646\u0638\u064A\u0641\u0629 \u062E\u0627\u0635\u0629 \u062A\u064F\u062D\u062C\u0632 \u0628\u0627\u0644\u0633\u0627\u0639\u0629 \u0627\u0628\u062A\u062F\u0627\u0621\u064B \u0645\u0646 70 \u0631\u064A\u0627\u0644\u064B\u0627\u060C \u0648\u0648\u0641\u0651\u0631 \u062D\u062A\u0649 75% \u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u064A\u0648\u0645\u064A.",
      bookNow: "\u0627\u062D\u062C\u0632 \u0625\u0642\u0627\u0645\u0629 \u0642\u0635\u064A\u0631\u0629",
      learnMore: "\u0627\u0639\u0631\u0641 \u0627\u0644\u0645\u0632\u064A\u062F",
      calloutInfo: "\u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A\u064A\u0629 \u062A\u0628\u0631\u0632 \u0633\u064A\u0627\u0642\u064B\u0627 \u0645\u062D\u0627\u064A\u062F\u064B\u0627 \u0648\u0645\u0641\u064A\u062F\u064B\u0627.",
      calloutSuccess: "\u0627\u0644\u062A\u0623\u0643\u064A\u062F \u064A\u0628\u0631\u0632 \u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u062D\u062C\u0632 \u0623\u0648 \u0627\u0644\u062D\u0627\u0644\u0629.",
      calloutWarning: "\u0627\u0644\u062A\u062D\u0630\u064A\u0631\u0627\u062A \u062A\u0646\u0628\u0651\u0647 \u0625\u0644\u0649 \u0642\u0644\u0651\u0629 \u0627\u0644\u063A\u0631\u0641 \u0623\u0648 \u0636\u064A\u0642 \u0627\u0644\u0648\u0642\u062A.",
      fieldName: "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644",
      fieldEmail: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
      fieldCity: "\u0627\u0644\u0645\u062F\u064A\u0646\u0629",
      fieldMessage: "\u0627\u0644\u0631\u0633\u0627\u0644\u0629",
      placeholderName: "\u0645\u062B\u0627\u0644: \u0633\u0627\u0631\u0629 \u0627\u0644\u0639\u062A\u064A\u0628\u064A",
      placeholderEmail: "you@example.com",
      placeholderMessage: "\u0623\u062E\u0628\u0631\u0646\u0627 \u0639\u0646 \u062A\u0631\u0627\u0646\u0632\u064A\u062A\u0643\u2026",
      submit: "\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0633\u0627\u0644\u0629",
      selectPlaceholder: "\u0627\u062E\u062A\u0631 \u0645\u062F\u064A\u0646\u0629",
      agree: "\u0623\u0631\u0633\u0644 \u0644\u064A \u0646\u0635\u0627\u0626\u062D \u0627\u0644\u062A\u0631\u0627\u0646\u0632\u064A\u062A"
    }
  };
  const c = copy[lang];
  const brandSwatches = [
    ["brand-50", "bg-brand-50"],
    ["brand-100", "bg-brand-100"],
    ["brand-200", "bg-brand-200"],
    ["brand-300", "bg-brand-300"],
    ["brand-400", "bg-brand-400"],
    ["brand-500", "bg-brand-500"],
    ["brand-600", "bg-brand-600"],
    ["brand-700", "bg-brand-700"],
    ["brand-800", "bg-brand-800"],
    ["brand-900", "bg-brand-900"]
  ];
  const sandSwatches = [
    ["sand-50", "bg-sand-50"],
    ["sand-100", "bg-sand-100"],
    ["sand-200", "bg-sand-200"],
    ["sand-300", "bg-sand-300"],
    ["sand-400", "bg-sand-400"],
    ["sand-500", "bg-sand-500"],
    ["sand-600", "bg-sand-600"],
    ["sand-700", "bg-sand-700"],
    ["sand-800", "bg-sand-800"],
    ["sand-900", "bg-sand-900"]
  ];
  const sections = [
    { id: "colors", label: c.colors },
    { id: "typography", label: c.typography },
    { id: "buttons", label: c.buttons },
    { id: "badges", label: c.badges },
    { id: "cards", label: c.cards },
    { id: "featured", label: c.featured },
    { id: "table", label: c.table },
    { id: "prose", label: c.prose },
    { id: "figure", label: c.figure },
    { id: "callouts", label: c.callout },
    { id: "cta", label: c.cta },
    { id: "forms", label: c.forms },
    { id: "breadcrumbs", label: c.breadcrumbs }
  ];
  const breadcrumbs = [
    { name: t("nav.home"), url: homeHref(lang) },
    { name: t("nav.guides"), url: `${homeHref(lang)}#guides` },
    { name: c.title, url: selfHref }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "lang": lang, "title": c.title, "description": c.intro, "alternateUrl": alternateUrl, "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="border-b border-slate-200 bg-slate-50"> <div class="container-page py-12 lg:py-16"> <p class="text-sm font-semibold uppercase tracking-wide text-brand-700">${t("home.kicker")}</p> <h1 class="mt-3 max-w-3xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl"> ${c.title} </h1> <p class="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">${c.intro}</p> <p class="mt-4 inline-flex items-center gap-2 rounded-full bg-sand-100 px-3 py-1 text-xs font-medium text-sand-800"> <span class="h-1.5 w-1.5 rounded-full bg-sand-500"></span> ${c.note} </p> </div> </div> <div class="container-page grid gap-10 py-12 lg:grid-cols-[220px_1fr] lg:py-16"> <aside class="lg:sticky lg:top-24 lg:self-start"> <h2 class="text-xs font-semibold uppercase tracking-wide text-slate-500">${c.contents}</h2> <nav class="mt-3"> <ul class="space-y-1.5 text-sm"> ${sections.map((section) => renderTemplate`<li> <a${addAttribute(`#${section.id}`, "href")} class="text-slate-600 hover:text-brand-700"> ${section.label} </a> </li>`)} </ul> </nav> </aside> <div class="min-w-0 space-y-16"> <!-- Color palette --> <section id="colors" class="scroll-mt-24"> <h2 class="text-2xl font-bold text-slate-900">${c.colors}</h2> <p class="mt-2 text-slate-600">${c.colorsDesc}</p> <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5"> ${brandSwatches.map(([name, className]) => renderTemplate`<div class="overflow-hidden rounded-lg border border-slate-200"> <div${addAttribute(`h-16 w-full ${className}`, "class")}></div> <p class="px-2 py-1.5 text-xs font-medium text-slate-600">${name}</p> </div>`)} </div> <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5"> ${sandSwatches.map(([name, className]) => renderTemplate`<div class="overflow-hidden rounded-lg border border-slate-200"> <div${addAttribute(`h-16 w-full ${className}`, "class")}></div> <p class="px-2 py-1.5 text-xs font-medium text-slate-600">${name}</p> </div>`)} </div> </section> <!-- Typography --> <section id="typography" class="scroll-mt-24"> <h2 class="text-2xl font-bold text-slate-900">${c.typography}</h2> <div class="mt-6 space-y-6 rounded-xl border border-slate-200 p-6"> <h1 class="text-4xl font-extrabold text-slate-900">Heading 1 — ${c.title}</h1> <h2 class="text-3xl font-bold text-slate-900">Heading 2 — Section title</h2> <h3 class="text-2xl font-bold text-slate-900">Heading 3 — Subsection</h3> <h4 class="text-xl font-bold text-slate-900">Heading 4 — Minor title</h4> <p class="text-lg leading-relaxed text-slate-600">${c.lead}</p> <p class="leading-relaxed text-slate-700"> ${c.body} <strong class="font-semibold text-slate-900">Strong emphasis</strong> and
<em>italic emphasis</em> are available, plus
<code class="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-brand-800">inline code</code> and
<mark class="rounded bg-sand-200 px-1">highlighted text</mark>.
<a${addAttribute(homeHref(lang), "href")} class="font-medium text-brand-700 no-underline hover:underline"> ${c.linkInline} </a> </p> <p class="text-sm text-slate-500">${c.small}</p> </div> </section> <!-- Buttons --> <section id="buttons" class="scroll-mt-24"> <h2 class="text-2xl font-bold text-slate-900">${c.buttons}</h2> <div class="mt-6 space-y-6 rounded-xl border border-slate-200 p-6"> <div class="flex flex-wrap items-center gap-3"> <button class="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"> ${c.primary} </button> <button class="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"> ${c.secondary} </button> <button class="rounded-lg px-4 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"> ${c.ghost} </button> <a${addAttribute(BOOKING_URL, "href")} target="_blank" rel="noopener noreferrer" class="rounded-lg px-4 py-2 text-sm font-semibold text-brand-700 underline"> ${c.link} </a> <button disabled class="cursor-not-allowed rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-400"> ${c.disabled} </button> </div> <div class="flex flex-wrap items-center gap-3"> <button class="rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700"> ${c.small_} </button> <button class="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"> ${c.base} </button> <button class="rounded-xl bg-brand-600 px-5 py-2.5 text-base font-semibold text-white hover:bg-brand-700"> ${c.large} </button> </div> </div> </section> <!-- Badges & tags --> <section id="badges" class="scroll-mt-24"> <h2 class="text-2xl font-bold text-slate-900">${c.badges}</h2> <div class="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 p-6"> <span class="text-xs font-semibold uppercase tracking-wide text-brand-700">${c.category}</span> <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">#jeddah</span> <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">#layover</span> <span class="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700"> <span class="h-1.5 w-1.5 rounded-full bg-brand-500"></span>${c.info} </span> <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"> <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>${c.success} </span> <span class="inline-flex items-center gap-1 rounded-full bg-sand-100 px-3 py-1 text-xs font-semibold text-sand-800"> <span class="h-1.5 w-1.5 rounded-full bg-sand-500"></span>${c.warning} </span> </div> </section> <!-- Cards --> <section id="cards" class="scroll-mt-24"> <h2 class="text-2xl font-bold text-slate-900">${c.cards}</h2> <div class="mt-6 grid gap-6 sm:grid-cols-2"> ${samplePost && renderTemplate`<div> <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">BlogPostCard</p> ${renderComponent($$result2, "BlogPostCard", $$BlogPostCard, { "post": samplePost })} </div>`} <div> <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Content card</p> <div class="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6"> <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-lg font-bold text-white">W</span> <h3 class="mt-4 text-lg font-bold text-slate-900">${c.cardTitle}</h3> <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-600">${c.cardText}</p> <a${addAttribute(BOOKING_URL, "href")} target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex w-fit items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"> ${c.bookNow} </a> </div> </div> </div> </section> <!-- Featured article --> <section id="featured" class="scroll-mt-24"> <h2 class="text-2xl font-bold text-slate-900">${c.featured}</h2> ${samplePost && renderTemplate`<article class="mt-6 grid gap-6 overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-2"> <a${addAttribute(postHref(samplePost), "href")} tabindex="-1" aria-hidden="true" class="block overflow-hidden bg-slate-100"> ${renderComponent($$result2, "Image", $$Image, { "src": samplePost.data.heroImage, "alt": "", "width": 800, "height": 450, "loading": "lazy", "decoding": "async", "class": "h-full w-full object-cover" })} </a> <div class="flex flex-col justify-center p-6 md:p-8"> <p class="text-xs font-semibold uppercase tracking-wide text-brand-700"> ${t("home.latest")} · ${samplePost.data.category} </p> <h3 class="mt-3 text-2xl font-bold leading-snug text-slate-900"> <a${addAttribute(postHref(samplePost), "href")} class="hover:text-brand-700"> ${samplePost.data.title} </a> </h3> <p class="mt-3 leading-relaxed text-slate-600">${samplePost.data.description}</p> <a${addAttribute(postHref(samplePost), "href")} class="mt-5 inline-flex text-sm font-semibold text-brand-600 hover:text-brand-700"> ${t("card.read")} <span aria-hidden="true" class="ms-1">${lang === "ar" ? "\u2190" : "\u2192"}</span> </a> </div> </article>`} </section> <!-- Table --> <section id="table" class="scroll-mt-24"> <h2 class="text-2xl font-bold text-slate-900">${c.table}</h2> <div class="mt-6 overflow-x-auto rounded-xl border border-slate-200"> <table class="w-full text-start text-sm"> <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"> <tr> <th class="px-4 py-3 text-start font-semibold">${lang === "ar" ? "\u0627\u0644\u0641\u0626\u0629" : "Category"}</th> <th class="px-4 py-3 text-start font-semibold">${lang === "ar" ? "\u0627\u0644\u0645\u062F\u0629" : "Duration"}</th> <th class="px-4 py-3 text-start font-semibold">${lang === "ar" ? "\u0627\u0644\u0633\u0639\u0631" : "Price"}</th> </tr> </thead> <tbody class="divide-y divide-slate-100"> <tr> <td class="px-4 py-3 font-medium text-slate-900">${lang === "ar" ? "\u0642\u064A\u0644\u0648\u0644\u0629 \u0642\u0635\u064A\u0631\u0629" : "Power nap"}</td> <td class="px-4 py-3 text-slate-600">${lang === "ar" ? "3 \u0633\u0627\u0639\u0627\u062A" : "3 hours"}</td> <td class="px-4 py-3 text-slate-600">70 SAR</td> </tr> <tr class="bg-slate-50/50"> <td class="px-4 py-3 font-medium text-slate-900">${lang === "ar" ? "\u062F\u0648\u0631\u0629 \u0646\u0648\u0645" : "Sleep cycle"}</td> <td class="px-4 py-3 text-slate-600">${lang === "ar" ? "6 \u0633\u0627\u0639\u0627\u062A" : "6 hours"}</td> <td class="px-4 py-3 text-slate-600">110 SAR</td> </tr> <tr> <td class="px-4 py-3 font-medium text-slate-900">${lang === "ar" ? "\u0631\u0627\u062D\u0629 \u0643\u0627\u0645\u0644\u0629" : "Full reset"}</td> <td class="px-4 py-3 text-slate-600">${lang === "ar" ? "12 \u0633\u0627\u0639\u0629" : "12 hours"}</td> <td class="px-4 py-3 text-slate-600">180 SAR</td> </tr> </tbody> </table> </div> </section> <!-- Prose --> <section id="prose" class="scroll-mt-24"> <h2 class="text-2xl font-bold text-slate-900">${c.prose}</h2> <div class="prose prose-slate mt-6 max-w-none rounded-xl border border-slate-200 p-6 prose-headings:font-sans prose-headings:font-bold prose-a:font-medium prose-a:text-brand-700 prose-a:no-underline hover:prose-a:underline"> <h3>${lang === "ar" ? "\u0639\u0646\u0648\u0627\u0646 \u0641\u0631\u0639\u064A \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0642\u0627\u0644" : "A subsection inside an article"}</h3> <p> ${lang === "ar" ? "\u0647\u0643\u0630\u0627 \u064A\u0628\u062F\u0648 \u0627\u0644\u0646\u0635 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0642\u0627\u0644. \u0627\u0644\u0641\u0642\u0631\u0627\u062A \u0648\u0627\u0644\u0631\u0648\u0627\u0628\u0637 \u0648\u0627\u0644\u0642\u0648\u0627\u0626\u0645 \u0648\u0627\u0644\u062C\u062F\u0627\u0648\u0644 \u0648\u0627\u0644\u0627\u0642\u062A\u0628\u0627\u0633\u0627\u062A \u0643\u0644\u0647\u0627 \u0645\u0646\u0633\u0651\u0642\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627 \u0628\u0641\u0636\u0644 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0641\u064A \u062A\u0627\u064A\u0644\u0648\u064A\u0646\u062F." : "This is how long-form article copy looks. Paragraphs, links, lists, tables, and quotes are all styled automatically by the Tailwind typography plugin."} </p> <h4>${c.listUnordered}</h4> <ul> <li>${lang === "ar" ? "\u063A\u0631\u0641\u0629 \u062E\u0627\u0635\u0629 \u0646\u0638\u064A\u0641\u0629" : "A clean, private room"}</li> <li>${lang === "ar" ? "\u062A\u0633\u062C\u064A\u0644 \u0648\u0635\u0648\u0644 \u0645\u0631\u0646 \u0628\u0627\u0644\u0633\u0627\u0639\u0629" : "Flexible hourly check-in"}</li> <li>${lang === "ar" ? "\u0623\u0633\u0639\u0627\u0631 \u062A\u0628\u062F\u0623 \u0645\u0646 70 \u0631\u064A\u0627\u0644\u064B\u0627" : "Rates from 70 SAR"}</li> </ul> <h4>${c.listOrdered}</h4> <ol> <li>${lang === "ar" ? "\u0627\u062E\u062A\u0631 \u0645\u062F\u064A\u0646\u062A\u0643 \u0648\u062A\u0648\u0627\u0631\u064A\u062E\u0643" : "Pick your city and dates"}</li> <li>${lang === "ar" ? "\u062D\u062F\u0651\u062F \u0639\u062F\u062F \u0627\u0644\u0633\u0627\u0639\u0627\u062A" : "Choose how many hours"}</li> <li>${lang === "ar" ? "\u0623\u0643\u0651\u062F \u0648\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u063A\u0631\u0641\u062A\u0643" : "Confirm and get your room"}</li> </ol> <blockquote> <p>${c.quote}</p> <p><cite>— ${c.quoteCite}</cite></p> </blockquote> </div> </section> <!-- Figure --> <section id="figure" class="scroll-mt-24"> <h2 class="text-2xl font-bold text-slate-900">${c.figure}</h2> ${samplePost && renderTemplate`<figure class="mt-6"> ${renderComponent($$result2, "Image", $$Image, { "src": samplePost.data.heroImage, "alt": samplePost.data.title, "width": 1200, "height": 630, "loading": "lazy", "decoding": "async", "class": "aspect-[1200/630] w-full rounded-2xl object-cover" })} <figcaption class="mt-2 text-sm text-slate-500"> ${samplePost.data.title} </figcaption> </figure>`} </section> <!-- Callouts --> <section id="callouts" class="scroll-mt-24"> <h2 class="text-2xl font-bold text-slate-900">${c.callout}</h2> <div class="mt-6 space-y-3"> <div class="rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm text-slate-700"> ${c.calloutInfo} </div> <div class="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-slate-700"> ${c.calloutSuccess} </div> <div class="rounded-xl border border-sand-200 bg-sand-50 p-4 text-sm text-slate-700"> ${c.calloutWarning} </div> </div> </section> <!-- CTA --> <section id="cta" class="scroll-mt-24"> <h2 class="text-2xl font-bold text-slate-900">${c.cta}</h2> <div class="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:flex-row sm:text-start"> <div> <p class="font-semibold text-slate-900">${t("home.ctaTitle")}</p> <p class="mt-1 text-sm text-slate-600">${t("home.ctaText")}</p> </div> <a${addAttribute(BOOKING_URL, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex flex-none items-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"> ${t("home.ctaButton")} </a> </div> </section> <!-- Forms --> <section id="forms" class="scroll-mt-24"> <h2 class="text-2xl font-bold text-slate-900">${c.forms}</h2> <form class="mt-6 grid gap-4 rounded-xl border border-slate-200 p-6 sm:grid-cols-2"> <div> <label for="sg-name" class="mb-1.5 block text-sm font-medium text-slate-700">${c.fieldName}</label> <input id="sg-name" type="text"${addAttribute(c.placeholderName, "placeholder")} class="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"> </div> <div> <label for="sg-email" class="mb-1.5 block text-sm font-medium text-slate-700">${c.fieldEmail}</label> <input id="sg-email" type="email"${addAttribute(c.placeholderEmail, "placeholder")} class="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"> </div> <div class="sm:col-span-2"> <label for="sg-city" class="mb-1.5 block text-sm font-medium text-slate-700">${c.fieldCity}</label> <select id="sg-city" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"> <option value="">${c.selectPlaceholder}</option> <option>${lang === "ar" ? "\u062C\u062F\u0629" : "Jeddah"}</option> <option>${lang === "ar" ? "\u0627\u0644\u0631\u064A\u0627\u0636" : "Riyadh"}</option> <option>${lang === "ar" ? "\u062F\u0628\u064A" : "Dubai"}</option> </select> </div> <div class="sm:col-span-2"> <label for="sg-message" class="mb-1.5 block text-sm font-medium text-slate-700">${c.fieldMessage}</label> <textarea id="sg-message" rows="4"${addAttribute(c.placeholderMessage, "placeholder")} class="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"></textarea> </div> <label class="flex items-center gap-2 text-sm text-slate-600 sm:col-span-2"> <input type="checkbox" class="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-200"> ${c.agree} </label> <div class="sm:col-span-2"> <button type="submit" class="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"> ${c.submit} </button> </div> </form> </section> <!-- Breadcrumbs --> <section id="breadcrumbs" class="scroll-mt-24"> <h2 class="text-2xl font-bold text-slate-900">${c.breadcrumbs}</h2> <nav aria-label="Breadcrumb" class="mt-6"> <ol class="flex flex-wrap items-center gap-2 text-sm text-slate-500"> ${breadcrumbs.map((crumb, index) => renderTemplate`<li class="flex items-center gap-2"> ${index > 0 && renderTemplate`<span aria-hidden="true">/</span>`} ${index === breadcrumbs.length - 1 ? renderTemplate`<span class="font-medium text-slate-700">${crumb.name}</span>` : renderTemplate`<a${addAttribute(crumb.url, "href")} class="hover:text-brand-700"> ${crumb.name} </a>`} </li>`)} </ol> </nav> </section> </div> </div> ` })}`;
}, "C:/Users/20190026516/wfrlee-blog/src/components/Styleguide.astro", void 0);

export { $$Styleguide as $ };
