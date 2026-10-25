import type { IconName } from '@/components/Icon';

/** Practice areas (depth 2: /help → /help/{slug}). Full content arrives in Phase 2. */
export const AREAS = [
  { slug: 'family', key: 'family', icon: 'family' },
  { slug: 'green-card', key: 'greenCard', icon: 'card' },
  { slug: 'citizenship', key: 'citizenship', icon: 'citizenship' },
  { slug: 'protection', key: 'protection', icon: 'shield' },
  { slug: 'court', key: 'court', icon: 'court' },
] as const satisfies readonly { slug: string; key: string; icon: IconName }[];

export type Area = (typeof AREAS)[number];

export function findArea(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug);
}
