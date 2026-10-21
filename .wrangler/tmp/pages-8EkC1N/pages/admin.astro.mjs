globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createAstro, c as createComponent, r as renderComponent, e as renderScript, a as renderTemplate, m as maybeRenderHead, F as Fragment, b as addAttribute } from '../chunks/astro/server_DurfZ5ve.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_3gyObX10.mjs';
import { v as verifyAdminSession, S as SESSION_COOKIE, A as ADMIN_CSP, s as serverEnv } from '../chunks/auth_BCnYD5b9.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://wfrlee.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const authed = verifyAdminSession(Astro2.cookies.get(SESSION_COOKIE)?.value ?? null);
  Astro2.response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  Astro2.response.headers.set("X-Content-Type-Options", "nosniff");
  Astro2.response.headers.set("X-Frame-Options", "DENY");
  Astro2.response.headers.set("Referrer-Policy", "no-referrer");
  Astro2.response.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  Astro2.response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  Astro2.response.headers.set("Content-Security-Policy", ADMIN_CSP);
  const adminTokenConfigured = Boolean(serverEnv("ADMIN_TOKEN"));
  const claudeConfigured = Boolean(serverEnv("ANTHROPIC_API_KEY"));
  const githubConfigured = Boolean(serverEnv("GITHUB_TOKEN") && serverEnv("GITHUB_REPO"));
  const checks = [
    { label: "ADMIN_TOKEN", ok: adminTokenConfigured },
    { label: "ANTHROPIC_API_KEY", ok: claudeConfigured },
    { label: "GITHUB_TOKEN + GITHUB_REPO", ok: githubConfigured }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "lang": "en", "title": "AI Content Studio", "noindex": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="border-b border-slate-200 bg-slate-50"> <div class="container-page py-10"> <p class="text-xs font-semibold uppercase tracking-wide text-brand-600">Wfrlee internal tool</p> <h1 class="mt-2 text-3xl font-bold text-slate-900">AI Content Studio</h1> <p class="mt-2 max-w-2xl text-slate-600">
Generate SEO guides with Claude and publish them live to the blog via GitHub. Each post is committed to
				the repo, which triggers a Vercel rebuild that puts it on the site. This page is not indexed and is not
				linked from the public site.
</p> </div> </section> ${authed ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <section class="container-page py-10"> <div class="mx-auto mb-8 max-w-2xl rounded-lg border border-slate-200 bg-white p-4 text-sm"> <p class="font-semibold text-slate-900">Server configuration (live)</p> <ul class="mt-2 space-y-1"> ${checks.map((check) => renderTemplate`<li class="flex items-center gap-2"> <span${addAttribute(check.ok ? "text-emerald-600" : "text-red-600", "class")}> ${check.ok ? "\u2713 configured" : "\u2717 MISSING"} </span> <span class="font-mono text-xs text-slate-600">${check.label}</span> </li>`)} </ul> <p class="mt-2 text-xs text-slate-500">
This reflects the values Vercel passes to the running deployment. Any “MISSING” entry must be
						added in Vercel → Settings → Environment Variables, then redeployed.
</p> </div> <form id="generate-form" class="mx-auto max-w-2xl space-y-6"> <div class="grid gap-4 sm:grid-cols-2"> <div> <label for="lang" class="block text-sm font-semibold text-slate-900">Language</label> <select id="lang" name="lang" class="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"> <option value="en">English (en)</option> <option value="ar">العربية (ar)</option> </select> </div> <div> <label for="city" class="block text-sm font-semibold text-slate-900">
City <span class="font-normal text-slate-500">(optional)</span> </label> <input id="city" name="city" type="text" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200" placeholder="Jeddah"> </div> </div> <div> <div class="flex items-center justify-between"> <label for="topic" class="block text-sm font-semibold text-slate-900">Topic</label> <div class="flex items-center gap-2"> <button type="button" id="refill-btn" class="inline-flex items-center rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50">
Refill last
</button> <button type="button" id="random-btn" class="inline-flex items-center rounded-md border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-200">
Random topic &amp; keywords
</button> </div> </div> <input id="topic" name="topic" type="text" required maxlength="80" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200" placeholder="Jeddah airport layover guide"> <p class="mt-1 text-xs text-slate-500">
Fills Topic, Primary keyword and Tags with an on-brand Wfrlee idea (layovers, micro-stays,
							hourly bookings). Keep clicking for another idea.
</p> </div> <div> <label for="primaryKeyword" class="block text-sm font-semibold text-slate-900">
Primary keyword
</label> <input id="primaryKeyword" name="primaryKeyword" type="text" required maxlength="80" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200" placeholder="jeddah airport layover"> </div> <div> <label for="tags" class="block text-sm font-semibold text-slate-900">
Tags <span class="font-normal text-slate-500">(comma separated, optional)</span> </label> <input id="tags" name="tags" type="text" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200" placeholder="layover, jeddah, micro-stay"> </div> <label class="flex items-center gap-2 text-sm text-slate-700"> <input type="checkbox" name="includeFaq" checked class="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500">
Include FAQ section (Schema.org FAQPage)
</label> <div class="flex items-center gap-4"> <button type="submit" id="submit-btn" class="inline-flex items-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">
Generate &amp; publish
</button> <button type="button" id="logout-btn" class="text-sm font-medium text-slate-500 hover:text-slate-700">
Log out
</button> </div> </form> <div id="result" role="status" aria-live="polite" class="mx-auto mt-8 hidden max-w-2xl rounded-lg border p-4 text-sm"></div> </section> <section class="container-page py-10"> <div class="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-6"> <p class="text-xs font-semibold uppercase tracking-wide text-brand-600">Automation</p> <h2 class="mt-2 text-2xl font-bold text-slate-900">Weekly auto-post</h2> <p class="mt-1 text-sm text-slate-600">
Researches high-ranking, trending, high-visibility keywords and publishes a guide automatically
						every Monday — one English and one Arabic post each week. Run it now to publish this week's
						posts (each language is generated separately to stay within the serverless time limit).
</p> <div class="mt-4 flex flex-wrap items-end gap-3"> <div> <label for="weekly-lang" class="block text-sm font-semibold text-slate-900">Language</label> <select id="weekly-lang" class="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"> <option value="both">Both (English + العربية)</option> <option value="en">English only</option> <option value="ar">العربية only</option> </select> </div> <button type="button" id="weekly-btn" class="inline-flex items-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">
Publish this week's post
</button> </div> <div id="weekly-result" role="status" aria-live="polite" class="mt-4 hidden rounded-lg border p-4 text-sm"></div> </div> </section> <section class="border-t border-slate-200 bg-slate-50"> <div class="container-page py-10"> <div class="mx-auto max-w-3xl"> <div class="flex flex-wrap items-start justify-between gap-3"> <div> <h2 class="text-2xl font-bold text-slate-900">Manage posts</h2> <p class="mt-1 text-sm text-slate-600">
Edit, save, or delete published posts. Every change is committed to GitHub and triggers a
									Vercel rebuild.
</p> </div> <div class="flex items-center gap-2"> <select id="manage-lang" class="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"> <option value="en">English</option> <option value="ar">العربية</option> </select> <button type="button" id="manage-refresh" class="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200">
Refresh
</button> </div> </div> <div id="manage-status" role="status" aria-live="polite" class="mt-4 hidden rounded-lg border p-3 text-sm"></div> <ul id="manage-list" class="mt-4 divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white"></ul> <div id="manage-editor" class="mt-6 hidden rounded-lg border border-slate-200 bg-white p-5"> <div class="mb-4 flex items-start justify-between gap-3"> <div class="min-w-0"> <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Editing</p> <p id="manage-path" class="break-all font-mono text-xs text-slate-600"></p> </div> <button type="button" id="manage-close" class="shrink-0 text-sm font-medium text-slate-500 hover:text-slate-700">
Close
</button> </div> <form id="manage-form" class="space-y-4"> <div> <label for="m-title" class="block text-sm font-semibold text-slate-900">Title</label> <input id="m-title" type="text" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"> </div> <div> <label for="m-description" class="block text-sm font-semibold text-slate-900">Description</label> <textarea id="m-description" rows="3" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"></textarea> </div> <div class="grid gap-4 sm:grid-cols-2"> <div> <label for="m-category" class="block text-sm font-semibold text-slate-900">Category</label> <input id="m-category" type="text" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"> </div> <div> <label for="m-city" class="block text-sm font-semibold text-slate-900">City</label> <input id="m-city" type="text" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"> </div> </div> <div class="grid gap-4 sm:grid-cols-2"> <div> <label for="m-primaryKeyword" class="block text-sm font-semibold text-slate-900">
Primary keyword
</label> <input id="m-primaryKeyword" type="text" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"> </div> <div> <label for="m-pubDate" class="block text-sm font-semibold text-slate-900">Publish date</label> <input id="m-pubDate" type="text" placeholder="2026-01-01" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"> </div> </div> <div> <label for="m-tags" class="block text-sm font-semibold text-slate-900">
Tags <span class="font-normal text-slate-500">(comma separated)</span> </label> <input id="m-tags" type="text" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"> </div> <label class="flex items-center gap-2 text-sm text-slate-700"> <input type="checkbox" id="m-draft" class="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500">
Draft (hidden from the site)
</label> <div> <label for="m-body" class="block text-sm font-semibold text-slate-900">
Body <span class="font-normal text-slate-500">(Markdown)</span> </label> <textarea id="m-body" rows="18" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"></textarea> </div> <div class="flex flex-wrap items-center gap-3"> <button type="submit" id="manage-save" class="inline-flex items-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">
Save
</button> <button type="button" id="manage-delete" class="inline-flex items-center rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50">
Delete
</button> <span id="manage-editor-status" class="text-sm text-slate-500"></span> </div> </form> </div> </div> </div> </section> ` })}` : renderTemplate`<section class="container-page py-10"> ${!adminTokenConfigured ? renderTemplate`<div class="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"> <strong>This deployment has no ADMIN_TOKEN set.</strong> <br>
Add it in Vercel → Settings → Environment Variables (Production), save, and redeploy —
							the admin login cannot work until the server has a token configured.
</div>` : null} <form id="login-form" class="mx-auto max-w-md space-y-4 rounded-lg border border-slate-200 bg-white p-6"> <div> <label for="login-token" class="block text-sm font-semibold text-slate-900">Admin token</label> <input id="login-token" name="token" type="password" autocomplete="off" required class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200" placeholder="ADMIN_TOKEN"> <p class="mt-1 text-xs text-slate-500">
The token is verified on the server and exchanged for a short-lived session. It never
							reaches the page as plain text.
</p> </div> <button type="submit" id="login-btn" class="inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">
Log in
</button> <div id="login-error" role="alert" class="hidden rounded-md bg-red-50 p-3 text-sm text-red-700"></div> </form> </section>`}<div id="admin-root"${addAttribute(authed ? "true" : "false", "data-authed")} class="hidden"></div> ` })} ${renderScript($$result, "C:/Users/20190026516/wfrlee-blog/src/pages/admin/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/20190026516/wfrlee-blog/src/pages/admin/index.astro", void 0);

const $$file = "C:/Users/20190026516/wfrlee-blog/src/pages/admin/index.astro";
const $$url = "/blog/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
