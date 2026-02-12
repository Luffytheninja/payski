import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/server/auth"
import { readData, writeData } from "@/lib/server/store"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const data = await readData()
  const generated = {
    id: `ins_${Date.now()}`,
    type: "forecast",
    title: "Weekly snapshot",
    description: `You have ${data.transactions.length} tracked transactions`,
    explanation: "This insight is generated from your current transaction count.",
    createdAt: new Date().toISOString(),
    isActionable: false,
    feedback: null,
  }

  if (!data.insights.find((insight) => insight.id === generated.id)) {
    data.insights.unshift(generated)
    await writeData(data)
  }

  return NextResponse.json({ insights: data.insights })
}
