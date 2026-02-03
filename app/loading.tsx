export default function Loading() {
    return (
        <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <div className="relative h-16 w-16">
                    <div className="absolute inset-0 animate-ping rounded-full bg-accent opacity-20"></div>
                    <div className="relative flex h-full w-full items-center justify-center border-4 border-border bg-background shadow-[4px_4px_0px_0px_var(--border)]">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-accent"></div>
                    </div>
                </div>
                <p className="animate-pulse font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Loading Financial Data...
                </p>
            </div>
        </div>
    )
}
