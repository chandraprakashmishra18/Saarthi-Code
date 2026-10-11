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
    <div className="min-h-screen bg-transparent text-slate-100 pb-24 md:pb-16">
      {/* Top Floating Control Bar */}
      <div className="sticky top-14 z-30 bg-[#070A12]/90 backdrop-blur-2xl border-b border-white/[0.08] px-4 sm:px-6 py-3 shadow-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            id="btn-detail-back"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-300 transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Stories</span>
          </button>

          {/* Story View vs Listing View Segmented Toggle */}
          <div className="flex items-center p-1 bg-white/[0.05] backdrop-blur-xl rounded-2xl border border-white/[0.1]">
            <button
              id="tab-toggle-story"
              onClick={() => setActiveTab('story')}
              className={`px-4 py-1.5 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'story'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-xs font-bold backdrop-blur-md'
                  : 'text-slate-300 hover:text-white font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">auto_stories</span>
              <span>Story View</span>
            </button>

            <button
              id="tab-toggle-listing"
              onClick={() => setActiveTab('listing')}
              className={`px-4 py-1.5 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'listing'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-xs font-bold backdrop-blur-md'
                  : 'text-slate-300 hover:text-white font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">list_alt</span>
              <span>Listing View</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="text-xs font-serif font-bold text-amber-400">₹{story.price.toLocaleString('en-IN')}</span>
            <button
              id="btn-quick-book"
              onClick={() => onBookStory(story)}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-bold transition cursor-pointer shadow-md shadow-amber-950/40"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Hero Media Section */}
      <div className="relative w-full h-[360px] sm:h-[480px] overflow-hidden bg-slate-950">
        <img
          src={story.heroImage}
          alt={story.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/50 to-transparent" />

        {/* Hero Overlay Details */}
        <div className="absolute bottom-6 left-0 right-0 px-4 sm:px-8 max-w-4xl mx-auto text-white">
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-md">
              {story.category}
            </span>
            <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-xl text-white text-xs border border-white/20 font-mono">
              {story.location}
            </span>
            {womensSafetyActive && (
              <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-400/50 text-emerald-300 text-xs flex items-center gap-1.5 font-semibold backdrop-blur-md">
                <span className="material-symbols-outlined text-[14px]">shield</span>
                Women's Safety Guarantee
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white mb-2 leading-tight drop-shadow-md">
            {story.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 max-w-2xl font-normal leading-relaxed">
            {story.subtitle}
          </p>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        {/* Storyteller Banner Bar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-[#0F172A]/80 backdrop-blur-2xl border border-white/10 shadow-xl flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3.5">
            <img
              src={story.authorGuide.avatar}
              alt={story.authorGuide.name}
              className="w-13 h-13 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-base text-white">
                  {story.authorGuide.name}
                </span>
                <span className="material-symbols-outlined text-[17px] text-amber-400">verified</span>
              </div>
              <span className="text-xs text-slate-300 block font-normal">{story.authorGuide.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio narration preview button */}
            <button
              id="btn-play-narration"
              onClick={toggleAudio}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition cursor-pointer backdrop-blur-md ${
                isPlayingAudio
                  ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-sm'
                  : 'bg-white/[0.05] border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.1]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isPlayingAudio ? 'pause_circle' : 'volume_up'}
              </span>
              <span>{isPlayingAudio ? 'Playing Narration' : 'Audio Preview (0:45)'}</span>
            </button>

            <button
              id="btn-view-guide-profile"
              onClick={() => onOpenGuideProfile(story.authorGuide.id || 'rudra-pratap')}
              className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-semibold text-white hover:bg-white/[0.1] transition cursor-pointer backdrop-blur-md"
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
              <section className="bg-[#0F172A]/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-white/10 shadow-xl">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-4">
                  The Oral Chronicle
                </span>

                <div className="text-base sm:text-lg text-slate-100 leading-relaxed font-serif">
                  <p className="mb-4">
                    <span className="float-left text-5xl sm:text-6xl font-bold font-serif text-amber-400 leading-none pr-3 pt-1">
                      {story.dropCapStory.dropLetter}
                    </span>
                    {story.dropCapStory.firstParagraph}
                  </p>
                  <p className="text-sm sm:text-base font-sans text-slate-200 leading-relaxed font-normal">
                    {story.dropCapStory.secondParagraph}
                  </p>
                </div>

                {/* Editorial Quote Box */}
                <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-amber-400/10 backdrop-blur-xl border-l-4 border-amber-400 text-white shadow-md">
                  <p className="font-serif italic text-base sm:text-lg text-white leading-snug">
                    "{story.dropCapStory.quote}"
                  </p>
                  <span className="text-xs font-sans text-amber-300 mt-2 block font-medium">
                    — Field Notes by {story.authorGuide.name}
                  </span>
                </div>
              </section>

              {/* What You Will See Photo Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                      What You Will Witness
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-normal">
                      Visual milestones revealed in sequential depth
                    </p>
                  </div>
                  <span className="text-xs text-amber-400 font-semibold bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-lg">3 Curated Sights</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {story.sights.map((sight, idx) => (
                    <div
                      key={sight.title}
                      id={`sight-card-${idx}`}
                      onClick={() => setActiveSightModal(idx)}
                      className="group bg-[#0F172A]/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/60 transition shadow-lg hover:shadow-2xl cursor-pointer flex flex-col"
                    >
                      <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
                        <img
                          src={sight.image}
                          alt={sight.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                        />
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center text-xs border border-white/20">
                          <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                        </div>
                      </div>
                      <div className="p-4.5 flex-1 flex flex-col justify-between">
                        <h4 className="font-serif font-bold text-base text-white mb-1.5 group-hover:text-amber-300 transition-colors">
                          {sight.title}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          {sight.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* The Narrative Journey Timeline */}
              <section className="bg-[#0F172A]/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    The Narrative Sequence
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-normal">
                    Every stop builds emotional and historical context
                  </p>
                </div>

                <div className="relative pl-6 sm:pl-8 border-l-2 border-white/15 space-y-7">
                  {story.timeline.map((stop) => (
                    <div key={stop.title} className="relative">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[33px] sm:-left-[41px] top-0 w-8 h-8 rounded-full bg-[#070A12] border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-md">
                        <span className="material-symbols-outlined text-[16px]">
                          {stop.icon}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[11px] font-bold text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2.5 py-0.5 rounded-lg backdrop-blur-md">
                            {stop.time}
                          </span>
                          <h4 className="font-serif font-bold text-sm sm:text-base text-white">
                            {stop.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
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
                <div className="p-4 rounded-3xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 text-center shadow-md">
                  <span className="material-symbols-outlined text-amber-400 text-[26px] mb-1">schedule</span>
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-medium">Duration</span>
                  <span className="text-sm font-semibold text-white">{story.duration}</span>
                </div>

                <div className="p-4 rounded-3xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 text-center shadow-md">
                  <span className="material-symbols-outlined text-amber-400 text-[26px] mb-1">groups</span>
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-medium">Group Size</span>
                  <span className="text-sm font-semibold text-white">{story.groupSize}</span>
                </div>

                <div className="p-4 rounded-3xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 text-center shadow-md">
                  <span className="material-symbols-outlined text-amber-400 text-[26px] mb-1">translate</span>
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-medium">Languages</span>
                  <span className="text-sm font-semibold text-white">{story.languages.join(', ')}</span>
                </div>

                <div className="p-4 rounded-3xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 text-center shadow-md">
                  <span className="material-symbols-outlined text-amber-400 text-[26px] mb-1">payments</span>
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-medium">Price</span>
                  <span className="text-sm font-serif font-bold text-amber-400">₹{story.price.toLocaleString('en-IN')} / group</span>
                </div>
              </div>

              {/* What is Included Checklist */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A]/80 backdrop-blur-2xl border border-white/10 shadow-xl">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-4">
                  What’s Included in This Experience
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {story.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <span className="material-symbols-outlined text-[19px] text-amber-400 shrink-0">
                        check_circle
                      </span>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guide Detailed Bio Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A]/80 backdrop-blur-2xl border border-white/10 shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={story.authorGuide.avatar}
                      alt={story.authorGuide.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-white">
                        {story.authorGuide.name}
                      </h4>
                      <span className="text-xs sm:text-sm text-slate-300 font-normal">{story.authorGuide.title}</span>
                      <div className="flex items-center gap-1 text-xs text-amber-400 mt-0.5 font-semibold">
                        <span className="material-symbols-outlined text-[15px]">star</span>
                        <span>{story.authorGuide.rating} (Certified Master Guide)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenGuideProfile(story.authorGuide.id || 'rudra-pratap')}
                    className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/15 text-xs font-semibold text-white hover:bg-white/[0.12] transition backdrop-blur-md cursor-pointer"
                  >
                    View All Stories by {story.authorGuide.name.split(' ')[0]}
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {story.authorGuide.bio || `${story.authorGuide.name} specializes in the cultural anthropology of ${story.location}. Each narrative is grounded in local oral folklore, ancestral traditions, and field research.`}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Booking Sticky Action Bar */}
        <div className="mt-12 p-5 sm:p-6 rounded-3xl bg-[#0F172A]/90 backdrop-blur-2xl border border-white/10 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
          <div>
            <span className="text-xs text-slate-300 uppercase tracking-wider block font-medium">
              Complete Cultural Immersion
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">
                ₹{story.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-300 font-normal">for private group up to 6</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id="btn-book-story-action"
              onClick={() => onBookStory(story)}
              className="flex-1 sm:flex-none px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition active:scale-98 shadow-xl shadow-amber-950/50 cursor-pointer"
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
            className="bg-[#0C1222]/95 backdrop-blur-2xl border border-white/15 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveSightModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center text-slate-300 hover:text-white"
            >
              ✕
            </button>
            <img
              src={story.sights[activeSightModal].image}
              alt={story.sights[activeSightModal].title}
              className="w-full h-64 object-cover rounded-2xl mb-4"
            />
            <h3 className="font-serif font-bold text-xl text-white mb-2">
              {story.sights[activeSightModal].title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {story.sights[activeSightModal].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
