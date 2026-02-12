import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/server/auth"
import { appendTransaction } from "@/lib/server/store"

export async function POST() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  await appendTransaction({
    id: `txn_${crypto.randomUUID()}`,
    amount: 40,
    currency: "USD",
    type: "credit",
    status: "pending",
    description: "Quick Request",
    merchant: "Incoming Request",
    category: "Transfer",
    date: new Date().toISOString(),
    accountId: "acc_main",
    metadata: { icon: "📥" },
  })

  return NextResponse.json({ ok: true })
}
