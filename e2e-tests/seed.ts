// e2e-tests/seed.ts
// Script to seed the E2E database with a user using Drizzle ORM (TypeScript)
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');
const { db } = require('../src/db/connect');
const { users } = require('../src/db/schema');

async function seed() {
  try {
    // Generate user data
    const id = nanoid();
    const email = 'ScottieBarnes@raptors.com';
    const name = 'Scottie Barnes';
    const password = 'raptors2025';
    const passwordHash = await bcrypt.hash(password, 10);
    const image = 'https://nba-players.com/scottie-barnes.png';
    const emailVerified = null; // or new Date() if you want it verified

    // Insert user using Drizzle ORM query builder
    await db.insert(users).values({
      id,
      name,
      email,
      passwordHash,
      image,
      emailVerified,
    }).onConflictDoNothing();
    console.log('Seeded user:', email);
  } catch (error) {
    console.error('Failed to seed database:', error);
    process.exit(1);
  }
}

// Allow running as a script
if (require.main === module) {
  seed();
}

seed().catch(e => {
  console.error(e);
  process.exit(1);
});
