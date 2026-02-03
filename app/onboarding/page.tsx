"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
    ChevronRight,
    ChevronLeft,
    Zap,
    Shield,
    TrendingUp,
    Target,
    Sparkles,
    CheckCircle2,
    User,
    Mail,
    Phone,
    Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

const STEPS = [
    { id: "welcome", title: "Welcome" },
    { id: "features", title: "Features" },
    { id: "personal", title: "Your Info" },
    { id: "verify", title: "Verify" },
    { id: "success", title: "Done" },
]

export default function OnboardingPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    })
    const [isVerifying, setIsVerifying] = useState(false)
    const [isVerified, setIsVerified] = useState(false)

    const progress = ((currentStep + 1) / STEPS.length) * 100

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleVerify = () => {
        setIsVerifying(true)
        // Simulate verification
        setTimeout(() => {
            setIsVerifying(false)
            setIsVerified(true)
            setTimeout(nextStep, 1000)
        }, 2000)
    }

    const handleComplete = () => {
        router.push("/dashboard")
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Progress Bar */}
            <div className="sticky top-0 z-50 bg-background border-b-2 border-border p-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                        Step {currentStep + 1} of {STEPS.length}
                    </span>
                    {currentStep > 0 && currentStep < STEPS.length - 1 && (
                        <button
                            onClick={prevStep}
                            className="font-mono text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                        >
                            <ChevronLeft size={14} />
                            Back
                        </button>
                    )}
                </div>
                <Progress value={progress} />
            </div>

            {/* Step Content */}
            <div className="flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                        <WelcomeStep key="welcome" onNext={nextStep} />
                    )}
                    {currentStep === 1 && (
                        <FeaturesStep key="features" onNext={nextStep} />
                    )}
                    {currentStep === 2 && (
                        <PersonalInfoStep
                            key="personal"
                            formData={formData}
                            setFormData={setFormData}
                            onNext={nextStep}
                        />
                    )}
                    {currentStep === 3 && (
                        <VerifyStep
                            key="verify"
                            isVerifying={isVerifying}
                            isVerified={isVerified}
                            onVerify={handleVerify}
                        />
                    )}
                    {currentStep === 4 && (
                        <SuccessStep key="success" onComplete={handleComplete} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

// Step Components
function WelcomeStep({ onNext }: { onNext: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col p-6"
        >
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-24 h-24 bg-accent border-4 border-border flex items-center justify-center shadow-[8px_8px_0px_0px_var(--border)]"
                >
                    <Zap size={48} className="text-accent-foreground" />
                </motion.div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-black uppercase tracking-tighter">
                        Welcome to<br />
                        <span className="text-5xl">PAYSKI</span>
                    </h1>
                    <p className="font-mono text-muted-foreground max-w-xs mx-auto">
                        The financial OS for the glitch generation. Let&apos;s get you set up in under 5 minutes.
                    </p>
                </div>
            </div>

            <Button onClick={onNext} className="w-full" size="lg">
                Get Started <ChevronRight size={18} />
            </Button>
        </motion.div>
    )
}

function FeaturesStep({ onNext }: { onNext: () => void }) {
    const features = [
        { icon: TrendingUp, title: "Financial Timeline", desc: "See your money's past, present, and future" },
        { icon: Sparkles, title: "AI Insights", desc: "Understand your spending patterns effortlessly" },
        { icon: Target, title: "Smart Goals", desc: "Save for what matters with visual progress" },
        { icon: Shield, title: "Bank-Grade Security", desc: "Zero-trust architecture protects your money" },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col p-6"
        >
            <div className="flex-1 space-y-6">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                        What You Get
                    </h2>
                    <p className="font-mono text-sm text-muted-foreground">
                        Money management, reimagined
                    </p>
                </div>

                <div className="space-y-4">
                    {features.map((feature, i) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                                className="flex items-center gap-4 p-4 border-2 border-border bg-background"
                            >
                                <div className="w-12 h-12 bg-accent border-2 border-border flex items-center justify-center flex-shrink-0">
                                    <Icon size={24} className="text-accent-foreground" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">{feature.title}</h3>
                                    <p className="font-mono text-xs text-muted-foreground">{feature.desc}</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            <Button onClick={onNext} className="w-full" size="lg">
                Continue <ChevronRight size={18} />
            </Button>
        </motion.div>
    )
}

function PersonalInfoStep({
    formData,
    setFormData,
    onNext
}: {
    formData: { name: string; email: string; phone: string }
    setFormData: (data: { name: string; email: string; phone: string }) => void
    onNext: () => void
}) {
    const isValid = formData.name && formData.email && formData.phone

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col p-6"
        >
            <div className="flex-1 space-y-6">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                        About You
                    </h2>
                    <p className="font-mono text-sm text-muted-foreground">
                        We need a few details to set up your account
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="pl-12"
                        />
                    </div>
                    <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="pl-12"
                        />
                    </div>
                    <div className="relative">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="tel"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="pl-12"
                        />
                    </div>
                </div>

                <p className="font-mono text-xs text-muted-foreground text-center">
                    Your data is encrypted and never shared without your consent.
                </p>
            </div>

            <Button onClick={onNext} className="w-full" size="lg" disabled={!isValid}>
                Continue <ChevronRight size={18} />
            </Button>
        </motion.div>
    )
}

function VerifyStep({
    isVerifying,
    isVerified,
    onVerify
}: {
    isVerifying: boolean
    isVerified: boolean
    onVerify: () => void
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col p-6"
        >
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                <motion.div
                    animate={isVerifying ? { rotate: 360 } : {}}
                    transition={isVerifying ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                    className={`w-24 h-24 border-4 border-border flex items-center justify-center ${isVerified ? "bg-green-500" : isVerifying ? "bg-muted" : "bg-accent"
                        }`}
                >
                    {isVerified ? (
                        <CheckCircle2 size={48} className="text-white" />
                    ) : isVerifying ? (
                        <Loader2 size={48} className="text-muted-foreground" />
                    ) : (
                        <Shield size={48} className="text-accent-foreground" />
                    )}
                </motion.div>

                <div className="space-y-4">
                    <h2 className="text-3xl font-black uppercase tracking-tighter">
                        {isVerified ? "Verified!" : isVerifying ? "Verifying..." : "Quick Verification"}
                    </h2>
                    <p className="font-mono text-muted-foreground max-w-xs mx-auto">
                        {isVerified
                            ? "Your identity has been confirmed. You're all set!"
                            : isVerifying
                                ? "Please wait while we verify your information..."
                                : "We'll verify your identity using your provided details. This usually takes a few seconds."
                        }
                    </p>
                </div>
            </div>

            {!isVerified && !isVerifying && (
                <Button onClick={onVerify} className="w-full" size="lg">
                    Verify Now <Shield size={18} />
                </Button>
            )}
        </motion.div>
    )
}

function SuccessStep({ onComplete }: { onComplete: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col p-6"
        >
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-32 h-32 bg-accent border-4 border-border flex items-center justify-center shadow-[8px_8px_0px_0px_var(--border)]"
                >
                    <Sparkles size={64} className="text-accent-foreground" />
                </motion.div>

                <div className="space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl font-black uppercase tracking-tighter"
                    >
                        You&apos;re In!
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="font-mono text-muted-foreground max-w-xs mx-auto"
                    >
                        Welcome to the future of banking. Your account is ready to use.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-3 gap-4 w-full max-w-xs"
                >
                    <div className="text-center">
                        <p className="font-black text-2xl">$0</p>
                        <p className="font-mono text-xs text-muted-foreground">Monthly Fees</p>
                    </div>
                    <div className="text-center">
                        <p className="font-black text-2xl">∞</p>
                        <p className="font-mono text-xs text-muted-foreground">Transfers</p>
                    </div>
                    <div className="text-center">
                        <p className="font-black text-2xl">24/7</p>
                        <p className="font-mono text-xs text-muted-foreground">Support</p>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
            >
                <Button onClick={onComplete} className="w-full" size="lg">
                    Open Your Dashboard <ChevronRight size={18} />
                </Button>
            </motion.div>
        </motion.div>
    )
}
