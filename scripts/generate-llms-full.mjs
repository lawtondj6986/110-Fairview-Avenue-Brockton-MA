/**
 * Generate /llms-full.txt after every build.
 *
 * llms.txt (hand-written) is the guide; llms-full.txt is its companion from the
 * same spec: the full textual substance of every page in one plain-text file, so
 * an answer engine can ingest the whole site in a single fetch. It is rebuilt
 * from the finished HTML on each build, so it can never drift from the site.
 *
 * Zero dependencies: a few regexes over static HTML we control.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SITE_URL = 'https://icsgroup.ai';
const MAX_BODY_CHARS = 7000; // per page; keeps the file useful, not bloated
const SKIP = new Set(['/404/']);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name === 'index.html') out.push(p);
  }
  return out;
}

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)));

function textOf(html) {
  // Prefer the page's main content; fall back to body.
  const main = html.match(/<main[\s>][\s\S]*?<\/main>/i)?.[0] ?? html.match(/<body[\s>][\s\S]*?<\/body>/i)?.[0] ?? html;
  const stripped = main
    .replace(/<(script|style|svg|noscript|template|header|footer|nav|form)\b[\s\S]*?<\/\1>/gi, ' ')
    // Keep headings legible as line breaks so the text reads in order.
    .replace(/<\/(h1|h2|h3|h4|p|li|tr|dt|dd|blockquote|pre)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ');
  return decode(stripped)
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
}

export function generateLlmsFull(distDir) {
  const files = walk(distDir);
  const pages = [];
  for (const file of files) {
    const rel = relative(distDir, file).split(sep).join('/');
    const path = '/' + rel.replace(/index\.html$/, '');
    if (SKIP.has(path) || path.startsWith('/og/')) continue;
    const html = readFileSync(file, 'utf8');
    const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? path).trim();
    const description = decode(html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? '').trim();
    let body = textOf(html);
    if (body.length > MAX_BODY_CHARS) body = body.slice(0, MAX_BODY_CHARS).replace(/\s+\S*$/, '') + ' …';
    pages.push({ path, title, description, body });
  }
  pages.sort((a, b) => (a.path === '/' ? -1 : b.path === '/' ? 1 : a.path.localeCompare(b.path)));

  const header = [
    '# Innovative Commercial Strategies (ICS) — full site text',
    '',
    `> Companion to ${SITE_URL}/llms.txt. The complete textual content of every public page on ${SITE_URL}, regenerated at every build (${new Date().toISOString().slice(0, 10)}). ${pages.length} pages.`,
    '',
    'Commercial real estate advisory, AI revenue systems, retail platforms, commercial intelligence (OSINT), and political research for the South Shore of Massachusetts. Founder: Daniel Lawton, Brockton, MA. Phone (508) 942-8259. Published pricing, written guarantees, free tools.',
    '',
    '---',
    '',
  ].join('\n');

  const sections = pages.map((p) =>
    [`## ${p.title}`, `URL: ${SITE_URL}${p.path}`, p.description ? `\n${p.description}` : '', '', p.body, '', '---', ''].join('\n')
  );

  const out = header + sections.join('\n');
  writeFileSync(join(distDir, 'llms-full.txt'), out, 'utf8');
  return { pages: pages.length, bytes: Buffer.byteLength(out) };
}
