import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
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
      role: string;
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
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow sign-ins from your domain for Google provider
      if (account?.provider === "google" && profile?.email) {
        return profile.email.endsWith("@boffin.lk");
      }
      return false; // Don't allow any other sign-in methods
    },
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        // Find the user in the database to get their role
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email || "" },
        });

        // If user exists in DB, use their role, otherwise default to 'user'
        token.role = dbUser?.role || "user";
        token.id = dbUser?.id.toString() || "";
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
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
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
