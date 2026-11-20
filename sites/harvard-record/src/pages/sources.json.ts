import type { APIRoute } from 'astro';
import { sources } from '../data/sources';
export const GET: APIRoute = () =>
  new Response(JSON.stringify(Object.entries(sources).map(([id, s]) => ({ id, ...s, checked: s.checked ?? null })), null, 2), { headers: { 'Content-Type': 'application/json' } });
