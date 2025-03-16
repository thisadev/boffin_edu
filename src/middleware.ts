import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === "/admin/login" || path.startsWith("/api/auth/");
  
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

    // Check for force-signout or direct login access
    const isSignOutFlow = path === "/api/auth/force-signout" || 
                         path === "/admin/login" && request.nextUrl.searchParams.has("forcedSignout") ||
                         path === "/admin/login" && request.nextUrl.searchParams.has("signedOut");

    // Redirect logic
    if (isAdminPath && !isAuthenticated) {
      // Don't redirect if it's the dashboard page - let the client-side handle it
      if (path === "/admin/dashboard") {
        return NextResponse.next();
      }
      
      console.log("Middleware: Not authenticated, redirecting to login");
      // Add a cache-busting parameter to prevent caching issues
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", "middleware");
      loginUrl.searchParams.set("t", Date.now().toString());
      
      // Create response with redirect
      const response = NextResponse.redirect(loginUrl);
      
      // Set cache control headers
      response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
      response.headers.set("Pragma", "no-cache");
      response.headers.set("Expires", "0");
      
      return response;
    } 
    
    if (isPublicPath && isAuthenticated && !isSignOutFlow) {
      // If user is already logged in and tries to access login page, redirect to dashboard
      // But don't redirect if they're trying to sign out
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

  // For all other requests, add cache control headers
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  
  return response;
}

// Configure which paths should use this middleware
export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"],
};
