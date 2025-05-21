"use server";
import { db } from "@/db/connect";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import * as yup from "yup";
import { RegisterFormInputs, schema } from "./schema";

export async function registerAction(data: RegisterFormInputs) {
  const { email, password } = data;
  // Validate using yup schema
  try {
    await schema.validate({ email, password });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      throw new Error(err.errors.join("; "));
    }
    throw err;
  }

  if (!db) {
    throw new Error("Database connection error. Please try again later.");
  }

  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length > 0) {
    throw new Error("User already exists.");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(users).values({
    id: uuidv4(),
    email,
    passwordHash,
  });

  redirect("/login?success=1");
}