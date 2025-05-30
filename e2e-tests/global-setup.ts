import { chromium, FullConfig, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.e2e' });

const TEST_EMAIL = 'e2e-test@example.com';
const TEST_PASSWORD = 'e2epassword123';

async function globalSetup(config: FullConfig) {
  console.log('Starting global setup...');
  const baseURL = process.env.E2E_URL!;
  console.log(`Using base URL: ${baseURL}`);
  
  // Launch browser with slower timeouts and debug logging
  const browser = await chromium.launch({ 
    slowMo: 100,
    timeout: 60000
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: 'test-results/' }
  });
  
  const page = await context.newPage();
  page.setDefaultTimeout(45000); // Increase default timeout to 45 seconds

  try {
    // First try to register the user
    console.log('Navigating to registration page...');
    await page.goto(`${baseURL}/register`);
    console.log('Filling registration form...');
    await page.fill('input[name="email"]', TEST_EMAIL);
    await page.fill('input[name="password"]', TEST_PASSWORD);
    await page.click('button[type="submit"]');
    
    // Wait for either login page or home page (if already registered)
    console.log('Waiting for redirect after registration...');
    await Promise.race([
      page.waitForURL(`${baseURL}/login`).then(() => console.log('Redirected to login')),
      page.waitForURL(`${baseURL}/`).then(() => console.log('Redirected to home'))
    ]);
    
    // Now perform login if we're not already logged in
    if (page.url() !== `${baseURL}/`) {
      console.log('Performing login...');
      await page.goto(`${baseURL}/login`);
      await page.fill('input[name="email"]', TEST_EMAIL);
      await page.fill('input[name="password"]', TEST_PASSWORD);
      await page.click('button[type="submit"]');
      
      console.log('Waiting for redirect after login...');
      await page.waitForURL(`${baseURL}/`, { timeout: 45000 });
    }
    
    console.log('Successfully logged in!');
    
    // Save storage state (cookies, localStorage)
    const storageStatePath = 'e2e-tests/storageState.json';
    console.log(`Saving auth state to ${storageStatePath}...`);
    await page.context().storageState({ path: storageStatePath });
    
    // Verify the file was created
    if (fs.existsSync(storageStatePath)) {
      console.log('Storage state file created successfully!');
    } else {
      console.error('Failed to create storage state file!');
    }
  } catch (error) {
    console.error('Error in global setup:', error);
    // Take a screenshot to help debug
    await page.screenshot({ path: 'global-setup-error.png' });
    throw error;
  } finally {
    await context.close();
    await browser.close();
    console.log('Global setup complete.');
  }
}

export default globalSetup;
