import { test, expect } from '@playwright/test';
import { TEST_EMAIL, TEST_PASSWORD } from '../global-setup';

test('secure page redirects to login when not authenticated', async ({ page }) => {
  // Try to access secure page without being logged in
  await page.goto(`${process.env.E2E_URL}/secure-page`);
  
  // Should redirect to login with redirect parameter
  // Check that we're on the login page with the redirect parameter
  await expect(page.url()).toContain(`${process.env.E2E_URL}/login`);
  await expect(page.url()).toContain('redirect=%2Fsecure-page');
});

test('register, login, and logout flow', async ({ page }) => {
  // Go to registration page
  await page.goto(`${process.env.E2E_URL}/register`);

  // Fill out form
  await page.fill('input[name="email"]', TEST_EMAIL);
  await page.fill('input[name="password"]', TEST_PASSWORD);
  await page.click('button[type="submit"]');

  // Wait for redirect to login or home (success message or login page)
  await expect(page).toHaveURL(/login|register/);

  // Go to login page
  await page.goto(`${process.env.E2E_URL}/login`);
  await page.fill('input[name="email"]', TEST_EMAIL);
  await page.fill('input[name="password"]', TEST_PASSWORD);
  await page.click('button[type="submit"]');

  // Should redirect to home and show welcome message
  await expect(page).toHaveURL(`${process.env.E2E_URL}/`);
  await expect(page.locator('text=Welcome')).toBeVisible();

  // Logout
  await page.click('button:text("Logout")');
  await expect(page).toHaveURL(`${process.env.E2E_URL}/login`);
});
