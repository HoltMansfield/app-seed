import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.e2e' });

export default defineConfig({
  testDir: 'e2e-tests',
  globalSetup: 'e2e-tests/global-setup.ts',
  timeout: 60 * 1000,
  use: {
    baseURL: process.env.E2E_URL,
    trace: 'on-first-retry',
    ...devices['Desktop Chrome'],
  },
  projects: [
    {
      name: 'anonymous',
      use: { storageState: undefined },
    },
    {
      name: 'logged-in',
      use: { storageState: 'e2e-tests/storageState.json' },
    },
  ],
});
