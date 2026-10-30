/**
 * Approximate centroids for the 29 South Shore towns and the schematic
 * corridor polylines drawn through them. This powers the hub map; it is a
 * schematic, not a survey. Label offsets keep neighbors legible.
 */
export interface TownGeo {
  slug: string;
  lat: number;
  lon: number;
  /** Label anchor: where the name sits relative to the dot. */
  anchor?: 'start' | 'end' | 'middle';
  dx?: number;
  dy?: number;
}

export const TOWN_GEO: TownGeo[] = [
  { slug: 'quincy', lat: 42.253, lon: -71.002, anchor: 'end', dx: -10, dy: 4 },
  { slug: 'braintree', lat: 42.204, lon: -71.0, anchor: 'end', dx: -10, dy: 4 },
  { slug: 'weymouth', lat: 42.221, lon: -70.94, anchor: 'start', dx: 10, dy: -6 },
  { slug: 'hingham', lat: 42.242, lon: -70.89, anchor: 'start', dx: 10, dy: 4 },
  { slug: 'cohasset', lat: 42.242, lon: -70.804, anchor: 'start', dx: 10, dy: 4 },
  { slug: 'scituate', lat: 42.196, lon: -70.726, anchor: 'start', dx: 10, dy: 4 },
  { slug: 'norwell', lat: 42.162, lon: -70.794, anchor: 'start', dx: 10, dy: 4 },
  { slug: 'hanover', lat: 42.113, lon: -70.812, anchor: 'start', dx: 10, dy: 4 },
  { slug: 'rockland', lat: 42.13, lon: -70.908, anchor: 'end', dx: -10, dy: -6 },
  { slug: 'abington', lat: 42.105, lon: -70.945, anchor: 'end', dx: -10, dy: 4 },
  { slug: 'holbrook', lat: 42.155, lon: -71.009, anchor: 'end', dx: -10, dy: 4 },
  { slug: 'randolph', lat: 42.163, lon: -71.041, anchor: 'end', dx: -10, dy: -6 },
  { slug: 'avon', lat: 42.131, lon: -71.042, anchor: 'end', dx: -10, dy: 4 },
  { slug: 'stoughton', lat: 42.125, lon: -71.102, anchor: 'end', dx: -10, dy: 4 },
  { slug: 'brockton', lat: 42.083, lon: -71.018, anchor: 'end', dx: -13, dy: 5 },
  { slug: 'whitman', lat: 42.081, lon: -70.936, anchor: 'start', dx: 10, dy: 12 },
  { slug: 'hanson', lat: 42.075, lon: -70.88, anchor: 'start', dx: 10, dy: -6 },
  { slug: 'pembroke', lat: 42.071, lon: -70.793, anchor: 'start', dx: 10, dy: 4 },
  { slug: 'marshfield', lat: 42.092, lon: -70.706, anchor: 'start', dx: 10, dy: 4 },
  { slug: 'duxbury', lat: 42.042, lon: -70.672, anchor: 'start', dx: 10, dy: 4 },
  { slug: 'easton', lat: 42.025, lon: -71.128, anchor: 'end', dx: -10, dy: 4 },
  { slug: 'west-bridgewater', lat: 42.019, lon: -71.008, anchor: 'end', dx: -10, dy: 12 },
  { slug: 'east-bridgewater', lat: 42.034, lon: -70.959, anchor: 'start', dx: 10, dy: 12 },
  { slug: 'bridgewater', lat: 41.99, lon: -70.975, anchor: 'end', dx: -10, dy: 12 },
  { slug: 'halifax', lat: 41.991, lon: -70.862, anchor: 'start', dx: 10, dy: 4 },
  { slug: 'kingston', lat: 41.994, lon: -70.724, anchor: 'start', dx: 10, dy: 4 },
  { slug: 'plympton', lat: 41.952, lon: -70.814, anchor: 'start', dx: 10, dy: 10 },
  { slug: 'middleborough', lat: 41.893, lon: -70.911, anchor: 'end', dx: -10, dy: 4 },
  { slug: 'plymouth', lat: 41.958, lon: -70.667, anchor: 'start', dx: 10, dy: 4 },
];

/** Schematic corridors: each is a route label and the towns it threads, in order. */
export const CORRIDORS: { route: string; towns: string[]; tone: 'teal' | 'brass' }[] = [
  { route: 'Route 3', towns: ['braintree', 'weymouth', 'hingham', 'norwell', 'hanover', 'pembroke', 'kingston', 'plymouth'], tone: 'teal' },
  { route: 'Route 3A', towns: ['quincy', 'weymouth', 'hingham', 'cohasset', 'scituate', 'marshfield', 'duxbury', 'kingston', 'plymouth'], tone: 'teal' },
  { route: 'Route 24', towns: ['randolph', 'avon', 'brockton', 'west-bridgewater', 'bridgewater'], tone: 'brass' },
  { route: 'Route 28', towns: ['randolph', 'avon', 'brockton', 'west-bridgewater', 'middleborough'], tone: 'brass' },
  { route: 'Route 18', towns: ['weymouth', 'abington', 'whitman', 'east-bridgewater', 'bridgewater'], tone: 'brass' },
  { route: 'Route 139', towns: ['stoughton', 'holbrook', 'abington', 'rockland', 'hanover', 'pembroke', 'marshfield'], tone: 'brass' },
  { route: 'Route 106', towns: ['easton', 'west-bridgewater', 'east-bridgewater', 'halifax', 'plympton', 'kingston'], tone: 'brass' },
];
