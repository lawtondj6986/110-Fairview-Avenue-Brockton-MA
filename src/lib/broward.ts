/**
 * Broward County, FL — the municipalities the seasonal South Florida practice
 * serves. Used by the Broward Territory Board (Market Lock exclusivity is one
 * business per category, per city). No per-city market pages yet; the board
 * links back to the Broward practice page.
 */
export interface Place {
  slug: string;
  name: string;
}

export const BROWARD_CITIES: Place[] = [
  { slug: 'fort-lauderdale', name: 'Fort Lauderdale' },
  { slug: 'hollywood', name: 'Hollywood' },
  { slug: 'pembroke-pines', name: 'Pembroke Pines' },
  { slug: 'miramar', name: 'Miramar' },
  { slug: 'coral-springs', name: 'Coral Springs' },
  { slug: 'pompano-beach', name: 'Pompano Beach' },
  { slug: 'davie', name: 'Davie' },
  { slug: 'plantation', name: 'Plantation' },
  { slug: 'sunrise', name: 'Sunrise' },
  { slug: 'deerfield-beach', name: 'Deerfield Beach' },
  { slug: 'weston', name: 'Weston' },
  { slug: 'tamarac', name: 'Tamarac' },
  { slug: 'lauderhill', name: 'Lauderhill' },
  { slug: 'coconut-creek', name: 'Coconut Creek' },
  { slug: 'margate', name: 'Margate' },
  { slug: 'oakland-park', name: 'Oakland Park' },
  { slug: 'dania-beach', name: 'Dania Beach' },
  { slug: 'hallandale-beach', name: 'Hallandale Beach' },
  { slug: 'cooper-city', name: 'Cooper City' },
  { slug: 'parkland', name: 'Parkland' },
  { slug: 'north-lauderdale', name: 'North Lauderdale' },
  { slug: 'lauderdale-lakes', name: 'Lauderdale Lakes' },
  { slug: 'wilton-manors', name: 'Wilton Manors' },
  { slug: 'lighthouse-point', name: 'Lighthouse Point' },
];
