import { NextAuthOptions, DefaultSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { ENV } from "@/lib/env";
import GoogleProvider from "next-auth/providers/google";

// Use environment variable for the secret key
const NEXTAUTH_SECRET = ENV.NEXTAUTH_SECRET;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
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
  // Ensure cookies are properly configured for Vercel
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Only allow sign-ins from your domain for Google provider
        if (account?.provider === "google" && profile?.email) {
          const isAllowedDomain = profile.email.endsWith("@boffin.lk");
          
          // If domain is allowed, ensure user exists in the database
          if (isAllowedDomain && user.email) {
            // Check if user exists
            let existingUser = await prisma.user.findUnique({
              where: { email: user.email },
              include: { accounts: true }
            });
            
            // If user doesn't exist, create them
            if (!existingUser && user.email) {
              // Extract first and last name from the full name or email
              const nameParts = user.name ? user.name.split(' ') : [user.email.split('@')[0], ''];
              const firstName = nameParts[0] || '';
              const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
              
              existingUser = await prisma.user.create({
                data: {
                  email: user.email,
                  firstName: firstName,
                  lastName: lastName,
                  image: user.image,
                  role: "admin", // All boffin.lk users are admins
                },
                include: { accounts: true }
              });
              console.log(`Created new admin user: ${user.email}`);
            } else if (existingUser && existingUser.accounts.length === 0 && account.provider === 'google') {
              // If user exists but has no account, create the account link
              await prisma.account.create({
                data: {
                  userId: existingUser.id,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  refresh_token: account.refresh_token,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                  session_state: account.session_state
                }
              });
              console.log(`Created account link for existing user: ${user.email}`);
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
      if (user) {
        // Find the user in the database to get the correct ID and role
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email || token.email as string }
        });
        
        if (dbUser) {
          token.id = dbUser.id.toString();
          token.role = dbUser.role;
        }
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
