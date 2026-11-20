#!/usr/bin/env node
/**
 * Checks the built site in dist/ without a browser:
 *   - every internal link resolves to a built page or file
 *   - every in-page and cross-page #anchor exists
 *   - every page has exactly one <h1>, a <title>, a meta description and a canonical link
 *   - every page carries the non-affiliation notice
 *   - no unprocessed citation markers remain
 *   - ids are unique within a page
 * Run after `npm run build`. Exits 1 on any failure.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
if (!existsSync(dist)) { console.error('No dist/ folder. Run `npm run build` first.'); process.exit(1); }

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const files = walk(dist);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const toUrl = (f) => '/' + relative(dist, f).replace(/\\/g, '/').replace(/index\.html$/, '');
const built = new Set(files.map((f) => '/' + relative(dist, f).replace(/\\/g, '/')));

const pages = new Map(); // url -> { ids, html }
for (const f of htmlFiles) {
  const html = readFileSync(f, 'utf8');
  pages.set(toUrl(f), { html, ids: new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])) });
}

const problems = [];
const fail = (url, msg) => problems.push(`${url}  ${msg}`);
let linkCount = 0;

for (const [url, { html, ids }] of pages) {
  const is404 = url === '/404.html';

  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) fail(url, `has ${h1} <h1> elements`);
  if (!/<title>[^<]{5,}<\/title>/.test(html)) fail(url, 'missing or empty <title>');
  if (!/<meta name="description" content="[^"]{20,}"/.test(html)) fail(url, 'missing or short meta description');
  if (!/<link rel="canonical" href="https:\/\//.test(html)) fail(url, 'missing canonical link');
  if (!/Not affiliated with, endorsed by, or sponsored by Harvard University/.test(html)) fail(url, 'missing non-affiliation notice');
  if (/data-cite="/.test(html)) fail(url, 'unprocessed citation marker');
  if (/\[@[a-z0-9-]+\]/.test(html.replace(/<pre[\s\S]*?<\/pre>/g, ''))) fail(url, 'unprocessed [@citation] token');
  if (!/<html lang="en"/.test(html)) fail(url, 'missing lang attribute');

  const allIds = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = allIds.filter((id, i) => allIds.indexOf(id) !== i);
  if (dupes.length) fail(url, `duplicate ids: ${[...new Set(dupes)].slice(0, 5).join(', ')}`);

  for (const m of html.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/g)) fail(url, `image without alt: ${m[0].slice(0, 60)}`);

  for (const m of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    linkCount++;
    const [path, hash] = href.split('#');
    if (path === '' && hash !== undefined) {
      if (hash && !ids.has(decodeURIComponent(hash))) fail(url, `broken in-page anchor #${hash}`);
      continue;
    }
    if (!path.startsWith('/')) { fail(url, `relative link "${href}" (use a root-relative path)`); continue; }
    const clean = path.split('?')[0];
    const target = pages.get(clean) ?? pages.get(clean.endsWith('/') ? clean : clean + '/');
    if (target) {
      if (!clean.endsWith('/') && !clean.includes('.')) fail(url, `link "${href}" is missing its trailing slash`);
      if (hash && !target.ids.has(decodeURIComponent(hash))) fail(url, `broken anchor ${href}`);
    } else if (!built.has(clean) && !is404) {
      fail(url, `broken link ${href}`);
    }
  }
}

// Every page should be reachable from at least one other page.
const linked = new Set();
for (const [, { html }] of pages) for (const m of html.matchAll(/\shref="(\/[^"#?]*)/g)) linked.add(m[1]);
for (const url of pages.keys()) {
  if (url === '/' || url === '/404.html') continue;
  if (!linked.has(url)) fail(url, 'orphan page: nothing links to it');
}

console.log(`Checked ${pages.size} pages and ${linkCount} internal links.`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n` + problems.map((p) => '  ' + p).join('\n'));
  process.exit(1);
}
console.log('No problems found.');
