# Maintaining the site

This is the working manual. It covers the routine jobs: checking a source, adding a claim, handling a
correction, adding reference content, and what to run before publishing.

## The rule that governs everything

A sentence about a named living person may appear on the site only if all of these are true:

1. It is supported by a source graded A1 or A2 in `src/data/sources.ts`.
2. A maintainer has opened that source and read the passage (`checked` is set on the source).
3. The sentence says no more than the source says, and attributes findings to whoever made them.
4. Any denial or response the person has made in public is included.
5. The claim is in the ledger (`src/data/claims.ts`) with its evidence state and caveats.

If any of the five fails, the sentence comes out until it passes.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local preview with live reload. |
| `npm test` | Unit tests, data integrity checks and the editorial lint. No build needed. Fast. |
| `npm run build` | Builds the static site into `dist/`. Fails on an unknown citation id or invalid frontmatter. |
| `npm run check` | Tests, build, then checks every internal link and anchor in the built site. Run before every push. |
| `npm run smoke` | Opens the built site in a headless browser at phone and desktop widths. Run after layout changes. |
| `npm run audit` | Prints verification status, coverage and the order in which to check sources. |
| `npm run check:links` | Requests every external URL. Needs open network access. |
| `node scripts/worksheets.mjs` | Regenerates the per-source verification worksheets in `docs/verification/`. |
| `npm run progress` | Lines added since a baseline commit, for the daily report. |

## Checking a source

This is the most important job before launch and after any new document appears.

1. Run `npm run audit` and take the next source from "Check these sources first".
2. Open its worksheet in `docs/verification/`. It lists every claim that rests on the source and every
   sentence on the site that cites it.
3. Open the original document from the URL in the register. Use the publisher's own copy. If the link is
   dead, find the publisher's current address or an archived snapshot and update `url`.
4. For each claim and sentence on the worksheet, find the passage in the document. Then one of:
   - It matches. Move on.
   - The document says something narrower or different. Rewrite the sentence and the ledger row to match.
   - The document does not say it. Remove the sentence, or re-attribute it to a source that does.
5. Note figures exactly as the document gives them, with the period they cover.
6. When every item is confirmed, set `checked: 'YYYY-MM-DD'` on the source.
7. When every source behind a ledger claim is checked, set `checked` on the claim.
8. Add a line to `src/data/updates.ts` if any wording changed. Run `npm run check`.

`npm run audit` flags a claim marked checked while one of its sources is not.

## Adding a new source

1. Choose an id: `publisher-year-topic`, lowercase with hyphens.
2. Add the entry to `src/data/sources.ts`. Grade it using `/methodology/`. A complaint, indictment or
   oversight letter is A1 for what it says, and its `note` must state that its assertions are not findings.
3. Do not add unofficial mirrors, wikis, forums or newsletters. The data tests reject known ones. Use them
   to find the document, then cite the document or established reporting on it.
4. Cite it from a page with `<Cite id="..." />`. A source that nothing cites fails the tests.

## Adding or changing a claim

1. Write the sentence in the page, with its citation.
2. Add a row to `src/data/claims.ts`: the claim as one full sentence, its `state`, the `grade` of the
   strongest source that directly supports it, the `sources`, and any `caveat`.
3. Choose the state conservatively:
   - `intent`: proposed, pitched, said or alleged.
   - `activity`: a record shows it was done.
   - `verified`: an official finding or independent result confirms it.
   - `none`: a statement that no record was found. Always give a caveat.
4. If the claim names a person not already in `src/data/named.ts`, add an entry there.

The tests enforce: unique ids, known sources, a grade no higher than the best source, a caveat on every
absence and every B2 claim, and no `verified` state on a claim that rests only on allegations.

## Handling a correction request

1. Acknowledge it. Requests from people named on the site come first.
2. Check the passage against its source, as in "Checking a source".
3. If the site is wrong: fix the page, the ledger row and the named-index entry together. Add a `Correction`
   line to `src/data/updates.ts` that says what was wrong and what it now says.
4. If the site is right but incomplete: add the missing context or the person's response.
5. If the person wants to respond: add the response to the passage and to their named-index entry.
6. If the material cannot be supported at A2 or above: remove it and log the removal.
7. Do not name the person who asked, unless they want to be named.

## Adding reference content

Glossary terms, law explainers and guides are Markdown files in `src/content/`. Follow
`docs/CONTENT-BRIEF.md`. The editorial lint (`tests/content.test.mjs`) rejects a file that names a person or
body from the site's subject matter, names a specific university, uses an em dash, or falls outside the
length range. Reference content is general by design: it explains how things usually work so that the record
pages do not have to.

## Updating a page's review date

Each page passes `reviewed="YYYY-MM-DD"` to the layout. Change it only when someone has actually re-read the
page against its sources. It is a statement to the reader, not a build timestamp.

## What not to do

- Do not publish a figure from memory or from a search-result summary.
- Do not connect two facts in a sentence unless a source connects them.
- Do not describe an allegation as a finding, or a proposal as an act.
- Do not add analytics, cookies, embedded third-party content or a donation button. The privacy page says
  there are none.
- Do not use Harvard's shield, seal, colors or typefaces, or wording that suggests an official connection.
- Do not delete an entry from the update log.
