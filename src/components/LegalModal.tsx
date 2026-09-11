import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, Lock, Globe, Scale, AlertCircle } from 'lucide-react';
import { useAutoTheme } from '../utils/useAutoTheme';

interface LegalModalProps {
  isOpen?: boolean;
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen = true, type, onClose }) => {
  const { theme } = useAutoTheme();
  if (!isOpen || !type) return null;

  const isLight = theme === 'light';

  return (
    <AnimatePresence>
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-colors ${
        isLight ? 'bg-slate-900/40 backdrop-blur-md' : 'bg-[#03060d]/90 backdrop-blur-xl'
      }`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-3xl max-h-[85vh] rounded-3xl p-6 sm:p-8 flex flex-col overflow-hidden transition-all ${
            isLight
              ? 'bg-white border border-slate-200 text-slate-900 shadow-2xl'
              : 'bg-[#090e1c] border border-cyan-500/40 text-gray-200 glass-card shadow-[0_0_80px_rgba(56,189,248,0.2)]'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 p-2 rounded-full transition-colors cursor-pointer ${
              isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className={`flex items-center gap-3.5 pb-4 border-b shrink-0 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-600">
              {type === 'terms' ? <FileText className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
            </div>
            <div>
              <h3 className={`text-xl sm:text-2xl font-extrabold font-display tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
              </h3>
              <p className={`text-xs font-mono-tech mt-0.5 ${isLight ? 'text-cyan-600 font-bold' : 'text-cyan-300/80'}`}>
                getVāri Technologies Private Limited • Last updated September 2026
              </p>
            </div>
          </div>

          {/* Scrollable Modal Content */}
          <div className="flex-1 overflow-y-auto my-4 pr-2 text-xs sm:text-sm text-gray-300 font-body space-y-5 leading-relaxed selection:bg-cyan-500/30 selection:text-cyan-200">
            {type === 'terms' ? (
              <>
                <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-200 text-xs flex items-start gap-2.5">
                  <Scale className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    Please read these Terms of Service carefully before subscribing to the getVāri waitlist, accessing our website at <strong>getvari.in</strong>, or using our physiological hydration intelligence services.
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-bold font-display text-sm sm:text-base flex items-center gap-2">
                    1. Acceptance of Terms
                  </h4>
                  <p>
                    By accessing or using the services, landing pages, or priority waitlist forms operated by <strong>getVāri Technologies Private Limited</strong> ("getVāri", "Company", "we", "us", or "our"), you signify that you have read, understood, and agreed to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you must refrain from accessing or using our services.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-bold font-display text-sm sm:text-base">
                    2. Description of Services & Priority Waitlist Access
                  </h4>
                  <p>
                    getVāri Technologies Private Limited provides information regarding screenless biothermal hydration wearable devices, dynamic physiological models, digital hydration twins, and early access reservation channels ("Services"). Submitting your email to our waitlist registers your interest for priority notifications, early pre-order availability, and product release updates for Batch #01. Waitlist registration does not guarantee product delivery or constitute a binding purchase contract until a formal order is placed.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-bold font-display text-sm sm:text-base">
                    3. Non-Medical & Wellness Disclaimer
                  </h4>
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/20 text-amber-200/90 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      getVāri wearable telemetry and algorithmic insights are intended strictly for physical wellness, athletic endurance, and personal hydration habit optimization. They do not constitute clinical diagnostic tools or medical devices under regulatory definitions.
                    </span>
                  </div>
                  <p>
                    The insights generated by getVāri should not replace guidance from certified healthcare professionals. Always consult a physician or medical professional for diagnosis or treatment of any health condition.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-bold font-display text-sm sm:text-base">
                    4. Intellectual Property Rights
                  </h4>
                  <p>
                    All content, trademarks, service marks, trade names, logos, original graphics, interface designs, firmware architectures, and bio-telemetry algorithms associated with getVāri are the exclusive intellectual property of getVāri Technologies Private Limited. No material from our services may be copied, reproduced, modified, republished, uploaded, posted, transmitted, or distributed without our prior written authorization.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-bold font-display text-sm sm:text-base">
                    5. User Conduct & Acceptable Use
                  </h4>
                  <p>
                    You agree not to use false or disposable email addresses to manipulate waitlist positions, attempt unauthorized access to our APIs or servers, launch denial-of-service attacks, reverse-engineer hardware telemetry streams, or use automated scrapers on our services.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-bold font-display text-sm sm:text-base">
                    6. Limitation of Liability
                  </h4>
                  <p>
                    To the maximum extent permitted by applicable law, getVāri Technologies Private Limited, its directors, employees, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your access to, use of, or inability to access our services or waitlist system.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-bold font-display text-sm sm:text-base">
                    7. Governing Law & Dispute Resolution
                  </h4>
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of India. Any legal action or proceeding arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the courts located in Bengaluru, Karnataka, India.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-bold font-display text-sm sm:text-base">
                    8. Contact Information
                  </h4>
                  <p>
                    For any questions regarding these Terms of Service, please reach out to us at <strong>legal@getvari.in</strong> or write to <em>getVāri Technologies Private Limited</em>.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-200 text-xs flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    At <strong>getVāri Technologies Private Limited</strong>, we take your privacy and data security seriously. This policy explains how we collect, protect, and handle your information.
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-bold font-display text-sm sm:text-base">
                    1. Information We Collect
                  </h4>
                  <p>
                    We collect information to provide better services to our community. This includes:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    <li><strong>Waitlist Contact Data:</strong> Email address provided voluntarily when subscribing to early access updates.</li>
                    <li><strong>Technical & Usage Logs:</strong> IP address, browser type, device metadata, and timestamp gathered when interacting with our website.</li>
                    <li><strong>Biometric Telemetry (Wearable App Twin):</strong> On-device physiological telemetry (GSR sweat rate, ambient temperature, heart rate variability) processed locally for hydration risk feedback.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-bold font-display text-sm sm:text-base">
                    2. How We Use Your Information
                  </h4>
                  <p>
                    Your data is used strictly for the following purposes:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    <li>To manage your waitlist position and send priority notification updates regarding Batch #01 pre-orders.</li>
                    <li>To optimize web server response times and secure our API endpoints against spam or automated attacks.</li>
                    <li>To refine continuous biothermal hydration algorithms and user experience.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-bold font-display text-sm sm:text-base">
                    3. Zero Spam & Data Protection Guarantee
                  </h4>
                  <p>
                    We enforce a strict <strong>Zero Spam Policy</strong>. We will never sell, lease, trade, or rent your email address or biometric data to third-party marketing companies. Your contact details are stored securely using encrypted cloud database connections.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-bold font-display text-sm sm:text-base">
                    4. Cookies & Analytics
                  </h4>
                  <p>
                    We use minimal essential session indicators (such as <code>sessionStorage</code>) to remember your preferences (e.g. entry popup state) during your active browser session. We do not track you across external websites.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-bold font-display text-sm sm:text-base">
                    5. Compliance with DPDP Act & Data Rights
                  </h4>
                  <p>
                    In accordance with India's Digital Personal Data Protection (DPDP) Act, 2023 and applicable privacy framework laws, you hold full rights over your data. You may request:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    <li>Confirmation of what personal data we hold about you.</li>
                    <li>Correction or updating of your contact records.</li>
                    <li>Complete deletion ("Right to be Forgotten") of your waitlist record from our database.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-bold font-display text-sm sm:text-base">
                    6. Data Retention & Deletion Requests
                  </h4>
                  <p>
                    Waitlist email entries are retained until product launch fulfillment or until you request removal. To request permanent deletion of your data, send an email to <strong>privacy@getvari.in</strong> with the subject line <em>"Data Deletion Request"</em>.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-bold font-display text-sm sm:text-base">
                    7. Privacy Contact Officer
                  </h4>
                  <p>
                    If you have questions or concerns regarding our privacy practices, contact our Privacy Officer at <strong>privacy@getvari.in</strong> or write to <em>getVāri Technologies Private Limited</em>.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
            <span className="text-[11px] text-gray-400 font-mono-tech flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>getvari.in • Official Legal Document</span>
            </span>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold font-mono-tech text-xs tracking-wider transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
