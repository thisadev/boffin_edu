"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    const performSignOut = async () => {
      try {
        console.log("SignOutPage: Starting complete sign-out process");
        
        // Clear all browser storage
        localStorage.clear();
        sessionStorage.clear();
        
        // Clear all cookies by setting expiration to past date
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
        }
        
        console.log("SignOutPage: Cleared all cookies and storage");
        
        // Call our custom sign-out API
        await fetch("/api/auth/custom-signout", {
          method: "POST",
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            "Pragma": "no-cache"
          }
        });
        
        console.log("SignOutPage: Called custom sign-out API");
        
        // Use NextAuth's signOut function
        await signOut({ redirect: false });
        
        console.log("SignOutPage: Called NextAuth signOut");
        
        // Force a complete page reload to clear any in-memory state
        // and redirect to login with cache-busting parameter
        const timestamp = Date.now();
        console.log("SignOutPage: Redirecting to login with timestamp", timestamp);
        
        // Use window.location for a hard redirect that bypasses Next.js router
        window.location.href = `/admin/login?signedOut=true&t=${timestamp}`;
      } catch (error) {
        console.error("SignOutPage: Error during sign out:", error);
        // Force redirect anyway
        window.location.href = "/admin/login?signedOut=true&error=true";
      }
    };
    
    performSignOut();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-900">Signing Out...</h1>
        <p className="text-gray-600 mb-4">Please wait while we sign you out.</p>
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900 mx-auto"></div>
      </div>
    </div>
  );
}
