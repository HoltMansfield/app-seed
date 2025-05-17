import { db } from '../src/db/index';
import { users } from '../src/db/schema';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';

export default async function seed() {
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
    image,
  });
}

if (require.main === module) {
  seed().then(() => {
    console.log('Seeding complete.');
    process.exit(0);
  }).catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });
}
