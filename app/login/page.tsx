"use client"

import { FormEvent, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("alex@example.com")
  const [password, setPassword] = useState("demo-password")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError("")
    setLoading(true)
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    setLoading(false)

    if (!response.ok) {
      const payload = await response.json()
      setError(payload.error ?? "Unable to log in")
      return
    }

    router.push(searchParams.get("next") ?? "/dashboard")
    router.refresh()
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md border-2 border-border p-6 space-y-4 bg-background">
        <h1 className="text-3xl font-black">Login</h1>
        <p className="font-mono text-sm text-muted-foreground">Use demo credentials or create account via onboarding.</p>
        <input className="w-full border-2 border-border p-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full border-2 border-border p-3" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button className="w-full brutal-btn" type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
    </main>
  )
}
