import React, { useState } from 'react';
import { ScreenType, EmotionCategory, StoryItem, GuideProfile, TripPlan } from './types';
import { STORIES, GUIDES, INITIAL_TRIP_PLAN } from './data/mockData';
import { SplashView } from './components/SplashView';
import { EmotionPickerView } from './components/EmotionPickerView';
import { TopNav } from './components/TopNav';
import { BottomNav } from './components/BottomNav';
import { StoryDiscoveryView } from './components/StoryDiscoveryView';
import { StoryDetailView } from './components/StoryDetailView';
import { GuidesView } from './components/GuidesView';
import { GuideReelsView } from './components/GuideReelsView';
import { CollectionsView } from './components/CollectionsView';
import { TripIntakeView } from './components/TripIntakeView';
import { TripSummaryView } from './components/TripSummaryView';
import { CheckoutView } from './components/CheckoutView';
import { ActiveTripView } from './components/ActiveTripView';
import { SoloMatchView } from './components/SoloMatchView';
import { ComicJournalView } from './components/ComicJournalView';
import { StoryCreatorView } from './components/StoryCreatorView';
import { ProfileView } from './components/ProfileView';
import { SafetySOSModal } from './components/SafetySOSModal';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [selectedEmotions, setSelectedEmotions] = useState<EmotionCategory[]>(['Awed', 'Spooked']);
  const [activeStory, setActiveStory] = useState<StoryItem>(STORIES[0]);
  const [activeReelId, setActiveReelId] = useState<string>('reel-1');
  const [currentTripPlan, setCurrentTripPlan] = useState<TripPlan>(INITIAL_TRIP_PLAN);
  const [hasActiveTrip, setHasActiveTrip] = useState<boolean>(false);
  const [womensSafetyActive, setWomensSafetyActive] = useState<boolean>(true);
  const [sosModalOpen, setSosModalOpen] = useState<boolean>(false);

  // Navigation handlers
  const handleSplashContinue = (_authMode: 'google' | 'phone' | 'guest') => {
    setCurrentScreen('emotion-picker');
  };

  const handleSplashExploreDirectly = () => {
    setCurrentScreen('discover');
  };

  const handleSelectEmotions = (emotions: EmotionCategory[]) => {
    if (emotions.length > 0) {
      setSelectedEmotions(emotions);
    }
    setCurrentScreen('discover');
  };

  const handleOpenStory = (story: StoryItem) => {
    setActiveStory(story);
    setCurrentScreen('story-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookStory = (story: StoryItem) => {
    setActiveStory(story);
    setCurrentScreen('craft-story');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGuideForTrip = (guide: GuideProfile) => {
    // Customize plan with selected guide
    const updated = {
      ...currentTripPlan,
      days: currentTripPlan.days.map((d, i) => i === 0 ? {
        ...d,
        guideName: guide.name,
        guideAvatar: guide.avatar
      } : d)
    };
    setCurrentTripPlan(updated);
    setCurrentScreen('craft-story');
  };

  const handleOpenReel = (reelId: string) => {
    setActiveReelId(reelId);
    setCurrentScreen('guide-reels');
  };

  const handleGenerateTrip = (plan: TripPlan) => {
    setCurrentTripPlan(plan);
    setCurrentScreen('trip-summary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToCheckout = (plan: TripPlan) => {
    setCurrentTripPlan(plan);
    setCurrentScreen('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSuccess = () => {
    setHasActiveTrip(true);
    setCurrentScreen('active-trip');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteTrip = () => {
    setCurrentScreen('comic-journal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStoryPublished = () => {
    setCurrentScreen('discover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#1C1C1E] flex flex-col font-sans selection:bg-[#B39029] selection:text-[#FDFCF8]">
      {/* Top Header Navigation */}
      <TopNav
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        womensSafetyActive={womensSafetyActive}
        onToggleSafety={() => setWomensSafetyActive(!womensSafetyActive)}
        onOpenSOS={() => setSosModalOpen(true)}
        hasActiveTrip={hasActiveTrip}
      />

      {/* Main Screen Router */}
      <main className="flex-1 w-full">
        {currentScreen === 'splash' && (
          <SplashView
            onContinue={handleSplashContinue}
            onExploreDirectly={handleSplashExploreDirectly}
          />
        )}

        {currentScreen === 'emotion-picker' && (
          <EmotionPickerView
            onSelectEmotions={handleSelectEmotions}
            onBack={() => setCurrentScreen('splash')}
          />
        )}

        {currentScreen === 'discover' && (
          <StoryDiscoveryView
            selectedEmotions={selectedEmotions}
            onOpenStory={handleOpenStory}
            onOpenGuides={() => setCurrentScreen('guides')}
            onOpenCollections={() => setCurrentScreen('collections')}
            onStartCraftStory={() => setCurrentScreen('craft-story')}
            womensSafetyActive={womensSafetyActive}
          />
        )}

        {currentScreen === 'story-detail' && (
          <StoryDetailView
            story={activeStory}
            onBack={() => setCurrentScreen('discover')}
            onBookStory={handleBookStory}
            onOpenGuideProfile={() => setCurrentScreen('guides')}
            womensSafetyActive={womensSafetyActive}
          />
        )}

        {currentScreen === 'guides' && (
          <GuidesView
            onSelectGuideForTrip={handleSelectGuideForTrip}
            onOpenReel={handleOpenReel}
            womensSafetyActive={womensSafetyActive}
          />
        )}

        {currentScreen === 'guide-reels' && (
          <GuideReelsView
            initialReelId={activeReelId}
            onBookGuide={handleSelectGuideForTrip}
            onBack={() => setCurrentScreen('discover')}
          />
        )}

        {currentScreen === 'collections' && (
          <CollectionsView
            onOpenStory={handleOpenStory}
            onStartCraftStory={() => setCurrentScreen('craft-story')}
          />
        )}

        {currentScreen === 'craft-story' && (
          <TripIntakeView
            onGenerateTrip={handleGenerateTrip}
            onBack={() => setCurrentScreen('discover')}
            womensSafetyActive={womensSafetyActive}
            onToggleSafety={() => setWomensSafetyActive(!womensSafetyActive)}
          />
        )}

        {currentScreen === 'trip-summary' && (
          <TripSummaryView
            tripPlan={currentTripPlan}
            onProceedToCheckout={handleProceedToCheckout}
            onBack={() => setCurrentScreen('craft-story')}
          />
        )}

        {currentScreen === 'checkout' && (
          <CheckoutView
            tripPlan={currentTripPlan}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={() => setCurrentScreen('trip-summary')}
          />
        )}

        {currentScreen === 'active-trip' && (
          <ActiveTripView
            tripPlan={currentTripPlan}
            onOpenSOS={() => setSosModalOpen(true)}
            onOpenSoloMatch={() => setCurrentScreen('solo-match')}
            onCompleteTrip={handleCompleteTrip}
            womensSafetyActive={womensSafetyActive}
          />
        )}

        {currentScreen === 'solo-match' && (
          <SoloMatchView
            onBack={() => setCurrentScreen(hasActiveTrip ? 'active-trip' : 'discover')}
            womensSafetyActive={womensSafetyActive}
            onToggleSafety={() => setWomensSafetyActive(!womensSafetyActive)}
          />
        )}

        {currentScreen === 'comic-journal' && (
          <ComicJournalView
            onOpenProfile={() => setCurrentScreen('profile')}
            onBackToDiscover={() => setCurrentScreen('discover')}
          />
        )}

        {currentScreen === 'story-creator' && (
          <StoryCreatorView
            onBack={() => setCurrentScreen('discover')}
            onStoryPublished={handleStoryPublished}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileView
            onOpenStory={handleOpenStory}
            onOpenJournal={() => setCurrentScreen('comic-journal')}
            onBackToDiscover={() => setCurrentScreen('discover')}
          />
        )}
      </main>

      {/* Bottom Mobile Navigation */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        hasActiveTrip={hasActiveTrip}
      />

      {/* Global Safety & SOS Modal */}
      <SafetySOSModal
        isOpen={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
      />
    </div>
  );
}

export default App;
