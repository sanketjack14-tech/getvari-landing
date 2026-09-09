import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplet, ShieldCheck, HeartPulse } from 'lucide-react';

interface HydrationGateModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const HydrationGateModal: React.FC<HydrationGateModalProps> = ({ isOpen, onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  if (!isOpen) return null;

  const handleYes = () => {
    try {
      sessionStorage.setItem('getvari_hydration_gate_seen', 'true');
    } catch (e) {
      console.error(e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onComplete();
  };

  const handleComplete = () => {
    try {
      sessionStorage.setItem('getvari_hydration_gate_seen', 'true');
    } catch (e) {
      console.error(e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onComplete();
  };

  const handleNoStep1 = () => {
    setStep(2);
  };

  const handleNoStep2 = () => {
    setStep(3);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#03060d]/90 backdrop-blur-2xl">
        {/* Liquid Glass Wave Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-[42%] bg-gradient-to-tr from-cyan-600 via-blue-500 to-teal-500 animate-spin [animation-duration:16s] blur-2xl" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-[38%] bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-500 animate-spin [animation-duration:22s] blur-2xl" />
        </div>

        {/* Futuristic Glass Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md rounded-3xl bg-[#090e1c]/90 border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_80px_rgba(56,189,248,0.25)] text-center overflow-hidden glass-card"
        >
          {/* Glass Icon Pod with Liquid Wave Ring */}
          <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 animate-ping [animation-duration:3s]" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0c1830] to-[#060c18] border border-cyan-400/50 p-3 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <img
                src="/images/logo_icon_transparent.png"
                alt="getVāri Icon"
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_#38bdf8]"
              />
            </div>
          </div>

          {/* Interactive Modal Content Steps */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-mono-tech uppercase tracking-wider">
                  <Droplet className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
                  <span>Daily Hydration Check</span>
                </div>

                <h3 className="text-2xl font-extrabold font-display text-white tracking-tight leading-snug">
                  Did you drink 18+ glasses of water yesterday?
                </h3>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleYes}
                    className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold font-display text-sm shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all cursor-pointer active:scale-95"
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleNoStep1}
                    className="py-3.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white font-bold font-display text-sm transition-all cursor-pointer active:scale-95"
                  >
                    No
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-mono-tech uppercase tracking-wider">
                  <HeartPulse className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>Daily Commitment</span>
                </div>

                <h3 className="text-2xl font-extrabold font-display text-white tracking-tight leading-snug">
                  I promise to drink 18+ glasses of water today
                </h3>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleYes}
                    className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold font-display text-sm shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all cursor-pointer active:scale-95"
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleNoStep2}
                    className="py-3.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white font-bold font-display text-sm transition-all cursor-pointer active:scale-95"
                  >
                    No
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-mono-tech uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>We've Got You Covered</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white tracking-tight leading-relaxed">
                  No Worries, <span className="text-gradient-cyan">getVāri</span> will help you build the hydration habit!
                </h3>

                <div className="pt-2">
                  <button
                    onClick={onComplete}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-black font-extrabold font-display text-sm shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all cursor-pointer active:scale-95"
                  >
                    OK
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
