import type { Config } from "drizzle-kit";

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.e2e" });

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL ?? '',
  },
} satisfies Config;