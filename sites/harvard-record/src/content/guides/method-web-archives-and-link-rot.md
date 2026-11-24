---
title: "Using web archives and guarding against link rot"
description: "How to use web archives to preserve and check online sources, what an archived capture does and does not prove, and how to keep your citations working over time."
audience: "Researchers"
series: "Research methods"
order: 120
---

Link rot is the gradual failure of web links as pages are moved, rewritten or deleted. A related
problem, sometimes called content drift, is when a link still works but the page behind it has
changed. Both undermine research that cites the web, because a reader who cannot see what you saw
cannot check you. Web archives are the main defense. This guide covers how to use them and how far
to trust them.

## What a web archive is

A web archive is a service that saves copies of web pages at particular moments. Each saved copy is
called a capture or snapshot and carries a timestamp. The best known public archive is the Internet
Archive's Wayback Machine at `https://web.archive.org/`. Others exist, including services built for
legal and scholarly citation, and national libraries run archives of their own countries' web.

Archives collect pages in two ways. Automated crawlers visit sites on their own schedule, which
means a given page may have many captures, a few, or none. Many archives also let anyone request a
capture of a specific page on demand.

## Archive as you go

The most useful habit is to archive every web source at the moment you rely on it.

1. Open the page and confirm it shows the content you intend to cite.
2. Check whether a recent capture already exists and whether it shows the same content.
3. If not, request a new capture using the archive's save function.
4. Open the resulting capture and confirm it displays properly, including the passage you need.
5. Record both addresses in your source log: the original and the archived one, with the capture
   date.

Also keep your own copy. Save the page as a PDF or a complete file and store it with your notes,
named with the source identifier and date. Archives can lose or withdraw material, and a local copy
protects your own record even though a reader cannot check it.

For documents such as PDFs, download the file from the official origin and note the download date.
Archive the page that links to the file as well as the file itself where the archive allows it.

## Finding an earlier version of a page

When a link is dead or a page has changed:

- enter the original address in the archive to see the list of captures by date;
- choose the capture nearest to the date the content was cited or published;
- compare captures from different dates to see when wording changed;
- if the exact address has no captures, try the site's home page or parent section from the same
  period and navigate within the archive.

## What a capture does and does not prove

A capture is good evidence that a page at that address displayed that content when the archive's
crawler visited. Treat the limits seriously.

- The timestamp is the capture time, not the publication time. A page may have said the same thing
  for years before, or changed minutes earlier.
- A capture can be assembled from parts saved at different moments. Images, style files and embedded
  items may come from other dates, so the page may not look exactly as it did.
- Content loaded by scripts, behind logins or behind paywalls is often missing or incomplete.
- A gap between captures is not evidence about what the page said in between.
- The lack of any capture does not show a page never existed. Site owners can ask crawlers not to
  collect pages, and archives remove material on request.
- A deletion does not show motive. Pages vanish in redesigns and migrations all the time. Report
  that a page was removed and when the captures show it. Do not attribute a reason without a source.

An archived copy of an unreliable page is still unreliable. Archiving preserves a source. It does
not improve its grade. An archive capture of an official page is evidence of what the official page
said, and you should cite it as "archived copy of" the original, giving the original publisher as
the source.

## Citing archived pages

Give the reader everything needed to find the item either way:

- the author or issuing body, title and publication date, if stated;
- the original address;
- the archived address and the capture date;
- the date you accessed it.

If the original is live and unchanged, cite it first and the archive as a backup. If the original is
dead or altered, cite the archive and say that the original is no longer available or has changed.

## Auditing your own links

Links fail quietly. Build a routine.

1. Keep every cited address in your source log, not only in the text.
2. On a schedule, open each one. Automated link checkers help, but they miss content drift and
   "soft" failures, where a missing page returns the site's home page or a generic notice in place
   of an error.
3. For each failure, look for the new official address first. Prefer a working official link to an
   archive link.
4. If none exists, switch the citation to your archived capture and note the change.
5. Update the date checked in your source log and claim ledger.

Prefer stable addresses when you have a choice. Official permanent identifiers, such as a digital
object identifier (DOI) for scholarly work or a docket and entry number for a court filing, outlast
ordinary web addresses.

## Respect limits

Do not use archives to get around access controls, to retrieve material a court has sealed, or to
republish private information that a site removed for good reason. If a page was taken down because
it exposed personal details of a private individual, the fact that a capture survives does not make
it appropriate to cite. [The ethics guide](/guides/method-ethics-and-limits/) in this
series sets out these limits.
