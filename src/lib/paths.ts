/**
 * Path memory — the site remembers, in the visitor's own browser only, which
 * practice they were last looking at, so a return visit can lead with it.
 *
 * Nothing leaves the browser: localStorage only, one small record, cleared by
 * "Forget this". Used by PathMemory.astro (the recorder and the welcome-back
 * bar), the Fit Finder (records the match), and LeadForm (pre-selects interest).
 */
export type PathKey = 'cre' | 'ai' | 'intel' | 'political' | 'retail' | 'platforms' | 'broward' | 'palmbeach' | 'private';

export interface PathInfo {
  /** Lower-case phrase that completes "Last time you were looking at …" */
  label: string;
  hub: string;
  hubLabel: string;
  /** The one best next step after the hub. */
  next: [label: string, href: string];
  /** Matching option in the contact form's "I'm interested in" select. */
  interest?: string;
}

export const PATHS: Record<PathKey, PathInfo> = {
  cre: {
    label: 'commercial real estate',
    hub: '/commercial-real-estate/',
    hubLabel: 'Back to real estate →',
    next: ['Run the numbers on a building', '/deal-tools/'],
    interest: 'Buying commercial property',
  },
  ai: {
    label: 'AI revenue systems',
    hub: '/ai-services/',
    hubLabel: 'Back to AI systems →',
    next: ['See published pricing', '/pricing/'],
    interest: 'AI systems & marketing',
  },
  intel: {
    label: 'commercial intelligence',
    hub: '/intelligence/',
    hubLabel: 'Back to the intelligence desk →',
    next: ['Scope it in 60 seconds', '/intelligence/scope/'],
    interest: 'Something else',
  },
  political: {
    label: 'political research',
    hub: '/political/',
    hubLabel: 'Back to the political desk →',
    next: ['Run the free self-check', '/political/self-check/'],
    interest: 'Something else',
  },
  retail: {
    label: 'retail platforms',
    hub: '/retail/',
    hubLabel: 'Back to Retail Consultants →',
    next: ['The Outback Arms build story', '/case-studies/outback-arms-retail-platform/'],
    interest: 'AI systems & marketing',
  },
  platforms: {
    label: 'custom platforms',
    hub: '/platforms/',
    hubLabel: 'Back to Custom Platforms →',
    next: ['The AfriPulse Times build story', '/case-studies/afripulse-times-media-platform/'],
    interest: 'Something else',
  },
  broward: {
    label: 'the Broward County practice',
    hub: '/broward/',
    hubLabel: 'Back to Broward →',
    next: ['Check the Broward Territory Board', '/broward/territories/'],
    interest: 'AI systems & marketing',
  },
  palmbeach: {
    label: 'the Palm Beach County practice',
    hub: '/palm-beach/',
    hubLabel: 'Back to Palm Beach →',
    next: ['Check the Palm Beach Territory Board', '/palm-beach/territories/'],
    interest: 'AI systems & marketing',
  },
  private: {
    label: 'private client services',
    hub: '/private-clients/',
    hubLabel: 'Back to Private Clients →',
    next: ['How sensitive work is handled', '/confidential/'],
    interest: 'Both — property and AI systems',
  },
};

/** First match wins. Order matters: Broward before the generic practices. */
const RULES: [RegExp, PathKey][] = [
  [/^\/broward(\/|$)/, 'broward'],
  [/^\/palm-beach(\/|$)/, 'palmbeach'],
  [/^\/(commercial-real-estate|deal-tools|cap-rate|lease-analyzer|lease-vs-buy|seller-net|listings|building-worth|south-shore)(\/|$)/, 'cre'],
  [/^\/(ai-services|pricing|territories|quotebrain|ai-readiness|industries|compare|playbook)(\/|$)/, 'ai'],
  [/^\/intelligence(\/|$)/, 'intel'],
  [/^\/political(\/|$)/, 'political'],
  [/^\/retail(\/|$)/, 'retail'],
  [/^\/(platforms|afripulse)(\/|$)/, 'platforms'],
  [/^\/private-clients(\/|$)/, 'private'],
];

export function pathForUrl(pathname: string): PathKey | null {
  for (const [re, key] of RULES) if (re.test(pathname)) return key;
  return null;
}

/** Fit Finder result keys → path keys. */
export const FIT_TO_PATH: Record<string, PathKey> = {
  jobsite: 'ai',
  leadengine: 'ai',
  marketlock: 'ai',
  cre: 'cre',
  political: 'political',
  private: 'private',
  retail: 'retail',
  platform: 'platforms',
};

export interface PathMemory {
  key: PathKey;
  /** Last time this path was touched (ms). */
  at: number;
  visits: number;
  /** Set when the Fit Finder produced the match, e.g. "Lead Engine". */
  system?: string;
}

const KEY = 'ics_path';

export function readPath(): PathMemory | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const m = JSON.parse(raw) as PathMemory;
    return m && m.key in PATHS ? m : null;
  } catch {
    return null;
  }
}

export function rememberPath(key: PathKey, extra: { system?: string } = {}) {
  try {
    const prev = readPath();
    const next: PathMemory = {
      key,
      at: Date.now(),
      visits: prev && prev.key === key ? prev.visits + 1 : 1,
      system: extra.system ?? (prev && prev.key === key ? prev.system : undefined),
    };
    localStorage.setItem(KEY, JSON.stringify(next));
    // A new path un-dismisses the bar.
    if (!prev || prev.key !== key) localStorage.removeItem(KEY + '_dismissed');
  } catch {
    /* storage unavailable: the site simply doesn't remember */
  }
}

export function forgetPath() {
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(KEY + '_dismissed');
  } catch {
    /* ignore */
  }
}

export function dismissPathBar() {
  try {
    const m = readPath();
    if (m) localStorage.setItem(KEY + '_dismissed', m.key);
  } catch {
    /* ignore */
  }
}

export function pathBarDismissed(): boolean {
  try {
    const m = readPath();
    return !!m && localStorage.getItem(KEY + '_dismissed') === m.key;
  } catch {
    return true;
  }
}
