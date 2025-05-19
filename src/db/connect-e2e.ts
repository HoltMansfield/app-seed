import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from "./schema";

let db: NodePgDatabase<typeof schema> | null = null;

if(process.env.E2E_TEST){
    const pgClient = new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      await pgClient.connect();
    db = drizzle(pgClient, { schema });
}

export default db;  