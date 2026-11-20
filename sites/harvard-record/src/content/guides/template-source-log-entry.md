---
title: "Template: source log entry"
description: "A fill-in record for one source, capturing what it is, where it came from, its grade, how it was verified and what it is used for, with notes on each field."
audience: "Researchers"
series: "Templates"
order: 80
---

A source log is a register with one entry for every source you rely on. Each entry records what the
source is, where you got it, how reliable a kind of source it is, and when you last checked it.
Claims and chronology entries then point to the source by its identifier, so details are held in one
place and corrected in one place.

Fill in an entry the first time you open a source, while the details are in front of you. This
site's own register is at `/sources/`, and the grades are defined at `/methodology/`.

## The template

```text
SOURCE LOG ENTRY

Source ID:            [short stable identifier, e.g. S-027 or
                       issuer-year-keyword]
Entered by / date:    [initials] / [YYYY-MM-DD]

IDENTIFICATION
Title:                [exact title as it appears on the source]
Type:                 [official report / court filing / statute or
                       regulation / agency record / nonprofit filing /
                       news article / book or scholarship / web page /
                       other]
Author or issuer:     [person, outlet, court, agency or institution]
Date of source:       [YYYY-MM-DD, or as precise as stated; write
                       "undated" if none]
Formal identifier:    [case and docket entry number / legal citation /
                       report number / EIN and form / DOI / none]
Length:               [pages, or duration]

ACCESS
Original address:     [URL on the issuer's own site, or how obtained]
Obtained from:        [official origin / archive / records request /
                       library / other]
Date obtained:        [YYYY-MM-DD]
Archived copy:        [archive URL and capture date]
Local copy:           [file name and folder]
Access limits:        [public / paywalled / in-person only / other]

ASSESSMENT
Grade:                [A1 / A2 / B1 / B2]
Reason for grade:     [one line]
Rests on:             [what this source itself relies on: own records,
                       named documents, named speakers, unnamed
                       sources, not stated]
Authenticity check:   [verified against official copy / consistent but
                       not traced / not verified] on [YYYY-MM-DD]
Known limits:         [scope stated by the source, redactions, missing
                       pages, later corrections or amendments,
                       interests of the author]

USE
Summary:              [two or three neutral sentences on what the
                       source is and covers]
Used for:             [claim IDs and chronology IDs that cite it]
Key passages:         [page or paragraph: short note, one per line]
Related sources:      [IDs of sources that cite, answer or supersede
                       this one]

STATUS
Last checked:         [YYYY-MM-DD: date the source was last opened and
                       the cited passages confirmed; or "pending check"]
Link status:          [live / moved to (new address) / dead, see
                       archive]
Notes:                [anything else a later reader needs]
```

## Notes on the fields

Source ID. Choose a scheme and keep it. A running number is simplest. A readable identifier built
from the issuer, year and a keyword is easier to recognize in drafts. Never reuse or renumber an ID.
Other records depend on it.

Type and author. Record who is actually speaking. A court filing is issued by a party, not by the
court, unless it is an order or opinion. A news article that reproduces a statement has the outlet
as its author and the speaker as the origin of the statement.

Date of source. This is the date on the document. It is different from the date of the events it
describes and from the date you obtained it. Keep all three apart.

Formal identifier. This is what lets a stranger retrieve the source when a link dies. For court
records, give the court, case number and docket entry number. For nonprofit filings, give the
Employer Identification Number, the form and the fiscal year end.

Original address and obtained from. Record where you really got the file. If you first saw it on an
unofficial site and then fetched the official copy, the official origin goes here and the route of
discovery can go in the notes. If you have only an unofficial copy, say so. That fact governs the
grade.

Grade and reason. Use the four grades. A1 is a primary official record. A2 is established reporting
that tracks the record. B1 is secondary analysis. B2 is thin or unverified. The one-line reason
prevents grades from drifting. A single source can contain material of mixed grade. Note that under
known limits, and grade the individual claims in the claim ledger.

Rests on. This field shows dependence. If three of your sources all rest on the same underlying
document, they are one line of evidence, not three.

Authenticity check. Record the result of your verification. A checklist for this is in this
Templates series.

Known limits. Write what the source says about its own scope, for example the years it covers and
the materials its authors could not see. Note whether a filing was later amended or an article later
corrected.

Key passages. Record pinpoints as you read. Finding the page again later costs far more time than
noting it now.

Last checked. Enter a date only when you have opened the source itself and confirmed the cited
passages. If the entry was compiled from a summary, write "pending check" and treat every claim that
depends on it as provisional.

## Adapting the template

For a spreadsheet, turn each field into a column and keep one row per source. The long fields
(summary, key passages, notes) can live in a linked document named by source ID.

For a large document release, log the release as one source with its own entry, and log each
document you rely on as a separate entry that names the release as its parent and gives the page
identifiers.

## Keeping the log current

Review entries on a schedule. Open each address, update the link status, and refresh the date
checked. When a source is corrected, amended or superseded, add a note and link the entries. Do not
delete an entry for a source you no longer use. Mark it retired, with the date and reason, so that
earlier versions of your work remain traceable.
