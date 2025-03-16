"use client";

// This component is no longer needed as we're using the root SessionProvider
// Keeping it for backward compatibility but removing the console log
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  // Removed console.log to prevent confusion
  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  );
}
