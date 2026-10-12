/**
 * Single source of truth for business info used across the site
 * (header, footer, contact page, and structured data for local SEO).
 * Update values here and they change everywhere.
 */
export const SITE = {
  name: 'Innovative Commercial Strategies',
  shortName: 'ICS',
  tagline: 'Built by an operator. Measured in booked jobs.',
  description:
    "The South Shore's AI-powered commercial real estate firm. We help contractors, retailers, and medical practices buy, sell, and lease commercial property — then install the marketing and automation systems that grow the business inside it.",
  url: 'https://icsgroup.ai',

  founder: 'Daniel Lawton',
  email: 'lawtondj@gmail.com', // TODO: switch to daniel@icsgroup.ai once mailbox is set up
  phone: '(508) 942-8259',
  address: {
    locality: 'Brockton',
    region: 'MA',
    country: 'US',
  },
  license: 'Licensed MA Real Estate Salesperson #9082020',

  serviceAreas: [
    'Brockton',
    'Abington',
    'Whitman',
    'Bridgewater',
    'Stoughton',
    'Easton',
    'Middleborough',
    'Plympton',
    'West Bridgewater',
    'East Bridgewater',
  ],

  social: {
    linkedin: 'https://www.linkedin.com/', // TODO: real profile URL
  },

  /**
   * Lead capture (launch mode): the site uses direct email + phone links.
   * When ready to switch to a hosted form, create one at https://formspree.io,
   * set formEndpoint to its URL, and the LeadForm component's form UI returns.
   */
  formEndpoint: '', // empty = email-first launch mode
  /** Booking: create a free event type at https://cal.com and paste the link to enable booking buttons. */
  bookingUrl: '', // empty = phone/email links shown instead
};

/**
 * Productized services with published pricing — the single source of truth for
 * the machine-readable OfferCatalog (schema.org) emitted on the homepage and
 * pricing page. Keeping this honest and in sync with the public pages is the
 * whole point: answer engines can cite ICS's real numbers.
 * `min`/`max` are one-time USD unless `unit` says otherwise; `note` is display-only.
 */
export const OFFERINGS = [
  { name: 'JobSite — conversion website system', min: 6500, max: 9500, unit: 'setup', note: 'plus $450–$700/month', href: '/ai-services/' },
  { name: 'Lead Engine — sub-60-second lead response & follow-up', min: 12000, max: 18000, unit: 'setup', note: 'plus $1,500–$2,500/month', href: '/ai-services/' },
  { name: 'Market Lock — territory-exclusive growth system', min: 20000, max: 30000, unit: 'setup', note: 'plus $3,500–$6,000/month', href: '/ai-services/' },
  { name: 'Political Vulnerability Audit', min: 3500, max: 7500, unit: 'project', note: 'research your own public record first', href: '/political/' },
  { name: 'Opposition Research Book', min: 7500, max: 15000, unit: 'project', note: 'local and legislative races; statewide scoped separately', href: '/political/' },
  { name: 'Rapid-Response Research Desk', min: 2000, max: 4000, unit: 'month', note: 'standing desk through Election Day', href: '/political/' },
  { name: 'Ballot-Question Issue Landscape', min: 5000, max: 10000, unit: 'project', note: 'policy and ballot fights', href: '/political/' },
  { name: 'The Integrity Scan — for officials & future candidates', min: 3500, max: 7500, unit: 'project', note: 'with annual refresh', href: '/political/' },
] as const;

export const NAV = [
  { label: 'Real Estate', href: '/commercial-real-estate/' },
  { label: 'AI Systems', href: '/ai-services/' },
  { label: 'Retail Consultants', href: '/retail/' },
  { label: 'QuoteBrain', href: '/quotebrain/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Results', href: '/case-studies/' },
  { label: 'Listings', href: '/listings/' },
  { label: 'About', href: '/about/' },
  { label: 'Insights', href: '/insights/' },
];
