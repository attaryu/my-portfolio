import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';

import { verifyToken } from './utils/jwt';

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);

  if (/^\/admin(?!\/login).*$/.test(url.pathname)) {
    const { cookies } = request;

    try {
      const token = cookies.get('auth');

      if (!token) {
        throw new Error('Token tidak ditemukan!');
      }

      if (!(await verifyToken(token.value))) {
        throw new Error('Token tidak valid!');
      }
    } catch {
      cookies.delete('auth');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}
