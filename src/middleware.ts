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

const RoleBasedRoutes = {
  USER: [/^\/profile\/[a-zA-Z0-9]+$/, /^\/profile$/],
  ADMIN: [/^\/admin-dashboard/],
};

const AuthPathname = ["/login", "/register"];

// Public routes for both USER and ADMIN
const PublicRoutes = [
  /^\/news-feed\/posts\/[a-zA-Z0-9]+$/,
  /^\/profile\/[a-zA-Z0-9]+$/, // Dynamic profile routes
  "/news-feed/posts",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = currentUser() as TDecodeUser | undefined;

  // Allow access to public routes for both roles
  if (PublicRoutes.some((route) => pathname.match(route))) {
    return NextResponse.next();
  }

  // Handle authentication-protected routes
  if (!user) {
    const isAuthPage = AuthPathname.includes(pathname);

    if (!isAuthPage) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }

    return NextResponse.next();
  }

  // Handle role-based routing
  if (user?.role && RoleBasedRoutes[user.role as TRoleProps]) {
    const routes = RoleBasedRoutes[user.role as TRoleProps];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // Redirect to home if no match
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/profile",
    "/admin-dashboard",
    "/admin-dashboard/:page*",
    "/news-feed/posts/:postId*",
    "/profile/:profileId*",
    "/login",
    "/register",
  ],
};
