"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = cookies();
  (await cookieStore).delete("session_user");
  redirect("/login");
}
