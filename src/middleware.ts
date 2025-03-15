import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === "/admin/login";
  
  // Define admin paths that require authentication
  const isAdminPath = path.startsWith("/admin") && !isPublicPath;

  try {
    // Get the session token from the cookies
    const sessionCookie = request.cookies.get("next-auth.session-token");
    const isAuthenticated = !!sessionCookie;
    
    console.log(`Middleware: Path=${path}, Authenticated=${isAuthenticated}`);

    // Redirect logic
    if (isAdminPath && !isAuthenticated) {
      console.log("Middleware: Not authenticated, redirecting to login");
      return NextResponse.redirect(new URL("/admin/login", request.url));
    } 
    
    if (isPublicPath && isAuthenticated) {
      // If user is already logged in and tries to access login page, redirect to dashboard
      console.log("Middleware: Already authenticated, redirecting to dashboard");
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  } catch (error) {
    console.error("Middleware error:", error);
    // In case of error, redirect to login for admin paths
    if (isAdminPath) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths should use this middleware
export const config = {
  matcher: ["/admin/:path*"],
};
