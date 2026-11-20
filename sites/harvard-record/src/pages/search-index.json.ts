import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { sources } from '../data/sources';
import { claims } from '../data/claims';
import { faq } from '../data/faq';
import { nav } from '../config';

/** Compact search index. t = title, u = url, k = kind, d = description, x = extra lowercase text. */
export const GET: APIRoute = async () => {
  const [glossary, law, guides] = await Promise.all([getCollection('glossary'), getCollection('law'), getCollection('guides')]);
  const plain = (s?: string) => (s ?? '').replace(/[#*_`>\[\]()]/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
  const docs = [
    ...nav.map((n) => ({ t: n.long ?? n.label, u: n.href, k: 'Page', d: '', x: '' })),
    ...glossary.map((e) => ({ t: e.data.term, u: `/glossary/${e.id}/`, k: 'Glossary', d: e.data.short, x: plain(e.data.aliases.join(' ') + ' ' + e.body).slice(0, 1500) })),
    ...law.map((e) => ({ t: e.data.title, u: `/law/${e.id}/`, k: 'Law', d: e.data.short, x: plain(e.data.citation + ' ' + e.body).slice(0, 2500) })),
    ...guides.map((e) => ({ t: e.data.title, u: `/guides/${e.id}/`, k: 'Guide', d: e.data.description, x: plain(e.body).slice(0, 2500) })),
    ...claims.map((c) => ({ t: `${c.id}: ${c.claim}`, u: `/ledger/#${c.id}`, k: 'Claim', d: c.caveat ?? '', x: c.topic.toLowerCase() })),
    ...Object.entries(sources).map(([id, s]) => ({ t: s.title, u: `/sources/${id}/`, k: 'Source', d: `${s.publisher}. Grade ${s.grade}.`, x: plain(s.note) })),
    ...faq.flatMap((s) => s.items).map((i) => ({ t: i.q, u: '/faq/', k: 'Question', d: i.a.replace(/<[^>]+>/g, '').slice(0, 180), x: '' })),
  ];
  return new Response(JSON.stringify(docs), { headers: { 'Content-Type': 'application/json' } });
};
