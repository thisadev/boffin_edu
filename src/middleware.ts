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
    // Get the token
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET || "boffin-institute-secret-key-2025",
    });

    // If it's the login page and user is authenticated, redirect to dashboard
    if (pathname === '/admin/login' && token) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    // If it's not the login page and user is not authenticated, redirect to login
    if (pathname !== '/admin/login' && !token) {
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
