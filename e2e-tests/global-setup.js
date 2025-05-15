const { execSync } = require('child_process');
const fs = require('fs');

module.exports = async () => {
  // Remove any existing e2e.db
  if (fs.existsSync('./database/e2e.db')) {
    fs.unlinkSync('./database/e2e.db');
  }
  // Run Drizzle migrations
  execSync('npx drizzle-kit migrate --config=drizzle-e2e.config.ts', { stdio: 'inherit' });
  // Seed the database with a user
  require('child_process').execSync('node ./e2e-tests/seed.js', { stdio: 'inherit' });
};
