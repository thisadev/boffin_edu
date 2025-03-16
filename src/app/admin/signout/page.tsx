"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    const performSignOut = async () => {
      try {
        console.log("SignOutPage: Starting sign-out process");
        
        // Use NextAuth's signOut function with redirect
        await signOut({ 
          callbackUrl: "/admin/login",
          redirect: true
        });
      } catch (error) {
        console.error("SignOutPage: Error during sign out:", error);
        // Redirect to login page if there's an error
        router.push("/admin/login");
      }
    };
    
    performSignOut();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Signing out...</h2>
        <p className="mt-2 text-gray-600">You will be redirected to the login page.</p>
      </div>
    </div>
  );
}
