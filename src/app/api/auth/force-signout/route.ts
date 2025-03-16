import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("Force signout API called");
  
  // Create a response that will redirect to the login page
  const response = NextResponse.redirect(new URL("/admin/login?forcedSignout=true&t=" + Date.now(), request.url));
  
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
    "__Host-next-auth.callback-url"
  ];
  
  // Clear all auth cookies by setting them to empty with past expiration
  cookiesToClear.forEach(name => {
    response.cookies.set({
      name,
      value: "",
      expires: new Date(0),
      path: "/",
    });
  });
  
  // Set cache control headers
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  
  return response;
}
