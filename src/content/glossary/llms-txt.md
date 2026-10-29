---
term: "llms.txt"
category: ai
short: "A plain-text file at a site's root that tells AI systems what the site is and where to find the important parts."
related: ["answer-engine-optimization", "structured-data"]
faqs:
  - q: "What goes in an llms.txt file?"
    a: "A short description of the business, the key pages with one-line summaries, the facts you want AI systems to get right, and pointers to fuller content. ICS also publishes a companion full-text file so an AI can ingest the entire site in one fetch."
  - q: "Do AI crawlers actually use llms.txt?"
    a: "Adoption is growing and uneven. The cost of publishing one is near zero and the downside of being described wrongly by an AI is real, so ICS treats it as a standard part of answer engine optimization alongside structured data and a permissive robots file."
---

## What it means

llms.txt is an emerging convention, modeled on robots.txt, for giving large language model crawlers a curated guide to a website. It states what the site is, lists the pages that matter, and provides the canonical facts in a form that is cheap for a model to read and hard to misinterpret.

## Why it matters on the South Shore

icsgroup.ai publishes both llms.txt and llms-full.txt, regenerated every build. For a South Shore business, the equivalent file states the services, towns, prices, and credentials in one place, so an assistant asked for a recommendation has the right answer rather than a guess.
