import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { STORIES } from '../data/mockData';
import { StoryItem, EmotionCategory } from '../types';

interface StoryDiscoveryViewProps {
  selectedEmotions: EmotionCategory[];
  onOpenStory: (story: StoryItem) => void;
  onOpenGuides: () => void;
  onOpenCollections: () => void;
  onStartCraftStory: () => void;
  womensSafetyActive: boolean;
}

export const StoryDiscoveryView: React.FC<StoryDiscoveryViewProps> = ({
  selectedEmotions,
  onOpenStory,
  onOpenGuides,
  onOpenCollections,
  onStartCraftStory,
  womensSafetyActive
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Stories' },
    { id: 'historical', label: 'Historical' },
    { id: 'haunted', label: 'Haunted & Mysterious' },
    { id: 'nature', label: 'Living Nature' },
    { id: 'culinary', label: 'Culinary Legends' }
  ];

  const states = ['all', 'Rajasthan', 'Meghalaya', 'Kerala', 'Delhi'];

  // Filtered stories based on search, category, state, and selected emotions
  const filteredStories = useMemo(() => {
    return STORIES.filter(story => {
      // Search
      const matchesSearch = 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

      // Category
      const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory;

      // State
      const matchesState = selectedState === 'all' || story.state.toLowerCase() === selectedState.toLowerCase();

      return matchesSearch && matchesCategory && matchesState;
    });
  }, [searchQuery, selectedCategory, selectedState]);

  const featuredStory = STORIES[0]; // Chand Baori

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 pb-24 md:pb-16">
      {/* Featured Hero Banner */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 min-h-[400px] sm:min-h-[460px] flex flex-col justify-end p-6 sm:p-10 bg-[#0A0E1A]"
        >
          {/* Background Hero Image */}
          <img
            src={featuredStory.heroImage}
            alt={featuredStory.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070A12]/90 via-[#070A12]/40 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-2xl text-white">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md">
                Featured Journey
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/20">
                {featuredStory.location}
              </span>
              {womensSafetyActive && (
                <span className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-lg bg-emerald-950/70 border border-emerald-400/50 text-emerald-300 backdrop-blur-md flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[14px]">verified_user</span>
                  Verified Safe Solo
                </span>
              )}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-2.5 leading-tight drop-shadow-md">
              {featuredStory.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-200 line-clamp-2 sm:line-clamp-3 mb-6 max-w-xl font-normal leading-relaxed">
              {featuredStory.subtitle}
            </p>

            {/* Author Chip & CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15">
              <div className="flex items-center gap-3">
                <img
                  src={featuredStory.authorGuide.avatar}
                  alt={featuredStory.authorGuide.name}
                  className="w-11 h-11 rounded-2xl border-2 border-amber-400 object-cover shadow-md"
                />
                <div>
                  <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <span>By {featuredStory.authorGuide.name}</span>
                    <span className="material-symbols-outlined text-[16px] text-amber-400">verified</span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-300">
                    ★ {featuredStory.rating} ({featuredStory.reviewsCount} verified stories)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-300 block">Experience from</span>
                  <span className="text-xl font-serif font-bold text-amber-400">₹{featuredStory.price.toLocaleString('en-IN')}</span>
                </div>

                <button
                  id="btn-hero-explore"
                  onClick={() => onOpenStory(featuredStory)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-amber-950/50 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Narrative</span>
                  <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        {/* Active Emotions Pill Bar */}
        {selectedEmotions.length > 0 && (
          <div className="mb-6 flex items-center gap-2.5 flex-wrap bg-[#0F172A]/70 backdrop-blur-xl p-3.5 rounded-2xl border border-white/10 shadow-lg">
            <span className="font-mono text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-amber-400">psychology</span>
              Curated For:
            </span>
            {selectedEmotions.map(emotion => (
              <span
                key={emotion}
                className="font-mono text-xs px-3 py-1 rounded-xl bg-amber-400/15 text-amber-300 border border-amber-400/30 font-semibold"
              >
                #{emotion}
              </span>
            ))}
            <span className="font-mono text-[11px] text-slate-400 ml-auto hidden sm:inline uppercase">
              Stories tuned to your resonance
            </span>
          </div>
        )}

        {/* Search & Filter Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              search
            </span>
            <input
              id="input-story-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stepwells, royal curses, root bridges..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0F172A] border border-white/15 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 shadow-md transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* State Filter & Plan Story CTA */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            <select
              id="select-state-filter"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              aria-label="Filter stories by state or region"
              className="px-3.5 py-2.5 rounded-xl bg-[#0F172A] border border-white/15 text-xs font-semibold text-white focus:outline-none focus:border-sky-400 cursor-pointer shadow-md"
            >
              <option value="all">All States & Regions</option>
              <option value="Rajasthan">Rajasthan (Deserts & Forts)</option>
              <option value="Meghalaya">Meghalaya (Rainforests)</option>
              <option value="Kerala">Kerala (Backwaters)</option>
              <option value="Delhi">Delhi (Mughal Alleys)</option>
            </select>

            <button
              id="btn-plan-custom-story"
              onClick={onStartCraftStory}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-blue-950/50 whitespace-nowrap cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[17px]">edit_calendar</span>
              <span>Craft Itinerary</span>
            </button>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              id={`filter-cat-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-amber-500/25 to-sky-500/15 text-white border border-amber-400/50 font-bold shadow-md'
                  : 'bg-[#0F172A]/70 text-slate-300 border border-white/10 hover:text-white hover:border-white/25 hover:bg-[#131E35]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Story Bento Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              id={`story-card-${story.id}`}
              onClick={() => onOpenStory(story)}
              className="group bg-[#0F172A]/85 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-950">
                <img
                  src={story.heroImage}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/30" />

                {/* Badges on Image */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="font-mono px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {story.state}
                  </span>
                  {story.emotionTags.map(tag => (
                    <span 
                      key={tag} 
                      className="font-mono px-2 py-0.5 rounded-md text-[10px] bg-black/70 backdrop-blur-md text-amber-300 border border-amber-400/40 font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1 font-semibold font-mono text-[11px]">
                    <span className="material-symbols-outlined text-[16px] text-amber-400">star</span>
                    <span>{story.rating}</span>
                    <span className="text-slate-300">({story.reviewsCount})</span>
                  </div>
                  <span className="font-mono px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] border border-white/20 text-slate-200">
                    {story.duration}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-xl text-white leading-snug group-hover:text-amber-300 transition-colors mb-2">
                    {story.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4 font-normal">
                    {story.subtitle}
                  </p>
                </div>

                {/* Footer Guide info & Price */}
                <div className="pt-3.5 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={story.authorGuide.avatar}
                      alt={story.authorGuide.name}
                      className="w-8 h-8 rounded-full object-cover border border-amber-400/60"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-white block leading-tight">
                        {story.authorGuide.name}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        {story.authorGuide.badge}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 block leading-none mb-0.5">Story from</span>
                    <span className="text-base sm:text-lg font-serif font-bold text-amber-400">
                      ₹{story.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Story Collections Banner CTA */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#131E35] to-[#0F172A] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1 bg-amber-500/15 border border-amber-400/30 text-amber-300 rounded-lg font-semibold inline-block mb-3">
              Editor’s Anthology
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
              Curated Thematic Story Collections
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Explore journeys grouped by theme: Monsoon Magic in Kerala, 400 Years of Old Delhi Food Lore, and Sacred Living Root Trails.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="btn-banner-view-collections"
              onClick={onOpenCollections}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs sm:text-sm font-bold transition shadow-lg shadow-amber-950/50 cursor-pointer"
            >
              Browse Collections
            </button>
            <button
              id="btn-banner-view-guides"
              onClick={onOpenGuides}
              className="px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 text-xs sm:text-sm font-semibold text-white hover:bg-white/[0.12] transition cursor-pointer"
            >
              Meet Storytellers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
