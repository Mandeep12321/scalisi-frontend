import {
  AUTH_ROUTES,
  PROTECTED_ROUTES,
} from "./developmentContent/protected-routes";
import { NextResponse } from "next/server";
import { handleDecrypt } from "./resources/utils/helper";

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

  const accessToken = handleDecrypt(request.cookies.get("_xpdx")?.value);

  console.log("Access token:", accessToken);

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