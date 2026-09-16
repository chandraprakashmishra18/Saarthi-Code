import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TripPlan } from '../types';
import { INITIAL_TRIP_PLAN } from '../data/mockData';

interface TripIntakeViewProps {
  onGenerateTrip: (plan: TripPlan) => void;
  onBack: () => void;
  womensSafetyActive: boolean;
  onToggleSafety: () => void;
}

export const TripIntakeView: React.FC<TripIntakeViewProps> = ({
  onGenerateTrip,
  onBack,
  womensSafetyActive,
  onToggleSafety
}) => {
  const [companion, setCompanion] = useState<'solo' | 'couple' | 'family' | 'friends'>('solo');
  const [pace, setPace] = useState<'relaxed' | 'moderate' | 'intense'>('moderate');
  const [budget, setBudget] = useState<'modest' | 'balanced' | 'luxury'>('balanced');
  const [duration, setDuration] = useState<number>(4);
  const [region, setRegion] = useState<string>('Rajasthan (Fortresses & Stepwells)');

  const handleSubmit = () => {
    const customizedPlan: TripPlan = {
      ...INITIAL_TRIP_PLAN,
      companion,
      pace,
      budgetLevel: budget,
      durationDays: duration,
      region,
      womensSafetyMode: womensSafetyActive
    };
    onGenerateTrip(customizedPlan);
  };

  return (
    <div className="min-h-screen bg-transparent text-[#f5f5f5] pb-24 md:pb-16 max-w-3xl mx-auto px-4 sm:px-6 pt-6">
      {/* Back & Step Counter */}
      <div className="flex items-center justify-between mb-6">
        <button
          id="btn-intake-back"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-medium text-[#9499a1] hover:text-[#d4af37] transition cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back</span>
        </button>

        <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold bg-[#d4af37]/15 border border-[#d4af37]/40 px-3 py-1 rounded-full backdrop-blur-md">
          Story Intake Planner
        </span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#f5f5f5] mb-2 tracking-tight">
          Craft Your Narrative Journey
        </h1>
        <p className="text-sm text-[#9499a1] leading-relaxed font-light">
          Tell us how you like to move and feel. We connect daily stepwell walks, heritage stays, and verified oral historians into a seamless expedition.
        </p>
      </div>

      <div className="space-y-8 bg-white/[0.03] backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/[0.08] shadow-xl">
        {/* Step 1: Who are you traveling with? */}
        <div>
          <label className="block font-serif font-bold text-base text-[#f5f5f5] mb-3">
            1. Who is traveling on this journey?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'solo', label: 'Solo Explorer', icon: 'person' },
              { id: 'couple', label: 'Couple / Duo', icon: 'favorite' },
              { id: 'family', label: 'Family', icon: 'family_restroom' },
              { id: 'friends', label: 'Friend Circle', icon: 'groups' }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                id={`companion-${item.id}`}
                onClick={() => setCompanion(item.id as any)}
                className={`p-4 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center gap-2 backdrop-blur-md ${
                  companion === item.id
                    ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37] font-semibold ring-2 ring-[#d4af37]/30 shadow-md'
                    : 'border-white/[0.08] bg-white/[0.04] text-[#9499a1] hover:bg-white/[0.08] hover:text-[#f5f5f5]'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Desired Pace */}
        <div>
          <label className="block font-serif font-bold text-base text-[#f5f5f5] mb-3">
            2. What pace resonates with you?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'relaxed', label: 'Slow & Meditative', sub: '1 in-depth story per day, long chai chats' },
              { id: 'moderate', label: 'Balanced Rhythm', sub: '2 curated landmarks & evening folk sessions' },
              { id: 'intense', label: 'Expedition Mode', sub: 'Dawn to dusk subterranean & fort discoveries' }
            ].map(p => (
              <button
                key={p.id}
                type="button"
                id={`pace-${p.id}`}
                onClick={() => setPace(p.id as any)}
                className={`p-4 rounded-2xl border text-left transition cursor-pointer backdrop-blur-md ${
                  pace === p.id
                    ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37] ring-2 ring-[#d4af37]/30 shadow-md'
                    : 'border-white/[0.08] bg-white/[0.04] text-[#9499a1] hover:bg-white/[0.08] hover:text-[#f5f5f5]'
                }`}
              >
                <span className="text-xs font-bold block mb-1">{p.label}</span>
                <span className="text-[11px] leading-tight opacity-90 block font-light">{p.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Region & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-serif font-bold text-sm text-[#f5f5f5] mb-2">
              3. Cultural Region
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full p-3 rounded-2xl border border-white/[0.08] bg-[#141414]/90 backdrop-blur-xl text-xs text-[#f5f5f5] focus:outline-none focus:border-[#d4af37]"
            >
              <option value="Rajasthan (Fortresses & Stepwells)">Rajasthan (Fortresses & Stepwells)</option>
              <option value="Meghalaya (Rainforests & Living Bridges)">Meghalaya (Rainforests & Living Bridges)</option>
              <option value="Kerala (Backwaters & Spice Guilds)">Kerala (Backwaters & Spice Guilds)</option>
              <option value="Old Delhi (Mughal Culinary & Havelis)">Old Delhi (Mughal Culinary & Havelis)</option>
            </select>
          </div>

          <div>
            <label className="block font-serif font-bold text-sm text-[#f5f5f5] mb-2">
              4. Duration: {duration} Days
            </label>
            <input
              type="range"
              min="2"
              max="7"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-[#d4af37] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#9499a1] mt-1 font-light">
              <span>2 Days (Weekend)</span>
              <span>4 Days (Ideal)</span>
              <span>7 Days (Expedition)</span>
            </div>
          </div>
        </div>

        {/* Women's Safety Mode Toggle Banner */}
        <div className="p-4 rounded-2xl bg-emerald-950/20 backdrop-blur-xl border border-emerald-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <span className="material-symbols-outlined text-[20px]">shield</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#f5f5f5]">Verified Women's Safety Filter</h4>
              <p className="text-[11px] text-[#9499a1] font-light">
                Prioritizes background-checked guides, safe havens, and verified homestays.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleSafety}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer backdrop-blur-md ${
              womensSafetyActive
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-white/[0.04] border border-white/[0.08] text-[#9499a1] hover:text-[#f5f5f5] hover:bg-white/[0.08]'
            }`}
          >
            {womensSafetyActive ? 'ACTIVE' : 'ENABLE'}
          </button>
        </div>

        {/* Action Button */}
        <button
          id="btn-start-mapping-story"
          type="button"
          onClick={handleSubmit}
          className="w-full py-4 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#080808] font-serif font-bold text-base shadow-lg shadow-[#d4af37]/25 flex items-center justify-center gap-2 transition active:scale-[0.99] cursor-pointer"
        >
          <span>Start Mapping Story Itinerary</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
