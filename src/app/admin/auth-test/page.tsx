"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function AuthTestPage() {
  const { data: session, status } = useSession();
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAuthTest = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/auth-test');
      const data = await response.json();
      setApiResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthTest();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Test Page</h1>
      
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Client-Side Session</h2>
        <div className="mb-2">
          <span className="font-medium">Status:</span> {status}
        </div>
        {session ? (
          <div>
            <div className="mb-2">
              <span className="font-medium">User:</span> {session.user?.name} ({session.user?.email})
            </div>
            <div className="mb-2">
              <span className="font-medium">Role:</span> {session.user?.role || 'No role'}
            </div>
            <pre className="bg-gray-100 p-3 rounded overflow-auto max-h-60 text-sm">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="text-red-500">No session found</div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Server-Side Session Test</h2>
        <button 
          onClick={fetchAuthTest}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Testing...' : 'Test Authentication'}
        </button>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {apiResponse && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">API Response:</h3>
            <div className="mb-4 p-3 bg-gray-100 rounded">
              <div className="font-medium">Session Exists: </div>
              <div className={apiResponse.session.exists ? 'text-green-600' : 'text-red-600'}>
                {apiResponse.session.exists ? 'Yes' : 'No'}
              </div>
            </div>
            
            {apiResponse.session.user && (
              <div className="mb-4 p-3 bg-gray-100 rounded">
                <div className="font-medium">User Information:</div>
                <pre className="overflow-auto max-h-40 text-sm">
                  {JSON.stringify(apiResponse.session.user, null, 2)}
                </pre>
              </div>
            )}
            
            <div className="mb-4 p-3 bg-gray-100 rounded">
              <div className="font-medium">Environment Variables:</div>
              <pre className="overflow-auto max-h-40 text-sm">
                {JSON.stringify(apiResponse.env, null, 2)}
              </pre>
            </div>
            
            <div className="p-3 bg-gray-100 rounded">
              <div className="font-medium">Request Details:</div>
              <pre className="overflow-auto max-h-40 text-sm">
                {JSON.stringify(apiResponse.request, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
