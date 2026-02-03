"use client"

import { cn } from "@/lib/utils"
import { forwardRef, InputHTMLAttributes, useState } from "react"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, ...props }, ref) => {
        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    className={cn(
                        "w-full border-2 border-border bg-background px-4 py-3 font-mono text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors",
                        error && "border-red-500 focus:border-red-500",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="font-mono text-xs text-red-500">{error}</p>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"

// Currency Input with formatting
export interface CurrencyInputProps extends Omit<InputProps, "type" | "onChange" | "value"> {
    value: number
    onChange: (value: number) => void
    currency?: string
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
    ({ className, value, onChange, currency = "$", label, error, ...props }, ref) => {
        const [displayValue, setDisplayValue] = useState(value > 0 ? value.toString() : "")

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value.replace(/[^0-9.]/g, "")
            setDisplayValue(raw)
            const numValue = parseFloat(raw) || 0
            onChange(numValue)
        }

        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-muted-foreground">
                        {currency}
                    </span>
                    <input
                        ref={ref}
                        type="text"
                        inputMode="decimal"
                        value={displayValue}
                        onChange={handleChange}
                        className={cn(
                            "w-full border-2 border-border bg-background py-4 pl-12 pr-4 text-3xl font-black text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors text-right",
                            error && "border-red-500 focus:border-red-500",
                            className
                        )}
                        placeholder="0"
                        {...props}
                    />
                </div>
                {error && (
                    <p className="font-mono text-xs text-red-500">{error}</p>
                )}
            </div>
        )
    }
)
CurrencyInput.displayName = "CurrencyInput"

export { Input, CurrencyInput }
