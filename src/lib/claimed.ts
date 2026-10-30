/**
 * Locked Market Lock territories — the single source of truth for both
 * Territory Boards and for the territory-status cards on town and industry
 * pages. When a client signs, add { place: '<slug>', industry: '<slug>' }.
 * Never the client's name: the boards show "locked", never who holds it.
 */
export interface Claim {
  place: string;
  industry: string;
}

/** South Shore, MA — place slugs from src/lib/towns.ts */
export const CLAIMED_MA: Claim[] = [];

/** Broward County, FL — place slugs from src/lib/broward.ts */
export const CLAIMED_FL: Claim[] = [];

export const isLocked = (claimed: Claim[], place: string, industry: string) =>
  claimed.some((c) => c.place === place && c.industry === industry);

export const lockedInPlace = (claimed: Claim[], place: string) => claimed.filter((c) => c.place === place).length;

export const lockedForIndustry = (claimed: Claim[], industry: string) => claimed.filter((c) => c.industry === industry).length;

/** Palm Beach County, FL — place slugs from src/lib/palm-beach.ts */
export const CLAIMED_PB: Claim[] = [];
