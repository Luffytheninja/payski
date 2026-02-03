"use client"

import { motion } from "framer-motion"
import {
    Shield,
    Smartphone,
    MapPin,
    Clock,
    CheckCircle2,
    AlertTriangle,
    ChevronRight
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock activity log data
const mockActivityLog = [
    {
        id: "act_001",
        type: "login",
        device: "iPhone 15 Pro",
        location: "Lagos, Nigeria",
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 mins ago
        status: "success",
    },
    {
        id: "act_002",
        type: "transaction",
        description: "Sent $50 to John",
        device: "iPhone 15 Pro",
        location: "Lagos, Nigeria",
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 mins ago
        status: "success",
    },
    {
        id: "act_003",
        type: "login",
        device: "Chrome on Windows",
        location: "Lagos, Nigeria",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        status: "success",
    },
    {
        id: "act_004",
        type: "login_failed",
        device: "Unknown Device",
        location: "Unknown",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        status: "blocked",
    },
]

const trustedDevices = [
    {
        id: "dev_001",
        name: "iPhone 15 Pro",
        type: "mobile",
        lastActive: new Date(),
        isCurrent: true,
        trustScore: 98,
    },
    {
        id: "dev_002",
        name: "MacBook Pro",
        type: "desktop",
        lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
        isCurrent: false,
        trustScore: 95,
    },
]

export default function SecurityPage() {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-background border-b-2 border-border px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Your</p>
                        <h1 className="text-2xl font-black">Security</h1>
                    </div>
                    <div className="flex items-center gap-2 bg-green-500 px-3 py-1 border-2 border-green-600">
                        <Shield size={14} className="text-white" />
                        <span className="font-mono text-xs font-bold text-white">PROTECTED</span>
                    </div>
                </div>
            </header>

            <div className="p-6 space-y-6">
                {/* Security Score */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="bg-foreground text-background border-0">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-mono text-xs uppercase tracking-wider opacity-60 mb-1">Security Score</p>
                                    <h2 className="text-5xl font-black">96</h2>
                                    <p className="font-mono text-sm opacity-60 mt-1">Excellent protection</p>
                                </div>
                                <div className="w-20 h-20 border-4 border-green-500 flex items-center justify-center">
                                    <Shield size={36} className="text-green-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Trusted Devices */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-black uppercase tracking-tight">Trusted Devices</h3>
                        <span className="font-mono text-xs text-muted-foreground">{trustedDevices.length} devices</span>
                    </div>
                    <div className="space-y-3">
                        {trustedDevices.map((device, i) => (
                            <motion.div
                                key={device.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 + i * 0.05 }}
                            >
                                <Card className="p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-muted border-2 border-border flex items-center justify-center">
                                            <Smartphone size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-bold text-sm">{device.name}</p>
                                                {device.isCurrent && (
                                                    <Badge variant="success">Current</Badge>
                                                )}
                                            </div>
                                            <p className="font-mono text-xs text-muted-foreground">
                                                Last active: {device.isCurrent ? "Now" : "Yesterday"}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-lg text-green-500">{device.trustScore}%</p>
                                            <p className="font-mono text-xs text-muted-foreground">Trust</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Activity Log */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-black uppercase tracking-tight">Activity Log</h3>
                        <button className="font-mono text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                            View All <ChevronRight size={14} />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {mockActivityLog.map((activity, i) => (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.25 + i * 0.05 }}
                            >
                                <Card className={`p-4 ${activity.status === "blocked" ? "border-red-500" : ""}`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 border-2 flex items-center justify-center ${activity.status === "blocked"
                                                ? "border-red-500 bg-red-500/10"
                                                : "border-border bg-muted"
                                            }`}>
                                            {activity.status === "blocked" ? (
                                                <AlertTriangle size={18} className="text-red-500" />
                                            ) : (
                                                <CheckCircle2 size={18} className="text-green-500" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm capitalize">
                                                {activity.type.replace("_", " ")}
                                            </p>
                                            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                                                <Smartphone size={10} />
                                                <span className="truncate">{activity.device}</span>
                                                <span>•</span>
                                                <MapPin size={10} />
                                                <span>{activity.location}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
                                                <Clock size={10} />
                                                {formatTimeAgo(activity.timestamp)}
                                            </div>
                                            {activity.status === "blocked" && (
                                                <Badge variant="destructive" className="mt-1">Blocked</Badge>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Security Actions */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-3"
                >
                    <h3 className="font-black uppercase tracking-tight">Quick Actions</h3>
                    <Card className="p-4 hover:bg-muted cursor-pointer transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Shield size={20} />
                                <span className="font-bold text-sm">Change PIN</span>
                            </div>
                            <ChevronRight size={18} className="text-muted-foreground" />
                        </div>
                    </Card>
                    <Card className="p-4 hover:bg-muted cursor-pointer transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Smartphone size={20} />
                                <span className="font-bold text-sm">Manage Devices</span>
                            </div>
                            <ChevronRight size={18} className="text-muted-foreground" />
                        </div>
                    </Card>
                    <Card className="p-4 hover:bg-red-500/10 cursor-pointer transition-colors border-red-500 text-red-500">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <AlertTriangle size={20} />
                                <span className="font-bold text-sm">Lock Account</span>
                            </div>
                            <ChevronRight size={18} />
                        </div>
                    </Card>
                </motion.section>
            </div>
        </div>
    )
}

function formatTimeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

    if (seconds < 60) return "Just now"
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
}
