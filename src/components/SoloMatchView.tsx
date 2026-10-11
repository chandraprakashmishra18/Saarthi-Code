import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SOLO_MATCHES } from '../data/mockData';
import { SoloMatchUser } from '../types';

interface SoloMatchViewProps {
  onBack: () => void;
  womensSafetyActive: boolean;
  onToggleSafety: () => void;
}

export const SoloMatchView: React.FC<SoloMatchViewProps> = ({
  onBack,
  womensSafetyActive,
  onToggleSafety
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const [selectedUserForChat, setSelectedUserForChat] = useState<SoloMatchUser | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [sentMessages, setSentMessages] = useState<{ [key: string]: string[] }>({});

  const filteredMatches = SOLO_MATCHES.filter(user => {
    if (womensSafetyActive && !user.isWomenSafetyVerified) return false;
    return true;
  });

  const handleConnect = (user: SoloMatchUser) => {
    if (!connectedUsers.includes(user.id)) {
      setConnectedUsers([...connectedUsers, user.id]);
    }
    setSelectedUserForChat(user);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !selectedUserForChat) return;

    const prev = sentMessages[selectedUserForChat.id] || [];
    setSentMessages({
      ...sentMessages,
      [selectedUserForChat.id]: [...prev, chatMessage]
    });
    setChatMessage('');
  };

  return (
    <div className="min-h-screen bg-transparent text-[#f5f5f5] pb-24 md:pb-16 max-w-4xl mx-auto px-4 sm:px-6 pt-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          id="btn-solomatch-back"
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-medium text-[#9499a1] hover:text-[#d4af37] transition cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Trip</span>
        </button>

        <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
          <span className="material-symbols-outlined text-[14px]">explore</span>
          Active in Jaipur
        </span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <span className="px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold uppercase tracking-wider mb-2 inline-block backdrop-blur-md">
          Cultural Companion Finder
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#f5f5f5] mb-2 tracking-tight">
          Solo Match Hub
        </h1>
        <p className="text-sm text-[#9499a1] max-w-xl font-light">
          Connect with verified independent explorers who share your fascination for folk narratives and architectural stepwells.
        </p>
      </div>

      {/* Status Controls Card */}
      <div className="p-5 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md ${
            isVisible ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40' : 'bg-white/[0.05] text-[#9499a1] border border-white/[0.08]'
          }`}>
            <span className="material-symbols-outlined text-[20px]">
              {isVisible ? 'visibility' : 'visibility_off'}
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-[#f5f5f5] block">
              Discovery Visibility: {isVisible ? 'ON (Sharing nearby)' : 'OFF (Hidden)'}
            </span>
            <span className="text-[11px] text-[#9499a1] font-light">
              Other verified solo travelers within 5km can see your shared story tags.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsVisible(!isVisible)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer backdrop-blur-md ${
              isVisible
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/30'
                : 'bg-white/[0.04] text-[#9499a1] border-white/[0.08]'
            }`}
          >
            {isVisible ? 'Visible' : 'Hidden'}
          </button>

          <button
            onClick={onToggleSafety}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer flex items-center gap-1 backdrop-blur-md ${
              womensSafetyActive
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 font-bold'
                : 'bg-white/[0.04] text-[#9499a1] border-white/[0.08] hover:text-[#f5f5f5]'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">shield</span>
            <span>Women Only</span>
          </button>
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {filteredMatches.map((user, idx) => {
          const isConnected = connectedUsers.includes(user.id);

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-5 border border-white/[0.08] hover:border-[#d4af37]/30 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Avatar & Match Score */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-[#d4af37]"
                    />
                    {user.isVerified && (
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[12px] border-2 border-[#121212]">
                        ✓
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold block backdrop-blur-md">
                      {user.matchScore}% Match
                    </span>
                    <span className="text-[10px] text-[#9499a1] mt-1 block font-light">
                      {user.distanceKm} km away
                    </span>
                  </div>
                </div>

                <h3 className="font-serif font-bold text-base text-[#f5f5f5]">
                  {user.name}, {user.age}
                </h3>
                <span className="text-xs text-[#9499a1] block mb-2 font-light">{user.currentCity}</span>
                <span className="text-[11px] font-medium text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-2.5 py-0.5 rounded-full inline-block mb-3 backdrop-blur-md">
                  {user.travelStyle}
                </span>

                {/* Mutual Stories */}
                <div className="mb-3">
                  <span className="text-[10px] font-bold text-[#9499a1] uppercase tracking-wider block mb-1">
                    Mutual Story Interests:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {user.mutualStories.map(s => (
                      <span key={s} className="text-[10px] bg-white/[0.04] backdrop-blur-md border border-white/[0.08] px-2 py-0.5 rounded-md text-[#d1d5db]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {user.interests.map(i => (
                    <span key={i} className="text-[10px] text-[#9499a1] font-light">
                      #{i}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                id={`btn-connect-${user.id}`}
                onClick={() => handleConnect(user)}
                className={`w-full py-2.5 rounded-2xl text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  isConnected
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 font-bold backdrop-blur-md'
                    : 'bg-[#d4af37] text-[#080808] font-bold hover:bg-[#e5c158] shadow-md shadow-[#d4af37]/20 active:scale-98'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isConnected ? 'chat' : 'person_add'}
                </span>
                <span>{isConnected ? 'Chat Active' : 'Connect for Chai'}</span>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Chat Drawer / Modal */}
      {selectedUserForChat && (
        <div className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-2xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
            <div className="flex items-center gap-3">
              <img
                src={selectedUserForChat.avatar}
                alt={selectedUserForChat.name}
                className="w-10 h-10 rounded-full object-cover border border-[#d4af37]"
              />
              <div>
                <h4 className="font-serif font-bold text-sm text-[#f5f5f5]">
                  Chat with {selectedUserForChat.name}
                </h4>
                <span className="text-[11px] text-emerald-400">Online • Nearby</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedUserForChat(null)}
              className="text-xs text-[#9499a1] hover:text-[#f5f5f5] cursor-pointer"
            >
              Close
            </button>
          </div>

          <div className="space-y-2 mb-4 max-h-48 overflow-y-auto text-xs">
            <div className="p-3 rounded-2xl bg-white/[0.04] backdrop-blur-md text-[#f5f5f5] max-w-sm border border-white/[0.08] leading-relaxed font-light">
              {selectedUserForChat.name}: "Namaste Aditi! Saw you are also exploring this heritage route today. Would love to swap notes on subterranean photo angles over a cup of chai!"
            </div>
            {(sentMessages[selectedUserForChat.id] || []).map((msg, i) => (
              <div key={i} className="p-3 rounded-2xl bg-[#d4af37]/15 backdrop-blur-md border border-[#d4af37]/40 text-[#d4af37] max-w-sm ml-auto text-right font-medium">
                {msg}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder={`Message ${selectedUserForChat.name}...`}
              className="flex-1 p-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl text-xs text-[#f5f5f5] placeholder:text-[#9499a1] focus:outline-none focus:border-[#d4af37]"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl bg-[#d4af37] text-[#080808] text-xs font-bold hover:bg-[#e5c158] cursor-pointer shadow-md shadow-[#d4af37]/20"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
