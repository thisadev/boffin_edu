import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === "/admin/login" || path.startsWith("/api/auth/");
  
  // Define admin paths that require authentication
  const isAdminPath = path.startsWith("/admin") && !isPublicPath;

  // Add cache control headers to all responses
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  
  // Special case for the force-signout API - always allow it without further checks
  if (path === "/api/auth/force-signout") {
    return response;
  }
  
  // For the dashboard page, let client-side code handle authentication
  if (path === "/admin/dashboard") {
    return response;
  }
  
  // For API routes, let them handle their own authentication
  if (path.startsWith("/api/")) {
    return response;
  }
  
  try {
    // Check for sign-out related parameters
    const hasSignOutParam = request.nextUrl.searchParams.has("signedOut") || 
                           request.nextUrl.searchParams.has("forcedSignout");
    
    // If this is the login page with sign-out parameters, don't do further checks
    if (path === "/admin/login" && hasSignOutParam) {
      return response;
    }
    
    // For protected admin routes (except dashboard which is handled client-side)
    if (isAdminPath && path !== "/admin/dashboard") {
      // Get the session token from the cookies
      const sessionCookie = request.cookies.get("next-auth.session-token");
      // Also check for the JWT token cookie which might be used in production
      const jwtCookie = request.cookies.get("__Secure-next-auth.session-token") || 
                       request.cookies.get("__Host-next-auth.session-token");
                       
      const isAuthenticated = !!sessionCookie || !!jwtCookie;
      
      console.log(`Middleware: Path=${path}, Authenticated=${isAuthenticated}`);
      
      if (!isAuthenticated) {
        console.log("Middleware: Not authenticated, redirecting to login");
        // Add a cache-busting parameter to prevent caching issues
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("from", "middleware");
        loginUrl.searchParams.set("t", Date.now().toString());
        
        const redirectResponse = NextResponse.redirect(loginUrl);
        // Copy the cache headers
        redirectResponse.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
        redirectResponse.headers.set("Pragma", "no-cache");
        redirectResponse.headers.set("Expires", "0");
        
        return redirectResponse;
      }
    }
  } catch (error) {
    console.error("Middleware error:", error);
  }

  return response;
}

// Configure which paths should use this middleware
export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"],
};
