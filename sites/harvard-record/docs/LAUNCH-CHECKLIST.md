# Launch checklist

Work down this list in order. Each item is either done or not. The site should not be public until section 1
to 4 are complete.

## 1. Verification

- [ ] `npm run audit -- --strict` exits cleanly: no source or claim is pending, none is unused.
- [ ] Every source worksheet in `docs/verification/` has been worked through against the original.
- [ ] Every figure on the home page and in the "figures" strips has been read from the primary document.
- [ ] The three reported URLs for Harvard's 2020 report have been tried and the live one is in the register.
- [ ] MIT's report is linked as the PDF, not only the press release.
- [ ] The open points in the README's "Known gaps" are each resolved or the affected sentence removed.
- [ ] Every quotation has been compared, character by character, with the source.
- [ ] `npm run check:links` has been run from a machine with open network access.

## 2. People

- [ ] Every person in `src/data/named.ts` has been checked against their entry's ledger claims.
- [ ] Every finding has its denial or response beside it where one exists in public.
- [ ] Jorge Domínguez's own public response has been added from the cited reporting.
- [ ] Roland Fryer's entry uses the wording of the Dean's letter.
- [ ] People named only as recipients carry the explicit safeguard wording on the page and in the index.
- [ ] No complainant is named or identifiable anywhere.
- [ ] Each named living person has been sent a right-of-reply invitation, or a decision not to has been
      recorded with the reason. A template is in the guides.

## 3. Legal review

- [ ] A media lawyer has read every page under `/program-for-evolutionary-dynamics/`,
      `/harvard-medical-school/`, `/donor-pathways/`, `/dna-genetics/`, `/campus-safety/`, `/named/`
      and `/ledger/`.
- [ ] The lawyer has advised on the domain name and on use of the institution's name in the site title.
- [ ] The disclaimer wording in `src/config.ts` has been approved.
- [ ] The publisher is a named person or entity, with a postal or registered address if advised.

## 4. Identity and separation

- [ ] `publisher` and `correctionsEmail` in `src/config.ts` are real, and the mailbox is monitored.
- [ ] The domain decision is made. If the site launches on a domain containing the institution's name, the
      risk has been accepted knowingly and in writing.
- [ ] No shield, seal, crimson color, or institutional typeface appears anywhere.
- [ ] The non-affiliation notice is the first thing on every page (verified by `npm run check`).
- [ ] The site title does not read as an official alumni body.

## 5. Technical

- [ ] `npm run check` passes.
- [ ] `npm run smoke -- --all` passes.
- [ ] The site has been read on a real phone.
- [ ] The site has been navigated with the keyboard only, and with a screen reader on at least two pages.
- [ ] `astro.config.mjs` and `src/config.ts` carry the final domain.
- [ ] Security headers in `vercel.json` are active on the deployed site.
- [ ] `robots.txt` and the sitemap point at the final domain.
- [ ] The 404 page works on the host.
- [ ] The update feed validates.

## 6. On the day

- [ ] `src/data/updates.ts` has an `Edition` entry dated today that no longer says entries are pending.
- [ ] The "Status of this edition" section on the home page and the "First edition" note in the methodology
      have been rewritten to match the true state.
- [ ] Every page's `reviewed` date reflects the day it was actually re-read.
- [ ] A copy of the built site and of every cited document has been archived privately.

## 7. Afterwards

- [ ] Corrections mailbox checked daily for the first month.
- [ ] `npm run check:links` monthly. Dead links get an archived copy or a new address.
- [ ] When Harvard's second review reports, or an investigation concludes, the affected pages, ledger rows
      and named-index entries are updated together and logged.
