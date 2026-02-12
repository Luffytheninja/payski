import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedPrefixes = ["/dashboard", "/timeline", "/insights", "/goals", "/profile", "/security"]

export function proxy(request: NextRequest) {
  const token = request.cookies.get("payski_session")?.value
  const { pathname } = request.nextUrl

  const isProtected = protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
  const isAuthPage = pathname === "/login"

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/timeline/:path*", "/insights/:path*", "/goals/:path*", "/profile/:path*", "/security/:path*", "/login"],
}
