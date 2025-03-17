import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// A simpler middleware that only checks for the presence of the session cookie
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
    // Check for session token in cookies
    const sessionToken = request.cookies.get('next-auth.session-token') || 
                         request.cookies.get('__Secure-next-auth.session-token');
    
    console.log('Middleware: Checking path:', pathname);
    console.log('Middleware: Session token exists:', !!sessionToken);
    
    // If it's the login page and user is authenticated, redirect to dashboard
    if (pathname === '/admin/login' && sessionToken) {
      console.log('Middleware: Authenticated user on login page, redirecting to dashboard');
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    // If it's not the login page and user is not authenticated, redirect to login
    if (pathname !== '/admin/login' && !sessionToken) {
      console.log('Middleware: Unauthenticated user on protected page, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // User is authenticated and accessing a protected page
    console.log('Middleware: Authenticated user accessing protected page');
    return NextResponse.next();
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
