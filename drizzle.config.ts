import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: process.env.MIGRATIONS_PATH,
  dialect: "sqlite",
  dbCredentials: {
    url: "./database/dev.db",
  },
} satisfies Config;
