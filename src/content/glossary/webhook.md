---
term: "Webhook"
category: ai
short: "An automatic message one system sends to another the moment something happens, such as a new lead or booking."
related: ["marketing-automation", "crm", "missed-call-text-back", "lead-response-time"]
faqs:
  - q: "How is a webhook different from an API?"
    a: "An API is a door you knock on to ask for data; a webhook is the other system calling you when something changes. Most tools offer both. Webhooks are better for events, a new lead, a booking, a payment, because the reaction happens in seconds without a system polling for changes all day."
  - q: "What happens if a webhook fails?"
    a: "Well-built systems retry automatically and log the failure, and a good setup includes a fallback such as an email digest or a daily reconciliation. ICS configures retries and a failure alert on every Lead Engine webhook so a dropped message is caught the same day, not discovered when a lead calls back angry."
---

## What it means

A webhook is a push notification between software systems. When an event occurs in one system, a form submission, a missed call, a completed booking, a paid invoice, it immediately sends a small data package to a URL in another system, which acts on it. The alternative is polling, where the second system checks every few minutes. Webhooks are how most of the pieces in a small business's stack talk to each other in real time.

## Why it matters for a local business

Speed to lead is measured in minutes, and webhooks remove the minutes. When a Brockton homeowner fills out a roofing quote form at 9:40 pm, a webhook creates the CRM contact, sends the text-back, alerts the owner's phone, and starts the follow-up sequence before 9:41. Lead Engine runs on webhooks between the site, the phone system, the CRM, and the review platform. No one has to remember to copy anything.

## In practice

A Taunton auto body shop's booking tool fires a webhook on every new appointment. It writes the job to the CRM, texts the customer a confirmation with directions off Route 24, adds a reminder 24 hours out, and after the visit triggers a review request. Setup took about 3 hours. Over 6 months, no-shows fell from roughly 18 percent to 7 percent and Google reviews went from 44 to 131.
