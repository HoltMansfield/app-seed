// e2e-tests/seed.js
// Script to seed the E2E database with a user

const { db } = require('../src/db/index');
const { users } = require('../src/db/schema');
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');

async function seed() {
  const id = nanoid();
  const email = 'ScottieBarnes@raptors.com';
  const name = 'Scottie Barnes';
  const password = 'raptors2025';
  const passwordHash = await bcrypt.hash(password, 10);
  const image = 'https://nba-players.com/scottie-barnes.png';
  const emailVerified = null; // or Date.now() if you want it verified

  await db.insert(users).values({
    id,
    name,
    email,
    passwordHash,
    emailVerified,
    image
  });

  console.log('Seeded user:', email);
}

seed().catch(e => {
  console.error(e);
  process.exit(1);
});
