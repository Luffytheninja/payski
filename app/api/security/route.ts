import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/server/auth"
import { readData } from "@/lib/server/store"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const data = await readData()
  const score = Math.max(70, 100 - data.activities.filter((a) => a.type === "login_failed").length * 5)
  return NextResponse.json({
    score,
    activities: data.activities,
    devices: data.devices,
  })
}
