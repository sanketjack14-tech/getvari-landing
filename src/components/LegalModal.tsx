import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl max-h-[85vh] bg-[#0b101e] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 overflow-y-auto glass-card text-gray-200 space-y-4 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              {type === 'terms' ? <FileText className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">
                {type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
              </h3>
              <p className="text-xs text-gray-400 font-mono-tech">
                getVāri Technologies Pvt. Ltd. • Last updated September 2026
              </p>
            </div>
          </div>

          <hr className="border-white/10" />

          {/* Modal Content */}
          <div className="text-xs sm:text-sm text-gray-300 font-body space-y-4 leading-relaxed">
            {type === 'terms' ? (
              <>
                <p>
                  Welcome to <strong>getVāri Technologies Pvt. Ltd.</strong> By accessing or using our landing page, priority waitlist, or hardware telemetry services, you agree to be bound by these Terms of Service.
                </p>
                <h4 className="text-white font-bold font-display text-sm">1. Founders Access & Pre-Order Reservation</h4>
                <p>
                  Joining the getVāri priority waitlist grants you priority reservation for Batch #01 Founders Edition. Waitlist placement is non-transferable and subject to final manufacturing allocation.
                </p>
                <h4 className="text-white font-bold font-display text-sm">2. Physiological Telemetry Disclaimer</h4>
                <p>
                  getVāri is a lifestyle and hydration optimization wearable designed to assist with physical focus and fluid balance. It is not intended as a substitute for professional medical advice, diagnosis, or clinical treatment.
                </p>
                <h4 className="text-white font-bold font-display text-sm">3. Intellectual Property</h4>
                <p>
                  All proprietary biothermal algorithms, sensor fusion designs, logos, trademarks, and interface graphics are the exclusive property of getVāri Technologies Pvt. Ltd.
                </p>
              </>
            ) : (
              <>
                <p>
                  At <strong>getVāri Technologies Pvt. Ltd.</strong>, we prioritize your biometric privacy. This policy outlines how your information is handled.
                </p>
                <h4 className="text-white font-bold font-display text-sm">1. Email & Waitlist Data</h4>
                <p>
                  When you join our Founders Edition waitlist, your email is stored securely. We will never sell, rent, or spam your contact information. You will strictly receive drop notifications and engineering updates.
                </p>
                <h4 className="text-white font-bold font-display text-sm">2. Biometric & Sensor Privacy</h4>
                <p>
                  All skin fluid impedance, thermal rate, and heart rate variability telemetry processed by getVāri is encrypted end-to-end on device. On-wrist machine learning models compute insights locally.
                </p>
                <h4 className="text-white font-bold font-display text-sm">3. Contact Us</h4>
                <p>
                  For privacy queries or data deletion requests, contact privacy@getvari.com.
                </p>
              </>
            )}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono-tech text-xs tracking-wider transition-all"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
