import Link from "next/link"
import { FileQuestion, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4 text-center">
            <div className="glitch-container mb-6 relative">
                <div className="relative flex h-32 w-32 items-center justify-center border-4 border-foreground bg-accent text-accent-foreground shadow-[8px_8px_0px_0px_var(--foreground)]">
                    <span className="text-6xl font-black">404</span>
                </div>
            </div>

            <h2 className="mb-2 text-3xl font-black uppercase tracking-tight">
                Lost in the Void
            </h2>

            <p className="mb-8 max-w-sm font-mono text-muted-foreground">
                The financial data you are looking for has been liquidated or never existed.
            </p>

            <Link href="/dashboard">
                <Button size="lg" className="flex items-center gap-2">
                    <ArrowLeft size={18} />
                    Return to Safety
                </Button>
            </Link>
        </div>
    )
}
