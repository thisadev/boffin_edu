import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    console.log("Custom signout API route called");
    
    // Create headers for the response
    const responseHeaders = new Headers();
    
    // Set cookie clearing headers for each cookie name
    const cookieNames = [
      "next-auth.session-token",
      "next-auth.callback-url",
      "next-auth.csrf-token",
      "__Secure-next-auth.session-token",
      "__Host-next-auth.session-token"
    ];
    
    // Add each cookie expiration header individually
    cookieNames.forEach(name => {
      responseHeaders.append(
        "Set-Cookie", 
        `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`
      );
    });
    
    // Add cache control headers
    responseHeaders.append("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    responseHeaders.append("Pragma", "no-cache");
    responseHeaders.append("Expires", "0");
    
    // Return response with headers
    return NextResponse.json(
      { success: true, message: "Signed out successfully" },
      { status: 200, headers: responseHeaders }
    );
  } catch (error) {
    console.error("Error in custom signout route:", error);
    return NextResponse.json({ success: false, error: "Failed to sign out" }, { status: 500 });
  }
}
