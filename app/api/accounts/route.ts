import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/server/auth"
import { readData } from "@/lib/server/store"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const data = await readData()
  const accounts = data.accounts.filter((acc) => !acc.userId || acc.userId === user.id)
  return NextResponse.json({ accounts })
}
