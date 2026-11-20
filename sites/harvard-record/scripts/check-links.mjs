#!/usr/bin/env node
/**
 * Checks that every external URL in the source register and in the reference
 * content still answers. Needs open network access, so run it on a machine
 * that can reach the public web (it is not part of `npm run check`).
 *
 *   node scripts/check-links.mjs                 check everything
 *   node scripts/check-links.mjs --sources       only the source register
 *   node scripts/check-links.mjs --json          machine-readable output
 *
 * A failed request is a prompt to look, not proof the page is gone: some
 * publishers refuse automated requests. Results are grouped accordingly.
 */
import { fileURLToPath } from 'node:url';
import { loadCollection } from './lib/frontmatter.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const args = new Set(process.argv.slice(2));
const CONCURRENCY = 6;
const TIMEOUT_MS = 20000;
const UA = 'Mozilla/5.0 (compatible; link-check)';

const { sources } = await import('../src/data/sources.ts');

const targets = new Map(); // url -> [where]
const add = (url, where) => { if (!targets.has(url)) targets.set(url, []); targets.get(url).push(where); };

for (const [id, s] of Object.entries(sources)) if (s.url) add(s.url, `source:${id}`);
if (!args.has('--sources')) {
  for (const name of ['glossary', 'law', 'guides']) {
    for (const e of loadCollection(root, name)) {
      for (const m of e.text.matchAll(/https:\/\/[^\s"')>\]]+/g)) add(m[0].replace(/[.,;]+$/, ''), `${name}/${e.file}`);
    }
  }
}

async function probe(url) {
  const attempt = async (method) => {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, { method, redirect: 'follow', signal: ctl.signal, headers: { 'User-Agent': UA, Accept: '*/*' } });
      return { status: res.status, finalUrl: res.url };
    } finally {
      clearTimeout(timer);
    }
  };
  try {
    let r = await attempt('HEAD');
    // Many servers mishandle HEAD; confirm with GET before reporting a failure.
    if (r.status >= 400) r = await attempt('GET');
    return r;
  } catch (err) {
    return { status: 0, error: err.name === 'AbortError' ? 'timeout' : (err.cause?.code ?? err.message) };
  }
}

const classify = (r) => {
  if (r.status >= 200 && r.status < 300) return 'ok';
  if ([401, 403, 405, 429, 451].includes(r.status)) return 'refused';   // exists, but will not serve a robot
  if (r.status === 404 || r.status === 410) return 'gone';
  if (r.status === 0) return 'unreachable';
  return 'error';
};

const queue = [...targets.keys()];
const results = [];
let done = 0;
async function worker() {
  for (;;) {
    const url = queue.shift();
    if (!url) return;
    const r = await probe(url);
    const moved = r.finalUrl && new URL(r.finalUrl).pathname !== new URL(url).pathname;
    results.push({ url, where: targets.get(url), ...r, verdict: classify(r), moved: Boolean(moved) });
    if (!args.has('--json')) process.stderr.write(`\r  checked ${++done}/${targets.size}`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
if (!args.has('--json')) process.stderr.write('\n');

if (args.has('--json')) {
  console.log(JSON.stringify(results, null, 2));
} else {
  const group = (v) => results.filter((r) => r.verdict === v);
  const show = (title, list, detail) => {
    if (!list.length) return;
    console.log(`\n${title} (${list.length})`);
    for (const r of list) console.log(`  ${detail(r)}  ${r.url}\n      used in: ${r.where.join(', ')}`);
  };
  console.log(`\n${group('ok').length} of ${results.length} links answered normally.`);
  show('GONE: replace or find an archived copy', group('gone'), (r) => r.status);
  show('ERROR: server error, retry later', group('error'), (r) => r.status);
  show('UNREACHABLE: no response', group('unreachable'), (r) => r.error);
  show('REFUSED: the site blocks automated checks, open these by hand', group('refused'), (r) => r.status);
  show('MOVED: answered at a different address, consider updating', results.filter((r) => r.verdict === 'ok' && r.moved), (r) => '->');
}
process.exit(results.some((r) => r.verdict === 'gone') ? 1 : 0);
