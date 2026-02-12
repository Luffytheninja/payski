import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/server/auth"
import { setInsightFeedback } from "@/lib/server/store"

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const { feedback } = await req.json()
  if (feedback !== "helpful" && feedback !== "not_helpful") {
    return NextResponse.json({ error: "Invalid feedback" }, { status: 400 })
  }

  const ok = await setInsightFeedback(id, feedback)
  if (!ok) return NextResponse.json({ error: "Insight not found" }, { status: 404 })
  return NextResponse.json({ ok: true })
}
