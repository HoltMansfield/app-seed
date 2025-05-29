import { chromium, FullConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.e2e' });

async function globalSetup(config: FullConfig) {
  const baseURL = process.env.E2E_URL!;
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Perform login
  await page.goto(`${baseURL}/login`);
  await page.fill('input[name="email"]', 'e2e-test@example.com');
  await page.fill('input[name="password"]', 'e2epassword123');
  await page.click('button[type="submit"]');
  await page.waitForURL(`${baseURL}/`);

  // Save storage state (cookies, localStorage)
  await page.context().storageState({ path: 'e2e-tests/storageState.json' });
  await browser.close();
}

export default globalSetup;
