# Wfrlee Blog

The blog for [wfrlee.com](https://wfrlee.com) — micro-stay and airport layover
guides for travellers in Saudi Arabia, published in English and Arabic.

Live site: **<https://blog.wfrlee.com>**

## Stack

| | |
| --- | --- |
| Framework | [Astro](https://astro.build) 5 (SSR / `output: 'server'`) |
| Adapter | `@astrojs/cloudflare` (Cloudflare Pages) |
| Content | Markdown/MDX collections with a Zod schema |
| Styling | Tailwind CSS 3 |
| i18n | Astro's built-in i18n (`en` at the root, `ar` under `/ar/`) |

## Domains

| Host | Role |
| --- | --- |
| `blog.wfrlee.com` | Canonical host for the blog. Set as `site` in `astro.config.mjs` and as `SITE_URL` in `src/consts.ts` — keep the two in sync. |
| `wfrlee.com` | The main marketing/booking site. Linked to from the footer and the admin panel. |

The blog is served from the **root** of `blog.wfrlee.com`, so `base` is `/`.
The `/blog` segment in post URLs comes from the route itself
(`src/pages/blog/[...slug].astro`), not from `base`.

> `site` must be an absolute URL **with a scheme**. Astro validates it with
> `z.string().url()` and aborts the build with `site: Invalid url` otherwise.

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server on <http://localhost:4321> |
| `npm run build` | Production build into `./dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run check` | `astro check` — type-check `.astro` files and content |
| `npm run deploy` | Publish `./dist/` to Cloudflare Pages (`wrangler pages deploy`) |
| `npm run pages:dev` | Run the built Worker locally through `wrangler pages dev` |

## Project structure

```text
src/
├── components/      UI components (Header, Footer, BlogPostCard, seo/…)
├── content/blog/    Posts, split per language: blog/en/ and blog/ar/
├── layouts/         BaseLayout, ArticleLayout
├── lib/             Business logic: ai/, publish/, auth, email, cities
├── pages/           Routes. blog/[...slug].astro, cities/, ar/, admin/, api/
└── middleware.ts    Baseline security headers on every rendered response
public/              Static assets, plus the Apache (.htaccess) and IIS
                     (web.config) configs and the Cloudflare Pages _headers
```

### Routes

| Route | Notes |
| --- | --- |
| `/` | Home |
| `/blog/<slug>/` | English post |
| `/ar/` and `/ar/blog/<slug>/` | Arabic home and post |
| `/cities/<city>/` | Per-city landing pages |
| `/about/`, `/why-wfrlee/` | Static pages |
| `/admin/` | AI Content Studio (token login) |
| `/api/*` | Admin, AI and newsletter endpoints |
| `/rss.xml`, `/ar/rss.xml`, `/sitemap-index.xml`, `/robots.txt` | Feeds and discovery |

## Writing a post

Posts live in `src/content/blog/<lang>/<yyyy-mm-dd>-<slug>.md`. Every field is
validated at build time by the schema in `src/content.config.ts`:

```yaml
---
title: "Best Madinah Budget Hourly Hotels: A Guide for Travelers"   # max 70 chars
description: "…"                                                     # 150-160 chars
pubDate: 2024-05-22
updatedDate: 2024-05-22                                              # optional
heroImage: "/images/pexels-konevi-34246946.jpg"                      # path in /public
author: Wfrlee Travel Team
category: "Travel Guides"
city: "Madinah"                                                      # optional
tags: ["Madinah", "budget travel"]
primaryKeyword: "madinah budget hourly hotel"
translationKey: madinah-budget-hourly-hotels                         # links the translation
draft: false
---
```

Set `draft: true` to keep a post out of the blog index and the sitemap.

## Deploying

The site is deployed to **Cloudflare Pages** with the Cloudflare adapter.
`npm run build` writes `dist/` (the Worker in `dist/_worker.js/` plus the
static assets); `wrangler.jsonc` points Pages at that folder.

Deploy from the CLI:

```sh
npm run build
npm run deploy          # wrangler pages deploy dist --project-name wfrlee-blog
```

### Cloudflare Pages project settings

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Deploy command | `npm run deploy` |
| Node version | `24` (or whatever `NODE_VERSION` is set to) |

The deploy command **must not** be `npx wrangler preview` — that command does
not exist in Wrangler v3+ and the build fails with `wrangler: not found`
unless Wrangler is installed. `wrangler` is a dev dependency of this repo, so
`npm run deploy` resolves it from `node_modules/.bin`.

> A `wrangler.jsonc` that contains `pages_build_output_dir` becomes the source
> of truth for the Pages project configuration. Keep it in sync with the
> dashboard (bindings, environment variables) and remember that Pages rejects
> the `triggers` key — Cron Triggers are a Workers-only feature.

### Environment variables and secrets

Set these on the Pages project (**Settings → Variables and Secrets**, for both
production and preview). Encrypted variables are the ones the app reads at
runtime; see [.env.example](./.env.example) for the full list.

| Variable | Purpose |
| --- | --- |
| `ADMIN_TOKEN` | Protects `/admin` and the admin API routes |
| `ADMIN_SESSION_SECRET` | Optional. Defaults to `ADMIN_TOKEN` |
| `CRON_SECRET` | Shared secret for the scheduled jobs |
| `ANTHROPIC_API_KEY` | AI post generation and keyword research |
| `GITHUB_TOKEN` | Publishes generated posts to this repository |
| `RESEND_API_KEY` | Sends the newsletter |

Security headers are applied in two places, because the deployment target
ignores the Apache/IIS configs:

- `public/_headers` — Cloudflare Pages, for the prerendered HTML and assets.
- `src/middleware.ts` — every response the Worker renders at request time.

## Scheduled jobs

Cloudflare Pages **does not support Cron Triggers** (they are a Workers-only
feature), so the weekly jobs are driven from GitHub Actions:

- `.github/workflows/weekly-cron.yml` runs every Monday at 07:00 UTC.
- It calls `/api/ai/weekly-post?lang=en` and `?lang=ar` (one post per
  language), then `/api/newsletter/send?lang=…`.
- Authentication is `Authorization: Bearer <CRON_SECRET>`, so the same secret
  has to exist twice: as the `CRON_SECRET` repository secret in GitHub and as
  an encrypted variable on the Cloudflare Pages project.
- The newsletter language defaults to English. Override it with the
  `NEWSLETTER_LANG` repository variable, or run the workflow manually
  (**Actions → Weekly cron → Run workflow**) to pick a language.

`vercel.json` keeps the equivalent Vercel crons for Vercel deployments.

> The AI post endpoint can run for a few minutes. Cloudflare's free plan caps
> the CPU time of a single invocation, so if the generation times out there,
> trigger it from `/admin` instead.

## Admin panel

`/admin` is the AI Content Studio. It is protected by `ADMIN_TOKEN`
(sent as the `x-admin-token` header) and issues a short-lived, httpOnly,
`SameSite=Strict` session cookie. Cookie-authenticated requests must come
from a trusted origin.

## AI publishing

`/admin` can research keywords and publish a post to this repository through
the GitHub API. The weekly run publishes one post per language (English and
Arabic) and then sends the newsletter.
