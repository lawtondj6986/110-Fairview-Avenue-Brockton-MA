/**
 * Generate /answers-index.json after every build — the brain behind "Ask ICS".
 *
 * Every FAQ on the site is already emitted as FAQPage JSON-LD, and published
 * pricing as an OfferCatalog. This walks the finished HTML, collects every
 * question/answer pair plus one synthetic "what does X cost?" per offering,
 * and writes a compact index the ⌘K palette can answer questions from — in
 * the browser, with no backend. Rebuilt from dist on each build, so it can
 * never say something the site doesn't.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name === 'index.html') out.push(p);
  }
  return out;
}

const decode = (s) =>
  String(s)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const fmt = (n) => '$' + Number(n).toLocaleString('en-US');

export function generateAnswers(distDir) {
  const entries = [];
  const seen = new Set();
  let offers = null;

  for (const file of walk(distDir)) {
    const rel = relative(distDir, file).split(sep).join('/');
    const path = '/' + rel.replace(/index\.html$/, '');
    if (path === '/404/' || path.startsWith('/og/')) continue;
    const html = readFileSync(file, 'utf8');
    const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? path).split('|')[0].trim();

    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      let obj;
      try {
        obj = JSON.parse(m[1]);
      } catch {
        continue;
      }
      const nodes = Array.isArray(obj) ? obj : [obj];
      for (const node of nodes) {
        if (node['@type'] === 'FAQPage' && Array.isArray(node.mainEntity)) {
          for (const qa of node.mainEntity) {
            const q = decode(qa.name || '');
            const a = decode(qa.acceptedAnswer?.text || '');
            if (!q || !a) continue;
            const key = q.toLowerCase();
            if (seen.has(key)) continue;
            seen.add(key);
            entries.push({ q, a, u: path, p: title });
          }
        }
        if (!offers && node.hasOfferCatalog?.itemListElement) offers = node.hasOfferCatalog.itemListElement;
      }
    }
  }

  // Published pricing, phrased the way people ask for it.
  for (const o of offers || []) {
    const name = o.itemOffered?.name || '';
    const ps = o.priceSpecification || {};
    if (!name || ps.minPrice == null) continue;
    const short = name.split(' — ')[0];
    const per = ps['@type'] === 'UnitPriceSpecification' ? ' per month' : '';
    const a = `${short} is ${fmt(ps.minPrice)}–${fmt(ps.maxPrice)}${per}${o.description ? `, ${o.description}` : ''}. Pricing is published, scoped in writing, and backed by the guarantees page.`;
    const u = (o.url || '').replace(/^https?:\/\/[^/]+/, '') || '/pricing/';
    for (const q of [`What does ${short} cost?`, `How much is ${short}?`]) {
      const key = q.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push({ q, a, u, p: 'Published pricing' });
    }
  }

  const out = JSON.stringify(entries);
  writeFileSync(join(distDir, 'answers-index.json'), out, 'utf8');
  return { answers: entries.length, bytes: Buffer.byteLength(out) };
}
