"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [userCount, setUserCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchUserCount() {
      const res = await fetch("/api/users/count");
      if (res.ok) {
        const { count } = await res.json();
        setUserCount(count);
      }
    }
    fetchUserCount();
  }, []);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8">
      <Card className="max-w-md w-full">
  <CardHeader>
    <CardTitle>Next.js + Drizzle + Tailwind + Google Auth</CardTitle>
  </CardHeader>
        
        {session ? (
          <>
            <p className="mb-2">Signed in as <b>{session.user?.email}</b></p>
            <img src={session.user?.image ?? ""} alt="avatar" className="w-16 h-16 rounded-full mb-2" />
            <Button variant="destructive" onClick={() => signOut()}>Sign out</Button>
          </>
        ) : (
          <Button onClick={() => signIn("google")}>Sign in with Google</Button>
        )}
        <div className="mt-4 text-sm text-gray-500">
          {userCount !== null ? `Total users in DB: ${userCount}` : "Loading user count..."}
        </div>
      </Card>
    </main>
  );
}
