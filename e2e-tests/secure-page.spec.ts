import { test, expect } from '@playwright/test';

const TEST_EMAIL = 'e2e-test@example.com';

// Ensure only runs under logged-in project
test('logged-in can access secure page', async ({ page }, testInfo) => {
  testInfo.skip(testInfo.project.name !== 'logged-in', 'only runs in logged-in project');

  // Navigate to secure page
  await page.goto(`${process.env.E2E_URL}/secure-page`);

  // Should load successfully
  await expect(page).toHaveURL(`${process.env.E2E_URL}/secure-page`);
  await expect(page.locator('h1')).toHaveText('Secure Page');

  // Greeting uses the logged-in user's email
  await expect(page.locator('text=Welcome')).toContainText(TEST_EMAIL);
});
