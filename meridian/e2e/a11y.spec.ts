import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { LOCALES, PAGES } from './helpers';

const targets = [
  '/',
  ...PAGES.map((p) => `/en${p}`),
  ...PAGES.map((p) => `/ht${p}`),
  ...LOCALES.filter((l) => l !== 'en' && l !== 'ht').flatMap((l) => [`/${l}`, `/${l}/emergency`]),
];

for (const url of targets) {
  test(`axe: ${url} has no serious or critical violations`, async ({ page }) => {
    await page.goto(url);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    const blocking = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(blocking.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
  });
}

test('open menus are keyboard reachable and announce state', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile menu');
  await page.goto('/en');
  const menu = page.locator('header details').nth(1).locator('summary');
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('header details').nth(1)).toHaveAttribute('open', '');
  await expect(page.getByRole('link', { name: 'Contact' }).first()).toBeVisible();
});
