import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import { DefaultSession } from "next-auth";

// Use PrismaClient as a singleton to prevent too many connections
const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Use a consistent secret key for JWT token encryption and decryption
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "boffin-institute-secret-key-2025";

// Extend the default session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
  
  interface JWT {
    id: string;
    role: string;
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
      try {
        // Only allow sign-ins from your domain for Google provider
        if (account?.provider === "google" && profile?.email) {
          const isAllowedDomain = profile.email.endsWith("@boffin.lk");
          
          // If domain is allowed, ensure user exists in the database
          if (isAllowedDomain && user.email) {
            // Check if user exists
            const existingUser = await prisma.user.findUnique({
              where: { email: user.email },
            });
            
            // If user doesn't exist, create them
            if (!existingUser && user.email) {
              // Extract first and last name from the full name or email
              const nameParts = user.name ? user.name.split(' ') : [user.email.split('@')[0], ''];
              const firstName = nameParts[0] || '';
              const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
              
              await prisma.user.create({
                data: {
                  email: user.email,
                  firstName: firstName,
                  lastName: lastName,
                  image: user.image,
                  role: "admin", // All boffin.lk users are admins
                },
              });
              console.log(`Created new admin user: ${user.email}`);
            }
          }
          
          return isAllowedDomain;
        }
        return false; // Don't allow any other sign-in methods
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Fail closed for security
      }
    },
    async jwt({ token, user }) {
      try {
        // Initial sign in
        if (user) {
          // Find the user in the database to get their ID
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email || "" },
          });

          // Set the user ID and role in the token
          if (dbUser) {
            token.id = dbUser.id.toString();
            token.role = dbUser.role;
          }
        }
        return token;
      } catch (error) {
        console.error("Error in jwt callback:", error);
        // Return the token as is if there's an error
        return token;
      }
    },
    async session({ session, token }) {
      try {
        if (token && session.user) {
          session.user.id = token.id as string;
          session.user.role = token.role as string;
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        // Return the session as is if there's an error
        return session;
      }
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login", // Error code passed in query string as ?error=
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development",
  secret: NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
