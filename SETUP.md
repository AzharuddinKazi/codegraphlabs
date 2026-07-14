# Sanity + Next.js migration — setup guide

This covers the steps that need your accounts/browser login, which can't be
done from an automated session. Everything else (schemas, routes, config) is
already committed on `feature/sanity-node-migration`.

## 1. Create the Sanity project

On your Mac, in a clone of this repo on this branch:

```bash
git checkout feature/sanity-node-migration
npm install
npx sanity@latest init
```

This opens a browser login (GitHub or Google/email). Answer the prompts:
- **Create new project** — name it `codegraphlabs` or similar
- **Use the default dataset configuration** — dataset name `production`
- **Would you like to add configuration files for a Sanity project?** — say
  **no** here. This repo already has `sanity.config.ts` and the schema files
  wired up; a fresh scaffold would conflict with them.

The CLI prints a **Project ID** — copy it.

## 2. Local environment variables

```bash
cp .env.local.example .env.local
```

Fill in:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — from step 1
- `NEXT_PUBLIC_SANITY_DATASET` — `production`
- `SANITY_API_TOKEN` — create one at `manage.sanity.io` → your project →
  **API** → **Tokens** → **Add API token**, role **Editor**. This is what
  lets the embedded Studio at `/studio` write content.
- `SANITY_REVALIDATE_SECRET` — make up any random string (e.g.
  `openssl rand -hex 16`), you'll reuse it in step 4.

## 3. Run it locally

```bash
npm run dev
```

- `localhost:3000` — the site (mostly placeholder until content is migrated)
- `localhost:3000/studio` — the CMS. Log in with the same account from step 1.
  Create one `Site Settings` document first — the homepage skeleton reads
  `personName` and `tagline` from it.

## 4. Webhook for instant content updates (do this once deployed, not now)

In `manage.sanity.io` → your project → **API** → **Webhooks** → **Create webhook**:
- URL: `https://<your-vercel-domain>/api/revalidate`
- Dataset: `production`
- Trigger on: Create, Update, Delete
- Secret: the same string you put in `SANITY_REVALIDATE_SECRET`

Without this, published changes still show up — just after up to 60 seconds
(the `revalidate: 60` fallback on the homepage), not instantly.

## 5. CORS for the Studio

`manage.sanity.io` → your project → **API** → **CORS Origins** → add:
- `http://localhost:3000` (for local dev)
- `https://<your-vercel-domain>` (once deployed)

Without this, `/studio` loads but can't read/write content — you'll see CORS
errors in the browser console.

## 6. Vercel project settings (when ready to deploy this branch)

This is the point of no return the plan called out — don't do this until
content parity is reached and you've reviewed the site.

In the Vercel dashboard, on the `codegraphlabs` project:
- **Settings → Environment Variables** — add the same five variables from
  step 2 (Production + Preview environments)
- **Settings → Git** — Vercel should auto-detect Next.js once it sees
  `package.json` + `next.config.mjs` on the deployed branch; no manual
  framework preset change needed, unlike the static-HTML setup this replaces
- Push a commit to this branch (or open a PR) to get a preview deployment
  first, before pointing production at it

## What's already done vs. what's next

**Done (this commit):**
- Next.js App Router skeleton, builds and runs
- Sanity schemas: `siteSettings`, `experience`, `project`, `testimonial`,
  `series`, `post`
- Embedded Studio at `/studio`
- On-demand revalidation webhook route
- Old static site preserved under `legacy-static/` for reference during
  content migration

**Not done yet (next phase, after you've set this up and reacted to it):**
- Homepage sections (hero, timeline, projects, testimonials, blog card,
  contact form) — currently a bare placeholder
- Shared layout component (nav + footer) — the actual fix for the drift bug
  from the audit
- `/projects/[slug]` and `/blog/[slug]` dynamic routes
- Porting the CBDC post content + images into Sanity
- Full design system CSS port from `legacy-static/index.html`
