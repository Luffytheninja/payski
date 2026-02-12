import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/server/auth"
import { appendTransaction } from "@/lib/server/store"

export async function POST() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  await appendTransaction({
    id: `txn_${crypto.randomUUID()}`,
    amount: 25,
    currency: "USD",
    type: "debit",
    status: "completed",
    description: "Quick Send",
    merchant: "Payski Transfer",
    category: "Transfer",
    date: new Date().toISOString(),
    accountId: "acc_main",
    metadata: { icon: "📤" },
  })

  return NextResponse.json({ ok: true })
}
