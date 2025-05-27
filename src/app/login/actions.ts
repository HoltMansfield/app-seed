"use server";
import { withHighlightError } from "@/highlight-error";
import { cookies } from "next/headers";
import { db } from "@/db/connect";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function _loginAction(
  state: { error?: string; success?: boolean } | undefined,
  data: { email: string; password: string }
): Promise<{ error?: string; success?: boolean } | undefined> {
  const { email, password } = data;

  const found = await db.select().from(users).where(eq(users.email, email));
  if (found.length === 0) {
    return { error: "Invalid credentials." };
  }
  const user = found[0];
  const valid = await bcrypt.compare(password, user.passwordHash ?? "");
  if (!valid) {
    return { error: "Invalid credentials." };
  }
  const cookieStore = await cookies();
  cookieStore.set("session_user", user.email ?? "", { path: "/" });
  return { success: true };
}

export const loginAction = withHighlightError(_loginAction);
