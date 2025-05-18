import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

if (!process.env.E2E === true) {
  dotenv.config({ path: ".env.local" });
}

export default {
  schema: "./src/db/schema.ts",
  out: process.env.MIGRATIONS_PATH,
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL ?? '',
  },
} satisfies Config;
