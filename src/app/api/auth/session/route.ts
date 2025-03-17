import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    // Get the actual session using getServerSession
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Return the actual authenticated user from the session
    return NextResponse.json({
      user: {
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        id: session.user.id
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Session verification error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
