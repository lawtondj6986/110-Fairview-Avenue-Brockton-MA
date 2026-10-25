# DECISIONS

Choices the brief left open. Rule: the safer, simpler, more accessible option, with one line of reasoning each.

| # | Decision | Why |
|---|---|---|
| D-001 | Build in `meridian/` inside this repo, not at the root | The repo already holds the live ICS Astro site. A subfolder can't break it or its Vercel project. Recommend moving to a dedicated repo before launch (`git subtree split -P meridian`). |
| D-002 | Phases are commits on the assigned branch `ccr-e8482526-lq5pgq`, not one branch per phase merged to `main` | This session may push only to its assigned branch, and merging into `main` would mix with the ICS site. Merging needs a human decision. |
| D-003 | "Plan mode" was satisfied by writing PLAN.md before any code | This was an unattended cloud session; interactive plan approval would have stalled it. |
| D-004 | TypeScript 5.9.3, not the newly released 7.x | TS 7 is a new compiler, so tooling compatibility with Next 16.4 is unproven. 5.9 is the stable line. |
| D-005 | ESLint 9 with `eslint-config-next` 16.4.3 | Its React plugin isn't yet verified on ESLint 10. |
| D-006 | Next 16 `proxy.ts` (formerly middleware) runs locale detection | Next 16 renamed middleware. It runs on the Node runtime by default; a static rewrite/redirect is cheap either way. |
| D-007 | `defaultLocale = en` | English is the only reviewed source. It's used only for unmatched requests, because `/` shows the chooser. |
| D-008 | The chooser shows only at `/` with no cookie. Deep links (`/ht/emergency`) skip it | A person arriving from search or a shared link already has a language. Blocking the emergency guide behind a chooser would break the two-tap rule. |
| D-009 | The chooser has its own emergency Call button and attorney line | The emergency path must never be gated, even on first visit. |
| D-010 | The proxy always writes `NEXT_LOCALE` on a full page load of a localized URL | next-intl skips the cookie when the browser language matches. The brief requires the choice to persist. |
| D-011 | Language links are plain `<a>` (full loads), not client navigation | Cookie updates without JS. Works on old browsers. |
| D-012 | `$review` is a flat map inside each `messages/{locale}.json` | Meets "every key flagged reviewed:false" in the same file. The runtime strips it. `check-i18n` keeps it complete. |
| D-013 | Legal namespaces = Disclaimer, Emergency, Privacy, Terms, Areas | Anything describing rights, eligibility, or data handling carries legal meaning. Areas is included to be safe. |
| D-014 | Unreviewed legal page: use the first *reviewed* locale on the chain (kea→pt), else the English source plus a banner in the reader's language | "kea never falls back to en" governs UI strings. "Legal never machine-translated alone" wins for legal text. |
| D-015 | Disclaimer shows the drafted translation and the English original until reviewed | The disclaimer must appear in every locale, and its legal meaning must not depend on an unreviewed draft. |
| D-016 | The call button on an English-only legal page uses the reader's language | The action is UI, not legal content. Grandma must recognize "Rele nou". |
| D-017 | Intl locale map: ht→fr-HT, kea→pt-CV, numeric dates | ICU has no ht/kea data. Numeric dates avoid French or Portuguese month names. |
| D-018 | Fonts self-hosted via `next/font/google` with latin + latin-ext subsets | No visitor request to Google. Covers ò è ã ç ñ. |
| D-019 | Placeholders render visibly (`TODO_PHONE`) and `tel:` links carry the placeholder | Inventing a number could send a family in crisis to a stranger. A launch check must fail if `TODO_` remains (see TODO.md). |
| D-020 | The emergency Call uses `site.emergencyPhone`; other CTAs use `site.phone` | The brief names a separate emergency line. Both are placeholders until supplied. |
| D-021 | Six home tiles: Detained/arrested, Family visas, Green card, Citizenship, Asylum & protection, Immigration court | The original content seed was not included in the v2.1 brief. These cover the most common matters in plain words. Replace them when the seed arrives. |
| D-022 | Top nav has 4 items: Get help, Emergency guide, About us, Contact | Under the cap of 6. Fewer choices for someone in crisis. |
| D-023 | Mobile menu and language menu use `<details>` | They work before or without JS and are keyboard accessible natively. |
| D-024 | Contact map is a plain OpenStreetMap link, with no embed | Zero third-party requests on load, which is safer for privacy and 3G. A click-to-load OSM/Leaflet embed can come later. |
| D-025 | The service worker is hand-written: it precaches `/{locale}/emergency` and the static assets those pages reference. Offline navigations fall back to the same-language emergency guide | No Workbox dependency. Keeps the critical crisis page working offline. |
| D-026 | "Listen to this page" hides itself when no matching voice exists (ht tries ht then fr; kea tries kea then pt) | Reading Creole with an English voice would be confusing. Hiding is better than misleading. |
| D-027 | Banned-phrase check also covers es/pt/ht/kea equivalents and uses Unicode word edges | The same misleading claim must not slip through a translation. `\b` misses accented letters. |
| D-028 | Dependency: `@vercel/analytics` | Cookieless analytics named in the stack. Adds about 1 KB of client JS. |
| D-029 | Dependencies: `@playwright/test` 1.63.0 and `@axe-core/playwright` | Matches the preinstalled Chromium build. axe is required by the phase gate. |
| D-030 | Only the `Error` namespace is sent to the client; client components get strings as props | Keeps the critical-path JS small (about 154 KB measured, under the 200 KB budget). |
| D-031 | The HTML footer label "Attorney advertising" stays in the footer copyright line | A conservative signal under MA RPC 7.x. Wording needs attorney sign-off (TODO.md). |
| D-032 | HSTS, nosniff, DENY framing, and a strict Permissions-Policy are set in `next.config.ts` now. CSP comes in Phase 6 | Cheap and safe now. A nonce-based CSP needs dynamic rendering decisions that belong in hardening. |
| D-033 | CI is a separate workflow scoped to `meridian/**` paths | It leaves the ICS site's existing workflow untouched. |
