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
    <div className="min-h-screen bg-[#FDFCF8] text-[#1C1C1E] flex flex-col justify-between p-6 sm:p-8 max-w-4xl mx-auto">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <button
            id="btn-emotion-back"
            onClick={onBack}
            className="w-10 h-10 rounded border border-[rgba(28,28,30,0.12)] bg-white flex items-center justify-center text-[#1C1C1E] hover:border-[#B39029] transition cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[rgba(28,28,30,0.6)] font-medium">Step 1 of 2</span>
            <div className="w-12 h-1.5 bg-[rgba(28,28,30,0.1)] rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-[#B39029] rounded-full" />
            </div>
          </div>

          <button
            id="btn-emotion-skip"
            onClick={() => onSelectEmotions([])}
            className="font-mono text-[11px] uppercase tracking-wider text-[rgba(28,28,30,0.6)] hover:text-[#B39029] font-medium transition cursor-pointer"
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
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] px-3 py-1 bg-[#FDFCF8] border border-[rgba(28,28,30,0.12)] text-[#B39029] rounded font-medium inline-block mb-3">
            Emotional Curation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1C1E] tracking-tight mb-2 font-semibold">
            How do you want to feel?
          </h2>
          <p className="text-sm sm:text-base text-[rgba(28,28,30,0.65)] max-w-xl leading-relaxed font-normal">
            Select one or more emotional states. Saarthi will curate oral legends, subterranean walks, and verified historians tailored to your mood.
          </p>
        </motion.div>
      </div>

      {/* Emotion Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {EMOTIONS.map((emotion, idx) => {
          const isSelected = selectedEmotions.includes(emotion.id);

          return (
            <motion.div
              key={emotion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => toggleEmotion(emotion.id)}
              id={`emotion-card-${emotion.id.toLowerCase()}`}
              className={`relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 min-h-[180px] flex flex-col justify-end p-5 ${
                isSelected
                  ? 'border-[#B39029] ring-2 ring-[#B39029]/30 shadow-md bg-white'
                  : 'border-[rgba(28,28,30,0.1)] hover:border-[rgba(28,28,30,0.3)] bg-white shadow-2xs'
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
                    ? 'bg-gradient-to-t from-black/85 via-black/45 to-black/10' 
                    : 'bg-gradient-to-t from-black/80 via-black/40 to-transparent hover:from-black/70'
                }`} 
              />

              {/* Selection Checkmark Badge */}
              <div className="absolute top-3.5 right-3.5 z-10">
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#B39029] text-white shadow-xs font-bold'
                      : 'bg-black/40 text-white/70 border border-white/30 backdrop-blur-xs'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {isSelected ? 'check' : 'add'}
                  </span>
                </div>
              </div>

              {/* Icon & Details */}
              <div className="relative z-10 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[20px] text-[#B39029]">
                    {emotion.icon}
                  </span>
                  <h3 className="text-2xl font-serif text-white tracking-wide font-medium">
                    {emotion.label}
                  </h3>
                </div>
                <p className="text-xs text-white/80 leading-relaxed font-light">
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
        className="pt-6 border-t border-[rgba(28,28,30,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 mt-6"
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[rgba(28,28,30,0.6)] uppercase tracking-wider">Selected:</span>
          <div className="flex flex-wrap gap-1.5">
            {selectedEmotions.map(e => (
              <span 
                key={e} 
                className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-[#faf8f2] border border-[rgba(28,28,30,0.12)] text-[#B39029] font-medium"
              >
                #{e}
              </span>
            ))}
          </div>
        </div>

        <button
          id="btn-emotion-continue"
          onClick={handleContinue}
          className="w-full sm:w-auto px-8 h-12 rounded bg-[#1C1C1E] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-black transition cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <span>Curate Cultural Stories</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </motion.div>
    </div>
  );
};
