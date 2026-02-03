import Link from "next/link"
import { ArrowRight, Zap } from "lucide-react"

export function Hero() {
    return (
        <section className="relative w-full min-h-[90vh] flex flex-col md:flex-row border-b-2 border-border">
            {/* LEFT: CONTENT */}
            <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center border-r-2 border-border bg-background">
                <div className="inline-flex items-center gap-2 mb-6 border-2 border-border px-3 py-1 w-fit bg-accent text-accent-foreground font-mono text-xs uppercase tracking-widest">
                    <Zap size={14} className="fill-current" />
                    <span>v1.0.0 Public Beta</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
                    DISMANTLE <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">THE BOREDOM.</span>
                </h1>

                <p className="text-lg md:text-xl font-mono text-muted-foreground mb-12 max-w-md">
                    Stop banking like your parents. Payski is the financial OS for the glitch generation.
                    Send, spend, and ascend.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/onboarding">
                        <button className="brutal-btn flex items-center justify-center gap-2 group">
                            Download Payski
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>

                    <button className="brutal-btn-outline">
                        View Manifesto
                    </button>
                </div>
            </div>

            {/* RIGHT: VISUAL / ILLUSTRATION PLACEHOLDER */}
            <div className="w-full md:w-1/2 bg-muted/50 relative overflow-hidden flex items-center justify-center min-h-[500px]">
                {/* Abstract Pattern Background */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                />

                {/* Placeholder for Character Illustration */}
                <div className="relative w-80 h-96 border-4 border-border bg-background shadow-[10px_10px_0px_0px_var(--accent)] flex items-center justify-center p-8 text-center rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="space-y-4">
                        <div className="w-32 h-32 rounded-full bg-foreground mx-auto flex items-center justify-center">
                            <Zap className="text-background w-16 h-16 fill-current" />
                        </div>
                        <h3 className="font-black text-2xl uppercase">Character Asset</h3>
                        <p className="font-mono text-xs">Waiting for manga-style generation...</p>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 right-20 bg-accent border-2 border-border p-2 font-mono text-xs font-bold -rotate-12 shadow-[4px_4px_0px_0px_var(--border)]">
                    CASH BACK +5%
                </div>

                <div className="absolute bottom-20 left-20 bg-background border-2 border-border p-4 font-black text-xl rotate-6 shadow-[4px_4px_0px_0px_var(--border)]">
                    $1,042.00
                </div>
            </div>
        </section>
    )
}
