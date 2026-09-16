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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDFCF8]/95 backdrop-blur-xl border-t border-[rgba(28,28,30,0.08)] px-3 py-2 flex items-center justify-around shadow-lg">
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
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded transition cursor-pointer ${
              isActive 
                ? 'text-[#1C1C1E] bg-[#faf8f2] border border-[rgba(28,28,30,0.1)] font-semibold' 
                : 'text-[rgba(28,28,30,0.6)] hover:text-[#1C1C1E] border border-transparent'
            }`}
          >
            <span className={`material-symbols-outlined text-[20px] ${isActive ? 'font-bold scale-105 text-[#B39029]' : ''}`}>
              {item.icon}
            </span>
            <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-semibold text-[#1C1C1E]' : 'font-normal'}`}>
              {item.label}
            </span>
          </button>
        );
      })}

      {hasActiveTrip && (
        <button
          id="bottom-nav-active-trip"
          onClick={() => onNavigate('active-trip')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded transition cursor-pointer ${
            currentScreen === 'active-trip' 
              ? 'text-amber-800 font-bold bg-amber-50 border border-amber-300' 
              : 'text-amber-700 border border-transparent'
          }`}
        >
          <span className="relative">
            <span className="material-symbols-outlined text-[20px]">navigation</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
          </span>
          <span className="text-[10px] tracking-tight mt-0.5">Live Trip</span>
        </button>
      )}
    </nav>
  );
};
