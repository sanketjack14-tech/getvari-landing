import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const DEFAULT_SERMONS = [
  "Listen to the subtle whispers of your physiology before they become screams.",
  "Peak mental clarity requires proactive fluid balance, not reactive drinking.",
  "No screens, no noise, zero friction — intelligent telemetry that stays out of your way.",
  "getVāri continuously predicts cellular hydration levels using biothermal micro-signals.",
  "Join the quiet hydration revolution: Engineered for ultimate focus and physical recovery."
];

interface SermonBannerProps {
  customSermons?: string[];
}

export const SermonBanner: React.FC<SermonBannerProps> = ({ customSermons }) => {
  const sermons = (customSermons && customSermons.length > 0) ? customSermons : DEFAULT_SERMONS;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((idx) => (idx + 1) % sermons.length);
    }, 10000); // 10 seconds

    return () => clearInterval(timer);
  }, [sermons.length]);

  return (
    <div className="relative z-30 w-full bg-[#0b1120]/90 backdrop-blur-md border-b border-cyan-500/15 py-2.5 px-4 text-xs font-medium text-gray-300 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        {/* Center Text Slider */}
        <div className="flex-1 text-center min-w-0 relative h-5 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="truncate text-gray-200 font-body text-xs sm:text-sm font-medium tracking-wide max-w-4xl mx-auto"
            >
              {sermons[currentIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
