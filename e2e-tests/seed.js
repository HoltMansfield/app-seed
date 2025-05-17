// e2e-tests/seed.js
// Script to seed the E2E database with a user using direct SQLite

const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables from .env.e2e
dotenv.config({ path: './.env.e2e' });

async function seed() {
  try {
    // Get database path from environment or use default
    const dbPath = process.env.DB_URL || './database/e2e.db';
    console.log(`Using database at: ${dbPath}`);
    
    // Connect to SQLite database
    const db = new Database(dbPath);
    
    // Generate user data
    const id = nanoid();
    const email = 'ScottieBarnes@raptors.com';
    const name = 'Scottie Barnes';
    const password = 'raptors2025';
    const passwordHash = await bcrypt.hash(password, 10);
    const image = 'https://nba-players.com/scottie-barnes.png';
    const emailVerified = null; // or Date.now() if you want it verified
    
    // Insert user with direct SQL
    const stmt = db.prepare(`
      INSERT INTO users (id, name, email, "passwordHash", "emailVerified", image)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(id, name, email, passwordHash, emailVerified, image);
    
    console.log('Seeded user:', email);
    db.close();
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
