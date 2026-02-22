"use client"

import { motion } from "framer-motion"
import {
    ChevronRight,
    Shield,
    Bell,
    Moon,
    HelpCircle,
    LogOut,
    Smartphone,
    Lock,
    Eye,
    FileText
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useUser, useClerk } from "@clerk/nextjs"

export default function ProfilePage() {
    const { user, isLoaded } = useUser()
    const { signOut } = useClerk()

    if (!isLoaded || !user) {
        return <div className="min-h-screen flex items-center justify-center font-mono text-sm">Loading profile...</div>
    }

    const userName = user.fullName || user.firstName || "User"
    const userEmail = user.primaryEmailAddress?.emailAddress || ""

    const menuItems = [
        {
            group: "Security",
            items: [
                { icon: Shield, label: "Security Settings", badge: "Protected" },
                { icon: Lock, label: "Change PIN" },
                { icon: Smartphone, label: "Trusted Devices", badge: "2 devices" },
            ]
        },
        {
            group: "Preferences",
            items: [
                { icon: Bell, label: "Notifications" },
                { icon: Moon, label: "Appearance" },
                { icon: Eye, label: "Privacy" },
            ]
        },
        {
            group: "Support",
            items: [
                { icon: HelpCircle, label: "Help Center" },
                { icon: FileText, label: "Legal" },
            ]
        }
    ]

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-background border-b-2 border-border px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Your</p>
                        <h1 className="text-2xl font-black">Profile</h1>
                    </div>
                </div>
            </header>

            <div className="p-6 space-y-6">
                {/* User Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-accent border-2 border-border flex items-center justify-center font-black text-2xl text-accent-foreground">
                                    {userName.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <h2 className="font-black text-xl">{userName}</h2>
                                    <p className="font-mono text-sm text-muted-foreground">{userEmail}</p>
                                    <Badge variant="success" className="mt-2">Verified</Badge>
                                </div>
                                <ChevronRight size={20} className="text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Account Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-3 gap-4"
                >
                    <Card className="p-4 text-center">
                        <p className="font-mono text-xs text-muted-foreground mb-1">Member Since</p>
                        <p className="font-black">Jan 2024</p>
                    </Card>
                    <Card className="p-4 text-center">
                        <p className="font-mono text-xs text-muted-foreground mb-1">Transactions</p>
                        <p className="font-black">247</p>
                    </Card>
                    <Card className="p-4 text-center">
                        <p className="font-mono text-xs text-muted-foreground mb-1">Goals</p>
                        <p className="font-black">3</p>
                    </Card>
                </motion.div>

                {/* Menu Sections */}
                {menuItems.map((section, sectionIndex) => (
                    <motion.section
                        key={section.group}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + sectionIndex * 0.05 }}
                    >
                        <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
                            {section.group}
                        </h3>
                        <Card>
                            <CardContent className="p-0">
                                {section.items.map((item, i) => {
                                    const Icon = item.icon
                                    return (
                                        <button
                                            key={item.label}
                                            className={`w-full flex items-center gap-4 p-4 hover:bg-muted transition-colors touch-feedback ${i !== section.items.length - 1 ? "border-b border-border" : ""
                                                }`}
                                        >
                                            <div className="w-10 h-10 bg-muted border-2 border-border flex items-center justify-center">
                                                <Icon size={18} />
                                            </div>
                                            <span className="flex-1 font-bold text-sm text-left">{item.label}</span>
                                            {item.badge && (
                                                <Badge variant="default">{item.badge}</Badge>
                                            )}
                                            <ChevronRight size={18} className="text-muted-foreground" />
                                        </button>
                                    )
                                })}
                            </CardContent>
                        </Card>
                    </motion.section>
                ))}

                {/* Logout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                >
                    <button onClick={() => signOut()} className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-bold hover:bg-red-500/10 transition-colors border-2 border-red-500">
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </motion.div>

                {/* Version */}
                <p className="text-center font-mono text-xs text-muted-foreground">
                    PaySki v1.0.0 (Beta)
                </p>
            </div>
        </div>
    )
}
