import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SAMPLE_COMIC_JOURNAL } from '../data/mockData';
import { ComicJournal } from '../types';

interface ComicJournalViewProps {
  journal?: ComicJournal;
  onOpenProfile: () => void;
  onBackToDiscover: () => void;
}

export const ComicJournalView: React.FC<ComicJournalViewProps> = ({
  journal = SAMPLE_COMIC_JOURNAL,
  onOpenProfile,
  onBackToDiscover
}) => {
  const [personalNote, setPersonalNote] = useState(journal.personalNotes);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveNote = () => {
    setIsEditingNote(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-transparent text-[#f5f5f5] pb-24 md:pb-16 max-w-4xl mx-auto px-4 sm:px-6 pt-6">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <button
          id="btn-journal-back"
          onClick={onBackToDiscover}
          className="flex items-center gap-1 text-xs font-medium text-[#9499a1] hover:text-[#d4af37] transition cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Explore More Stories</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert('PDF Travelogue generated & saved!')}
            className="px-3.5 py-2 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] text-xs font-medium text-[#f5f5f5] hover:bg-white/[0.08] transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px] text-[#d4af37]">download</span>
            <span>Export Travelogue</span>
          </button>

          <button
            onClick={onOpenProfile}
            className="px-4 py-2 rounded-2xl bg-[#d4af37] text-[#080808] text-xs font-bold hover:bg-[#e5c158] transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#d4af37]/20 active:scale-98"
          >
            <span className="material-symbols-outlined text-[16px]">military_tech</span>
            <span>Badge Shelf</span>
          </button>
        </div>
      </div>

      {/* Journal Title Header */}
      <div className="text-center mb-10">
        <span className="px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold uppercase tracking-widest mb-2 inline-block backdrop-blur-md">
          AI Illustrated Comic Travelogue
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#f5f5f5] mb-2 tracking-tight">
          {journal.tripTitle}
        </h1>
        <p className="text-xs sm:text-sm text-[#9499a1] font-light">
          Recorded on {journal.date} • {journal.location} • Chronicler: <strong className="text-[#f5f5f5] font-medium">{journal.travelerName}</strong>
        </p>
      </div>

      {/* 4-Panel Comic Strip Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {journal.panels.map((panel, idx) => (
          <motion.div
            key={panel.panelNumber}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-5 border border-[#d4af37]/40 shadow-xl flex flex-col justify-between"
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.08]">
              <span className="font-serif font-bold text-xs uppercase tracking-wider text-[#d4af37]">
                {panel.title}
              </span>
              <span className="text-[10px] text-[#9499a1] font-mono">
                {panel.timeOfDay}
              </span>
            </div>

            {/* Panel Artwork */}
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-3 border border-white/[0.08]">
              <img
                src={panel.image}
                alt={panel.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Comic Speech Bubble */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/80 backdrop-blur-xl text-[#f5f5f5] p-3 rounded-2xl border border-[#d4af37]/40 shadow-md text-xs font-serif italic">
                <span className="font-bold font-sans text-[10px] uppercase text-[#d4af37] block not-italic">
                  {panel.speaker}:
                </span>
                “{panel.dialogue}”
              </div>
            </div>

            {/* Panel Caption */}
            <p className="text-xs text-[#9499a1] leading-relaxed pt-1 font-light">
              {panel.caption}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Badges Earned Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-xl mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">
              Tokens of Discovery
            </span>
            <h3 className="font-serif font-bold text-2xl text-[#f5f5f5]">
              Badges Unlocked on this Journey
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#d4af37] text-[#080808] text-xs font-bold shadow-sm">
            +3 New Badges
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {journal.badgesEarned.map(badge => (
            <div
              key={badge.id}
              className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-4 border border-white/[0.08] flex items-center gap-3 shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 text-[#d4af37] flex items-center justify-center shrink-0 border border-[#d4af37]/30 backdrop-blur-md">
                <span className="material-symbols-outlined text-[24px]">{badge.icon}</span>
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#f5f5f5]">
                  {badge.name}
                </h4>
                <span className="text-[10px] text-emerald-400 font-bold block">{badge.rarity}</span>
                <span className="text-[10px] text-[#9499a1] line-clamp-1 font-light">{badge.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Reflection & Guide Quote */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-xl space-y-6">
        {/* Guide Quote */}
        <div className="p-5 rounded-2xl bg-[#d4af37]/10 backdrop-blur-xl border-l-4 border-[#d4af37] text-[#f5f5f5]">
          <span className="text-xs uppercase tracking-wider text-[#d4af37] font-bold block mb-1">
            Storyteller’s Closing Blessing
          </span>
          <p className="font-serif italic text-sm text-[#f5f5f5]">
            {journal.guideQuote}
          </p>
        </div>

        {/* Personal Note */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-serif font-bold text-base text-[#f5f5f5]">
              Traveler’s Personal Reflection
            </h4>
            <button
              onClick={() => setIsEditingNote(!isEditingNote)}
              className="text-xs text-[#d4af37] font-medium hover:underline cursor-pointer"
            >
              {isEditingNote ? 'Cancel' : 'Edit Reflection'}
            </button>
          </div>

          {isEditingNote ? (
            <div className="space-y-2">
              <textarea
                value={personalNote}
                onChange={(e) => setPersonalNote(e.target.value)}
                rows={4}
                className="w-full p-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl text-xs text-[#f5f5f5] placeholder:text-[#9499a1] focus:outline-none focus:border-[#d4af37]"
              />
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 rounded-2xl bg-[#d4af37] text-[#080808] text-xs font-bold hover:bg-[#e5c158] cursor-pointer shadow-md shadow-[#d4af37]/20"
              >
                Save Reflection
              </button>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-[#9499a1] leading-relaxed font-light">
              {personalNote}
            </p>
          )}

          {savedSuccess && (
            <span className="text-xs text-emerald-400 font-medium mt-1 block">
              ✓ Saved to your personal chronicle archive!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
