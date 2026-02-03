import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "success" | "warning" | "pending" | "destructive"
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = "default", ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={cn(
                    "inline-flex items-center px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider border-2",
                    {
                        "border-border bg-muted text-foreground": variant === "default",
                        "border-green-600 bg-green-500/20 text-green-600": variant === "success",
                        "border-yellow-600 bg-yellow-500/20 text-yellow-600": variant === "warning",
                        "border-blue-600 bg-blue-500/20 text-blue-600": variant === "pending",
                        "border-red-600 bg-red-500/20 text-red-600": variant === "destructive",
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Badge.displayName = "Badge"

export { Badge }
