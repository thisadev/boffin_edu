import { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { ENV } from "@/lib/env";

// Use environment variable for the secret key
const NEXTAUTH_SECRET = ENV.NEXTAUTH_SECRET;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        // For development purposes, allow admin login with hardcoded credentials
        if (
          credentials.email === "admin@boffininstitute.com" &&
          credentials.password === "admin123"
        ) {
          console.log("Admin login successful with hardcoded credentials");
          return {
            id: "admin-id",
            email: credentials.email,
            name: "Admin User",
            role: "admin",
          };
        }

        // For regular users, check the database
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          console.log("User not found");
          return null;
        }

        // Simple password check for development
        if (user.password === credentials.password) {
          return {
            id: String(user.id), // Ensure ID is always a string
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role,
          };
        }

        console.log("Invalid password");
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/admin/login",
    signOut: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      console.log("JWT Callback - Token:", token);
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      console.log("Session Callback - Session:", session);
      return session;
    },
  },
  // Add JWT configuration to ensure consistent encryption
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
};

// Add type declarations to extend the default NextAuth types
declare module "next-auth" {
  interface User {
    role: string;
    id: string;
  }

  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}
