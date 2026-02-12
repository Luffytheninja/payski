import { NextResponse } from "next/server"
import { appendTransaction, getUserBySession, readData } from "@/lib/server/store"
import { cookies } from "next/headers"
import { SESSION_COOKIE } from "@/lib/server/auth"

async function requireUser() {
  const c = await cookies()
  const token = c.get(SESSION_COOKIE)?.value
  return getUserBySession(token)
}

export async function GET() {
  const user = await requireUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const data = await readData()
  return NextResponse.json({ transactions: data.transactions })
}

export async function POST(req: Request) {
  const user = await requireUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const amount = Number(body.amount)
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
  }

  const transaction = {
    id: `txn_${crypto.randomUUID()}`,
    amount,
    currency: "USD",
    type: body.type ?? "debit",
    status: body.status ?? "completed",
    description: body.description ?? "Transaction",
    merchant: body.merchant ?? "Payski",
    category: body.category ?? "General",
    date: new Date().toISOString(),
    accountId: body.accountId ?? "acc_main",
    metadata: body.metadata ?? { icon: "💸" },
    userId: user.id,
  }

  await appendTransaction(transaction)
  return NextResponse.json({ transaction }, { status: 201 })
}
