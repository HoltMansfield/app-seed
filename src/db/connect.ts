import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import * as schema from "./schema";
import * as dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";
let envFile = ".env.local";
if (env === "test") envFile = ".env.e2e";
else if (env === "production") envFile = ".env.production";
dotenv.config({ path: envFile });

const pool = new Pool({ connectionString: process.env.DB_URL! });
export const db = drizzle(pool, { schema });

