#!/usr/bin/env node
/**
 * Browser smoke test against the built site. Starts `astro preview`, then for a
 * sample of pages at phone and desktop widths checks:
 *   - no console errors and no failed same-origin requests
 *   - no horizontal page scroll
 *   - the non-affiliation notice is visible
 *   - every citation link lands on a reference, and every reference links back
 *   - the navigation opens on a phone, the timeline filter works, glossary filter and search work
 *   - text and background keep readable contrast for body copy
 * Run after `npm run build`:  node scripts/smoke.mjs [--all]
 */
import { spawn } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = fileURLToPath(new URL('..', import.meta.url));
const PORT = 4398;
const base = `http://localhost:${PORT}`;
const all = process.argv.includes('--all');

if (!existsSync(root + 'dist/sitemap-0.xml')) { console.error('Build first: npm run build'); process.exit(1); }
const urls = [...readFileSync(root + 'dist/sitemap-0.xml', 'utf8').matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1]);

// The core pages always; a sample of the generated ones unless --all.
const core = urls.filter((u) => u.split('/').filter(Boolean).length <= 1);
const generated = urls.filter((u) => !core.includes(u));
const sample = all ? generated : ['glossary', 'law', 'guides', 'sources'].flatMap((s) => generated.filter((u) => u.startsWith(`/${s}/`)).filter((_, i, a) => i === 0 || i === Math.floor(a.length / 2) || i === a.length - 1));
const targets = [...core, ...sample];

const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { cwd: root, stdio: 'ignore' });
const stop = () => { try { server.kill(); } catch {} };
process.on('exit', stop);
for (let i = 0; i < 40; i++) {
  try { if ((await fetch(base)).ok) break; } catch {}
  await new Promise((r) => setTimeout(r, 250));
}

const problems = [];
const fail = (where, msg) => problems.push(`${where}  ${msg}`);
const browser = await chromium.launch();

for (const [label, viewport] of [['phone', { width: 390, height: 800 }], ['desktop', { width: 1280, height: 900 }]]) {
  const ctx = await browser.newContext({ viewport, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  let current = '';
  page.on('console', (m) => { if (m.type() === 'error') fail(`${label} ${current}`, `console error: ${m.text().slice(0, 120)}`); });
  page.on('pageerror', (e) => fail(`${label} ${current}`, `page error: ${e.message.slice(0, 120)}`));
  page.on('response', (r) => { if (r.url().startsWith(base) && r.status() >= 400) fail(`${label} ${current}`, `${r.status()} for ${r.url().replace(base, '')}`); });

  for (const url of targets) {
    current = url;
    await page.goto(base + url, { waitUntil: 'load' });
    const where = `${label} ${url}`;

    const r = await page.evaluate(() => {
      const notice = document.querySelector('.notice');
      const cites = [...document.querySelectorAll('sup.cite a')];
      const refs = [...document.querySelectorAll('.refs li')];
      const lum = (c) => { const [r, g, b] = c.match(/\d+(\.\d+)?/g).slice(0, 3).map((v) => { v = v / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
      // Body copy only: skip the eyebrow, lede and small print.
      const p = document.querySelector('article.prose p:not([class])') ?? document.querySelector('article.prose');
      const fg = p ? lum(getComputedStyle(p).color) : 0, bg = lum(getComputedStyle(document.body).backgroundColor);
      return {
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        notice: Boolean(notice && notice.getBoundingClientRect().height > 0 && /Not affiliated/.test(notice.textContent)),
        h1: document.querySelectorAll('h1').length,
        brokenCites: cites.filter((a) => !document.querySelector(a.getAttribute('href'))).length,
        orphanRefs: refs.filter((li) => ![...li.querySelectorAll('.back a')].every((a) => document.querySelector(a.getAttribute('href')))).length,
        refsWithoutCite: refs.length > 0 && cites.length === 0,
        contrast: (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05),
        smallText: [...document.querySelectorAll('main p, main li, main td')].filter((e) => parseFloat(getComputedStyle(e).fontSize) < 12).length,
      };
    });
    if (r.overflow) fail(where, 'page scrolls horizontally');
    if (!r.notice) fail(where, 'non-affiliation notice not visible');
    if (r.h1 !== 1) fail(where, `${r.h1} h1 elements`);
    if (r.brokenCites) fail(where, `${r.brokenCites} citation link(s) with no matching reference`);
    if (r.orphanRefs) fail(where, `${r.orphanRefs} reference(s) with a broken back-link`);
    if (r.refsWithoutCite) fail(where, 'reference list present but nothing cites it');
    if (r.contrast < 7) fail(where, `body text contrast ${r.contrast.toFixed(1)}:1 is below 7:1`);
    if (r.smallText) fail(where, `${r.smallText} text element(s) smaller than 12px`);
  }

  // ---- Interactions
  current = '/ (nav)';
  await page.goto(base + '/');
  if (label === 'phone') {
    if (await page.locator('.nav ul').isVisible()) fail('phone /', 'navigation should start collapsed');
    await page.click('.nav summary');
    if (!(await page.locator('.nav ul a').first().isVisible())) fail('phone /', 'navigation did not open');
  } else if (!(await page.locator('.nav ul a').first().isVisible())) fail('desktop /', 'navigation not visible');

  current = '/program-for-evolutionary-dynamics/ (timeline)';
  await page.goto(base + '/program-for-evolutionary-dynamics/');
  const total = await page.locator('.timeline > li').count();
  await page.click('[data-filter="funding"]');
  const shown = await page.locator('.timeline > li:visible').count();
  if (!(shown > 0 && shown < total)) fail(label, `timeline filter showed ${shown} of ${total}`);
  await page.click('[data-filter="all"]');
  if ((await page.locator('.timeline > li:visible').count()) !== total) fail(label, 'timeline "All" did not restore every event');

  current = '/glossary/ (filter)';
  await page.goto(base + '/glossary/');
  const terms = await page.locator('[data-term]').count();
  if (terms) {
    await page.fill('#gq', 'consent');
    const hits = await page.locator('[data-term]:visible').count();
    if (!(hits > 0 && hits < terms)) fail(label, `glossary filter showed ${hits} of ${terms}`);
  }

  current = '/search/';
  await page.goto(base + '/search/?q=clery');
  await page.waitForFunction(() => !/Type at least/.test(document.getElementById('status').textContent), null, { timeout: 5000 }).catch(() => {});
  if ((await page.locator('#results li').count()) === 0) fail(label, 'search for "clery" returned nothing');

  await ctx.close();
}

await browser.close();
stop();
console.log(`Smoke-tested ${targets.length} pages at two widths.`);
if (problems.length) { console.error(`\n${problems.length} problem(s):\n` + [...new Set(problems)].map((p) => '  ' + p).join('\n')); process.exit(1); }
console.log('No problems found.');
