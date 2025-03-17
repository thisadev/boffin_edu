import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Set cache control headers to prevent caching
    const headers = {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    };
    
    if (session) {
      return NextResponse.json(
        { 
          authenticated: true, 
          user: {
            email: session.user.email,
            role: session.user.role
          }
        }, 
        { headers }
      );
    }
    
    return NextResponse.json({ authenticated: false }, { headers });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { error: "An error occurred checking authentication" },
      { status: 500 }
    );
  }
}
