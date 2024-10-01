/* eslint-disable react-hooks/rules-of-hooks */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useServerUser } from "./hooks/useServerUser";

type TRoleProps = keyof typeof RoleBasedRoutes;
type TUserProps = {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  iat: number;
  exp: number;
};

const RoleBasedRoutes = {
  USER: [/^\/profile/],
  ADMIN: [/^\/admin-dashboard/],
};

const AuthPathname = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = (await useServerUser()) as TUserProps;

  // Redirect non-authenticated users trying to access news-feed routes to home page
  if (pathname.startsWith("/news-feed")) {
    if (!user) {
      return NextResponse.redirect(new URL("/", request.url)); // Redirect to home page
    }

    return NextResponse.next();
  }

  if (!user) {
    const isAuthPage = AuthPathname.includes(pathname);

    if (!isAuthPage) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }

    return NextResponse.next();
  }

  // Handle role-based routing for profile and admin-dashboard
  if (user?.role && RoleBasedRoutes[user.role as TRoleProps]) {
    const routes = RoleBasedRoutes[user.role as TRoleProps];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/news-feed/:path*",
    "/profile/:path*",
    "/admin-dashboard/:path*",
    "/login",
    "/register",
  ],
};
