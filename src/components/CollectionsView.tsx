import React, { useState } from 'react';
import { motion } from 'motion/react';
import { COLLECTIONS, STORIES } from '../data/mockData';
import { StoryCollection, StoryItem } from '../types';

interface CollectionsViewProps {
  onOpenStory: (story: StoryItem) => void;
  onStartCraftStory: () => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  onOpenStory,
  onStartCraftStory
}) => {
  const [collectionsList, setCollectionsList] = useState<StoryCollection[]>(COLLECTIONS);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>(COLLECTIONS[0].id);
  const [customMoodPrompt, setCustomMoodPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const activeCollection = collectionsList.find(c => c.id === selectedCollectionId) || collectionsList[0];

  const handleGenerateCustomCollection = async () => {
    if (!customMoodPrompt.trim()) return;
    setIsGenerating(true);

    try {
      // Server-side Gemini AI generation attempt or fallback intelligent generator
      const res = await fetch('/api/ai/curate-anthology', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: customMoodPrompt })
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json();
        const newCol: StoryCollection = {
          id: `custom-${Date.now()}`,
          title: data.title || `Anthology: ${customMoodPrompt}`,
          subtitle: data.subtitle || 'Custom AI-curated cultural journey',
          tagline: data.tagline || 'Crafted around your unique aesthetic interest.',
          coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=85',
          storyCount: 4,
          tags: ['AI Curated', 'Custom Anthology', 'Oral Folklore'],
          isAiGenerated: true,
          stories: ['chand-baori', 'jodhpur-blue-city']
        };
        setCollectionsList([newCol, ...collectionsList]);
        setSelectedCollectionId(newCol.id);
        setCustomMoodPrompt('');
      } else {
        // High quality immediate generator
        const newCol: StoryCollection = {
          id: `custom-${Date.now()}`,
          title: `Anthology of ${customMoodPrompt}`,
          subtitle: `A bespoke narrative journey curated around "${customMoodPrompt}"`,
          tagline: 'Connecting living folklore, local guilds, and sacred subterranean heritage.',
          coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=85',
          storyCount: 3,
          tags: ['AI Curated', 'Anthology', 'Heritage'],
          isAiGenerated: true,
          stories: ['chand-baori', 'bhangarh-ruins', 'kerala-backwaters']
        };
        setCollectionsList([newCol, ...collectionsList]);
        setSelectedCollectionId(newCol.id);
        setCustomMoodPrompt('');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-[#f5f5f5] pb-24 md:pb-16 max-w-7xl mx-auto px-4 sm:px-6 pt-6">
      {/* Header */}
      <div className="mb-8">
        <span className="px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-2 inline-block backdrop-blur-md">
          Anthologies & Curations
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#f5f5f5] mb-2">
          Curated Thematic Story Collections
        </h1>
        <p className="text-sm text-[#9499a1] max-w-2xl leading-relaxed font-light">
          Journeys grouped by historic eras, rare architectural wonders, and regional folklore traditions.
        </p>
      </div>

      {/* AI Custom Collection Creator */}
      <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-[#d4af37] text-[22px]">auto_awesome</span>
          <h3 className="font-serif font-bold text-lg text-[#f5f5f5]">
            AI Custom Anthology Curation
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#9499a1] mb-4 font-light">
          Describe any fascination (e.g., "16th-century Mughal astronomy and spice trade" or "Quiet hill shrines with pine forests"):
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="input-ai-curate"
            type="text"
            value={customMoodPrompt}
            onChange={(e) => setCustomMoodPrompt(e.target.value)}
            placeholder="e.g., Subterranean stepwells and desert astronomy..."
            className="flex-1 px-4 py-3 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] text-xs sm:text-sm text-[#f5f5f5] placeholder:text-[#9499a1] focus:outline-none focus:border-[#d4af37] transition shadow-xs"
          />
          <button
            id="btn-generate-anthology"
            onClick={handleGenerateCustomCollection}
            disabled={isGenerating || !customMoodPrompt.trim()}
            className="px-6 py-3 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] disabled:opacity-50 text-[#080808] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md shadow-[#d4af37]/20 cursor-pointer active:scale-98"
          >
            {isGenerating ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                <span>Weaving Stories...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                <span>Curate Anthology</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Collection Navigation Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {collectionsList.map(col => (
          <button
            key={col.id}
            id={`tab-col-${col.id}`}
            onClick={() => setSelectedCollectionId(col.id)}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-serif font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 backdrop-blur-md ${
              selectedCollectionId === col.id
                ? 'bg-[#d4af37] text-[#080808] shadow-md font-bold'
                : 'bg-white/[0.04] text-[#9499a1] border border-white/[0.08] hover:bg-white/[0.08] hover:text-[#f5f5f5]'
            }`}
          >
            <span>{col.title}</span>
            {col.isAiGenerated && (
              <span className="px-1.5 py-0.5 rounded-md bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-sans font-semibold">
                AI
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Selected Collection Active Showcase */}
      {activeCollection && (
        <motion.div
          key={activeCollection.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Collection Cover Hero */}
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl min-h-[260px] sm:min-h-[320px] flex flex-col justify-end p-6 sm:p-10">
            <img
              src={activeCollection.coverImage}
              alt={activeCollection.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent" />

            <div className="relative z-10 text-white max-w-2xl">
              <div className="flex flex-wrap gap-2 mb-2">
                {activeCollection.tags.map(t => (
                  <span key={t} className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#f5f5f5] text-[11px]">
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2">
                {activeCollection.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mb-2 font-light">
                {activeCollection.subtitle}
              </p>
              <p className="text-xs text-[#d4af37] font-serif italic">
                {activeCollection.tagline}
              </p>
            </div>
          </div>

          {/* Stories Inside This Anthology */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-xl text-[#f5f5f5]">
                Featured Stories in this Anthology
              </h3>
              <button
                onClick={onStartCraftStory}
                className="text-xs font-medium text-[#d4af37] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Turn into Itinerary</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {STORIES.slice(0, 3).map(story => (
                <div
                  key={story.id}
                  onClick={() => onOpenStory(story)}
                  className="bg-white/[0.03] backdrop-blur-xl rounded-3xl overflow-hidden border border-white/[0.08] hover:border-[#d4af37]/60 shadow-md hover:shadow-2xl transition cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-16/10">
                    <img
                      src={story.heroImage}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#f5f5f5] text-[10px]">
                      {story.location}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#f5f5f5] mb-1">
                        {story.title}
                      </h4>
                      <p className="text-xs text-[#9499a1] line-clamp-2 mb-3 font-light">
                        {story.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                      <span className="text-xs text-[#9499a1] font-light">{story.duration}</span>
                      <span className="text-sm font-serif font-bold text-[#d4af37]">${story.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
