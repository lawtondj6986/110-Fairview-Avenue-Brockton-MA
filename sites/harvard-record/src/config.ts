/**
 * Site-wide settings. Everything a maintainer is likely to change lives here.
 */
export const site = {
  /** Working title. It deliberately does not read as an official Harvard property. */
  name: 'Harvard Public Record Project',
  shortName: 'Public Record Project',
  tagline: 'An independent, public-source review of donor influence and institutional access at Harvard University.',
  url: 'https://www.harvarduniversityalumni.com',
  /** TODO: create this mailbox before launch; it is printed on every page. */
  correctionsEmail: 'corrections@harvarduniversityalumni.com',
  /** TODO: name the publisher (person or entity) responsible for the site. */
  publisher: 'Harvard Public Record Project (independent)',
  /** The short non-affiliation line shown at the top of every page. */
  disclaimerShort:
    'Independent project. Not affiliated with, endorsed by, or sponsored by Harvard University.',
  disclaimerLong:
    'This site is an independent research project. It is not affiliated with, endorsed by, or sponsored by Harvard University, the Harvard Alumni Association, or any Harvard school or office. “Harvard” is used only to identify the institution being discussed. All material is drawn from public records and published reporting, each cited and graded. Inclusion of a person’s name does not imply wrongdoing unless a cited record says so.',
};

export const nav = [
  { href: '/', label: 'Overview' },
  { href: '/program-for-evolutionary-dynamics/', label: 'PED', long: 'Program for Evolutionary Dynamics' },
  { href: '/harvard-medical-school/', label: 'HMS', long: 'Harvard Medical School, Church and Thakuria' },
  { href: '/donor-pathways/', label: 'Donor pathways', long: 'Donor influence and introduced funding' },
  { href: '/dna-genetics/', label: 'DNA record', long: 'DNA and genetics continuum' },
  { href: '/campus-safety/', label: 'Campus safety', long: 'Campus safety and sexual misconduct record' },
  { href: '/comparison/', label: 'Comparison', long: 'Cross-institutional comparison' },
  { href: '/reference/', label: 'Reference', long: 'Glossary, law explainers, guides and claim ledger' },
  { href: '/methodology/', label: 'Methodology', long: 'Methodology and sourcing standards' },
  { href: '/about/', label: 'About', long: 'About, disclaimer and corrections' },
];
