"use client"

import { useState } from "react"
import { ArrowUpRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function TransactionSimulator() {
    const [step, setStep] = useState<"input" | "sending" | "success">("input")
    const [amount, setAmount] = useState("")

    const handleSend = () => {
        if (!amount) return
        setStep("sending")
        setTimeout(() => {
            setStep("success")
            setTimeout(() => setStep("input"), 3000)
        }, 1500)
    }

    return (
        <div className="w-full max-w-sm mx-auto brutal-card min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
            {step === "input" && (
                <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4">
                    <div className="text-center space-y-2">
                        <p className="font-mono text-xs font-bold uppercase text-muted-foreground">Send Money</p>
                        <div className="relative">
                            <span className="text-4xl font-black absolute left-8 top-1/2 -translate-y-1/2">$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className="w-full bg-transparent text-6xl font-black text-center focus:outline-none border-b-2 border-border focus:border-accent p-4"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 justify-center">
                        {["10", "20", "50"].map(val => (
                            <button
                                key={val}
                                onClick={() => setAmount(val)}
                                className="border border-border px-3 py-1 font-mono text-xs hover:bg-accent hover:text-accent-foreground"
                            >
                                ${val}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleSend}
                        disabled={!amount}
                        className="w-full brutal-btn flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        SEND IT <ArrowUpRight className="group-hover:rotate-45 transition-transform" />
                    </button>
                </div>
            )}

            {step === "sending" && (
                <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-white space-y-4 animate-in fade-in zoom-in-95">
                    <div className="w-16 h-16 border-4 border-t-accent border-white rounded-full animate-spin" />
                    <p className="font-mono font-bold blink">PROCESSING...</p>
                </div>
            )}

            {step === "success" && (
                <div className="absolute inset-0 bg-accent flex flex-col items-center justify-center text-accent-foreground space-y-6 animate-in slide-in-from-bottom-full duration-500">
                    <div className="border-4 border-black rounded-none p-4 bg-white shadow-[8px_8px_0px_0px_black]">
                        <Check size={48} />
                    </div>
                    <h3 className="text-4xl font-black uppercase tracking-tighter">SENT!</h3>
                    <p className="font-mono font-bold">${amount}.00 moved.</p>
                </div>
            )}
        </div>
    )
}
