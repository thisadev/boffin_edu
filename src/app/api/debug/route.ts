import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only show first few characters of token for security
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN || 'not set';
    const tokenPreview = blobToken.substring(0, 15) + '...';
    
    return NextResponse.json({
      env: {
        blobToken: tokenPreview,
        nextAuthUrl: process.env.NEXTAUTH_URL || 'not set',
        nextAuthSecret: process.env.NEXTAUTH_SECRET ? 'is set' : 'not set',
      },
      auth: {
        isAuthenticated: !!session,
        role: session?.user?.role || 'none',
      }
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({ error: 'Debug endpoint error' }, { status: 500 });
  }
}
