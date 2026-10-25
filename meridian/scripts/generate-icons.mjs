#!/usr/bin/env node
// Renders public/icon.svg to the PNG sizes the PWA manifest and iOS need. Run after changing the logo.
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';

const svg = readFileSync(new URL('../public/icon.svg', import.meta.url), 'utf8');
const targets = [
  ['public/icon-192.png', 192],
  ['public/icon-512.png', 512],
  ['src/app/apple-icon.png', 180],
];
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
const page = await browser.newPage();
for (const [out, size] of targets) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<body style="margin:0;background:#14284B">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body>`);
  await page.screenshot({ path: new URL(`../${out}`, import.meta.url).pathname, omitBackground: false });
}
await browser.close();
console.log('icons written');
