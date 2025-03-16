"use client";

import { useState, useEffect } from "react";

export default function AuthTest() {
  const [envStatus, setEnvStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkEnv() {
      try {
        const response = await fetch('/api/check-auth-config');
        const data = await response.json();
        setEnvStatus(data);
      } catch (error) {
        console.error('Error checking auth config:', error);
        setEnvStatus({ error: 'Failed to check auth configuration' });
      } finally {
        setLoading(false);
      }
    }

    checkEnv();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Checking auth configuration...</h2>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Auth Configuration Test</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Environment Variables Status</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
          {JSON.stringify(envStatus, null, 2)}
        </pre>
      </div>

      <div className="mt-8">
        <a 
          href="/admin/login"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block mr-4"
        >
          Go to Login Page
        </a>
      </div>
    </div>
  );
}
