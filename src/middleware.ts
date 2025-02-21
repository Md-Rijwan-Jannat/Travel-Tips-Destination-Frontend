import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { currentUser } from "./service/currentUser";

type TDecodeUser = {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  iat: number;
  exp: number;
};

type TRoleProps = keyof typeof RoleBasedRoutes;

// Role-based routing: USER and ADMIN
const RoleBasedRoutes = {
  USER: [
    "/profile",
    "/add-connections",
    "messages",
    /^\/news-feed\/posts\/[a-zA-Z0-9]+$/,
    /^\/profile\/[a-zA-Z0-9]+$/,
    "/settings",
  ],
  ADMIN: [
    "/admin-dashboard",
    /^\/admin-dashboard\/.+$/,
    /^\/news-feed\/posts\/[a-zA-Z0-9]+$/,
    /^\/profile\/[a-zA-Z0-9]+$/,
    "/settings",
    "/add-connections",
    "messages",
  ],
};

const AuthPathname = ["/login", "/register"];

const PublicRoutes = [
  /^\/news-feed\/posts\/[a-zA-Z0-9]+$/,
  "/news-feed/posts",
  /^\/profile\/[a-zA-Z0-9]+$/,
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = (await currentUser()) as TDecodeUser | undefined;
  const accessToken = request.cookies.get("accessToken")?.value; // ✅ FIXED: Correct way to get cookies in middleware

  // ✅ Allow access to public routes
  if (PublicRoutes.some((route) => pathname.match(route))) {
    return NextResponse.next();
  }

  // ✅ Redirect unauthenticated users to login
  if (!user && !accessToken) {
    if (!AuthPathname.includes(pathname)) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }

    return NextResponse.next();
  }

  // ✅ Redirect authenticated users after login based on role
  if (pathname === "/login" && user?.role) {
    const redirectTo =
      user.role === "ADMIN" ? "/admin-dashboard/analytics" : "/news-feed/posts";

    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  // ✅ Handle role-based routing
  if (user?.role && RoleBasedRoutes[user.role as TRoleProps]) {
    const allowedRoutes = RoleBasedRoutes[user.role as TRoleProps];

    if (allowedRoutes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // ✅ Redirect to home if no valid route is matched
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/profile",
    "/admin-dashboard",
    "/admin-dashboard/:page*",
    "/news-feed/posts/:postId*",
    "/profile/:profileId*",
    "/settings",
    "/login",
    "/register",
  ],
};
