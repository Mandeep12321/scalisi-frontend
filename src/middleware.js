import {
  AUTH_ROUTES,
  PROTECTED_ROUTES,
} from "./developmentContent/protected-routes";
import { NextResponse } from "next/server";
import { handleDecrypt } from "./resources/utils/helper";

// Decodes JWT payload and checks if expired
function isTokenExpired(token) {
  if (!token) return true;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;
    
    // Decode base64url payload safely (adding back base64 padding)
    const base64Url = parts[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    
    const payload = JSON.parse(jsonPayload);
    if (!payload.exp) return false;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= payload.exp;
  } catch (error) {
    console.error("Token expiration check failed:", error);
    return true;
  }
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Ignore static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/.well-known") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  console.log("Middleware triggered for path:", pathname);

  const decryptedToken = handleDecrypt(request.cookies.get("_xpdx")?.value);
  
  // Only validate expiration when trying to access auth pages (login/signup) to prevent loops.
  // This isolates the check and prevents any false positives on protected catalog/checkout pages.
  let isExpired = false;
  if (decryptedToken && AUTH_ROUTES.includes(pathname)) {
    isExpired = isTokenExpired(decryptedToken);
  }
  
  const accessToken = isExpired ? "" : decryptedToken;

  console.log("Access token status: valid =", !!accessToken);

  if (!accessToken && PROTECTED_ROUTES.includes(pathname)) {
    console.log("No access token, redirecting to home");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    console.log("User logged in, redirecting from auth route to home");
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("Request allowed:", pathname);

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};