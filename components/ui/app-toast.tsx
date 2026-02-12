"use client"

import { useEffect, useState } from "react"
import { APP_TOAST_EVENT, type AppToastDetail } from "@/lib/not-implemented-toast"

type ToastState = AppToastDetail & { id: number }

export function AppToast() {
    const [toast, setToast] = useState<ToastState | null>(null)

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout> | undefined

        const handler = (event: Event) => {
            const customEvent = event as CustomEvent<AppToastDetail>
            const nextToast = {
                ...customEvent.detail,
                id: Date.now(),
            }

            setToast(nextToast)

            if (timeoutId) {
                clearTimeout(timeoutId)
            }

            timeoutId = setTimeout(() => {
                setToast((current) => (current?.id === nextToast.id ? null : current))
            }, 3000)
        }

        window.addEventListener(APP_TOAST_EVENT, handler)

        return () => {
            window.removeEventListener(APP_TOAST_EVENT, handler)
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [])

    if (!toast) return null

    return (
        <div className="fixed bottom-24 right-4 z-50 w-[calc(100%-2rem)] max-w-sm border-2 border-border bg-background p-4 shadow-[6px_6px_0px_0px_var(--border)] sm:bottom-6">
            <p className="font-black uppercase text-sm">{toast.title}</p>
            {toast.description && <p className="mt-1 font-mono text-xs text-muted-foreground">{toast.description}</p>}
        </div>
    )
}
