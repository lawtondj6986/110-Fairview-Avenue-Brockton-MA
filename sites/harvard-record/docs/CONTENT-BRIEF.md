# Writer's brief for reference content

This site is an independent, carefully sourced public-record reference about donor influence and institutional
access at a university. The reference sections (glossary, law explainers, guides) exist to help a reader
understand the record. They must be accurate, neutral and useful on their own.

## Hard rules

1. **No claims about named individuals.** Do not name any living person. Do not describe any specific case,
   scandal or allegation. This content is general reference only.
2. **No institution-specific facts.** Do not state facts about Harvard, MIT or any named university beyond
   what is true of universities generally. You may point the reader to this site's pages by path
   (`/methodology/`, `/program-for-evolutionary-dynamics/`, `/harvard-medical-school/`, `/donor-pathways/`,
   `/dna-genetics/`, `/campus-safety/`, `/comparison/`, `/sources/`, `/glossary/`, `/law/`, `/guides/`).
3. **Only write what you are confident is correct.** Prefer well-established, stable facts. Do not invent
   statistics, dollar thresholds, dates, section numbers or quotations. If a rule has changed recently or varies
   by state, say so and tell the reader to check the current text. Never guess a number.
4. **Not legal or medical advice.** Explain; do not advise on an individual situation.
5. **Links:** include a URL only if it is a stable, canonical official address you are confident exists
   (for example a law.cornell.edu U.S. Code page, ecfr.gov, an agency's main topic page). When unsure, omit it.
6. **Tone:** plain, calm, precise. Write for an intelligent reader who is not a lawyer or scientist. Define a
   term the first time it appears. Short sentences. No hype, no rhetorical questions, no moralising.
7. **Style:** American English. No em dashes; use commas, periods or parentheses. No bold for emphasis in
   running text. Sentence-case headings. Hard-wrap lines at about 100 characters.
8. **No padding.** Every sentence should tell the reader something. Length targets are ceilings as much as floors.

## File mechanics

- One Markdown file per entry, named by slug: lowercase, hyphens, `.md` (for example `clery-act.md`).
- YAML frontmatter exactly as specified for the collection. Quote any string containing a colon.
- Body in Markdown. Use `##` for sections (never `#`). Do not repeat the title as a heading.
- Do not run builds, do not touch git, do not edit files outside your assigned folder.
- Before finishing, list the folder and make sure no slug you were assigned is missing and none is duplicated.

## Glossary entry (`src/content/glossary/<slug>.md`)

```yaml
---
term: "Clery Act"
short: "One plain sentence, 240 characters at most, that defines the term."
category: "Campus safety"   # exactly one of the eight categories below
aliases: ["Jeanne Clery Act"]          # optional
related: ["annual-security-report"]    # optional: slugs of other glossary terms
links:                                  # optional
  - label: "20 U.S.C. § 1092(f)"
    url: "https://www.law.cornell.edu/uscode/text/20/1092"
---
```

Categories: `Law and compliance`, `Campus safety`, `Fundraising and development`, `University governance`,
`Genetics and biomedical research`, `Research ethics`, `Records and sourcing`, `Legal procedure`.

Body: 130 to 220 words in two to four paragraphs. First paragraph expands the definition. Then how it works in
practice. End with what the term does not mean or a common confusion, where there is one.

## Law explainer (`src/content/law/<slug>.md`)

```yaml
---
title: "Title IX of the Education Amendments of 1972"
citation: "20 U.S.C. § 1681 et seq."
short: "Two sentences at most, 280 characters at most."
jurisdiction: "Federal"        # Federal | Massachusetts | Other
enforcedBy: "U.S. Department of Education, Office for Civil Rights"
links:
  - label: "Statute text"
    url: "https://www.law.cornell.edu/uscode/text/20/1681"
---
```

Body: 550 to 850 words, with these sections in this order: `## What it does`, `## Who it covers`,
`## What it does not do`, `## How it is enforced`, `## Common misreadings`, `## Where to read it`.

## Guide (`src/content/guides/<slug>.md`)

```yaml
---
title: "How to read a campus security report"
description: "One or two sentences, 280 characters at most."
audience: "Prospective students"   # Prospective students | Students | Alumni | Researchers | Everyone
series: "Reading documents"        # Evaluating an institution | Reading documents | Research methods | Templates
order: 10
---
```

Body: 650 to 1,000 words with `##` sections. Be concrete: steps, questions to ask, what to look for, what a
document can and cannot tell you. Templates contain the template text in a fenced code block plus short notes
on how to adapt it.
