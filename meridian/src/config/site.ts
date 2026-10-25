/**
 * Single source of truth for firm facts.
 * Anything not supplied by the firm is a TODO_ placeholder (registered in TODO.md).
 * Never replace a placeholder with a guess — wrong phone numbers can send a family in crisis to a stranger.
 */
export const site = {
  name: 'Meridian Immigration Group',
  domain: 'meridianimmigrationgroup.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://meridianimmigrationgroup.com',
  attorney: {
    name: 'Attorney Mark Lawton, Esq.',
    shortName: 'Mark Lawton',
    title: 'Managing Attorney',
    barNumber: 'TODO_BAR_NUMBER',
  },
  office: {
    street: '157 Belmont Street',
    city: 'Brockton',
    region: 'MA',
    postalCode: '02301',
    country: 'US',
  },
  phone: {
    display: 'TODO_PHONE',
    tel: 'TODO_PHONE_E164',
  },
  emergencyPhone: {
    display: 'TODO_EMERGENCY_PHONE',
    tel: 'TODO_EMERGENCY_PHONE_E164',
  },
  email: 'TODO_EMAIL',
  hours: 'TODO_HOURS',
} as const;

export const officeOneLine = `${site.office.street}, ${site.office.city}, ${site.office.region} ${site.office.postalCode}`;

export const mapUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(officeOneLine)}`;

/** Placeholders stay visible (never a fake number) so a missing fact is obvious before launch. */
export function isPlaceholder(value: string): boolean {
  return value.startsWith('TODO_');
}

export function telHref(tel: string): string {
  return `tel:${tel}`;
}
