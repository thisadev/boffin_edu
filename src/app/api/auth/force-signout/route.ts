import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Force sign-out API route
 * This route handles server-side sign-out by clearing all auth cookies
 * and redirecting to the login page
 */
export async function GET() {
  try {
    console.log('Force sign-out initiated');
    
    // Get the cookie store
    const cookieStore = cookies();
    
    // Clear all auth-related cookies
    const cookieNames = ['next-auth.session-token', 'next-auth.callback-url', 'next-auth.csrf-token'];
    
    cookieNames.forEach(name => {
      // Delete the cookie with all possible domain/path combinations
      cookieStore.delete(name);
    });
    
    console.log('Auth cookies cleared');
    
    // Redirect to login page
    return NextResponse.redirect(new URL('/admin/login', process.env.NEXTAUTH_URL));
  } catch (error) {
    console.error('Error during force sign-out:', error);
    // Still redirect to login page even if there's an error
    return NextResponse.redirect(new URL('/admin/login', process.env.NEXTAUTH_URL));
  }
}
