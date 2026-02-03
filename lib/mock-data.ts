import type { Account, Transaction, Insight, Goal, TimelineEvent, User } from "./types"

// ============================================
// Mock User
// ============================================
export const mockUser: User = {
    id: "user_001",
    name: "Alex Rivera",
    email: "alex@example.com",
    avatar: undefined,
    createdAt: new Date("2024-01-15"),
}

// ============================================
// Mock Accounts
// ============================================
export const mockAccounts: Account[] = [
    {
        id: "acc_main",
        name: "Main Account",
        type: "checking",
        balance: 4892.50,
        currency: "USD",
        color: "#FAFF00",
    },
    {
        id: "acc_savings",
        name: "Rainy Day",
        type: "savings",
        balance: 12450.00,
        currency: "USD",
        color: "#22c55e",
    },
]

// ============================================
// Mock Transactions
// ============================================
const today = new Date()
const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
const twoDaysAgo = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000)
const threeDaysAgo = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000)
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

export const mockTransactions: Transaction[] = [
    {
        id: "txn_001",
        amount: 4.99,
        currency: "USD",
        type: "debit",
        status: "completed",
        description: "Coffee & Pastry",
        merchant: "Blue Bottle Coffee",
        category: "Food & Drink",
        date: today,
        accountId: "acc_main",
        metadata: { icon: "☕" },
    },
    {
        id: "txn_002",
        amount: 89.99,
        currency: "USD",
        type: "debit",
        status: "pending",
        description: "Monthly Subscription",
        merchant: "Spotify Premium",
        category: "Entertainment",
        date: today,
        accountId: "acc_main",
        metadata: { icon: "🎵" },
    },
    {
        id: "txn_003",
        amount: 250.00,
        currency: "USD",
        type: "credit",
        status: "completed",
        description: "Payment Received",
        merchant: "Freelance Client",
        category: "Income",
        date: yesterday,
        accountId: "acc_main",
        metadata: { icon: "💰" },
    },
    {
        id: "txn_004",
        amount: 42.50,
        currency: "USD",
        type: "debit",
        status: "completed",
        description: "Grocery Run",
        merchant: "Whole Foods",
        category: "Groceries",
        date: yesterday,
        accountId: "acc_main",
        metadata: { icon: "🛒" },
    },
    {
        id: "txn_005",
        amount: 15.00,
        currency: "USD",
        type: "debit",
        status: "completed",
        description: "Ride to Downtown",
        merchant: "Uber",
        category: "Transport",
        date: twoDaysAgo,
        accountId: "acc_main",
        metadata: { icon: "🚗" },
    },
    {
        id: "txn_006",
        amount: 1200.00,
        currency: "USD",
        type: "debit",
        status: "scheduled",
        description: "Rent Payment",
        merchant: "Landlord",
        category: "Housing",
        date: nextWeek,
        accountId: "acc_main",
        metadata: { icon: "🏠" },
    },
    {
        id: "txn_007",
        amount: 65.00,
        currency: "USD",
        type: "debit",
        status: "completed",
        description: "Electric Bill",
        merchant: "ConEd",
        category: "Utilities",
        date: threeDaysAgo,
        accountId: "acc_main",
        metadata: { icon: "⚡" },
    },
]

// ============================================
// Mock Insights
// ============================================
export const mockInsights: Insight[] = [
    {
        id: "ins_001",
        type: "spending",
        title: "Coffee Spending Up",
        description: "You spent 23% more on coffee this month",
        explanation: "You've visited Blue Bottle Coffee 8 times this month, compared to 5 times last month. That's an extra $15.97 on your caffeine habit.",
        createdAt: today,
        isActionable: true,
        action: { label: "Set Budget", type: "create_budget" },
        feedback: null,
    },
    {
        id: "ins_002",
        type: "forecast",
        title: "Cash Flow Healthy",
        description: "You'll have $2,892 left after bills",
        explanation: "Based on your scheduled payments and typical spending, you're on track to end the month with a comfortable buffer. Keep it up!",
        createdAt: today,
        isActionable: false,
        feedback: null,
    },
    {
        id: "ins_003",
        type: "anomaly",
        title: "Unusual Activity",
        description: "A $89.99 charge looks different",
        explanation: "This Spotify Premium charge is higher than your usual $9.99. It might be an annual plan upgrade or an error worth checking.",
        createdAt: today,
        isActionable: true,
        action: { label: "Review", type: "view_transaction" },
        feedback: null,
    },
    {
        id: "ins_004",
        type: "opportunity",
        title: "Savings Opportunity",
        description: "Move $500 to savings?",
        explanation: "You have a surplus this pay period. Moving $500 to your Rainy Day fund would get you 85% to your emergency fund goal.",
        createdAt: yesterday,
        isActionable: true,
        action: { label: "Transfer", type: "transfer" },
        feedback: null,
    },
]

// ============================================
// Mock Goals
// ============================================
export const mockGoals: Goal[] = [
    {
        id: "goal_001",
        name: "Emergency Fund",
        targetAmount: 15000,
        currentAmount: 12450,
        currency: "USD",
        deadline: new Date("2025-06-01"),
        color: "#22c55e",
        icon: "🛡️",
        contributions: [
            { id: "c1", amount: 500, date: new Date("2025-01-01") },
            { id: "c2", amount: 500, date: new Date("2025-01-15") },
        ],
    },
    {
        id: "goal_002",
        name: "Japan Trip",
        targetAmount: 5000,
        currentAmount: 1800,
        currency: "USD",
        deadline: new Date("2025-12-01"),
        color: "#ef4444",
        icon: "✈️",
        contributions: [
            { id: "c3", amount: 300, date: new Date("2025-01-10") },
        ],
    },
    {
        id: "goal_003",
        name: "New MacBook",
        targetAmount: 2500,
        currentAmount: 850,
        currency: "USD",
        color: "#8b5cf6",
        icon: "💻",
        contributions: [],
    },
]

// ============================================
// Mock Timeline Events
// ============================================
export const mockTimelineEvents: TimelineEvent[] = [
    // Past events
    {
        id: "tl_001",
        type: "transaction",
        date: threeDaysAgo,
        title: "Electric Bill Paid",
        description: "Automatic payment processed",
        amount: -65,
        isPast: true,
        isFuture: false,
    },
    {
        id: "tl_002",
        type: "transaction",
        date: yesterday,
        title: "Freelance Payment",
        description: "Payment from client received",
        amount: 250,
        isPast: true,
        isFuture: false,
    },
    // Today
    {
        id: "tl_003",
        type: "insight",
        date: today,
        title: "Cash Flow Update",
        description: "You're on track this month",
        isPast: false,
        isFuture: false,
    },
    // Future events
    {
        id: "tl_004",
        type: "bill",
        date: nextWeek,
        title: "Rent Due",
        description: "Monthly rent payment",
        amount: -1200,
        isPast: false,
        isFuture: true,
    },
    {
        id: "tl_005",
        type: "forecast",
        date: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000),
        title: "Paycheck Expected",
        description: "Based on your pay schedule",
        amount: 3200,
        isPast: false,
        isFuture: true,
    },
]

// ============================================
// Helper Functions
// ============================================
export function getTotalBalance(): number {
    return mockAccounts.reduce((sum, acc) => sum + acc.balance, 0)
}

export function getRecentTransactions(count: number = 5): Transaction[] {
    return [...mockTransactions]
        .filter(t => t.status !== "scheduled")
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, count)
}

export function getUpcomingTransactions(): Transaction[] {
    return mockTransactions.filter(t => t.status === "scheduled")
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(amount)
}

export function getGoalProgress(goal: Goal): number {
    return Math.round((goal.currentAmount / goal.targetAmount) * 100)
}
