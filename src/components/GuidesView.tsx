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
    <div className="min-h-screen bg-transparent text-[#f5f5f5] pb-24 md:pb-16 max-w-7xl mx-auto px-4 sm:px-6 pt-6">
      {/* Header */}
      <div className="mb-8">
        <span className="px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-2 inline-block backdrop-blur-md">
          Oral Historians & Guild Elders
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#f5f5f5] mb-2">
          Verified Local Storytellers
        </h1>
        <p className="text-sm text-[#9499a1] max-w-2xl leading-relaxed font-light">
          Connect with vetted local anthropologists, botanical elders, and multi-generational storytellers who turn landscapes into living chronicles.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full sm:max-w-xs">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9499a1] text-[20px]">
            search
          </span>
          <input
            id="input-guide-search"
            type="text"
            value={searchGuide}
            onChange={(e) => setSearchGuide(e.target.value)}
            placeholder="Search guide name, fortress, botany..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] text-xs sm:text-sm text-[#f5f5f5] placeholder:text-[#9499a1] focus:outline-none focus:border-[#d4af37] transition shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {['all', 'Medieval', 'Rainforest', 'Culinary'].map(spec => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer backdrop-blur-md ${
                selectedSpecialty === spec
                  ? 'bg-[#d4af37] text-[#080808] font-bold shadow-md shadow-[#d4af37]/20'
                  : 'bg-white/[0.04] text-[#9499a1] border border-white/[0.08] hover:bg-white/[0.08] hover:text-[#f5f5f5]'
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
            className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-6 border border-white/[0.08] shadow-xl hover:border-[#d4af37]/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Top Guide Avatar & Rating */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <img
                    src={guide.avatar}
                    alt={guide.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#d4af37] shadow-sm"
                  />
                  <div className="absolute -bottom-2 -right-2 px-1.5 py-0.5 rounded-md bg-[#d4af37] text-[#080808] text-[10px] font-bold flex items-center gap-0.5 shadow-sm">
                    <span>★</span>
                    <span>{guide.rating}</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-bold text-lg text-[#f5f5f5] leading-snug">
                    {guide.name}
                  </h3>
                  <p className="text-xs text-[#d4af37] font-medium mb-1 truncate">
                    {guide.title}
                  </p>
                  <p className="text-[11px] text-[#9499a1] flex items-center gap-1 font-light">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    <span className="truncate">{guide.location}</span>
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {guide.badges.map(b => (
                  <span
                    key={b}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/[0.04] text-[#d4af37] border border-white/[0.08] backdrop-blur-md"
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* Bio & Specialty */}
              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9499a1] block mb-1">
                  Specialty: {guide.specialty}
                </span>
                <p className="text-xs text-[#9499a1] leading-relaxed line-clamp-3 font-light">
                  {guide.bio}
                </p>
              </div>

              {/* Language & Experience metrics */}
              <div className="grid grid-cols-2 gap-2 p-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] text-xs mb-5">
                <div>
                  <span className="text-[10px] text-[#9499a1] block uppercase font-light">Experience</span>
                  <span className="font-semibold text-[#f5f5f5]">{guide.experienceYears}+ Years</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#9499a1] block uppercase font-light">Languages</span>
                  <span className="font-semibold text-[#f5f5f5] truncate block">{guide.languages.slice(0, 2).join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Card Actions */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="text-[10px] text-[#9499a1] block font-light">Day Fee</span>
                  <span className="text-lg font-serif font-bold text-[#d4af37]">
                    ${guide.pricePerDay} <span className="text-xs font-sans text-[#9499a1] font-normal">/ day</span>
                  </span>
                </div>

                {guide.hasReel && (
                  <button
                    id={`btn-watch-reel-${guide.id}`}
                    onClick={() => onOpenReel(guide.reels[0].id)}
                    className="px-3.5 py-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#d4af37] text-xs font-medium text-[#d4af37] flex items-center gap-1.5 transition cursor-pointer backdrop-blur-md hover:bg-white/[0.08]"
                  >
                    <span className="material-symbols-outlined text-[16px]">play_circle</span>
                    <span>Watch Reel</span>
                  </button>
                )}
              </div>

              <button
                id={`btn-pick-guide-${guide.id}`}
                onClick={() => onSelectGuideForTrip(guide)}
                className="w-full py-3 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#080808] font-bold text-xs transition shadow-md shadow-[#d4af37]/20 cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
              >
                <span>Pick this Guide</span>
                <span className="material-symbols-outlined text-[16px]">check</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
