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
      pathname.includes('favicon.ico')) {
    return NextResponse.next();
  }

  // Only apply auth redirects to admin routes
  if (pathname.startsWith('/admin')) {
    try {
      // Get the token
      const token = await getToken({ 
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
      
      // Add debug header to see if token exists
      const response = NextResponse.next();
      response.headers.set('x-debug-has-token', token ? 'yes' : 'no');
      response.headers.set('x-debug-path', pathname);
      
      // If it's the login page and user is authenticated, redirect to dashboard
      if (pathname === '/admin/login' && token) {
        console.log('Middleware: Authenticated user on login page, redirecting to dashboard');
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }

      // If it's not the login page and user is not authenticated, redirect to login
      if (pathname !== '/admin/login' && !token) {
        console.log('Middleware: Unauthenticated user on protected page, redirecting to login');
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      // User is authenticated and accessing a protected page
      console.log('Middleware: Authenticated user accessing protected page');
      return response;
    } catch (error) {
      console.error('Middleware authentication error:', error);
      // On error, redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
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
