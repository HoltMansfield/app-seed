import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from "./schema";

let db: NodePgDatabase<typeof schema> | null = null;

if (process.env.E2E_TEST && process.env.E2E_TEST === "true"){
    
}

export default db;  