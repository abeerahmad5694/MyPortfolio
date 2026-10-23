# Abeer Ahmad — Business & Full-Stack Developer Portfolio

Personal portfolio website for **Abeer Ahmad**, a full-stack developer specializing in
Django, Flutter, ERP & POS systems, REST APIs, and business applications.

Designed with an architectural B2B engineering aesthetic (inspired by Legency Media) and built with **React 19 + Vite 6 + TypeScript + Tailwind CSS v4 + Node Built-in SQLite (`node:sqlite`)**.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default: `http://localhost:5173`).

## Other scripts

```bash
npm run build      # type-check + production build (outputs to dist/)
npm run preview    # serve the production build locally
npm start          # production server (dist/ + SQLite API + Gzip compression on port 3000)
npm run typecheck  # TypeScript only
```

## Key Performance & Engineering Highlights

- **Route-Level Code Splitting**: Secondary pages (`/about`, `/services`, `/projects`, `/projects/:slug`, `/experience`, `/contact`, `/admin`) are lazy-loaded via `React.lazy` + `Suspense`, cutting the main application bundle by **77%** (`16.8 KB` gzipped).
- **Latin-Subset Variable Font**: Loads only the Latin subset of `Inter Variable` (`48 KB` `.woff2` instead of `220 KB` across 7 unused scripts) with `font-display: swap`.
- **Zero-CLS & High-Priority LCP**: Hero image preloaded with `fetchpriority="high"`, progressive JPEG compression across all assets, and explicit `width`/`height` dimensions on every `<img>`.
- **Zero Native C++ Compilation**: Uses Node's built-in `node:sqlite` (`DatabaseSync`) instead of `better-sqlite3`, eliminating `node-gyp` build failures and making `npm install` instant on Windows, macOS, and Linux.
- **Gzip + Immutable Asset Caching**: `server/serve.mjs` compresses text/JS/CSS responses with Gzip and serves hashed `/assets/*` bundles with `Cache-Control: public, max-age=31536000, immutable`.

## Project structure

```
index.html               SEO meta, JSON-LD schema, preload tags, theme script
public/
  abeer-ahmad-cv.pdf     Downloadable CV
  favicon.svg            Cobalt pixel-matrix brand mark
  images/                Optimized progressive JPEG assets
src/
  main.tsx               App entry
  App.tsx                Lazy-loaded routes & layout shell
  index.css              Tailwind v4 theme tokens, Swiss grid & dither utilities
  data/                  All content lives here — edit these to update the site
    site.ts              Name, contact details, nav links
    projects.ts          Projects + case study content
    services.ts          Services offered
    skills.ts            Skill groups
    experience.ts        Work experience
    education.ts         Education
  components/            Reusable UI (Navbar, Footer, BrandGraphics, cards, form, …)
  hooks/usePageMeta.ts   Per-page title + meta description
  pages/                 One file per route
server/
  api.mjs                Connect-compatible REST API middleware
  db.mjs                 Zero-dependency SQLite persistence (node:sqlite)
  config.mjs             Default admin credentials seed
  serve.mjs              Standalone production HTTP server with Gzip & caching
```

## Routes

- `/` — Home (Hero, Track Record Grid, Capability Ticker, Engagement Models, Interactive Case Study Spotlight, Featured Projects, Approach)
- `/about` — Biography, At a Glance, Principles, Education, Downloadable CV
- `/services` — 6 Production Services, Included Deliverables, Core Stack
- `/projects` — Interactive Category Filter + Case Study Grid
- `/projects/:slug` — 5 Detailed B2B Case Studies
- `/experience` — Work Experience & Day-to-Day Skills Matrix
- `/contact` — Interactive Project Scoper + Direct Contact Channels
- `/admin` — Inquiries Inbox, Email-on-Submit Toggle, Autoresponse Template Editor, Credentials Manager
- `*` — 404 Not Found

## Admin page & Inquiries database (SQLite)

Contact-form submissions are saved to a SQLite database at
`server/data/portfolio.db` (created automatically on first API request).

Visit **`/admin`** (not linked in the navigation). Default first-run login:
- Username: `VM`
- Password: `vme34ne`
