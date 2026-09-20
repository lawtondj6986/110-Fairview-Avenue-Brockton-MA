/**
 * "What's My Building Worth?" — Broker Opinion of Value request engine.
 *
 * Honesty rules this page: we never claim an automated valuation of a
 * specific property. The only dollar math shown is an income-approach
 * PLANNING BAND computed from the owner's own rent inputs with wide,
 * labeled assumptions. The real deliverable is Daniel's in-person BOV.
 */

export type PropertyType = 'retail' | 'industrial' | 'office' | 'mixed-use' | 'automotive' | 'medical' | 'land';
export type Occupancy = 'owner' | 'leased' | 'mixed' | 'vacant';
export type LeaseStructure = 'nnn' | 'split' | 'gross';
export type Condition = 'good' | 'fair' | 'poor';

export interface BovInputs {
  type: PropertyType;
  town: string;
  sqft: number;
  occupancy: Occupancy;
  condition: Condition;
  monthlyRent: number; // 0 = not provided / owner-occupied
  leaseStructure: LeaseStructure;
}

/** Planning cap-rate bands (South Shore MA, sub-$3M, qualitative planning use). */
export const CAP_BANDS: Record<Exclude<PropertyType, 'land'>, [number, number]> = {
  industrial: [0.0625, 0.0725],
  retail: [0.0675, 0.0775],
  'mixed-use': [0.07, 0.08],
  medical: [0.0675, 0.075],
  automotive: [0.07, 0.08],
  office: [0.08, 0.09],
};

/** Share of gross rent assumed to go to expenses, by who pays what. */
export const EXPENSE_FACTORS: Record<LeaseStructure, number> = {
  nnn: 0.08,
  split: 0.25,
  gross: 0.4,
};

export interface IncomeBand {
  noiLow: number;
  noiHigh: number;
  low: number;
  high: number;
  capLow: number;
  capHigh: number;
}

/** Income-approach planning band from the owner's own rent figure. */
export function incomeBand(i: BovInputs): IncomeBand | null {
  if (i.type === 'land' || i.monthlyRent <= 0) return null;
  const gross = i.monthlyRent * 12;
  const exp = EXPENSE_FACTORS[i.leaseStructure];
  // NOI band: expenses ±5pts around the structure assumption, light vacancy allowance
  const noiHigh = gross * (1 - Math.max(exp - 0.05, 0.03)) * 0.97;
  const noiLow = gross * (1 - (exp + 0.05)) * 0.95;
  const [capLow, capHigh] = CAP_BANDS[i.type];
  const round5k = (n: number) => Math.round(n / 5000) * 5000;
  return {
    noiLow: Math.round(noiLow),
    noiHigh: Math.round(noiHigh),
    low: round5k(noiLow / capHigh),
    high: round5k(noiHigh / capLow),
    capLow,
    capHigh,
  };
}

export const TYPE_NOTES: Record<PropertyType, string> = {
  industrial:
    'Industrial and flex is the tightest product on the South Shore — every growing contractor within twenty minutes wants a clear-span building with a yard, and owner-user demand routinely pushes pricing past what income math alone suggests.',
  retail:
    'Well-located retail with parking and visibility still trades on strong demand from owner-users and service tenants — corridor frontage and signalized access carry real premiums in this market.',
  'mixed-use':
    'Mixed-use with apartments above commercial is prized here: the residential income de-risks the commercial space, and lenders like the blend. Unit condition and separate utilities drive the spread.',
  medical:
    'Medical and dental space earns premium pricing on long build-out lead times — buyers pay for plumbing, compliance, and parking that already exist.',
  automotive:
    'Auto-related property (bays, lifts, lot capacity) has scarcity value — towns rarely zone new automotive use, so existing legal use is itself an asset.',
  office:
    'Office is the most price-sensitive segment post-2020 — but small suburban owner-user offices behave very differently from towers, and medical/professional conversion potential often sets the real value.',
  land:
    'Commercial land trades on buildable potential: zoning, frontage, utilities, and permitting posture matter far more than raw acreage. A BOV here starts with a use analysis.',
};

export const OCCUPANCY_NOTES: Record<Occupancy, string> = {
  owner:
    "Owner-occupied buildings sell best to other owner-users — often businesses just like yours, one size behind. That buyer pool values usability over cap rates, which typically works in the seller's favor on well-kept buildings.",
  leased:
    'Fully leased property is priced on the income — lease terms, remaining term, and tenant strength will be the spine of the valuation. Bring the leases to the site walk.',
  mixed:
    'Part-leased, part-owner buildings offer buyers optionality: income now, expansion later. Positioning that story correctly is worth real money at the closing table.',
  vacant:
    "Vacancy reads as risk to lenders but opportunity to owner-users and value-add buyers. The marketing strategy — who we put the building in front of — matters more here than anywhere.",
};

export const CONDITION_NOTES: Record<Condition, string> = {
  good: 'A well-maintained building lets buyers finance confidently and lets us market on move-in readiness — typically the top of the local range.',
  fair: 'Serviceable condition with visible age usually prices mid-range; small pre-sale fixes (roof certifications, striping, lighting) often return multiples at closing.',
  poor: 'Deferred maintenance shifts the buyer pool toward value-add investors and contractors who can self-perform — pricing follows, but the right buyer still pays for location and use rights.',
};
