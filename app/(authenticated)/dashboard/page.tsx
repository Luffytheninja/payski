"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, ArrowUpRight, ArrowDownLeft, QrCode, Plus, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TransactionDetail } from "@/components/transaction-detail"
import { formatCurrency } from "@/lib/mock-data"
import { getDashboardData, seedDemoData } from "@/lib/actions"
import type { Transaction, Account } from "@/lib/types"

export default function DashboardPage() {
    const [showBalance, setShowBalance] = useState(true)
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
    const [data, setData] = useState<{ accounts: Account[], recentTransactions: Transaction[], totalBalance: number } | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getDashboardData().then(res => {
            setData(res)
            setIsLoading(false)
        })
    }, [])

    const handleSeedData = async () => {
        setIsLoading(true)
        await seedDemoData()
        const res = await getDashboardData()
        setData(res)
        setIsLoading(false)
    }

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center font-mono text-sm">Loading database...</div>
    }

    if (data?.accounts.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-4 text-center">
                <h2 className="text-2xl font-black">No Data Found</h2>
                <p className="font-mono text-muted-foreground">Your account is currently empty.</p>
                <Button onClick={handleSeedData}>Generate Demo Data</Button>
            </div>
        )
    }

    const { totalBalance, recentTransactions, accounts } = data!

    return (
        <div className="min-h-screen">
            {/* Header */}
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
                {/* Total Balance Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Card className="bg-foreground text-background border-0 relative overflow-hidden">
                        {/* Pattern background */}
                        <div
                            className="absolute inset-0 opacity-5"
                            style={{
                                backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                                backgroundSize: '12px 12px'
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

                            {/* Quick Actions */}
                            <div className="flex gap-3">
                                <button className="flex-1 bg-background text-foreground py-3 font-bold uppercase text-sm flex items-center justify-center gap-2 border-2 border-background hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors touch-feedback">
                                    <ArrowUpRight size={18} />
                                    Send
                                </button>
                                <button className="flex-1 bg-background text-foreground py-3 font-bold uppercase text-sm flex items-center justify-center gap-2 border-2 border-background hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors touch-feedback">
                                    <ArrowDownLeft size={18} />
                                    Request
                                </button>
                                <button className="flex-1 bg-background text-foreground py-3 font-bold uppercase text-sm flex items-center justify-center gap-2 border-2 border-background hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors touch-feedback">
                                    <QrCode size={18} />
                                    Scan
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Accounts */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-black uppercase tracking-tight">Accounts</h3>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <Plus size={20} />
                        </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
                        {accounts.map((account, i) => (
                            <motion.div
                                key={account.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 + i * 0.05 }}
                            >
                                <Card
                                    className="w-48 flex-shrink-0 hover:-translate-y-1 cursor-pointer"
                                    style={{ borderColor: account.color }}
                                >
                                    <CardContent className="pt-4">
                                        <div
                                            className="w-3 h-3 mb-2"
                                            style={{ backgroundColor: account.color }}
                                        />
                                        <p className="font-mono text-xs text-muted-foreground uppercase">{account.type}</p>
                                        <p className="font-bold text-sm mb-2">{account.name}</p>
                                        <p className="font-black text-lg">
                                            {showBalance ? formatCurrency(account.balance) : "••••"}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Recent Transactions */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-black uppercase tracking-tight">Recent Activity</h3>
                        <button className="font-mono text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                            See All <ChevronRight size={14} />
                        </button>
                    </div>
                    <div className="space-y-2">
                        {recentTransactions.map((txn, i) => (
                            <TransactionRow
                                key={txn.id}
                                transaction={txn}
                                delay={i * 0.05}
                                onClick={() => setSelectedTransaction(txn)}
                            />
                        ))}
                    </div>
                </motion.section>
            </div>

            {/* Transaction Detail Modal */}
            <AnimatePresence>
                {selectedTransaction && (
                    <TransactionDetail
                        transaction={selectedTransaction}
                        onClose={() => setSelectedTransaction(null)}
                    />
                )}
            </AnimatePresence>
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
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + delay }}
        >
            <Card
                className="p-4 hover:-translate-y-0.5 cursor-pointer touch-feedback"
                onClick={onClick}
            >
                <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="w-10 h-10 bg-muted border-2 border-border flex items-center justify-center text-lg">
                        {transaction.metadata?.icon || "💳"}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{transaction.description}</p>
                        <p className="font-mono text-xs text-muted-foreground">{transaction.merchant}</p>
                    </div>

                    {/* Amount & Status */}
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

