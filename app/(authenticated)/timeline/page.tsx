"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/mock-data"
import type { TimelineEvent } from "@/lib/types"

export default function TimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([])

  useEffect(() => {
    fetch("/api/timeline")
      .then((response) => response.json())
      .then((payload: { events?: TimelineEvent[] }) => setEvents(payload.events ?? []))
  }, [])

  const grouped = useMemo(() => ({
    past: events.filter((event) => event.isPast),
    now: events.filter((event) => !event.isPast && !event.isFuture),
    future: events.filter((event) => event.isFuture),
  }), [events])

  return (
    <div className="min-h-screen p-6 space-y-6">
      <h1 className="text-2xl font-black">Timeline</h1>
      {Object.entries(grouped).map(([label, section]) => (
        <section key={label}>
          <h2 className="font-mono text-xs uppercase mb-2 text-muted-foreground">{label}</h2>
          <div className="space-y-2">
            {section.map((event) => (
              <Card key={event.id}>
                <CardContent className="pt-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-sm">{event.title}</p>
                    <p className="font-mono text-xs text-muted-foreground">{event.description}</p>
                  </div>
                  {event.amount && <p className="font-black">{event.amount > 0 ? "+" : "-"}{formatCurrency(Math.abs(Number(event.amount)))}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
