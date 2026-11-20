import type { APIRoute } from 'astro';
import { updates } from '../data/updates';
import { site } from '../config';
import { xmlEscape, rssDate } from '../lib/export';
export const GET: APIRoute = () => {
  const items = updates.map((u, i) => `    <item>
      <title>${xmlEscape(`${u.kind}: ${u.date}`)}</title>
      <link>${site.url}/updates/</link>
      <guid isPermaLink="false">${site.url}/updates/#${u.date}-${updates.length - i}</guid>
      <pubDate>${rssDate(u.date)}</pubDate>
      <description>${xmlEscape(u.text)}</description>
    </item>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xmlEscape(site.name)}: update log</title>
    <link>${site.url}/updates/</link>
    <description>Editions, updates and corrections. ${xmlEscape(site.disclaimerShort)}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
