import type { APIRoute } from 'astro';
import { claims } from '../data/claims';
export const GET: APIRoute = () =>
  new Response(JSON.stringify(claims.map((c) => ({ ...c, checked: c.checked ?? null })), null, 2), { headers: { 'Content-Type': 'application/json' } });
