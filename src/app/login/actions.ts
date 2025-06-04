"use server";
import { withHighlightError } from "@/highlight-error";
import { cookies, headers } from "next/headers";
import { db } from "@/db/connect";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { TIME_WINDOW_MS, MAX_ATTEMPTS, MAX_FAILED_ATTEMPTS, LOCKOUT_DURATION_MS } from "./constants";

// In-memory store for IP-based rate limiting
// In a production app, this should be replaced with Redis or another distributed cache
const loginAttempts = new Map<string, { count: number; timestamp: number }>();

async function _loginAction(
  state: { error?: string; success?: boolean } | undefined,
  data: { email: string; password: string }
): Promise<{ error?: string; success?: boolean } | undefined> {
  // Get client IP for rate limiting
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || 'unknown-ip';
  const currentTime = Date.now();
  
  // Check IP-based rate limiting
  const record = loginAttempts.get(ip);
  if (record) {
    if (currentTime - record.timestamp < TIME_WINDOW_MS && record.count >= MAX_ATTEMPTS) {
      return { error: "Too many login attempts. Please try again later." };
    } else if (currentTime - record.timestamp >= TIME_WINDOW_MS) {
      // Reset if time window has passed
      loginAttempts.set(ip, { count: 1, timestamp: currentTime });
    } else {
      // Increment attempt count
      record.count++;
    }
  } else {
    // First attempt from this IP
    loginAttempts.set(ip, { count: 1, timestamp: currentTime });
  }

  const { email, password } = data;

  // Check if user exists
  const found = await db.select().from(users).where(eq(users.email, email));
  if (found.length === 0) {
    return { error: "Invalid credentials" };
  }
  
  const user = found[0];

  // Check if account is locked out
  if (user.lockoutUntil && new Date(user.lockoutUntil).getTime() > Date.now()) {
    return { error: "Account is locked. Please try again later." };
  }

  // Validate password
  const valid = await bcrypt.compare(password, user.passwordHash ?? "");
  if (!valid) {
    // Increment failed login attempts and possibly lock account
    const failedLoginAttempts = (user.failedLoginAttempts ?? 0) + 1;
    let lockoutUntil = user.lockoutUntil;

    if (failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
      lockoutUntil = new Date(Date.now() + LOCKOUT_DURATION_MS);
    }

    await db.update(users).set({ failedLoginAttempts, lockoutUntil }).where(eq(users.email, email));
    return { error: "Invalid credentials" };
  }

  // If login is successful:
  // 1. Reset failed attempts and lockout for this account
  if ((user.failedLoginAttempts && user.failedLoginAttempts > 0) || user.lockoutUntil) {
    await db.update(users).set({ failedLoginAttempts: 0, lockoutUntil: null }).where(eq(users.email, email));
  }
  
  // 2. Reset IP-based rate limiting for this IP
  loginAttempts.delete(ip);

  // 3. Set session cookie and return success
  const cookieStore = await cookies();
  cookieStore.set("session_user", user.email ?? "", { path: "/" });
  return { success: true };
}

export const loginAction = withHighlightError(_loginAction);
