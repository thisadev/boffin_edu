import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ENV } from '@/lib/env';

export async function GET(request: NextRequest) {
  try {
    // Try to get the session using getServerSession
    const session = await getServerSession(authOptions);
    
    // Log detailed information about the session
    console.log('Auth Test - Session:', JSON.stringify(session, null, 2));
    console.log('Auth Test - Session User:', session?.user);
    console.log('Auth Test - Session User Role:', session?.user?.role);
    
    // Check cookies for debugging
    const cookies = request.headers.get('cookie');
    console.log('Auth Test - Cookies:', cookies);
    
    // Check headers for debugging
    const headers = Object.fromEntries(request.headers.entries());
    console.log('Auth Test - Headers:', JSON.stringify(headers, null, 2));
    
    // Return detailed information about the authentication state
    return NextResponse.json({
      session: {
        exists: !!session,
        user: session?.user || null,
      },
      env: {
        nextAuthUrl: ENV.NEXTAUTH_URL,
        nextAuthSecret: ENV.NEXTAUTH_SECRET ? 'is set' : 'not set',
      },
      request: {
        cookies,
        headers: {
          ...headers,
          // Remove potentially sensitive headers
          cookie: '[redacted]',
          authorization: headers.authorization ? '[redacted]' : undefined,
        },
      },
    });
  } catch (error) {
    console.error('Auth Test Error:', error);
    return NextResponse.json({ 
      error: 'Authentication test failed', 
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}
