"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, TrendingUp, Lightbulb, Target, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const navItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/timeline", icon: TrendingUp, label: "Timeline" },
    { href: "/insights", icon: Lightbulb, label: "Insights" },
    { href: "/goals", icon: Target, label: "Goals" },
    { href: "/profile", icon: User, label: "Profile" },
]

export function BottomNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t-2 border-border safe-bottom">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative flex flex-col items-center justify-center w-16 h-full touch-feedback",
                                isActive ? "text-foreground" : "text-muted-foreground"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="bottomNavIndicator"
                                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent"
                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                />
                            )}
                            <Icon
                                size={24}
                                className={cn(
                                    "transition-transform",
                                    isActive && "scale-110"
                                )}
                            />
                            <span className={cn(
                                "text-[10px] font-mono uppercase tracking-wider mt-1",
                                isActive && "font-bold"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
