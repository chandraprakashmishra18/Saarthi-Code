import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StoryItem } from '../types';

interface StoryDetailViewProps {
  story: StoryItem;
  onBack: () => void;
  onBookStory: (story: StoryItem) => void;
  onOpenGuideProfile: (guideId: string) => void;
  womensSafetyActive: boolean;
}

export const StoryDetailView: React.FC<StoryDetailViewProps> = ({
  story,
  onBack,
  onBookStory,
  onOpenGuideProfile,
  womensSafetyActive
}) => {
  const [activeTab, setActiveTab] = useState<'story' | 'listing'>('story');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [activeSightModal, setActiveSightModal] = useState<number | null>(null);

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <div className="min-h-screen bg-transparent text-[#f5f5f5] pb-24 md:pb-16">
      {/* Top Floating Control Bar */}
      <div className="sticky top-14 z-30 bg-[#080808]/80 backdrop-blur-2xl border-b border-white/[0.08] px-4 sm:px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            id="btn-detail-back"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-medium text-[#9499a1] hover:text-[#d4af37] transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Stories</span>
          </button>

          {/* Story View vs Listing View Segmented Toggle */}
          <div className="flex items-center p-1 bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/[0.08]">
            <button
              id="tab-toggle-story"
              onClick={() => setActiveTab('story')}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'story'
                  ? 'bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/40 shadow-xs font-bold backdrop-blur-md'
                  : 'text-[#9499a1] hover:text-[#f5f5f5]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">auto_stories</span>
              <span>Story View</span>
            </button>

            <button
              id="tab-toggle-listing"
              onClick={() => setActiveTab('listing')}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'listing'
                  ? 'bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/40 shadow-xs font-bold backdrop-blur-md'
                  : 'text-[#9499a1] hover:text-[#f5f5f5]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">list_alt</span>
              <span>Listing View</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2.5">
            <span className="text-xs font-serif font-bold text-[#d4af37]">${story.price}</span>
            <button
              id="btn-quick-book"
              onClick={() => onBookStory(story)}
              className="px-4 py-1.5 rounded-xl bg-[#d4af37] text-[#080808] text-xs font-bold hover:bg-[#e5c158] transition cursor-pointer shadow-md shadow-[#d4af37]/20"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Hero Media Section */}
      <div className="relative w-full h-[360px] sm:h-[480px] overflow-hidden bg-zinc-950">
        <img
          src={story.heroImage}
          alt={story.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />

        {/* Hero Overlay Details */}
        <div className="absolute bottom-6 left-0 right-0 px-4 sm:px-8 max-w-4xl mx-auto text-white">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full bg-[#d4af37] text-[#080808] text-[11px] font-bold uppercase tracking-wider shadow-sm">
              {story.category}
            </span>
            <span className="px-3 py-0.5 rounded-full bg-white/10 backdrop-blur-xl text-white text-[11px] border border-white/15">
              {story.location}
            </span>
            {womensSafetyActive && (
              <span className="px-3 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-[11px] flex items-center gap-1 font-medium backdrop-blur-md">
                <span className="material-symbols-outlined text-[13px]">shield</span>
                Women's Safety Guarantee
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-[#f5f5f5] mb-2 leading-tight">
            {story.title}
          </h1>

          <p className="text-xs sm:text-sm text-[#d1d5db] line-clamp-2 max-w-2xl font-light">
            {story.subtitle}
          </p>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        {/* Storyteller Banner Bar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-xl flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <img
              src={story.authorGuide.avatar}
              alt={story.authorGuide.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#d4af37]"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-sm text-[#f5f5f5]">
                  {story.authorGuide.name}
                </span>
                <span className="material-symbols-outlined text-[16px] text-[#d4af37]">verified</span>
              </div>
              <span className="text-xs text-[#9499a1] block font-light">{story.authorGuide.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio narration preview button */}
            <button
              id="btn-play-narration"
              onClick={toggleAudio}
              className={`px-3.5 py-2 rounded-2xl text-xs font-medium flex items-center gap-1.5 border transition cursor-pointer backdrop-blur-md ${
                isPlayingAudio
                  ? 'bg-[#d4af37]/15 border-[#d4af37] text-[#d4af37] shadow-sm'
                  : 'bg-white/[0.04] border-white/[0.08] text-[#9499a1] hover:text-[#f5f5f5] hover:bg-white/[0.08]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isPlayingAudio ? 'pause_circle' : 'volume_up'}
              </span>
              <span>{isPlayingAudio ? 'Playing Narration' : 'Audio Preview (0:45)'}</span>
            </button>

            <button
              id="btn-view-guide-profile"
              onClick={() => onOpenGuideProfile('elias-thorne')}
              className="px-3.5 py-2 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-[#f5f5f5] hover:bg-white/[0.08] transition cursor-pointer backdrop-blur-md"
            >
              Guide Profile
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'story' ? (
            /* STORY VIEW TAB */
            <motion.div
              key="story-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {/* Drop Cap Narrative Section */}
              <section className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/[0.08] shadow-xl">
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-4">
                  The Oral Chronicle
                </span>

                <div className="text-base sm:text-lg text-[#f5f5f5] leading-relaxed font-serif">
                  <p className="mb-4">
                    <span className="float-left text-5xl sm:text-6xl font-bold font-serif text-[#d4af37] leading-none pr-3 pt-1">
                      {story.dropCapStory.dropLetter}
                    </span>
                    {story.dropCapStory.firstParagraph}
                  </p>
                  <p className="text-sm sm:text-base font-sans text-[#a1a1aa] leading-relaxed font-light">
                    {story.dropCapStory.secondParagraph}
                  </p>
                </div>

                {/* Editorial Quote Box */}
                <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#d4af37]/10 backdrop-blur-xl border-l-4 border-[#d4af37] text-[#f5f5f5]">
                  <p className="font-serif italic text-base sm:text-lg text-[#f5f5f5] leading-snug">
                    {story.dropCapStory.quote}
                  </p>
                  <span className="text-xs font-sans text-[#9499a1] mt-2 block font-light">
                    — Field Notes by {story.authorGuide.name}
                  </span>
                </div>
              </section>

              {/* What You Will See Photo Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5f5f5]">
                      What You Will Witness
                    </h3>
                    <p className="text-xs text-[#9499a1] font-light">
                      Visual milestones revealed in sequential depth
                    </p>
                  </div>
                  <span className="text-xs text-[#d4af37] font-medium">3 Curated Sights</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {story.sights.map((sight, idx) => (
                    <div
                      key={sight.title}
                      id={`sight-card-${idx}`}
                      onClick={() => setActiveSightModal(idx)}
                      className="group bg-white/[0.03] backdrop-blur-xl rounded-3xl overflow-hidden border border-white/[0.08] hover:border-[#d4af37]/60 transition shadow-md hover:shadow-xl cursor-pointer flex flex-col"
                    >
                      <div className="relative aspect-4/3 overflow-hidden">
                        <img
                          src={sight.image}
                          alt={sight.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                        />
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center text-xs border border-white/20">
                          <span className="material-symbols-outlined text-[15px]">zoom_in</span>
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <h4 className="font-serif font-bold text-sm text-[#f5f5f5] mb-1 group-hover:text-[#d4af37] transition-colors">
                          {sight.title}
                        </h4>
                        <p className="text-xs text-[#9499a1] leading-relaxed font-light">
                          {sight.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* The Narrative Journey Timeline */}
              <section className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-xl">
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5f5f5]">
                    The Narrative Sequence
                  </h3>
                  <p className="text-xs text-[#9499a1] font-light">
                    Every stop builds emotional and historical context
                  </p>
                </div>

                <div className="relative pl-6 sm:pl-8 border-l-2 border-white/[0.08] space-y-6">
                  {story.timeline.map((stop, idx) => (
                    <div key={stop.title} className="relative">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-8 h-8 rounded-full bg-[#1e1a12] border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37] shadow-sm">
                        <span className="material-symbols-outlined text-[16px]">
                          {stop.icon}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-bold text-[#d4af37] bg-[#d4af37]/15 border border-[#d4af37]/30 px-2 py-0.5 rounded-lg backdrop-blur-md">
                            {stop.time}
                          </span>
                          <h4 className="font-serif font-bold text-sm text-[#f5f5f5]">
                            {stop.title}
                          </h4>
                        </div>
                        <p className="text-xs text-[#9499a1] leading-relaxed font-light">
                          {stop.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          ) : (
            /* LISTING VIEW TAB */
            <motion.div
              key="listing-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Key Quick Facts Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] text-center shadow-md">
                  <span className="material-symbols-outlined text-[#d4af37] text-[24px] mb-1">schedule</span>
                  <span className="text-[11px] text-[#9499a1] block uppercase tracking-wider">Duration</span>
                  <span className="text-sm font-semibold text-[#f5f5f5]">{story.duration}</span>
                </div>

                <div className="p-4 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] text-center shadow-md">
                  <span className="material-symbols-outlined text-[#d4af37] text-[24px] mb-1">groups</span>
                  <span className="text-[11px] text-[#9499a1] block uppercase tracking-wider">Group Size</span>
                  <span className="text-sm font-semibold text-[#f5f5f5]">{story.groupSize}</span>
                </div>

                <div className="p-4 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] text-center shadow-md">
                  <span className="material-symbols-outlined text-[#d4af37] text-[24px] mb-1">translate</span>
                  <span className="text-[11px] text-[#9499a1] block uppercase tracking-wider">Languages</span>
                  <span className="text-sm font-semibold text-[#f5f5f5]">{story.languages.join(', ')}</span>
                </div>

                <div className="p-4 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] text-center shadow-md">
                  <span className="material-symbols-outlined text-[#d4af37] text-[24px] mb-1">payments</span>
                  <span className="text-[11px] text-[#9499a1] block uppercase tracking-wider">Price</span>
                  <span className="text-sm font-serif font-bold text-[#d4af37]">${story.price} / group</span>
                </div>
              </div>

              {/* What is Included Checklist */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-xl">
                <h3 className="text-lg font-serif font-bold text-[#f5f5f5] mb-4">
                  What’s Included in This Experience
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {story.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#d1d5db]">
                      <span className="material-symbols-outlined text-[18px] text-[#d4af37] shrink-0">
                        check_circle
                      </span>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guide Detailed Bio Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={story.authorGuide.avatar}
                      alt={story.authorGuide.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#d4af37] shadow-sm"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#f5f5f5]">
                        {story.authorGuide.name}
                      </h4>
                      <span className="text-xs text-[#9499a1] font-light">{story.authorGuide.title}</span>
                      <div className="flex items-center gap-1 text-xs text-[#d4af37] mt-0.5">
                        <span className="material-symbols-outlined text-[14px]">star</span>
                        <span>{story.authorGuide.rating} (Certified Master Guide)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenGuideProfile('elias-thorne')}
                    className="px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-[#f5f5f5] hover:bg-white/[0.08] transition backdrop-blur-md"
                  >
                    View All Stories by Elias
                  </button>
                </div>
                <p className="text-xs text-[#9499a1] leading-relaxed font-light">
                  Elias specializes in the architectural anthropology of the Thar desert. Each story is researched using original Persian and Sanskrit manuscripts with verified oral accounts from surrounding village elders.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Booking Sticky Action Bar */}
        <div className="mt-12 p-4 sm:p-6 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
          <div>
            <span className="text-xs text-[#9499a1] uppercase tracking-wider block font-light">
              Complete Cultural Immersion
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#d4af37]">
                ${story.price}
              </span>
              <span className="text-xs text-[#9499a1]">for private group up to 6</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id="btn-book-story-action"
              onClick={() => onBookStory(story)}
              className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#080808] font-bold text-sm flex items-center justify-center gap-2 transition active:scale-98 shadow-lg shadow-[#d4af37]/30 cursor-pointer"
            >
              <span>Book this Story</span>
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sight Modal Preview */}
      {activeSightModal !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setActiveSightModal(null)}
        >
          <div 
            className="bg-[#121212]/90 backdrop-blur-2xl border border-white/[0.1] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveSightModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-[#9499a1] hover:text-[#f5f5f5]"
            >
              ✕
            </button>
            <img
              src={story.sights[activeSightModal].image}
              alt={story.sights[activeSightModal].title}
              className="w-full h-64 object-cover rounded-2xl mb-4"
            />
            <h3 className="font-serif font-bold text-xl text-[#f5f5f5] mb-2">
              {story.sights[activeSightModal].title}
            </h3>
            <p className="text-sm text-[#9499a1] leading-relaxed font-light">
              {story.sights[activeSightModal].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
