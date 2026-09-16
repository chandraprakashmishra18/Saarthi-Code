import React, { useState } from 'react';
import { motion } from 'motion/react';
import { EmotionCategory } from '../types';

interface StoryCreatorViewProps {
  onBack: () => void;
  onStoryPublished: () => void;
}

export const StoryCreatorView: React.FC<StoryCreatorViewProps> = ({
  onBack,
  onStoryPublished
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [storyTitle, setStoryTitle] = useState('');
  const [storySubtitle, setStorySubtitle] = useState('');
  const [storyBody, setStoryBody] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Rajasthan');
  const [selectedEmotions, setSelectedEmotions] = useState<EmotionCategory[]>(['Awed']);
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80'
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setUploadedImages([...uploadedImages, url]);
    }
  };

  const handlePublish = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onStoryPublished();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-transparent text-[#f5f5f5] pb-24 md:pb-16 max-w-3xl mx-auto px-4 sm:px-6 pt-6">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          id="btn-creator-back"
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-medium text-[#9499a1] hover:text-[#d4af37] transition cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Cancel</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-bold text-[#d4af37]">
            Step {step} of 3
          </span>
          <div className="w-16 h-1.5 bg-white/[0.06] rounded-full overflow-hidden border border-white/[0.08]">
            <div 
              className="h-full bg-[#d4af37] transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <span className="px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-2 inline-block backdrop-blur-md">
          Storyteller Studio
        </span>
        <h1 className="text-3xl font-serif font-bold text-[#f5f5f5] mb-1 tracking-tight">
          Publish a Living Chronicle
        </h1>
        <p className="text-xs sm:text-sm text-[#9499a1] font-light">
          Share oral folklore, secret stepwells, or artisanal guild encounters with the Saarthi traveler community.
        </p>
      </div>

      <div className="bg-white/[0.03] backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/[0.08] shadow-xl space-y-6">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-5"
          >
            <h3 className="font-serif font-bold text-lg text-[#f5f5f5]">
              Step 1: Visual Artifacts & Photos
            </h3>

            {/* Drag & Drop Upload Container */}
            <label className="border border-dashed border-white/[0.15] hover:border-[#d4af37]/50 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition bg-white/[0.02] backdrop-blur-md">
              <span className="material-symbols-outlined text-4xl text-[#d4af37] mb-2">
                add_photo_alternate
              </span>
              <span className="text-sm font-semibold text-[#f5f5f5]">
                Click or Drag Photos of the Landmark
              </span>
              <span className="text-xs text-[#9499a1] mt-1 font-light">
                Supports High-Res JPG, PNG (Max 15MB)
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {/* Uploaded Thumbnails Preview */}
            <div>
              <span className="text-xs font-bold text-[#9499a1] block mb-2">
                Uploaded Media ({uploadedImages.length})
              </span>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {uploadedImages.map((img, i) => (
                  <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-white/[0.08]">
                    <img src={img} alt="Upload preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setUploadedImages(uploadedImages.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center text-[10px] cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#080808] font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#d4af37]/20 active:scale-98"
            >
              <span>Continue to Story Narrative</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h3 className="font-serif font-bold text-lg text-[#f5f5f5]">
              Step 2: The Narrative Text
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#9499a1] mb-1">
                Story Title
              </label>
              <input
                type="text"
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
                placeholder="e.g. The Sun Temple’s Mathematical Shadow"
                className="w-full p-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl text-xs sm:text-sm text-[#f5f5f5] placeholder:text-[#9499a1] focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#9499a1] mb-1">
                Hook / Subtitle
              </label>
              <input
                type="text"
                value={storySubtitle}
                onChange={(e) => setStorySubtitle(e.target.value)}
                placeholder="e.g. How 11th-century astronomers aligned stone wheels with solar solstices."
                className="w-full p-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl text-xs sm:text-sm text-[#f5f5f5] placeholder:text-[#9499a1] focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#9499a1] mb-1">
                Story Body (Oral folklore, historical nuances, sensory memories)
              </label>
              <textarea
                rows={5}
                value={storyBody}
                onChange={(e) => setStoryBody(e.target.value)}
                placeholder="Beneath the stone canopy, when the sun reaches its zenith..."
                className="w-full p-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl text-xs sm:text-sm text-[#f5f5f5] placeholder:text-[#9499a1] focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl text-xs font-medium text-[#9499a1] hover:text-[#f5f5f5] cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#080808] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#d4af37]/20"
              >
                <span>Continue to Metadata</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-5"
          >
            <h3 className="font-serif font-bold text-lg text-[#f5f5f5]">
              Step 3: Cultural Metadata & Emotions
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#9499a1] mb-1">
                Region / State
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full p-3 rounded-2xl border border-white/[0.08] bg-[#141414]/90 backdrop-blur-xl text-xs text-[#f5f5f5] focus:outline-none focus:border-[#d4af37]"
              >
                <option value="Rajasthan">Rajasthan</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Kerala">Kerala</option>
                <option value="Delhi">Delhi</option>
                <option value="Himachal">Himachal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#9499a1] mb-2">
                Emotion Resonance Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {(['Awed', 'Spooked', 'Enlightened', 'Connected', 'Adventurous', 'Nostalgic'] as EmotionCategory[]).map(e => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => {
                      if (selectedEmotions.includes(e)) {
                        setSelectedEmotions(selectedEmotions.filter(item => item !== e));
                      } else {
                        setSelectedEmotions([...selectedEmotions, e]);
                      }
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer backdrop-blur-md ${
                      selectedEmotions.includes(e)
                        ? 'bg-[#d4af37]/15 border border-[#d4af37] text-[#d4af37] font-bold shadow-xs'
                        : 'bg-white/[0.04] border border-white/[0.08] text-[#9499a1] hover:text-[#f5f5f5]'
                    }`}
                  >
                    #{e}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-white/[0.08]">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl text-xs font-medium text-[#9499a1] hover:text-[#f5f5f5] cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handlePublish}
                disabled={isSubmitting}
                className="flex-1 py-3.5 rounded-2xl bg-[#d4af37] text-[#080808] font-serif font-bold text-sm hover:bg-[#e5c158] flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20 cursor-pointer active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                    <span>Publishing to Heritage Archive...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">publish</span>
                    <span>Publish Living Story</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
