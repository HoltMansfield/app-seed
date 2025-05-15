import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as dotenv from "dotenv";
import { existsSync } from "fs";
import { join } from "path";

// Try to load e2e.env or .env.local if present (for local/dev/test)
const e2eEnvPath = join(process.cwd(), "database/e2e.env");
const localEnvPath = join(process.cwd(), ".env.local");

if (existsSync(e2eEnvPath)) dotenv.config({ path: e2eEnvPath });
else if (existsSync(localEnvPath)) dotenv.config({ path: localEnvPath });

// Holt: drop the || and just use DB_PATH, set DB_PATH in e2e.env and .env.local
const dbPath = process.env.DB_PATH || "./database/dev.db";
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite);
