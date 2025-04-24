// Minimal test for better-sqlite3 creating a file in a subdirectory
const Database = require('better-sqlite3');
const fs = require('fs');

const dir = './database';
const dbPath = './database/dev.db';

// Ensure directory exists
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  console.log('Created directory:', dir);
}

try {
  const db = new Database(dbPath);
  db.exec('CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT);');
  db.prepare('INSERT INTO test (name) VALUES (?)').run('test row');
  const row = db.prepare('SELECT * FROM test').get();
  console.log('Row from test table:', row);
  db.close();
  console.log('Success: Database created and written to', dbPath);
} catch (e) {
  console.error('Failed to create or write to database:', e);
  process.exit(1);
}
