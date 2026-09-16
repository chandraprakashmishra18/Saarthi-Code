import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TripPlan } from '../types';

interface CheckoutViewProps {
  tripPlan: TripPlan;
  onPaymentSuccess: () => void;
  onBack: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  tripPlan,
  onPaymentSuccess,
  onBack
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [travelerName, setTravelerName] = useState('Elena Rostova');
  const [emergencyPhone, setEmergencyPhone] = useState('+91 98765 43210');
  const [isProcessing, setIsProcessing] = useState(false);

  const totalWithTax = (tripPlan.pricing.total * (1 + tripPlan.pricing.taxRate)).toFixed(2);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-transparent text-[#f5f5f5] pb-24 md:pb-16 max-w-3xl mx-auto px-4 sm:px-6 pt-6">
      {/* Top Back */}
      <button
        id="btn-checkout-back"
        onClick={onBack}
        className="flex items-center gap-1 text-xs font-medium text-[#9499a1] hover:text-[#d4af37] mb-6 transition cursor-pointer"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        <span>Review Itinerary</span>
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold text-[#f5f5f5] mb-1 tracking-tight">
          Finalize Your Story Journey
        </h1>
        <p className="text-xs sm:text-sm text-[#9499a1] font-light">
          Guaranteed reservations with verified local guides and safe solo protocols.
        </p>
      </div>

      <div className="space-y-6">
        {/* Trip Overview Box */}
        <div className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-xl flex items-center justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-base text-[#f5f5f5]">
              {tripPlan.title}
            </h3>
            <span className="text-xs text-[#9499a1] font-light">
              {tripPlan.durationDays} Days • {tripPlan.startDate} to {tripPlan.endDate}
            </span>
          </div>
          <span className="text-2xl font-serif font-bold text-[#d4af37]">
            ${totalWithTax}
          </span>
        </div>

        {/* Traveler & Emergency Details */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-xl">
          <h3 className="font-serif font-bold text-base text-[#f5f5f5] mb-4">
            Traveler & Safety Contact
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#9499a1] mb-1">
                Primary Traveler Name
              </label>
              <input
                type="text"
                value={travelerName}
                onChange={(e) => setTravelerName(e.target.value)}
                className="w-full p-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl text-xs text-[#f5f5f5] focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#9499a1] mb-1">
                Emergency SOS Contact Number
              </label>
              <input
                type="text"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                className="w-full p-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl text-xs text-[#f5f5f5] focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-xl">
          <h3 className="font-serif font-bold text-base text-[#f5f5f5] mb-4">
            Payment Method
          </h3>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { id: 'card', label: 'Credit / Debit Card', icon: 'credit_card' },
              { id: 'upi', label: 'UPI / GPay / PhonePe', icon: 'qr_code_2' },
              { id: 'netbanking', label: 'Net Banking', icon: 'account_balance' }
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setPaymentMethod(m.id as any)}
                className={`p-3.5 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center gap-1.5 backdrop-blur-md ${
                  paymentMethod === m.id
                    ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37] font-semibold ring-2 ring-[#d4af37]/30 shadow-md'
                    : 'border-white/[0.08] bg-white/[0.04] text-[#9499a1] hover:bg-white/[0.08] hover:text-[#f5f5f5]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{m.icon}</span>
                <span className="text-[11px] font-medium">{m.label}</span>
              </button>
            ))}
          </div>

          {paymentMethod === 'card' && (
            <div className="space-y-3 pt-2">
              <input
                type="text"
                placeholder="Card Number (•••• •••• •••• 4242)"
                defaultValue="4242 •••• •••• 4242"
                className="w-full p-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl text-xs text-[#f5f5f5] focus:outline-none focus:border-[#d4af37]"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM / YY"
                  defaultValue="12/28"
                  className="p-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl text-xs text-[#f5f5f5] focus:outline-none focus:border-[#d4af37]"
                />
                <input
                  type="password"
                  placeholder="CVV"
                  defaultValue="888"
                  className="p-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl text-xs text-[#f5f5f5] focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Safety & Cancellation Guarantees */}
        <div className="p-4 rounded-2xl bg-emerald-950/20 backdrop-blur-xl border border-emerald-500/30 flex items-center gap-3 text-xs text-[#9499a1]">
          <span className="material-symbols-outlined text-emerald-400 text-[24px]">verified_user</span>
          <div>
            <span className="font-bold text-[#f5f5f5] block">Saarthi Safe Traveler Guarantee</span>
            <span className="font-light">100% refund up to 24 hours prior. 24/7 Rapid SOS and Live Guide Escort protocol.</span>
          </div>
        </div>

        {/* Pay CTA */}
        <button
          id="btn-complete-booking"
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full py-4 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#080808] font-serif font-bold text-base shadow-xl shadow-[#d4af37]/20 flex items-center justify-center gap-2 transition active:scale-[0.99] cursor-pointer"
        >
          {isProcessing ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
              <span>Securing Journey & Notifying Guide...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>Confirm & Activate Trip (${totalWithTax})</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
