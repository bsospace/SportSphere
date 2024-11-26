import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.APP_SECRET,
    });

    const { pathname } = req.nextUrl;

    // Protect admin routes
    if (pathname.startsWith("/admin") && (!token || token.role !== "admin")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Protect staff routes
    if (pathname.startsWith("/staff") && (!token || token.role !== "staff")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/staff/:path*"], // Define routes to protect
};