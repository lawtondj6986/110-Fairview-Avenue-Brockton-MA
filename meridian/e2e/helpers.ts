import { AREAS } from '../src/lib/areas';

export const LOCALES = ['ht', 'pt', 'kea', 'es', 'en'] as const;
export const PAGES = [
  '',
  '/emergency',
  '/help',
  ...AREAS.map((a) => `/help/${a.slug}`),
  '/about',
  '/contact',
  '/privacy',
  '/disclaimer',
  '/accessibility',
];
