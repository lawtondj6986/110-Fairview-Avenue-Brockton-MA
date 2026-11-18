---
title: "Missed-call text-back: what actually happens in the 30 seconds after a contractor misses a call"
description: "A missed call is not lost when it hits voicemail. It is lost four minutes later, when the caller dials the next name on the list. Here is the second-by-second sequence a good text-back system runs, where it decides not to text, what the first message says, and the arithmetic of what it recovers."
category: ai-for-business
date: 2026-11-18
faqs:
  - q: "What is missed-call text-back?"
    a: "It is an automation that notices when a call to your business goes unanswered and sends the caller a text within seconds, from the same number they dialed. The text apologizes, asks what they need, and keeps the conversation alive until a person or a booking link takes over. It turns a voicemail nobody leaves into a thread the caller can answer with a thumb."
  - q: "Does missed-call text-back work on a landline?"
    a: "Only if the landline number has been text-enabled, which most carriers and texting platforms allow for a business number you control. Without that step, the text would come from a different number and the caller would not recognize it. ICS text-enables the main number during install so the reply arrives from the number the customer just called."
  - q: "Is it legal to text someone who just called me and hung up?"
    a: "A single reply to an inbound call is generally treated as a response the caller invited, not a marketing blast, but the rules are specific and change. Every text-back ICS sends identifies the business, answers only the caller's request, and honors STOP immediately. For anything beyond that first exchange, get consent and talk to your attorney."
  - q: "How many missed calls does text-back actually recover?"
    a: "In our installs, roughly half to two thirds of missed callers reply to the text within five minutes, and about half of those replies turn into a booked visit or a quote request. For a trade that misses twenty calls a week, that is typically six to eight jobs that would otherwise have gone to the next name on the list."
---

A plumber in Hanover is under a kitchen sink at 10:40 on a Tuesday morning. His phone buzzes in his back pocket. His hands are wet. The call rings five times and drops to a voicemail greeting he recorded in 2021. The caller does not leave a message. Nobody under forty leaves a message.

That caller found him on Maps, where three plumbers were listed. She calls the second one. He picks up. The job is gone, and the Hanover plumber will never know it existed.

Missed-call text-back prevents exactly this. People talk about it as a feature. It is really a sequence that has to run in under thirty seconds to beat the second dial. Here is what happens in those thirty seconds, in order, and where it quietly fails.

## Seconds zero to three: knowing the call was missed

The system cannot text back a call it did not see. So the first job is detection, and there are three ways to do it.

The cleanest is to route the business number through a call platform. The published number still rings the owner's cell, but the platform sits in the middle and sees every event: ring, answer, hang-up, timeout. When the ring times out unanswered, it fires an event within about a second.

The second way is carrier forwarding: the owner's cell forwards on no-answer to a platform number. Slightly slower, but it works with a number the owner has had for fifteen years.

The third is voicemail-triggered: the platform owns the voicemail box and fires when a call lands there. This is the weakest, because it also fires for people who did leave a message.

In every case, the call record arrives with the caller's number, the time, and the line they called. Those three facts drive everything after. If the business runs on a landline that has never been text-enabled, this is the moment the sequence breaks, because the platform has nowhere to send the reply from. Fix that before anything else.

## Seconds three to ten: deciding whether to text at all

A good system does not text everyone. Before it sends anything, it runs the caller through a short list of filters. Cheap setups skip this, which is how a business ends up texting a vendor's fax line.

- **Is the number a mobile?** A carrier lookup tells you. Landlines and desk phones get no text.
- **Did this person opt out before?** If the number is on the suppression list, nothing goes. Not a text-back, not a follow-up, nothing.
- **Is this an existing customer with an open job?** Then the owner gets pinged instead. The customer waiting on a part does not want a form-letter greeting.
- **Did we already text this number in the last hour?** Someone who calls three times because the line is busy gets one text, not three.
- **Is it a known spam number?** No reply.
- **What time is it?** A text at 11:40 at night is a bad experience even when the caller just dialed you. Many installs send one line saying when the shop opens.

Each filter is a yes-or-no question against data the platform already has. Then the system stops, or hands off to the message step. The [missed-call text-back](/glossary/missed-call-text-back/) glossary entry has the short definition.

## Seconds ten to fifteen: the first text

The first message is the one that matters, and it has rules.

It must come from the number the caller just dialed. If a customer calls a 508 number and gets a text from a 617 number she has never seen, she assumes spam. This is why text-enabling the main line is step one of the install.

It must say who it is. Not "Hi! Thanks for calling!" but "This is Mike at Mike's Plumbing in Hanover."

It must ask one question that moves the job forward. "What's going on, and what town are you in?" asks for the two facts that let someone quote or schedule.

It must be short, so it arrives as one message. It must name the opt-out path in plain words; "Reply STOP to end texts" costs nothing and protects you.

And it must be sent from a number the carriers trust. Business texting now runs through a carrier registration system called 10DLC. An unregistered number gets filtered, sometimes silently. A vendor who does not know what that is should not be sending texts for you.

A typical first text in one of our installs: "Hi, this is Dan at Fairview Electric in Brockton. Sorry I missed you, I'm on a job. What's going on and what town are you in? Reply STOP to end texts."

## Seconds fifteen to thirty: the reply, and who is on the other end

In our installs, between half and two thirds of mobile callers reply to that text inside five minutes. The reply is where the system earns its fee, because now there is a conversation, and someone has to hold it.

The owner can, from his phone, when he gets out from under the sink. A dispatcher can, if the business has one. Or a trained responder can, which is how [two-way texting](/glossary/two-way-texting/) works inside Lead Engine: the responder asks the qualifying questions (what is wrong, where, how soon), offers the next open slot or a quote link, and hands the thread to a human the moment it gets a question outside its script. It never pretends to be the owner. It says it is the office.

What the responder may do is set during install. It can book a slot on the real calendar, send the instant-quote link for a standard job, and quote a service-call fee the owner approved. It cannot promise a price for a job it cannot see, agree to a discount, or discuss a dispute. Those go to the owner with a one-line summary.

Thirty seconds after the missed call, the caller has a reply from the business she dialed, a question she can answer with her thumb, and a path to a booked appointment. The second plumber never gets the call.

## The arithmetic of a typical week

Take a two-truck HVAC company in Rockland. Call tracking shows about sixty inbound calls a week in the shoulder season, more in January. The owner and his tech answer roughly 65 percent. That leaves 21 missed calls a week.

Without text-back, a handful of those callers try again. Call it four. The other 17 go to the next listing, with no record they ever existed.

With text-back, say 55 percent of the 21 reply: 11 or 12 conversations. About half become a booked visit or a quote request: six jobs. At an average ticket of $650 for a repair visit, with a couple of the six growing into larger work over the year, that is several thousand dollars a week recovered from calls the business was already paying to generate.

Lead Engine, which includes text-back along with a sixty-second answer on every call and form, runs $12,000 to $18,000 to build plus $1,500 to $2,500 a month. Six recovered jobs a week covers the monthly fee in the first week. The [speed-to-lead](/glossary/speed-to-lead/) entry explains why the first five minutes carry so much of the value.

## Where it breaks

Most text-back failures are not software failures. They are setup failures, and they are the same five every time.

The number is not text-enabled, so the reply arrives from a stranger's number and gets ignored. The number is not registered with the carriers, so the text is filtered and nobody knows. The filters are off, so landlines get texted, repeat callers get texted three times, and someone who said STOP last spring gets texted again. The message is generic, so it reads as a bot and gets no reply. And nobody is on the other end, so the caller replies, waits, and dials the next plumber anyway, now slightly annoyed.

The last one is the most common and the most expensive. A text-back with no responder behind it is a faster way to lose the lead. The [trades playbook](/industries/trades-home-services/playbook/) covers what happens after the first thirty seconds.

## What to do this week

1. Pull your call log and count the calls you missed in the last seven days; most owners guess half the real number.
2. Call your own business from a friend's cell at a busy hour, let it ring out, and time what happens next.
3. Ask your carrier or texting vendor whether your main number is text-enabled and registered for business messaging.
4. Write the first text in your own words, under 160 characters, with your name, your town, one question, and the STOP line.
5. Decide who answers the reply in the first five minutes, and what that person is allowed to book or quote.
6. Run your missed-call count and average ticket through the [Payback Calculator](/payback/) to see what the gap costs you per month.
