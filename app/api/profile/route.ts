import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/server/auth"
import { readData, writeData } from "@/lib/server/store"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  return NextResponse.json({ profile: user })
}

export async function PATCH(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { name, phone } = await req.json()
  const data = await readData()
  const target = data.users.find((item) => item.id === user.id)
  if (!target) return NextResponse.json({ error: "User not found" }, { status: 404 })

  if (name) target.name = name
  if (phone) target.phone = phone
  await writeData(data)
  return NextResponse.json({ profile: target })
}
