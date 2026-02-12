"use client"

import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Profile = {
  id: string
  name: string
  email: string
  phone?: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => response.json())
      .then((payload: { profile?: Profile }) => {
        if (!payload.profile) return
        setProfile(payload.profile)
        setName(payload.profile.name ?? "")
        setPhone(payload.profile.phone ?? "")
      })
  }, [])

  async function onSave(event: FormEvent) {
    event.preventDefault()
    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, phone }),
    })
    if (response.ok) {
      const payload = await response.json()
      setProfile(payload.profile)
    }
  }

  async function onLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
    router.refresh()
  }

  if (!profile) return <div className="p-6">Loading profile...</div>

  return (
    <div className="min-h-screen p-6 space-y-4">
      <h1 className="text-2xl font-black">Profile</h1>
      <p className="font-mono text-sm">{profile.email}</p>
      <form onSubmit={onSave} className="space-y-2 border-2 border-border p-4">
        <input className="w-full border-2 border-border p-2" value={name} onChange={(event) => setName(event.target.value)} />
        <input className="w-full border-2 border-border p-2" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone" />
        <button className="brutal-btn w-full" type="submit">Save Profile</button>
      </form>
      <button className="w-full border-2 border-border p-3 font-bold" onClick={onLogout}>Logout</button>
    </div>
  )
}
