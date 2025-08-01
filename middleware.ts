import { adminAuth } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  // If no token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/sign", req.url));
  }

  try {
    await adminAuth.verifyIdToken(token);
    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/saved-ideas/:path*"], // add any protected paths
};
