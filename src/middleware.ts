import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type TRole = keyof typeof roleBasedPrivateRoute;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoute = {
  admin: [/^\/admin/],
  editor: [/^\/editor/],
  reporter: [/^\/reporter/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfor = await getCurrentUser();
  if (!userInfor) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (userInfor?.role && roleBasedPrivateRoute[userInfor?.role as TRole]) {
    const routes = roleBasedPrivateRoute[userInfor?.role as TRole];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/admin",
    "/admin/:page",
    "/editor",
    "/editor/:page",
    "/reporter",
    "/reporter/:page",
  ],
};
