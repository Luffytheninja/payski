// ============================================
// PaySki Type Definitions
// ============================================

// Account Types
export interface Account {
    id: string
    name: string
    type: string // Using string to match Prisma, but can be "checking" | "savings" | "goal" in UI
    balance: number
    currency: string
    color: string | null
    userId: string
}

// Transaction Types
export type TransactionStatus = "pending" | "completed" | "scheduled" | "failed"
export type TransactionType = "debit" | "credit" | "transfer"

export interface Transaction {
    id: string
    amount: number
    currency: string
    type: string // Matching Prisma string
    status: string // Matching Prisma string
    description: string
    merchant: string | null
    category: string
    date: Date
    accountId: string
    metadata: any // Prisma Json type
}

// Timeline Types
export type TimelineEventType = "transaction" | "insight" | "goal" | "bill" | "forecast"

export interface TimelineEvent {
    id: string
    type: TimelineEventType
    date: Date
    title: string
    description: string
    amount?: number
    isPast: boolean
    isFuture: boolean
    data?: Transaction | Insight | Goal
}

// Insight Types
export type InsightType = "spending" | "forecast" | "anomaly" | "opportunity" | "goal_progress"

export interface Insight {
    id: string
    type: string // Matching Prisma string
    title: string
    description: string
    explanation: string // Human-readable AI explanation
    createdAt: Date
    isActionable: boolean
    actionLabel?: string | null
    actionType?: string | null
    feedback?: string | null
    userId: string
}

// Goal Types
export interface Goal {
    id: string
    name: string
    targetAmount: number
    currentAmount: number
    currency: string
    deadline: Date | null
    color: string
    icon: string
    userId: string
    contributions: GoalContribution[]
}

export interface GoalContribution {
    id: string
    amount: number
    date: Date
}

// User Types
export interface User {
    id: string
    name: string
    email: string
    avatar?: string
    createdAt: Date
}

// Notification Types
export interface Notification {
    id: string
    title: string
    message: string
    type: "info" | "success" | "warning" | "alert"
    createdAt: Date
    read: boolean
}
