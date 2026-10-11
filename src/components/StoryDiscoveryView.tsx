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
    <div className="min-h-screen bg-[#FDFCF8] text-[#1C1C1E] pb-24 md:pb-16">
      {/* Featured Hero Banner */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-xl overflow-hidden shadow-sm border border-[rgba(28,28,30,0.1)] min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-10 bg-white"
        >
          {/* Background Hero Image */}
          <img
            src={featuredStory.heroImage}
            alt={featuredStory.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-2xl text-white">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] px-3 py-1 rounded bg-[#B39029] text-white font-medium shadow-2xs">
                Featured Journey
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded bg-black/50 backdrop-blur-xs text-white border border-white/20">
                {featuredStory.location}
              </span>
              {womensSafetyActive && (
                <span className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded bg-emerald-950/60 border border-emerald-400/40 text-emerald-300 backdrop-blur-xs flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[13px]">verified_user</span>
                  Verified Safe Solo
                </span>
              )}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-white tracking-tight mb-2 leading-tight">
              {featuredStory.title}
            </h2>

            <p className="text-xs sm:text-sm text-white/80 line-clamp-2 sm:line-clamp-3 mb-6 max-w-xl font-light leading-relaxed">
              {featuredStory.subtitle}
            </p>

            {/* Author Chip & CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/20">
              <div className="flex items-center gap-3">
                <img
                  src={featuredStory.authorGuide.avatar}
                  alt={featuredStory.authorGuide.name}
                  className="w-10 h-10 rounded-full border border-[#B39029] object-cover"
                />
                <div>
                  <div className="text-xs font-medium text-white flex items-center gap-1">
                    <span>By {featuredStory.authorGuide.name}</span>
                    <span className="material-symbols-outlined text-[14px] text-[#B39029]">verified</span>
                  </div>
                  <div className="font-mono text-[10px] text-white/70">
                    ★ {featuredStory.rating} ({featuredStory.reviewsCount} verified stories)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/70 block">Experience from</span>
                  <span className="text-lg font-serif font-semibold text-[#B39029]">₹{featuredStory.price.toLocaleString('en-IN')}</span>
                </div>

                <button
                  id="btn-hero-explore"
                  onClick={() => onOpenStory(featuredStory)}
                  className="px-6 py-3 rounded bg-white text-[#1C1C1E] font-semibold text-xs sm:text-sm hover:bg-[#faf8f2] transition shadow-xs active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Narrative</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
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
          <div className="mb-6 flex items-center gap-2 flex-wrap bg-white p-3.5 rounded-lg border border-[rgba(28,28,30,0.08)] shadow-2xs">
            <span className="font-mono text-[10px] font-semibold text-[rgba(28,28,30,0.6)] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#B39029]">psychology</span>
              Curated For:
            </span>
            {selectedEmotions.map(emotion => (
              <span
                key={emotion}
                className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-[#faf8f2] text-[#B39029] border border-[rgba(28,28,30,0.1)] font-medium"
              >
                #{emotion}
              </span>
            ))}
            <span className="font-mono text-[10px] text-[rgba(28,28,30,0.5)] ml-auto hidden sm:inline uppercase">
              Stories tuned to your resonance
            </span>
          </div>
        )}

        {/* Search & Filter Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(28,28,30,0.4)] text-[20px]">
              search
            </span>
            <input
              id="input-story-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stepwells, royal curses, root bridges..."
              className="w-full pl-10 pr-4 py-2.5 rounded-md bg-white border border-[rgba(28,28,30,0.12)] text-sm text-[#1C1C1E] placeholder-[rgba(28,28,30,0.4)] focus:outline-none focus:border-[#B39029] shadow-2xs transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(28,28,30,0.4)] hover:text-[#1C1C1E] text-xs"
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
              className="px-3.5 py-2.5 rounded-md bg-white border border-[rgba(28,28,30,0.12)] text-xs font-medium text-[#1C1C1E] focus:outline-none focus:border-[#B39029] cursor-pointer shadow-2xs"
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
              className="px-4 py-2.5 rounded-md bg-[#1C1C1E] text-white text-xs font-semibold hover:bg-black transition flex items-center gap-1.5 shadow-2xs whitespace-nowrap cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">edit_calendar</span>
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
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1C1C1E] text-white shadow-2xs'
                  : 'bg-white text-[rgba(28,28,30,0.6)] border border-[rgba(28,28,30,0.08)] hover:text-[#1C1C1E] hover:border-[rgba(28,28,30,0.2)]'
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
              className="group bg-white rounded-xl overflow-hidden border border-[rgba(28,28,30,0.08)] hover:border-[#B39029] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-16/10 overflow-hidden bg-[#faf8f2]">
                <img
                  src={story.heroImage}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Badges on Image */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="font-mono px-2 py-0.5 rounded text-[10px] font-medium bg-black/60 backdrop-blur-xs text-white border border-white/20">
                    {story.state}
                  </span>
                  {story.emotionTags.map(tag => (
                    <span 
                      key={tag} 
                      className="font-mono px-2 py-0.5 rounded text-[10px] bg-black/60 backdrop-blur-xs text-[#B39029] border border-[#B39029]/50 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1 font-medium font-mono text-[11px]">
                    <span className="material-symbols-outlined text-[15px] text-[#B39029]">star</span>
                    <span>{story.rating}</span>
                    <span className="text-white/70">({story.reviewsCount})</span>
                  </div>
                  <span className="font-mono px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs text-[10px] border border-white/20">
                    {story.duration}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-semibold text-xl text-[#1C1C1E] leading-snug group-hover:text-[#B39029] transition-colors mb-1.5">
                    {story.title}
                  </h3>
                  <p className="text-xs text-[rgba(28,28,30,0.65)] line-clamp-2 leading-relaxed mb-4 font-normal">
                    {story.subtitle}
                  </p>
                </div>

                {/* Footer Guide info & Price */}
                <div className="pt-3 border-t border-[rgba(28,28,30,0.06)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={story.authorGuide.avatar}
                      alt={story.authorGuide.name}
                      className="w-7 h-7 rounded-full object-cover border border-[rgba(28,28,30,0.12)]"
                    />
                    <div className="text-[11px]">
                      <span className="font-medium text-[#1C1C1E] block leading-none">
                        {story.authorGuide.name}
                      </span>
                      <span className="font-mono text-[9px] text-[rgba(28,28,30,0.5)]">
                        {story.authorGuide.badge}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[rgba(28,28,30,0.5)] block leading-none">Story from</span>
                    <span className="text-base font-serif font-semibold text-[#1C1C1E]">
                      ${story.price}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Story Collections Banner CTA */}
        <div className="mt-12 p-6 sm:p-8 rounded-xl bg-white border border-[rgba(28,28,30,0.08)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="max-w-xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] px-3 py-1 bg-[#FDFCF8] border border-[rgba(28,28,30,0.12)] text-[#B39029] rounded font-medium inline-block mb-3">
              Editor’s Anthology
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#1C1C1E] mb-2">
              Curated Thematic Story Collections
            </h3>
            <p className="text-xs sm:text-sm text-[rgba(28,28,30,0.65)] leading-relaxed font-normal">
              Explore journeys grouped by theme: Monsoon Magic in Kerala, 400 Years of Old Delhi Food Lore, and Sacred Living Root Trails.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="btn-banner-view-collections"
              onClick={onOpenCollections}
              className="px-5 py-2.5 rounded bg-[#1C1C1E] text-white text-xs sm:text-sm font-semibold hover:bg-black transition shadow-2xs cursor-pointer"
            >
              Browse Collections
            </button>
            <button
              id="btn-banner-view-guides"
              onClick={onOpenGuides}
              className="px-5 py-2.5 rounded bg-white border border-[rgba(28,28,30,0.12)] text-xs sm:text-sm font-medium text-[#1C1C1E] hover:bg-[#faf8f2] transition cursor-pointer"
            >
              Meet Storytellers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
