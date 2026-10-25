# PLAN — MeridianImmigrationGroup.com

**Mission:** a frightened grandmother on a five-year-old Android phone, reading Haitian Creole,
reaches a human lawyer in **two taps, under 30 seconds**. Everything else is subordinate.

Responsible attorney: **Attorney Mark Lawton, Esq., Managing Attorney** — 157 Belmont Street, Brockton, MA 02301.

> Location note: this repository already holds an unrelated Astro site (ICS). The Meridian app lives in
> `meridian/` as a self-contained pnpm project so the existing site is untouched. See DECISIONS.md D-001.

---

## 1. Folder tree (target, all phases)

```
meridian/
├── CLAUDE.md  PLAN.md  DECISIONS.md  TODO.md  SECURITY.md  README.md
├── messages/                 # next-intl catalogs; en is source of truth
│   ├── en.json  ht.json  pt.json  kea.json  es.json   # each has a "$review" map (key → reviewed?)
├── content/                  # (Phase 2+) long-form practice/legal pages per locale, MDX
├── public/
│   ├── sw.js                 # service worker: precache /{locale}/emergency for offline
│   └── icons/
├── scripts/
│   ├── check-banned-phrases.mjs   # fails lint/build on banned marketing claims
│   └── check-i18n.mjs             # key parity + $review completeness
├── src/
│   ├── proxy.ts              # Next 16 proxy (ex-middleware): locale detection, chooser gate, cookie
│   ├── i18n/                 # routing.ts, request.ts, navigation.ts, locales.ts (config-only add)
│   ├── config/               # site.ts (office, attorney, TODO_ placeholders), flags.ts
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx    # html lang/dir, fonts, header, footer, sticky bar
│   │   │   ├── page.tsx      # home: hero + 6 crisis tiles
│   │   │   ├── emergency/    # detained or arrested guide (offline-cached)
│   │   │   ├── choose-language/
│   │   │   ├── help/[area]/  # practice areas (Phase 2 content)
│   │   │   ├── about/  contact/  privacy/  disclaimer/  accessibility/
│   │   │   ├── not-found.tsx error.tsx
│   │   ├── manifest.ts robots.ts sitemap.ts global-error.tsx
│   │   └── api/              # (Phase 3+) intake, stripe webhook, cron
│   ├── components/           # Header, Footer, EmergencyButton, MobileActionBar, Disclaimer,
│   │                         # AttorneyLine, LanguageSwitcher, ListenButton, Logo, Tile, TrustNote
│   ├── lib/                  # format.ts, banned.ts, sms/ (adapter), supabase/ (server-only)
│   └── styles/globals.css    # Tailwind v4 @theme tokens
├── supabase/migrations/      # (Phase 3+) SQL + RLS
├── tests/unit/               # Vitest
├── e2e/                      # Playwright + axe
└── docs/screenshots/phase-N/
```

## 2. Data model + RLS summary (Supabase; built Phase 3–5)

Principle: **collect the minimum.** There are no fields for A-numbers, SSNs, immigration status, criminal history
narrative, or passport numbers. Free text is capped and the form warns against confidential details. RLS is on
for every table. The `anon` role may only INSERT through server routes that use a scoped RPC. It never gets SELECT.
The service-role key exists only in server code (`server-only` import guard).

| Table | Purpose | Key columns | RLS |
|---|---|---|---|
| `intakes` | Triage wizard submissions | id, locale, urgency (enum), area (enum), first_name, contact_pref, phone_e164, email, short_note (≤500), converted_at, created_at | staff SELECT/UPDATE; insert via `submit_intake()` SECURITY DEFINER RPC; no DELETE except retention cron |
| `bookings` | Consultations | id, intake_id, slot_at, kind (free/paid), stripe_session_id, status | staff only |
| `payments` | Stripe webhook ledger | id, booking_id, stripe_event_id (unique), amount, status | service role only |
| `reminders` | SMS/email reminders | id, booking_id, channel, send_at, sent_at | service role only; purged 7 days after slot |
| `referrals` | Padilla portal (defense counsel) | id, attorney_name, bar_state, bar_no, client_initials, court, deadline, upload_path | referring attorney sees own rows (auth.uid); staff all |
| `referral_uploads` | Storage objects metadata | id, referral_id, path, expires_at | purged at 30 days |
| `staff` | Staff profiles (magic link) | user_id, role (attorney/paralegal/admin) | self + admin |
| `audit_log` | Append-only | id, actor, action, entity, entity_id, at, meta | INSERT only (trigger blocks UPDATE/DELETE); staff SELECT |
| `cms_pages`, `cms_versions` | Content with approval | page_key, locale, body, status (draft/approved), approved_by | staff; publish requires attorney role |
| `legal_process_requests` | Gov't requests log | id, received_at, agency, routed_to_attorney_at, notes | attorney/admin only |

Retention (Vercel Cron → `/api/cron/retention`, bearer secret): unconverted intakes 90 days, referral uploads
30 days, reminders 7 days after the appointment date. Each run writes an audit row.

## 3. i18n strategy

- `next-intl` with `/[locale]` prefix always. Locales are listed **in priority order**: `ht, pt, kea, es, en`.
  They live in `src/i18n/locales.ts`, the one config file. Adding `zh` or `vi` means a config entry plus a message file.
- **Fallback chain** per locale (`kea → pt`, never `en`; others → `en`) is resolved by deep-merging catalogs in
  `i18n/request.ts`.
- **First visit:** `/` with no `NEXT_LOCALE` cookie shows a full-screen chooser. Language names appear in
  their own language, with no flags. The chooser also has a direct Call button, so the emergency path is never
  blocked. Choosing sets the cookie for one year. Deep links (`/ht/emergency`) skip the chooser.
- **Legal content is never shown machine-translated alone.** Each catalog has a `$review` map. Legal namespaces
  (`Disclaimer`, `Emergency`, `Privacy`, `Terms`) render the English source with an "English only for now"
  banner (written in the user's language) until every key in that namespace is marked reviewed. The global
  disclaimer shows the drafted translation and the English original together until it is reviewed.
- `hreflang` alternates on every page, `x-default` → `/`. Dates go through `lib/format.ts` (explicit Intl locale map).
- Fonts: Lora + Inter, `latin` + `latin-ext`, self-hosted via `next/font` (covers ò è ã ç ñ).

## 4. Phase checklist

Gate for **every** phase: `pnpm typecheck && pnpm lint && pnpm test && pnpm build` • Playwright e2e green • axe
reports 0 serious/critical • screenshots at 360px and 1280px in `docs/screenshots/phase-N/`.

### Phase 1 — Foundation
- [ ] Scaffold Next 16.4 / React 19 / TS strict / pnpm in `meridian/`
- [ ] Tailwind v4 tokens (brand colors, type scale, ≥18px body)
- [ ] Layout: header (logo, ≤6 nav, language switcher, **Detained or Arrested?** button), footer (attorney,
      office, disclaimer), sticky mobile bar (Call + Emergency guide)
- [ ] i18n: next-intl, 5 locales, kea→pt fallback, chooser, cookie, hreflang, `$review` flags
- [ ] Core pages: home (6 tiles), emergency, about, contact, privacy, disclaimer, accessibility, 404/error
- [ ] Listen-to-this-page (speech synthesis), PWA manifest + SW caching `/emergency`
- [ ] Guards: banned-phrase check, i18n parity check
- [ ] CI workflow (path-filtered to `meridian/`)
- [ ] CLAUDE.md, DECISIONS.md, TODO.md, SECURITY.md
- [ ] Gate + screenshots

### Phase 2 — Practice content + structured data + SEO
Practice area pages (depth ≤ 2), `LegalService`/`Attorney`/`FAQPage` JSON-LD, sitemap with alternates,
Pagefind per-locale search with a typo-synonym list, OG images, print CSS for the wallet card.

### Phase 3 — Conversion
Intake wizard with triage (emergency → call now), RHF + Zod shared schemas, Turnstile + honeypot + rate limit,
Supabase schema + RLS, booking, Stripe Checkout + webhook (idempotent), Resend email, SMS adapter (Twilio + no-op).

### Phase 4 — Professional channel
Padilla portal for defense counsel (magic link), admin inbox, SLA timers with visual escalation, append-only audit log.

### Phase 5 — Trust & retention
CMS with attorney approval + versioning, family preparedness packet, Roots checklist (print CSS), reviewed-translation workflow.

### Phase 6 — Hardening
CSP/security headers, retention crons + tests, encryption review, Sentry PII scrubbing, Lighthouse/axe passes,
optional assistant (`FEATURE_ASSISTANT`) with retrieval over reviewed content only and an adversarial test suite.
