"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { HTMLAttributes, forwardRef } from "react"

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
    value: number // 0-100
    showLabel?: boolean
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
    ({ className, value, showLabel = false, ...props }, ref) => {
        const clampedValue = Math.min(100, Math.max(0, value))

        return (
            <div ref={ref} className={cn("w-full space-y-1", className)} {...props}>
                {showLabel && (
                    <div className="flex justify-between">
                        <span className="font-mono text-xs text-muted-foreground">Progress</span>
                        <span className="font-mono text-xs font-bold">{clampedValue}%</span>
                    </div>
                )}
                <div className="h-3 w-full border-2 border-border bg-muted overflow-hidden">
                    <motion.div
                        className="h-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${clampedValue}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                </div>
            </div>
        )
    }
)
Progress.displayName = "Progress"

// Circular Progress for goals
interface CircularProgressProps extends HTMLAttributes<HTMLDivElement> {
    value: number
    size?: number
    strokeWidth?: number
    children?: React.ReactNode
}

const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
    ({ className, value, size = 120, strokeWidth = 8, children, ...props }, ref) => {
        const clampedValue = Math.min(100, Math.max(0, value))
        const radius = (size - strokeWidth) / 2
        const circumference = radius * 2 * Math.PI
        const offset = circumference - (clampedValue / 100) * circumference

        return (
            <div
                ref={ref}
                className={cn("relative inline-flex items-center justify-center", className)}
                style={{ width: size, height: size }}
                {...props}
            >
                <svg
                    width={size}
                    height={size}
                    className="-rotate-90"
                >
                    {/* Background circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        className="text-muted"
                    />
                    {/* Progress circle */}
                    <motion.circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        strokeLinecap="square"
                        className="text-accent"
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            strokeDasharray: circumference,
                        }}
                    />
                </svg>
                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {children || (
                        <span className="text-2xl font-black">{clampedValue}%</span>
                    )}
                </div>
            </div>
        )
    }
)
CircularProgress.displayName = "CircularProgress"

export { Progress, CircularProgress }
