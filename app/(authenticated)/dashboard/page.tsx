"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, ArrowUpRight, ArrowDownLeft, QrCode, Plus, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TransactionDetail } from "@/components/transaction-detail"
import { Sheet } from "@/components/ui/sheet"
import {
    mockAccounts,
    getTotalBalance,
    getRecentTransactions,
    formatCurrency
} from "@/lib/mock-data"
import { notImplementedToast } from "@/lib/not-implemented-toast"
import type { Transaction } from "@/lib/types"

type QuickAction = "send" | "request" | "scan" | null

const quickActionContent: Record<Exclude<QuickAction, null>, { title: string, description: string }> = {
    send: {
        title: "Send money",
        description: "Select a contact, enter an amount, and review transfer details.",
    },
    request: {
        title: "Request money",
        description: "Pick who should pay you, add a note, and share the request.",
    },
    scan: {
        title: "Scan to pay",
        description: "Point your camera at a QR code to start a secure payment.",
    },
}

export default function DashboardPage() {
    const [showBalance, setShowBalance] = useState(true)
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
    const [activeQuickAction, setActiveQuickAction] = useState<QuickAction>(null)
    const totalBalance = getTotalBalance()
    const recentTransactions = getRecentTransactions(5)

    return (
        <div className="min-h-screen">
            <header className="sticky top-0 z-30 bg-background border-b-2 border-border px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Good evening</p>
                        <h1 className="text-2xl font-black">Alex</h1>
                    </div>
                    <div className="w-10 h-10 bg-accent border-2 border-border flex items-center justify-center font-black text-accent-foreground">
                        A
                    </div>
                </div>
            </header>

            <div className="p-6 space-y-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <Card className="bg-foreground text-background border-0 relative overflow-hidden">
                        <div
                            className="absolute inset-0 opacity-5"
                            style={{
                                backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                                backgroundSize: "12px 12px"
                            }}
                        />
                        <CardContent className="relative pt-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-xs uppercase tracking-wider opacity-60">Total Balance</span>
                                <button
                                    onClick={() => setShowBalance(!showBalance)}
                                    className="p-1 opacity-60 hover:opacity-100 transition-opacity"
                                >
                                    {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                            <h2 className="text-5xl font-black tracking-tight mb-6">
                                {showBalance ? formatCurrency(totalBalance) : "••••••"}
                            </h2>

                            <div className="flex gap-3">
                                <button onClick={() => setActiveQuickAction("send")} className="flex-1 bg-background text-foreground py-3 font-bold uppercase text-sm flex items-center justify-center gap-2 border-2 border-background hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors touch-feedback">
                                    <ArrowUpRight size={18} />
                                    Send
                                </button>
                                <button onClick={() => setActiveQuickAction("request")} className="flex-1 bg-background text-foreground py-3 font-bold uppercase text-sm flex items-center justify-center gap-2 border-2 border-background hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors touch-feedback">
                                    <ArrowDownLeft size={18} />
                                    Request
                                </button>
                                <button onClick={() => setActiveQuickAction("scan")} className="flex-1 bg-background text-foreground py-3 font-bold uppercase text-sm flex items-center justify-center gap-2 border-2 border-background hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors touch-feedback">
                                    <QrCode size={18} />
                                    Scan
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-black uppercase tracking-tight">Accounts</h3>
                        <button
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => notImplementedToast("Add account")}
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
                        {mockAccounts.map((account, i) => (
                            <motion.div key={account.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                                <Card
                                    className="w-48 flex-shrink-0 hover:-translate-y-1 cursor-pointer"
                                    style={{ borderColor: account.color }}
                                    onClick={() => notImplementedToast(`${account.name} details`)}
                                >
                                    <CardContent className="pt-4">
                                        <div className="w-3 h-3 mb-2" style={{ backgroundColor: account.color }} />
                                        <p className="font-mono text-xs text-muted-foreground uppercase">{account.type}</p>
                                        <p className="font-bold text-sm mb-2">{account.name}</p>
                                        <p className="font-black text-lg">{showBalance ? formatCurrency(account.balance) : "••••"}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-black uppercase tracking-tight">Recent Activity</h3>
                        <Link href="/timeline" className="font-mono text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                            See All <ChevronRight size={14} />
                        </Link>
                    </div>
                    <div className="space-y-2">
                        {recentTransactions.map((txn, i) => (
                            <TransactionRow key={txn.id} transaction={txn} delay={i * 0.05} onClick={() => setSelectedTransaction(txn)} />
                        ))}
                    </div>
                </motion.section>
            </div>

            <AnimatePresence>
                {selectedTransaction && <TransactionDetail transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />}
            </AnimatePresence>

            <Sheet
                open={activeQuickAction !== null}
                onClose={() => setActiveQuickAction(null)}
                title={activeQuickAction ? quickActionContent[activeQuickAction].title : undefined}
            >
                {activeQuickAction && (
                    <div className="space-y-4">
                        <p className="font-mono text-sm text-muted-foreground">{quickActionContent[activeQuickAction].description}</p>
                        <div className="space-y-2">
                            <div className="border-2 border-border p-3 font-mono text-xs">1. Pick recipient or scan source</div>
                            <div className="border-2 border-border p-3 font-mono text-xs">2. Enter amount and note</div>
                            <div className="border-2 border-border p-3 font-mono text-xs">3. Confirm with Face ID / PIN</div>
                        </div>
                        <button
                            className="w-full brutal-btn"
                            onClick={() => {
                                notImplementedToast(`${quickActionContent[activeQuickAction].title} flow`)
                                setActiveQuickAction(null)
                            }}
                        >
                            Continue
                        </button>
                    </div>
                )}
            </Sheet>
        </div>
    )
}

function TransactionRow({
    transaction,
    delay,
    onClick
}: {
    transaction: Transaction
    delay: number
    onClick: () => void
}) {
    const isCredit = transaction.type === "credit"

    const statusVariant = {
        pending: "pending" as const,
        completed: "success" as const,
        scheduled: "warning" as const,
        failed: "destructive" as const,
    }

    return (
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + delay }}>
            <Card className="p-4 hover:-translate-y-0.5 cursor-pointer touch-feedback" onClick={onClick}>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted border-2 border-border flex items-center justify-center text-lg">
                        {transaction.metadata?.icon || "💳"}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{transaction.description}</p>
                        <p className="font-mono text-xs text-muted-foreground">{transaction.merchant}</p>
                    </div>
                    <div className="text-right">
                        <p className={`font-black ${isCredit ? "text-green-500" : ""}`}>
                            {isCredit ? "+" : "-"}{formatCurrency(transaction.amount)}
                        </p>
                        {transaction.status !== "completed" && (
                            <Badge variant={statusVariant[transaction.status]} className="mt-1">
                                {transaction.status}
                            </Badge>
                        )}
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}
