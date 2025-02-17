import { routes } from "@/config/routes";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [routes.dashboard];
const publicRoutes = [routes.home, routes.signIn, routes.signUp];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const token = await getToken({ req });

  if (isProtectedRoute && !token?.jwt) {
    return NextResponse.redirect(`${req.nextUrl.origin}${routes.signIn}`);
  }

  if (isPublicRoute && token?.jwt) {
    return NextResponse.redirect(`${req.nextUrl.origin}${routes.dashboard}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
