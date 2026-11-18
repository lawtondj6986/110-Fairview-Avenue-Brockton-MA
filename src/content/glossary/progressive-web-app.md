---
term: "Progressive web app (PWA)"
category: ai
short: "A website built to install on a phone's home screen, load instantly, and work offline like an app."
related: ["static-site", "core-web-vitals", "jobsite", "appointment-booking-automation"]
tool: { label: "Payback calculator", href: "/payback/" }
faqs:
  - q: "Is a PWA the same as a mobile app?"
    a: "No. A native app is built separately for iOS and Android and distributed through stores. A PWA is your website with added capabilities: install to home screen, offline caching, fast repeat loads. For a local service business, the PWA covers what customers actually do on your site, booking, calling, and getting a quote, at a fraction of the cost."
  - q: "Does a PWA help with search rankings?"
    a: "Indirectly. Search engines reward fast, stable pages, and a PWA's caching and preloading improve the speed metrics that feed those rankings, especially on mobile. The direct benefit is to customers who come back: the second visit is nearly instant, and an installed icon keeps you one tap away instead of one search away."
---

## What it means

A progressive web app is a website that uses a service worker, a manifest file, and https to behave like a native app: it can be added to a phone's home screen with its own icon, cache pages and assets so repeat visits load instantly, keep working with a weak or absent connection, and in some browsers send push notifications. It is still one codebase and one URL; nothing goes through an app store.

## Why it matters for a local business

Most small businesses do not need an app and cannot afford to maintain one. They do need a site that opens in under a second on a customer's phone in a Brockton parking lot with two bars of signal. A PWA gives a contractor, a dental office, or a Boca Raton restaurant the app-like experience, booking and quote tools included, without the $30,000 to $80,000 cost of native development and store maintenance.

## In practice

A Quincy med spa's JobSite build added PWA features: a manifest, cached core pages, and an offline booking fallback that queues the request. Repeat-visit load time dropped from 2.4 seconds to under 0.4. About 6 percent of returning mobile visitors installed it to their home screen within 3 months, and that group booked at roughly twice the rate of other mobile visitors.
