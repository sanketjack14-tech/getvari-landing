import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Sparkles, Lock, Mail } from 'lucide-react';

interface WaitlistEntry {
  email: string;
  timestamp: string;
}

export const WaitlistForm: React.FC<{ variant?: 'hero' | 'section' }> = ({ variant = 'section' }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      try {
        const stored = localStorage.getItem('getvari_waitlist');
        const list: WaitlistEntry[] = stored ? JSON.parse(stored) : [];
        
        if (!list.some(item => item.email.toLowerCase() === email.toLowerCase())) {
          list.push({
            email,
            timestamp: new Date().toISOString()
          });
          localStorage.setItem('getvari_waitlist', JSON.stringify(list));
        }
      } catch (e) {
        console.error(e);
      }

      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-gradient-to-r from-cyan-950/80 via-blue-950/70 to-purple-950/80 border border-cyan-400/40 rounded-2xl p-6 text-center backdrop-blur-xl shadow-[0_0_50px_rgba(56,189,248,0.2)]"
      >
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-xl font-bold text-white font-display mb-1">
          You're on the Waitlist!
        </h4>
        <p className="text-sm text-cyan-200/90 font-body max-w-md mx-auto mb-4">
          Priority access reserved for <span className="font-mono-tech font-bold text-white">{email}</span>. We'll notify you as soon as the Founders drop opens.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for priority access"
              className="w-full pl-10 pr-4 py-3.5 bg-black/60 border border-white/15 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 rounded-xl text-white placeholder-gray-500 text-sm font-body transition-all outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold font-display text-sm tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Join Waitlist</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-400 font-mono-tech text-left">{error}</p>
        )}

        {/* Aligned guarantee note under input */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-mono-tech pl-1 pt-0.5">
          <Lock className="w-3 h-3 text-cyan-400 shrink-0" />
          <span>Zero Spam. Early Drop Guarantee.</span>
        </div>
      </form>
    </div>
  );
};
