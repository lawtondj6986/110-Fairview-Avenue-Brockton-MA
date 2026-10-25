import { expect, test } from '@playwright/test';
import { LOCALES } from './helpers';

test.describe('language chooser', () => {
  test('first visit shows the full-screen chooser with native names and no flags', async ({ page }) => {
    await page.goto('/');
    const options = page.getByTestId('language-options').getByRole('link');
    await expect(options).toHaveText([/Kreyòl Ayisyen/, /Português/, /Kriolu Kabuverdianu/, /Español/, /English/]);
    await expect(page.locator('img')).toHaveCount(0);
    // The emergency path is not blocked by the chooser.
    await expect(page.getByTestId('call-emergency')).toBeVisible();
    await expect(page.getByTestId('attorney-line')).toBeVisible();
  });

  test('choice persists in a cookie and / goes straight to that language next time', async ({ page, context }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Kreyòl Ayisyen/ }).click();
    await expect(page).toHaveURL(/\/ht$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ht');
    const cookie = (await context.cookies()).find((c) => c.name === 'NEXT_LOCALE');
    expect(cookie?.value).toBe('ht');
    await page.goto('/');
    await expect(page).toHaveURL(/\/ht$/);
  });

  test('language switcher changes language and keeps the page', async ({ page }) => {
    await page.goto('/en/contact');
    await page.locator('header summary').first().click();
    await page.getByRole('link', { name: 'Español' }).click();
    await expect(page).toHaveURL(/\/es\/contact$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  });
});

test.describe('localization', () => {
  for (const locale of LOCALES) {
    test(`${locale}: lang attribute and hreflang alternates`, async ({ page }) => {
      await page.goto(`/${locale}/about`);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      for (const l of LOCALES) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${l}"]`)).toHaveAttribute('href', new RegExp(`/${l}/about$`));
      }
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1);
    });
  }

  test('unreviewed legal page shows "English only for now" banner in the reader language', async ({ page }) => {
    await page.goto('/ht/emergency');
    await expect(page.getByTestId('english-only-banner')).toBeVisible();
    await expect(page.locator('article[lang="en"]')).toBeVisible();
    await page.goto('/en/emergency');
    await expect(page.getByTestId('english-only-banner')).toHaveCount(0);
  });

  test('unreviewed disclaimer shows the English original alongside the translation', async ({ page }) => {
    await page.goto('/pt');
    await expect(page.getByTestId('site-footer').locator('[lang="en"]')).toContainText('does not make you our client');
  });

  test('Cape Verdean Creole never shows English UI chrome', async ({ page }) => {
    await page.goto('/kea/about');
    const chrome = `${await page.locator('header').textContent()} ${await page.getByTestId('mobile-bar').textContent()}`;
    for (const english of ['Contact', 'About us', 'Get help', 'Emergency guide', 'Call us', 'Detained']) {
      expect(chrome).not.toContain(english);
    }
  });

  test('accented characters render in their own font', async ({ page }) => {
    await page.goto('/ht');
    const family = await page.locator('h1').evaluate((el) => getComputedStyle(el).fontFamily);
    expect(family).toMatch(/Lora/i);
  });

  test('unknown page shows a localized not-found page', async ({ page }) => {
    const res = await page.goto('/es/no-existe');
    expect(res?.status()).toBe(404);
    await expect(page.getByTestId('header-emergency')).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  });
});
