#!/usr/bin/env node
/**
 * Phase-gate screenshots at 360px (old Android) and 1280px (desktop).
 * Usage: pnpm screenshots <phase> [baseUrl]   (expects `pnpm start` running; default http://localhost:3100)
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const phase = process.argv[2];
if (!phase) {
  console.error('Usage: pnpm screenshots <phase> [baseUrl]');
  process.exit(1);
}
const base = process.argv[3] ?? 'http://localhost:3100';
const outDir = new URL(`../docs/screenshots/phase-${phase}/`, import.meta.url).pathname;
mkdirSync(outDir, { recursive: true });

const shots = [
  ['chooser', '/'],
  ['ht-home', '/ht'],
  ['ht-emergency', '/ht/emergency'],
  ['en-home', '/en'],
  ['en-emergency', '/en/emergency'],
  ['pt-help', '/pt/help'],
  ['kea-contact', '/kea/contact'],
  ['es-about', '/es/about'],
  ['es-404', '/es/no-existe'],
];

const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
for (const width of [360, 1280]) {
  const context = await browser.newContext({
    viewport: { width, height: width === 360 ? 740 : 800 },
    deviceScaleFactor: 1,
    isMobile: width === 360,
    hasTouch: width === 360,
  });
  const page = await context.newPage();
  for (const [name, path] of shots) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${outDir}${name}-${width}.png`, fullPage: true });
  }
  await context.close();
}
await browser.close();
console.log(`✓ ${shots.length * 2} screenshots → docs/screenshots/phase-${phase}/`);
