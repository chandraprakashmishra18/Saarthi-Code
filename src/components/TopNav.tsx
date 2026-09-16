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
    <header className="sticky top-0 z-40 bg-[#FDFCF8]/90 backdrop-blur-xl border-b border-[rgba(28,28,30,0.08)] px-4 sm:px-6 py-3 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div 
          onClick={() => onNavigate('discover')}
          className="flex items-center gap-2.5 cursor-pointer group"
          id="nav-brand-logo"
        >
          <div className="w-8 h-8 rounded-md bg-[#1C1C1E] flex items-center justify-center text-white font-bold shadow-xs group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[18px]">auto_stories</span>
          </div>
          <div>
            <span className="font-serif font-semibold text-xl tracking-tight text-[#1C1C1E] leading-none block">
              SAARTHI
            </span>
            <span className="font-mono text-[9px] tracking-widest text-[#B39029] uppercase font-medium">
              Guided by Stories
            </span>
          </div>
        </div>

        {/* Quick Nav Links for Desktop */}
        <nav className="hidden md:flex items-center gap-1 bg-[#faf8f2] border border-[rgba(28,28,30,0.06)] p-1 rounded-md">
          <button
            id="nav-link-discover"
            onClick={() => onNavigate('discover')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition cursor-pointer ${
              currentScreen === 'discover' || currentScreen === 'story-detail'
                ? 'bg-white text-[#1C1C1E] border border-[rgba(28,28,30,0.1)] font-semibold shadow-2xs'
                : 'text-[rgba(28,28,30,0.6)] hover:text-[#1C1C1E] hover:bg-white/50'
            }`}
          >
            Stories
          </button>

          <button
            id="nav-link-guides"
            onClick={() => onNavigate('guides')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition cursor-pointer ${
              currentScreen === 'guides'
                ? 'bg-white text-[#1C1C1E] border border-[rgba(28,28,30,0.1)] font-semibold shadow-2xs'
                : 'text-[rgba(28,28,30,0.6)] hover:text-[#1C1C1E] hover:bg-white/50'
            }`}
          >
            Guides
          </button>

          <button
            id="nav-link-reels"
            onClick={() => onNavigate('guide-reels')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition cursor-pointer flex items-center gap-1 ${
              currentScreen === 'guide-reels'
                ? 'bg-white text-[#1C1C1E] border border-[rgba(28,28,30,0.1)] font-semibold shadow-2xs'
                : 'text-[rgba(28,28,30,0.6)] hover:text-[#1C1C1E] hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined text-[15px] text-[#B39029]">play_circle</span>
            Reels
          </button>

          <button
            id="nav-link-collections"
            onClick={() => onNavigate('collections')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition cursor-pointer ${
              currentScreen === 'collections'
                ? 'bg-white text-[#1C1C1E] border border-[rgba(28,28,30,0.1)] font-semibold shadow-2xs'
                : 'text-[rgba(28,28,30,0.6)] hover:text-[#1C1C1E] hover:bg-white/50'
            }`}
          >
            Collections
          </button>

          <button
            id="nav-link-craft"
            onClick={() => onNavigate('craft-story')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition cursor-pointer ${
              currentScreen === 'craft-story' || currentScreen === 'trip-summary'
                ? 'bg-white text-[#1C1C1E] border border-[rgba(28,28,30,0.1)] font-semibold shadow-2xs'
                : 'text-[rgba(28,28,30,0.6)] hover:text-[#1C1C1E] hover:bg-white/50'
            }`}
          >
            Plan Journey
          </button>

          <button
            id="nav-link-solo"
            onClick={() => onNavigate('solo-match')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition cursor-pointer flex items-center gap-1 ${
              currentScreen === 'solo-match'
                ? 'bg-white text-[#1C1C1E] border border-[rgba(28,28,30,0.1)] font-semibold shadow-2xs'
                : 'text-[rgba(28,28,30,0.6)] hover:text-[#1C1C1E] hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined text-[14px] text-emerald-600">group</span>
            Solo Match
          </button>
        </nav>

        {/* Right Status Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Trip Live Chip */}
          {hasActiveTrip && (
            <button
              id="btn-nav-active-trip"
              onClick={() => onNavigate('active-trip')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium shadow-2xs hover:bg-amber-100 transition cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="hidden sm:inline">On Trip:</span> Chand Baori
            </button>
          )}

          {/* Women's Safety Mode Toggle */}
          <button
            id="btn-nav-safety-toggle"
            onClick={onToggleSafety}
            title="Toggle Verified Solo Women's Safety Filter"
            className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded border text-xs font-medium transition cursor-pointer ${
              womensSafetyActive
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-2xs'
                : 'bg-white border-[rgba(28,28,30,0.08)] text-[rgba(28,28,30,0.6)] hover:text-[#1C1C1E]'
            }`}
          >
            <span className={`material-symbols-outlined text-[16px] ${womensSafetyActive ? 'text-emerald-600' : 'text-[rgba(28,28,30,0.6)]'}`}>
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
            className="px-3 py-1.5 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1 shadow-2xs border border-rose-700 transition active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">sos</span>
            <span className="hidden xs:inline">SOS</span>
          </button>

          {/* Story Creator CTA */}
          <button
            id="btn-nav-create-story"
            onClick={() => onNavigate('story-creator')}
            title="Publish Your Story"
            className="w-8 h-8 rounded border border-[rgba(28,28,30,0.1)] bg-white flex items-center justify-center text-[#B39029] hover:bg-[#faf8f2] transition cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
          </button>

          {/* User Profile Avatar */}
          <button
            id="btn-nav-profile"
            onClick={() => onNavigate('profile')}
            className={`relative rounded-full p-0.5 border-2 transition cursor-pointer ${
              currentScreen === 'profile' ? 'border-[#B39029]' : 'border-transparent hover:border-[rgba(28,28,30,0.2)]'
            }`}
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Elena Rostova Profile"
              className="w-7 h-7 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
