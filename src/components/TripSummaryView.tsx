import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TripPlan } from '../types';

interface TripSummaryViewProps {
  tripPlan: TripPlan;
  onProceedToCheckout: (plan: TripPlan) => void;
  onBack: () => void;
}

export const TripSummaryView: React.FC<TripSummaryViewProps> = ({
  tripPlan,
  onProceedToCheckout,
  onBack
}) => {
  const [activePlan, setActivePlan] = useState<TripPlan>(tripPlan);
  const [editingDay, setEditingDay] = useState<number | null>(null);

  const handleChangeDayGuide = (dayNumber: number) => {
    // Demo customization of guide/activity
    const updatedDays = activePlan.days.map(d => {
      if (d.dayNumber === dayNumber) {
        return {
          ...d,
          title: `${d.title} (Custom Narrative Focus)`,
          price: d.price + 10
        };
      }
      return d;
    });

    setActivePlan({
      ...activePlan,
      days: updatedDays,
      pricing: {
        ...activePlan.pricing,
        total: activePlan.pricing.total + 10
      }
    });
    setEditingDay(null);
  };

  return (
    <div className="min-h-screen bg-transparent text-[#f5f5f5] pb-24 md:pb-16 max-w-4xl mx-auto px-4 sm:px-6 pt-6">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          id="btn-summary-back"
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-medium text-[#9499a1] hover:text-[#d4af37] transition cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Edit Preferences</span>
        </button>

        <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
          <span className="material-symbols-outlined text-[14px]">check_circle</span>
          {activePlan.womensSafetyMode ? 'Safety Mode Verified' : 'Custom Itinerary'}
        </span>
      </div>

      {/* Hero Overview */}
      <div className="mb-8">
        <span className="px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-2 inline-block backdrop-blur-md">
          {activePlan.durationDays} Days • {activePlan.region}
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#f5f5f5] mb-2 tracking-tight">
          {activePlan.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#9499a1] font-light">
          Pace: <strong className="text-[#f5f5f5] font-medium capitalize">{activePlan.pace}</strong> • Travelers:{' '}
          <strong className="text-[#f5f5f5] font-medium capitalize">{activePlan.companion}</strong> • Dates:{' '}
          <strong className="text-[#f5f5f5] font-medium">{activePlan.startDate} - {activePlan.endDate}</strong>
        </p>
      </div>

      {/* Day by Day Interactive Timeline */}
      <div className="space-y-6 mb-10">
        {activePlan.days.slice(0, activePlan.durationDays).map((day, idx) => (
          <motion.div
            key={day.dayNumber}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-5 sm:p-6 border border-white/[0.08] shadow-xl hover:border-[#d4af37]/40 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/40 font-serif font-bold text-base flex items-center justify-center shadow-sm backdrop-blur-md">
                  0{day.dayNumber}
                </span>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#f5f5f5]">
                    {day.title}
                  </h3>
                  <span className="text-xs text-[#9499a1] font-light">{day.location} • {day.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleChangeDayGuide(day.dayNumber)}
                  className="px-3.5 py-1.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] text-xs text-[#9499a1] hover:text-[#f5f5f5] hover:bg-white/[0.08] transition cursor-pointer"
                >
                  Customize Day
                </button>
              </div>
            </div>

            {/* Day Body */}
            <div className="pt-4 flex flex-col md:flex-row gap-4 items-start">
              <img
                src={day.image}
                alt={day.title}
                className="w-full md:w-36 h-28 rounded-2xl object-cover border border-white/[0.08]"
              />
              <div className="flex-1">
                <p className="text-xs text-[#9499a1] leading-relaxed mb-3 font-light">
                  {day.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <img
                      src={day.guideAvatar}
                      alt={day.guideName}
                      className="w-6 h-6 rounded-full object-cover border border-[#d4af37]"
                    />
                    <span className="text-xs text-[#f5f5f5] font-medium">Guide: {day.guideName}</span>
                  </div>

                  <span className="text-xs font-serif font-bold text-[#d4af37]">
                    ${day.price} included
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Itemized Pricing & Booking Confirmation Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-xl">
        <h3 className="font-serif font-bold text-xl text-[#f5f5f5] mb-4">
          Journey Cost Breakdown
        </h3>

        <div className="space-y-2 text-xs sm:text-sm text-[#9499a1] pb-4 border-b border-white/[0.08] font-light">
          <div className="flex justify-between">
            <span>Verified Master Guide Honorarium (4 Days)</span>
            <span className="font-medium text-[#f5f5f5]">${activePlan.pricing.guideFee}</span>
          </div>
          <div className="flex justify-between">
            <span>Curated Heritage Havelis & Stays</span>
            <span className="font-medium text-[#f5f5f5]">${activePlan.pricing.heritageStays}</span>
          </div>
          <div className="flex justify-between">
            <span>Chauffeur & Inter-city Story Cab</span>
            <span className="font-medium text-[#f5f5f5]">${activePlan.pricing.storyCab}</span>
          </div>
          <div className="flex justify-between">
            <span>Heritage Monument Passes & Community Permits</span>
            <span className="font-medium text-[#f5f5f5]">${activePlan.pricing.heritagePasses}</span>
          </div>
          <div className="flex justify-between text-[#9499a1]">
            <span>Heritage Conservation Levy & Taxes (12%)</span>
            <span>${(activePlan.pricing.total * activePlan.pricing.taxRate).toFixed(2)}</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#9499a1] block uppercase tracking-wider font-light">Total Investment</span>
            <span className="text-3xl font-serif font-bold text-[#d4af37]">
              ${(activePlan.pricing.total * (1 + activePlan.pricing.taxRate)).toFixed(2)}
            </span>
          </div>

          <button
            id="btn-confirm-and-pay"
            onClick={() => onProceedToCheckout(activePlan)}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#080808] font-serif font-bold text-base shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer"
          >
            <span>Proceed to Finalize & Pay</span>
            <span className="material-symbols-outlined text-[20px]">lock</span>
          </button>
        </div>
      </div>
    </div>
  );
};
