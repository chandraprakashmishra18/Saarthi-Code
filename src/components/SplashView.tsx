import React from 'react';
import { motion } from 'motion/react';

interface SplashViewProps {
  onContinue: (authMode: 'google' | 'phone' | 'guest') => void;
  onExploreDirectly: () => void;
}

export const SplashView: React.FC<SplashViewProps> = ({ onContinue, onExploreDirectly }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#FDFCF8] text-[#1C1C1E]">
      {/* Top Left Corner Nav Badge */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-20">
        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] px-3.5 py-1.5 bg-[#FDFCF8] border border-[rgba(28,28,30,0.12)] rounded text-[#B39029] font-medium flex items-center gap-1.5 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B39029] animate-pulse"></span>
          <span>Safe Solo Mode [01]</span>
        </div>
      </div>

      {/* Main Split Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1200px] min-h-[640px] sm:min-h-[720px] lg:h-[800px] grid grid-cols-1 lg:grid-cols-2 border border-[rgba(28,28,30,0.08)] bg-white shadow-[0_40px_100px_rgba(0,0,0,0.05)] rounded-2xl sm:rounded-none overflow-hidden relative"
      >
        {/* Left Side: Visual Story Showcase */}
        <div className="relative bg-[#111111] overflow-hidden border-b lg:border-b-0 lg:border-r border-[rgba(28,28,30,0.08)] min-h-[340px] sm:min-h-[420px] lg:min-h-full group">
          <img
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
            alt="Chand Baori Stepwell & Heritage"
            className="w-full h-full object-cover opacity-75 scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-white z-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] px-3 py-1 bg-transparent border border-white/30 text-white rounded mb-3 inline-block font-medium backdrop-blur-xs">
              Featured Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-medium leading-[1.15] text-white tracking-normal">
              Chand Baori: The Labyrinth of Rajasthan
            </h2>
            <p className="font-mono text-[10px] text-white/70 tracking-widest mt-2 uppercase">
              3,500 Steps • 13 Subterranean Tiers • Verified Oral Historians
            </p>
          </div>
        </div>

        {/* Right Side: UI & Authentication */}
        <div className="p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-center relative bg-white">
          <div className="max-w-[420px] mx-auto w-full">
            <h1 className="font-serif text-5xl sm:text-6xl font-semibold tracking-tight text-[#1C1C1E] leading-none mb-2">
              SAARTHI
            </h1>
            <p className="font-serif italic text-2xl sm:text-2xl text-[#B39029] mb-6">
              Guided by Stories
            </p>
            <p className="text-[15px] sm:text-base leading-relaxed text-[rgba(28,28,30,0.6)] mb-7 font-normal">
              Experience the living folklore, subterranean mysteries, and verified oral historians of India's vast cultural heritage.
            </p>

            {/* Social / Emotion Hashtags */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-8">
              {['Awed', 'Spooked', 'Enlightened', 'Adventurous'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs sm:text-sm text-[rgba(28,28,30,0.6)] underline underline-offset-4 hover:text-[#B39029] transition cursor-pointer"
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
                className="h-14 sm:h-15 rounded-md border border-[rgba(28,28,30,0.12)] bg-transparent text-[#1C1C1E] flex items-center justify-center gap-3.5 font-medium text-sm hover:bg-[#faf8f2] hover:border-[rgba(28,28,30,0.25)] transition duration-200 cursor-pointer shadow-2xs active:scale-[0.99]"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
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
                className="h-14 sm:h-15 rounded-md bg-[#1C1C1E] text-white flex items-center justify-center gap-3 font-semibold text-sm hover:bg-black transition duration-200 cursor-pointer shadow-sm active:scale-[0.99]"
              >
                <span className="material-symbols-outlined text-[20px]">phone_iphone</span>
                <span>Use Mobile Number</span>
              </button>

              <button
                id="btn-guest-explore"
                onClick={onExploreDirectly}
                className="self-center font-mono text-[11px] uppercase tracking-[0.12em] text-[#B39029] hover:text-[#8f711c] transition mt-2 flex items-center gap-1.5 cursor-pointer py-1"
              >
                <span>Explore as Guest</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            {/* Bottom Security Note */}
            <p className="mt-8 text-center text-[11px] leading-relaxed text-[rgba(28,28,30,0.5)] font-light">
              By continuing, you agree to Saarthi’s Cultural Heritage Code & Verified Safety Terms.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
