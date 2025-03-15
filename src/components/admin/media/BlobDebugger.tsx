"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function BlobDebugger() {
  const { data: session, status } = useSession();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDebugInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/debug');
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setDebugInfo(data);
      } catch (err) {
        console.error('Error fetching debug info:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchDebugInfo();
    }
  }, [status]);

  if (status === 'loading' || loading) {
    return (
      <div className="p-6 bg-white rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Vercel Blob Debugger</h2>
        <div className="flex items-center justify-center p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-2">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="p-6 bg-white rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Vercel Blob Debugger</h2>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700">
          <p>You must be logged in to view this information.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Vercel Blob Debugger</h2>
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Vercel Blob Debugger</h2>
      
      {debugInfo && (
        <div className="space-y-6">
          <div className="rounded-md border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h3 className="font-medium text-gray-700">Authentication Status</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-gray-500">Authenticated:</div>
                <div className="text-sm text-gray-900">{debugInfo.auth.isAuthenticated ? 'Yes' : 'No'}</div>
                
                <div className="text-sm font-medium text-gray-500">Admin Role:</div>
                <div className="text-sm text-gray-900">{debugInfo.auth.isAdmin ? 'Yes' : 'No'}</div>
                
                {debugInfo.auth.user && (
                  <>
                    <div className="text-sm font-medium text-gray-500">User:</div>
                    <div className="text-sm text-gray-900">{debugInfo.auth.user.name} ({debugInfo.auth.user.email})</div>
                    
                    <div className="text-sm font-medium text-gray-500">Role:</div>
                    <div className="text-sm text-gray-900">{debugInfo.auth.user.role}</div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="rounded-md border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h3 className="font-medium text-gray-700">Environment Variables</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm font-medium text-gray-500">BLOB_READ_WRITE_TOKEN:</div>
                <div className="text-sm text-gray-900">
                  {debugInfo.env.blobToken.isSet ? (
                    <span className="text-green-600">{debugInfo.env.blobToken.preview} (Set)</span>
                  ) : (
                    <span className="text-red-600">Not set</span>
                  )}
                </div>
                
                <div className="text-sm font-medium text-gray-500">Token Format:</div>
                <div className="text-sm text-gray-900">
                  {debugInfo.env.blobToken.hasCorrectPrefix ? (
                    <span className="text-green-600">Correct prefix</span>
                  ) : (
                    <span className="text-red-600">Incorrect prefix (should start with vercel_blob_rw_)</span>
                  )}
                </div>
                
                <div className="text-sm font-medium text-gray-500">Token Length:</div>
                <div className="text-sm text-gray-900">{debugInfo.env.blobToken.length} characters</div>
                
                <div className="text-sm font-medium text-gray-500">Token Validation:</div>
                <div className="text-sm text-gray-900">
                  {debugInfo.env.blobToken.format === 'Valid' ? (
                    <span className="text-green-600">{debugInfo.env.blobToken.validation}</span>
                  ) : (
                    <span className="text-red-600">{debugInfo.env.blobToken.validation}</span>
                  )}
                </div>
                
                <div className="text-sm font-medium text-gray-500">Node Environment:</div>
                <div className="text-sm text-gray-900">{debugInfo.env.nodeEnv}</div>
                
                <div className="text-sm font-medium text-gray-500">NEXTAUTH_URL:</div>
                <div className="text-sm text-gray-900">{debugInfo.env.nextAuthUrl}</div>
                
                <div className="text-sm font-medium text-gray-500">NEXTAUTH_SECRET:</div>
                <div className="text-sm text-gray-900">{debugInfo.env.nextAuthSecret}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-700">
            <p className="text-sm font-medium">Troubleshooting Tips:</p>
            <ul className="mt-2 text-sm list-disc list-inside space-y-1">
              <li>Make sure your BLOB_READ_WRITE_TOKEN starts with "vercel_blob_rw_"</li>
              <li>Check that there are no quotes or spaces in your .env file</li>
              <li>Verify that your token is not truncated (should be longer than 50 characters)</li>
              <li>Try restarting your Next.js server after making changes to .env</li>
              <li>Make sure you're logged in as an admin user</li>
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-medium text-gray-700 mb-2">Fix Token Issue</h3>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <p className="text-sm text-gray-700 mb-2">Based on the debug information, your Vercel Blob token appears to be truncated or incomplete. Here's how to fix it:</p>
              <ol className="text-sm list-decimal list-inside space-y-1 text-gray-700">
                <li>Open your <code className="bg-gray-100 px-1 py-0.5 rounded">.env</code> file</li>
                <li>Update your BLOB_READ_WRITE_TOKEN with a complete token from Vercel</li>
                <li>Make sure the token format is: <code className="bg-gray-100 px-1 py-0.5 rounded">BLOB_READ_WRITE_TOKEN=vercel_blob_rw_your_complete_token</code></li>
                <li>Save the file and restart your Next.js server</li>
              </ol>
              <p className="text-sm text-gray-700 mt-2">You can get a new token from the <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Vercel Dashboard</a> under Storage → Blob → Connect.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
