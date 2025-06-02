"use server";
import { withHighlightError } from "@/highlight-error";
import { cookies, headers } from "next/headers";
import { db } from "@/db/connect";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const MAX_ATTEMPTS = 1;
const TIME_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const loginAttempts = new Map<string, { count: number; timestamp: number }>();

const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_DURATION_MS = 30 * 60 * 1000; // 30 minutes

async function _loginAction(
  state: { error?: string; success?: boolean } | undefined,
  data: { email: string; password: string }
): Promise<{ error?: string; success?: boolean } | undefined> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || 'unknown-ip';
  const currentTime = Date.now();
  const record = loginAttempts.get(ip);

  if (record) {
    if (currentTime - record.timestamp < TIME_WINDOW_MS && record.count >= MAX_ATTEMPTS) {
      return { error: "Too many login attempts. Please try again later." };
    } else if (currentTime - record.timestamp >= TIME_WINDOW_MS) {
      loginAttempts.set(ip, { count: 1, timestamp: currentTime });
    } else {
      record.count++;
    }
  } else {
    loginAttempts.set(ip, { count: 1, timestamp: currentTime });
  }

  const { email, password } = data;

  const found = await db.select().from(users).where(eq(users.email, email));
  if (found.length === 0) {
    return { error: "Invalid credentials." };
  }
  const user = found[0];

  // Check if account is locked
  if (user.lockoutUntil && user.lockoutUntil.getTime() > Date.now()) {
    return { error: "Account is locked. Please try again later." };
  }

  const valid = await bcrypt.compare(password, user.passwordHash ?? "");
  if (!valid) {
    const failedLoginAttempts = (user.failedLoginAttempts ?? 0) + 1;
    let lockoutUntil = user.lockoutUntil;

    if (failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
      lockoutUntil = new Date(Date.now() + LOCKOUT_DURATION_MS);
    }

    await db.update(users).set({ failedLoginAttempts, lockoutUntil }).where(eq(users.email, email));
    return { error: "Invalid credentials." };
  }

  // If login is successful, reset failed attempts and lockout, and remove IP from loginAttempts
  if (user.failedLoginAttempts && user.failedLoginAttempts > 0 || user.lockoutUntil) {
    await db.update(users).set({ failedLoginAttempts: 0, lockoutUntil: null }).where(eq(users.email, email));
  }
  loginAttempts.delete(ip);

  const cookieStore = await cookies();
  cookieStore.set("session_user", user.email ?? "", { path: "/" });
  return { success: true };
}

export const loginAction = withHighlightError(_loginAction);
