# Harvard Public Record Project

Source for the site intended for `www.harvarduniversityalumni.com`: an independent, public-source review of
donor influence and institutional access at Harvard University. **Not affiliated with Harvard University.**

This folder is a self-contained [Astro](https://astro.build) project. It shares nothing with the ICS website in
the repository root.

```bash
cd sites/harvard-record
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

To deploy on Vercel, create a separate project and set its **Root Directory** to `sites/harvard-record`.

## Before launch

Nothing here should go live until these are done.

- [ ] **Check every source.** The research for this edition could only reach published summaries of the
      sources, not the original pages. Open each entry in `src/data/sources.ts`, confirm the facts cited to it,
      correct the text where needed, and set `checked: 'YYYY-MM-DD'`. Until then the site labels the entry
      "pending check". Priority order: anything about a named living person.
- [ ] **Have a media lawyer read it.** The site names living people. The text keeps to attributed findings and
      includes denials, but that is not a substitute for legal review.
- [ ] **Consider the domain.** `harvarduniversityalumni.com` reads like an official alumni site. Harvard
      enforces its trademarks, and a domain dispute is a real possibility whatever the disclaimers say. A neutral
      domain would remove that risk.
- [ ] Set the publisher name and corrections mailbox in `src/config.ts` (both marked `TODO`).
- [ ] Resolve the open points listed under "Known gaps" below.

## Known gaps in this edition

- Report PDF: three URLs for Harvard's 2020 report are indexed; confirm which is live.
- MIT: confirm the direct URL of the Goodwin Procter report PDF and the $60,000 personal gift details.
- Jorge Domínguez: add his own public response from the cited reporting.
- Roland Fryer: confirm the wording of the findings from the Dean's letter.
- Harvard College federal investigation (opened 2014): no public resolution located.
- Clery counts are deliberately not printed; add them from the police department's tables once read.
- 23andMe bulk order: sources differ on the number of kits and on what finally happened to them.
- Southern Trust: the "DNA" wording of the 2012 hearing was found only on unofficial mirrors and is not used.
- Status of Harvard's 2026 review and of Professor Nowak's second leave after June 2026.

## Where it departs from the baseline document

The site was populated from the research baseline, then corrected where public sources say otherwise.

| Baseline | Site |
|---|---|
| Program total "~$9.1–9.2M"; table lists it as post-conviction funding | $9.1M is all of Harvard, 1998–2008. $6.5M went to the Program. Harvard accepted nothing after 2008. |
| Leon Black "~$7–7.5M to PED" | About $7M from Black, inside $7.5M from all introduced donors. |
| Black's Kennedy School fellowship as part of the pathway | The fellowship gift is real (2018) but no public record ties it to Epstein. Stated as such. |
| HMS "listed him as a $75 million active prospect" | A donor *capacity rating*, per one outlet. Not a pledge or solicitation. |
| Thakuria placed at Harvard Medical School | He was a Massachusetts General Hospital physician, not a Harvard employee. |
| Nowak "went on leave in 2021" | Leave began May 2020; sanctions and closure March 2021; lifted 2023; second leave February 2026. |
| Reviews "found no research misconduct" | No such finding located either way. Removed. |
| Repository produced "215–229 children" | About 215 (Plotz). |
| Bulk kit order "canceled" | Cancelled by the company; correspondence says kits were flown out anyway. |

## How it is organised

| Path | What it holds |
|---|---|
| `src/config.ts` | Site name, domain, disclaimer text, navigation. |
| `src/data/sources.ts` | The source register: every citation, with grade and verification date. |
| `src/data/claims.ts` | The claim ledger: one row per factual claim, with state, grade, sources and caveats. |
| `src/data/named.ts` | Index of people and bodies named, with what the record does and does not say. |
| `src/data/timelines.ts`, `comparison.ts` | Timeline events and the cross-institutional table. |
| `src/data/faq.ts`, `updates.ts` | Questions and answers; the public update log. |
| `src/content/glossary/` | Glossary terms, one Markdown file each. |
| `src/content/law/` | Law explainers. |
| `src/content/guides/` | Guides and templates, in four series. |
| `src/pages/` | One file per page; folders for generated sections. |
| `src/layouts/Base.astro` | Page shell. Numbers citations and builds each page's reference list. |
| `src/lib/` | Citation processing and data export, unit-tested. |
| `scripts/` | Audit, built-site checker, link checker, browser smoke test, worksheet generator. |
| `tests/` | Unit tests, data-integrity tests and the editorial lint. |
| `docs/` | Maintainer manual, style guide, launch checklist, writer's brief, verification worksheets, progress reports. |

## Working on it

Read `docs/MAINTAINING.md` first. In short:

```bash
npm test          # unit tests, data integrity, editorial lint
npm run check     # tests + build + every internal link and anchor
npm run smoke     # headless browser pass at phone and desktop widths
npm run audit     # verification status and which sources to check first
```

**Cite something.** Add the source to `sources.ts`, then write `<Cite id="the-id" />` after the sentence (or
`[@the-id]` in Markdown). Numbering and the reference list are generated. An unknown id fails the build.

**Record the claim.** Add a row to `claims.ts`. The tests reject a claim graded above its best source, an
absence without a caveat, or an allegation marked as verified.

**Check a source.** Open its worksheet in `docs/verification/`, read the original, then set `checked`.

**After any edit.** Change the page's `reviewed` date and add a line to `updates.ts`.

Style rules are in `docs/STYLE.md`. The steps before going public are in `docs/LAUNCH-CHECKLIST.md`.
