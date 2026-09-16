export type ScreenType = 
  | 'splash'
  | 'emotion-picker'
  | 'discover'
  | 'story-detail'
  | 'guides'
  | 'guide-reels'
  | 'collections'
  | 'craft-story'
  | 'trip-summary'
  | 'checkout'
  | 'active-trip'
  | 'solo-match'
  | 'comic-journal'
  | 'story-creator'
  | 'profile';

export type EmotionCategory = 
  | 'Awed' 
  | 'Spooked' 
  | 'Enlightened' 
  | 'Connected' 
  | 'Adventurous' 
  | 'Nostalgic';

export interface EmotionOption {
  id: EmotionCategory;
  label: string;
  subtext: string;
  icon: string;
  image: string;
  color: string;
}

export interface StorySight {
  title: string;
  description: string;
  image: string;
}

export interface StoryTimelineStop {
  time: string;
  title: string;
  description: string;
  icon: string;
}

export interface StoryItem {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  state: string;
  category: 'haunted' | 'historical' | 'offbeat' | 'nature' | 'culinary' | 'spiritual';
  emotionTags: EmotionCategory[];
  heroImage: string;
  rating: number;
  reviewsCount: number;
  duration: string;
  groupSize: string;
  languages: string[];
  price: number;
  authorGuide: {
    name: string;
    title: string;
    avatar: string;
    badge: string;
    rating: number;
  };
  dropCapStory: {
    dropLetter: string;
    firstParagraph: string;
    secondParagraph: string;
    quote: string;
  };
  sights: StorySight[];
  timeline: StoryTimelineStop[];
  inclusions: string[];
  audioPreviewUrl?: string;
}

export interface GuideProfile {
  id: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  languages: string[];
  specialty: string;
  bio: string;
  badges: string[];
  pricePerDay: number;
  reelCount: number;
  hasReel: boolean;
  reels: GuideReel[];
}

export interface GuideReel {
  id: string;
  guideId: string;
  guideName: string;
  guideAvatar: string;
  title: string;
  location: string;
  quote: string;
  image: string;
  likes: number;
  tags: string[];
  duration: string;
}

export interface StoryCollection {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  coverImage: string;
  storyCount: number;
  tags: string[];
  isAiGenerated?: boolean;
  stories: string[]; // story IDs
}

export interface TripPlan {
  id: string;
  title: string;
  region: string;
  durationDays: number;
  companion: 'solo' | 'couple' | 'family' | 'friends';
  pace: 'relaxed' | 'moderate' | 'intense';
  budgetLevel: 'modest' | 'balanced' | 'luxury';
  womensSafetyMode: boolean;
  startDate: string;
  endDate: string;
  days: {
    dayNumber: number;
    title: string;
    location: string;
    guideName: string;
    guideAvatar: string;
    price: number;
    description: string;
    image: string;
    time: string;
    includedActivity: string;
  }[];
  pricing: {
    guideFee: number;
    heritageStays: number;
    storyCab: number;
    heritagePasses: number;
    taxRate: number;
    total: number;
  };
}

export interface SoloMatchUser {
  id: string;
  name: string;
  age: number;
  location: string;
  currentCity: string;
  avatar: string;
  isVerified: boolean;
  isWomenSafetyVerified: boolean;
  mutualStories: string[];
  interests: string[];
  travelStyle: string;
  matchScore: number;
  distanceKm: number;
}

export interface BadgeItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  description: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  rarity: 'Common' | 'Rare' | 'Legendary';
}

export interface ComicPanel {
  panelNumber: number;
  title: string;
  caption: string;
  dialogue: string;
  speaker: string;
  image: string;
  timeOfDay: string;
}

export interface ComicJournal {
  id: string;
  tripTitle: string;
  date: string;
  location: string;
  travelerName: string;
  badgesEarned: BadgeItem[];
  panels: ComicPanel[];
  guideQuote: string;
  personalNotes: string;
}
