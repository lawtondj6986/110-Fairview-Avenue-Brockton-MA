/**
 * The First 90 Days — week by week, per system. The one page that answers
 * "what actually happens after I sign." Timelines agree with SYSTEMS (21 days
 * for JobSite, four to six weeks for Lead Engine, six to eight for Market Lock)
 * and with the written guarantees; if those change, change this.
 */
import type { SystemKey } from './systems';

export interface Phase {
  when: string;
  title: string;
  /** What ICS does. */
  we: string[];
  /** What we need from the client in this phase. */
  you: string[];
  /** What the client has at the end of the phase. */
  get: string;
  /** A written guarantee that attaches to this phase. */
  guarantee?: string;
}

export const TIMELINES: Record<SystemKey, Phase[]> = {
  jobsite: [
    {
      when: 'Day 0',
      title: 'Kickoff',
      we: ['Sign the scope and the 21-day guarantee.', 'Measure the baseline: current site speed, calls and forms per month, response time, review count.', 'Collect access: domain, Google Business Profile, phone, photos.', 'Agree the 90-day target in writing.'],
      you: ['A one-hour kickoff, in person or by video.', 'Access on the checklist below (the 21-day clock starts when content and access are in hand).'],
      get: 'A signed scope, a measured baseline, and a launch date on the calendar.',
    },
    {
      when: 'Week 1',
      title: 'Architecture and words',
      we: ['Map the site: services, the towns you actually serve, proof, and the one path to a call.', 'Write every page, including a town page for each service town.', 'Configure QuoteBrain for your trade: the questions, the ranges, the output.', 'Provision tracking numbers and the form pipeline.'],
      you: ['Services with honest price ranges.', 'Twenty or more real job photos from a phone.', 'One review call on the draft copy.'],
      get: 'Draft pages and a working instant-quote tool to react to.',
    },
    {
      when: 'Week 2',
      title: 'The build',
      we: ['Build the site: fast on a phone, tappable calls and texts, structured data for Google and AI assistants.', 'Wire call and form tracking into the dashboard.', 'Connect the review platform and the post-job review request.', 'Test every path on real phones.'],
      you: ['A second review call.', 'Approval on the design and the quote ranges.'],
      get: 'A finished site on a staging link, tracking live, review requests ready.',
    },
    {
      when: 'Week 3',
      title: 'Launch',
      we: ['Point the domain, set redirects, submit to Google, link the Business Profile.', 'Switch on review requests and the dashboard.', 'Walk your team through the quote tool and the lead flow.'],
      you: ['Thirty minutes for the launch walkthrough.'],
      get: 'The site live by day 21, in your accounts, with the first leads tracked.',
      guarantee: 'Live in 21 days or a $1,000-per-week credit.',
    },
    {
      when: 'Weeks 4 to 13',
      title: 'Measure and tune',
      we: ['Monthly report on the first business day: leads by source, response, reviews.', 'Tune pages and the quote tool from real behavior.', 'Monthly 30-minute review.'],
      you: ['Keep answering the phone; tell us what the leads were worth.'],
      get: 'Three monthly reports and a measured 90-day result against the baseline.',
      guarantee: '90 days to measurable proof against your own baseline, or we work free until there is.',
    },
  ],
  leadengine: [
    {
      when: 'Day 0',
      title: 'Kickoff and baseline',
      we: ['Measure the baseline: median response time, quote-to-booked rate, reviews per month.', 'Agree the 90-day target in writing.', 'Collect access: phone, forms, calendar, review platform, Business Profile.'],
      you: ['A one-hour kickoff.', 'Access on the checklist below.', 'Who answers the phone today, and when.'],
      get: 'A written baseline and target, and a build plan with dates.',
    },
    {
      when: 'Week 1',
      title: 'Response switched on',
      we: ['Missed-call text-back live on your main line.', 'AI receptionist trained on your services, areas, hours, and pricing ranges, answering calls and forms 24/7.', 'Call and form tracking live; response time measured from day 7.'],
      you: ['An hour to review how the receptionist answers and what it asks.'],
      get: 'Every lead answered in under 60 seconds, starting this week.',
      guarantee: 'Under 60 seconds to first response, measured monthly from the first full month.',
    },
    {
      when: 'Week 2',
      title: 'A CRM you own',
      we: ['Pipeline stages and lead scoring tuned to your business.', 'Online booking with reminders and rescheduling.', 'Every lead, from every source, landing in one place.'],
      you: ['Thirty minutes to agree the stages and what a good lead looks like.'],
      get: 'One pipeline, in your account, with every lead in it.',
    },
    {
      when: 'Weeks 3 to 4',
      title: 'Follow-up and proof',
      we: ['Quote follow-up sequences in your voice: text, email, and a human call at the right step.', 'The Proof Engine: every finished job becomes a review request, photos, and a town-tagged post.', 'Team training on the pipeline and the follow-up.'],
      you: ['Approve the follow-up messages.', 'Have the crew shoot photos at job completion.'],
      get: 'Quotes chased to a decision; reviews arriving without anyone asking.',
    },
    {
      when: 'Weeks 5 to 6',
      title: 'Fully live',
      we: ['Dashboard live: response time, quote conversion, jobs booked by source.', 'First monthly report on the first business day of the next month.', 'Monthly 30-minute review scheduled.'],
      you: ['Thirty minutes for the first review.'],
      get: 'The whole system running, measured, and reported.',
    },
    {
      when: 'Weeks 7 to 13',
      title: 'Measure and tune',
      we: ['Tune the receptionist, the sequences, and the sources from real numbers.', 'Monthly report and review.', '90-day checkpoint against the written target.'],
      you: ['Tell us which jobs were worth the most; we feed it back into scoring.'],
      get: 'A measured 90-day result and a plan for the next quarter.',
      guarantee: '90 days to measurable proof against your own baseline, or we work free until there is.',
    },
  ],
  marketlock: [
    {
      when: 'Day 0',
      title: 'Exclusivity in writing',
      we: ['Your category in your town locked on the Territory Board; competitors in the category are declined from today.', 'Measure the baseline and agree the 90-day target in writing.', 'Collect access: phone, forms, calendar, review platform, Business Profile, ad accounts.'],
      you: ['A one-hour kickoff.', 'Access on the checklist below.', 'The towns you want next, if any.'],
      get: 'A written 12-month exclusivity with first right to renew, and a plan with dates.',
      guarantee: 'Exclusivity in writing for the term.',
    },
    {
      when: 'Weeks 1 to 2',
      title: 'Response and pipeline',
      we: ['Everything in Lead Engine, weeks 1 and 2: missed-call text-back, the AI receptionist, tracking, and a CRM you own with booking.'],
      you: ['An hour on the receptionist; thirty minutes on the pipeline stages.'],
      get: 'Every lead answered in under 60 seconds and landing in one pipeline.',
      guarantee: 'Under 60 seconds to first response, measured monthly from the first full month.',
    },
    {
      when: 'Weeks 3 to 4',
      title: 'Follow-up, proof, and paid media',
      we: ['Follow-up sequences and the Proof Engine, as in Lead Engine.', 'Managed paid media inside your territory only, reported to the dollar.', 'Answer-engine optimization: structured data, a complete profile, and the questions people actually ask, so Google AI and assistants name you.'],
      you: ['Approve the messages and the ad budget.', 'One hour of your time on camera for the first Reels.'],
      get: 'Paid leads inside your territory, organic answers naming you, reviews compounding.',
    },
    {
      when: 'Weeks 5 to 8',
      title: 'Fully live',
      we: ['The monthly Reels system: short videos produced from an hour of your time a month.', 'Dashboard live; first monthly report on the first business day.', 'Quarterly on-site strategy day scheduled.'],
      you: ['Thirty minutes for the first review.'],
      get: 'The whole system running in your territory, measured, and reported.',
    },
    {
      when: 'Weeks 9 to 13',
      title: 'Measure, tune, and hold the territory',
      we: ['Tune sources and spend from real numbers; move budget to what books jobs.', 'Monthly report and review; 90-day checkpoint against the written target.', 'Scope the next town if you want it; neighbors are priced per territory.'],
      you: ['Tell us which jobs were worth the most.'],
      get: 'A measured 90-day result, a held territory, and a plan for the next quarter.',
      guarantee: '90 days to measurable proof against your own baseline, or we work free until there is.',
    },
  ],
};

/** The access and material we ask for at kickoff. Shared across systems; a few items are system-specific. */
export const CHECKLIST: { key: string; label: string; systems?: SystemKey[] }[] = [
  { key: 'domain', label: 'Domain registrar login, or delegation to us', systems: ['jobsite'] },
  { key: 'site', label: 'Current website admin access (if you have one)', systems: ['jobsite'] },
  { key: 'gbp', label: 'Google Business Profile: add us as a manager' },
  { key: 'phone', label: 'Main phone line details and who answers it today' },
  { key: 'forms', label: 'Where web forms and messages land today (email, app)' },
  { key: 'services', label: 'Your services with honest price ranges' },
  { key: 'towns', label: 'The towns you actually serve, in priority order' },
  { key: 'photos', label: 'Twenty or more real job photos from a phone' },
  { key: 'reviews', label: 'Review platform logins (Google, Yelp, Facebook)' },
  { key: 'calendar', label: 'The calendar you book jobs on', systems: ['leadengine', 'marketlock'] },
  { key: 'ads', label: 'Ad account access, or permission to create one', systems: ['marketlock'] },
  { key: 'logo', label: 'Logo files and any brand colors you care about' },
];
