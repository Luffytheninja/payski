import { cookies } from "next/headers"
import { getUserBySession } from "@/lib/server/store"

export const SESSION_COOKIE = "payski_session"

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  return getUserBySession(token)
}
