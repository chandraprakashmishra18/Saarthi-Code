import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  hasActiveTrip: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate, hasActiveTrip }) => {
  if (currentScreen === 'splash' || currentScreen === 'emotion-picker') {
    return null;
  }

  const items = [
    { id: 'discover' as ScreenType, label: 'Stories', icon: 'auto_stories' },
    { id: 'guides' as ScreenType, label: 'Guides', icon: 'person_pin' },
    { id: 'guide-reels' as ScreenType, label: 'Reels', icon: 'play_circle' },
    { id: 'collections' as ScreenType, label: 'Curated', icon: 'library_books' },
    { id: 'solo-match' as ScreenType, label: 'Solo Match', icon: 'group' },
    { id: 'comic-journal' as ScreenType, label: 'Journal', icon: 'palette' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070A12]/95 backdrop-blur-2xl border-t border-white/[0.08] px-3 py-2 flex items-center justify-around shadow-2xl">
      {items.map(item => {
        const isActive = currentScreen === item.id || 
          (item.id === 'discover' && currentScreen === 'story-detail') ||
          (item.id === 'discover' && currentScreen === 'craft-story') ||
          (item.id === 'discover' && currentScreen === 'trip-summary');

        return (
          <button
            key={item.id}
            id={`bottom-nav-${item.id}`}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition cursor-pointer ${
              isActive 
                ? 'text-amber-300 bg-white/[0.08] border border-amber-400/30 font-bold shadow-xs' 
                : 'text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            <span className={`material-symbols-outlined text-[20px] ${isActive ? 'font-bold scale-105 text-amber-400' : ''}`}>
              {item.icon}
            </span>
            <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-semibold text-white' : 'font-medium text-slate-400'}`}>
              {item.label}
            </span>
          </button>
        );
      })}

      {hasActiveTrip && (
        <button
          id="bottom-nav-active-trip"
          onClick={() => onNavigate('active-trip')}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition cursor-pointer ${
            currentScreen === 'active-trip' 
              ? 'text-amber-300 font-bold bg-amber-950/70 border border-amber-400/40' 
              : 'text-amber-400 border border-transparent'
          }`}
        >
          <span className="relative">
            <span className="material-symbols-outlined text-[20px]">navigation</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
          </span>
          <span className="text-[10px] tracking-tight mt-0.5 font-semibold">Live Trip</span>
        </button>
      )}
    </nav>
  );
};
