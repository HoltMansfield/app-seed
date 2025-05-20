import { test, expect } from '@playwright/test';

const TEST_EMAIL = 'e2e-test@example.com';
const TEST_PASSWORD = 'e2epassword123';

// Utility: Register a user if not already registered
test('register, login, and logout flow', async ({ page }) => {
  // Go to registration page
  await page.goto(process.env.E2E_URL + '/register');

  // Fill registration form
  await page.fill('input[name="email"]', TEST_EMAIL);
  await page.fill('input[name="password"]', TEST_PASSWORD);
  await page.click('button[type="submit"]');

  // Wait for redirect to login or home (success message or login page)
  await expect(page).toHaveURL(/login|register/);

  // Go to login page
  await page.goto(process.env.E2E_URL + '/login');
  await page.fill('input[name="email"]', TEST_EMAIL);
  await page.fill('input[name="password"]', TEST_PASSWORD);
  await page.click('button[type="submit"]');

  // Should redirect to home and show welcome message
  await expect(page).toHaveURL(process.env.E2E_URL + '/');
  await expect(page.locator('text=Welcome')).toBeVisible();

  // Logout
  await page.click('button:text("Logout")');
  await expect(page).toHaveURL(process.env.E2E_URL + '/login');
});
