// e2e-tests/seed.js
// Script to seed the E2E database with a user using direct SQLite

const fs = require('fs');
const path = require('path');
import { neon } from '@neondatabase/serverless/web';
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const env = process.env.NODE_ENV || "e2e";
let envFile = ".env.e2e";
if (env === "development") envFile = ".env.local";
else if (env === "production") envFile = ".env.production";
dotenv.config({ path: envFile });

async function seed() {
  try {
    // Get database URL from environment
    const dbUrl = process.env.DB_URL;
    if (!dbUrl) throw new Error('DB_URL not set in environment');
    console.log(`Using Neon database at: ${dbUrl}`);

    // Connect to Neon Postgres
    const sql = neon(dbUrl);

    // Generate user data
    const id = nanoid();
    const email = 'ScottieBarnes@raptors.com';
    const name = 'Scottie Barnes';
    const password = 'raptors2025';
    const passwordHash = await bcrypt.hash(password, 10);
    const image = 'https://nba-players.com/scottie-barnes.png';
    const emailVerified = null; // or new Date().toISOString() if you want it verified

    // Insert user with parameterized query
    await sql`
      INSERT INTO users (id, name, email, passwordHash, emailVerified, image)
      VALUES (${id}, ${name}, ${email}, ${passwordHash}, ${emailVerified}, ${image})
      ON CONFLICT (email) DO NOTHING;
    `;
    console.log('Seeded user:', email);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seed().catch(e => {
  console.error(e);
  process.exit(1);
});
