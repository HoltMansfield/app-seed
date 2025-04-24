import { NextResponse } from "next/server";
import { count } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function GET() {
  // Drizzle ORM: count users
  const result = await db.select({ count: count() }).from(users);
  return NextResponse.json({ count: result[0]?.count ?? 0 });
}
