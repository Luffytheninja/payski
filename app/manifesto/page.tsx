import Link from "next/link"

export default function ManifestoPage() {
    return (
        <main className="min-h-screen bg-background text-foreground px-6 py-20">
            <section className="container mx-auto max-w-3xl space-y-8">
                <h1 className="text-5xl font-black uppercase tracking-tighter">Manifesto</h1>
                <p className="font-mono text-muted-foreground text-lg">
                    We believe personal finance should be transparent, fast, and empowering. PAYSKI exists to give people direct control of their money without legacy friction.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link href="/onboarding" className="brutal-btn px-6 py-3 text-sm uppercase font-bold tracking-wider">
                        Join PAYSKI
                    </Link>
                    <Link href="/dashboard" className="brutal-btn px-6 py-3 text-sm uppercase font-bold tracking-wider">
                        Go to dashboard
                    </Link>
                </div>
            </section>
        </main>
    )
}
