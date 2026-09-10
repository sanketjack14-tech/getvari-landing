import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Droplet, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  ChevronRight,
  ExternalLink,
  Table
} from 'lucide-react';
import { MovingDotsBackground } from './MovingDotsBackground';
import { WaitlistForm } from './WaitlistForm';
import { HydrationGateModal } from './HydrationGateModal';
import { LegalModal } from './LegalModal';

interface LandingPageVersionBProps {
  onSwitchToVersionA?: () => void;
}

const ROLLING_POINTS = [
  {
    id: 1,
    tag: "Pioneering Innovation",
    title: "India's first hydration intelligence platform",
    description: "Combining continuous biothermal skin sensing, sweat GSR telemetry, and AI gastric absorption modeling.",
    gradient: "from-cyan-400 via-sky-300 to-blue-500",
    icon: Droplet
  },
  {
    id: 2,
    tag: "Behavioral Transformation",
    title: "Let's build hydration as a must-have habit",
    description: "Screenless real-time vibration alerts notify you precisely when your cellular fluid drops—before thirst strikes.",
    gradient: "from-emerald-400 via-teal-300 to-cyan-400",
    icon: Activity
  },
  {
    id: 3,
    tag: "The Daily Bio-Rhythm",
    title: "Eat. Hydrate. Hydrate. Sleep. Repeat.",
    description: "Optimize physical endurance, cognitive focus, and recovery through continuous physiological hydration sync.",
    gradient: "from-sky-300 via-cyan-400 to-indigo-400",
    icon: Sparkles
  }
];

export const LandingPageVersionB: React.FC<LandingPageVersionBProps> = ({ onSwitchToVersionA }) => {
  // Gate popup state (always show when opening Version B)
  const [showHydrationGate, setShowHydrationGate] = useState<boolean>(true);

  const handleGateComplete = () => {
    try {
      sessionStorage.setItem('getvari_hydration_gate_seen', 'true');
    } catch (e) {
      console.error(e);
    }
    setShowHydrationGate(false);
  };

  const [activePointIndex, setActivePointIndex] = useState<number>(0);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);

  // Auto-rotate the active rolling point every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePointIndex((prev) => (prev + 1) % ROLLING_POINTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen h-screen flex flex-col bg-[#050811] text-gray-100 font-body selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden">
      {/* Interactive Google AI Studio Moving Dots Background */}
      <MovingDotsBackground />

      {/* Glowing Ambient Background Blurs */}
      <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/6 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* HEADER BAR */}
      <header className="relative z-40 w-full bg-[#050811]/80 backdrop-blur-xl border-b border-white/10 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Version Badge */}
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-black tracking-tight font-display text-white select-none">
              get<span className="text-cyan-400">Vāri</span>
            </span>
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">
              Version B • Single-Fold
            </span>
          </div>

          {/* Action CTAs & Version Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHydrationGate(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-xs font-mono-tech font-bold text-cyan-300 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Open Popup</span>
            </button>

            {onSwitchToVersionA && (
              <button
                onClick={onSwitchToVersionA}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-300 transition-all cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Switch to Version A</span>
              </button>
            )}

            <a
              href="/api/waitlist"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 font-mono-tech text-xs tracking-wide transition-all cursor-pointer"
            >
              <Table className="w-3.5 h-3.5 text-cyan-400" />
              <span>Waitlist Data Table</span>
            </a>
          </div>
        </div>
      </header>

      {/* MAIN SINGLE FOLD VIEWPORT */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-4 lg:py-6 overflow-y-auto lg:overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">

          {/* LEFT COLUMN: CONTINUOUS ROLLING TEXT & BRAND CAROUSEL */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Top Continuous Marquee Ticker */}
            <div className="overflow-hidden rounded-full bg-cyan-950/30 border border-cyan-500/20 py-2 px-4 backdrop-blur-md">
              <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
                <span className="flex items-center gap-2 text-xs font-mono-tech text-cyan-300 uppercase tracking-widest font-semibold">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  India's First Hydration Intelligence Platform
                </span>
                <span className="text-cyan-600 font-bold">•</span>
                <span className="flex items-center gap-2 text-xs font-mono-tech text-sky-300 uppercase tracking-widest font-semibold">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  Let's Build Hydration As A Must-Have Habit
                </span>
                <span className="text-cyan-600 font-bold">•</span>
                <span className="flex items-center gap-2 text-xs font-mono-tech text-emerald-300 uppercase tracking-widest font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Eat. Hydrate. Hydrate. Sleep. Repeat.
                </span>
              </div>
            </div>

            {/* Dynamic Animated Headline Card (Active Slide Highlight) */}
            <div className="relative min-h-[220px] sm:min-h-[240px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {ROLLING_POINTS.map((pt, idx) => {
                  if (idx !== activePointIndex) return null;
                  const IconComp = pt.icon;
                  return (
                    <motion.div
                      key={pt.id}
                      initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="space-y-4"
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono-tech font-bold uppercase tracking-wider">
                        <IconComp className="w-3.5 h-3.5 text-cyan-400" />
                        <span>0{pt.id} • {pt.tag}</span>
                      </div>

                      <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight bg-gradient-to-r ${pt.gradient} bg-clip-text text-transparent leading-[1.15]`}>
                        "{pt.title}"
                      </h1>

                      <p className="text-base sm:text-lg text-gray-300 font-body leading-relaxed max-w-xl">
                        {pt.description}
                      </p>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Interactive Progress Indicators & Selector Tabs */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {ROLLING_POINTS.map((pt, idx) => (
                <button
                  key={pt.id}
                  onClick={() => setActivePointIndex(idx)}
                  className={`text-left p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                    activePointIndex === idx
                      ? 'bg-cyan-950/40 border-cyan-400/50 shadow-[0_0_20px_rgba(56,189,248,0.15)]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-400'
                  }`}
                >
                  {/* Progress Line */}
                  {activePointIndex === idx && (
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, ease: "linear" }}
                      className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                    />
                  )}
                  <span className="block text-[10px] font-mono-tech uppercase tracking-wider text-cyan-400 font-bold mb-1">
                    Point 0{pt.id}
                  </span>
                  <span className={`block text-xs font-bold font-display line-clamp-1 ${activePointIndex === idx ? 'text-white' : 'text-gray-400'}`}>
                    {pt.title}
                  </span>
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: SUBSCRIBE OPTION & WAITLIST FORM */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="glass rounded-3xl p-6 sm:p-8 border border-cyan-400/30 bg-[#070d1e]/80 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] space-y-6 relative overflow-hidden">
              
              {/* Subtle top accent bar */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500" />

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-[11px] font-mono-tech font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Founders Edition Access</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
                  Subscribe for Early Access
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 font-body leading-relaxed">
                  Join the exclusive early adopters list for <span className="text-cyan-400 font-semibold">getVāri</span> screenless hydration wearable.
                </p>
              </div>

              {/* Waitlist Form with live RFC 5322 validation */}
              <WaitlistForm variant="hero" />

              {/* Quick Perks List */}
              <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-3 text-left">
                <div className="flex items-center gap-2 text-xs text-gray-300 font-body">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Priority Device Drop</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300 font-body">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Zero Spam Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300 font-body">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>App Twin Lifetime Pass</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300 font-body">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Founders Pricing (-30%)</span>
                </div>
              </div>

              {/* Direct Link to Waitlist Submissions Table */}
              <div className="pt-2">
                <a
                  href="/api/waitlist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 text-xs font-mono-tech font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>View Live Submissions Table (`/api/waitlist`)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* FOOTER BAR */}
      <footer className="relative z-40 w-full bg-[#050811]/90 backdrop-blur-xl border-t border-white/10 py-3 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400 font-mono-tech">
          <div>
            © 2026 getVāri. All rights reserved. Screenless Hydration Intelligence.
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLegalModalType('terms')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-gray-600">•</span>
            <button 
              onClick={() => setLegalModalType('privacy')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>

      {/* 3-STEP HYDRATION GATE ENTRY POPUP (Seen once per session) */}
      {showHydrationGate && (
        <HydrationGateModal onComplete={handleGateComplete} />
      )}

      {/* LEGAL MODALS */}
      {legalModalType && (
        <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
      )}
    </div>
  );
};
