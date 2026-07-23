import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';
import { cookies } from 'next/headers';

const protectedRoutes = ['/dashboard', '/tasks', '/calendar', '/analytics', '/profile', '/settings'];
const publicRoutes = ['/login', '/register', '/'];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // Check if current route is protected or public
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route) && path !== '/');
  const isPublicRoute = publicRoutes.includes(path);

  // Decrypt the session from the cookie
  const cookieStore = await cookies();
  const cookie = cookieStore.get('session')?.value;
  const session = await decrypt(cookie);

  // Redirect to /login if user is not authenticated and on a protected route
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Redirect to /dashboard if user is authenticated and on a public route
  if (
    isPublicRoute &&
    session?.userId &&
    !path.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
