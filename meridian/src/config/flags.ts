function flag(name: string): boolean {
  return process.env[name] === 'true';
}

/** Feature flags default to off. Toggle via Vercel environment variables. */
export const flags = {
  spp: flag('FEATURE_SPP'),
  assistant: flag('FEATURE_ASSISTANT'),
  /** Keep search engines out until launch (TODO_ placeholders are visible). */
  noindex: flag('SITE_NOINDEX'),
} as const;
