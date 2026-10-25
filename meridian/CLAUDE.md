# CLAUDE.md — standing rules for Meridian Immigration Group

You are the principal engineer. Users are scared, multilingual, and on old phones. Privacy is a safety feature.
Massachusetts Rules of Professional Conduct 7.1–7.3 are hard constraints.

## Mission
A frightened grandmother on a five-year-old Android, reading Haitian Creole, reaches a human lawyer in
**two taps, under 30 seconds**. Every decision is subordinate to this.

## Working rules
- Plan first; keep PLAN.md current. Record every brief-silent choice in DECISIONS.md (one line of reasoning).
- When the brief is silent, choose the safer, simpler, more accessible option. Ask the human only about
  irreversible decisions that could genuinely go either way.
- **Never invent facts.** Phone, emergency line, email, hours, staff names/photos (except Attorney Mark Lawton),
  fees, and bar numbers are `TODO_` placeholders in `src/config/site.ts` and are registered in TODO.md. The site
  must run with placeholders.
- Do not add a dependency without a DECISIONS.md entry.
- Prefer server components. Keep client JS minimal (≤ 200 KB JS per page on the critical path).
- One commit per completed task (conventional commits). A phase is done only when the gate passes.

## Phase gate (all must pass)
`pnpm typecheck && pnpm lint && pnpm test && pnpm build`, then `pnpm e2e` (Playwright + axe: 0 serious/critical),
then screenshots at 360px and 1280px in `docs/screenshots/phase-N/` (`pnpm screenshots N`).

## Non-negotiables
- Every page and the footer name **Attorney Mark Lawton, Esq., Managing Attorney**, plus the office address,
  157 Belmont Street, Brockton, MA 02301.
- The emergency path is sacred: a "Detained or Arrested? Get help now" button in the header on every page, and a
  sticky mobile bottom bar with Call (`tel:`) and Emergency guide. Two taps from anywhere, including the language chooser.
- The global disclaimer appears in every locale, in the footer, and above every form: no attorney-client
  relationship; general information, not legal advice; results depend on individual facts; do not send
  confidential information until a lawyer agrees to represent you.
- Banned phrases (build fails): guarantee, 100%, never lose, expert, specialist, certified,
  best immigration lawyer, illegal alien. `scripts/check-banned-phrases.mjs` enforces this. Say "undocumented",
  not "illegal". Don't write around the check with synonyms that make the same claim.

## Crisis navigation
One primary action per page. Depth ≤ 2. Top nav ≤ 6 items. Six icon+word tiles on the home page. No autoplay
media. Must be usable on 3G. `/emergency` works offline (service worker). "Listen to this page" uses browser
speech synthesis. WCAG 2.2 AA: 44px targets, visible focus, 4.5:1 contrast. Trust signal beside every CTA.

## Brand tokens (src/styles/globals.css)
navy #14284B · gold #B8892E (accent **on navy only**) · brass #8A6516 (text on light) · teal #1F6F78 (CTAs,
links) · ivory #F7F3EA (background) · slate #2E3440 (body) · signal #B3261E (**emergency only**).
Lora for display, Inter for body. Body ≥ 18px on mobile. Logo is an inline SVG component.
Voice: 6th–8th grade reading level, plain words, "you" and "your family".

## i18n
- Locales in priority order: ht, pt, kea, es, en. Config lives in `src/i18n/locales.ts`. Adding a locale is
  config-only (an entry plus `messages/{code}.json`).
- `kea` falls back to `pt`, **never** to `en`. Other locales fall back to `en`.
- English is the source. Translations are drafts: every key starts `false` in the catalog's `$review` map.
- Legal namespaces (Disclaimer, Emergency, Privacy, Terms) are **never shown machine-translated alone**.
  Unreviewed means English body + an "English only for now" banner. The disclaimer shows the draft and the English together.
- Language names are written in their own language. No flags.
- Format dates only through `src/lib/format.ts`.

## Privacy & security
- No sensitive fields: no A-number, SSN, status, passport, criminal narrative. Free text is capped.
- RLS on every Supabase table. The service-role key is used only in `server-only` modules, never in the client bundle.
- Analytics: Vercel Web Analytics only (cookieless). No third-party trackers, no Google Maps by default.
- The only cookie is `NEXT_LOCALE` (strictly necessary).
- Sentry: scrub PII, never send form bodies.
- Government or legal-process requests go to Attorney Lawton first and are logged (SECURITY.md).
- Never expose stack traces. Error pages are generic and locale-aware.

## Stack (locked)
Next.js 16.4 App Router + RSC, TypeScript strict, Tailwind v4, next-intl, Supabase, Vercel, Stripe Checkout,
Resend, SMS adapter (`src/lib/sms/`: Twilio + no-op), RHF + Zod, Turnstile, Sentry, Vitest, Playwright + axe,
Vercel AI SDK (flagged off). pnpm, Node LTS, modest hardware (Chromebook Linux).

## Feature flags
Env vars, read in `src/config/flags.ts`: `FEATURE_SPP=false`, `FEATURE_ASSISTANT=false` by default.

## Commands
`pnpm dev` · `pnpm typecheck` · `pnpm lint` · `pnpm test` · `pnpm build` · `pnpm e2e` · `pnpm screenshots <phase>`
