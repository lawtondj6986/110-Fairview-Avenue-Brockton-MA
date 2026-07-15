/**
 * Single source of truth for business info used across the site
 * (header, footer, contact page, and structured data for local SEO).
 * Update values here and they change everywhere.
 */
export const SITE = {
  name: 'Innovative Commercial Strategies',
  shortName: 'ICS',
  tagline: 'AI-Powered Commercial Real Estate Advisory',
  description:
    "The South Shore's AI-powered commercial real estate firm. We help contractors, retailers, and medical practices buy, sell, and lease commercial property — then install the marketing and automation systems that grow the business inside it.",
  url: 'https://innovativecommercialstrategies.com', // TODO: production domain

  founder: 'Daniel Lawton',
  email: 'lawtondj@gmail.com', // TODO: switch to a business address, e.g. daniel@ics...
  phone: '(508) 555-0100', // TODO: real business phone
  address: {
    locality: 'Brockton',
    region: 'MA',
    country: 'US',
  },
  license: 'Licensed MA Real Estate Salesperson #XXXXXXX', // TODO: real license number

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
   * Lead capture: create a free form at https://formspark.io (or Formspree)
   * and paste the endpoint here. Submissions arrive by email; connect to
   * HubSpot via Zapier/Make when the CRM is live.
   */
  formEndpoint: 'https://submit-form.com/YOUR_FORM_ID', // TODO
  /** Booking: create a free event type at https://cal.com and paste the link. */
  bookingUrl: 'https://cal.com/YOUR_HANDLE/strategy-call', // TODO
};

export const NAV = [
  { label: 'Commercial Real Estate', href: '/commercial-real-estate/' },
  { label: 'AI Services', href: '/ai-services/' },
  { label: 'Case Studies', href: '/case-studies/' },
  { label: 'Listings', href: '/listings/' },
  { label: 'About', href: '/about/' },
  { label: 'Insights', href: '/insights/' },
];
