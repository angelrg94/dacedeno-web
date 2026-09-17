import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('all sections hydrate without errors and assets load', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Comer bien.');
  for (const id of [
    'inicio',
    'servicios',
    'programas',
    'metodo',
    'agenda',
    'testimonios',
    'contacto',
  ])
    await expect(page.locator('#' + id)).toBeVisible();
  await page.locator('app-method').scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator('img')
        .evaluateAll((imgs) => imgs.every((i) => i.complete && i.naturalWidth > 0)),
    )
    .toBe(true);
  expect(errors).toEqual([]);
  expect(await page.locator('a[href="#"],input[type="email"]').count()).toBe(0);
});
test('brand favicon assets are declared and served', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('link[rel="icon"][sizes="32x32"]')).toHaveAttribute(
    'href',
    '/favicon-32x32.png',
  );
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
    'href',
    '/apple-touch-icon.png',
  );
  for (const asset of ['/favicon.ico', '/favicon-32x32.png', '/apple-touch-icon.png']) {
    const response = await request.get(asset);
    expect(response.status(), `${asset} should be served`).toBe(200);
  }
});
for (const width of [320, 390, 768, 1024, 1440])
  test(`layout and accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
    await page.screenshot({ path: `test-results/home-${width}.png`, fullPage: true });
  });
test('mobile navigation supports Escape and links from privacy', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/privacidad');
  const toggle = page.getByRole('button', { name: /menú/ });
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.getByRole('navigation').getByRole('link', { name: 'Servicios', exact: true }).click();
  await expect(page).toHaveURL('/#servicios');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
test('privacy and unknown route have real static responses', async ({ page, request }) => {
  expect((await request.get('/privacidad')).status()).toBe(200);
  expect((await request.get('/no-such-page')).status()).toBe(404);
  await page.goto('/no-such-page');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Página no encontrada');
  await page.getByRole('link', { name: 'Volver al inicio' }).click();
  await expect(page.locator('h1')).toContainText('Comer bien.');
});
test('booking requests Calendly on intent and keeps an external fallback', async ({ page }) => {
  let scriptRequests = 0;
  page.on('request', (request) => {
    if (request.url() === 'https://assets.calendly.com/assets/external/widget.js')
      scriptRequests += 1;
  });
  await page.goto('/');
  expect(scriptRequests).toBe(0);
  await page.locator('#booking-service').selectOption('nutrition');
  await page.locator('#booking-mode').selectOption('online');
  await page.getByRole('button', { name: 'Ver disponibilidad' }).click();
  await expect.poll(() => scriptRequests).toBe(1);
  await expect(page.locator('a.external-booking')).toHaveAttribute(
    'href',
    'https://calendly.com/cedenorojasd/30min',
  );
  await expect(page.locator('.calendly-embed iframe')).toBeVisible();
  const calendlyGap = await page.locator('.calendly-embed').evaluate((embed) => {
    const iframe = embed.querySelector('iframe');
    if (!iframe) return Number.POSITIVE_INFINITY;
    return iframe.getBoundingClientRect().top - embed.getBoundingClientRect().top;
  });
  expect(calendlyGap).toBeLessThan(2);
  expect(scriptRequests).toBe(1);
});
