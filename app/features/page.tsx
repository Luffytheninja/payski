import Link from "next/link"

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-background text-foreground px-6 py-20">
            <section className="container mx-auto max-w-3xl space-y-8">
                <h1 className="text-5xl font-black uppercase tracking-tighter">Features</h1>
                <p className="font-mono text-muted-foreground text-lg">
                    Explore the core PAYSKI toolkit: intelligent timeline views, goal tracking, and instant insights that make everyday money decisions clearer.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link href="/onboarding" className="brutal-btn px-6 py-3 text-sm uppercase font-bold tracking-wider">
                        Start onboarding
                    </Link>
                    <Link href="/dashboard" className="brutal-btn px-6 py-3 text-sm uppercase font-bold tracking-wider">
                        Open dashboard
                    </Link>
                </div>
            </section>
        </main>
    )
}
