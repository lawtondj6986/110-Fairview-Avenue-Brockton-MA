---
title: "Template: claim ledger row"
description: "A fill-in row for one factual claim, recording its exact wording, evidence state, source grade, source and date checked, with notes and three worked examples."
audience: "Researchers"
series: "Templates"
order: 90
---

A claim ledger holds one row for each factual claim in your work. The row ties the published wording
to a specific passage in a specific source and records how strong the support is. The method is
described in the guide on keeping a claim ledger in the Research methods series under `/guides/`.
This page provides the row itself.

Two values are recorded separately for each claim. The evidence state says how far the record goes:
stated intent, documented activity, verified implementation, or nothing on record. The grade says
what kind of source supports it: A1, A2, B1 or B2. Both are defined at `/methodology/`.

## The template

Core fields, which every row should have:

```text
CLAIM LEDGER ROW

Claim ID:        [e.g. C-014; never reused]
Wording:         [the claim exactly as published or as drafted, as one
                  plain sentence]
State:           [stated intent / documented activity / verified
                  implementation / nothing on record]
Grade:           [A1 / A2 / B1 / B2]
Source:          [Source ID from the source log, plus page, paragraph
                  or docket entry]
Date checked:    [YYYY-MM-DD on which the source was opened and compared
                  with the wording; or "pending check"]
```

Extended fields, which are recommended:

```text
Source passage:  [short exact quotation from the source that supports
                  the wording]
Reason for state:[one line: what in the passage shows intent, an act, or
                  a confirmed result]
Reason for grade:[one line]
Other sources:   [Source IDs that also support the claim, with
                  pinpoints; note whether independent or derived from
                  the main source]
Names a living
person:          [yes / no; if yes, confirm the grade meets your
                  threshold]
Finding or
allegation:      [finding / allegation / neither; if allegation, the
                  wording must attribute it]
Response on
record:          [denial, statement or "none found as of (date)", with
                  Source ID]
Conflicts:       [Claim IDs or Source IDs that disagree, and how the
                  text handles it]
Appears in:      [pages or sections where the claim is used]
Status:          [draft / published / corrected / withdrawn]
History:         [dated notes of changes to wording, state or grade]
Checked by:      [initials]
```

For a spreadsheet, use the same fields as column headings:

```text
ID | Wording | State | Grade | Source and pinpoint | Date checked |
Passage | Living person? | Finding or allegation | Response |
Conflicts | Appears in | Status | History
```

## Worked examples

These use invented, generic facts to show how rows differ.

```text
Claim ID:      C-001
Wording:       The donor proposed a gift to the center in an email to
               its director.
State:         stated intent
Grade:         A1
Source:        S-004, exhibit 12, page 3
Date checked:  [YYYY-MM-DD]
Passage:       "I would be glad to support the center's work next year."
Note:          The email shows an offer. No row may say the gift was
               made on this source alone.

Claim ID:      C-002
Wording:       According to the university's report, the center
               received a gift from the donor in the following year.
State:         documented activity
Grade:         A1
Source:        S-001, page 14
Date checked:  [YYYY-MM-DD]
Note:          The report lists the receipt. It does not say what the
               gift funded.

Claim ID:      C-003
Wording:       We found no public record showing how the gift was
               spent.
State:         nothing on record
Grade:         not applicable
Source:        Search of S-001 (full text and appendices) and S-002 for
               the gift, on [YYYY-MM-DD]
Date checked:  [YYYY-MM-DD]
Note:          Recheck when new documents are released.
```

## Notes on filling it in

Wording comes first and must be exact. Paste the sentence as it appears in the text. If the sentence
holds two facts, split it into two rows. When the published sentence is later edited, edit the row
in the same sitting.

Compare verbs. Put the wording and the source passage side by side. If the passage says "discussed"
and the wording says "agreed", the wording is wrong, whatever the grade.

Assign the state from the passage. Ask what the most advanced thing is that this passage shows
directly: that something was said, that something was done, or that an official finding or
independent result confirms the act and its result. Large numbers of documents about a plan do not
turn it into an act.

Assign the grade from the kind of source. Where a claim depends on more than one source, the weakest
essential source governs. Where a strong source relays a weaker account, the weaker grade applies to
that account.

Rows for absences. A statement that you found no record is a claim. Its "source" is the scope of
your search: where you looked, for what, and when. Grade does not apply in the usual way, so write
"not applicable" and describe the search.

Rows that name people. Decide your minimum grade in advance. This site requires A1 or A2 for factual
claims about named living people. Fill in the finding-or-allegation field and the response field
every time. If the response field is empty, look for a response before publishing.

Date checked. Enter a date only when you have personally opened the source. If you worked from a
summary, write "pending check". That label should then carry through to the published text.

## Maintaining rows

- Never delete a row. Change its status to corrected or withdrawn and record the date and reason in
  the history field.
- When a new source changes a claim's state or grade, add a dated note and update every place the
  claim appears.
- Review all B2 rows and all "pending check" rows before each publication.
- Recheck absence rows often. They are the claims most likely to be overtaken by a new release.

## Adapting the template

A small project can run on the six core fields alone. Add the extended fields as soon as your work
names people or reports allegations. If several people share a ledger, keep the "checked by" field
and agree that nobody marks their own drafting as checked without opening the source again.
