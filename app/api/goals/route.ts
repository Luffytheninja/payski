import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/server/auth"
import { readData, writeData } from "@/lib/server/store"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const data = await readData()
  return NextResponse.json({ goals: data.goals })
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { name, targetAmount } = await req.json()
  if (!name || !targetAmount) {
    return NextResponse.json({ error: "name and targetAmount are required" }, { status: 400 })
  }

  const data = await readData()
  const goal = {
    id: `goal_${crypto.randomUUID()}`,
    name,
    targetAmount: Number(targetAmount),
    currentAmount: 0,
    currency: "USD",
    deadline: null,
    color: "#22c55e",
    icon: "🎯",
    contributions: [],
    userId: user.id,
  }
  data.goals.unshift(goal)
  await writeData(data)
  return NextResponse.json({ goal }, { status: 201 })
}
