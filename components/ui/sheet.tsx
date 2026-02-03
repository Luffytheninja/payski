"use client"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useEffect } from "react"

interface SheetProps {
    open: boolean
    onClose: () => void
    title?: string
    className?: string
    children?: React.ReactNode
}

const Sheet = ({ className, children, open, onClose, title }: SheetProps) => {
    // Prevent body scroll when sheet is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [open])

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={cn(
                            "fixed bottom-0 left-0 right-0 z-50 bg-background border-t-4 border-border max-h-[90vh] overflow-y-auto",
                            className
                        )}
                    >
                        {/* Handle bar */}
                        <div className="sticky top-0 bg-background pt-3 pb-1">
                            <div className="mx-auto w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
                        </div>

                        {/* Header */}
                        {title && (
                            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-border">
                                <h2 className="text-xl font-black uppercase tracking-tight">{title}</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-muted transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-6">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export { Sheet }
