import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GUIDES } from '../data/mockData';
import { GuideProfile } from '../types';

interface GuidesViewProps {
  onSelectGuideForTrip: (guide: GuideProfile) => void;
  onOpenReel: (reelId: string) => void;
  womensSafetyActive: boolean;
}

export const GuidesView: React.FC<GuidesViewProps> = ({
  onSelectGuideForTrip,
  onOpenReel,
  womensSafetyActive
}) => {
  const [searchGuide, setSearchGuide] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const filteredGuides = GUIDES.filter(guide => {
    const matchesSearch = 
      guide.name.toLowerCase().includes(searchGuide.toLowerCase()) ||
      guide.specialty.toLowerCase().includes(searchGuide.toLowerCase()) ||
      guide.location.toLowerCase().includes(searchGuide.toLowerCase());

    const matchesSpecialty = 
      selectedSpecialty === 'all' || 
      guide.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());

    const matchesSafety = !womensSafetyActive || guide.badges.some(b => b.toLowerCase().includes('women'));

    return matchesSearch && matchesSpecialty && matchesSafety;
  });

  return (
    <div className="min-h-screen bg-transparent text-slate-100 pb-24 md:pb-16 max-w-7xl mx-auto px-4 sm:px-6 pt-6">
      {/* Header */}
      <div className="mb-8">
        <span className="px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2.5 inline-block backdrop-blur-md">
          Oral Historians & Guild Elders
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white mb-2.5">
          Verified Local Storytellers
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
          Connect with vetted local anthropologists, botanical elders, and multi-generational storytellers who turn landscapes into living chronicles.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full sm:max-w-xs">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
            search
          </span>
          <input
            id="input-guide-search"
            type="text"
            value={searchGuide}
            onChange={(e) => setSearchGuide(e.target.value)}
            placeholder="Search guide name, fortress, botany..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#0F172A] border border-white/15 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-400 shadow-md transition"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {['all', 'Medieval', 'Rainforest', 'Culinary'].map(spec => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer backdrop-blur-md ${
                selectedSpecialty === spec
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-950/40'
                  : 'bg-[#0F172A]/80 text-slate-300 border border-white/10 hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              {spec === 'all' ? 'All Specialties' : spec}
            </button>
          ))}
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide, idx) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            id={`guide-card-${guide.id}`}
            className="bg-[#0F172A]/85 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-xl hover:border-amber-400/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Top Guide Avatar & Rating */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <img
                    src={guide.avatar}
                    alt={guide.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
                  />
                  <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 text-[10px] font-bold flex items-center gap-0.5 shadow-md">
                    <span>★</span>
                    <span>{guide.rating}</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-bold text-lg text-white leading-snug">
                    {guide.name}
                  </h3>
                  <p className="text-xs text-amber-300 font-semibold mb-1 truncate">
                    {guide.title}
                  </p>
                  <p className="text-xs text-slate-300 flex items-center gap-1 font-normal">
                    <span className="material-symbols-outlined text-[15px] text-sky-400">location_on</span>
                    <span className="truncate">{guide.location}</span>
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {guide.badges.map(b => (
                  <span
                    key={b}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30 backdrop-blur-md"
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* Bio & Specialty */}
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                  Specialty: <span className="text-white">{guide.specialty}</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 font-normal">
                  {guide.bio}
                </p>
              </div>

              {/* Language & Experience metrics */}
              <div className="grid grid-cols-2 gap-2 p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 text-xs mb-5">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Experience</span>
                  <span className="font-bold text-white text-sm">{guide.experienceYears}+ Years</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Languages</span>
                  <span className="font-bold text-white text-sm truncate block">{guide.languages.slice(0, 2).join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Card Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between mb-0.5">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Day Fee</span>
                  <span className="text-lg sm:text-xl font-serif font-bold text-amber-400">
                    ₹{guide.pricePerDay.toLocaleString('en-IN')} <span className="text-xs font-sans text-slate-300 font-normal">/ day</span>
                  </span>
                </div>

                {guide.hasReel && (
                  <button
                    id={`btn-watch-reel-${guide.id}`}
                    onClick={() => onOpenReel(guide.reels[0].id)}
                    className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/15 hover:border-amber-400 text-xs font-semibold text-amber-300 flex items-center gap-1.5 transition cursor-pointer backdrop-blur-md hover:bg-white/[0.1]"
                  >
                    <span className="material-symbols-outlined text-[16px] text-amber-400">play_circle</span>
                    <span>Watch Reel</span>
                  </button>
                )}
              </div>

              <button
                id={`btn-pick-guide-${guide.id}`}
                onClick={() => onSelectGuideForTrip(guide)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-950/40 cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
              >
                <span>Select this Guide</span>
                <span className="material-symbols-outlined text-[16px]">check</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
