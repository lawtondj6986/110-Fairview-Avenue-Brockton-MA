/**
 * The three productized systems, as the Proposal Builder describes them.
 * Prices come from OFFERINGS (the single source of truth behind the pricing
 * page and the schema.org OfferCatalog), so a proposal can never quote a
 * number the pricing page does not.
 */
import { OFFERINGS } from '../config';

export type SystemKey = 'jobsite' | 'leadengine' | 'marketlock';

export interface SystemSpec {
  key: SystemKey;
  name: string;
  tagline: string;
  setup: string; // e.g. "$6,500–$9,500"
  monthly: string; // e.g. "$450–$700 per month"
  timeline: string;
  bestFor: string;
  includes: string[];
  guarantees: string[];
  href: string;
}

const money = (n: number) => '$' + n.toLocaleString('en-US');
const offer = (prefix: string) => OFFERINGS.find((o) => o.name.startsWith(prefix))!;
const setupRange = (prefix: string) => {
  const o = offer(prefix);
  return `${money(o.min)}–${money(o.max)}`;
};
const monthlyFrom = (prefix: string) => offer(prefix).note.replace(/^plus\s+/, '').replace(/\/month$/, ' per month');

export const SYSTEMS: SystemSpec[] = [
  {
    key: 'jobsite',
    name: 'JobSite',
    tagline: 'The conversion storefront. Live in 21 days, guaranteed.',
    setup: setupRange('JobSite'),
    monthly: monthlyFrom('JobSite'),
    timeline: '21 days from kickoff to live, guaranteed in writing',
    bestFor: 'A business whose website is a brochure and whose leads arrive by luck.',
    includes: [
      'Conversion-built website: fast on a phone, tappable calls and texts, structured data for Google and AI assistants',
      'QuoteBrain instant-quote tool configured for your trade or practice',
      'Town pages for the towns you actually serve, written individually',
      'Review integration and automated post-job review requests',
      'Call and form tracking with a monthly dashboard: leads by source',
      'Hosting, monitoring, updates, and a monthly review',
    ],
    guarantees: ['Live in 21 days or a $1,000 per week credit', '90 days to measurable proof or we work free until there is', '100% yours: code, domain, accounts, data'],
    href: '/ai-services/',
  },
  {
    key: 'leadengine',
    name: 'Lead Engine',
    tagline: 'Every lead answered in under 60 seconds and chased to a decision.',
    setup: setupRange('Lead Engine'),
    monthly: monthlyFrom('Lead Engine'),
    timeline: 'Four to six weeks to fully live; response automation switches on in week one',
    bestFor: 'A business with plenty of leads and not enough booked jobs.',
    includes: [
      'Sub-60-second first response to every call, form, and message, 24/7',
      'Missed-call text-back and an AI agent trained on your services, areas, hours, and pricing ranges',
      'A CRM you own, with pipeline stages and lead scoring tuned to your business',
      'Quote follow-up sequences in your voice: text, email, and a human call at the right step',
      'Online booking with reminders and rescheduling',
      'The Proof Engine: every finished job becomes a review request, photos, and a town-tagged post',
      'Monthly dashboard: response time, quote conversion, jobs booked by source',
    ],
    guarantees: ['Under 60 seconds to first response, measured monthly', '90 days to measurable proof or we work free until there is', '100% yours: code, accounts, data'],
    href: '/ai-services/',
  },
  {
    key: 'marketlock',
    name: 'Market Lock',
    tagline: 'One business per category, per town. In writing.',
    setup: setupRange('Market Lock'),
    monthly: monthlyFrom('Market Lock'),
    timeline: 'Six to eight weeks to fully live; exclusivity is in writing from day one',
    bestFor: 'An established business ready to own its category in its towns.',
    includes: [
      'Everything in Lead Engine',
      'Territory exclusivity: one business in your category per town, 12-month term, first right to renew, competitors declined in writing',
      'Managed paid media inside your territory, reported to the dollar',
      'The monthly Reels system: short videos produced from an hour of your time a month',
      'Answer engine optimization so Google AI and assistants name you',
      'Quarterly on-site strategy day',
    ],
    guarantees: ['Exclusivity in writing for the term', 'Under 60 seconds to first response, measured monthly', '90 days to measurable proof or we work free until there is', '100% yours: code, accounts, data'],
    href: '/territories/',
  },
];

export const getSystem = (key: string) => SYSTEMS.find((s) => s.key === key);
