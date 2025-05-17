import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as dotenv from "dotenv";
import { existsSync } from "fs";
import { join } from "path";

// Try to load .env.e2e or .env.local if present (for local/dev/test)
const e2eEnvPath = join(process.cwd(), ".env.e2e");
const localEnvPath = join(process.cwd(), ".env.local");

if (existsSync(e2eEnvPath)) dotenv.config({ path: e2eEnvPath });
else if (existsSync(localEnvPath)) dotenv.config({ path: localEnvPath });

const dbPath = process.env.DB_URL;
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite);
