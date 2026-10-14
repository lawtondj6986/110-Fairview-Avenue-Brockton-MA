/**
 * schema.org Person node for the founder, built from FOUNDER in config.
 *
 * `founderPerson()` is the full node (About page, and the LocalBusiness
 * `founder` on every page). `founderRef()` is the lightweight reference used
 * wherever an author or founder is cited, so every mention on the site
 * resolves to the same @id — one entity for Google's knowledge graph and for
 * answer engines asking "who is Daniel Lawton?".
 */
import { FOUNDER, SITE } from '../config';

export function founderRef() {
  return { '@type': 'Person', '@id': FOUNDER.id, name: FOUNDER.name, url: `${SITE.url}${FOUNDER.path}` };
}

export function founderPerson() {
  const e = FOUNDER.education;
  return {
    '@type': 'Person',
    '@id': FOUNDER.id,
    name: FOUNDER.name,
    givenName: FOUNDER.firstName,
    familyName: FOUNDER.name.split(' ').slice(-1)[0],
    url: `${SITE.url}${FOUNDER.path}`,
    image: `${SITE.url}${FOUNDER.image}`,
    jobTitle: FOUNDER.jobTitle,
    description: `${FOUNDER.name} is the founder of ${SITE.name} in ${FOUNDER.hometown}: a ${e.school} ${e.college} graduate (${e.degreeShort} ${e.year}, concentrations in ${e.concentrations.join(' and ')}), a serial founder of small businesses, a ${FOUNDER.license.replace('Licensed ', 'licensed ')}, and a hands-on AI systems builder.`,
    email: SITE.email,
    telephone: SITE.phone,
    worksFor: { '@id': `${SITE.url}/#business` },
    homeLocation: { '@type': 'Place', name: FOUNDER.hometown },
    address: { '@type': 'PostalAddress', addressLocality: SITE.address.locality, addressRegion: SITE.address.region, addressCountry: SITE.address.country },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: e.school,
      department: { '@type': 'Organization', name: `${e.college} (now ${e.collegeNow})`, url: e.url },
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: `${e.degree}, concentrations in ${e.concentrations.join(' and ')}`,
        educationalLevel: "Bachelor's degree",
        recognizedBy: { '@type': 'CollegeOrUniversity', name: e.school },
        dateCreated: String(e.year),
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'license',
        name: 'Massachusetts Real Estate Salesperson License',
        identifier: FOUNDER.license.replace(/\D/g, ''),
        recognizedBy: { '@type': 'GovernmentOrganization', name: 'Massachusetts Board of Registration of Real Estate Brokers and Salespersons' },
      },
    ],
    affiliation: FOUNDER.ventures.map((v) => ({ '@type': 'Organization', name: v.name, url: v.url })),
    knowsAbout: [...FOUNDER.knowsAbout],
    sameAs: [SITE.social.linkedin].filter((u) => u && !/linkedin\.com\/?$/.test(u)),
  };
}
