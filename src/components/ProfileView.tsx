import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BADGES, STORIES } from '../data/mockData';
import { BadgeItem, StoryItem } from '../types';

interface ProfileViewProps {
  onOpenStory: (story: StoryItem) => void;
  onOpenJournal: () => void;
  onBackToDiscover: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onOpenStory,
  onOpenJournal,
  onBackToDiscover
}) => {
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);
  const [activeTab, setActiveTab] = useState<'badges' | 'saved' | 'journeys'>('badges');

  return (
    <div className="min-h-screen bg-transparent text-slate-100 pb-24 md:pb-16 max-w-4xl mx-auto px-4 sm:px-6 pt-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          id="btn-profile-back"
          onClick={onBackToDiscover}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-300 transition cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Explore Stories</span>
        </button>

        <span className="text-xs uppercase font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-400/40 px-3.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md shadow-sm">
          <span className="material-symbols-outlined text-[15px]">verified</span>
          Level 3 Verified Traveler
        </span>
      </div>

      {/* User Header Profile Card */}
      <div className="bg-[#0F172A]/85 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80"
              alt="Aditi Deshmukh"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-amber-400/60 shadow-xl"
            />
            <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold shadow-md">
              Lvl 3
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight">
                Aditi Deshmukh
              </h1>
              <span className="material-symbols-outlined text-amber-400 text-[22px]">
                verified
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mb-4 font-normal">
              Solo Cultural Researcher & Architectural Sketcher • Based in Pune & Jaipur
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs">
              <div className="px-4 py-2 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Journeys</span>
                <span className="font-serif font-bold text-white text-sm">6 Completed</span>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Badges Earned</span>
                <span className="font-serif font-bold text-amber-400 text-sm">3 Unlocked</span>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Safety Rating</span>
                <span className="font-serif font-bold text-emerald-400 text-sm">5.0 / 5.0 (Vetted)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Profile Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8">
        {[
          { id: 'badges', label: 'Badge Shelf (3)', icon: 'military_tech' },
          { id: 'saved', label: 'Saved Stories (4)', icon: 'bookmark' },
          { id: 'journeys', label: 'Past Chronicles (2)', icon: 'auto_stories' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 backdrop-blur-md ${
              activeTab === t.id
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-950/40 font-bold'
                : 'text-slate-300 bg-[#0F172A]/80 border border-white/10 hover:bg-white/[0.08] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Badge Shelf */}
      {activeTab === 'badges' && (
        <div>
          <div className="mb-4">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
              Heritage Badge Shelf
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              Tokens awarded by master storytellers for cultural milestones and ethical exploration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BADGES.map(b => (
              <div
                key={b.id}
                onClick={() => setSelectedBadge(b)}
                className={`p-5 rounded-3xl border transition cursor-pointer flex flex-col justify-between backdrop-blur-2xl ${
                  b.isUnlocked
                    ? 'bg-[#0F172A]/85 border-white/10 hover:border-amber-400/50 shadow-xl'
                    : 'bg-white/[0.02] border-dashed border-white/10 opacity-55'
                }`}
              >
                <div className="flex items-start justify-between mb-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md ${
                    b.isUnlocked ? 'bg-amber-400/15 border border-amber-400/40 text-amber-400' : 'bg-white/[0.04] text-slate-400'
                  }`}>
                    <span className="material-symbols-outlined text-[26px]">{b.icon}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-lg ${
                    b.isUnlocked ? 'bg-emerald-950/80 border border-emerald-400/40 text-emerald-300' : 'bg-white/[0.05] text-slate-400'
                  }`}>
                    {b.isUnlocked ? b.rarity : 'LOCKED'}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-base text-white mb-1">
                    {b.name}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2 font-normal">
                    {b.description}
                  </p>
                  {b.unlockedAt && (
                    <span className="text-[10px] text-amber-300 font-semibold block">
                      {b.unlockedAt}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Saved Stories */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STORIES.slice(0, 4).map(s => (
            <div
              key={s.id}
              onClick={() => onOpenStory(s)}
              className="bg-[#0F172A]/85 backdrop-blur-2xl rounded-3xl p-4.5 border border-white/10 hover:border-amber-400/50 shadow-xl transition cursor-pointer flex gap-4"
            >
              <img
                src={s.heroImage}
                alt={s.title}
                className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-white/10"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-amber-300 font-bold block mb-1 uppercase tracking-wider">{s.location}</span>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-white line-clamp-2">
                    {s.title}
                  </h4>
                </div>
                <span className="text-sm font-serif font-bold text-amber-400">₹{s.price.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Past Journeys */}
      {activeTab === 'journeys' && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-[#0F172A]/85 backdrop-blur-2xl border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-amber-300 font-bold block mb-1 uppercase tracking-wider">October 14, 2025 • Abhaneri</span>
              <h4 className="font-serif font-bold text-lg sm:text-xl text-white">
                The Geometry of Silence: Chand Baori
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-normal mt-0.5">
                Master Storyteller: Rudra Pratap Singh Shekhawat • 3 Badges Unlocked
              </p>
            </div>

            <button
              onClick={onOpenJournal}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-950/40 active:scale-98"
            >
              <span className="material-symbols-outlined text-[18px]">palette</span>
              <span>View Illustrated Travelogue</span>
            </button>
          </div>
        </div>
      )}

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            className="bg-[#0C1222]/95 backdrop-blur-3xl border border-white/15 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-400/15 border border-amber-400/40 text-amber-400 mx-auto flex items-center justify-center mb-3.5 shadow-md">
              <span className="material-symbols-outlined text-3xl">{selectedBadge.icon}</span>
            </div>

            <h3 className="font-serif font-bold text-xl text-white mb-1">
              {selectedBadge.name}
            </h3>
            <span className="text-xs font-bold text-amber-300 block mb-3 uppercase tracking-wider">
              {selectedBadge.rarity} Badge • {selectedBadge.category}
            </span>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 font-normal">
              {selectedBadge.description}
            </p>

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 text-xs font-bold cursor-pointer transition shadow-lg shadow-amber-950/40"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
