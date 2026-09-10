import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MovingDotsBackground } from './MovingDotsBackground';
import { WaitlistForm } from './WaitlistForm';
import { HydrationGateModal } from './HydrationGateModal';
import { LegalModal } from './LegalModal';

const ROLLING_POINTS = [
  {
    id: 1,
    title: "Let's build hydration as a must-have habit."
  },
  {
    id: 2,
    title: "Eat. Hydrate. Hydrate. Sleep. Repeat."
  },
  {
    id: 3,
    title: "Know when to hydrate, before your body gets dehydrated."
  },
  {
    id: 4,
    title: "Just 1-2% fall in hydration can lead to loss in focus and cognitive ability!"
  }
];

export const LandingPageVersionB: React.FC = () => {
  // Hydration Gate Entry Popup state
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

      {/* TOP CENTERED BRAND LOGO & PLATFORM SUBTITLE */}
      <div className="relative z-40 w-full pt-6 sm:pt-8 pb-2 flex flex-col items-center justify-center text-center shrink-0">
        <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-display text-white select-none drop-shadow-[0_0_25px_rgba(56,189,248,0.2)]">
          get<span className="text-cyan-400">Vāri</span>
        </span>
        <p className="text-xs sm:text-sm font-mono-tech text-cyan-300 uppercase tracking-widest font-bold mt-2">
          India's first hydration intelligence platform.
        </p>
      </div>

      {/* MAIN SINGLE FOLD VIEWPORT */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-4 lg:py-6 overflow-y-auto lg:overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">

          {/* LEFT COLUMN: CONTINUOUS ROLLING TEXT & BRIGHT WHITE GOOGLE AI STUDIO HEADLINE */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">

            {/* Dynamic Rolling Headline — Bright Solid White Text (Google AI Studio aesthetic, no quotes, no subtitle) */}
            <div className="relative min-h-[220px] sm:min-h-[240px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {ROLLING_POINTS.map((pt, idx) => {
                  if (idx !== activePointIndex) return null;
                  return (
                    <motion.div
                      key={pt.id}
                      initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight bg-gradient-to-br from-white via-cyan-100 to-sky-400 bg-clip-text text-transparent leading-[1.12]">
                        {pt.title}
                      </h1>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>

          {/* RIGHT COLUMN: SUBSCRIBE FORM */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="glass rounded-3xl p-6 sm:p-8 border border-cyan-400/30 bg-[#070d1e]/80 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] space-y-6 relative overflow-hidden">
              
              {/* Subtle top accent bar */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500" />

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
                  Subscribe for Early Access
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 font-body leading-relaxed">
                  Join the exclusive early adopters list for getVāri hydration intelligence.
                </p>
              </div>

              {/* Waitlist Form with live RFC 5322 validation */}
              <WaitlistForm variant="hero" />

            </div>
          </div>

        </div>
      </main>

      {/* FOOTER BAR */}
      <footer className="relative z-40 w-full bg-[#050811]/90 backdrop-blur-xl border-t border-white/10 py-3 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400 font-mono-tech">
          <div>
            © 2026 getVāri Technologies Private Limited. All rights reserved.
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

      {/* 3-STEP HYDRATION GATE ENTRY POPUP */}
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
