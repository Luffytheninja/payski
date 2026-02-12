"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency, getGoalProgress } from "@/lib/mock-data"
import type { Goal } from "@/lib/types"

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [name, setName] = useState("")
  const [targetAmount, setTargetAmount] = useState("")

  useEffect(() => {
    fetch("/api/goals")
      .then((response) => response.json())
      .then((payload: { goals?: Goal[] }) => setGoals(payload.goals ?? []))
  }, [])

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const response = await fetch("/api/goals", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, targetAmount: Number(targetAmount) }),
    })
    if (!response.ok) return
    setName("")
    setTargetAmount("")
    const payload = await (await fetch("/api/goals")).json()
    setGoals(payload.goals ?? [])
  }

  const totalTarget = useMemo(() => goals.reduce((sum, g) => sum + Number(g.targetAmount ?? 0), 0), [goals])

  return (
    <div className="min-h-screen p-6 space-y-6">
      <h1 className="text-2xl font-black">Goals</h1>
      <p className="font-mono text-xs text-muted-foreground">Total target: {formatCurrency(totalTarget)}</p>

      <form className="space-y-2 border-2 border-border p-4" onSubmit={onSubmit}>
        <input className="w-full border-2 border-border p-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Goal name" />
        <input className="w-full border-2 border-border p-2" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} placeholder="Target amount" type="number" />
        <button className="brutal-btn w-full" type="submit">Add Goal</button>
      </form>

      <div className="space-y-3">
        {goals.map((goal) => (
          <Card key={goal.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="font-bold">{goal.name}</p>
                <p className="font-black">{getGoalProgress({ ...goal, contributions: goal.contributions ?? [] })}%</p>
              </div>
              <p className="font-mono text-xs text-muted-foreground">{formatCurrency(Number(goal.currentAmount ?? 0))} / {formatCurrency(Number(goal.targetAmount ?? 0))}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
