"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Insight } from "@/lib/types"

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([])

  useEffect(() => {
    fetch("/api/insights")
      .then((response) => response.json())
      .then((payload: { insights?: Insight[] }) => setInsights(payload.insights ?? []))
  }, [])

  async function sendFeedback(id: string, feedback: "helpful" | "not_helpful") {
    const response = await fetch(`/api/insights/${id}/feedback`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ feedback }),
    })
    if (response.ok) {
      setInsights((prev) => prev.map((insight) => (insight.id === id ? { ...insight, feedback } : insight)))
    }
  }

  return (
    <div className="min-h-screen p-6 space-y-4">
      <h1 className="text-2xl font-black">Insights</h1>
      {insights.map((insight, i) => (
        <motion.div key={insight.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <Card>
            <CardContent className="pt-6 space-y-2">
              <p className="font-black">{insight.title}</p>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
              <p className="font-mono text-xs">{insight.explanation}</p>
              <div className="flex gap-2">
                <button className="border-2 border-border p-2" onClick={() => sendFeedback(insight.id, "helpful")}><ThumbsUp size={16} /></button>
                <button className="border-2 border-border p-2" onClick={() => sendFeedback(insight.id, "not_helpful")}><ThumbsDown size={16} /></button>
                {insight.feedback && <span className="font-mono text-xs self-center">{insight.feedback}</span>}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
