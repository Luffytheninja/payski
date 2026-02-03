"use client"

import { cn } from "@/lib/utils"
import { forwardRef, ButtonHTMLAttributes } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "destructive"
    size?: "sm" | "md" | "lg"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    // Base styles
                    "inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wider transition-all duration-200 active:translate-x-0 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed",
                    // Variants
                    {
                        "border-2 border-border bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground hover:translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_var(--border)]":
                            variant === "primary",
                        "border-2 border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground hover:translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_var(--border)]":
                            variant === "secondary",
                        "bg-transparent text-foreground hover:bg-muted":
                            variant === "ghost",
                        "border-2 border-red-500 bg-red-500 text-white hover:bg-red-600 hover:translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_#991b1b]":
                            variant === "destructive",
                    },
                    // Sizes
                    {
                        "px-3 py-1.5 text-xs": size === "sm",
                        "px-6 py-3 text-sm": size === "md",
                        "px-8 py-4 text-base": size === "lg",
                    },
                    className
                )}
                {...props}
            />
        )
    }
)

Button.displayName = "Button"

export { Button }
