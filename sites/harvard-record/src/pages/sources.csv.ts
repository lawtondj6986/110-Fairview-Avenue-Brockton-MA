import type { APIRoute } from 'astro';
import { sources } from '../data/sources';
import { toCsv } from '../lib/export';
export const GET: APIRoute = () =>
  new Response(
    toCsv(['id', 'title', 'publisher', 'author', 'date', 'grade', 'topic', 'url', 'checked', 'note'],
      Object.entries(sources).map(([id, s]) => [id, s.title, s.publisher, s.author, s.date, s.grade, s.topic, s.url, s.checked ?? 'pending', s.note])),
    { headers: { 'Content-Type': 'text/csv; charset=utf-8' } });
