"use client"

import { cn } from "@/lib/utils"

interface AppShellProps {
    children: React.ReactNode
    className?: string
}

export function AppShell({ children, className }: AppShellProps) {
    return (
        <div
            className={cn(
                "min-h-screen bg-background text-foreground flex flex-col",
                className
            )}
        >
            {/* Main content area with safe area padding */}
            <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
                {children}
            </main>
        </div>
    )
}
