/**
 * Playwright test for portfolio verification
 * Captures desktop and mobile screenshots, checks for console errors
 */

import { test, devices } from '@playwright/test';

test('Portfolio desktop view - hero section', async ({ page }) => {
  const errors: string[] = [];
  
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.waitForLoadState('networkidle');
  
  // Wait for canvas to be ready
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible({ timeout: 10000 });
  
  // Capture desktop screenshot
  await page.screenshot({ 
    path: '/root/projects/my-portfolio/dist/screenshot-desktop-hero.png',
    fullPage: false 
  });
  
  if (errors.length > 0) {
    console.log('Console errors:', errors);
  }
  
  expect(errors).toHaveLength(0);
});

test('Portfolio desktop view - scrolled section', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.waitForLoadState('networkidle');
  
  // Scroll to projects section
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(1000);
  
  // Capture scrolled screenshot
  await page.screenshot({
    path: '/root/projects/my-portfolio/dist/screenshot-desktop-scrolled.png',
    fullPage: false
  });
});

test('Portfolio mobile view', async () => {
  const { page } = await test.request.newContext({
    viewport: devices['iPhone 15 Pro'].viewport
  });
  
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.waitForLoadState('networkidle');
  
  // Wait for important elements
  await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 10000 });
  
  // Capture mobile screenshot
  await page.screenshot({
    path: '/root/projects/my-portfolio/dist/screenshot-mobile.png',
    fullPage: false
  });
});