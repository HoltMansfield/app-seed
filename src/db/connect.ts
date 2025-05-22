import dbWeb from "./connect-web";
import dbE2E from "./connect-e2e";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

let db: NodePgDatabase<typeof schema> | null;

if (!process.env.E2E_TEST || process.env.E2E_TEST === "false") {
  db = dbWeb;
} else {
  db = dbE2E;
}

export { db };
