/**
 * QuoteBrain 2.0 — trade-configurable pricing engines + scope writer.
 *
 * Each engine is pure data + pure functions so it can be unit-tested,
 * reused in client installs, and later fed to an LLM for narrative polish.
 * Rates are South Shore MA planning bands, written from operator experience.
 */

export interface QuoteInputs {
  trade: 'sealcoating' | 'paving';
  sqft: number;
  condition: 'good' | 'fair' | 'poor';
  crackFeet: number; // linear feet of crack filling
  stalls: number; // parking stalls to re-stripe
  oilSpots: boolean;
  jobType: 'commercial' | 'residential';
}

export interface QuoteLine {
  item: string;
  detail: string;
  low: number;
  high: number;
}

export interface QuoteResult {
  lines: QuoteLine[];
  low: number;
  high: number;
  perSqftLow: number;
  perSqftHigh: number;
}

const round50 = (n: number) => Math.round(n / 50) * 50;

export function priceSealcoating(i: QuoteInputs): QuoteResult {
  // Base rate per sq ft, 2-coat application
  let lo = i.jobType === 'commercial' ? 0.16 : 0.22;
  let hi = i.jobType === 'commercial' ? 0.22 : 0.35;

  // Volume breaks — spray work gets cheaper per foot at scale
  if (i.sqft > 100000) {
    lo *= 0.72;
    hi *= 0.75;
  } else if (i.sqft > 50000) {
    lo *= 0.85;
    hi *= 0.88;
  } else if (i.sqft < 5000 && i.jobType === 'commercial') {
    lo *= 1.15;
    hi *= 1.2;
  }

  // Surface condition drives prep labor
  const condMult = i.condition === 'poor' ? 1.25 : i.condition === 'fair' ? 1.1 : 1;

  const lines: QuoteLine[] = [];
  lines.push({
    item: 'Sealcoat — 2 coats, spray applied',
    detail: `${i.sqft.toLocaleString('en-US')} sq ft, commercial-grade emulsion, ${i.condition} surface`,
    low: i.sqft * lo * condMult,
    high: i.sqft * hi * condMult,
  });

  if (i.crackFeet > 0) {
    lines.push({
      item: 'Hot rubberized crack filling',
      detail: `${i.crackFeet.toLocaleString('en-US')} linear ft, routed & cleaned before fill`,
      low: i.crackFeet * 1.25,
      high: i.crackFeet * 2.5,
    });
  }
  if (i.stalls > 0) {
    lines.push({
      item: 'Line striping',
      detail: `${i.stalls} stalls re-striped per existing layout, traffic paint`,
      low: i.stalls * 4.5 + 150,
      high: i.stalls * 7.5 + 250,
    });
  }
  if (i.oilSpots) {
    lines.push({
      item: 'Oil-spot priming',
      detail: 'Petroleum-stained areas primed so sealer bonds',
      low: Math.min(i.sqft * 0.008, 400),
      high: Math.min(i.sqft * 0.015, 900),
    });
  }

  const minJob = i.jobType === 'commercial' ? 950 : 400;
  const rawLo = lines.reduce((s, l) => s + l.low, 0);
  const rawHi = lines.reduce((s, l) => s + l.high, 0);
  const low = round50(Math.max(rawLo, minJob));
  const high = round50(Math.max(rawHi, minJob * 1.3));

  return { lines, low, high, perSqftLow: rawLo / i.sqft, perSqftHigh: rawHi / i.sqft };
}

export function pricePaving(i: QuoteInputs): QuoteResult {
  // Overlay (1.5" top course) planning bands; full-depth reconstruction runs far higher
  let lo = i.jobType === 'commercial' ? 2.1 : 2.6;
  let hi = i.jobType === 'commercial' ? 3.2 : 4.5;
  if (i.sqft > 50000) {
    lo *= 0.85;
    hi *= 0.9;
  }
  const condMult = i.condition === 'poor' ? 1.2 : i.condition === 'fair' ? 1.08 : 1;

  const lines: QuoteLine[] = [
    {
      item: 'Asphalt overlay — 1.5" compacted top course',
      detail: `${i.sqft.toLocaleString('en-US')} sq ft, machine laid & rolled, ${i.condition} base`,
      low: i.sqft * lo * condMult,
      high: i.sqft * hi * condMult,
    },
  ];
  if (i.stalls > 0) {
    lines.push({
      item: 'Line striping — new layout',
      detail: `${i.stalls} stalls, layout + traffic paint`,
      low: i.stalls * 6 + 200,
      high: i.stalls * 9 + 350,
    });
  }
  const minJob = 2500;
  const rawLo = lines.reduce((s, l) => s + l.low, 0);
  const rawHi = lines.reduce((s, l) => s + l.high, 0);
  return {
    lines,
    low: round50(Math.max(rawLo, minJob)),
    high: round50(Math.max(rawHi, minJob * 1.2)),
    perSqftLow: rawLo / i.sqft,
    perSqftHigh: rawHi / i.sqft,
  };
}

export function price(i: QuoteInputs): QuoteResult {
  return i.trade === 'paving' ? pricePaving(i) : priceSealcoating(i);
}

/** Deterministic professional scope-of-work writer (LLM polish hook comes later). */
export function writeScope(i: QuoteInputs, r: QuoteResult, address: string): string[] {
  const where = address ? `at ${address}` : 'at the measured property';
  const paras: string[] = [];

  if (i.trade === 'sealcoating') {
    paras.push(
      `Scope of work: protective sealcoating of approximately ${i.sqft.toLocaleString('en-US')} sq ft of asphalt pavement ${where}. Surface will be cleaned of all dirt and debris using power blowers and wire brooms; vegetation in cracks and along edges removed.`
    );
    if (i.oilSpots)
      paras.push(
        'Petroleum-stained areas will be treated with oil-spot primer to ensure proper sealer adhesion.'
      );
    if (i.crackFeet > 0)
      paras.push(
        `Approximately ${i.crackFeet.toLocaleString('en-US')} linear ft of cracking will be filled with hot-applied rubberized crack filler, routed and cleaned before application.`
      );
    paras.push(
      'Two coats of commercial-grade pavement sealer will be spray-applied to manufacturer specification. Pavement must remain closed to traffic for a minimum of 24 hours after final coat; scheduling is weather-dependent (dry, 50°F+ and rising).'
    );
    if (i.stalls > 0)
      paras.push(`${i.stalls} parking stalls will be re-striped per the existing layout with traffic-grade paint.`);
  } else {
    paras.push(
      `Scope of work: asphalt overlay of approximately ${i.sqft.toLocaleString('en-US')} sq ft ${where}. Existing surface swept and tack-coated; 1.5" compacted hot-mix top course machine-laid and rolled. Transitions and structures (drains, gates, aprons) feathered to grade.`
    );
    if (i.stalls > 0) paras.push(`${i.stalls} parking stalls laid out and striped new after cure.`);
  }

  paras.push(
    `Planning estimate: $${r.low.toLocaleString('en-US')} – $${r.high.toLocaleString('en-US')}. This range reflects current South Shore MA market conditions and the measurements provided; a firm written quote follows a brief on-site walk, typically within 48 hours.`
  );
  return paras;
}
