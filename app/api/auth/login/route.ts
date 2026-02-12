import { NextResponse } from "next/server"
import { addActivity, createSession, readData } from "@/lib/server/store"
import { SESSION_COOKIE } from "@/lib/server/auth"

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const data = await readData()
  const user = data.users.find((item) => item.email === email && item.password === password)

  if (!user) {
    await addActivity({
      id: crypto.randomUUID(),
      type: "login_failed",
      device: "Browser",
      location: "Local",
      timestamp: new Date().toISOString(),
      status: "blocked",
    })
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const token = await createSession(user.id)
  await addActivity({
    id: crypto.randomUUID(),
    type: "login",
    device: "Browser",
    location: "Local",
    timestamp: new Date().toISOString(),
    status: "success",
  })

  const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } })
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  })
  return response
}
