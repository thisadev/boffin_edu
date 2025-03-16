import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    console.log("Custom signout API route called");
    
    // Clear all cookies related to authentication
    const cookieStore = cookies();
    const cookieNames = ["next-auth.session-token", "next-auth.callback-url", "next-auth.csrf-token"];
    
    // Use set method with empty value and past expiration to delete cookies
    cookieNames.forEach(name => {
      // Set the cookie with an expiration date in the past to effectively delete it
      cookieStore.set(name, "", { expires: new Date(0) });
    });
    
    return NextResponse.json({ success: true, message: "Signed out successfully" });
  } catch (error) {
    console.error("Error in custom signout route:", error);
    return NextResponse.json({ success: false, error: "Failed to sign out" }, { status: 500 });
  }
}
