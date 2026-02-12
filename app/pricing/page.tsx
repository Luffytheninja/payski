import Link from "next/link"

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-background text-foreground px-6 py-20">
            <section className="container mx-auto max-w-3xl space-y-8">
                <h1 className="text-5xl font-black uppercase tracking-tighter">Pricing</h1>
                <p className="font-mono text-muted-foreground text-lg">
                    Start free and scale as you grow. PAYSKI plans are designed to keep costs simple while unlocking better financial visibility for every stage.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link href="/onboarding" className="brutal-btn px-6 py-3 text-sm uppercase font-bold tracking-wider">
                        Get started free
                    </Link>
                    <Link href="/dashboard" className="brutal-btn px-6 py-3 text-sm uppercase font-bold tracking-wider">
                        View dashboard
                    </Link>
                </div>
            </section>
        </main>
    )
}
