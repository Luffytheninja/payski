"use client" // Error components must be Client Components

import { useEffect } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center border-4 border-red-500 bg-red-100 text-red-500 shadow-[8px_8px_0px_0px_#ef4444]">
                <AlertTriangle size={48} />
            </div>

            <h1 className="mb-2 text-4xl font-black uppercase tracking-tighter text-red-500">
                System Malfunction
            </h1>

            <p className="mb-8 max-w-md font-mono text-muted-foreground">
                We encountered an unexpected error processing your request. Our digital mechanics have been notified.
            </p>

            <div className="flex gap-4">
                <Button
                    onClick={() => window.location.href = "/dashboard"}
                    variant="secondary"
                >
                    Return Home
                </Button>
                <Button
                    onClick={reset}
                    variant="destructive"
                    className="flex items-center gap-2"
                >
                    <RefreshCw size={16} />
                    Try Again
                </Button>
            </div>

            {error.digest && (
                <p className="mt-8 font-mono text-xs text-muted-foreground opacity-50">
                    Error Code: {error.digest}
                </p>
            )}
        </div>
    )
}
