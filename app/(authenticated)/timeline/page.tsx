"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar, TrendingUp, TrendingDown, Clock, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getTimelineData } from "@/lib/actions"
import { formatCurrency } from "@/lib/mock-data"
import type { TimelineEvent } from "@/lib/types"

export default function TimelinePage() {
    const today = new Date()
    const [selectedDate, setSelectedDate] = useState(today)

    const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getTimelineData().then(res => {
            setTimelineEvents(res)
            setIsLoading(false)
        }).catch(err => {
            console.error(err)
            setError(err.message || "Failed to load timeline data.")
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center font-mono text-sm">Loading timeline...</div>
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-4 text-center">
                <div className="w-16 h-16 bg-red-500/10 border-2 border-red-500 flex items-center justify-center text-red-500 mb-4 text-2xl">!</div>
                <h2 className="text-2xl font-black text-red-500">Connection Error</h2>
                <p className="font-mono text-muted-foreground">{error}</p>
                <Button onClick={() => window.location.reload()} variant="secondary" className="border-2 border-border">Try Again</Button>
            </div>
        )
    }

    // Group events by time period
    const pastEvents = timelineEvents.filter(e => e.isPast)
    const currentEvents = timelineEvents.filter(e => !e.isPast && !e.isFuture)
    const futureEvents = timelineEvents.filter(e => e.isFuture)

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-background border-b-2 border-border px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Financial</p>
                        <h1 className="text-2xl font-black">Timeline</h1>
                    </div>
                    <button className="p-2 hover:bg-muted transition-colors border-2 border-border">
                        <Calendar size={20} />
                    </button>
                </div>
            </header>

            <div className="p-6">
                {/* Cash Flow Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Card className="bg-accent text-accent-foreground border-0">
                        <CardContent className="pt-6">
                            <p className="font-mono text-xs uppercase tracking-wider opacity-70 mb-2">
                                Projected End of Month
                            </p>
                            <h2 className="text-4xl font-black mb-4">$2,892.50</h2>
                            <div className="flex gap-4 text-sm font-mono">
                                <span className="flex items-center gap-1">
                                    <TrendingUp size={14} />
                                    +$3,450 in
                                </span>
                                <span className="flex items-center gap-1">
                                    <TrendingDown size={14} />
                                    -$1,450 out
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

                    {/* Past Events */}
                    <TimelineSection
                        title="Past"
                        events={pastEvents}
                        icon={<Clock size={14} />}
                        delay={0}
                    />

                    {/* Today Marker */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative flex items-center gap-4 my-8"
                    >
                        <div className="w-8 h-8 bg-accent border-4 border-background shadow-[0_0_0_2px_var(--border)] rounded-none flex items-center justify-center z-10">
                            <div className="w-2 h-2 bg-accent-foreground" />
                        </div>
                        <div className="flex-1 h-0.5 bg-accent" />
                        <Badge className="bg-accent text-accent-foreground border-0 font-black">
                            TODAY
                        </Badge>
                        <div className="flex-1 h-0.5 bg-accent" />
                    </motion.div>

                    {/* Current Insights */}
                    {currentEvents.length > 0 && (
                        <TimelineSection
                            title="Now"
                            events={currentEvents}
                            icon={<AlertCircle size={14} />}
                            delay={0.3}
                        />
                    )}

                    {/* Future Events */}
                    <TimelineSection
                        title="Upcoming"
                        events={futureEvents}
                        icon={<Calendar size={14} />}
                        delay={0.4}
                        isFuture
                    />
                </div>
            </div>
        </div>
    )
}

function TimelineSection({
    title,
    events,
    icon,
    delay,
    isFuture = false
}: {
    title: string
    events: TimelineEvent[]
    icon: React.ReactNode
    delay: number
    isFuture?: boolean
}) {
    if (events.length === 0) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay }}
            className="mb-6"
        >
            <div className="flex items-center gap-2 mb-4 ml-12">
                <span className="text-muted-foreground">{icon}</span>
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{title}</h3>
            </div>

            <div className="space-y-4">
                {events.map((event, i) => (
                    <TimelineEventCard
                        key={event.id}
                        event={event}
                        index={i}
                        delay={delay + i * 0.1}
                        isFuture={isFuture}
                    />
                ))}
            </div>
        </motion.div>
    )
}

function TimelineEventCard({
    event,
    index,
    delay,
    isFuture
}: {
    event: TimelineEvent
    index: number
    delay: number
    isFuture: boolean
}) {
    const isPositive = event.amount && event.amount > 0

    const typeConfig = {
        transaction: { color: isPositive ? "#22c55e" : "#ef4444" },
        insight: { color: "#3b82f6" },
        goal: { color: "#8b5cf6" },
        bill: { color: "#f59e0b" },
        forecast: { color: "#6b7280" },
    }

    const config = typeConfig[event.type]

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className="relative flex items-start gap-4"
        >
            {/* Dot */}
            <div
                className="w-8 h-8 border-2 border-border bg-background flex items-center justify-center z-10 flex-shrink-0"
                style={{ borderColor: config.color }}
            >
                <div
                    className="w-2 h-2"
                    style={{ backgroundColor: config.color }}
                />
            </div>

            {/* Card */}
            <Card className={`flex-1 ${isFuture ? "opacity-70 border-dashed" : ""}`}>
                <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="font-bold text-sm">{event.title}</p>
                            <p className="font-mono text-xs text-muted-foreground">{event.description}</p>
                            <p className="font-mono text-xs text-muted-foreground mt-1">
                                {event.date.toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                        {event.amount && (
                            <p className={`font-black text-lg ${isPositive ? "text-green-500" : ""}`}>
                                {isPositive ? "+" : ""}{formatCurrency(Math.abs(event.amount))}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
