"use server"

import { auth } from "@clerk/nextjs/server"
import { prisma } from "./prisma"
import { mockAccounts, mockTransactions, mockInsights, mockGoals } from "./mock-data"
import { revalidatePath } from "next/cache"
import { Account, Transaction, Goal, Insight, TimelineEvent } from "./types"

// Utility to get authenticated user ID
async function getUserId() {
    const { userId } = await auth()
    if (!userId) throw new Error("Unauthorized")
    return userId
}

// ---------------------------------------------------------
// Seeding
// ---------------------------------------------------------

export async function seedDemoData() {
    const userId = await getUserId()

    // Check if user already exists
    let user = await prisma.user.findUnique({ where: { id: userId } })
    
    if (!user) {
        user = await prisma.user.create({
            data: {
                id: userId,
                name: "Demo User",
                email: `demo-${userId}@example.com`,
            }
        })
    }

    // Only seed if no accounts exist
    const accountCount = await prisma.account.count({ where: { userId } })
    if (accountCount > 0) return { success: true, message: "Already seeded" }

    // Seed Accounts
    for (const acc of mockAccounts) {
        await prisma.account.create({
            data: {
                id: acc.id.replace("acc_", `acc_${userId}_`), // Scoped IDs
                name: acc.name,
                type: acc.type,
                balance: acc.balance,
                currency: acc.currency,
                color: acc.color,
                userId: userId,
                transactions: {
                    create: mockTransactions
                        .filter(t => t.accountId === acc.id)
                        .map(t => ({
                            amount: t.amount,
                            currency: t.currency,
                            type: t.type,
                            status: t.status,
                            description: t.description,
                            merchant: t.merchant,
                            category: t.category,
                            date: t.date,
                            metadata: t.metadata || {},
                        }))
                }
            }
        })
    }

    // Seed Insights
    for (const ins of mockInsights) {
        await prisma.insight.create({
            data: {
                type: ins.type,
                title: ins.title,
                description: ins.description,
                explanation: ins.explanation,
                isActionable: ins.isActionable,
                actionLabel: ins.actionLabel,
                actionType: ins.actionType,
                userId: userId,
                createdAt: ins.createdAt,
            }
        })
    }

    // Seed Goals
    for (const goal of mockGoals) {
        await prisma.goal.create({
            data: {
                name: goal.name,
                targetAmount: goal.targetAmount,
                currentAmount: goal.currentAmount,
                currency: goal.currency,
                deadline: goal.deadline,
                color: goal.color,
                icon: goal.icon,
                userId: userId,
                contributions: {
                    create: goal.contributions.map(c => ({
                        amount: c.amount,
                        date: c.date,
                    }))
                }
            }
        })
    }

    revalidatePath("/")
    return { success: true, message: "Database seeded successfully" }
}

// ---------------------------------------------------------
// Data Fetching
// ---------------------------------------------------------

export async function getDashboardData() {
    const userId = await getUserId()

    const accounts = await prisma.account.findMany({
        where: { userId },
        orderBy: { name: 'asc' }
    }) as unknown as Account[]

    const transactions = await prisma.transaction.findMany({
        where: { account: { userId } },
        orderBy: { date: 'desc' },
        take: 5,
        include: { account: true }
    }) as unknown as Transaction[]

    const totalBalance = accounts.reduce((sum: number, acc: { balance: number }) => sum + acc.balance, 0)

    return {
        accounts,
        recentTransactions: transactions,
        totalBalance
    }
}

// ---------------------------------------------------------
// Data Fetching
// ---------------------------------------------------------

export async function getGoalsData() {
    const userId = await getUserId()
    return await prisma.goal.findMany({
        where: { userId },
        include: { contributions: true },
        orderBy: { name: 'asc' }
    }) as unknown as Goal[]
}

export async function getInsightsData() {
    const userId = await getUserId()
    return await prisma.insight.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    }) as unknown as Insight[]
}

export async function updateInsightFeedback(insightId: string, feedback: "helpful" | "not_helpful") {
    const userId = await getUserId()
    await prisma.insight.update({
        where: { id: insightId, userId },
        data: { feedback }
    })
    revalidatePath("/insights")
}

export async function getTimelineData() {
    const userId = await getUserId()
    const transactions = await prisma.transaction.findMany({
        where: { account: { userId } },
        orderBy: { date: 'desc' },
    })
    
    // Convert to timeline events format similar to mock-data.ts
    // For simplicity, we just return transactions formatted as a timeline for now
    return transactions.map((t: any) => ({
        id: t.id,
        type: "transaction" as const,
        date: t.date,
        title: t.description,
        description: t.merchant || t.category,
        amount: t.type === 'debit' ? -t.amount : t.amount,
        isPast: t.date < new Date(),
        isFuture: t.date > new Date(),
    })) as TimelineEvent[]
}

// ---------------------------------------------------------
// Mutations
// ---------------------------------------------------------

export async function createGoal(formData: FormData) {
    const userId = await getUserId()
    const name = formData.get("name") as string
    const targetAmount = parseFloat(formData.get("targetAmount") as string)

    if (!name || isNaN(targetAmount)) throw new Error("Invalid input")

    await prisma.goal.create({
        data: {
            name,
            targetAmount,
            currentAmount: 0,
            color: "#8b5cf6", // Default color
            icon: "🎯",      // Default icon
            userId
        }
    })

    revalidatePath("/goals")
}
