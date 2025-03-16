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
    // Also check for the JWT token cookie which might be used in production
    const jwtCookie = request.cookies.get("__Secure-next-auth.session-token") || 
                     request.cookies.get("__Host-next-auth.session-token");
                     
    const isAuthenticated = !!sessionCookie || !!jwtCookie;
    
    console.log(`Middleware: Path=${path}, Authenticated=${isAuthenticated}`);
    console.log(`Middleware: SessionCookie=${!!sessionCookie}, JwtCookie=${!!jwtCookie}`);

    // Redirect logic
    if (isAdminPath && !isAuthenticated) {
      console.log("Middleware: Not authenticated, redirecting to login");
      // Add a cache-busting parameter to prevent caching issues
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", "middleware");
      loginUrl.searchParams.set("t", Date.now().toString());
      return NextResponse.redirect(loginUrl);
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
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("error", "middleware_error");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Configure which paths should use this middleware
export const config = {
  matcher: ["/admin/:path*"],
};
