import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { destroySession } from "@/lib/server/store"
import { SESSION_COOKIE } from "@/lib/server/auth"

export async function POST() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  await destroySession(token)

  const response = NextResponse.json({ ok: true })
  response.cookies.set(SESSION_COOKIE, "", { maxAge: 0, path: "/" })
  return response
}
