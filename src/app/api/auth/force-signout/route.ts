import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("Force signout API called");
  
  // Create a response that will redirect to the login page with a timestamp to prevent caching
  const timestamp = Date.now();
  const response = NextResponse.redirect(new URL(`/admin/login?forcedSignout=true&t=${timestamp}`, request.url));
  
  // List of all possible auth-related cookies
  const cookiesToClear = [
    "next-auth.session-token",
    "next-auth.csrf-token",
    "next-auth.callback-url",
    "__Secure-next-auth.session-token",
    "__Host-next-auth.session-token",
    "__Secure-next-auth.csrf-token",
    "__Host-next-auth.csrf-token",
    "__Secure-next-auth.callback-url",
    "__Host-next-auth.callback-url",
    // Add any other possible cookies
    "next-auth.session-token.0",
    "next-auth.session-token.1",
    "next-auth.pkce.code_verifier"
  ];
  
  // Clear all auth cookies by setting them to empty with past expiration
  cookiesToClear.forEach(name => {
    response.cookies.set({
      name,
      value: "",
      expires: new Date(0),
      path: "/",
      sameSite: "lax"
    });
  });
  
  // Set cache control headers
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  
  return response;
}
