# Wfrlee Blog

The blog for [wfrlee.com](https://wfrlee.com) — micro-stay and airport layover
guides for travellers in Saudi Arabia, published in English and Arabic.

Live site: **<https://blog.wfrlee.com>**

## Stack

| | |
| --- | --- |
| Framework | [Astro](https://astro.build) 5 (SSR / `output: 'server'`) |
| Adapter | `@astrojs/node` (standalone Node server behind nginx on an AWS VM) |
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
| `npm start` | Run the production build (`dist/server/entry.mjs`) with `.env` loaded |
| `npm run preview` | Serve the production build locally |
| `npm run check` | `astro check` — type-check `.astro` files and content |

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
                     (web.config) configs
deploy/nginx.conf    nginx site for the VM
scripts/deploy.sh    Pull, build and restart on the VM (run by the Deploy workflow)
ecosystem.config.cjs pm2 process definition
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

The site runs on an **AWS Linux VM** as a Node server (`@astrojs/node`,
standalone mode) managed by **pm2**, with **nginx** in front of it.

```text
git push master → GitHub Actions (Deploy) → SSH → scripts/deploy.sh
                                                   git pull, npm ci, build,
                                                   pm2 reload
browser → https://blog.wfrlee.com → nginx :443 → Node on 127.0.0.1:4321
```

Every push to `master` is deployed automatically, including the posts the AI
publisher commits through the GitHub API.

### One-time VM setup

Commands for Ubuntu (use `dnf` instead of `apt` on Amazon Linux):

```sh
# Node 22, git, nginx, pm2
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs git nginx
sudo npm install -g pm2

# A read-only key so the VM can pull from GitHub
ssh-keygen -t ed25519 -f ~/.ssh/github -N ""
cat ~/.ssh/github.pub   # GitHub → repo → Settings → Deploy keys → Add (read-only)
printf 'Host github.com\n  IdentityFile ~/.ssh/github\n' >> ~/.ssh/config

# Clone, configure, first start
sudo mkdir -p /var/www && sudo chown "$USER" /var/www
git clone git@github.com:quitzash/wfrlee-blog.git /var/www/wfrlee-blog
cd /var/www/wfrlee-blog
cp .env.example .env && nano .env      # fill in the secrets
bash scripts/deploy.sh                 # install, build, start under pm2
pm2 startup                            # run the command it prints (restart on reboot)
```

Never edit files in `/var/www/wfrlee-blog` directly: `deploy.sh` uses
`git pull --ff-only` and stops if the server copy has local changes. The only
server-only file is `.env`. After changing it, run
`pm2 reload wfrlee-blog --update-env`.

### nginx and the subdomain

1. **DNS:** add an `A` record for the subdomain pointing at the VM's
   **Elastic IP** (a normal public IP changes when the VM stops).
2. **AWS security group:** allow inbound 80 and 443 (and 22 for SSH).
3. Install the site and HTTPS:

   ```sh
   sudo cp deploy/nginx.conf /etc/nginx/sites-available/wfrlee-blog
   sudo ln -s /etc/nginx/sites-available/wfrlee-blog /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d blog.wfrlee.com
   ```

Using a different subdomain? Change it in `deploy/nginx.conf`, in `site` in
`astro.config.mjs` and in `SITE_URL` in `src/consts.ts`, and set the
`SITE_URL` repository variable for the weekly cron.

The Node server applies the security headers to the pages it renders
(`src/middleware.ts`). Prerendered pages and static files bypass the
middleware, so `deploy/nginx.conf` adds the same headers to any response that
does not already have them.

### Automatic deploys (GitHub Actions)

`.github/workflows/deploy.yml` runs on every push to `master` (or manually from
**Actions → Deploy → Run workflow**). Add these repository secrets under
**Settings → Secrets and variables → Actions**:

| Secret | Value |
| --- | --- |
| `VM_HOST` | The VM's Elastic IP or hostname |
| `VM_USER` | `ubuntu` (Ubuntu) or `ec2-user` (Amazon Linux) |
| `VM_SSH_KEY` | The private key (`.pem`) you use to SSH in, e.g. from MobaXterm |

Optional repository variable `VM_APP_DIR` (default `/var/www/wfrlee-blog`).
GitHub's runners connect from changing IPs, so port 22 has to be reachable
from the internet. Key-only SSH (the EC2 default) keeps that safe.

### Environment variables and secrets

They live in `/var/www/wfrlee-blog/.env` on the VM and are loaded when the
server starts (`node --env-file=.env`). See [.env.example](./.env.example) for
the full list.

| Variable | Purpose |
| --- | --- |
| `ADMIN_TOKEN` | Protects `/admin` and the admin API routes |
| `ADMIN_SESSION_SECRET` | Optional. Defaults to `ADMIN_TOKEN` |
| `CRON_SECRET` | Shared secret for the scheduled jobs |
| `ANTHROPIC_API_KEY` | AI post generation and keyword research |
| `GITHUB_TOKEN` | Publishes generated posts to this repository |
| `RESEND_API_KEY` | Sends the newsletter |

## Scheduled jobs

The weekly jobs are driven from GitHub Actions:

- `.github/workflows/weekly-cron.yml` runs every Monday at 07:00 UTC.
- It calls `/api/ai/weekly-post?lang=en` and `?lang=ar` (one post per
  language), then `/api/newsletter/send?lang=…`.
- Authentication is `Authorization: Bearer <CRON_SECRET>`, so the same secret
  has to exist twice: as the `CRON_SECRET` repository secret in GitHub and in
  `.env` on the VM.
- The target is `https://blog.wfrlee.com` unless the `SITE_URL` repository
  variable says otherwise.
- The newsletter language defaults to English. Override it with the
  `NEWSLETTER_LANG` repository variable, or run the workflow manually
  (**Actions → Weekly cron → Run workflow**) to pick a language.

`vercel.json` keeps the equivalent Vercel crons for Vercel deployments.

## Admin panel

`/admin` is the AI Content Studio. It is protected by `ADMIN_TOKEN`
(sent as the `x-admin-token` header) and issues a short-lived, httpOnly,
`SameSite=Strict` session cookie. Cookie-authenticated requests must come
from a trusted origin.

## AI publishing

`/admin` can research keywords and publish a post to this repository through
the GitHub API. The weekly run publishes one post per language (English and
Arabic) and then sends the newsletter.
