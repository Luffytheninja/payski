"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, ArrowUpRight, ArrowDownLeft, QrCode, Plus, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TransactionDetail } from "@/components/transaction-detail"
import { formatCurrency } from "@/lib/mock-data"
import type { Transaction } from "@/lib/types"

export default function DashboardPage() {
  const [showBalance, setShowBalance] = useState(true)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  type DashboardAccount = { id: string; name: string; type: string; balance: number; color?: string }
  const [accounts, setAccounts] = useState<DashboardAccount[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const totalBalance = useMemo(
    () => accounts.reduce((sum, account) => sum + Number(account.balance ?? 0), 0),
    [accounts],
  )

  const load = useCallback(async () => {
    const [accountsRes, transactionsRes] = await Promise.all([fetch("/api/accounts"), fetch("/api/transactions")])
    if (accountsRes.ok) {
      const payload = await accountsRes.json()
      setAccounts((payload.accounts ?? []) as DashboardAccount[])
    }
    if (transactionsRes.ok) {
      const payload = await transactionsRes.json()
      setTransactions((payload.transactions ?? []) as Transaction[])
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      void load()
    }, 0)
    return () => clearTimeout(timer)
  }, [load])

  async function runAction(action: "send" | "request" | "scan") {
    const response = await fetch(`/api/actions/${action}`, { method: "POST" })
    if (!response.ok) return
    await load()
  }

  const recentTransactions = transactions.slice(0, 5)

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 bg-background border-b-2 border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Good evening</p>
            <h1 className="text-2xl font-black">Dashboard</h1>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="bg-foreground text-background border-0 relative overflow-hidden">
            <CardContent className="relative pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs uppercase tracking-wider opacity-60">Total Balance</span>
                <button onClick={() => setShowBalance(!showBalance)} className="p-1 opacity-60 hover:opacity-100 transition-opacity">
                  {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              <h2 className="text-5xl font-black tracking-tight mb-6">{showBalance ? formatCurrency(totalBalance) : "••••••"}</h2>
              <div className="flex gap-3">
                <button onClick={() => runAction("send")} className="flex-1 bg-background text-foreground py-3 font-bold uppercase text-sm flex items-center justify-center gap-2 border-2 border-background hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors touch-feedback"><ArrowUpRight size={18} />Send</button>
                <button onClick={() => runAction("request")} className="flex-1 bg-background text-foreground py-3 font-bold uppercase text-sm flex items-center justify-center gap-2 border-2 border-background hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors touch-feedback"><ArrowDownLeft size={18} />Request</button>
                <button onClick={() => runAction("scan")} className="flex-1 bg-background text-foreground py-3 font-bold uppercase text-sm flex items-center justify-center gap-2 border-2 border-background hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors touch-feedback"><QrCode size={18} />Scan</button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black uppercase tracking-tight">Accounts</h3>
            <button className="text-muted-foreground hover:text-foreground transition-colors"><Plus size={20} /></button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
            {accounts.map((account) => (
              <Card key={String(account.id)} className="w-48 flex-shrink-0 hover:-translate-y-1 cursor-pointer" style={{ borderColor: String(account.color ?? "#FAFF00") }}>
                <CardContent className="pt-4">
                  <div className="w-3 h-3 mb-2" style={{ backgroundColor: String(account.color ?? "#FAFF00") }} />
                  <p className="font-mono text-xs text-muted-foreground uppercase">{String(account.type)}</p>
                  <p className="font-bold text-sm mb-2">{String(account.name)}</p>
                  <p className="font-black text-lg">{showBalance ? formatCurrency(Number(account.balance ?? 0)) : "••••"}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black uppercase tracking-tight">Recent Activity</h3>
            <button className="font-mono text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">See All <ChevronRight size={14} /></button>
          </div>
          <div className="space-y-2">
            {recentTransactions.map((txn) => {
              const isCredit = txn.type === "credit"
              return (
                <Card key={txn.id} className="p-4 hover:-translate-y-0.5 cursor-pointer touch-feedback" onClick={() => setSelectedTransaction(txn)}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted border-2 border-border flex items-center justify-center text-lg">{txn.metadata?.icon || "💳"}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{txn.description}</p>
                      <p className="font-mono text-xs text-muted-foreground">{txn.merchant}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-black ${isCredit ? "text-green-500" : ""}`}>{isCredit ? "+" : "-"}{formatCurrency(Number(txn.amount))}</p>
                      {txn.status !== "completed" && <Badge variant="pending" className="mt-1">{txn.status}</Badge>}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedTransaction && <TransactionDetail transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />}
      </AnimatePresence>
    </div>
  )
}
