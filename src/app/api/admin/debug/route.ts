import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ENV } from '@/lib/env';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated as admin
    const isAdmin = session?.user?.role === 'admin';
    
    // Directly log environment variables to server console for debugging
    console.log('Environment variables in debug endpoint:');
    console.log('NEXTAUTH_URL:', ENV.NEXTAUTH_URL);
    console.log('NEXTAUTH_SECRET:', ENV.NEXTAUTH_SECRET ? 'is set' : 'not set');
    console.log('BLOB_READ_WRITE_TOKEN:', ENV.BLOB_READ_WRITE_TOKEN ? 'is set' : 'not set');
    
    // Get the Vercel Blob token (only show first few characters for security)
    const blobToken = ENV.BLOB_READ_WRITE_TOKEN || 'not set';
    const tokenPreview = blobToken.substring(0, 10) + '...';
    
    // Check if the token starts with the expected prefix
    const hasCorrectPrefix = blobToken.startsWith('vercel_blob_rw_');

    // Test token with a simple validation
    let tokenValidationResult = 'Not tested';
    let tokenLength = blobToken.length;
    let tokenFormat = 'Unknown';
    
    if (blobToken !== 'not set') {
      // Check token length (typical Vercel tokens are quite long)
      if (tokenLength < 50) {
        tokenValidationResult = 'Token appears to be truncated or incomplete';
        tokenFormat = 'Incomplete';
      } else if (!hasCorrectPrefix) {
        tokenValidationResult = 'Token does not have the correct prefix';
        tokenFormat = 'Invalid prefix';
      } else {
        tokenValidationResult = 'Token format appears valid';
        tokenFormat = 'Valid';
      }
    }
    
    return NextResponse.json({
      auth: {
        isAuthenticated: !!session,
        isAdmin,
        user: session?.user ? {
          name: session.user.name,
          email: session.user.email,
          role: session.user.role
        } : null
      },
      env: {
        blobToken: {
          preview: tokenPreview,
          isSet: blobToken !== 'not set',
          hasCorrectPrefix,
          length: tokenLength,
          validation: tokenValidationResult,
          format: tokenFormat
        },
        nextAuthUrl: ENV.NEXTAUTH_URL,
        nextAuthSecret: ENV.NEXTAUTH_SECRET ? 'is set' : 'not set',
        nodeEnv: ENV.NODE_ENV
      },
      headers: {
        userAgent: request.headers.get('user-agent') || 'not set'
      }
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({ error: 'Debug endpoint error' }, { status: 500 });
  }
}
