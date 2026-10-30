import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('all pages and detail routes load without browser errors or overflow', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  for (const route of [
    '/',
    '/profil',
    '/visi-misi',
    '/program',
    '/program/pendidikan-al-quran',
    '/guru',
    '/fasilitas',
    '/berita',
    '/berita/belajar-peduli-lingkungan',
    '/galeri',
    '/ppdb',
    '/kontak',
    '/halaman-tidak-ada',
    '/program/tidak-ada',
    '/berita/tidak-ada',
  ]) {
    await page.goto(route);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page).toHaveTitle(/MITARBIYAH ISLAMIYAH/);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
      route,
    ).toBeTruthy();
  }
  expect(errors).toEqual([]);
});

test('confirmed school identity and contact details are displayed', async ({ page }) => {
  const address =
    'Jl. Adi Sucipto RT. 02/08, Kelurahan Belendung, Kecamatan Benda, Kota Tangerang, Provinsi Banten 15123';

  await page.goto('/kontak');
  await expect(page.locator('.contact-cards').getByText(address, { exact: true })).toBeVisible();
  await expect(
    page.locator('.contact-cards').getByRole('link', { name: '085813136184', exact: true }),
  ).toHaveAttribute('href', 'tel:085813136184');
  await expect(page.locator('.map-placeholder')).toContainText(address);
  await expect(page.locator('.footer-contact')).toContainText(address);
  await expect(page.locator('.footer-contact')).toContainText('085813136184');
  await expect(page.locator('.information-layout > div > .muted')).toContainText(
    'Silakan hubungi nomor telepon resmi sekolah',
  );

  await page.goto('/profil');
  const identityRows = page.locator('.identity-table > div');
  await expect(identityRows.filter({ hasText: 'NPSN' })).toContainText('69727523');
  await expect(identityRows.filter({ hasText: 'NSM' })).toContainText('111236710052');
});

test('local responsive photographs resolve', async ({ page }) => {
  const failures: string[] = [];
  page.on('response', (response) => {
    if (response.url().includes('/images/') && response.status() >= 400)
      failures.push(response.url());
  });
  await page.goto('/galeri');
  await expect(page.locator('.gallery-item')).toHaveCount(7);
  const photos = page.locator('.gallery-item img');
  for (const photo of await photos.all()) {
    await photo.scrollIntoViewIfNeeded();
    await expect
      .poll(() => photo.evaluate((element) => (element as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
  }
  expect(failures).toEqual([]);
});

test('navigation works with keyboard and closes on route changes', async ({ page }, testInfo) => {
  await page.goto('/');
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Buka navigasi' }).click();
    const dialog = page.getByRole('dialog', { name: 'Navigasi situs' });
    await expect(dialog).toBeVisible();
    await dialog.getByRole('link', { name: 'Visi & Misi' }).click();
    await expect(dialog).toHaveCount(0);
    await expect(page).toHaveURL(/visi-misi/);
    await page.getByRole('button', { name: 'Buka navigasi' }).click();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
  } else {
    const trigger = page.getByRole('button', { name: 'Tentang Kami' });
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Tab');
    await expect(page.locator('#school-menu a').first()).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
    await trigger.click();
    await page.locator('#school-menu').getByRole('link', { name: 'Visi & Misi' }).click();
    await expect(page).toHaveURL(/visi-misi/);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  }
});

test('gallery filtering, arrow navigation, escape and focus restoration', async ({ page }) => {
  await page.goto('/galeri');
  await page.getByRole('button', { name: 'Keislaman', exact: true }).click();
  await expect(page.locator('.gallery-item')).toHaveCount(3);
  const opener = page.locator('.gallery-item').first();
  await opener.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Tutup pratinjau' })).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.lightbox-bottom')).toContainText('2 / 3');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Tutup pratinjau' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test('news search, category filters, pagination and article links work', async ({ page }) => {
  await page.goto('/berita');
  await expect(page.locator('.news-card')).toHaveCount(3);
  await page.getByRole('button', { name: 'Halaman 2', exact: true }).click();
  await expect(page.locator('.news-card')).toHaveCount(1);
  await page.getByRole('button', { name: 'Keislaman', exact: true }).click();
  await expect(page.locator('.news-card')).toHaveCount(2);
  await page.getByRole('textbox', { name: 'Cari berita' }).fill('tidak-adanya-artikel');
  await expect(page.getByRole('heading', { name: 'Belum ada cerita yang cocok' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Cari berita' }).fill('ibadah');
  await expect(page.locator('.news-card')).toHaveCount(1);
  await page.locator('.news-card h3 a').click();
  await expect(page.locator('h1')).toContainText('Mengenal ibadah');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
});

for (const route of ['/kontak', '/ppdb']) {
  test(`${route} shows information without forms`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('form, input, textarea, button[type="submit"]')).toHaveCount(0);
    await expect(page.getByText(/simulasi formulir|formulir demo/i)).toHaveCount(0);
    await expect(page.locator('meta[name="description"]')).not.toHaveAttribute(
      'content',
      /formulir/i,
    );
    if (route === '/ppdb') {
      await page.getByRole('link', { name: 'Hubungi sekolah', exact: true }).click();
      await expect(page).toHaveURL(/\/kontak$/);
      await page.goto(route);
    } else {
      await expect(
        page.locator('.contact-cards').getByRole('link', { name: '085813136184', exact: true }),
      ).toHaveAttribute('href', 'tel:085813136184');
    }
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await expect(page.locator('.information-layout')).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
        `${route} at ${width}px`,
      ).toBeTruthy();
    }
  });
}

test('key pages pass automated accessibility checks', async ({ page }) => {
  test.setTimeout(120000);
  for (const route of [
    '/',
    '/profil',
    '/visi-misi',
    '/program',
    '/program/pendidikan-al-quran',
    '/guru',
    '/fasilitas',
    '/berita',
    '/berita/belajar-peduli-lingkungan',
    '/galeri',
    '/ppdb',
    '/kontak',
  ]) {
    await page.goto(route);
    await expect(page.locator('h1')).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.evaluate(() => window.scrollTo(0, 0));
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect
      .soft(
        result.violations.map((item) => ({
          id: item.id,
          nodes: item.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
        })),
        route,
      )
      .toEqual([]);
  }
});

test('normal motion renders hero and scroll sections visibly', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('.hero-copy')).toHaveCSS('opacity', '1');
  await page.screenshot({
    path: `test-results/home-${testInfo.project.name}.png`,
    fullPage: false,
  });
  await page.locator('.program-card').first().scrollIntoViewIfNeeded();
  await expect(page.locator('.program-grid>div').first()).toHaveCSS('opacity', '1');
  await expect(page.locator('.program-card').first()).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('.hero').scrollIntoViewIfNeeded();
  await expect(page.locator('.hero-copy')).toHaveCSS('opacity', '1');
});

test('layout stays within small, tablet and wide screens', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  for (const width of [320, 768, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
      `${width}px`,
    ).toBeTruthy();
    await expect(page.locator('.hero h1')).toBeVisible();
  }
});
