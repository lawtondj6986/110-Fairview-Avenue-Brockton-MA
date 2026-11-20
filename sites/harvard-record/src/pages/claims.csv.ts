import type { APIRoute } from 'astro';
import { claims } from '../data/claims';
import { toCsv } from '../lib/export';
export const GET: APIRoute = () =>
  new Response(
    toCsv(['id', 'topic', 'claim', 'state', 'grade', 'sources', 'caveat', 'page', 'checked'],
      claims.map((c) => [c.id, c.topic, c.claim, c.state, c.grade, c.sources.join(' '), c.caveat, c.page, c.checked ?? 'pending'])),
    { headers: { 'Content-Type': 'text/csv; charset=utf-8' } });
