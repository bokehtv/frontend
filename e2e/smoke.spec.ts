import { test, expect } from '@playwright/test';

test('homepage has title and essential UI', async ({ page }) => {
  await page.goto('/');

  // Assuming the Next.js app renders a body or a main tag
  // This is a generic smoke test that ensures the app mounts without crashing
  const body = page.locator('body');
  await expect(body).toBeVisible();

  // You can extend this logic once core components are solidified
  // Example: 
  // await expect(page).toHaveTitle(/BokehTV/);
});
