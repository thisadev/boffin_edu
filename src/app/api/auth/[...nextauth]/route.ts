import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Use a consistent secret key for JWT token encryption and decryption
const NEXTAUTH_SECRET = "boffin-institute-secret-key-2025";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
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

          if (!user) {
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
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  debug: true, // Enable debug mode for better logging
  secret: NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
