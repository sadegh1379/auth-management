
import { NextRequest, NextResponse } from 'next/server';
import { ROUTES_AUTH } from './enums/routes';


export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(ROUTES_AUTH.BASE, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/']
};