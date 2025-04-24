"use client";
import { SessionProvider } from "next-auth/react";
// import { Flowbite } from "flowbite-react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
