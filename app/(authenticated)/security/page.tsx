"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

type SecurityDevice = { id: string; name: string; trustScore: number }
type SecurityActivity = { id: string; type: string; status: string; location: string }
type SecurityResponse = { score: number; activities: SecurityActivity[]; devices: SecurityDevice[] }

export default function SecurityPage() {
  const [data, setData] = useState<SecurityResponse>({ score: 0, activities: [], devices: [] })

  useEffect(() => {
    fetch("/api/security")
      .then((response) => response.json())
      .then((payload: SecurityResponse) => setData(payload))
  }, [])

  return (
    <div className="min-h-screen p-6 space-y-6">
      <h1 className="text-2xl font-black">Security</h1>
      <Card>
        <CardContent className="pt-6">
          <p className="font-mono text-xs">Security score</p>
          <p className="text-4xl font-black">{data.score}</p>
        </CardContent>
      </Card>

      <section>
        <h2 className="font-black mb-2">Trusted devices</h2>
        <div className="space-y-2">
          {data.devices.map((device) => (
            <Card key={device.id}><CardContent className="pt-4"><p className="font-bold">{device.name}</p><p className="font-mono text-xs text-muted-foreground">Trust score: {device.trustScore}</p></CardContent></Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-black mb-2">Activity log</h2>
        <div className="space-y-2">
          {data.activities.map((activity) => (
            <Card key={activity.id}><CardContent className="pt-4"><p className="font-bold">{activity.type}</p><p className="font-mono text-xs text-muted-foreground">{activity.status} · {activity.location}</p></CardContent></Card>
          ))}
        </div>
      </section>
    </div>
  )
}
