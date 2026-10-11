import React, { useState } from 'react';
import { motion } from 'motion/react';
import { EMOTIONS } from '../data/mockData';
import { EmotionCategory } from '../types';

interface EmotionPickerViewProps {
  onSelectEmotions: (selected: EmotionCategory[]) => void;
  onBack: () => void;
}

export const EmotionPickerView: React.FC<EmotionPickerViewProps> = ({ onSelectEmotions, onBack }) => {
  const [selectedEmotions, setSelectedEmotions] = useState<EmotionCategory[]>(['Awed', 'Spooked']);

  const toggleEmotion = (id: EmotionCategory) => {
    if (selectedEmotions.includes(id)) {
      if (selectedEmotions.length > 1) {
        setSelectedEmotions(selectedEmotions.filter(e => e !== id));
      }
    } else {
      setSelectedEmotions([...selectedEmotions, id]);
    }
  };

  const handleContinue = () => {
    onSelectEmotions(selectedEmotions);
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col justify-between p-6 sm:p-8 max-w-5xl mx-auto">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <button
            id="btn-emotion-back"
            onClick={onBack}
            className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] hover:border-amber-400/50 flex items-center justify-center text-slate-200 hover:text-white transition cursor-pointer shadow-md"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-sky-400 font-semibold">Step 1 of 2</span>
            <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-gradient-to-r from-sky-400 to-amber-400 rounded-full" />
            </div>
          </div>

          <button
            id="btn-emotion-skip"
            onClick={() => onSelectEmotions([])}
            className="font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-amber-300 font-semibold transition cursor-pointer py-1 px-2.5 rounded-lg hover:bg-white/[0.04]"
          >
            Skip for now
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1 bg-amber-500/15 border border-amber-400/30 text-amber-300 rounded-lg font-semibold inline-block mb-3">
            Resonance Alignment
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight mb-2.5 font-bold">
            How do you want to feel?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
            Select one or more emotional states. Saarthi will curate oral legends, subterranean walks, and verified historians tailored to your mood.
          </p>
        </motion.div>
      </div>

      {/* Emotion Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-4">
        {EMOTIONS.map((emotion, idx) => {
          const isSelected = selectedEmotions.includes(emotion.id);

          return (
            <motion.div
              key={emotion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => toggleEmotion(emotion.id)}
              id={`emotion-card-${emotion.id.toLowerCase()}`}
              className={`relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 min-h-[190px] flex flex-col justify-end p-5 ${
                isSelected
                  ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-xl shadow-amber-950/40 bg-[#0F172A]'
                  : 'border-white/10 hover:border-white/25 bg-[#0A0E1A] shadow-md'
              }`}
            >
              {/* Background Photo */}
              <img
                src={emotion.image}
                alt={emotion.label}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Gradient Overlay */}
              <div 
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isSelected 
                    ? 'bg-gradient-to-t from-[#070A12] via-[#070A12]/60 to-black/30' 
                    : 'bg-gradient-to-t from-[#070A12] via-[#070A12]/50 to-transparent hover:from-[#070A12]/80'
                }`} 
              />

              {/* Selection Checkmark Badge */}
              <div className="absolute top-3.5 right-3.5 z-10">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                      : 'bg-black/50 text-white/80 border border-white/20 backdrop-blur-md'
                  }`}
                >
                  <span className="material-symbols-outlined text-[17px]">
                    {isSelected ? 'check' : 'add'}
                  </span>
                </div>
              </div>

              {/* Icon & Details */}
              <div className="relative z-10 text-white">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="material-symbols-outlined text-[22px] text-amber-400">
                    {emotion.icon}
                  </span>
                  <h3 className="text-2xl font-serif text-white tracking-wide font-bold">
                    {emotion.label}
                  </h3>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  {emotion.subtext}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6"
      >
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs text-slate-400 uppercase tracking-wider font-medium">Selected:</span>
          <div className="flex flex-wrap gap-2">
            {selectedEmotions.map(e => (
              <span 
                key={e} 
                className="font-mono text-xs px-3 py-1 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 font-semibold"
              >
                #{e}
              </span>
            ))}
          </div>
        </div>

        <button
          id="btn-emotion-continue"
          onClick={handleContinue}
          className="w-full sm:w-auto px-8 h-12 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2.5 transition cursor-pointer shadow-lg shadow-amber-950/50 active:scale-[0.99]"
        >
          <span>Curate Cultural Stories</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </motion.div>
    </div>
  );
};
