"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, ChevronLeft, Zap, Shield, TrendingUp, Target, Sparkles, CheckCircle2, User, Mail, Phone } from "lucide-react"
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
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" })
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const progress = ((currentStep + 1) / STEPS.length) * 100

  const nextStep = () => setCurrentStep((value) => Math.min(value + 1, STEPS.length - 1))
  const prevStep = () => setCurrentStep((value) => Math.max(value - 1, 0))

  const beginVerification = async () => {
    setError("")
    const response = await fetch("/api/onboarding/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    })
    if (!response.ok) {
      const payload = await response.json()
      setError(payload.error ?? "Unable to begin verification")
      return
    }
    nextStep()
  }

  const handleVerify = async () => {
    setError("")
    if (code !== "123456") {
      setError("Invalid code. Use 123456 for this demo.")
      return
    }

    setIsVerifying(true)
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    })
    setIsVerifying(false)

    if (!response.ok) {
      const payload = await response.json()
      setError(payload.error ?? "Registration failed")
      return
    }

    setIsVerified(true)
    setTimeout(nextStep, 700)
  }

  const handleComplete = () => router.push("/dashboard")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 z-50 bg-background border-b-2 border-border p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Step {currentStep + 1} of {STEPS.length}</span>
          {currentStep > 0 && currentStep < STEPS.length - 1 && <button onClick={prevStep} className="font-mono text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"><ChevronLeft size={14} />Back</button>}
        </div>
        <Progress value={progress} />
      </div>

      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {currentStep === 0 && <WelcomeStep key="welcome" onNext={nextStep} />}
          {currentStep === 1 && <FeaturesStep key="features" onNext={nextStep} />}
          {currentStep === 2 && <PersonalInfoStep key="personal" formData={formData} setFormData={setFormData} onNext={beginVerification} />}
          {currentStep === 3 && <VerifyStep key="verify" code={code} setCode={setCode} isVerifying={isVerifying} isVerified={isVerified} error={error} onVerify={handleVerify} />}
          {currentStep === 4 && <SuccessStep key="success" onComplete={handleComplete} />}
        </AnimatePresence>
      </div>
      {error && <p className="px-6 pb-4 text-sm text-red-500">{error}</p>}
    </div>
  )
}

function WelcomeStep({ onNext }: { onNext: () => void }) { return <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col p-6"><div className="flex-1 flex flex-col items-center justify-center text-center space-y-8"><div className="w-24 h-24 bg-accent border-4 border-border flex items-center justify-center shadow-[8px_8px_0px_0px_var(--border)]"><Zap size={48} className="text-accent-foreground" /></div><div className="space-y-4"><h1 className="text-4xl font-black uppercase tracking-tighter">Welcome to<br /><span className="text-5xl">PAYSKI</span></h1></div></div><Button onClick={onNext} className="w-full" size="lg">Get Started <ChevronRight size={18} /></Button></motion.div> }

function FeaturesStep({ onNext }: { onNext: () => void }) {
  const features = [
    { icon: TrendingUp, title: "Financial Timeline", desc: "See your money's past, present, and future" },
    { icon: Sparkles, title: "AI Insights", desc: "Understand your spending patterns effortlessly" },
    { icon: Target, title: "Smart Goals", desc: "Save for what matters with visual progress" },
    { icon: Shield, title: "Bank-Grade Security", desc: "Zero-trust architecture protects your money" },
  ]

  return <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col p-6"><div className="flex-1 space-y-6"><div className="text-center mb-8"><h2 className="text-3xl font-black uppercase tracking-tighter mb-2">What You Get</h2></div><div className="space-y-4">{features.map((feature) => { const Icon = feature.icon; return <div key={feature.title} className="flex items-center gap-4 p-4 border-2 border-border bg-background"><div className="w-12 h-12 bg-accent border-2 border-border flex items-center justify-center flex-shrink-0"><Icon size={24} className="text-accent-foreground" /></div><div><h3 className="font-bold text-sm">{feature.title}</h3><p className="font-mono text-xs text-muted-foreground">{feature.desc}</p></div></div> })}</div></div><Button onClick={onNext} className="w-full" size="lg">Continue <ChevronRight size={18} /></Button></motion.div>
}

function PersonalInfoStep({ formData, setFormData, onNext }: { formData: { name: string; email: string; phone: string; password: string }; setFormData: (value: { name: string; email: string; phone: string; password: string }) => void; onNext: () => void }) {
  const isValid = formData.name.trim() && formData.email.trim() && formData.phone.trim() && formData.password.trim()
  return <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col p-6"><div className="flex-1 space-y-4"><h2 className="text-3xl font-black uppercase tracking-tighter">Tell us about you</h2><div className="space-y-3"><div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2" size={18} /><Input className="pl-10" placeholder="Full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2" size={18} /><Input className="pl-10" placeholder="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div><div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2" size={18} /><Input className="pl-10" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /></div><Input placeholder="Password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} /></div></div><Button onClick={onNext} className="w-full" size="lg" disabled={!isValid}>Continue <ChevronRight size={18} /></Button></motion.div>
}

function VerifyStep({ code, setCode, isVerifying, isVerified, error, onVerify }: { code: string; setCode: (value: string) => void; isVerifying: boolean; isVerified: boolean; error: string; onVerify: () => void }) {
  return <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col p-6"><div className="flex-1 space-y-4"><h2 className="text-3xl font-black uppercase tracking-tighter">Verify</h2><p className="font-mono text-xs text-muted-foreground">Enter verification code: 123456</p><Input value={code} onChange={(event) => setCode(event.target.value)} placeholder="123456" />{error && <p className="text-sm text-red-500">{error}</p>}</div><Button onClick={onVerify} className="w-full" size="lg" disabled={isVerifying || isVerified}>{isVerifying ? "Verifying..." : isVerified ? "Verified" : "Verify"}</Button></motion.div>
}

function SuccessStep({ onComplete }: { onComplete: () => void }) {
  return <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col p-6"><div className="flex-1 flex flex-col items-center justify-center text-center space-y-6"><CheckCircle2 size={72} className="text-green-500" /><h2 className="text-3xl font-black uppercase">You are in</h2></div><Button onClick={onComplete} className="w-full" size="lg">Go to Dashboard <ChevronRight size={18} /></Button></motion.div>
}
