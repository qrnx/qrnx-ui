import { ROUTES } from "@/config/routes";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [ROUTES.home, ROUTES.signIn, ROUTES.signUp];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const segments = path.split("/");

  if (segments.length >= 3 && segments[1] === "dashboard") {
    const answerOptionId = segments[3] || null;

    if (answerOptionId) {
      return NextResponse.next();
    }
  }

  const isPublicRoute = publicRoutes.includes(path);

  const token = await getToken({ req });

  if (!isPublicRoute && !token?.jwt) {
    const signInUrl = new URL("/sign-in", req.nextUrl.origin);
    signInUrl.searchParams.set("error", "unauthorized");

    return NextResponse.redirect(signInUrl);
  }

  if (isPublicRoute && token?.jwt) {
    return NextResponse.redirect(`${req.nextUrl.origin}${ROUTES.dashboard}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
