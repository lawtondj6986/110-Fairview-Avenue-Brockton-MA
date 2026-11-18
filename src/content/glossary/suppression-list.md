---
term: "Suppression list"
category: ai
short: "The contacts your systems must never message: opt-outs, complainers, bounces, and do-not-call numbers."
related: ["double-opt-in", "tcpa-compliance", "email-deliverability", "reactivation-campaign"]
faqs:
  - q: "Who belongs on a suppression list?"
    a: "Anyone who unsubscribed or replied STOP, any address that hard-bounced, anyone who filed a spam complaint, numbers on the National Do Not Call Registry you have no exemption for, and current litigants or disputes your attorney flags. Add current customers to the suppression list for new-customer promotions so they are not offered a deal they already paid full price for."
  - q: "How long do I keep someone on the list?"
    a: "Indefinitely, unless they re-subscribe themselves through a fresh opt-in. An opt-out is not a cooling-off period. Resending to someone who said stop is the fastest route to a TCPA complaint or a carrier block. If you switch marketing platforms, export the suppression list first and import it before anything else."
---

## What it means

A suppression list is a master record of contacts that must be excluded from outbound messaging, maintained separately from the active audience and checked before every send. It holds unsubscribes, STOP replies, hard bounces, spam complaints, do-not-call numbers, and any contact a business chooses to exclude for its own reasons. Every email and SMS platform has one; the discipline is keeping it complete and in sync across tools.

## Why it matters for a local business

A Quincy auto shop running texts from one tool, email from another, and a review platform from a third has three places a customer might say "stop," and if those lists do not talk, the customer gets texted again from a different system. In Massachusetts and under federal TCPA rules that is exposure, and it is also just rude. ICS centralizes suppression in Lead Engine: any opt-out from any channel writes to the CRM record, and every connected tool checks it before sending.

## In practice

A Marshfield landscaping company migrated 2,100 contacts to a new platform and forgot the suppression list from the old one. The first spring mailing went to 140 people who had opted out over three years. Eleven complained, two threatened to report the company, and the sending domain's reputation dropped enough to push the next two campaigns into spam for a month. Rebuilding deliverability took about eight weeks and cost roughly $9,000 in missed spring bookings by the owner's estimate.
