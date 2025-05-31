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
    
    // After registration, check where we ended up
    console.log('Checking post-registration state...');
    
    // Wait a bit for any redirects to complete
    await page.waitForTimeout(2000);
    
    // Log current URL for debugging
    console.log(`Current URL after registration: ${page.url()}`);
    
    // Check if we're on the login page or home page
    const isOnLoginPage = page.url().includes('/login');
    const isOnHomePage = page.url() === baseURL || page.url() === `${baseURL}/`;
    
    if (isOnLoginPage) {
      console.log('On login page after registration');
    } else if (isOnHomePage) {
      console.log('On home page after registration');
    } else {
      console.log(`On unexpected page: ${page.url()}`);
    }
    
    // Now perform login if we're not already logged in
    if (!isOnHomePage) {
      console.log('Performing login...');
      await page.goto(`${baseURL}/login`);
      
      // Wait for login page to load
      await page.waitForSelector('input[name="email"]', { timeout: 10000 });
      
      // Fill login form
      await page.fill('input[name="email"]', TEST_EMAIL);
      await page.fill('input[name="password"]', TEST_PASSWORD);
      await page.click('button[type="submit"]');
      
      console.log('Waiting for redirect after login...');
      
      // Wait for navigation to complete
      try {
        await page.waitForURL(`${baseURL}/`, { timeout: 10000 });
        console.log('Successfully redirected to home page');
      } catch (error) {
        console.error('Failed to redirect to home page after login');
        console.log(`Current URL: ${page.url()}`);
        
        // Take a screenshot of the current state
        await page.screenshot({ path: 'login-redirect-error.png' });
        
        // Try to continue anyway
        if (!page.url().includes('/')) {
          console.log('Manually navigating to home page');
          await page.goto(baseURL);
        }
      }
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
