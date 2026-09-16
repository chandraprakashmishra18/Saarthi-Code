import React, { useState, useEffect } from 'react';

interface SafetySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetySOSModal: React.FC<SafetySOSModalProps> = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [sosSent, setSosSent] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setSosSent(true);
      setCountdown(null);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  if (!isOpen) return null;

  const startSOSCountdown = () => {
    setCountdown(5);
    setSosSent(false);
  };

  const cancelSOS = () => {
    setCountdown(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-[#121212]/90 backdrop-blur-2xl rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-white/[0.1] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
          <div className="flex items-center gap-2 text-rose-500">
            <span className="material-symbols-outlined text-[26px]">health_and_safety</span>
            <h3 className="font-serif font-bold text-lg text-[#f5f5f5]">
              24/7 Safety Command Center
            </h3>
          </div>

          <button
            id="btn-close-sos"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-[#9499a1] hover:text-[#f5f5f5] text-xs cursor-pointer transition"
          >
            ✕
          </button>
        </div>

        {/* SOS Countdown or Activated Banner */}
        {countdown !== null ? (
          <div className="p-6 rounded-3xl bg-rose-700/90 backdrop-blur-xl text-white text-center mb-6 animate-pulse border border-rose-500/50 shadow-xl shadow-rose-900/40">
            <span className="text-xs uppercase tracking-widest block mb-1 font-semibold">
              Broadcasting Distress in
            </span>
            <div className="text-6xl font-serif font-bold my-2">{countdown}</div>
            <p className="text-xs text-rose-100 mb-4 font-light">
              Dispatching live GPS location to local authorities & emergency contact (+91 98765 43210).
            </p>
            <button
              onClick={cancelSOS}
              className="px-6 py-2.5 rounded-full bg-white text-rose-900 font-bold text-xs shadow-lg cursor-pointer hover:bg-rose-50 transition"
            >
              Cancel SOS Broadcast
            </button>
          </div>
        ) : sosSent ? (
          <div className="p-5 rounded-3xl bg-rose-950/70 backdrop-blur-xl border border-rose-500/40 text-rose-200 text-center mb-6 shadow-lg">
            <span className="material-symbols-outlined text-4xl text-rose-400 mb-1">warning</span>
            <h4 className="font-bold text-sm text-rose-300">SOS Broadcast Active</h4>
            <p className="text-xs mt-1 text-rose-200/80 font-light">
              Saarthi Emergency Team & Local Police station have received your coordinates. Stay near the safe haven.
            </p>
          </div>
        ) : (
          <div className="text-center mb-6">
            <button
              id="btn-trigger-sos-countdown"
              onClick={startSOSCountdown}
              className="w-28 h-28 mx-auto rounded-full bg-rose-600 hover:bg-rose-700 text-white flex flex-col items-center justify-center shadow-xl shadow-rose-600/40 active:scale-95 transition cursor-pointer mb-3"
            >
              <span className="material-symbols-outlined text-[36px]">sos</span>
              <span className="text-[11px] font-bold tracking-wider">TAP SOS</span>
            </button>
            <span className="text-xs text-[#9499a1] font-light">
              Press to activate immediate emergency escalation with live GPS track.
            </span>
          </div>
        )}

        {/* Emergency Helplines */}
        <div className="space-y-2 mb-6">
          <span className="text-[11px] font-bold text-[#9499a1] uppercase tracking-wider block">
            Direct One-Tap Helplines
          </span>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:112"
              className="p-3 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] text-left hover:border-white/20 transition block shadow-xs"
            >
              <span className="text-xs font-bold text-[#f5f5f5] block">112 National Police</span>
              <span className="text-[10px] text-[#9499a1] font-light">24/7 Emergency</span>
            </a>

            <a
              href="tel:1091"
              className="p-3 rounded-2xl bg-rose-950/30 backdrop-blur-xl border border-rose-500/30 text-left hover:border-rose-500/50 transition block shadow-xs"
            >
              <span className="text-xs font-bold text-rose-400 block">1091 Women Safety</span>
              <span className="text-[10px] text-rose-300/70 font-light">All India Helpline</span>
            </a>
          </div>
        </div>

        {/* Nearby Verified Safe Havens */}
        <div>
          <span className="text-[11px] font-bold text-[#9499a1] uppercase tracking-wider block mb-2">
            Verified Safe Havens Nearby
          </span>
          <div className="p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] text-xs flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-emerald-400 text-[20px]">store</span>
              <div>
                <span className="font-bold text-[#f5f5f5] block">Samode Haveli Cultural Desk</span>
                <span className="text-[10px] text-[#9499a1] font-light">24/7 Monitored Safe Sanctuary</span>
              </div>
            </div>
            <span className="font-bold text-[#d4af37] text-xs">150m</span>
          </div>
        </div>
      </div>
    </div>
  );
};
