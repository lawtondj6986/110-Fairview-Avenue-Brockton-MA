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

export const NAV = [
  { label: 'Real Estate', href: '/commercial-real-estate/' },
  { label: 'AI Systems', href: '/ai-services/' },
  { label: 'QuoteBrain', href: '/quotebrain/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Results', href: '/case-studies/' },
  { label: 'Listings', href: '/listings/' },
  { label: 'About', href: '/about/' },
  { label: 'Insights', href: '/insights/' },
];
