// Environment variable loader

// Load environment variables with fallbacks
export const ENV = {
  // NextAuth configuration
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3002',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'bH79Dube7yGAm92VYRSS/Y5QUeX6JVeboDxv1M44x/g=',
  
  // Vercel Blob configuration
  BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN || '',
  
  // Database configuration
  DATABASE_URL: process.env.DATABASE_URL || '',
  
  // Node environment
  NODE_ENV: process.env.NODE_ENV || 'development',
};

// Log environment variables during initialization (only in development)
if (ENV.NODE_ENV === 'development') {
  console.log('Environment variables loaded:');
  console.log('NEXTAUTH_URL:', ENV.NEXTAUTH_URL);
  console.log('NEXTAUTH_SECRET:', ENV.NEXTAUTH_SECRET ? 'is set' : 'not set');
  console.log('BLOB_READ_WRITE_TOKEN:', ENV.BLOB_READ_WRITE_TOKEN ? 'is set' : 'not set');
}
