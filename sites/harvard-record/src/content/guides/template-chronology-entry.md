---
title: "Template: chronology entry"
description: "A fill-in record for one dated event in a document-based timeline, separating event, document and release dates, with notes on precision and three worked examples."
audience: "Researchers"
series: "Templates"
order: 100
---

A chronology is a list of dated events, each tied to a document. This template is the record for one
event. The method, including how to handle uncertain dates and why sequence does not show cause, is
covered in the guide on building a chronology in the Research methods series under `/guides/`.

The most important feature of the template is that it keeps three dates apart: when the event
happened, when the document recording it was created, and when that document became public.

## The template

```text
CHRONOLOGY ENTRY

Entry ID:           [e.g. T-031; never reused]

DATE
Event date:         [YYYY-MM-DD, or YYYY-MM, or YYYY]
Date precision:     [exact day / month only / year only / season /
                     on or before / on or after / between (date) and
                     (date) / approximate]
Basis for date:     [stated in the document / document's own date /
                     inferred from (explain)]
Time and zone:      [only if the hour matters; otherwise leave blank]

EVENT
What happened:      [one plain sentence in the past tense, at the level
                     of certainty the document supports]
Kind of event:      [proposal or statement / act / official finding or
                     decision / filing of an allegation / publication
                     or release]
Evidence state:     [stated intent / documented activity / verified
                     implementation]
People and bodies:  [who acted and in what capacity: author, recipient,
                     copied, mentioned]
Place:              [if stated and relevant]

SOURCE
Source:             [Source ID from the source log, with page,
                     paragraph or docket entry]
Document date:      [date the record was written, signed or filed]
Made public:        [date the record was released or published, and by
                     whom]
Grade:              [A1 / A2 / B1 / B2]
Passage:            [short exact quotation that supports the entry]
Other sources:      [Source IDs that record the same event]

CHECKS
Conflicts:          [Entry IDs or Source IDs giving a different date or
                     account; how handled]
Linked entries:     [Entry IDs for directly related events, with the
                     source that connects them; or "none documented"]
Linked claims:      [Claim IDs from the claim ledger]
Date checked:       [YYYY-MM-DD the source was opened and compared; or
                     "pending check"]
Notes:              [anything a later reader needs]
```

## Worked examples

These use invented, generic facts.

```text
Entry ID:        T-001
Event date:      [YYYY-MM-DD]
Date precision:  exact day
Basis for date:  document's own date (email header)
What happened:   The donor emailed the center's director offering to
                 support the center's work.
Kind of event:   proposal or statement
Evidence state:  stated intent
Source:          S-004, exhibit 12, page 3
Document date:   same as event date
Made public:     [YYYY-MM-DD], filed as a court exhibit
Linked entries:  none documented

Entry ID:        T-002
Event date:      [YYYY]
Date precision:  year only
Basis for date:  stated in the document (fiscal year table)
What happened:   The university recorded a gift from the donor to the
                 center.
Kind of event:   act
Evidence state:  documented activity
Source:          S-001, page 14
Document date:   [YYYY-MM-DD], date of the report
Made public:     same as document date
Linked entries:  T-001; S-001 page 13 describes the gift as following
                 the donor's offer

Entry ID:        T-003
Event date:      [YYYY-MM-DD]
Date precision:  exact day
What happened:   A complaint was filed alleging that the center
                 gave the donor office space.
Kind of event:   filing of an allegation
Evidence state:  stated intent
Source:          S-007, paragraphs 40 to 42
Notes:           The entry records the filing. The alleged conduct is
                 not entered as an event.
```

## Notes on the fields

Event date and precision. Record only what the document supports. If it gives a month, enter the
month and set the precision to "month only". Do not supply a day in order to make the entry sort
neatly. For sorting, place a partial date at the start of its period and rely on the precision field
to flag it.

Basis for date. Say how you know. A date printed on a letter, a date mentioned inside it, and a date
you worked out from "last Tuesday" are different kinds of knowledge. Explain any inference in full.

What happened. One event per entry. Use a verb that matches the record: "proposed", "wrote", "paid",
"signed", "filed", "found". Avoid "was involved in" and similar phrases that describe no act.

Kind of event and evidence state. These keep proposals, acts and findings distinct. An offer and the
later receipt of money are two entries. If you have a document for only one, there is only one
entry, and the gap is itself informative.

In the third example, the filing of an allegation is treated as a statement by the party who filed
it, which is why it is recorded at stated intent. The definitions at `/methodology/` describe that
state as covering what was proposed, pitched or said.

People and bodies. Record each person's capacity. Being copied on a message or mentioned in it is
not the same as writing it.

Document date and made public. Readers often assume a record became known when it was written.
Recording the release date lets you say accurately what was publicly known at a given time.

Linked entries. Link two entries only when a source connects them, and cite that source in the
field. Closeness in time is not a link. If no source connects them, write "none documented". This
field is the main guard against a chronology turning into an unsupported story.

Conflicts. When sources give different dates, do not choose silently. Create the entry with the
better-supported date, record the other date and its source here, and state the conflict wherever
the entry is used.

## Adapting the template

- For email threads, make one entry per distinct message, not per copy, and note the page identifier
  of the fullest version of the thread.
- For court cases, a separate docket-style list of filings can sit beside the main chronology, with
  only the significant filings and rulings carried across.
- For long periods with few records, add a scope note to the chronology stating which document sets
  it draws on, so that empty stretches are not read as periods when nothing happened.