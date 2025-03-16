import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

// Initialize Prisma client
const prisma = new PrismaClient();

// Use a consistent secret key for JWT token encryption and decryption
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "boffin-institute-secret-key-2025";

// Extend the default session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Restrict to your company domain
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          hd: "boffin.lk" // Restrict to boffin.lk domain
        }
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Find user by email
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          console.log("User found:", user ? `${user.email} (${user.role})` : "No user found");

          if (!user || !user.password) {
            return null;
          }

          // Verify password
          const passwordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          console.log("Password validation:", passwordValid ? "success" : "failed");

          if (!passwordValid) {
            return null;
          }

          // Return user data
          return {
            id: String(user.id), // Convert to string for NextAuth
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow sign-ins from your domain for Google provider
      if (account?.provider === "google" && profile?.email) {
        return profile.email.endsWith("@boffin.lk");
      }
      return true; // Allow credential sign-ins
    },
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    signOut: "/admin/signout",
    error: "/admin/login", // Error code passed in query string as ?error=
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development",
  secret: NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
