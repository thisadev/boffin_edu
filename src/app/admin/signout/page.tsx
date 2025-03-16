"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    const performSignOut = async () => {
      try {
        console.log("SignOutPage: Clearing cookies and storage");
        
        // Clear all local storage items
        localStorage.clear();
        sessionStorage.clear();
        
        // Clear specific NextAuth items
        localStorage.removeItem("next-auth.session-token");
        localStorage.removeItem("next-auth.callback-url");
        localStorage.removeItem("next-auth.csrf-token");
        sessionStorage.removeItem("next-auth.session-token");
        sessionStorage.removeItem("next-auth.callback-url");
        sessionStorage.removeItem("next-auth.csrf-token");
        
        // First call our custom signout endpoint to clear cookies
        await fetch("/api/auth/custom-signout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        // Then use the NextAuth signOut function
        await signOut({ redirect: false });
        
        // Add a small delay to ensure everything is processed
        setTimeout(() => {
          // Finally, force a hard redirect to the login page
          window.location.href = "/admin/login?signedOut=true&t=" + Date.now();
        }, 500);
      } catch (error) {
        console.error("SignOutPage: Error during sign out:", error);
        // Force redirect anyway
        window.location.href = "/admin/login?signedOut=true&error=true&t=" + Date.now();
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
