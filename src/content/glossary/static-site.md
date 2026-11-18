---
term: "Static site"
category: ai
short: "A website delivered as prebuilt files from a CDN, with no server rendering pages on each request."
related: ["core-web-vitals", "jobsite", "ship-velocity", "progressive-web-app"]
tool: { label: "Payback calculator", href: "/payback/" }
faqs:
  - q: "Can a static site have forms, booking, and a quote calculator?"
    a: "Yes. The page itself is static; the interactive parts call small services when a visitor uses them. A booking widget, a missed-call text-back trigger, or a QuoteBrain calculator runs in the browser and posts to an API. The visitor sees a fast page with full functionality, and the business sees fewer moving parts to break."
  - q: "How do I update content on a static site without a developer?"
    a: "Through a content layer: a headless CMS, a Git-based editor, or structured files that a rebuild picks up. JobSite clients edit text and images in a simple editor; the site rebuilds and redeploys in about a minute. For most local businesses the volume of changes is low enough that this is faster than a WordPress admin."
---

## What it means

A static site is generated once, at build time, into plain HTML, CSS, and JavaScript files, then served from a content delivery network. There is no database query or application server running when a visitor loads a page. Dynamic features, forms, booking, chat, quotes, are handled by small APIs or third-party services called from the page. Astro, Hugo, and Eleventy are common generators.

## Why it matters for a local business

Speed, cost, and uptime. A static page for a Rockland electrician loads in a few hundred milliseconds from a server near the visitor, hosts for a few dollars a month or free, and cannot be taken down by a plugin exploit or a database crash on a Saturday morning. JobSite is built this way: the content lives in files, every change is a rebuild, and the booking and lead capture run as separate services that cannot slow the page.

## In practice

A Plymouth landscaper moved from a WordPress site with 23 plugins to a static JobSite build. Median mobile load time went from 4.1 seconds to 0.7. Hosting went from $45 a month to $0. Over the following 12 months the site had no downtime and no security patches to apply, and the owner's monthly maintenance time went from about 3 hours to 20 minutes for content updates.
