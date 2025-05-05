// import authConfig from "@/auth.config";
// import NextAuth from "next-auth";
// import {
// 	DEFAULT_LOGIN_REDIRECT,
// 	apiAuthPrefix,
// 	authRoutes,
// 	publicRoutes,
// } from "@/route";
// import { NextResponse } from "next/server";

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
// 	const { nextUrl } = req; //instead of writing req.nextUrl
// 	const isLoggedIn = !!req.auth; //return if there is a seesion

// 	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
// 	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
// 	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

// 	if (isApiAuthRoute) return NextResponse.next(); //or null
// 	if (isAuthRoute) {
// 		if (isLoggedIn) {
// 			return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
// 		}
// 		return NextResponse.next();
// 	}
// 	if (!isLoggedIn && !isPublicRoute) {
// 		return NextResponse.redirect(new URL("/auth/login", nextUrl));
// 	}
// 	return NextResponse.next();
// });

import { getSessionCookie } from "better-auth/cookies";
import { NextResponse } from "next/server";

export default async function Middleware(request: Request) {
	const sessionCookie = getSessionCookie(request);

	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}
	return NextResponse.next();
}

// Optionally, don't invoke Middleware on some paths
export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)", "/home"],
};
