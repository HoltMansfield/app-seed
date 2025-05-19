import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import * as schema from "./schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

let db: NodePgDatabase<typeof schema> | null = null;

if(!process.env.E2E_TEST){
    const pool = new Pool({ connectionString: process.env.DB_URL! });
    db = drizzle(pool, { schema });
}

export default db;  