import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radio, ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const LedVibrationSimulator: React.FC = () => {
  const [riskScore, setRiskScore] = useState<number>(65);

  // Status tiers based on requested score thresholds
  const isNoLight = riskScore < 50;
  const isBlueLight = riskScore >= 50 && riskScore <= 70;
  const isRedLight = riskScore > 70;

  return (
    <div className="w-full bg-[#090e1c] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 glass-card shadow-[0_0_50px_rgba(56,189,248,0.15)] relative overflow-hidden">
      {/* Background glow tint depending on state */}
      {isRedLight && (
        <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />
      )}
      {isBlueLight && (
        <div className="absolute inset-0 bg-cyan-500/5 animate-pulse pointer-events-none" />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Side: Product Showcase with Dynamic LED Color Overlay */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-md h-[280px] sm:h-[320px] rounded-2xl overflow-hidden bg-black/60 border border-white/10 p-4 flex items-center justify-center group shadow-2xl">
            {/* Dynamic Product Images with Smooth 700ms Crossfade */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="/images/product_transparent.png"
                alt="getVāri Screenless Wearable with Cyan LED Ring"
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
                  isRedLight ? 'opacity-0 pointer-events-none' : 'opacity-100'
                } ${!isNoLight ? 'scale-105' : 'scale-100'}`}
              />
              <img
                src="/images/product_red_transparent.png"
                alt="getVāri Screenless Wearable with Red LED Ring"
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
                  isRedLight ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } ${!isNoLight ? 'scale-105' : 'scale-100'}`}
              />
            </div>

            {/* Inside-Out Haptic & Light Waves when Red Light High Risk */}
            {isRedLight && (
              <>
                <div className="absolute w-44 h-44 rounded-full border border-red-500/80 shadow-[0_0_15px_#ef4444] pointer-events-none z-10 ring-pulse-wave-1" />
                <div className="absolute w-44 h-44 rounded-full border border-red-600/60 shadow-[0_0_10px_#ef4444] pointer-events-none z-10 ring-pulse-wave-2" />
              </>
            )}

            {/* Inside-Out Mild Blue Light Waves when Blue Light */}
            {isBlueLight && (
              <>
                <div className="absolute w-44 h-44 rounded-full border border-cyan-400/70 shadow-[0_0_12px_#38bdf8] pointer-events-none z-10 ring-pulse-wave-1" />
                <div className="absolute w-44 h-44 rounded-full border border-cyan-400/40 shadow-[0_0_8px_#38bdf8] pointer-events-none z-10 ring-pulse-wave-2" />
              </>
            )}

            {/* Top Status Tag */}
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono-tech flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${
                isRedLight ? 'bg-red-500 animate-ping' : isBlueLight ? 'bg-cyan-400 animate-pulse' : 'bg-gray-600'
              }`} />
              <span className="text-gray-200">
                {isRedLight ? 'RED LIGHT & HAPTICS' : isBlueLight ? 'BLUE LIGHT ALERT' : 'LED OFF (OPTIMAL)'}
              </span>
            </div>

            {/* Bottom Indicator Pill */}
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs font-mono-tech">
              <span className="text-gray-400">Pod Status:</span>
              <span className={`font-bold ${
                isRedLight ? 'text-red-400' : isBlueLight ? 'text-cyan-300' : 'text-emerald-400'
              }`}>
                {isRedLight ? '🔴 Red LED + Haptic Pulse' : isBlueLight ? '🔵 Blue LED Light Ring' : '🟢 Dormant (Risk < 50)'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Score Slider & Threshold Card */}
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-xs font-mono-tech uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Interactive Risk Simulator</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Screenless LED Light Ring Signals
          </h3>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Drag the slider to test how getVāri’s LED ring responds to your body's dehydration risk score in real time.
          </p>

          {/* Risk Score Interactive Slider */}
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <span className="text-gray-400">Hydration Risk Score:</span>
              <span className={`text-xl font-bold font-display ${
                isRedLight ? 'text-red-400' : isBlueLight ? 'text-cyan-300' : 'text-emerald-400'
              }`}>
                {riskScore} / 100
              </span>
            </div>

            <input
              type="range"
              min="10"
              max="95"
              value={riskScore}
              onChange={(e) => setRiskScore(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-gray-800 rounded-lg"
            />

            <div className="grid grid-cols-3 text-center text-[10px] font-mono-tech text-gray-400 pt-1">
              <div className={isNoLight ? 'text-emerald-400 font-bold' : ''}>
                &lt;50 (No Light)
              </div>
              <div className={isBlueLight ? 'text-cyan-300 font-bold' : ''}>
                51–70 (Blue Light)
              </div>
              <div className={isRedLight ? 'text-red-400 font-bold' : ''}>
                &gt;70 (Red Light + Haptic)
              </div>
            </div>
          </div>

          {/* Active State Detail Card */}
          <AnimatePresence mode="wait">
            {isRedLight && (
              <motion.div
                key="red"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-200 flex items-start gap-3"
              >
                <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-bounce" />
                <div>
                  <div className="font-bold text-white font-mono-tech uppercase text-[11px] mb-0.5">
                    High Dehydration Risk (&gt;70)
                  </div>
                  <p className="text-gray-300">
                    Red LED light ring flashes brightly and targeted haptic micro-vibrations pulse softly against your wrist.
                  </p>
                </div>
              </motion.div>
            )}

            {isBlueLight && (
              <motion.div
                key="blue"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-400/40 text-xs text-cyan-200 flex items-start gap-3"
              >
                <AlertTriangle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white font-mono-tech uppercase text-[11px] mb-0.5">
                    Mild Dehydration (51–70)
                  </div>
                  <p className="text-gray-300">
                    Blue LED light ring illuminates softly to prompt early fluid replenishment before focus degrades.
                  </p>
                </div>
              </motion.div>
            )}

            {isNoLight && (
              <motion.div
                key="none"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white font-mono-tech uppercase text-[11px] mb-0.5">
                    Optimal Hydration (&lt;50)
                  </div>
                  <p className="text-gray-400">
                    LED light ring remains completely OFF to eliminate distraction and preserve battery life.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
