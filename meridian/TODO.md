# TODO — facts and approvals the firm must supply

The site runs with these placeholders. **Do not launch** until every `TODO_` is resolved.
Find them with `grep -rn "TODO_" src`.

## Firm facts (`src/config/site.ts`)
| Placeholder | What we need | Owner |
|---|---|---|
| `TODO_PHONE` / `TODO_PHONE_E164` | Main office number (display format plus `+1XXXXXXXXXX`) | Firm |
| `TODO_EMERGENCY_PHONE` / `_E164` | Emergency or after-hours line, and whether it is answered 24/7 | Firm |
| `TODO_EMAIL` | Public intake email address | Firm |
| `TODO_HOURS` | Office hours (per day) | Firm |
| `TODO_BAR_NUMBER` | Attorney Lawton's BBO number (if it should be displayed) | Attorney Lawton |
| `TODO_ATTORNEY_PHOTO` | Portrait of Attorney Lawton (About page shows initials until then) | Firm |
| `TODO_ATTORNEY_BIO` | Bar admissions, education, and the languages he speaks. Nothing is published until supplied. | Attorney Lawton |
| `TODO_LANGUAGES_SPOKEN` | Which languages staff actually speak on the phone. The site only claims its own translations. | Firm |
| `TODO_FEES` | Consultation fees (Phase 3 paid consultations) | Firm |
| `TODO_STAFF` | Any other staff names or photos | Firm |

## Content
- [ ] **Original brief sections 6–15 and the English Content Seed were not included in the v2.1 brief.** Phase 1 uses
      drafted plain-language English (see D-021). Paste the original seed and it will replace the drafts verbatim.
- [ ] Attorney review of all English legal text: `Disclaimer`, `Emergency`, `Privacy`, `Areas` in `messages/en.json`.
- [ ] Confirm "Attorney advertising" footer wording against MA RPC 7.1–7.3 (D-031).

## Translation review (every key in `messages/{ht,pt,kea,es}.json` is `"$review": false`)
A qualified human reviewer flips keys to `true`. A legal namespace switches from "English only for now" to the
translation only when *all* of its keys are reviewed. Open questions from the drafters:
- **ht:** "Arete oswa nan detansyon?" vs. a more everyday "Yo fèmen ou?" for the emergency button. "Piblisite avoka" for
  "Attorney advertising". The A-number gloss ("nimewo dosye imigrasyon") is descriptive, not official. "avoka jeran"
  for managing attorney.
- **pt:** managing attorney = "advogado-chefe" (alternatives: "advogado responsável"). "Ele não segue você" for "does not
  track you" is loose. "Publicidade de advogado". Masculine defaults ("Detido", "Fique calmo") may need neutral wording.
- **es:** "Green card (residencia)" gloss. "Aviso legal" for Disclaimer. "abogado principal" for managing attorney.
  "corte" vs "tribunal" de inmigración. "orden firmada por un juez" for warrant signed by a judge (legal wording).
- **kea:** Written in ALUPEC, Santiago (Badiu) variety. Needs a native Brockton reviewer.

## Launch blockers (tracked for later phases)
- [ ] Add a `pnpm launch-check` that fails if any `TODO_` remains in `src/config` (Phase 6).
- [ ] Vercel project for `meridian/` (Root Directory = `meridian`) and the domain MeridianImmigrationGroup.com.
- [ ] Decide on a dedicated repository (D-001).
