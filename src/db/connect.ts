import dbWeb from "./connect-web";
import dbE2E from "./connect-e2e";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

let db: NodePgDatabase<typeof schema>;

if (!process.env.E2E_TEST || process.env.E2E_TEST === "false") {
  if (!dbWeb) throw new Error("dbWeb is not configured!");
  db = dbWeb;
} else {
  if (!dbE2E) throw new Error("dbE2E is not configured!");
  db = dbE2E;
}

export { db };
