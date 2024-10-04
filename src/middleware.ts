import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // Use jose instead of jsonwebtoken

type TRoleProps = keyof typeof RoleBasedRoutes;
type TUserProps = {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  iat: number;
  exp: number;
};

// Define role-based routes
const RoleBasedRoutes = {
  USER: [/^\/profile/],
  ADMIN: [/^\/admin-dashboard/],
};

const CommonRoutes = [/^\/news-feed/];

const AuthPathname = ["/login", "/register"];

async function verifyToken(token: string, secret: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);

    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Get token from cookies
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    const isAuthPage = AuthPathname.includes(pathname);

    if (!isAuthPage) {
      // Ensure proper encoding for redirect URL
      const redirectUrl = encodeURIComponent(pathname + request.nextUrl.search);

      return NextResponse.redirect(
        new URL(`/login?redirect=${redirectUrl}`, request.url)
      );
    }

    return NextResponse.next();
  }

  // Verify the token using jose
  const user = (await verifyToken(
    token,
    process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN as string
  )) as TUserProps | null;

  if (!user) {
    // If token is invalid or expired, redirect to login
    const redirectUrl = encodeURIComponent(pathname + request.nextUrl.search);

    return NextResponse.redirect(
      new URL(`/login?redirect=${redirectUrl}`, request.url)
    );
  }

  // Allow both USER and ADMIN to access /news-feed
  if (CommonRoutes.some((route) => pathname.match(route))) {
    return NextResponse.next();
  }

  // Handle role-based routing for /profile and /admin-dashboard
  if (user?.role && RoleBasedRoutes[user.role as TRoleProps]) {
    const routes = RoleBasedRoutes[user.role as TRoleProps];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  const profileDetailRegex = /^\/profile\/\w+/;

  if (user?.role === "ADMIN" && profileDetailRegex.test(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// Match the following routes with the middleware
export const config = {
  matcher: [
    "/profile/:path*",
    "/admin-dashboard/:path*",
    "/news-feed/:path*",
    "/login",
    "/register",
  ],
};
