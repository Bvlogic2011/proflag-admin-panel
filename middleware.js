import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (req.nextUrl.pathname.startsWith("/admin")) {
        if (!token) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }

        // if (token.role !== "admin" && token.role !== "super_admin") {
        //     return NextResponse.redirect(new URL("/403", req.url));
        // }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
