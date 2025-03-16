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
  
  // For API routes, let them handle their own authentication
  if (path.startsWith("/api/")) {
    return response;
  }
  
  try {
    // For protected admin routes
    if (isAdminPath) {
      // Check for session cookies from NextAuth
      const sessionCookie = request.cookies.get("next-auth.session-token");
      const jwtCookie = request.cookies.get("__Secure-next-auth.session-token") || 
                       request.cookies.get("__Host-next-auth.session-token");
                       
      const isAuthenticated = !!sessionCookie || !!jwtCookie;
      
      console.log(`Middleware: Path=${path}, Authenticated=${isAuthenticated}`);
      
      if (!isAuthenticated) {
        console.log("Middleware: Not authenticated, redirecting to login");
        // Redirect to login page
        const loginUrl = new URL("/admin/login", request.url);
        
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
