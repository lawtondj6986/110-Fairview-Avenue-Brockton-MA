#!/usr/bin/env node
/**
 * Builds the review pack: one self-contained, printable HTML file holding every
 * page that makes claims about named people or institutions, in reading order,
 * with numbered paragraphs so a reviewer can refer to "PED ¶14".
 *
 *   npm run build && node scripts/review-pack.mjs     writes docs/review-pack.html
 *
 * It is for a lawyer or editor reading before publication. It is generated
 * from the built site, so it always matches what would be published. It is
 * never deployed.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
if (!existsSync(dist)) { console.error('Build first: npm run build'); process.exit(1); }

const { sources } = await import('../src/data/sources.ts');
const { claims } = await import('../src/data/claims.ts');
const { site } = await import('../src/config.ts');

/** Pages in the order a reviewer should read them, with a short code for paragraph references. */
export const PAGES = [
  ['HOME', '/'],
  ['PED', '/program-for-evolutionary-dynamics/'],
  ['HMS', '/harvard-medical-school/'],
  ['DON', '/donor-pathways/'],
  ['DNA', '/dna-genetics/'],
  ['SAFE', '/campus-safety/'],
  ['COMP', '/comparison/'],
  ['NAMED', '/named/'],
  ['BRIEF', '/briefing/'],
  ['LEDGER', '/ledger/'],
  ['FAQ', '/faq/'],
  ['ABOUT', '/about/'],
  ['METHOD', '/methodology/'],
];

/** Pulls the title, the article body and the reference list out of a built page. */
export function extract(html) {
  const title = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]+>/g, '').trim() ?? '';
  const lede = html.match(/<p class="lede"[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? '';
  const article = html.match(/<article class="prose"[^>]*>([\s\S]*?)<\/article>/)?.[1] ?? '';
  const refs = html.match(/<section class="refs[^"]*"[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? '';
  return { title, lede, article, refs };
}

/**
 * Makes one page's fragment safe to sit beside others: prefixes every id and
 * in-page link with the page code, turns site links into plain text
 * references, drops scripts and interactive controls, and numbers paragraphs,
 * list items and table rows.
 */
export function prepare(fragment, code) {
  let n = 0;
  return fragment
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<form[\s\S]*?<\/form>/g, '')
    .replace(/<button[\s\S]*?<\/button>/g, '')
    .replace(/<div class="tl-filter"[\s\S]*?<\/div>/g, '')
    .replace(/\sid="([^"]+)"/g, (_m, id) => ` id="${code}-${id}"`)
    .replace(/\shref="#([^"]+)"/g, (_m, id) => ` href="#${code}-${id}"`)
    .replace(/<a\b([^>]*)\shref="\/[^"]*"([^>]*)>([\s\S]*?)<\/a>/g, (_m, _a, _b, text) => `<span class="xref">${text}</span>`)
    .replace(/\shidden(="")?/g, '')
    .replace(/<(p|li|tr)(\s[^>]*)?>/g, (m, tag, attrs = '') => {
      if (/class="[^"]*(visually-hidden|callout-title|src-|b-meta)/.test(attrs)) return m;
      n += 1;
      return `<${tag}${attrs} data-n="${code} ¶${n}">`;
    });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const css = readFileSync(join(root, 'src', 'styles', 'global.css'), 'utf8')
    .replace(/@media \(prefers-color-scheme: dark\) \{\s*:root \{[\s\S]*?\}\s*\}/g, ''); // always print on white
  const srcTotal = Object.keys(sources).length;
  const srcChecked = Object.values(sources).filter((s) => s.checked).length;
  const clChecked = claims.filter((c) => c.checked).length;
  const built = new Date().toISOString().slice(0, 10);

  const sections = PAGES.map(([code, path]) => {
    const file = join(dist, path, 'index.html');
    if (!existsSync(file)) throw new Error(`Missing built page ${path}`);
    const p = extract(readFileSync(file, 'utf8'));
    return { code, path, ...p, body: prepare(p.article, code), refsHtml: p.refs ? prepare(p.refs, code) : '' };
  });
  const paragraphs = sections.reduce((n, s) => n + (s.body.match(/data-n="/g) ?? []).length, 0);

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Review pack: ${site.name}</title>
<style>${css}
body{background:#fff;font-size:15px}
.pack{max-width:52rem;margin:0 auto;padding:2rem 1.5rem 4rem}
.pack .prose>*{max-width:none}
.cover{border:2px solid var(--ink);padding:1.5rem;margin-bottom:2rem}
.cover h1{font-size:1.8rem;margin-bottom:.5rem}
.cover table{font-size:.9rem;margin-top:1rem}
.pack-toc{columns:2;font-family:var(--sans);font-size:.9rem;padding-left:1.2rem}
.pack section.page{border-top:3px solid var(--ink);margin-top:3rem;padding-top:1rem}
.pack .code{font-family:var(--sans);font-size:.75rem;letter-spacing:.1em;font-weight:700;color:var(--accent)}
[data-n]{position:relative}
[data-n]::before{content:attr(data-n);position:absolute;left:-5.2rem;width:4.6rem;text-align:right;font-family:var(--sans);font-size:.62rem;color:#888;top:.35em;white-space:nowrap}
tr[data-n]::before{position:static;display:table-cell;padding:.7rem .3rem;vertical-align:top;width:auto}
.xref{text-decoration:underline dotted #999}
.notes{border:1px dashed #999;min-height:5rem;margin:1.5rem 0;padding:.5rem;font-family:var(--sans);font-size:.8rem;color:#777}
@media (max-width:70rem){[data-n]::before{position:static;display:block;text-align:left;width:auto}}
@media print{.pack{padding:0;max-width:none}[data-n]::before{position:static;display:inline;margin-right:.4rem}section.page{break-before:page}.table-wrap{overflow:visible}}
</style></head>
<body><div class="pack">
<div class="cover">
  <p class="code">PRE-PUBLICATION REVIEW PACK · NOT FOR DISTRIBUTION</p>
  <h1>${site.name}</h1>
  <p>Every page that makes statements about named people or institutions, exactly as it would be published, with numbered paragraphs. Refer to a passage by its code and number, for example “PED ¶14”.</p>
  <table><tbody>
    <tr><th>Generated</th><td>${built}</td></tr>
    <tr><th>Pages</th><td>${sections.length}</td></tr>
    <tr><th>Numbered passages</th><td>${paragraphs}</td></tr>
    <tr><th>Sources checked against originals</th><td>${srcChecked} of ${srcTotal}</td></tr>
    <tr><th>Ledger claims checked</th><td>${clChecked} of ${claims.length}</td></tr>
    <tr><th>Intended domain</th><td>${site.url.replace('https://', '')}</td></tr>
  </tbody></table>
  ${srcChecked < srcTotal ? '<p><strong>Not every source has been checked against its original document.</strong> Review of wording can proceed, but figures and quotations are provisional until the status line above reads complete.</p>' : ''}
  <p>Questions for the reviewer are in <code>docs/LAUNCH-CHECKLIST.md</code>, section 3: the pages below, the domain name and use of the institution’s name, and the disclaimer wording.</p>
</div>
<h2>Contents</h2>
<ol class="pack-toc">${sections.map((s) => `<li><a href="#pack-${s.code}">${s.code}: ${s.title}</a></li>`).join('')}</ol>
${sections.map((s) => `<section class="page" id="pack-${s.code}">
  <p class="code">${s.code} · ${site.url}${s.path}</p>
  <h1>${s.title}</h1>
  ${s.lede ? `<p class="lede" data-n="${s.code} lede">${s.lede}</p>` : ''}
  <div class="prose">${s.body}</div>
  ${s.refsHtml ? `<div class="refs prose">${s.refsHtml}</div>` : ''}
  <div class="notes">Reviewer’s notes on ${s.code}:</div>
</section>`).join('\n')}
<section class="page"><h1>Disclaimer wording</h1>
<p data-n="DISC ¶1"><strong>Short form (top of every page):</strong> ${site.disclaimerShort}</p>
<p data-n="DISC ¶2"><strong>Long form (footer and About page):</strong> ${site.disclaimerLong}</p>
<div class="notes">Reviewer’s notes on the disclaimer, the site name and the domain:</div></section>
</div></body></html>
`;
  writeFileSync(join(root, 'docs', 'review-pack.html'), html);
  console.log(`Review pack: ${sections.length} pages, ${paragraphs} numbered passages -> docs/review-pack.html (${Math.round(html.length / 1024)} KB)`);
}
