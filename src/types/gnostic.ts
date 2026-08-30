export type ContentTab =
  | 'portfolio'
  | 'poster'
  | 'video-script'
  | 'case-story'
  | 'character-bible'
  | 'templates'
  | 'registry'
  | 'presentation'
  | 'export';

export interface CharacterEntity {
  id: string;
  name: string;
  title: string;
  archetype: string;
  age: number;
  heritage: string;
  skinTone: string;
  hair: string;
  aesthetic: string;
  visualSignature: string;
  signaturePhrase: string;
  voiceStyle: string;
  depotAlignment: string;
  mirrorState: 'Unveiled' | 'Gilded' | 'Active' | 'Shattered';
  roleInDuoOrSystem: string;
  coreLens: string;
  safetyStatus: 'Safe Adult Verified' | 'Flagged & Remediated' | 'Audited Compliant';
  bio: string;
  puppetSpecs: {
    faceStyle: string;
    materials: string;
    armature: string;
    lighting: string;
    attire: string;
  };
  brandLogo: {
    iconName: string;
    tagline: string;
    colorScheme: {
      primary: string;
      accent: string;
      bg: string;
    };
  };
  promptKit: {
    cinematicPrompt: string;
    muppetPrompt: string;
    klingMotionPrompt: string;
  };
}

export interface CaseFile {
  id: string;
  caseNumber: string;
  title: string;
  synopsis: string;
  leadInvestigator: string;
  technicalDiscovery: string;
  humanStakes: string;
  dialogueExcerpts: {
    speaker: string;
    line: string;
  }[];
  verdictAndConsequence: string;
  moralInsight: string;
}

export interface SeasonArcEpisode {
  episodeNumber: number;
  title: string;
  phase: string;
  maryAction: string;
  macAction: string;
  philosophicalConflict: string;
  techSystemExposed: string;
}

export interface PresentationSlide {
  id: number;
  title: string;
  subtitle: string;
  pillar: string;
  contentBullets: string[];
  quote: string;
  speaker: string;
}
