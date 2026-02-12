export const APP_TOAST_EVENT = "app-toast"

export type AppToastDetail = {
    title: string
    description?: string
}

export function showToast(detail: AppToastDetail) {
    if (typeof window === "undefined") return

    window.dispatchEvent(new CustomEvent<AppToastDetail>(APP_TOAST_EVENT, { detail }))
}

export function notImplementedToast(actionLabel: string) {
    showToast({
        title: "Coming soon",
        description: `${actionLabel} is not available yet.`,
    })
}
