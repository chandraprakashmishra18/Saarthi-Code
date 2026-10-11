import React from 'react';
import { ScreenType } from '../types';

interface TopNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  womensSafetyActive: boolean;
  onToggleSafety: () => void;
  onOpenSOS: () => void;
  hasActiveTrip: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentScreen,
  onNavigate,
  womensSafetyActive,
  onToggleSafety,
  onOpenSOS,
  hasActiveTrip
}) => {
  if (currentScreen === 'splash' || currentScreen === 'emotion-picker') {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 bg-[#070A12]/90 backdrop-blur-2xl border-b border-white/[0.08] px-4 sm:px-6 py-3 transition-colors shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div 
          onClick={() => onNavigate('discover')}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-brand-logo"
        >
          <div className="relative">
            <img 
              src="/saarthi-logo.png" 
              alt="Saarthi Brand Logo" 
              className="w-10 h-10 rounded-xl object-cover ring-1 ring-sky-400/40 shadow-lg shadow-sky-950/40 group-hover:scale-105 group-hover:ring-sky-300 transition-all duration-300"
            />
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-sky-500/30 to-amber-500/30 blur-xs -z-10 group-hover:opacity-100 opacity-60 transition" />
          </div>
          <div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-wider text-white leading-none block">
              SAARTHI
            </span>
            <span className="font-mono text-[8.5px] sm:text-[9px] tracking-[0.2em] text-sky-400 uppercase font-semibold block mt-0.5">
              Explore Like Never Before
            </span>
          </div>
        </div>

        {/* Quick Nav Links for Desktop */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] p-1.5 rounded-2xl backdrop-blur-md">
          <button
            id="nav-link-discover"
            onClick={() => onNavigate('discover')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              currentScreen === 'discover' || currentScreen === 'story-detail'
                ? 'bg-gradient-to-r from-amber-500/20 to-sky-500/10 text-white border border-amber-400/40 font-bold shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            Stories
          </button>

          <button
            id="nav-link-guides"
            onClick={() => onNavigate('guides')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              currentScreen === 'guides'
                ? 'bg-gradient-to-r from-amber-500/20 to-sky-500/10 text-white border border-amber-400/40 font-bold shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            Guides
          </button>

          <button
            id="nav-link-reels"
            onClick={() => onNavigate('guide-reels')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
              currentScreen === 'guide-reels'
                ? 'bg-gradient-to-r from-amber-500/20 to-sky-500/10 text-white border border-amber-400/40 font-bold shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-amber-400">play_circle</span>
            <span>Reels</span>
          </button>

          <button
            id="nav-link-collections"
            onClick={() => onNavigate('collections')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              currentScreen === 'collections'
                ? 'bg-gradient-to-r from-amber-500/20 to-sky-500/10 text-white border border-amber-400/40 font-bold shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            Collections
          </button>

          <button
            id="nav-link-craft"
            onClick={() => onNavigate('craft-story')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              currentScreen === 'craft-story' || currentScreen === 'trip-summary'
                ? 'bg-gradient-to-r from-amber-500/20 to-sky-500/10 text-white border border-amber-400/40 font-bold shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            Plan Journey
          </button>

          <button
            id="nav-link-solo"
            onClick={() => onNavigate('solo-match')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
              currentScreen === 'solo-match'
                ? 'bg-gradient-to-r from-amber-500/20 to-sky-500/10 text-white border border-amber-400/40 font-bold shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px] text-emerald-400">group</span>
            <span>Solo Match</span>
          </button>
        </nav>

        {/* Right Status Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Trip Live Chip */}
          {hasActiveTrip && (
            <button
              id="btn-nav-active-trip"
              onClick={() => onNavigate('active-trip')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-950/70 border border-amber-400/50 text-amber-300 text-xs font-semibold shadow-md hover:bg-amber-900/80 transition cursor-pointer backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="hidden sm:inline">On Trip:</span> Chand Baori
            </button>
          )}

          {/* Women's Safety Mode Toggle */}
          <button
            id="btn-nav-safety-toggle"
            onClick={onToggleSafety}
            title="Toggle Verified Solo Women's Safety Filter"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer backdrop-blur-md ${
              womensSafetyActive
                ? 'bg-emerald-950/70 border-emerald-400/50 text-emerald-300 shadow-md shadow-emerald-950/40'
                : 'bg-white/[0.04] border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <span className={`material-symbols-outlined text-[16px] ${womensSafetyActive ? 'text-emerald-400' : 'text-slate-400'}`}>
              shield
            </span>
            <span className="hidden sm:inline">
              {womensSafetyActive ? 'Safety Mode ON' : 'Safety Mode'}
            </span>
          </button>

          {/* Emergency SOS Button */}
          <button
            id="btn-nav-sos"
            onClick={onOpenSOS}
            className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-950/50 border border-rose-500/60 transition active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">sos</span>
            <span className="hidden xs:inline">SOS</span>
          </button>

          {/* Story Creator CTA */}
          <button
            id="btn-nav-create-story"
            onClick={() => onNavigate('story-creator')}
            title="Publish Your Story"
            className="w-9 h-9 rounded-xl border border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.1] hover:border-amber-400/50 flex items-center justify-center text-amber-400 transition cursor-pointer shadow-xs backdrop-blur-md"
          >
            <span className="material-symbols-outlined text-[19px]">add_photo_alternate</span>
          </button>

          {/* User Profile Avatar */}
          <button
            id="btn-nav-profile"
            onClick={() => onNavigate('profile')}
            className={`relative rounded-full p-0.5 border-2 transition cursor-pointer ${
              currentScreen === 'profile' ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-white/20 hover:border-white/50'
            }`}
          >
            <img
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=150&q=80"
              alt="Aditi Deshmukh Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#070A12] rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
