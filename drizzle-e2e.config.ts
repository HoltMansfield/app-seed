import type { Config } from "drizzle-kit";

import * as dotenv from "dotenv";

const env = process.env.NODE_ENV || "e2e";
let envFile = ".env.e2e";
if (env === "development") envFile = ".env.local";
else if (env === "production") envFile = ".env.production";
dotenv.config({ path: envFile });

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL ?? '',
  },
} satisfies Config;