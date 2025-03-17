import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for API routes, Next.js internal routes, and static assets
  if (pathname.includes('/api/') || 
      pathname.includes('/_next/') ||
      pathname.includes('/static/') ||
      pathname.includes('/images/') ||
      pathname.includes('favicon.ico') ||
      pathname.includes('/_next/image')) {
    return NextResponse.next();
  }

  // Only apply auth redirects to admin routes
  if (pathname.startsWith('/admin')) {
    try {
      // Get the token with more detailed options
      const token = await getToken({ 
        req: request,
        secret: process.env.NEXTAUTH_SECRET || "boffin-institute-secret-key-2025",
        secureCookie: process.env.NODE_ENV === "production",
      });

      // Add debug header to response (only in development)
      const response = NextResponse.next();
      if (process.env.NODE_ENV !== "production") {
        response.headers.set('x-auth-token-status', token ? 'present' : 'missing');
      }

      // If it's the login page and user is authenticated, redirect to dashboard
      if (pathname === '/admin/login' && token) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }

      // If it's not the login page and user is not authenticated, redirect to login
      if (pathname !== '/admin/login' && !token) {
        // Add the current URL as a parameter to redirect back after login
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }

      return response;
    } catch (error) {
      console.error('Middleware authentication error:', error);
      // On error, redirect to login page with error parameter
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('error', 'AuthError');
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
