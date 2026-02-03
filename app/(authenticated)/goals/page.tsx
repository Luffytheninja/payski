"use client"

import { motion } from "framer-motion"
import { Plus, ChevronRight, Sparkles } from "lucide-react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CircularProgress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Sheet } from "@/components/ui/sheet"
import { Input, CurrencyInput } from "@/components/ui/input"
import { mockGoals, formatCurrency, getGoalProgress } from "@/lib/mock-data"
import type { Goal } from "@/lib/types"

export default function GoalsPage() {
    const [goals, setGoals] = useState(mockGoals)
    const [showAddSheet, setShowAddSheet] = useState(false)
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)

    const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0)
    const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0)

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-background border-b-2 border-border px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Your</p>
                        <h1 className="text-2xl font-black">Goals</h1>
                    </div>
                    <button
                        onClick={() => setShowAddSheet(true)}
                        className="p-2 bg-accent border-2 border-border hover:bg-foreground hover:text-background transition-colors"
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </header>

            <div className="p-6 space-y-6">
                {/* Total Progress Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="bg-foreground text-background border-0">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-mono text-xs uppercase tracking-wider opacity-60 mb-1">Total Saved</p>
                                    <h2 className="text-4xl font-black">{formatCurrency(totalSaved)}</h2>
                                    <p className="font-mono text-sm opacity-60 mt-1">
                                        of {formatCurrency(totalTarget)} target
                                    </p>
                                </div>
                                <CircularProgress
                                    value={Math.round((totalSaved / totalTarget) * 100)}
                                    size={80}
                                    strokeWidth={6}
                                    className="text-background"
                                >
                                    <span className="text-lg font-black text-background">
                                        {Math.round((totalSaved / totalTarget) * 100)}%
                                    </span>
                                </CircularProgress>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Goals List */}
                <div className="space-y-4">
                    {goals.map((goal, i) => (
                        <GoalCard
                            key={goal.id}
                            goal={goal}
                            delay={i * 0.1}
                            onClick={() => setSelectedGoal(goal)}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {goals.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 bg-muted border-2 border-border flex items-center justify-center">
                            <Sparkles size={24} className="text-muted-foreground" />
                        </div>
                        <h3 className="font-bold mb-2">No goals yet</h3>
                        <p className="font-mono text-sm text-muted-foreground mb-4">
                            Start saving for something meaningful
                        </p>
                        <Button onClick={() => setShowAddSheet(true)}>
                            Create Your First Goal
                        </Button>
                    </motion.div>
                )}
            </div>

            {/* Add Goal Sheet */}
            <Sheet
                open={showAddSheet}
                onClose={() => setShowAddSheet(false)}
                title="New Goal"
            >
                <AddGoalForm onSubmit={() => setShowAddSheet(false)} />
            </Sheet>

            {/* Goal Detail Sheet */}
            <Sheet
                open={!!selectedGoal}
                onClose={() => setSelectedGoal(null)}
                title={selectedGoal?.name || "Goal"}
            >
                {selectedGoal && (
                    <GoalDetail goal={selectedGoal} />
                )}
            </Sheet>
        </div>
    )
}

function GoalCard({ goal, delay, onClick }: { goal: Goal; delay: number; onClick: () => void }) {
    const progress = getGoalProgress(goal)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
        >
            <Card
                className="cursor-pointer hover:-translate-y-1 touch-feedback"
                onClick={onClick}
            >
                <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div
                            className="w-12 h-12 border-2 flex items-center justify-center text-2xl"
                            style={{ borderColor: goal.color }}
                        >
                            {goal.icon}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm truncate">{goal.name}</h3>
                            <p className="font-mono text-xs text-muted-foreground">
                                {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                            </p>
                            {/* Progress bar */}
                            <div className="h-2 bg-muted border border-border mt-2">
                                <motion.div
                                    className="h-full"
                                    style={{ backgroundColor: goal.color }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5, delay: delay + 0.2 }}
                                />
                            </div>
                        </div>

                        {/* Progress % */}
                        <div className="text-right">
                            <p className="font-black text-lg">{progress}%</p>
                            <ChevronRight size={18} className="text-muted-foreground ml-auto" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

function AddGoalForm({ onSubmit }: { onSubmit: () => void }) {
    const [name, setName] = useState("")
    const [target, setTarget] = useState(0)

    return (
        <div className="space-y-6">
            <Input
                label="Goal Name"
                placeholder="e.g., Emergency Fund"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <CurrencyInput
                label="Target Amount"
                value={target}
                onChange={setTarget}
            />
            <Button
                className="w-full"
                disabled={!name || target <= 0}
                onClick={onSubmit}
            >
                Create Goal
            </Button>
        </div>
    )
}

function GoalDetail({ goal }: { goal: Goal }) {
    const progress = getGoalProgress(goal)
    const remaining = goal.targetAmount - goal.currentAmount

    return (
        <div className="space-y-6">
            {/* Progress Circle */}
            <div className="flex justify-center">
                <CircularProgress
                    value={progress}
                    size={150}
                    strokeWidth={10}
                >
                    <div className="text-center">
                        <div className="text-3xl">{goal.icon}</div>
                        <p className="font-black text-2xl">{progress}%</p>
                    </div>
                </CircularProgress>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                    <p className="font-mono text-xs text-muted-foreground mb-1">Saved</p>
                    <p className="font-black text-xl" style={{ color: goal.color }}>
                        {formatCurrency(goal.currentAmount)}
                    </p>
                </Card>
                <Card className="p-4">
                    <p className="font-mono text-xs text-muted-foreground mb-1">Remaining</p>
                    <p className="font-black text-xl">{formatCurrency(remaining)}</p>
                </Card>
            </div>

            {/* Deadline */}
            {goal.deadline && (
                <div className="font-mono text-sm text-muted-foreground text-center">
                    Target date: {goal.deadline.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </div>
            )}

            {/* Action */}
            <Button className="w-full">
                Add Money
            </Button>
        </div>
    )
}
