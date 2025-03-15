import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // For development purposes, allow admin login with hardcoded credentials
    if (email === "admin@boffininstitute.com" && password === "admin123") {
      console.log("Admin login successful with hardcoded credentials");
      
      // Set a simple session cookie instead of JWT
      const response = NextResponse.json(
        { success: true, user: { email, role: "admin" } },
        { status: 200 }
      );

      // Set a simple cookie that doesn't require JWT verification
      response.cookies.set({
        name: "next-auth.session-token",
        value: "admin-session",
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      });

      return response;
    }

    // For regular users, check the database
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Simple password check for development
    // In production, use bcrypt for secure password comparison
    if (user.password === password) {
      // Set a simple session cookie
      const response = NextResponse.json(
        { 
          success: true, 
          user: { 
            email: user.email, 
            role: user.role 
          } 
        },
        { status: 200 }
      );

      // Set a simple cookie that doesn't require JWT verification
      response.cookies.set({
        name: "next-auth.session-token",
        value: `user-session-${user.id}`,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      });

      return response;
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
