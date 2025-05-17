import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.e2e' });

export default async function globalSetup() {
  // Remove any existing e2e.db
  const dbPath = process.env.DB_URL || './database/e2e.db';
  if (fs.existsSync(dbPath)) {
    console.log(`[global-setup] Removing existing db at ${dbPath}`);
    fs.unlinkSync(dbPath);
  }

  // Remove e2e-migrations directory for a clean slate
  const migrationsPath = process.env.MIGRATIONS_PATH || './drizzle/e2e-migrations';
  if (fs.existsSync(migrationsPath)) {
    console.log(`[global-setup] Removing existing migrations at ${migrationsPath}`);
    fs.rmSync(migrationsPath, { recursive: true, force: true });
  }

  // Regenerate migrations
  console.log(`[global-setup] Generating fresh migrations in ${migrationsPath}`);
  execSync('npx drizzle-kit generate --config=drizzle-e2e.config.ts', { stdio: 'inherit' });

  // Run Drizzle migrations
  console.log(`[global-setup] Pushing migrations to database`);
  execSync('npx drizzle-kit push --config=drizzle-e2e.config.ts', { stdio: 'inherit' });

  // Seed the database with a user
  console.log(`[global-setup] Seeding database`);
  execSync('node ./e2e-tests/seed.js', { stdio: 'inherit' });
}
