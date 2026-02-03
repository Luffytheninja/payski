import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TransactionSimulator } from "@/components/transaction-simulator";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <Navbar />
      <Hero />

      {/* MARQUEE BANNER */}
      <div className="w-full bg-foreground text-background py-4 overflow-hidden border-b-2 border-border">
        <div className="whitespace-nowrap animate-marquee font-mono text-sm font-bold uppercase tracking-[0.5em]">
          NO FEES /// INSTANT TRANSFERS /// SECURE ENCLAVE /// CYBER-READY /// NO FEES /// INSTANT TRANSFERS /// SECURE ENCLAVE /// CYBER-READY
        </div>
      </div>

      {/* DEMO SECTION */}
      <section className="container mx-auto py-20 px-6 flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">
            Money moves <br />
            <span className="bg-accent px-2">faster than light.</span>
          </h2>
          <p className="font-mono text-muted-foreground text-lg">
            Try the simulator. See how it feels to have total control.
            Zero friction, infinite upside.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <TransactionSimulator />
        </div>
      </section>

      {/* GRID SECTION -- Just a preview */}
      <section className="container mx-auto py-20 px-6 border-t-2 border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "No Hidden Fees", desc: "We don't steal your money. That's old school." },
            { title: "Instant", desc: "Faster than a serotonin hit. Blink and it's there." },
            { title: "Global", desc: "Borderless by default. Use Payski anywhere." },
          ].map((item, i) => (
            <div key={i} className="brutal-card group hover:-translate-y-2">
              <h3 className="text-2xl font-black mb-4 uppercase decoration-accent decoration-4 underline-offset-4 group-hover:underline">
                {item.title}
              </h3>
              <p className="font-mono text-muted-foreground">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
