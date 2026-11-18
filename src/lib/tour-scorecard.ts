/**
 * The Tour Scorecard: what to look at when you walk a commercial building on
 * the South Shore, weighted by how you will use it. Rendered at
 * /tour-scorecard/. Each criterion carries what good looks like, the red flag,
 * and a weight (0 to 3) per seat so a retail buyer and a flex buyer score the
 * same building differently, as they should.
 */
export type Seat = 'flex' | 'retail' | 'office' | 'investor';

export interface Criterion {
  key: string;
  name: string;
  group: 'site' | 'building' | 'systems' | 'paper' | 'money';
  good: string;
  redFlag: string;
  weight: Record<Seat, 0 | 1 | 2 | 3>;
}

export const SEATS: Record<Seat, { name: string; blurb: string }> = {
  flex: { name: 'Owner-user: flex or industrial', blurb: 'A contractor, fabricator, or distributor buying a building to work out of.' },
  retail: { name: 'Owner-user: retail or restaurant', blurb: 'A storefront, a restaurant, or a service business that lives on visibility.' },
  office: { name: 'Owner-user: office or medical', blurb: 'A practice or a firm buying its own space.' },
  investor: { name: 'Investor', blurb: 'Buying the income, with tenants in place or to be found.' },
};

export const GROUPS = { site: 'Site and access', building: 'The building', systems: 'Systems', paper: 'Paper and permits', money: 'The money' } as const;

export const CRITERIA: Criterion[] = [
  { key: 'access', name: 'Highway and road access', group: 'site', good: 'Within five minutes of an interchange or on the corridor your customers drive; two ways in and out.', redFlag: 'One narrow curb cut onto a busy road, left turns only, or a residential street between you and the route.', weight: { flex: 3, retail: 3, office: 2, investor: 2 } },
  { key: 'visibility', name: 'Visibility and signage', group: 'site', good: 'Seen from the road at speed, a pylon or fascia sign position, and a sign bylaw that allows what you need.', redFlag: 'Set back behind another building, or a town sign bylaw that caps you below what the listing shows.', weight: { flex: 1, retail: 3, office: 2, investor: 2 } },
  { key: 'parking', name: 'Parking count and ratio', group: 'site', good: 'At or above the zoning minimum for your use with room for staff, customers, and company vehicles.', redFlag: 'A ratio that only works for the current use, shared parking with no written agreement, or employees parking on the street.', weight: { flex: 2, retail: 3, office: 3, investor: 2 } },
  { key: 'yard', name: 'Yard, outdoor storage, and truck maneuvering', group: 'site', good: 'Paved, fenced, drains properly, and a 53-foot trailer can turn around without backing onto the road.', redFlag: 'Outdoor storage not permitted in the zone, or a yard that floods or is shared.', weight: { flex: 3, retail: 0, office: 0, investor: 1 } },
  { key: 'zoning', name: 'Zoning fit for your use', group: 'paper', good: 'Your use is allowed by right, confirmed in writing by the building department or a zoning opinion.', redFlag: '"Grandfathered" with nothing in writing, a special permit the seller never pulled, or a use that lapsed while vacant.', weight: { flex: 3, retail: 3, office: 3, investor: 3 } },
  { key: 'clear', name: 'Clear height and column spacing', group: 'building', good: 'Clear height that fits your racking or lifts, with columns that do not break up the floor you need.', redFlag: 'Fourteen feet to the bottom of the joists advertised as eighteen, or ductwork and sprinkler mains eating the height.', weight: { flex: 3, retail: 1, office: 0, investor: 2 } },
  { key: 'loading', name: 'Loading: docks and drive-ins', group: 'building', good: 'The dock or drive-in doors your trucks need, with an approach that works in snow.', redFlag: 'One drive-in door at grade for a business that receives on pallets, or a dock with no leveler.', weight: { flex: 3, retail: 1, office: 0, investor: 2 } },
  { key: 'layout', name: 'Layout and expansion room', group: 'building', good: 'Works for you today without major demising, and there is a place to grow: land, a mezzanine, or a vacant bay.', redFlag: 'A floor plan that forces a six-figure build-out before day one, or lot coverage already at the maximum.', weight: { flex: 2, retail: 2, office: 3, investor: 1 } },
  { key: 'roof', name: 'Roof age and condition', group: 'building', good: 'Documented age under fifteen years, no ponding, no patches, warranty transferable.', redFlag: 'Multiple patches, interior staining, or "the seller is not sure" about age.', weight: { flex: 3, retail: 2, office: 2, investor: 3 } },
  { key: 'structure', name: 'Structure, slab, and envelope', group: 'building', good: 'Slab without heaving or wide cracks, walls plumb, no water at the base, windows and doors sound.', redFlag: 'Cracks you can put a finger in, efflorescence along the base of the walls, or a sagging ridge.', weight: { flex: 3, retail: 2, office: 2, investor: 3 } },
  { key: 'power', name: 'Electrical service', group: 'systems', good: 'Three-phase where you need it, amperage with headroom, panels with labeled breakers and room to add.', redFlag: 'Single-phase 200 amps for a shop full of machines, or a fuse box.', weight: { flex: 3, retail: 2, office: 1, investor: 2 } },
  { key: 'hvac', name: 'HVAC age and zoning', group: 'systems', good: 'Units under twelve years old with service records, zoned so you heat and cool what you use.', redFlag: 'A twenty-year-old rooftop unit and a lease or P&S that makes its replacement your problem.', weight: { flex: 2, retail: 3, office: 3, investor: 3 } },
  { key: 'sprinkler', name: 'Fire protection and life safety', group: 'systems', good: 'Sprinklered if your use or size requires it, alarm current, inspection tags up to date.', redFlag: 'No sprinklers in a building whose change of use will require them, which is a six-figure surprise.', weight: { flex: 3, retail: 2, office: 2, investor: 2 } },
  { key: 'sewer', name: 'Sewer or septic', group: 'systems', good: 'Municipal sewer, or a septic system with a passing Title V and capacity for your use.', redFlag: 'A septic sized for an office being bought for a restaurant or a shop with floor drains.', weight: { flex: 2, retail: 3, office: 2, investor: 3 } },
  { key: 'water', name: 'Water, gas, and drainage', group: 'systems', good: 'Adequate water pressure and meter size, natural gas at the street if you need it, site drainage that works in a storm.', redFlag: 'Propane where you assumed gas, a well, or water in the parking lot after a normal rain.', weight: { flex: 2, retail: 2, office: 1, investor: 2 } },
  { key: 'env', name: 'Environmental history', group: 'paper', good: 'A clean Phase I, no floor drains to dry wells, no tanks, no AUL on the deed.', redFlag: 'A former gas station or dry cleaner with no report, fill pipes in the ground, or an AUL that restricts your use.', weight: { flex: 3, retail: 2, office: 2, investor: 3 } },
  { key: 'permits', name: 'Permits and certificate of occupancy', group: 'paper', good: 'The permit history matches what you see, and a current certificate of occupancy for the use.', redFlag: 'Additions with no permits, or a use the certificate does not cover.', weight: { flex: 2, retail: 3, office: 2, investor: 3 } },
  { key: 'title', name: 'Title, easements, and survey', group: 'paper', good: 'Clean title, a recent survey, and easements you can live with.', redFlag: 'A neighbor\'s driveway across the lot, a shared well, or a boundary dispute.', weight: { flex: 2, retail: 2, office: 2, investor: 3 } },
  { key: 'ada', name: 'Accessibility', group: 'paper', good: 'An accessible entrance, route, and restroom, or a clear and priced path to them.', redFlag: 'Steps at every door and a renovation budget that will trigger full compliance.', weight: { flex: 1, retail: 3, office: 3, investor: 2 } },
  { key: 'rentroll', name: 'Leases and rent roll', group: 'money', good: 'Leases that match the rent roll, estoppels available, terms with runway, and expenses recovered.', redFlag: 'Month-to-month tenants described as long-term, below-market rents with no bumps, or an anchor with a termination right.', weight: { flex: 0, retail: 0, office: 0, investor: 3 } },
  { key: 'expenses', name: 'Operating expenses and taxes', group: 'money', good: 'Three years of real expenses, a tax bill that matches the assessment, no betterments pending.', redFlag: 'Expenses "estimated", a reassessment coming on sale, or a sewer betterment nobody mentioned.', weight: { flex: 2, retail: 2, office: 2, investor: 3 } },
  { key: 'capex', name: 'Near-term capital needs', group: 'money', good: 'The big five (roof, HVAC, paving, electrical, envelope) have ten years left or are priced into the deal.', redFlag: 'Two of the big five due in the first three years with no credit on the table.', weight: { flex: 3, retail: 2, office: 2, investor: 3 } },
  { key: 'financing', name: 'Financeability', group: 'money', good: 'A lender will underwrite it: clean environmental, appraisable comparables, and a use banks understand.', redFlag: 'A special-purpose building, a known environmental issue, or income that will not cover debt service.', weight: { flex: 3, retail: 3, office: 3, investor: 3 } },
];

export const SCORE_LABELS = ['Poor', 'Fair', 'Good', 'Great'] as const;

export function verdict(pct: number) {
  if (pct >= 85) return { label: 'Buy-grade', tone: 'teal', text: 'Few surprises left. Negotiate on price and terms, not on whether.' };
  if (pct >= 70) return { label: 'Worth pursuing', tone: 'teal', text: 'Solid with known gaps. Price the gaps and put them in the offer.' };
  if (pct >= 50) return { label: 'Conditional', tone: 'brass', text: 'It works only if the weak items can be fixed or credited. Get numbers before the LOI.' };
  return { label: 'Walk, unless', tone: 'red', text: 'Too many heavy items scored low. Only a price that reflects all of them makes this a deal.' };
}
