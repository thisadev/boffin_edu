import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// This file now imports the authOptions from lib/auth.ts
// to ensure consistent authentication configuration

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
