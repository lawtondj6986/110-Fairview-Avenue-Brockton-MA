---
term: "robots.txt"
category: ai
short: "A plain-text file at a site's root telling crawlers which pages they may and may not fetch."
related: ["llms-txt", "xml-sitemap", "answer-engine-optimization", "local-seo"]
faqs:
  - q: "Should I block AI crawlers in robots.txt?"
    a: "For a local business that wants to be recommended, usually no. Blocking means an assistant answering a local search cannot read your site and will describe you from third-party data or not at all. ICS allows the major search and answer engine crawlers, publishes llms.txt alongside, and blocks only admin paths and private directories."
  - q: "Does robots.txt keep a page private?"
    a: "No. It is a request to crawlers, and the file itself is public, so listing a path in it can advertise the very thing you wanted hidden. Anything that must stay private needs authentication or should not be on the public site at all. Use robots.txt to manage crawl behavior, not security."
---

## What it means

robots.txt is a public text file at the root of a domain that gives instructions to automated crawlers: which user agents are addressed, which paths are allowed or disallowed, and where the sitemap lives. It is a convention, not a lock; well-behaved search engines and AI crawlers honor it, bad actors ignore it. It does not hide content, and it does not stop a page from being indexed if other sites link to it.

## Why it matters for a local business

A misconfigured robots file is the most common way a small business makes itself invisible. A single "Disallow: /" left over from a staging site has taken more than one Quincy restaurant out of search for months. The opposite mistake matters now too: blocking AI crawlers means assistants cannot read your hours, services, or towns served. JobSite ships a permissive file that allows search and answer engines and points to the sitemap.

## In practice

A Hanover HVAC contractor's new site launched with the developer's staging rule still in place. Organic visits fell from roughly 1,100 a month to under 200 over 7 weeks before anyone looked. Removing one line and resubmitting the sitemap restored indexing in 12 days. The lesson is a 30-second check at launch and after every redesign.
