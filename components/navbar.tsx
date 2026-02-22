"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useState } from "react"
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs"
import { Sheet } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

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
                    {["Features", "Manifesto", "Pricing"].map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className="text-sm font-bold uppercase tracking-widest hover:underline decoration-2 decoration-accent underline-offset-4"
                        >
                            {item}
                        </Link>
                    ))}
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="text-sm font-bold uppercase tracking-widest hover:underline decoration-2 decoration-accent underline-offset-4">
                                Login
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <Link
                            href="/dashboard"
                            className="text-sm font-bold uppercase tracking-widest hover:underline decoration-2 decoration-accent underline-offset-4"
                        >
                            Log In
                        </Link>
                    </SignedIn>
                </div>

                {/* CTA & MOBILE */}
                <div className="flex items-center gap-4">
                    <SignedIn>
                        <UserButton 
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "h-10 w-10 rounded-none border-2 border-border shadow-[2px_2px_0px_0px_var(--border)]"
                                }
                            }}
                        />
                    </SignedIn>
                    <SignedOut>
                        <Link href="/onboarding" className="hidden md:block">
                            <button className="brutal-btn text-sm py-2 px-4 shadow-[2px_2px_0px_0px_var(--border)]">
                                Get App
                            </button>
                        </Link>
                    </SignedOut>

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
                    {["Features", "Manifesto", "Pricing"].map((item) => (
                        <Link
                            key={item}
                            href="#"
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-black uppercase hover:text-accent transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                    <div className="h-px bg-border my-2" />
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="text-2xl font-black uppercase text-left hover:text-accent transition-colors"
                            >
                                Login
                            </button>
                        </SignInButton>
                        <Link href="/onboarding" onClick={() => setIsOpen(false)}>
                            <Button className="w-full mt-4" size="lg">
                                Get App
                            </Button>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <Link
                            href="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-black uppercase hover:text-accent transition-colors"
                        >
                            Dashboard
                        </Link>
                        <div className="mt-4 p-4 border-2 border-border bg-muted">
                            <UserButton showName />
                        </div>
                    </SignedIn>
                </div>
            </Sheet>
        </nav>
    )
}
