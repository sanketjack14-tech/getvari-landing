import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, RefreshCw, Mail, Calendar, ShieldCheck, Users } from 'lucide-react';

interface WaitlistEntry {
  email: string;
  timestamp: string;
  ip?: string;
}

interface WaitlistAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistAdminModal: React.FC<WaitlistAdminModalProps> = ({ isOpen, onClose }) => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWaitlist = async () => {
    setLoading(true);
    try {
      // 1. Fetch from server backend API
      const res = await fetch('/api/waitlist');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setEntries(data);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.error('Failed to fetch backend waitlist:', e);
    }

    // 2. Fallback to localStorage if server returns empty
    try {
      const stored = localStorage.getItem('getvari_waitlist');
      if (stored) {
        setEntries(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchWaitlist();
    }
  }, [isOpen]);

  const exportToCSV = () => {
    if (entries.length === 0) return;

    const headers = ['Email', 'Timestamp', 'IP Address'];
    const rows = entries.map(item => [
      `"${item.email}"`,
      `"${new Date(item.timestamp).toLocaleString()}"`,
      `"${item.ip || 'Local'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `getvari_waitlist_signups_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-[#090e1c] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl glass-card text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  Founders Waitlist Signups
                </h3>
                <span className="text-xs font-mono-tech text-gray-400">
                  Total Collected: <strong className="text-cyan-300 font-bold">{entries.length} Emails</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchWaitlist}
                disabled={loading}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition-all cursor-pointer"
                title="Refresh Signups"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={exportToCSV}
                disabled={entries.length === 0}
                className="px-3 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-300 font-mono-tech text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="max-h-96 overflow-y-auto rounded-xl border border-white/10 bg-black/40">
            {entries.length === 0 ? (
              <div className="p-12 text-center text-gray-400 font-mono-tech text-sm">
                No waitlist emails submitted yet. Submit an email on the landing page to test live capture!
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs font-mono-tech">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-gray-400 uppercase text-[10px]">
                    <th className="p-3">#</th>
                    <th className="p-3">Email Address</th>
                    <th className="p-3">Submitted At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-200">
                  {entries.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 text-gray-500">{idx + 1}</td>
                      <td className="p-3 font-bold text-cyan-300 flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.email}</span>
                      </td>
                      <td className="p-3 text-gray-400">
                        {new Date(item.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-tech text-gray-400">
            <span>Data synced to <code className="text-cyan-400">/waitlist.json</code></span>
            <span>Realtime Server Sync</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
