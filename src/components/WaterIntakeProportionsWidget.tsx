import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Droplets, Sparkles, CheckCircle2, Zap, Scale } from 'lucide-react';

export const WaterIntakeProportionsWidget: React.FC = () => {
  const [weight, setWeight] = useState<number>(75);
  const [activity, setActivity] = useState<'sedentary' | 'active' | 'athlete'>('active');

  // Calculate target daily ml based on activity
  const activityMultiplier = activity === 'sedentary' ? 32 : activity === 'active' ? 40 : 48;
  const targetMl = Math.round(weight * activityMultiplier);

  // Suggested per-serving fluid proportion (e.g., 200ml - 250ml in one go)
  const singleServingMl = Math.round(weight * 2.8 + (activity === 'athlete' ? 40 : 20));
  const servingsPerDay = Math.round(targetMl / singleServingMl);

  return (
    <div className="w-full bg-[#0a0f1d] border border-cyan-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl glass-card relative overflow-hidden">
      {/* Top Header & Customizer */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Droplets className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono-tech text-cyan-400 uppercase tracking-wider font-bold">
              Personalized Fluid Intake Recommendation
            </span>
          </div>
          <h4 className="text-xl font-bold text-white font-display">
            Target Daily Intake & Serving Proportions
          </h4>
        </div>

        {/* Quick Parameter Controls */}
        <div className="flex items-center gap-3 bg-black/50 p-2 rounded-xl border border-white/10 text-xs">
          <div className="flex items-center gap-2 px-2">
            <span className="text-gray-400 font-mono-tech">Weight:</span>
            <span className="text-cyan-300 font-bold font-mono-tech">{weight}kg</span>
            <input
              type="range"
              min="50"
              max="110"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-20 accent-cyan-400 cursor-pointer"
            />
          </div>

          <div className="h-4 w-[1px] bg-white/10" />

          <div className="flex items-center gap-1">
            {(['sedentary', 'active', 'athlete'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setActivity(mode)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize transition-all ${
                  activity === mode
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main 2 Cards Grid: Daily Target + Single Serving Proportion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Target Daily Volume */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-blue-950/30 to-[#0b1222] border border-cyan-500/30 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono-tech text-gray-400">
            <span>TOTAL DAILY HYDRATION TARGET</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white font-display text-gradient-cyan">
              {targetMl.toLocaleString()}
            </span>
            <span className="text-sm font-bold text-cyan-300 font-mono-tech">mL / day</span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Calculated based on your body mass index ({weight}kg) and physical activity profile.
          </p>
        </div>

        {/* Card 2: Suggested Per-Serving Portion (In One Go) */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/40 via-purple-950/30 to-[#0b1222] border border-blue-500/30 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono-tech text-gray-400">
            <span>RECOMMENDED SERVING PORTION</span>
            <Droplets className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white font-display text-gradient-blue">
              {singleServingMl}
            </span>
            <span className="text-sm font-bold text-blue-300 font-mono-tech">mL in one go</span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Optimal fluid portion per drink to maximize gastric absorption efficiency without triggering bloating ({servingsPerDay} servings spread throughout the day).
          </p>
        </div>
      </div>
    </div>
  );
};
