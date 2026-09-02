# Abeer Ahmad — Portfolio

Personal portfolio website for Abeer Ahmad, a full-stack developer specializing in
Django, Flutter, ERP & POS systems, REST APIs, and business applications.

Built with **React + Vite + TypeScript + Tailwind CSS**.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default: http://localhost:5173).

## Other scripts

```bash
npm run build      # type-check + production build (outputs to dist/)
npm run preview    # serve the production build locally
npm run typecheck  # TypeScript only
```

## Project structure

```
index.html               SEO meta, favicon, OG tags
public/
  abeer-ahmad-cv.pdf     Downloadable CV (copy of the original PDF)
  favicon.svg
src/
  main.tsx               App entry
  App.tsx                Routes
  index.css              Tailwind theme + base styles
  data/                  All content lives here — edit these to update the site
    site.ts              Name, contact details, nav links
    projects.ts          Projects + case study content
    services.ts          Services offered
    skills.ts            Skill groups
    experience.ts        Work experience
    education.ts         Education
  components/            Reusable UI (Navbar, Footer, Button, cards, form, …)
  hooks/usePageMeta.ts   Per-page title + meta description
  pages/                 One file per route
```

## Routes

- `/` — Home
- `/about`
- `/services`
- `/projects`
- `/projects/:slug` — 5 case studies
- `/experience`
- `/contact`
- anything else — 404

## Theming (light / dark)

The site supports both themes with a toggle in the navbar (persisted to
`localStorage`, defaults to the system preference). Colors are semantic CSS
variables (`--canvas`, `--surface`, `--line`, `--heading`, `--body`, `--accent`,
…) mapped to Tailwind utilities (`bg-canvas`, `bg-surface`, `border-line`,
`text-heading`, `text-body`, `bg-accent`, …) in `src/index.css`. To restyle,
change the token values — components don't hardcode colors. An inline script in
`index.html` applies the saved theme before first paint (no flash).

## Inquiries database (SQLite)

Contact-form submissions are saved to a SQLite database at
`server/data/portfolio.db` (created automatically). The API is built into the
Vite dev server — `npm run dev` is all you need.

For production, run the standalone server (API + static site on one port):

```bash
npm run build
npm start          # serves dist/ + API at http://localhost:3000 (PORT env to change)
```

API endpoints (admin ones require Basic auth with the VM / vme34ne credentials):

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/inquiries` | public | Save an inquiry |
| POST | `/api/inquiries/:id/email-status` | public | Record email sent/failed |
| GET | `/api/inquiries` | admin | List inquiries |
| PATCH | `/api/inquiries/:id` | admin | Toggle handled |
| DELETE | `/api/inquiries/:id` | admin | Delete an inquiry |

Server-side credentials live in `server/config.mjs` — keep them in sync with
`src/data/admin.ts`.

## Admin page — email template

Visit **`/admin`** (not linked in the navigation). Login:
- Username: `VM`
- Password: `vme34ne`

These are **first-run seeds stored in the SQLite database** (`admin_users`
table). Change them any time from the admin dashboard ("Admin credentials"
card) — no code edit needed.

Credentials are obfuscated at rest (no hashing, reversible by design): a
fixed marker is inserted at the 2nd character — `admin` is stored as
`ad@#min`, and the marker is stripped when verifying. This is a simple
gate, not real security.

### Email toggle

The **"Send emails on form submit"** switch in the admin dashboard controls
whether the contact form attempts email delivery at all. When off,
submissions are still saved to the database and visitors see a simple
"received" confirmation — each inquiry is marked "Email off" in the inbox.
The setting lives in the `settings` table (`email_enabled`).

Inside the dashboard, edit the **confirmation email** automatically sent to
visitors after they submit the contact form. Supports `{name}`, `{email}`
and `{type}` placeholders, with a live preview. Saving stores the template
in the browser (localStorage); to apply it permanently for all visitors,
copy it into `DEFAULT_EMAIL_TEMPLATE` in `src/data/admin.ts` and rebuild.

## Contact form — email delivery

The form sends messages via **[FormSubmit](https://formsubmit.co)** (free, no
backend or account needed). Config lives at the top of
`src/components/ContactForm.tsx`:

- `FORMSUBMIT_ENDPOINT` — submissions go to this inbox. Change the address there.
- On submit, the inquiry lands in the owner's email (formatted table, subject
  like `Project inquiry: ERP / POS system — Name`), with **reply-to set to the
  visitor's address**.
- `_autoresponse` sends the visitor an automatic confirmation email at the
  address they typed in the Email field.

**One-time activation:** the first submission (ever) triggers an email from
FormSubmit to the owner containing an "Activate Form" link — click it once.
Until then, submissions return an error and the form shows the fallback
message with the direct email address.

Spam protection: a hidden `_honey` honeypot field plus optional captcha
(currently off).

## Notes

- The contact form has no backend: it composes a `mailto:` link with the message
  pre-filled and opens the visitor's email app. To connect a real backend or a
  service like Formspree, edit `src/components/ContactForm.tsx`.
- To update content, edit the files in `src/data/` — no component changes needed.

## Replacing images

The project "screenshots" are placeholders. To use real ones, replace the files —
no code changes needed:

```
public/images/projects/retail-erp-systems.jpg         ← ERP dashboard
public/images/projects/pos-systems.jpg                ← POS interface
public/images/projects/on-demand-services-app.jpg     ← mobile app screens
public/images/projects/food-delivery-app.jpg          ← mobile app screens
public/images/projects/face-recognition-attendance.jpg
```

Keep the same filenames (any 16:10 or 16:9 image works — cards crop to 16:9).
Alt text for each lives in `src/data/projects.ts` (`imageAlt` per project).

Other page images (real photos, also swappable by filename):

```
public/images/hero-setup.jpg       Home hero
public/images/laptop-code.jpg      About page
public/images/code-dark.jpg        Services banner
public/images/about-workspace.jpg  Experience page
public/images/desk-night.jpg       Contact page
public/images/keyboard-detail.jpg  CTA band (every page)
```
