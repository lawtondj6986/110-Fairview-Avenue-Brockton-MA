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

  // Every town with a market page (src/lib/towns.ts) — feeds the LocalBusiness areaServed schema.
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
    'Plymouth',
    'Kingston',
    'Halifax',
    'Hanson',
    'Rockland',
    'Avon',
    'Randolph',
    'Holbrook',
    'Weymouth',
    'Braintree',
    'Hingham',
    'Hanover',
    'Norwell',
    'Pembroke',
    'Quincy',
    'Marshfield',
    'Duxbury',
    'Scituate',
    'Cohasset',
  ],

  social: {
    linkedin: 'https://www.linkedin.com/', // TODO: real profile URL
  },

  /**
   * Lead capture. Empty = launch mode: every form composes a pre-filled email.
   * To turn on hosted capture WITHOUT touching code: set the environment
   * variable PUBLIC_FORM_ENDPOINT (e.g. a Formspree URL) in the Vercel
   * dashboard → Project → Settings → Environment Variables, then redeploy.
   * Every form on the site (contact, listings, political intake) switches to
   * an in-page AJAX submit with inline confirmation. A literal value here
   * still works as a fallback.
   */
  formEndpoint: (import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined)?.trim() || '',
  /**
   * Booking. Same pattern: set PUBLIC_BOOKING_URL (e.g. a cal.com event link)
   * in Vercel and redeploy; booking buttons appear in place of phone/email.
   */
  bookingUrl: (import.meta.env.PUBLIC_BOOKING_URL as string | undefined)?.trim() || '',
};

/**
 * The founder — the face of the brand. Single source of truth for the bio,
 * credentials, and the schema.org Person node (src/lib/founder.ts).
 */
export const FOUNDER = {
  name: 'Daniel Lawton',
  firstName: 'Daniel',
  title: 'Founder',
  jobTitle: 'Founder · Commercial Real Estate Advisor · AI Systems Builder',
  /** Canonical bio URL and the @id every Person reference points at. */
  path: '/about/',
  id: 'https://icsgroup.ai/about/#daniel-lawton',
  image: '/images/daniel-lawton.jpg',
  education: {
    school: 'Boston University',
    college: 'School of Management',
    collegeNow: 'Questrom School of Business',
    degree: 'Bachelor of Science in Business Administration',
    degreeShort: 'B.S.B.A.',
    concentrations: ['Entrepreneurship', 'Marketing'],
    year: 2008,
    url: 'https://www.bu.edu/questrom/',
  },
  license: 'Licensed MA Real Estate Salesperson #9082020',
  hometown: 'Brockton, Massachusetts',
  /** Ventures founded or built and operated — shown on the bio and in schema. */
  ventures: [
    { name: 'Innovative Commercial Strategies', role: 'Founder', url: 'https://icsgroup.ai', blurb: 'CRE advisory, AI revenue systems, commercial intelligence, and platform ventures — Brockton, MA.' },
    { name: 'AfriPulse Times', role: 'Founder & builder', url: 'https://www.afripulsetimes.com', blurb: 'Pan-African digital newsroom, engineered end to end; publishing daily and raising for rollout.' },
    { name: 'Outback Arms retail platform', role: 'Builder & operator', url: 'https://outbackarms.com', blurb: 'Live-inventory platform running a regulated retail storefront in Plympton, MA — business up 300% since launch.' },
  ],
  knowsAbout: [
    'Commercial real estate',
    'Entrepreneurship',
    'Marketing',
    'Small-business operations',
    'AI business automation',
    'Digital publishing platforms',
    'Retail e-commerce systems',
    'Open-source intelligence (OSINT) research',
  ],
  quote: "The operator thing isn't a metaphor.",
} as const;

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

/**
 * Top navigation: seven items, on purpose. Retail Consultants and QuoteBrain
 * moved to the footer and the AI Systems page so a first-time visitor sees
 * the two engines, the price, the proof, and the person — not every practice.
 */
export const NAV = [
  { label: 'Real Estate', href: '/commercial-real-estate/' },
  { label: 'AI Systems', href: '/ai-services/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Results', href: '/case-studies/' },
  { label: 'Listings', href: '/listings/' },
  { label: 'About', href: '/about/' },
  { label: 'Insights', href: '/insights/' },
];
