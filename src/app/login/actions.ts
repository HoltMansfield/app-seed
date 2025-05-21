"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db/connect";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function loginAction({ email, password }: { email: string; password: string }) {
  if (!db) {
    redirect("/login?error=Database connection error. Please try again later.");
  }

  const found = await db.select().from(users).where(eq(users.email, email));
  if (found.length === 0) {
    redirect("/login?error=Invalid credentials.");
  }
  const user = found[0];
  const valid = await bcrypt.compare(password, user.passwordHash ?? "");
  if (!valid) {
    redirect("/login?error=Invalid credentials.");
  }
  const cookieStore = await cookies();
  (await cookieStore).set("session_user", user.email ?? "", { path: "/" });
  redirect("/");
}
