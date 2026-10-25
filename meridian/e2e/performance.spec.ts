import { expect, test } from '@playwright/test';

const BUDGET = 200 * 1024; // ≤ 200 KB JS on the critical path (compressed transfer)

for (const path of ['/ht', '/ht/emergency', '/en/contact']) {
  test(`JS budget: ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'load' });
    const bytes = await page.evaluate(() =>
      performance
        .getEntriesByType('resource')
        .filter((e) => (e as PerformanceResourceTiming).initiatorType === 'script' || e.name.endsWith('.js'))
        .reduce((sum, e) => sum + ((e as PerformanceResourceTiming).encodedBodySize || 0), 0),
    );
    console.log(`${path}: ${(bytes / 1024).toFixed(1)} KB JS`);
    expect(bytes).toBeLessThanOrEqual(BUDGET);
  });
}

test('no autoplay media and no third-party requests on load', async ({ page, baseURL }) => {
  const external: string[] = [];
  page.on('request', (r) => {
    if (!r.url().startsWith(baseURL!) && !r.url().startsWith('data:')) external.push(r.url());
  });
  await page.goto('/ht');
  await expect(page.locator('video[autoplay], audio[autoplay], iframe')).toHaveCount(0);
  expect(external).toEqual([]);
});
