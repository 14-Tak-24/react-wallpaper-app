import { useState, useMemo } from 'react';
import {
  Mic,
  Image as ImageIcon,
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  Settings,
  Sliders,
  Sparkles,
  Layers,
  Monitor,
  Clock,
  ChevronRight,
  X,
  Plus,
  Trash2,
  Edit,
  Copy,
  Check,
  Info,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { DesktopPictureAsset } from '../types';

// Types for audio-wallpaper experience
export interface AudioWallpaperPair {
  id: string;
  wallpaper: DesktopPictureAsset;
  audioTrack: {
    id: string;
    title: string;
    duration: string;
    type: 'voiceover' | 'ambient' | 'music' | 'custom-clone';
    audioUrl: string;
    voiceClone?: {
      originalVoice: string;
      cloneAccuracy: number;
    };
  };
  customDescription?: string;
  tags: string[];
  createdAt: string;
}

export interface ExperiencePreset {
  id: string;
  name: string;
  description: string;
  pairs: AudioWallpaperPair[];
  theme: 'productivity' | 'relaxation' | 'creative' | 'focus' | 'cinematic';
  icon: React.ReactNode;
}

// Sample data
const SAMPLE_PRESETS: ExperiencePreset[] = [
  {
    id: 'preset-001',
    name: 'Deep Work Flow',
    description: 'Minimalist wallpapers with focus-enhancing ambient soundscapes',
    theme: 'focus',
    icon: <Monitor className="w-5 h-5" />,
    pairs: []
  },
  {
    id: 'preset-002',
    name: 'Creative Inspiration',
    description: 'Abstract art paired with motivational voiceovers and gentle music',
    theme: 'creative',
    icon: <Sparkles className="w-5 h-5" />,
    pairs: []
  },
  {
    id: 'preset-003',
    name: 'Evening Wind Down',
    description: 'Calming nature scenes with soothing ambient sounds and narration',
    theme: 'relaxation',
    icon: <Layers className="w-5 h-5" />,
    pairs: []
  }
];

const AUDIO_TRACKS = [
  {
    id: 'audio-001',
    title: 'Focus Breathing Guide',
    duration: '5:00',
    type: 'voiceover' as const,
    audioUrl: '/audio/focus-breathing.mp3',
    voiceClone: {
      originalVoice: 'Calm Guide',
      cloneAccuracy: 98
    }
  },
  {
    id: 'audio-002',
    title: 'Abstract Thoughts Monologue',
    duration: '3:30',
    type: 'custom-clone' as const,
    audioUrl: '/audio/abstract-monologue.mp3',
    voiceClone: {
      originalVoice: 'Creative Director',
      cloneAccuracy: 95
    }
  },
  {
    id: 'audio-003',
    title: 'Nature Ambient Layer',
    duration: '10:00',
    type: 'ambient' as const,
    audioUrl: '/audio/nature-ambient.mp3'
  },
  {
    id: 'audio-004',
    title: 'Cinematic Piano',
    duration: '4:15',
    type: 'music' as const,
    audioUrl: '/audio/cinematic-piano.mp3'
  }
];

export function AudioWallpaperExperience({ wallpapers }: { wallpapers: DesktopPictureAsset[] }) {
  const [activePreset, setActivePreset] = useState<ExperiencePreset | null>(null);
  const [customPairs, setCustomPairs] = useState<AudioWallpaperPair[]>([]);
  const [selectedPair, setSelectedPair] = useState<AudioWallpaperPair | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Filter wallpapers suitable for audio pairing
  const suitableWallpapers = useMemo(() => {
    return wallpapers.filter(w => 
      w.assetType === 'Abstract & Graphic' || 
      w.assetType === 'Nature & Landscape' ||
      w.assetType === 'Studio & Metallic'
    ).slice(0, 12);
  }, [wallpapers]);

  const handleCreatePair = (wallpaper: DesktopPictureAsset, audioTrack: typeof AUDIO_TRACKS[0]) => {
    const newPair: AudioWallpaperPair = {
      id: `pair-${Date.now()}`,
      wallpaper,
      audioTrack,
      tags: ['custom'],
      createdAt: new Date().toISOString()
    };
    setCustomPairs([...customPairs, newPair]);
    setSelectedPair(newPair);
    setShowCreateModal(false);
  };

  const handleDeletePair = (pairId: string) => {
    setCustomPairs(customPairs.filter(p => p.id !== pairId));
    if (selectedPair?.id === pairId) {
      setSelectedPair(customPairs.find(p => p.id !== pairId) || null);
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const pairs = activePreset?.pairs.length ? activePreset.pairs : customPairs;
    if (pairs.length === 0) return;
    
    if (isShuffleOn) {
      const randomIndex = Math.floor(Math.random() * pairs.length);
      setCurrentIndex(randomIndex);
    } else {
      setCurrentIndex((currentIndex + 1) % pairs.length);
    }
  };

  const handlePrevious = () => {
    const pairs = activePreset?.pairs.length ? activePreset.pairs : customPairs;
    if (pairs.length === 0) return;
    
    setCurrentIndex((currentIndex - 1 + pairs.length) % pairs.length);
  };

  const currentPair = (activePreset?.pairs.length ? activePreset.pairs : customPairs)[currentIndex] || selectedPair;

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl border border-[#C5A36A]/30 bg-gradient-to-br from-[#120D08] via-[#0E0E0E] to-[#080808] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A36A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A36A]/40 bg-[#C5A36A]/10 text-xs font-mono-code text-[#C5A36A]">
            <Mic className="w-3.5 h-3.5" />
            <ImageIcon className="w-3.5 h-3.5" />
            <span>MULTIMEDIA WALLPAPER EXPERIENCE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-light text-white leading-tight">
            Audio-Wallpaper Synthesis
          </h1>

          <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed max-w-3xl">
            Pair stunning macOS wallpapers with custom voice clones, ambient soundscapes, and music. Create immersive multimedia experiences for focus, creativity, or relaxation.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono-code">
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-white/80">
              <ImageIcon className="w-3 h-3 inline mr-1" /> {suitableWallpapers.length} Wallpapers
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[#C5A36A]">
              <Mic className="w-3 h-3 inline mr-1" /> {AUDIO_TRACKS.length} Audio Tracks
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-emerald-400">
              <Sparkles className="w-3 h-3 inline mr-1" /> AI Voice Cloning
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-rose-400">
              <Layers className="w-3 h-3 inline mr-1" /> Immersive Experience
            </span>
          </div>
        </div>
      </div>

      {/* Experience Presets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SAMPLE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => setActivePreset(preset)}
            className={`p-5 rounded-2xl border transition-all text-left ${
              activePreset?.id === preset.id
                ? 'border-[#C5A36A] bg-gradient-to-br from-[#161410] to-[#0E0E0E] shadow-[0_0_20px_rgba(197,163,106,0.2)]'
                : 'border-white/15 bg-[#0E0E0E] hover:border-white/25'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A36A]/10 flex items-center justify-center text-[#C5A36A]">
                {preset.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white font-serif-luxury">{preset.name}</h3>
                <p className="text-[10px] text-white/50 capitalize">{preset.theme}</p>
              </div>
            </div>
            <p className="text-xs text-white/60 line-clamp-2">{preset.description}</p>
          </button>
        ))}

        <button
          onClick={() => setShowCreateModal(true)}
          className="p-5 rounded-2xl border border-dashed border-white/20 bg-[#0E0E0E] hover:border-[#C5A36A]/50 hover:bg-[#161410] transition-all text-left group"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-[#C5A36A] group-hover:bg-[#C5A36A]/10 transition-all">
              <Plus className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white font-serif-luxury">Create Custom Pair</h3>
              <p className="text-[10px] text-white/50">Build your own</p>
            </div>
          </div>
          <p className="text-xs text-white/60">Combine any wallpaper with audio tracks or voice clones</p>
        </button>
      </div>

      {/* Main Experience Player */}
      {currentPair && (
        <div className={`rounded-3xl border border-white/15 bg-[#0E0E0E] overflow-hidden transition-all ${
          isFullscreen ? 'fixed inset-4 z-50 rounded-2xl' : ''
        }`}>
          {/* Visual Display */}
          <div className="relative aspect-video bg-black">
            {/* Wallpaper Preview */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0E0E0E] to-[#050505] flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 rounded-2xl bg-[#C5A36A]/10 border border-[#C5A36A]/30 flex items-center justify-center mx-auto">
                  <ImageIcon className="w-12 h-12 text-[#C5A36A]/40" />
                </div>
                <div>
                  <h3 className="text-lg font-serif-luxury font-semibold text-white">
                    {currentPair.wallpaper.desktopPictureId}
                  </h3>
                  <p className="text-xs text-white/50">{currentPair.wallpaper.category}</p>
                </div>
              </div>
            </div>

            {/* Audio Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Mic className="w-4 h-4 text-[#C5A36A]" />
                    <h4 className="text-sm font-semibold text-white truncate">{currentPair.audioTrack.title}</h4>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/60">
                    <span className="capitalize">{currentPair.audioTrack.type}</span>
                    <span>•</span>
                    <span>{currentPair.audioTrack.duration}</span>
                    {currentPair.audioTrack.voiceClone && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-400">{currentPair.audioTrack.voiceClone.cloneAccuracy}% Clone Accuracy</span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4 text-white" />
                  ) : (
                    <Maximize2 className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#C5A36A] w-1/3 transition-all" />
              </div>
            </div>
          </div>

          {/* Player Controls */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between gap-4">
              {/* Main Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevious}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <SkipBack className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={togglePlayback}
                  className="w-12 h-12 rounded-full bg-[#C5A36A] flex items-center justify-center text-black hover:bg-[#C5A36A]/90 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <SkipForward className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Secondary Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsShuffleOn(!isShuffleOn)}
                  className={`p-2 rounded-lg transition-colors ${
                    isShuffleOn ? 'bg-[#C5A36A]/20 text-[#C5A36A]' : 'bg-white/5 hover:bg-white/10 text-white/60'
                  }`}
                >
                  <Shuffle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsRepeatOn(!isRepeatOn)}
                  className={`p-2 rounded-lg transition-colors ${
                    isRepeatOn ? 'bg-[#C5A36A]/20 text-[#C5A36A]' : 'bg-white/5 hover:bg-white/10 text-white/60'
                  }`}
                >
                  <Repeat className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-white/10 mx-1" />
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>
                <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C5A36A]" style={{ width: `${volume}%` }} />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <Heart className="w-4 h-4 text-white/60" />
                </button>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Settings className="w-4 h-4 text-white/60" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Pairs List */}
      {customPairs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif-luxury font-bold text-white">Your Custom Pairs</h2>
            <span className="text-xs font-mono-code text-white/50">{customPairs.length} pairs</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customPairs.map((pair) => (
              <div
                key={pair.id}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedPair?.id === pair.id
                    ? 'border-[#C5A36A] bg-[#161410]'
                    : 'border-white/15 bg-[#0E0E0E] hover:border-white/25'
                }`}
                onClick={() => setSelectedPair(pair)}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white font-serif-luxury truncate">
                      {pair.wallpaper.desktopPictureId}
                    </h3>
                    <p className="text-xs text-white/60 truncate">{pair.audioTrack.title}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePair(pair.id);
                    }}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3 h-3 text-white/60" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-white/40">
                  <ImageIcon className="w-3 h-3" />
                  <span className="capitalize">{pair.wallpaper.assetType}</span>
                  <span className="mx-1">•</span>
                  <Mic className="w-3 h-3" />
                  <span className="capitalize">{pair.audioTrack.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Pair Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E0E0E] rounded-2xl border border-white/15 max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-lg font-serif-luxury font-bold text-white">Create Audio-Wallpaper Pair</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Wallpaper Selection */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-white font-serif-luxury">Select Wallpaper</h3>
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {suitableWallpapers.map((wallpaper) => (
                      <button
                        key={wallpaper.desktopPictureId}
                        className="p-3 rounded-lg bg-black/40 border border-white/10 hover:border-[#C5A36A]/50 transition-all text-left"
                      >
                        <div className="aspect-video bg-[#0E0E0E] rounded mb-2 flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-white/20" />
                        </div>
                        <p className="text-xs text-white/70 truncate">{wallpaper.desktopPictureId}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Audio Selection */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-white font-serif-luxury">Select Audio Track</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {AUDIO_TRACKS.map((track) => (
                      <button
                        key={track.id}
                        className="w-full p-3 rounded-lg bg-black/40 border border-white/10 hover:border-[#C5A36A]/50 transition-all text-left flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#C5A36A]/10 flex items-center justify-center text-[#C5A36A]">
                          <Mic className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-white font-medium truncate">{track.title}</p>
                          <div className="flex items-center gap-2 text-[10px] text-white/50">
                            <span className="capitalize">{track.type}</span>
                            <span>•</span>
                            <span>{track.duration}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Voice Clone Info */}
              <div className="mt-6 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono-code text-emerald-400 uppercase font-bold">AI Voice Cloning</span>
                </div>
                <p className="text-xs text-white/70">
                  Pair wallpapers with custom AI voice clones for personalized experiences. Clone accuracy typically exceeds 95% for natural, human-like narration.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs font-medium text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // For demo, just create with first available
                  if (suitableWallpapers.length > 0 && AUDIO_TRACKS.length > 0) {
                    handleCreatePair(suitableWallpapers[0], AUDIO_TRACKS[0]);
                  }
                }}
                className="px-4 py-2 rounded-lg bg-[#C5A36A] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#C5A36A]/90 transition-colors"
              >
                Create Pair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}