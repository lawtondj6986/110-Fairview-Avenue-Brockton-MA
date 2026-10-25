function flag(name: string): boolean {
  return process.env[name] === 'true';
}

/** Feature flags default to off. Toggle via Vercel environment variables. */
export const flags = {
  spp: flag('FEATURE_SPP'),
  assistant: flag('FEATURE_ASSISTANT'),
} as const;
