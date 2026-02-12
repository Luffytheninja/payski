"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Sheet } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const NAV_LINKS = [
    { label: "Features", href: "/features" },
    { label: "Manifesto", href: "/manifesto" },
    { label: "Pricing", href: "/pricing" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur-sm">
            <div className="container mx-auto flex h-20 items-center justify-between px-6">
                {/* LOGO */}
                <Link href="/" className="text-3xl font-black uppercase tracking-tighter hover:text-accent transition-colors">
                    PAYSKI
                </Link>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex gap-8 items-center">
                    {NAV_LINKS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-sm font-bold uppercase tracking-widest hover:underline decoration-2 decoration-accent underline-offset-4"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/dashboard"
                        className="text-sm font-bold uppercase tracking-widest hover:underline decoration-2 decoration-accent underline-offset-4"
                    >
                        Login
                    </Link>
                </div>

                {/* CTA & MOBILE */}
                <div className="flex items-center gap-4">
                    <Link href="/onboarding" className="hidden md:block">
                        <button className="brutal-btn text-sm py-2 px-4 shadow-[2px_2px_0px_0px_var(--border)]">
                            Get App
                        </button>
                    </Link>

                    <button
                        className="md:hidden p-2 hover:bg-muted"
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu className="h-8 w-8" />
                    </button>
                </div>
            </div>

            {/* MOBILE MENU SHEET */}
            <Sheet open={isOpen} onClose={() => setIsOpen(false)} title="MENU">
                <div className="flex flex-col gap-6 mt-8">
                    {NAV_LINKS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-black uppercase hover:text-accent transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="h-px bg-border my-2" />
                    <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="text-2xl font-black uppercase hover:text-accent transition-colors"
                    >
                        Login
                    </Link>
                    <Link href="/onboarding" onClick={() => setIsOpen(false)}>
                        <Button className="w-full mt-4" size="lg">
                            Get App
                        </Button>
                    </Link>
                </div>
            </Sheet>
        </nav>
    )
}
