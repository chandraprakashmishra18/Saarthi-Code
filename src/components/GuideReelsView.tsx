import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REELS, GUIDES } from '../data/mockData';
import { GuideProfile } from '../types';

interface GuideReelsViewProps {
  initialReelId?: string;
  onBookGuide: (guide: GuideProfile) => void;
  onBack: () => void;
}

export const GuideReelsView: React.FC<GuideReelsViewProps> = ({
  initialReelId,
  onBookGuide,
  onBack
}) => {
  const initialIndex = initialReelId ? REELS.findIndex(r => r.id === initialReelId) : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [isLiked, setIsLiked] = useState<{ [key: string]: boolean }>({});
  const [isSaved, setIsSaved] = useState<{ [key: string]: boolean }>({});
  const [isPlayingNarration, setIsPlayingNarration] = useState(true);

  const currentReel = REELS[currentIndex];
  const currentGuide = GUIDES.find(g => g.id === currentReel.guideId) || GUIDES[0];

  const handleToggleLike = () => {
    const reelId = currentReel.id;
    const currentlyLiked = !!isLiked[reelId];
    const baseLikes = likes[reelId] || currentReel.likes;

    setIsLiked({ ...isLiked, [reelId]: !currentlyLiked });
    setLikes({ ...likes, [reelId]: currentlyLiked ? baseLikes - 1 : baseLikes + 1 });
  };

  const handleToggleSave = () => {
    setIsSaved({ ...isSaved, [currentReel.id]: !isSaved[currentReel.id] });
  };

  const nextReel = () => {
    if (currentIndex < REELS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevReel = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(REELS.length - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080808] text-[#f5f5f5] flex flex-col justify-between overflow-hidden">
      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between max-w-md mx-auto w-full">
        <button
          id="btn-close-reel"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-2xl border border-white/[0.15] flex items-center justify-center text-[#f5f5f5] hover:bg-black/70 transition cursor-pointer shadow-lg"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Reel Indicators */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-2xl border border-white/[0.15] shadow-lg">
          {REELS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-6 bg-[#d4af37]' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>

        <button
          id="btn-toggle-sound"
          onClick={() => setIsPlayingNarration(!isPlayingNarration)}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-2xl border border-white/[0.15] flex items-center justify-center text-[#f5f5f5] hover:bg-black/70 transition cursor-pointer shadow-lg"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isPlayingNarration ? 'volume_up' : 'volume_off'}
          </span>
        </button>
      </div>

      {/* Main Vertical Reel Player */}
      <div className="relative w-full h-full max-w-md mx-auto flex flex-col justify-end overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentReel.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <img
              src={currentReel.image}
              alt={currentReel.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/95 via-black/40 to-black/50" />
          </motion.div>
        </AnimatePresence>

        {/* Right Interaction Column */}
        <div className="absolute right-4 bottom-28 z-20 flex flex-col items-center gap-5">
          {/* Guide Avatar Icon */}
          <div className="relative group cursor-pointer" onClick={() => onBookGuide(currentGuide)}>
            <img
              src={currentReel.guideAvatar}
              alt={currentReel.guideName}
              className="w-12 h-12 rounded-full border-2 border-[#d4af37] object-cover shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#d4af37] text-[#080808] flex items-center justify-center text-[11px] font-bold">
              +
            </div>
          </div>

          {/* Like Button */}
          <button
            id="btn-reel-like"
            onClick={handleToggleLike}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-125 ${
              isLiked[currentReel.id] ? 'bg-rose-600 text-white' : 'bg-black/60 border border-[#333333] text-white hover:bg-black/80'
            }`}>
              <span className="material-symbols-outlined text-[22px]">
                {isLiked[currentReel.id] ? 'favorite' : 'favorite_border'}
              </span>
            </div>
            <span className="text-[11px] font-medium text-white shadow-xs">
              {likes[currentReel.id] || currentReel.likes}
            </span>
          </button>

          {/* Bookmark Button */}
          <button
            id="btn-reel-save"
            onClick={handleToggleSave}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition ${
              isSaved[currentReel.id] ? 'bg-[#d4af37] text-[#080808]' : 'bg-black/60 border border-[#333333] text-white hover:bg-black/80'
            }`}>
              <span className="material-symbols-outlined text-[22px]">
                {isSaved[currentReel.id] ? 'bookmark' : 'bookmark_border'}
              </span>
            </div>
            <span className="text-[11px] font-medium text-white">Save</span>
          </button>

          {/* Share Button */}
          <button
            id="btn-reel-share"
            onClick={() => alert('Story Reel link copied to clipboard!')}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-black/60 border border-[#333333] backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition">
              <span className="material-symbols-outlined text-[20px]">share</span>
            </div>
            <span className="text-[11px] font-medium text-white">Share</span>
          </button>
        </div>

        {/* Bottom Content & Narration Quote */}
        <div className="relative z-20 p-5 pb-8">
          {/* Guide info chip */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-serif font-bold text-sm text-white">
              {currentReel.guideName}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-black/60 border border-[#333333] text-[10px] text-zinc-300">
              {currentReel.location}
            </span>
          </div>

          <h2 className="text-xl font-serif font-bold text-white mb-2 leading-snug">
            {currentReel.title}
          </h2>

          {/* Spoken Quote Card with Audio Pulse */}
          <div className="p-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-[#2e2e2e] mb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[16px] text-[#d4af37]">format_quote</span>
              <div className="flex items-center gap-1">
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    className="w-1 bg-[#d4af37] rounded-full animate-pulse"
                    style={{
                      height: `${12 + (i % 3) * 6}px`,
                      animationDelay: `${i * 0.15}s`
                    }}
                  />
                ))}
              </div>
              <span className="text-[10px] text-[#d4af37] font-medium ml-1">Live Audio Quote</span>
            </div>
            <p className="text-xs text-zinc-200 font-serif italic">
              {currentReel.quote}
            </p>
          </div>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {currentReel.tags.map(t => (
              <span key={t} className="text-xs text-zinc-300 font-medium">
                {t}
              </span>
            ))}
          </div>

          {/* CTA Row */}
          <div className="flex items-center gap-2">
            <button
              id="btn-reel-book-guide"
              onClick={() => onBookGuide(currentGuide)}
              className="flex-1 py-3 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#080808] font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/30 transition cursor-pointer"
            >
              <span>Book with {currentReel.guideName}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Up / Down Reel Navigation Controls */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          <button
            onClick={prevReel}
            className="w-8 h-8 rounded-full bg-black/60 border border-[#333333] backdrop-blur-md flex items-center justify-center text-white hover:bg-black/90 transition cursor-pointer"
            title="Previous Reel"
          >
            ▲
          </button>
          <button
            onClick={nextReel}
            className="w-8 h-8 rounded-full bg-black/60 border border-[#333333] backdrop-blur-md flex items-center justify-center text-white hover:bg-black/90 transition cursor-pointer"
            title="Next Reel"
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  );
};
