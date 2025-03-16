"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache"
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            console.log("User is already authenticated");
            setIsAuthenticated(true);
            router.push("/admin/dashboard");
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };

    // Check if we were redirected from sign-out
    const url = new URL(window.location.href);
    const forcedSignout = url.searchParams.get("forcedSignout");
    
    if (!forcedSignout) {
      checkAuth();
    } else {
      console.log("User was signed out");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Attempting to log in with", email);
      
      // Use our custom login API instead of NextAuth's signIn
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache"
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      console.log("Login response:", data);
      
      if (!response.ok) {
        setError(data.error || "Invalid email or password");
        setIsLoading(false);
      } else {
        // Successful login
        console.log("Login successful, redirecting to dashboard");
        setIsAuthenticated(true);
        
        // Use window.location for a hard redirect to avoid any caching issues
        window.location.href = "/admin/dashboard";
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    signIn("google", { callbackUrl: "/admin/dashboard" });
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Already authenticated</h2>
          <p className="mt-2 text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and header */}
        <div>
          <div className="flex justify-center">
            <Image 
              src="/images/boffin-logo.png" 
              alt="Boffin Institute Logo" 
              width={120} 
              height={120}
              className="mx-auto h-24 w-auto"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-boffin-background">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-boffin-background/70">
            Sign in to access the admin dashboard
          </p>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        {/* Google login button */}
        <div>
          <button
            onClick={handleGoogleLogin}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="flex items-center">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </span>
          </button>
        </div>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with email</span>
            </div>
          </div>
        </div>
        
        {/* Email/password form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-boffin-primary focus:border-boffin-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-boffin-primary focus:border-boffin-primary focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-boffin-background hover:bg-boffin-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-boffin-primary"
            >
              {isLoading ? "Signing in..." : "Sign in with Email"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
