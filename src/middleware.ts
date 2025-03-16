import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the request is for the admin section
  if (pathname.startsWith('/admin')) {
    // Skip middleware for API routes and auth routes
    if (pathname.startsWith('/admin/api') || pathname.includes('/api/auth')) {
      return NextResponse.next();
    }

    // Get the token
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET || "boffin-institute-secret-key-2025",
    });

    // If it's the login page and user is authenticated, redirect to dashboard
    if (pathname === '/admin/login' && token) {
      const url = new URL('/admin/dashboard', request.url);
      return NextResponse.redirect(url);
    }

    // If it's not the login page and user is not authenticated, redirect to login
    if (pathname !== '/admin/login' && !token) {
      const url = new URL('/admin/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
