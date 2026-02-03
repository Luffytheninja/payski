// ============================================
// PaySki Type Definitions
// ============================================

// Account Types
export interface Account {
    id: string
    name: string
    type: "checking" | "savings" | "goal"
    balance: number
    currency: string
    color?: string
}

// Transaction Types
export type TransactionStatus = "pending" | "completed" | "scheduled" | "failed"
export type TransactionType = "debit" | "credit" | "transfer"

export interface Transaction {
    id: string
    amount: number
    currency: string
    type: TransactionType
    status: TransactionStatus
    description: string
    merchant?: string
    category: string
    date: Date
    accountId: string
    metadata?: {
        icon?: string
        location?: string
        notes?: string
    }
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
    type: InsightType
    title: string
    description: string
    explanation: string // Human-readable AI explanation
    createdAt: Date
    isActionable: boolean
    action?: {
        label: string
        type: string
    }
    feedback?: "helpful" | "not_helpful" | null
}

// Goal Types
export interface Goal {
    id: string
    name: string
    targetAmount: number
    currentAmount: number
    currency: string
    deadline?: Date
    color: string
    icon: string
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
