import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Brain, 
  ShieldCheck, 
  Activity, 
  Zap, 
  EyeOff, 
  BellOff, 
  ChevronLeft,
  ChevronRight,
  Droplet,
  Layers,
  Table
} from 'lucide-react';
import { MovingDotsBackground } from './MovingDotsBackground';
import { SermonBanner } from './SermonBanner';
import { WhoopGraphWidget } from './WhoopGraphWidget';
import { WaterIntakeProportionsWidget } from './WaterIntakeProportionsWidget';
import { WaitlistForm } from './WaitlistForm';
import { LedVibrationSimulator } from './LedVibrationSimulator';
import { LegalModal } from './LegalModal';
import { HydrationGateModal } from './HydrationGateModal';
import { WaitlistAdminModal } from './WaitlistAdminModal';

interface LandingPageProps {
  onOpenAppDashboard?: () => void;
  onSwitchToVersionB?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSwitchToVersionB }) => {
  const [showHydrationGate, setShowHydrationGate] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem('getvari_hydration_gate_seen');
    } catch {
      return true;
    }
  });
  const [showWaitlistAdmin, setShowWaitlistAdmin] = useState<boolean>(false);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  const handleGateComplete = () => {
    try {
      sessionStorage.setItem('getvari_hydration_gate_seen', 'true');
    } catch (e) {
      console.error(e);
    }
    setShowHydrationGate(false);
  };
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);
  const [heroState, setHeroState] = useState<'mild' | 'high'>('mild');

  // Auto change hero hydration risk state between Mild (65) and High (85) every 5 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setHeroState((prev) => (prev === 'mild' ? 'high' : 'mild'));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const CAROUSEL_TITLES = [
    '1. Dehydration Risk Detection',
    '2. Cognitive Drop Index (CDI)',
    '3. Personalised Fluid Intake'
  ];

  return (
    <div className="relative min-h-screen bg-[#070a11] text-gray-100 font-body selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Interactive Google AI Studio Moving Dots Canvas Background */}
      <MovingDotsBackground />

      {/* Sermons Section on Top (5 sermons rotating every 10 seconds, clean header) */}
      <SermonBanner />

      {/* Header with official V logo icon */}
      <header className="sticky top-0 z-40 w-full bg-[#070a11]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Clean Logo — Bigger */}
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-black tracking-tight font-display text-white">
              get<span className="text-cyan-400">Vāri</span>
            </span>
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">
              Version A • Multi-Fold
            </span>
          </div>

          {/* Header Action CTA */}
          <div className="flex items-center gap-3">
            {onSwitchToVersionB && (
              <button
                onClick={onSwitchToVersionB}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-300 transition-all cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Switch to Version B</span>
              </button>
            )}

            <a
              href="/api/waitlist"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 font-mono-tech text-xs tracking-wide transition-all cursor-pointer"
            >
              <Table className="w-3.5 h-3.5 text-cyan-400" />
              <span>Waitlist Table</span>
            </a>

            <a
              href="#waitlist"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold font-display text-xs tracking-wide shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all cursor-pointer"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </header>

      {/* Main Page Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION 1: HERO & Know when to drink — before your body tells you. */}
        <section id="predictive" className="py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Tech badge - India's first hydration intelligence wearable */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-xs font-mono-tech uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>India's first hydration intelligence wearable</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-[1.1] text-white"
            >
              Know when to drink — <span className="text-gradient-cyan">before your body tells you.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-300 font-body leading-relaxed max-w-2xl"
            >
              getVāri predicts dehydration using real-time signals from your body and environment.
            </motion.p>

            {/* Email Waitlist Capture in Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-2 max-w-xl"
            >
              <WaitlistForm variant="hero" />
            </motion.div>
          </div>

          {/* Right Side: Product Showcase with Transparent Background & Vibration Bounce */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 p-6 glass-card shadow-[0_0_50px_rgba(56,189,248,0.2)] group flex flex-col items-center justify-center">
              
              {/* Dynamic Product Image Container */}
              <div className="relative w-full h-[300px] sm:h-[350px] flex items-center justify-center">
                {/* Top Controls & Hydration Risk Status Header */}
                <div className="absolute top-2 left-2 right-2 flex flex-wrap items-center justify-between gap-2 z-10 pointer-events-auto">
                  {/* Manual Score Selector Buttons */}
                  <div className="flex items-center gap-1 bg-black/85 backdrop-blur-md p-1 rounded-xl border border-white/10 text-[10px] font-mono-tech shadow-lg">
                    <button
                      onClick={() => setHeroState('mild')}
                      className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                        heroState === 'mild' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      65 (Mild)
                    </button>
                    <button
                      onClick={() => setHeroState('high')}
                      className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                        heroState === 'high' ? 'bg-red-500/20 text-red-400 font-bold border border-red-500/40' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      85 (High Risk)
                    </button>
                  </div>

                  {/* Floating Hydration Risk Score Tag */}
                  <div className="px-2.5 py-1 rounded-xl bg-black/85 backdrop-blur-md border border-cyan-500/30 text-xs font-mono-tech shadow-lg flex items-center gap-1.5 transition-all">
                    <span className={`w-2 h-2 rounded-full animate-ping ${
                      heroState === 'high' ? 'bg-red-500' : 'bg-amber-400'
                    }`} />
                    <span className={heroState === 'high' ? 'text-red-400 font-bold' : 'text-cyan-300 font-semibold'}>
                      <span className="hidden sm:inline">Hydration </span>Risk: {heroState === 'high' ? '85' : '65'}
                    </span>
                  </div>
                </div>

                {/* Dynamic Product Images with Smooth 700ms Crossfade */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="/images/product_transparent.png"
                    alt="getVāri Screenless Wearable with Cyan LED Ring"
                    className={`absolute inset-0 w-full h-full object-contain transform group-hover:scale-105 transition-opacity duration-700 ease-in-out filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] ${
                      heroState === 'high' ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                  />
                  <img
                    src="/images/product_red_transparent.png"
                    alt="getVāri Screenless Wearable with Red LED Ring"
                    className={`absolute inset-0 w-full h-full object-contain transform group-hover:scale-105 transition-opacity duration-700 ease-in-out filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] ${
                      heroState === 'high' ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  />
                </div>

                {/* Haptic Vibration & LED Light Waves (Strictly Inside-to-Outside Pure CSS Loop, zero reverse movement) */}
                <div
                  className={`absolute w-44 h-44 rounded-full pointer-events-none z-10 border ring-pulse-wave-1 transition-colors duration-500 ${
                    heroState === 'high'
                      ? 'border-red-500/80 shadow-[0_0_15px_#ef4444]'
                      : 'border-cyan-400/60 shadow-[0_0_12px_#38bdf8]'
                  }`}
                />
                <div
                  className={`absolute w-44 h-44 rounded-full pointer-events-none z-10 border ring-pulse-wave-2 transition-colors duration-500 ${
                    heroState === 'high'
                      ? 'border-red-500/60 shadow-[0_0_10px_#ef4444]'
                      : 'border-cyan-400/40 shadow-[0_0_8px_#38bdf8]'
                  }`}
                />
              </div>

              {/* Overlay Tag - Changes between Mild Dehydration & High Dehydration */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroState}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={`w-full mt-4 p-3 rounded-xl backdrop-blur-md text-center border transition-all ${
                    heroState === 'high'
                      ? 'bg-red-950/60 border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                      : 'bg-amber-950/40 border-amber-500/30'
                  }`}
                >
                  <span className={`text-xs font-mono-tech font-bold uppercase tracking-wider ${
                    heroState === 'high' ? 'text-red-400' : 'text-amber-300'
                  }`}>
                    {heroState === 'high' ? 'High Dehydration' : 'Mild Dehydration'}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        <hr className="border-white/10 my-8" />

        {/* SECTION 2: No screen. No distractions. Just Optimal. */}
        <section id="screenless" className="py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono-tech uppercase tracking-wider">
              Zero Distraction Philosophy
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
              No screen. <br />
              <span className="text-gray-400">No distractions.</span> <br />
              <span className="text-gradient-cyan">Just Optimal.</span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg font-body leading-relaxed">
              We believe your wearable shouldn't compete for your attention. getVāri disappears into your life — working silently, tracking constantly.
            </p>
          </div>

          {/* 3 Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-[#0b101d] border border-white/10 glass-card-hover space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <EyeOff className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">Screenless Design</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                No notification clutter or screen glares. Silent, ambient micro-haptic taps only alert you when action is genuinely required.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-[#0b101d] border border-white/10 glass-card-hover space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <BellOff className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">Automatic Background Tracking</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Continuously monitors your skin, sweat, and surroundings in the background — zero manual effort required.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-[#0b101d] border border-white/10 glass-card-hover space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">The Good Habit</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                An intelligent guardian on your wrist that operates in the background to help you build the Hydration Habit.
              </p>
            </motion.div>
          </div>

          {/* Interactive LED Light Ring & Haptic Vibration Signal Simulator */}
          <div className="mt-12">
            <LedVibrationSimulator />
          </div>
        </section>

        <hr className="border-white/10 my-8" />

        {/* SECTION 3: What getVari does — 3-Section Carousel */}
        <section id="what-it-does" className="py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-mono-tech uppercase tracking-wider">
              Core Intelligence
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
              What <span className="text-gradient-cyan">getVāri</span> does
            </h2>
          </div>

          {/* Carousel Navigation Tabs */}
          <div className="flex justify-center mb-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-2xl border border-white/10 overflow-x-auto">
              {CAROUSEL_TITLES.map((title, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-mono-tech font-bold transition-all whitespace-nowrap cursor-pointer ${
                    carouselIndex === idx
                      ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(56,189,248,0.5)]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>

          {/* Carousel Body Container */}
          <AnimatePresence mode="wait">
            {carouselIndex === 0 && (
              <motion.div
                key="slide0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="p-8 sm:p-10 rounded-3xl bg-[#0b1122] border border-cyan-500/25 glass-card shadow-2xl relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-mono-tech">
                      <span className="font-bold">SECTION 01</span>
                      <span>MULTISENSOR DEHYDRATION ALERT</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                      Multisensor Fusion Dehydration Detection
                    </h3>
                    <p className="text-gray-300 text-base leading-relaxed">
                      getVāri uses continuous multisensor telemetry — sampling sweat rate, ambient temperature, and HRV — to detect early fluid deficits before thirst signals occur.
                    </p>
                  </div>

                  {/* Floating App Interface Preview Card */}
                  <div className="lg:col-span-6 flex justify-center">
                    <motion.div
                      initial={{ y: 5 }}
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-full max-w-sm rounded-3xl bg-[#050811] border border-cyan-500/40 p-5 shadow-[0_0_40px_rgba(56,189,248,0.2)] space-y-4 relative"
                    >
                      {/* App Frame Header */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                          <span className="text-xs font-mono-tech font-bold text-white">getVāri App • Live</span>
                        </div>
                        <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          Pod Connected
                        </span>
                      </div>

                      {/* Realtime Telemetry Stats Grid */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                          <span className="text-[10px] font-mono-tech text-gray-400 block">Sweat Rate</span>
                          <span className="text-sm font-bold font-mono-tech text-cyan-300">3.42 μS</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                          <span className="text-[10px] font-mono-tech text-gray-400 block">Ambient Temperature</span>
                          <span className="text-sm font-bold font-mono-tech text-amber-300">24.5 °C</span>
                        </div>
                      </div>

                      {/* Mini Live Hydration Curve Preview */}
                      <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono-tech">
                          <span className="text-gray-300">Hydration Curve</span>
                          <span className="text-cyan-300 font-bold">Optimal Range</span>
                        </div>
                        <div className="h-12 w-full flex items-end gap-1">
                          {[40, 55, 30, 25, 35, 60, 45, 20, 18, 22].map((val, idx) => (
                            <div
                              key={idx}
                              className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-sm transition-all"
                              style={{ height: `${val}%` }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Status Footnote */}
                      <div className="flex items-center justify-between text-[10px] font-mono-tech text-gray-400 pt-1">
                        <span>Background Syncing</span>
                        <span className="text-cyan-400">Zero Manual Effort</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {carouselIndex === 1 && (
              <motion.div
                key="slide1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-mono-tech mb-2">
                    <span className="font-bold">SECTION 02</span>
                    <span>COGNITIVE DROP INDEX (CDI)</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    Cognitive Drop Index (CDI) Telemetry
                  </h3>
                </div>

                <WhoopGraphWidget />
              </motion.div>
            )}

            {carouselIndex === 2 && (
              <motion.div
                key="slide2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-mono-tech mb-2">
                    <span className="font-bold">SECTION 03</span>
                    <span>RECOMMENDED FLUID INTAKE</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    Target Daily Water Intake & Serving Portion
                  </h3>
                </div>

                <WaterIntakeProportionsWidget />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <hr className="border-white/10 my-8" />

        {/* SECTION 4: Worn daily. Noticed only when it matters. (2 images) */}
        <section id="lifestyle" className="py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-mono-tech uppercase tracking-wider">
              Seamless Ergonomics
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
              Worn daily. <span className="text-gradient-cyan">Noticed only when it matters.</span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              Engineered for professionals pushing deep work sessions and active individuals on campus.
            </p>
          </div>

          {/* 2 Lifestyle Image Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image 1: Professional wearing in front of a computer */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="rounded-2xl overflow-hidden bg-[#0b101e] border border-white/10 glass-card-hover group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src="/images/professional.jpg"
                  alt="Professional wearing getVāri at workstation computer setup"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b101e] via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold text-white font-display">
                  Sustained High-Cognition Office Focus
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Stays quietly tucked on your wrist during intensive programming, writing, or back-to-back strategy calls without distraction.
                </p>
              </div>
            </motion.div>

            {/* Image 2: Uploaded College students photo */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="rounded-2xl overflow-hidden bg-[#0b101e] border border-white/10 glass-card-hover group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src="/images/students.jpg"
                  alt="College students showing off getVāri on campus"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b101e] via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold text-white font-display">
                  Campus & Lifestyle Everyday Wear
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Sleek matte design statement for students, athletes, and biohackers looking for functional physical enhancement.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <hr className="border-white/10 my-8" />

        {/* SECTION 5: Experience hydration, redefined. (Final Waitlist Drop CTA) */}
        <section id="waitlist" className="py-16 sm:py-24">
          <div className="relative rounded-3xl bg-gradient-to-b from-[#0e1628] via-[#090e1c] to-[#070a11] border border-cyan-500/30 p-8 sm:p-12 overflow-hidden shadow-[0_0_80px_rgba(56,189,248,0.15)] glass-card">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono-tech uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Founders Edition Drop #01</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                Experience hydration, <span className="text-gradient-cyan">redefined.</span>
              </h2>

              <p className="text-lg text-gray-300 font-body leading-relaxed max-w-xl mx-auto">
                <strong className="text-white font-semibold">Be the first to know.</strong><br />
                getVāri is currently in final testing. Join the waitlist to secure priority access to our Founders Edition drop.
              </p>

              {/* Waitlist Box */}
              <div className="pt-4 max-w-lg mx-auto">
                <WaitlistForm variant="section" />
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#05080e] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-lg font-extrabold font-display text-white">
              get<span className="text-cyan-400">Vāri</span>
            </span>
            <span className="text-xs text-gray-400 font-mono-tech">
              © 2026 getVāri Technologies Private Limited. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-400 font-mono-tech">
            <button
              onClick={() => setLegalModalType('terms')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => setLegalModalType('privacy')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Waitlist Emails Viewer Modal */}
      <WaitlistAdminModal
        isOpen={showWaitlistAdmin}
        onClose={() => setShowWaitlistAdmin(false)}
      />

      {/* Initial Interactive Hydration Gate Check Popup (Seen once per session) */}
      <HydrationGateModal
        isOpen={showHydrationGate}
        onComplete={handleGateComplete}
      />

      {/* Terms of Service & Privacy Policy Modal */}
      <LegalModal
        isOpen={!!legalModalType}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
};
