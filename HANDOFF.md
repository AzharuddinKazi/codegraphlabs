# HANDOFF — Sanity + Next.js migration (feature/sanity-node-migration)

Context document for an LLM (or human) resuming this work mid-migration.
Read this fully before touching code. Last updated: 2026-07-14.

## What this project is

Personal portfolio/blog site for **Azharuddin Kazi** (Specialist Data Scientist,
fraud prevention/financial supervision, UAE), domain `codegraphlabs.com`,
hosted on Vercel with auto-deploy from GitHub (`AzharuddinKazi/codegraphlabs`).

Strategic intent (from an architecture review the user signed off on): the
site is a personal brand today ("front door is me"), but should be able to
quietly evolve into a freelance/consulting/org brand later **without a
rebuild**. That drove the move from hand-authored static HTML to a
CMS-backed content model.

## Branch situation — IMPORTANT

- **`main`** = the live static HTML site (production). Untouched by this
  migration. Do not merge this branch until content parity is reached and
  the user explicitly approves cutover.
- **`feature/sanity-node-migration`** = this branch. Next.js + Sanity
  rewrite. Tracked as **draft PR #17** (title says "do not merge").
- There is also a `claude/design-system-review-sr4y69` branch used for the
  regular static-site workflow (PRs #1–#16, all merged). Not relevant here
  unless the user asks for changes to the live static site — those go on
  that branch, from latest `origin/main`, NOT on this one.
- The old static site is preserved in `legacy-static/` **on this branch**
  as the reference for content migration. Don't delete it until cutover.

## Stack

- **Next.js 16.2.10** (App Router, Turbopack) + **React 19**
- **Sanity 6.4.0** via `next-sanity` 13.1.1, embedded Studio at `/studio`
- TypeScript, strict. Path alias `@/*` → `./src/*`
- No CSS framework — the design system is plain CSS custom properties in
  `public/design-system/system/variables.css`, with component styles ported
  verbatim into `src/app/globals.css`
- Deployed on Vercel. `vercel.json` pins `"framework": "nextjs"`

## Sanity project (user's own account)

- **Project ID: `89hc9jsk`**, dataset **`production`**
- Env vars (set in Vercel dashboard, Preview scope; `.env.local` for local
  dev — gitignored, see `.env.local.example`):
  - `NEXT_PUBLIC_SANITY_PROJECT_ID=89hc9jsk`
  - `NEXT_PUBLIC_SANITY_DATASET=production`
  - `SANITY_API_TOKEN` (not needed yet; only for privileged server writes)
  - `SANITY_REVALIDATE_SECRET` (webhook auth; webhook not configured yet)
- **Verified working end-to-end**: user created a `siteSettings` document in
  the deployed `/studio`, published it, and saw the homepage update. CORS
  for the preview URL is configured on the Sanity side.
- **CRITICAL sandbox limitation**: the Claude Code remote-session sandbox
  CANNOT reach `*.sanity.io` (network allowlist blocks it, 403 on CONNECT).
  You cannot query or seed the dataset from a sandboxed session. All
  content entry happens through the deployed Studio in the user's browser,
  or would need a script the *user* runs. Vercel builds CAN reach Sanity.
  Don't burn time retrying the network; it's policy, not flakiness.

## Design system rules (non-negotiable, from public/design-system/DESIGN.md)

- Slate for all structure/text; **exactly ONE crimson (#c81d25) element per
  screen** ("Three is decoration"). Headings are slate, never crimson.
- Hierarchy by weight, not size. Manrope display/body, Source Code Pro mono.
- Border radius 8px max.
- No pill/chip-shaped UI — the user explicitly rejected pills ("looks AI
  generated"). Tags render as plain mono text with `·` separators
  (`.tag:not(:last-child)::after`). Relationship labels on testimonials are
  plain dash-prefixed lines, not badges.
- The hero "signature band" and any fixed-palette component (e.g. the CBDC
  series roadmap in the legacy blog post) deliberately do NOT follow the
  light/dark theme toggle — like a photograph. Keep that behavior.
- Theme toggle works by adding/removing `.dark` on `<body>` (variables.css
  defines `.dark { ... }` overrides), persisted in `localStorage('theme')`.

## Architecture decisions already made (don't relitigate)

1. **Route groups**: root layout (`src/app/layout.tsx`) is minimal because
   it wraps `/studio` too; site chrome lives in `src/app/(site)/layout.tsx`.
   Never put nav/footer in the root layout — it breaks the Studio.
2. **`sanityFetch<T>()` in `src/sanity/client.ts` is the ONLY way pages
   fetch data.** It returns `null` when Sanity is unconfigured or a query
   fails. Never call `client.fetch` directly from a page/component: an
   earlier build crashed on Vercel because env.ts used to throw at import
   time. Everything must degrade gracefully, never fail the build.
3. **Sanity returns `null` (not `undefined`) for unset document fields.**
   JS default parameters DO NOT apply to null. Use explicit `?? fallback`
   in the function body (see ContactSection.tsx for the pattern and the
   comment explaining it). This already caused one Vercel build failure.
4. **`series` is its own document type** referenced by posts, so a 7-post
   series shares one roadmap rather than duplicating it per post.
5. **Homepage does ONE aggregated GROQ query** (see `(site)/page.tsx`),
   not per-component fetches.
6. Empty collections render explicit "in preparation — create one in
   /studio" placeholders, not blank space.
7. StatsGrid is intentionally hardcoded (rarely-changing credential info);
   the user hasn't asked to CMS-ify it.

## Current file map

```
src/
├── app/
│   ├── layout.tsx              # minimal root (fonts, variables.css, favicon)
│   ├── globals.css             # full design-system port from legacy static
│   ├── (site)/
│   │   ├── layout.tsx          # SiteHeader + SiteFooter + ScrollReveal; fetches siteSettings
│   │   └── page.tsx            # homepage; aggregated GROQ query, all sections
│   ├── studio/[[...tool]]/page.tsx  # embedded Sanity Studio
│   └── api/revalidate/route.ts # Sanity webhook → revalidatePath('/')
├── components/                 # SiteHeader (client), SiteFooter, SignatureBand,
│                               # EmployerStrip, StatsGrid, ExperienceTimeline,
│                               # ProjectsSection, BlogSection, TestimonialsSection,
│                               # ContactSection (client), ScrollReveal (client)
└── sanity/
    ├── env.ts                  # exports isSanityConfigured; NEVER throws
    ├── client.ts               # client (nullable) + sanityFetch helper
    └── schemaTypes/            # siteSettings, experience, project, testimonial,
                                # series, post (+ index.ts)
sanity.config.ts                # Studio config; placeholder fallbacks so build never dies
legacy-static/                  # the old static site — SOURCE OF TRUTH for content migration
public/design-system/           # tokens, fonts, DESIGN.md — do not modify
SETUP.md                        # user-facing env/account setup steps
```

## State as of last commit (a2eb685)

Working: build (exit 0 with or without env vars), typecheck clean, homepage
fully ported and screenshot-verified (light/dark/mobile incl. nav drawer),
Studio loads at /studio, user's siteSettings doc renders on the deployed
preview. The last Vercel build failure (null `.replace()`) is fixed and
pushed; expect the current deploy to be green — verify on PR #17.

Known open items on the deployed preview:
- User has a siteSettings doc with `personName` + `tagline` only. Most
  siteSettings fields (hero*, email, linkedinUrl, ...) are unset → site
  shows fallbacks that visually match the legacy copy.
- **`tagline` is an orphaned field** — in the schema but rendered nowhere
  (personName appears only in the footer copyright). The user just asked
  about this; options offered were (a) wire tagline into SEO meta
  description or hero, or (b) drop the field. **The user has NOT chosen
  yet — ask before acting on it.**

## TODO list, in priority order

1. **`/blog/[slug]` dynamic route** — render `post` documents: portable
   text body (`@portabletext/react` — NOT yet installed, add it),
   inline citations/sources list, series roadmap block (port the visual
   from `legacy-static/blog/cbdc-01-legal-tender-and-cbdc.html` — fixed
   palette, boxes 7→2 planned at reduced-opacity fill, crimson "you are
   here" divider, box 1 done in dark slate), per-post or site-wide
   disclaimer at top. URL parity with the legacy post is nice-to-have,
   not required (`/blog/cbdc-01-legal-tender-and-cbdc`).
2. **`/projects/[slug]` dynamic route** — render `project` documents;
   reference layout is `legacy-static/projects/agent-dasc-lifecycle.html`.
3. **Content migration** — the user enters content via the deployed
   Studio (sandbox can't reach Sanity). Prepare exact copy for them to
   paste: 4 experience entries, 3 testimonials, 1 project (Agent-DASC),
   1 blog post (CBDC Post 1) — all of it lives verbatim in
   `legacy-static/index.html` and the blog file. The two blog figures are
   at `public/assets/blog/cbdc-post1-figure{1,2}.png` (transparent-bg
   PNGs) — user uploads them as Sanity image assets in the post body.
4. **SEO parity** — per-page metadata (OG/Twitter/canonical/JSON-LD
   Person schema) matching what legacy-static pages have; wire from
   siteSettings where sensible. Also `resume.html`/PDF link: nav Résumé
   currently points at `siteSettings.resumeUrl` (unset → '#'); simplest
   fix is defaulting to `/assets/Azharuddin-Kazi-Resume.pdf` which
   already exists in public/.
5. **Vercel Analytics** — legacy pages had
   `<script defer src="/_vercel/insights/script.js">`; add `@vercel/analytics`
   (or the plain script) to the (site) layout.
6. **Sanity webhook** — user creates it in manage.sanity.io per SETUP.md
   §4 once ready; the `/api/revalidate` endpoint currently only
   revalidates `/` — extend to revalidate `/blog/[slug]` etc. by type.
7. **Footer disclaimer check** — legacy footer disclaimer text: "Views
   expressed on this site are my own and do not represent or reflect the
   position of the Central Bank of the UAE or any employer." It renders
   only if `siteSettings.disclaimer` is set — remind the user to fill it.
8. **Cutover (LAST, user-gated)** — merge PR #17 only when user approves;
   production env vars; delete `legacy-static/` in a follow-up; configure
   redirects if blog URL changed; switch Vercel production alias.

## Working conventions this session established

- The user merges PRs quickly and sometimes mid-work: **always `git fetch
  origin main` and check whether your branch's PR was already merged before
  committing new work.** (On this feature branch that's less of an issue —
  PR #17 is draft — but the habit stands.)
- Verify before shipping: `npx tsc --noEmit`, then `npx next build` (must
  exit 0 both with and without `.env.local` present), then Playwright
  screenshots via the globally installed playwright
  (`require('/opt/node22/lib/node_modules/playwright')`, chromium at
  `/opt/pw-browsers/chromium`) against `npx next dev -p 3311`.
  Check light mode, dark mode (`.theme-toggle-btn` click), mobile 375px
  (no horizontal overflow; `.nav-toggle-btn` for the drawer).
- Never commit `.env.local`, `.next/`, `tsconfig.tsbuildinfo`.
- Commit messages explain root cause, not just the change. No model names
  in commits/PRs/code comments.
- The user prefers seeing a verified state before scope expands; ask
  before making product decisions (e.g. the tagline question), don't
  assume.
- User's email: azharuddin.raz.kazi@gmail.com. Tone: direct, technical,
  concise; they push back when something looks off — take it seriously.
