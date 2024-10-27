import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { currentUser } from './service/currentUser';
import { cookies } from 'next/headers';

type TDecodeUser = {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
  iat: number;
  exp: number;
};

type TRoleProps = keyof typeof RoleBasedRoutes;

// Role-based routing: USER and ADMIN
const RoleBasedRoutes = {
  USER: ['/profile', /^\/profile\/[a-zA-Z0-9]+$/],
  ADMIN: ['/admin-dashboard'],
};

const AuthPathname = ['/login', '/register'];

const PublicRoutes = [
  /^\/news-feed\/posts\/[a-zA-Z0-9]+$/,
  '/news-feed/posts',
  /^\/profile\/[a-zA-Z0-9]+$/,
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = (await currentUser()) as TDecodeUser | undefined;
  const accessToken = cookies().get('accessToken');

  // Allow access to public routes for both roles
  if (PublicRoutes.some((route) => pathname.match(route))) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login page for protected routes
  if (!user && !accessToken) {
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

    if (
      routes.some((route) =>
        typeof route === 'string'
          ? pathname.startsWith(route)
          : pathname.match(route)
      )
    ) {
      return NextResponse.next();
    }
  }

  // Redirect to home if no role-based route matches
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: [
    '/profile',
    '/admin-dashboard',
    '/admin-dashboard/:page*',
    '/news-feed/posts/:postId*',
    '/profile/:profileId*',
    '/login',
    '/register',
  ],
};
