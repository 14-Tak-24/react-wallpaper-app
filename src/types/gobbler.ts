export interface GobblerCharacter {
  id: string;
  name: string;
  category: 'Denizens & Icons' | 'Mythic & Supernatural' | 'Couples & Collectives' | 'Visitors & Pilgrims' | 'Classic Reimagined';
  description: string;
  physicalDetails: string;
  personalityStyle: string;
  desires: string;
  favoriteThings?: string;
  backstory?: string;
  quirksSecrets?: string;
  flawsInsecurities?: string;
  fantasies?: string;
  kinks?: string;
  limits?: string;
  keywords: string[];
  avatarColor: string;
}

export interface GobblerLocation {
  id: string;
  name: string;
  type: string;
  category?: string;
  rating: number;
  priceRange: 'free' | 'low' | 'moderate' | 'high' | 'variable';
  description: string;
  atmosphere: string;
  clientele: string;
  activities: string;
  secrets: string;
  sensoryProfile?: {
    lighting: string;
    acoustics: string;
    dominantPheromones: string;
  };
}

export interface DualAnalysisNode {
  id: string;
  topic: string;
  category: 'Setting & Infrastructure' | 'Entities & Figures' | 'Venues & Nightlife' | 'Culture & Slang' | 'Food & Merchandise' | 'Myths & Lore';
  cuzznJQuote: string;
  drillBotAnalysis: string;
  systemicTags: string[];
}

export interface LexiconItem {
  term: string;
  definition: string;
  connotation?: string;
  usage?: string;
  socialCommentary?: string;
  category: 'Slang' | 'Street Names' | 'Creatures' | 'Phrases & Tropes';
}

export interface MerchItem {
  id: string;
  name: string;
  type: string;
  description: string;
  purpose: string;
  targetAudience: string;
  socialImplications: string;
  symbolism?: string;
}

export interface GobblerNarrativeDevice {
  name: string;
  concept: string;
  narrativeFunction: string;
  sociologicalAngle: string;
}
