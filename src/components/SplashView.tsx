import React from 'react';
import { motion } from 'motion/react';

interface SplashViewProps {
  onContinue: (authMode: 'google' | 'phone' | 'guest') => void;
  onExploreDirectly: () => void;
}

export const SplashView: React.FC<SplashViewProps> = ({ onContinue, onExploreDirectly }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#070A12] text-slate-100">
      {/* Top Left Corner Nav Badge */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-20">
        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] px-3.5 py-1.5 bg-white/[0.05] border border-white/10 rounded-xl text-amber-300 font-semibold flex items-center gap-2 shadow-lg backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Verified Heritage Network [01]</span>
        </div>
      </div>

      {/* Main Split Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1240px] min-h-[640px] sm:min-h-[720px] lg:h-[820px] grid grid-cols-1 lg:grid-cols-2 border border-white/10 bg-[#0A0E1A]/90 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden relative"
      >
        {/* Left Side: Visual Story Showcase */}
        <div className="relative bg-[#05070D] overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 min-h-[340px] sm:min-h-[420px] lg:min-h-full group">
          <img
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
            alt="Chand Baori Stepwell & Heritage"
            className="w-full h-full object-cover opacity-80 scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070A12]/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-white z-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1 bg-amber-500/20 border border-amber-400/40 text-amber-300 rounded-lg mb-3 inline-block font-semibold backdrop-blur-md">
              Featured Expedition
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-[1.15] text-white tracking-tight drop-shadow-md">
              Chand Baori: The Labyrinth of Rajasthan
            </h2>
            <p className="font-mono text-[11px] text-sky-300 tracking-wider mt-2.5 uppercase font-medium">
              3,500 Steps • 13 Subterranean Tiers • Verified Oral Historians
            </p>
          </div>
        </div>

        {/* Right Side: UI & Authentication */}
        <div className="p-8 sm:p-12 lg:p-14 xl:p-16 flex flex-col justify-center relative bg-gradient-to-b from-[#0C1222] to-[#080C16]">
          <div className="max-w-[440px] mx-auto w-full">
            {/* Brand Logo & Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img
                  src="/saarthi-logo.png"
                  alt="Saarthi Official Logo"
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover ring-2 ring-sky-400/40 shadow-2xl shadow-sky-950/60"
                />
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-sky-500/30 to-amber-500/30 blur-sm -z-10" />
              </div>
              <div>
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-wide text-white leading-none">
                  SAARTHI
                </h1>
                <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-sky-400 uppercase font-bold mt-1.5">
                  Explore Like Never Before
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-slate-200 mb-6 font-normal">
              Experience living folklore, subterranean mysteries, and verified oral historians across India's vast cultural heritage.
            </p>

            {/* Social / Emotion Hashtags */}
            <div className="flex flex-wrap gap-2.5 mb-7">
              {['Awed', 'Spooked', 'Enlightened', 'Adventurous'].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-amber-300/90 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-xl hover:border-amber-400 hover:text-amber-300 transition cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Action Group */}
            <div className="flex flex-col gap-3.5">
              <button
                id="btn-google-login"
                onClick={() => onContinue('google')}
                className="h-14 rounded-2xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] text-white flex items-center justify-center gap-3.5 font-semibold text-sm hover:border-sky-400/50 transition duration-200 cursor-pointer shadow-lg active:scale-[0.99]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>

              <button
                id="btn-phone-login"
                onClick={() => onContinue('phone')}
                className="h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white flex items-center justify-center gap-3 font-bold text-sm transition duration-200 cursor-pointer shadow-xl shadow-blue-950/50 active:scale-[0.99]"
              >
                <span className="material-symbols-outlined text-[20px]">phone_iphone</span>
                <span>Use Mobile Number</span>
              </button>

              <button
                id="btn-guest-explore"
                onClick={onExploreDirectly}
                className="self-center font-mono text-xs uppercase tracking-[0.16em] text-amber-300 hover:text-amber-200 font-bold transition mt-2 flex items-center gap-2 cursor-pointer py-1.5 px-4 rounded-xl hover:bg-amber-400/10"
              >
                <span>Explore as Guest</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>

            {/* Bottom Security Note */}
            <p className="mt-8 text-center text-xs leading-relaxed text-slate-400 font-normal">
              By continuing, you agree to Saarthi’s Cultural Heritage Code & Verified Safety Terms.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
