import { NextAuthOptions } from "next-auth";
import { CustomPrismaAdapter } from "./prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { ENV } from "@/lib/env";
import { DefaultSession } from "next-auth";

// Use environment variable for the secret key
const NEXTAUTH_SECRET = ENV.NEXTAUTH_SECRET;

export const authOptions: NextAuthOptions = {
  adapter: CustomPrismaAdapter(prisma),
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
        if (account?.provider === "google" && profile?.email) {
          const isAllowedDomain = profile.email.endsWith("@boffin.lk");
          
          // If domain is allowed, ensure user exists in database
          if (isAllowedDomain) {
            // Check if user exists
            let existingUser = await prisma.user.findUnique({
              where: { email: profile.email },
            });
            
            // If user doesn't exist, create a new one
            if (!existingUser) {
              // Get name from profile or fallback to email
              const googleProfile = profile as any; // Type assertion for Google-specific fields
              const firstName = googleProfile.given_name || user.name?.split(' ')[0] || '';
              const lastName = googleProfile.family_name || (user.name?.split(' ').slice(1).join(' ') || '');
              const image = googleProfile.picture || user.image;
              
              existingUser = await prisma.user.create({
                data: {
                  email: profile.email,
                  firstName,
                  lastName,
                  role: "admin", // All boffin.lk users are admins
                  image,
                },
              });
              console.log(`Created new admin user: ${profile.email}`);
            } 
            // If user exists but doesn't have a linked account, create one
            else {
              // Check if account exists
              const existingAccount = await prisma.account.findFirst({
                where: {
                  userId: existingUser.id,
                  provider: account.provider,
                },
              });
              
              // If no account exists, create one
              if (!existingAccount) {
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
        try {
          // Find the user in the database to get the correct ID and role
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email || token.email as string }
          });
          
          if (dbUser) {
            // Store the ID as a string but ensure it's properly formatted for conversion later
            token.id = dbUser.id.toString();
            token.role = dbUser.role;
            console.log('JWT callback: User found in database, ID set to:', token.id);
          } else {
            console.log('JWT callback: User not found in database for email:', user.email || token.email);
          }
        } catch (error) {
          console.error('JWT callback error:', error);
        }
      } else {
        console.log('JWT callback: No user object provided, using existing token');
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        try {
          // Store the ID as a string in the session
          session.user.id = token.id as string;
          session.user.role = token.role as string;
          console.log('Session callback: User ID set to:', session.user.id);
        } catch (error) {
          console.error('Session callback error:', error);
        }
      } else {
        console.log('Session callback: No token or session.user available');
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
