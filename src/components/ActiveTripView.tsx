import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TripPlan } from '../types';
import { ActiveTripMapView } from './ActiveTripMapView';

interface ActiveTripViewProps {
  tripPlan: TripPlan;
  onOpenSOS: () => void;
  onOpenSoloMatch: () => void;
  onCompleteTrip: () => void;
  womensSafetyActive: boolean;
}

export const ActiveTripView: React.FC<ActiveTripViewProps> = ({
  tripPlan,
  onOpenSOS,
  onOpenSoloMatch,
  onCompleteTrip,
  womensSafetyActive
}) => {
  const [currentDayNumber, setCurrentDayNumber] = useState<number>(2);
  const [chatOpen, setChatOpen] = useState(false);
  const [guideCallActive, setGuideCallActive] = useState(false);

  // Persistent Trip Notes state for the session
  const [tripNotes, setTripNotes] = useState<string>(() => {
    try {
      return localStorage.getItem(`saarthi_trip_notes_${tripPlan.id || 'active'}`) || 
             sessionStorage.getItem(`saarthi_trip_notes_${tripPlan.id || 'active'}`) || 
             '• Stop at the blue courtyard haveli for cold saffron lassi.\n• Revisit the 4th subterranean level near sunset for architectural shadow photography.\n• Ask Rudra Pratap about the 9th-century stone carver mark on the south pillar.';
    } catch {
      return '';
    }
  });
  const [noteSavedStatus, setNoteSavedStatus] = useState<'saved' | 'saving'>('saved');
  const [lastSavedAt, setLastSavedAt] = useState<string>('Saved');

  // Interactive Essential Packing & Docs checklist state
  interface PackingItem {
    id: string;
    label: string;
    category: 'docs' | 'gear' | 'safety' | 'local';
    checked: boolean;
    essential?: boolean;
  }

  const defaultPackingItems: PackingItem[] = [
    { id: 'pack-1', label: 'Government Photo ID / Passport & Visa printouts', category: 'docs', checked: true, essential: true },
    { id: 'pack-2', label: 'Offline Story Route & Audio Guides pre-downloaded', category: 'docs', checked: true, essential: true },
    { id: 'pack-3', label: 'High-grip walking shoes for ancient stone steps', category: 'gear', checked: true, essential: true },
    { id: 'pack-4', label: 'High-capacity power bank & camera cables', category: 'gear', checked: false, essential: true },
    { id: 'pack-5', label: 'Reusable insulated water flask & electrolytes', category: 'safety', checked: true, essential: false },
    { id: 'pack-6', label: 'Personal first aid, blister pads & SPF 50+', category: 'safety', checked: false, essential: true },
    { id: 'pack-7', label: 'Local currency (INR Cash) for street artisans & tea stalls', category: 'local', checked: false, essential: true },
    { id: 'pack-8', label: 'Modest light scarf / shawl for temple entry', category: 'local', checked: true, essential: false },
  ];

  const [packingList, setPackingList] = useState<PackingItem[]>(() => {
    try {
      const saved = localStorage.getItem(`saarthi_packing_list_${tripPlan.id || 'active'}`) ||
                    sessionStorage.getItem(`saarthi_packing_list_${tripPlan.id || 'active'}`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return defaultPackingItems;
  });

  const [packingFilter, setPackingFilter] = useState<'all' | 'docs' | 'gear' | 'safety' | 'local'>('all');
  const [newPackingText, setNewPackingText] = useState('');
  const [newPackingCategory, setNewPackingCategory] = useState<'docs' | 'gear' | 'safety' | 'local'>('gear');

  // Save checklist whenever it updates
  useEffect(() => {
    try {
      const key = `saarthi_packing_list_${tripPlan.id || 'active'}`;
      localStorage.setItem(key, JSON.stringify(packingList));
      sessionStorage.setItem(key, JSON.stringify(packingList));
    } catch (e) {
      console.error('Failed to save packing list locally:', e);
    }
  }, [packingList, tripPlan.id]);

  const handleTogglePackingItem = (id: string) => {
    setPackingList(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleAddPackingItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackingText.trim()) return;
    const newItem: PackingItem = {
      id: `pack-custom-${Date.now()}`,
      label: newPackingText.trim(),
      category: newPackingCategory,
      checked: false,
      essential: false,
    };
    setPackingList(prev => [...prev, newItem]);
    setNewPackingText('');
  };

  const handleResetPacking = () => {
    if (window.confirm('Reset checklist to default essential packing items?')) {
      setPackingList(defaultPackingItems);
    }
  };

  const checkedCount = packingList.filter(item => item.checked).length;
  const totalPackingCount = packingList.length;
  const packingProgressPercent = totalPackingCount > 0 ? Math.round((checkedCount / totalPackingCount) * 100) : 0;

  const filteredPackingItems = packingList.filter(item => {
    if (packingFilter === 'all') return true;
    return item.category === packingFilter;
  });

  const totalDays = tripPlan.durationDays || (tripPlan.days && tripPlan.days.length) || 4;
  const clampedDay = Math.min(Math.max(1, currentDayNumber), totalDays);
  const remainingDays = Math.max(0, totalDays - clampedDay);
  const completionPercentage = Math.min(100, Math.max(0, Math.round((clampedDay / totalDays) * 100)));

  const activeDayData = (tripPlan.days && tripPlan.days[clampedDay - 1]) || {
    dayNumber: clampedDay,
    title: 'The Subterranean Descent: Chand Baori',
    location: 'Abhaneri Village, Rajasthan',
    guideName: 'Rudra Pratap Singh',
    guideAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
    price: 2400,
    description: 'Meet Rudra Pratap at the 9th-century gate for blueprint decoding and subterranean stepwell walk.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
    time: '08:30 AM - 02:00 PM',
    includedActivity: 'Private Stepwell Descent & Blueprint Study'
  };

  const [chatMessages, setChatMessages] = useState<string[]>([
    `${activeDayData.guideName}: "Namaste Aditi! I have reached the ${activeDayData.location} gate. Saffron tea is ready in fresh terracotta kulhads!"`,
    'Aditi: "On my way Rudra-ji! Just arriving at the courtyard haveli."'
  ]);
  const [newChatText, setNewChatText] = useState('');

  // Handle saving notes to session / local storage
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTripNotes(value);
    setNoteSavedStatus('saving');
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        const key = `saarthi_trip_notes_${tripPlan.id || 'active'}`;
        localStorage.setItem(key, tripNotes);
        sessionStorage.setItem(key, tripNotes);
        setNoteSavedStatus('saved');
        const now = new Date();
        setLastSavedAt(`Saved at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
      } catch (err) {
        console.error('Failed to save notes locally:', err);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [tripNotes, tripPlan.id]);

  const handleAddQuickTag = (tagText: string) => {
    setTripNotes((prev) => {
      const trimmed = prev.trimEnd();
      const newLine = trimmed ? `\n• ${tagText}: ` : `• ${tagText}: `;
      return trimmed + newLine;
    });
  };

  const handleClearNotes = () => {
    if (tripNotes.trim() && window.confirm('Clear all trip notes for this journey?')) {
      setTripNotes('');
      try {
        const key = `saarthi_trip_notes_${tripPlan.id || 'active'}`;
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;
    setChatMessages([...chatMessages, `Aditi: "${newChatText}"`]);
    setNewChatText('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        `${activeDayData.guideName}: "Understood! Look for the ancient banyan tree by the entrance archway."`
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-transparent text-[#f5f5f5] pb-24 md:pb-16 max-w-4xl mx-auto px-4 sm:px-6 pt-6">
      {/* Active Trip Live Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs uppercase tracking-widest font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full whitespace-nowrap backdrop-blur-md">
            Live Trip in Progress
          </span>
        </div>

        <button
          id="btn-active-emergency-sos"
          onClick={onOpenSOS}
          className="px-4 py-1.5 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-rose-950/40 backdrop-blur-md cursor-pointer whitespace-nowrap transition active:scale-95"
        >
          <span className="material-symbols-outlined text-[15px]">sos</span>
          <span>Emergency SOS</span>
        </button>
      </div>

      {/* Visual Trip Progress Bar Card */}
      <div id="trip-progress-tracker-card" className="mb-6 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[18px] text-[#d4af37]">route</span>
              <h2 className="font-serif font-bold text-base sm:text-lg text-[#f5f5f5]">
                {tripPlan.title || 'Curated Cultural Journey'}
              </h2>
            </div>
            <p className="text-xs text-[#9499a1] font-light">
              {tripPlan.region} • Day {clampedDay} of {totalDays}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="px-3 py-1.5 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md">
              <span className="material-symbols-outlined text-[16px]">timelapse</span>
              <span id="trip-completion-badge" className="whitespace-nowrap font-bold">
                {completionPercentage}% Complete
              </span>
            </div>

            <div className="px-3 py-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs text-[#9499a1] flex items-center gap-1.5 backdrop-blur-md">
              <span className="material-symbols-outlined text-[16px] text-amber-400">calendar_today</span>
              <span id="trip-remaining-days-badge" className="whitespace-nowrap font-medium text-[#f5f5f5]">
                {remainingDays === 0 ? 'Final Day (0 days left)' : `${remainingDays} ${remainingDays === 1 ? 'day' : 'days'} remaining`}
              </span>
            </div>
          </div>
        </div>

        {/* Visual Progress Bar Track */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[11px] text-[#9499a1]">
            <span className="font-medium text-[#d4af37]">Day {clampedDay} Milestone</span>
            <span className="font-medium text-[#a1a1aa]">{totalDays - remainingDays} of {totalDays} Days Completed</span>
          </div>

          <div 
            id="trip-progress-bar-container"
            className="h-2.5 w-full bg-white/[0.06] rounded-full overflow-hidden border border-white/[0.08] relative p-0.5 backdrop-blur-sm"
            role="progressbar"
            aria-valuenow={completionPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Trip completion progress: ${completionPercentage}%`}
          >
            <motion.div
              id="trip-progress-bar-fill"
              className="h-full bg-gradient-to-r from-[#b39029] via-[#d4af37] to-[#e5c158] rounded-full relative shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-xs"></div>
            </motion.div>
          </div>
        </div>

        {/* Day-by-Day Milestone Step Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 mt-4 border-t border-white/[0.06]">
          {tripPlan.days && tripPlan.days.length > 0 ? (
            tripPlan.days.map((day, idx) => {
              const dayNum = idx + 1;
              const isPast = dayNum < clampedDay;
              const isCurrent = dayNum === clampedDay;
              const isUpcoming = dayNum > clampedDay;

              return (
                <button
                  key={day.dayNumber || idx}
                  id={`btn-day-step-${dayNum}`}
                  onClick={() => setCurrentDayNumber(dayNum)}
                  className={`p-2.5 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer backdrop-blur-md ${
                    isCurrent
                      ? 'bg-[#d4af37]/15 border-[#d4af37] text-white shadow-md'
                      : isPast
                      ? 'bg-white/[0.04] border-white/10 text-slate-200 hover:border-white/20'
                      : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      isCurrent ? 'text-[#d4af37]' : isPast ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      Day {dayNum}
                    </span>
                    {isPast && (
                      <span className="material-symbols-outlined text-[14px] text-emerald-400">check_circle</span>
                    )}
                    {isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping"></span>
                    )}
                    {isUpcoming && (
                      <span className="material-symbols-outlined text-[14px] text-slate-400">schedule</span>
                    )}
                  </div>
                  <p className={`text-xs font-serif font-semibold truncate ${
                    isCurrent ? 'text-white' : isPast ? 'text-slate-200' : 'text-slate-300'
                  }`}>
                    {day.location || `Stop ${dayNum}`}
                  </p>
                </button>
              );
            })
          ) : (
            Array.from({ length: totalDays }).map((_, idx) => {
              const dayNum = idx + 1;
              const isCurrent = dayNum === clampedDay;
              const isPast = dayNum < clampedDay;

              return (
                <button
                  key={dayNum}
                  id={`btn-day-step-${dayNum}`}
                  onClick={() => setCurrentDayNumber(dayNum)}
                  className={`p-2.5 rounded-2xl border text-left transition cursor-pointer backdrop-blur-md ${
                    isCurrent
                      ? 'bg-[#d4af37]/15 border-[#d4af37] text-white'
                      : isPast
                      ? 'bg-white/[0.04] border-white/10 text-slate-200'
                      : 'bg-white/[0.02] border-white/[0.08] text-slate-400'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase block text-[#d4af37]">Day {dayNum}</span>
                  <p className="text-xs truncate font-medium text-slate-200">Itinerary Stop {dayNum}</p>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Hero Active Milestone */}
      <div className="mb-6 bg-white/[0.03] backdrop-blur-2xl text-white p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl border border-white/[0.08]">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs text-[#d4af37] uppercase tracking-wider font-semibold">
              Day {clampedDay} of {totalDays} • Active Milestone
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[#a1a1aa] backdrop-blur-md">
              {remainingDays === 0 ? 'Final Itinerary Day' : `${remainingDays} ${remainingDays === 1 ? 'day' : 'days'} remaining`}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f5f5f5] mb-2">
            {activeDayData.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#9499a1] mb-4 max-w-xl font-light leading-relaxed">
            {activeDayData.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 text-xs text-[#d4af37] flex items-center gap-1.5 backdrop-blur-md">
              <span className="material-symbols-outlined text-[16px]">navigation</span>
              <span>{activeDayData.includedActivity || 'Guided Discovery'} ({activeDayData.time || '08:30 AM - 02:00 PM'})</span>
            </div>

            {womensSafetyActive && (
              <div className="px-3.5 py-1.5 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-1.5 backdrop-blur-md">
                <span className="material-symbols-outlined text-[16px]">shield</span>
                <span>Safe Corridor Active</span>
              </div>
            )}
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#d4af37]/10 to-transparent pointer-events-none" />
      </div>

      {/* Lightweight Interactive Map View with Glassmorphic Theme */}
      <ActiveTripMapView
        tripPlan={tripPlan}
        currentDayNumber={clampedDay}
        onSelectDay={(dayNum) => setCurrentDayNumber(dayNum)}
        womensSafetyActive={womensSafetyActive}
        onOpenSOS={onOpenSOS}
      />

      {/* Guide Interaction & Solo Match Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Guide Instant Connect */}
        <div className="p-5 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={activeDayData.guideAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
                alt={activeDayData.guideName}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#d4af37]"
              />
              <div>
                <h4 className="font-serif font-bold text-sm text-[#f5f5f5]">
                  {activeDayData.guideName}
                </h4>
                <span className="text-xs text-[#9499a1]">Assigned Master Guide</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                id="btn-active-call-guide"
                onClick={() => setGuideCallActive(true)}
                className="w-9 h-9 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 flex items-center justify-center hover:bg-emerald-900/80 transition cursor-pointer backdrop-blur-md"
                title="Call Guide"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
              </button>

              <button
                id="btn-active-chat-guide"
                onClick={() => setChatOpen(!chatOpen)}
                className="w-9 h-9 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center hover:bg-[#d4af37]/25 transition cursor-pointer backdrop-blur-md"
                title="Chat with Guide"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
              </button>
            </div>
          </div>

          {/* Quick Chat Preview */}
          {chatOpen ? (
            <div className="pt-2 border-t border-white/[0.06]">
              <div className="space-y-2 mb-3 max-h-36 overflow-y-auto text-xs">
                {chatMessages.map((msg, i) => (
                  <div key={i} className="p-2.5 rounded-2xl bg-white/[0.04] text-[#f5f5f5] border border-white/[0.08] backdrop-blur-md">
                    {msg}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} className="flex gap-2">
                <input
                  type="text"
                  value={newChatText}
                  onChange={(e) => setNewChatText(e.target.value)}
                  placeholder={`Message ${activeDayData.guideName.split(' ')[0]}...`}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs text-[#f5f5f5] focus:outline-none focus:border-[#d4af37] backdrop-blur-md"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-[#d4af37] text-[#080808] text-xs font-bold hover:bg-[#e5c158] cursor-pointer whitespace-nowrap"
                >
                  Send
                </button>
              </form>
            </div>
          ) : (
            <p className="text-xs text-[#9499a1] font-light">
              Tap call or chat to get immediate meeting spot directions or audio briefing from {activeDayData.guideName.split(' ')[0]}.
            </p>
          )}
        </div>

        {/* Solo Matchmaker Card */}
        <div className="p-5 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-emerald-400">group_add</span>
              <h4 className="font-serif font-bold text-sm text-[#f5f5f5]">
                Nearby Solo Travelers
              </h4>
            </div>
            <p className="text-xs text-[#9499a1] mb-3 font-light">
              Aanya & Pooja are currently exploring {activeDayData.location.split(',')[0]}’s heritage route. Connect for shared kulhad chai or joint photo walks.
            </p>

            <div className="flex items-center gap-2 mb-2">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=100&q=80"
                alt="Aanya"
                className="w-8 h-8 rounded-full border-2 border-[#d4af37] object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=100&q=80"
                alt="Pooja"
                className="w-8 h-8 rounded-full border-2 border-[#d4af37] object-cover -ml-3"
              />
              <span className="text-[11px] font-medium text-emerald-400 whitespace-nowrap">
                2 Verified Matches (0.8 km)
              </span>
            </div>
          </div>

          <button
            id="btn-active-open-solo"
            onClick={onOpenSoloMatch}
            className="w-full py-2.5 rounded-2xl bg-white/[0.05] border border-white/[0.09] text-xs font-medium text-[#f5f5f5] hover:bg-white/[0.09] transition cursor-pointer backdrop-blur-md"
          >
            Open Solo Match Hub
          </button>
        </div>
      </div>

      {/* Essential Packing & Docs Checklist Card */}
      <div id="packing-checklist-card" className="mb-6 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] backdrop-blur-md">
              <span className="material-symbols-outlined text-[18px]">checklist</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#f5f5f5] flex items-center gap-2">
                Essential Packing & Docs
              </h3>
              <p className="text-xs text-[#9499a1] font-light">
                Verify critical passes, heritage permits, and expedition gear before setting out.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div 
              id="packing-progress-badge"
              className="px-3 py-1.5 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md"
            >
              <span className="material-symbols-outlined text-[15px]">task_alt</span>
              <span className="whitespace-nowrap font-bold">
                {checkedCount} / {totalPackingCount} Ready ({packingProgressPercent}%)
              </span>
            </div>

            <button
              id="btn-reset-packing"
              onClick={handleResetPacking}
              className="px-3 py-1.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] text-[#9499a1] hover:text-[#d1d5db] transition cursor-pointer flex items-center gap-1 backdrop-blur-md"
              title="Reset to default items"
            >
              <span className="material-symbols-outlined text-[13px]">restart_alt</span>
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Small progress meter track */}
        <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden mb-4 border border-white/[0.08]">
          <motion.div
            className="h-full bg-[#d4af37] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${packingProgressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4 pb-3 border-b border-white/[0.06]">
          {(
            [
              { id: 'all', label: 'All Items' },
              { id: 'docs', label: 'Documents & Passes' },
              { id: 'gear', label: 'Field Gear' },
              { id: 'safety', label: 'Health & Safety' },
              { id: 'local', label: 'Local Essentials' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              id={`btn-filter-packing-${tab.id}`}
              onClick={() => setPackingFilter(tab.id)}
              className={`px-3 py-1 rounded-xl text-xs transition cursor-pointer whitespace-nowrap backdrop-blur-md ${
                packingFilter === tab.id
                  ? 'bg-[#d4af37]/15 border border-[#d4af37] text-[#d4af37] font-semibold'
                  : 'bg-white/[0.03] border border-white/[0.06] text-[#9499a1] hover:text-[#f5f5f5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Packing Checklist Item List */}
        <div className="space-y-2 mb-4">
          {filteredPackingItems.map((item) => (
            <div
              key={item.id}
              id={`packing-item-${item.id}`}
              onClick={() => handleTogglePackingItem(item.id)}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer select-none backdrop-blur-md ${
                item.checked
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-[#8e9299]'
                  : 'bg-white/[0.02] border-white/[0.06] text-[#f5f5f5] hover:border-white/15'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                    item.checked
                      ? 'bg-emerald-500 border-emerald-500 text-[#080808]'
                      : 'border-white/20 bg-white/[0.03]'
                  }`}
                >
                  {item.checked && (
                    <span className="material-symbols-outlined text-[15px] font-bold">check</span>
                  )}
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-xs sm:text-sm font-medium leading-tight ${
                      item.checked ? 'line-through text-[#6e7278]' : 'text-[#f5f5f5]'
                    }`}
                  >
                    {item.label}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-[#9499a1]">
                      {item.category === 'docs' && 'Document'}
                      {item.category === 'gear' && 'Field Gear'}
                      {item.category === 'safety' && 'Safety / Health'}
                      {item.category === 'local' && 'Local Culture'}
                    </span>
                    {item.essential && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30">
                        Essential
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {item.id.startsWith('pack-custom-') && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPackingList((prev) => prev.filter((p) => p.id !== item.id));
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-400 transition cursor-pointer"
                  title="Remove item"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>
          ))}

          {filteredPackingItems.length === 0 && (
            <div className="py-6 text-center text-xs text-slate-400">
              No items in this category. Use the form below to add one.
            </div>
          )}
        </div>

        {/* Add Custom Packing Item */}
        <form onSubmit={handleAddPackingItem} className="flex flex-col sm:flex-row items-center gap-2 pt-3 border-t border-white/[0.06]">
          <div className="relative flex-1 w-full">
            <input
              id="input-new-packing-item"
              type="text"
              value={newPackingText}
              onChange={(e) => setNewPackingText(e.target.value)}
              placeholder="Add custom packing item (e.g. Lens cleaning kit, Audio recorder)..."
              className="w-full pl-3.5 pr-3 py-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs text-[#f5f5f5] placeholder-[#666] focus:outline-none focus:border-[#d4af37] backdrop-blur-md"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              id="select-new-packing-category"
              value={newPackingCategory}
              onChange={(e) => setNewPackingCategory(e.target.value as any)}
              aria-label="Packing item category"
              className="px-3 py-2 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs text-[#d1d5db] focus:outline-none focus:border-[#d4af37] backdrop-blur-md"
            >
              <option value="docs" className="bg-[#121212]">Document</option>
              <option value="gear" className="bg-[#121212]">Field Gear</option>
              <option value="safety" className="bg-[#121212]">Health/Safety</option>
              <option value="local" className="bg-[#121212]">Local Cultural</option>
            </select>

            <button
              type="submit"
              id="btn-add-packing-item"
              disabled={!newPackingText.trim()}
              className="px-4 py-2 rounded-2xl bg-[#d4af37] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#e5c158] text-[#080808] text-xs font-bold transition cursor-pointer whitespace-nowrap flex items-center gap-1 shadow-md shadow-[#d4af37]/20"
            >
              <span className="material-symbols-outlined text-[15px]">add</span>
              <span>Add Item</span>
            </button>
          </div>
        </form>
      </div>

      {/* Persistent Trip Notes Card */}
      <div id="trip-notes-card" className="mb-6 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] backdrop-blur-md">
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#f5f5f5] flex items-center gap-2">
                Trip Notes & Revisit Log
              </h3>
              <p className="text-xs text-[#9499a1] font-light">
                Jot down spontaneous thoughts, hidden spots, or artisan recommendations for this trip.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Auto-saved session status */}
            <div 
              id="trip-notes-save-status" 
              className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] flex items-center gap-1.5 text-[#a1a1aa] backdrop-blur-md"
            >
              {noteSavedStatus === 'saving' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[13px] text-emerald-400">check_circle</span>
                  <span className="text-[#a1a1aa]">{lastSavedAt}</span>
                </>
              )}
            </div>

            {tripNotes.trim() && (
              <button
                id="btn-clear-notes"
                onClick={handleClearNotes}
                className="px-3 py-1 rounded-full bg-white/[0.04] hover:bg-rose-950/60 hover:text-rose-400 hover:border-rose-500/40 border border-white/[0.08] text-[11px] text-[#9499a1] transition cursor-pointer flex items-center gap-1 backdrop-blur-md"
                title="Clear Notes"
              >
                <span className="material-symbols-outlined text-[13px]">delete_sweep</span>
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Tag Insert Prompts */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span className="text-[10px] text-[#9499a1] uppercase tracking-wider font-semibold mr-1">Quick Tag:</span>
          <button
            type="button"
            id="btn-tag-revisit"
            onClick={() => handleAddQuickTag('📍 Revisit Spot')}
            className="px-3 py-1 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] text-[#d1d5db] transition cursor-pointer flex items-center gap-1 backdrop-blur-md"
          >
            <span>📍 Revisit Spot</span>
          </button>
          <button
            type="button"
            id="btn-tag-cafe"
            onClick={() => handleAddQuickTag('☕ Chai & Food')}
            className="px-3 py-1 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] text-[#d1d5db] transition cursor-pointer flex items-center gap-1 backdrop-blur-md"
          >
            <span>☕ Chai & Food</span>
          </button>
          <button
            type="button"
            id="btn-tag-artisan"
            onClick={() => handleAddQuickTag('🎨 Local Artisan')}
            className="px-3 py-1 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] text-[#d1d5db] transition cursor-pointer flex items-center gap-1 backdrop-blur-md"
          >
            <span>🎨 Local Artisan</span>
          </button>
          <button
            type="button"
            id="btn-tag-photo"
            onClick={() => handleAddQuickTag('📸 Photo Angle')}
            className="px-3 py-1 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] text-[#d1d5db] transition cursor-pointer flex items-center gap-1 backdrop-blur-md"
          >
            <span>📸 Photo Angle</span>
          </button>
        </div>

        {/* Text Area for Notes */}
        <div className="relative">
          <textarea
            id="active-trip-notes-textarea"
            value={tripNotes}
            onChange={handleNotesChange}
            placeholder="Type your notes here... (e.g. hidden courtyard behind the stepwell, ask guide about the stone mason clan, must return before 6 PM for golden hour)"
            rows={5}
            className="w-full p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm text-[#f5f5f5] placeholder-[#666] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 resize-y leading-relaxed font-sans transition backdrop-blur-md"
          />
        </div>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.05] text-[11px] text-[#8e9299]">
          <span>Session Auto-Save Active • Stored locally in your browser</span>
          <span>{tripNotes.length} characters</span>
        </div>
      </div>

      {/* Mission Complete & AI Comic Journal Generation CTA */}
      <div className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-[#d4af37] uppercase tracking-wider block font-semibold">
            {remainingDays === 0 ? 'Journey Complete' : `Day ${clampedDay} Milestone Accomplished`}
          </span>
          <h3 className="text-xl font-serif font-bold text-[#f5f5f5]">
            Finished exploring {activeDayData.location.split(',')[0]}?
          </h3>
          <p className="text-xs text-[#9499a1] font-light">
            Generate your personalized 4-panel Illustrated Heritage Travelogue & claim Badges.
          </p>
        </div>

        <button
          id="btn-complete-and-journal"
          onClick={onCompleteTrip}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#080808] font-serif font-bold text-xs sm:text-sm transition shadow-lg shadow-[#d4af37]/20 active:scale-95 whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">palette</span>
          <span>Generate Illustrated Travelogue</span>
        </button>
      </div>

      {/* Simulated Call Modal */}
      {guideCallActive && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#121212]/90 backdrop-blur-2xl text-white rounded-3xl max-w-sm w-full p-8 text-center border border-white/[0.09] shadow-2xl">
            <img
              src={activeDayData.guideAvatar || 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80'}
              alt={activeDayData.guideName}
              className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-[#d4af37] mb-4 animate-pulse"
            />
            <h3 className="font-serif font-bold text-xl text-[#f5f5f5] mb-1">{activeDayData.guideName}</h3>
            <p className="text-xs text-emerald-400 mb-6">Connected • Live Voice Stream</p>
            <p className="text-xs text-[#a1a1aa] font-serif italic mb-8">
              “Aditi, I see you near the {activeDayData.location.split(',')[0]} archway! Look left toward the red sandstone pavilion.”
            </p>
            <button
              onClick={() => setGuideCallActive(false)}
              className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs cursor-pointer shadow-lg shadow-rose-950/40"
            >
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

