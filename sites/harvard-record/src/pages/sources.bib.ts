import type { APIRoute } from 'astro';
import { sources } from '../data/sources';
import { toBibtex } from '../lib/export';
export const GET: APIRoute = () =>
  new Response(Object.entries(sources).map(([id, s]) => toBibtex(id, s)).join('\n\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
