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
| `src/data/timelines.ts` | Timeline events for the Program and the medical school. |
| `src/data/comparison.ts` | The cross-institutional table. |
| `src/data/updates.ts` | The public update log. |
| `src/pages/*.astro` | One file per page. Prose is edited directly. |
| `src/layouts/Base.astro` | Page shell. Numbers citations and builds each page's reference list. |

## Updating content

**Cite something.** Add the source to `sources.ts`, then write `<Cite id="the-id" />` after the sentence.
Numbering and the reference list are generated. An unknown id fails the build, so a citation cannot point at nothing.

**Add a timeline event.** Append an object to the array in `timelines.ts` with `kind`
(`funding`, `access`, `response`, `record`), an optional evidence `state`, and its `cites`.

**Mark strength of evidence.** `<Grade g="A1" />` for the source grade; `<State s="intent" />`,
`"activity"` or `"verified"` for the three-state discipline.

**After any edit.** Change the page's `reviewed` date and add a line to `updates.ts`.
