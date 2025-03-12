import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const isAuth = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });
  console.log(isAuth);
  const pathname = request.nextUrl.pathname;
  if (pathname === "/" && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (pathname === "/" && !isAuth) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (pathname.includes("/auth") && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (pathname.includes("/dashboard") && !isAuth) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  } else return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard", "/"],
};
