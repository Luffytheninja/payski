import { NextResponse } from "next/server"
import { addUser, createSession, readData } from "@/lib/server/store"
import { SESSION_COOKIE } from "@/lib/server/auth"

export async function POST(req: Request) {
  const { name, email, phone, password } = await req.json()

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const data = await readData()
  if (data.users.some((user) => user.email === email)) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 })
  }

  const user = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
    password,
    createdAt: new Date().toISOString(),
  }

  await addUser(user)
  const token = await createSession(user.id)
  const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } }, { status: 201 })
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  })
  return response
}
