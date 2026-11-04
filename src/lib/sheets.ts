/**
 * Market Sheets — one printable page per place, in all three markets.
 *
 * A sheet is the leave-behind: the thing the founder hands across a counter
 * or a visitor prints before a meeting. Everything on it is drawn from data
 * that already exists (towns, cities, geo, claims, OFFERINGS), so a sheet
 * can never say something the live page does not.
 */
import { TOWNS, type Town } from './towns';
import { BROWARD_CITIES, type BrowardCity } from './broward';
import { PALM_BEACH_CITIES } from './palm-beach';
import { TOWN_GEO, BROWARD_GEO, PALM_BEACH_GEO, type TownGeo } from './town-geo';
import { CLAIMED_MA, CLAIMED_FL, CLAIMED_PB, type Claim } from './claimed';

export type Market = 'MA' | 'FL' | 'PB';

export interface MarketSpec {
  key: Market;
  /** Short market name, e.g. "South Shore, MA" */
  label: string;
  state: 'MA' | 'FL';
  stateName: string;
  /** Undefined for MA, where the county is per town. */
  county?: string;
  noun: 'town' | 'city';
  pageBase: string;
  boardHref: string;
  hubHref: string;
  hubLabel: string;
  geo: TownGeo[];
  claimed: Claim[];
  /** Why ICS is here, one line, for the sheet's masthead. */
  presence: string;
  /** The scope sentence printed in the sheet footer. */
  scope: string;
}

export const MARKETS: Record<Market, MarketSpec> = {
  MA: {
    key: 'MA',
    label: 'South Shore, MA',
    state: 'MA',
    stateName: 'Massachusetts',
    noun: 'town',
    pageBase: '/south-shore/',
    boardHref: '/territories/',
    hubHref: '/south-shore/',
    hubLabel: 'The South Shore',
    geo: TOWN_GEO,
    claimed: CLAIMED_MA,
    presence: 'Headquartered in Brockton. Both engines: commercial real estate and AI revenue systems.',
    scope: 'Commercial real estate advisory in Massachusetts under a Massachusetts license. Referral fees only between licensed professionals.',
  },
  FL: {
    key: 'FL',
    label: 'Broward County, FL',
    state: 'FL',
    stateName: 'Florida',
    county: 'Broward County',
    noun: 'city',
    pageBase: '/broward/',
    boardHref: '/broward/territories/',
    hubHref: '/broward/',
    hubLabel: 'Broward County',
    geo: BROWARD_GEO,
    claimed: CLAIMED_FL,
    presence: 'On the ground seasonally; systems run remotely all year. AI revenue systems, retail platforms, custom builds.',
    scope: 'Systems, retail platforms, and custom builds in Florida. Real estate brokerage is Massachusetts-licensed; a Florida property transaction is handled alongside a licensed Florida broker.',
  },
  PB: {
    key: 'PB',
    label: 'Palm Beach County, FL',
    state: 'FL',
    stateName: 'Florida',
    county: 'Palm Beach County',
    noun: 'city',
    pageBase: '/palm-beach/',
    boardHref: '/palm-beach/territories/',
    hubHref: '/palm-beach/',
    hubLabel: 'Palm Beach County',
    geo: PALM_BEACH_GEO,
    claimed: CLAIMED_PB,
    presence: 'Boca Raton flagship; on the ground seasonally, systems run remotely all year. AI revenue systems, retail platforms, custom builds.',
    scope: 'Systems, retail platforms, and custom builds in Florida. Real estate brokerage is Massachusetts-licensed; a Florida property transaction is handled alongside a licensed Florida broker.',
  },
};

/** One normalized place record the sheet renders from, whatever market it is in. */
export interface SheetPlace {
  market: Market;
  slug: string;
  name: string;
  county: string;
  position: string;
  corridors: string[];
  /** Business profile, as bullets (FL cities) or one paragraph split by sentence (MA towns). */
  businessBullets: string[];
  /** MA towns only: the property-side paragraph. */
  propertyMix?: string;
  angle: string;
  neighbors: { slug: string; name: string }[];
  pageHref: string;
  sheetHref: string;
  boardHref: string;
}

export const sheetHref = (market: Market, slug: string) => `${MARKETS[market].pageBase}${slug}/sheet/`;

const placesOf = (market: Market): (Town | BrowardCity)[] => (market === 'MA' ? TOWNS : market === 'FL' ? BROWARD_CITIES : PALM_BEACH_CITIES);

/** Lower-case a leading capital so bullets read as one list. */
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Split a paragraph into at most four sentence-bullets for the sheet. */
function sentences(p: string, max = 4): string[] {
  const parts = p
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-Z"“])/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.slice(0, max);
}

export function getSheetPlace(market: Market, slug: string): SheetPlace | undefined {
  const spec = MARKETS[market];
  const list = placesOf(market);
  const p = list.find((x) => x.slug === slug);
  if (!p) return undefined;
  const isTown = market === 'MA';
  const town = p as Town;
  const city = p as BrowardCity;
  const neighbors = p.neighbors
    .map((s) => list.find((x) => x.slug === s))
    .filter((x): x is Town | BrowardCity => !!x)
    .map((x) => ({ slug: x.slug, name: x.name }));
  return {
    market,
    slug: p.slug,
    name: p.name,
    county: isTown ? `${town.county} County` : spec.county!,
    position: isTown ? town.position : cap(city.position),
    corridors: p.corridors,
    // The sheet must fit one Letter page: three sentences each side for the towns with the longest copy.
    businessBullets: isTown ? sentences(town.businessMix, 3) : city.businessMix.map(cap),
    propertyMix: isTown ? sentences(town.propertyMix, 3).join(' ') : undefined,
    angle: p.angle,
    neighbors,
    pageHref: `${spec.pageBase}${p.slug}/`,
    sheetHref: sheetHref(market, p.slug),
    boardHref: spec.boardHref,
  };
}

export function allSheetPlaces(market: Market): SheetPlace[] {
  return placesOf(market).map((p) => getSheetPlace(market, p.slug)!);
}

/** Static paths helper for the three sheet routes. */
export const sheetParams = (market: Market, param: 'town' | 'city') => placesOf(market).map((p) => ({ params: { [param]: p.slug } }));
