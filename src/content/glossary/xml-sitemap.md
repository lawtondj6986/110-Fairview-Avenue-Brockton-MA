---
term: "XML sitemap"
category: ai
short: "A machine-readable list of a site's pages, with update dates, submitted to search engines."
related: ["robots-txt", "canonical-url", "service-area-page", "static-site"]
faqs:
  - q: "Do I still need a sitemap if my site is small?"
    a: "It costs nothing and still helps. Even a 10-page site benefits from telling search engines when a page changed, and Search Console's coverage report works far better with a sitemap to compare against. For any site that adds town or service pages over time, it is the main way new pages get found quickly."
  - q: "What should not be in the sitemap?"
    a: "Pages blocked by robots.txt, pages marked noindex, redirect sources, duplicate URLs that canonical to another page, thank-you pages, and anything behind a login. A sitemap full of pages you do not want indexed sends mixed signals. The file should match the canonical set of pages you actually want people to land on."
---

## What it means

An XML sitemap is a file listing every URL a site wants indexed, with optional last-modified dates and priorities. It is referenced from robots.txt and submitted directly to Google Search Console and Bing Webmaster Tools. It does not force indexing, but it tells crawlers what exists and what changed, which matters most for new sites and for sites with many pages that have few inbound links.

## Why it matters for a local business

A JobSite build for a Plymouth roofer with 41 town pages, 12 service pages, and a blog has 60 to 80 URLs that almost nothing links to yet. Without a sitemap, discovery can take months. With one regenerated on every build, new town pages are typically crawled within days. The same file shows Search Console which pages were indexed and which were not, so problems are visible instead of guessed.

## In practice

A Taunton auto repair shop added 18 service area pages in one release. The sitemap was regenerated automatically at build and pinged to Search Console. 15 of 18 were indexed within 9 days; the 3 that were not shared a thin template with under 120 words each. Rewriting them to 350 words with local detail got them indexed in the following crawl. Total time from question to answer: under two weeks.
