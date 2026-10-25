import { expect, test } from '@playwright/test';
import { LOCALES, PAGES } from './helpers';

test.describe('emergency path is sacred', () => {
  for (const locale of LOCALES) {
    for (const path of PAGES) {
      test(`${locale}${path || '/'} has emergency button, call link, attorney and disclaimer`, async ({ page }) => {
        await page.goto(`/${locale}${path}`);
        const header = page.getByTestId('header-emergency');
        await expect(header).toBeVisible();
        await expect(header).toHaveAttribute('href', `/${locale}/emergency`);
        await expect(page.getByTestId('attorney-line').first()).toContainText('Attorney Mark Lawton, Esq.');
        await expect(page.getByTestId('attorney-line').first()).toContainText('157 Belmont Street, Brockton, MA 02301');
        await expect(page.getByTestId('disclaimer').first()).toBeAttached();
        await expect(page.locator('a[href^="tel:"]').first()).toBeAttached();
      });
    }
  }

  test('two taps to a lawyer at 360px: sticky Call is on screen without scrolling', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile bar is a phone feature');
    await page.goto('/ht/help/court');
    const call = page.getByTestId('mobile-call');
    await expect(call).toBeInViewport();
    await expect(call).toHaveAttribute('href', /^tel:/);
    const box = await call.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    // Still on screen after scrolling to the bottom.
    await page.mouse.wheel(0, 5000);
    await expect(call).toBeInViewport();
  });

  test('emergency guide reachable in one tap from the header', async ({ page }) => {
    await page.goto('/pt/about');
    await page.getByTestId('header-emergency').click();
    await expect(page).toHaveURL(/\/pt\/emergency$/);
    await expect(page.getByTestId('call-emergency')).toBeVisible();
  });

  test('header emergency button is above the fold on every viewport', async ({ page }) => {
    await page.goto('/kea');
    await expect(page.getByTestId('header-emergency')).toBeInViewport();
  });

  test('home page has six large tiles', async ({ page }) => {
    await page.goto('/en');
    const tiles = page.locator('section[aria-labelledby="tiles-heading"] li a');
    await expect(tiles).toHaveCount(6);
    for (const box of await Promise.all((await tiles.all()).map((t) => t.boundingBox()))) {
      expect(box!.height).toBeGreaterThanOrEqual(100);
    }
  });
});
