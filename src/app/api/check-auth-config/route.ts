import { NextResponse } from 'next/server';

export async function GET() {
  // Check for essential NextAuth environment variables
  const authConfig = {
    nextAuthUrl: process.env.NEXTAUTH_URL || 'Not set',
    nextAuthSecret: process.env.NEXTAUTH_SECRET ? 'Set (value hidden)' : 'Not set',
    googleClientId: process.env.GOOGLE_CLIENT_ID ? 'Set (value hidden)' : 'Not set',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ? 'Set (value hidden)' : 'Not set',
    // Don't expose actual values for security reasons
    nodeEnv: process.env.NODE_ENV || 'Not set',
    // Include other relevant config without exposing sensitive data
    authProviders: ['google'],
    restrictedDomain: 'boffin.lk',
  };

  return NextResponse.json(authConfig);
}
