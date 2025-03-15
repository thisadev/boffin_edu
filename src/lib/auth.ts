import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// Use a consistent secret key for development
export const NEXTAUTH_SECRET = "boffin-institute-super-secret-key-for-development";

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
        // Note: In a production environment, you would use bcrypt to compare passwords
        // but we're simplifying for development to avoid client-side bcrypt issues
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
        // In production, use a server API route with bcrypt for secure password comparison
        if (user.password === credentials.password) {
          return {
            id: user.id,
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
};

// Add type declarations to extend the default NextAuth types
declare module "next-auth" {
  interface User {
    role: string;
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    id: string;
  }
}
