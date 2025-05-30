import { test, expect } from '@playwright/test';

test('secure page is accessible when logged in', async ({ page }) => {
  // Go directly to secure page - should work with our stored auth state
  await page.goto(`${process.env.E2E_URL}/secure-page`);
  
  // Verify we can see the secure content
  await expect(page).toHaveURL(`${process.env.E2E_URL}/secure-page`);
  await expect(page.locator('text=Secure Page')).toBeVisible();
  await expect(page.locator('text=You are successfully authenticated')).toBeVisible();
});
