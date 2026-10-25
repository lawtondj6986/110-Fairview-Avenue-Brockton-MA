import { expect, test } from '@playwright/test';

test('emergency guide works offline after one visit (service worker)', async ({ page, context, isMobile }) => {
  test.skip(isMobile, 'one run is enough');
  await page.goto('/ht');
  await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.ready;
    return reg.active?.state;
  });
  // Wait until every emergency page has been precached.
  await expect
    .poll(async () => page.evaluate(async () => (await caches.keys()).length && (await (await caches.open((await caches.keys())[0]!)).keys()).length), {
      timeout: 15_000,
    })
    .toBeGreaterThan(5);
  await context.setOffline(true);
  await page.goto('/ht/emergency');
  await expect(page.getByTestId('call-emergency')).toBeVisible();
  // Any page offline falls back to the emergency guide in the same language.
  await page.goto('/ht/contact');
  await expect(page.getByTestId('call-emergency')).toBeVisible();
  await context.setOffline(false);
});

test('PWA manifest is valid', async ({ request }) => {
  const res = await request.get('/manifest.webmanifest');
  expect(res.ok()).toBe(true);
  const json = await res.json();
  expect(json.name).toBe('Meridian Immigration Group');
  expect(json.icons.length).toBeGreaterThan(0);
});
