"use client"

import { motion } from "framer-motion"
import {
    X,
    Copy,
    Share2,
    Flag,
    CheckCircle2,
    Clock,
    AlertCircle,
    MapPin,
    Calendar,
    CreditCard,
    ArrowUpRight,
    ArrowDownLeft
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/mock-data"
import type { Transaction } from "@/lib/types"

interface TransactionDetailProps {
    transaction: Transaction
    onClose: () => void
}

export function TransactionDetail({ transaction, onClose }: TransactionDetailProps) {
    const isCredit = transaction.type === "credit"

    const statusConfig = {
        pending: { icon: Clock, color: "#3b82f6", label: "Pending" },
        completed: { icon: CheckCircle2, color: "#22c55e", label: "Completed" },
        scheduled: { icon: Calendar, color: "#f59e0b", label: "Scheduled" },
        failed: { icon: AlertCircle, color: "#ef4444", label: "Failed" },
    }

    const config = statusConfig[transaction.status]
    const StatusIcon = config.icon

    const handleCopyId = () => {
        navigator.clipboard.writeText(transaction.id)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-background border-t-4 border-border max-h-[90vh] overflow-y-auto"
            >
                {/* Handle bar */}
                <div className="sticky top-0 bg-background pt-3 pb-1 z-10">
                    <div className="mx-auto w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b-2 border-border">
                    <h2 className="text-xl font-black uppercase tracking-tight">Transaction</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Amount & Status */}
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-muted border-2 border-border flex items-center justify-center text-3xl">
                            {transaction.metadata?.icon || "💳"}
                        </div>

                        <div>
                            <p className={`text-4xl font-black ${isCredit ? "text-green-500" : ""}`}>
                                {isCredit ? "+" : "-"}{formatCurrency(transaction.amount)}
                            </p>
                            <p className="font-mono text-sm text-muted-foreground mt-1">
                                {transaction.description}
                            </p>
                        </div>

                        <Badge
                            variant={transaction.status === "completed" ? "success" :
                                transaction.status === "pending" ? "pending" :
                                    transaction.status === "failed" ? "destructive" : "warning"}
                            className="mx-auto"
                        >
                            <StatusIcon size={12} className="mr-1" />
                            {config.label}
                        </Badge>
                    </div>

                    {/* Details Grid */}
                    <div className="space-y-4 border-t-2 border-border pt-6">
                        <DetailRow
                            icon={isCredit ? ArrowDownLeft : ArrowUpRight}
                            label="Type"
                            value={isCredit ? "Money In" : "Money Out"}
                        />
                        <DetailRow
                            icon={CreditCard}
                            label="Merchant"
                            value={transaction.merchant || "Unknown"}
                        />
                        <DetailRow
                            icon={Calendar}
                            label="Date"
                            value={new Date(transaction.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        />
                        {transaction.metadata?.location && (
                            <DetailRow
                                icon={MapPin}
                                label="Location"
                                value={transaction.metadata.location}
                            />
                        )}
                        <DetailRow
                            icon={Flag}
                            label="Category"
                            value={transaction.category}
                        />
                    </div>

                    {/* Transaction ID */}
                    <div className="bg-muted p-4 border-2 border-border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-mono text-xs text-muted-foreground">Transaction ID</p>
                                <p className="font-mono text-sm truncate max-w-[200px]">{transaction.id}</p>
                            </div>
                            <button
                                onClick={handleCopyId}
                                className="p-2 hover:bg-background transition-colors"
                            >
                                <Copy size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Notes */}
                    {transaction.metadata?.notes && (
                        <div>
                            <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">Notes</p>
                            <p className="font-mono text-sm">{transaction.metadata.notes}</p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t-2 border-border">
                        <Button variant="secondary" className="flex-1">
                            <Share2 size={16} className="mr-2" />
                            Share
                        </Button>
                        <Button variant="secondary" className="flex-1">
                            <Flag size={16} className="mr-2" />
                            Report Issue
                        </Button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

function DetailRow({
    icon: Icon,
    label,
    value
}: {
    icon: React.ComponentType<{ size?: number; className?: string }>
    label: string
    value: string
}) {
    return (
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-muted border-2 border-border flex items-center justify-center flex-shrink-0">
                <Icon size={18} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-muted-foreground">{label}</p>
                <p className="font-bold text-sm truncate">{value}</p>
            </div>
        </div>
    )
}
