import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LogoutPage() {
  // Clear the session cookie
  const cookieStore = cookies();
  (await cookieStore).delete("session_user");
  redirect("/login");
}
