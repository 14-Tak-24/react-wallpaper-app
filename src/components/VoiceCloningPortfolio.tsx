import { useState, useMemo } from 'react';
import {
  Mic,
  Globe,
  Award,
  Star,
  Play,
  Pause,
  Volume2,
  Download,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Clock,
  Users,
  Shield,
  Zap,
  Languages,
  Music,
  Film,
  Video,
  Headphones,
  Send,
  Mail,
  MessageCircle,
  Linkedin,
  Twitter,
  Instagram,
  Calendar,
  CreditCard,
  FileText,
  Settings,
  BarChart3,
  Target,
  Heart,
  ThumbsUp,
  ArrowRight,
  X
} from 'lucide-react';

// Types for voice cloning portfolio
export interface VoiceSample {
  id: string;
  title: string;
  description: string;
  category: 'fidelity' | 'emotional-range' | 'terminology' | 'long-form';
  originalAudio: string;
  clonedAudio: string;
  duration: string;
  client?: string;
  language: string;
}

export interface DubbingSample {
  id: string;
  title: string;
  sourceLanguage: string;
  targetLanguage: string;
  originalVideo: string;
  dubbedVideo: string;
  lipSyncAccuracy: number;
  client?: string;
}

export interface ServiceTier {
  id: string;
  name: string;
  price: string;
  deliverables: string[];
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
}

export interface ClientTestimonial {
  id: string;
  clientName: string;
  clientCompany: string;
  quote: string;
  results: {
    metric: string;
    value: string;
    improvement: string;
  }[];
  rating: number;
  avatarColor: string;
}

export interface ProjectInquiry {
  name: string;
  email: string;
  company?: string;
  serviceTier: string;
  projectDetails: string;
  voiceSamples?: File[];
  timeline?: string;
  budget?: string;
}

// Sample Data
const VOICE_SAMPLES: VoiceSample[] = [
  {
    id: 'vs-001',
    title: 'Original vs Clone A/B Comparison',
    description: '30-second split-screen proving near-indistinguishable cloning quality',
    category: 'fidelity',
    originalAudio: '/audio/original-sample-1.mp3',
    clonedAudio: '/audio/cloned-sample-1.mp3',
    duration: '0:30',
    language: 'English',
    client: 'TechChannel Pro'
  },
  {
    id: 'vs-002',
    title: 'Emotional Range Demo',
    description: 'Same sentence in 5 tones: excited, somber, instructional, persuasive, conversational',
    category: 'emotional-range',
    originalAudio: '/audio/emotional-original.mp3',
    clonedAudio: '/audio/emotional-cloned.mp3',
    duration: '1:15',
    language: 'English'
  },
  {
    id: 'vs-003',
    title: 'Niche Terminology Test',
    description: '20 industry-specific terms pronounced correctly with proper emphasis',
    category: 'terminology',
    originalAudio: '/audio/tech-terms-original.mp3',
    clonedAudio: '/audio/tech-terms-cloned.mp3',
    duration: '0:45',
    language: 'English',
    client: 'DevTools Daily'
  },
  {
    id: 'vs-004',
    title: 'Long-Form Consistency',
    description: '5-minute continuous narration without quality drop or voice drift',
    category: 'long-form',
    originalAudio: '/audio/longform-original.mp3',
    clonedAudio: '/audio/longform-cloned.mp3',
    duration: '5:00',
    language: 'English',
    client: 'StoryTime Studio'
  }
];

const DUBBING_SAMPLES: DubbingSample[] = [
  {
    id: 'ds-001',
    title: 'English → Spanish Tutorial',
    sourceLanguage: 'English',
    targetLanguage: 'Spanish',
    originalVideo: '/video/tutorial-en.mp4',
    dubbedVideo: '/video/tutorial-es.mp4',
    lipSyncAccuracy: 98,
    client: 'EduTech Global'
  },
  {
    id: 'ds-002',
    title: 'English → Portuguese Marketing',
    sourceLanguage: 'English',
    targetLanguage: 'Portuguese',
    originalVideo: '/video/marketing-en.mp4',
    dubbedVideo: '/video/marketing-pt.mp4',
    lipSyncAccuracy: 95,
    client: 'BrandLaunch'
  },
  {
    id: 'ds-003',
    title: 'English → Hindi Documentary',
    sourceLanguage: 'English',
    targetLanguage: 'Hindi',
    originalVideo: '/video/doc-en.mp4',
    dubbedVideo: '/video/doc-hi.mp4',
    lipSyncAccuracy: 92,
    client: 'Documentary Hub'
  }
];

const SERVICE_TIERS: ServiceTier[] = [
  {
    id: 'basic',
    name: 'Basic: AI Voiceover',
    price: '$15–25/video',
    deliverables: ['Standard AI voice for Shorts', 'Up to 60 seconds', '1 revision included'],
    features: ['Quick turnaround (24-48h)', 'High-quality AI voice', 'Multiple voice options'],
    icon: <Mic className="w-5 h-5" />
  },
  {
    id: 'standard',
    name: 'Standard: Full Narration',
    price: '$40–60/video',
    deliverables: ['Standard AI voice for 10–15 min video', 'Voice matching', '2 revisions included'],
    features: ['Extended format support', 'Emotional range adjustment', 'Background music integration'],
    icon: <Film className="w-5 h-5" />
  },
  {
    id: 'premium',
    name: 'Premium: Voice Clone Setup',
    price: '$150–250 one-time',
    deliverables: ['Custom ElevenLabs clone', '3 test generations', 'Usage guide & best practices'],
    features: ['Voice profile ownership', 'Unlimited generations', 'Priority support'],
    popular: true,
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    id: 'elite',
    name: 'Elite: Clone + Dubbing',
    price: '$200–400/video',
    deliverables: ['Custom voice clone', '1-language dubbing', 'Lip-sync included'],
    features: ['Multi-format output', 'Translation quality assurance', 'Cultural adaptation'],
    icon: <Languages className="w-5 h-5" />
  },
  {
    id: 'empire',
    name: 'Empire: Multi-Language',
    price: '$500–800/project',
    deliverables: ['Custom voice clone', '3 languages', 'Bulk discount applied'],
    features: ['Project management', 'Quality assurance team', 'Extended timeline support'],
    icon: <Globe className="w-5 h-5" />
  }
];

const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'ct-001',
    clientName: 'Sarah Chen',
    clientCompany: 'TechChannel Pro',
    quote: 'The voice clone was indistinguishable from my real voice. I can now produce content 10x faster without ever touching a microphone.',
    results: [
      { metric: 'Content Output', value: '10x increase', improvement: '+900%' },
      { metric: 'Time Saved', value: '15 hours/week', improvement: '+75%' },
      { metric: 'Subscriber Growth', value: '+2.5K/month', improvement: '+40%' }
    ],
    rating: 5,
    avatarColor: '#C5A36A'
  },
  {
    id: 'ct-002',
    clientName: 'Marcus Rodriguez',
    clientCompany: 'EduTech Global',
    quote: 'The Spanish dubbing was phenomenal. Lip-sync accuracy at 98% made our tutorials feel native to Spanish-speaking audiences.',
    results: [
      { metric: 'Watch Time', value: '+45% avg', improvement: '+45%' },
      { metric: 'Spanish Subscribers', value: '+5K in 2 months', improvement: '+120%' },
      { metric: 'CTR Improvement', value: '3.2% → 5.8%', improvement: '+81%' }
    ],
    rating: 5,
    avatarColor: '#4A90E2'
  },
  {
    id: 'ct-003',
    clientName: 'Jennifer Liu',
    clientCompany: 'StoryTime Studio',
    quote: 'Long-form consistency was incredible. 5-minute narration with zero voice drift - exactly what I needed for my documentary series.',
    results: [
      { metric: 'Production Speed', value: '3x faster', improvement: '+200%' },
      { metric: 'Audio Quality', value: 'Consistent throughout', improvement: 'Perfect' },
      { metric: 'Client Satisfaction', value: '100% positive', improvement: '+25%' }
    ],
    rating: 5,
    avatarColor: '#50C878'
  }
];

export function VoiceCloningPortfolio() {
  const [activeSection, setActiveSection] = useState<'showcase' | 'dubbing' | 'testimonials' | 'services' | 'contact'>('showcase');
  const [selectedVoiceSample, setSelectedVoiceSample] = useState<VoiceSample | null>(null);
  const [selectedDubbingSample, setSelectedDubbingSample] = useState<DubbingSample | null>(null);
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inquiryForm, setInquiryForm] = useState<ProjectInquiry>({
    name: '',
    email: '',
    company: '',
    serviceTier: '',
    projectDetails: '',
    timeline: '',
    budget: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filtered voice samples by category
  const filteredVoiceSamples = useMemo(() => {
    return VOICE_SAMPLES; // Can add category filtering later
  }, []);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const togglePlayback = (sampleId: string) => {
    setIsPlaying(prev => ({
      ...prev,
      [sampleId]: !prev[sampleId]
    }));
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the form data to your backend
    console.log('Inquiry submitted:', inquiryForm);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="rounded-3xl border border-[#C5A36A]/30 bg-gradient-to-br from-[#120D08] via-[#0E0E0E] to-[#080808] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A36A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A36A]/40 bg-[#C5A36A]/10 text-xs font-mono-code text-[#C5A36A]">
            <Mic className="w-3.5 h-3.5" />
            <span>AI VOICE CLONING & MULTILINGUAL DUBBING STUDIO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-light text-white leading-tight">
            Voice Cloning Portfolio
          </h1>

          <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed max-w-3xl">
            Professional AI voice cloning and multilingual dubbing services. Scale your content production 10x while maintaining perfect voice consistency across all languages.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono-code">
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-white/80">
              <Mic className="w-3 h-3 inline mr-1" /> Near-Indistinguishable Clones
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[#C5A36A]">
              <Languages className="w-3 h-3 inline mr-1" /> 15+ Languages
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-emerald-400">
              <Zap className="w-3 h-3 inline mr-1" /> 24-48h Turnaround
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-rose-400">
              <Award className="w-3 h-3 inline mr-1" /> 98% Lip-Sync Accuracy
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
        <button
          onClick={() => setActiveSection('showcase')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'showcase'
              ? 'bg-[#C5A36A] text-black font-semibold shadow-lg'
              : 'bg-neutral-900/60 text-white/60 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>Voice Fidelity Showcase</span>
        </button>

        <button
          onClick={() => setActiveSection('dubbing')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'dubbing'
              ? 'bg-[#C5A36A] text-black font-semibold shadow-lg'
              : 'bg-neutral-900/60 text-white/60 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Languages className="w-3.5 h-3.5" />
          <span>Multilingual Dubbing</span>
        </button>

        <button
          onClick={() => setActiveSection('testimonials')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'testimonials'
              ? 'bg-[#C5A36A] text-black font-semibold shadow-lg'
              : 'bg-neutral-900/60 text-white/60 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Star className="w-3.5 h-3.5" />
          <span>Client Results</span>
        </button>

        <button
          onClick={() => setActiveSection('services')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'services'
              ? 'bg-[#C5A36A] text-black font-semibold shadow-lg'
              : 'bg-neutral-900/60 text-white/60 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Service Tiers</span>
        </button>

        <button
          onClick={() => setActiveSection('contact')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'contact'
              ? 'bg-[#C5A36A] text-black font-semibold shadow-lg'
              : 'bg-neutral-900/60 text-white/60 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Start Project</span>
        </button>
      </div>

      {/* Voice Fidelity Showcase */}
      {activeSection === 'showcase' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#0E0E0E] p-6 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-xl font-serif-luxury font-bold text-white flex items-center gap-2">
              <Mic className="w-5 h-5 text-[#C5A36A]" />
              Voice Fidelity Showcase
            </h2>
            <p className="text-xs text-white/50">
              Original vs. Clone A/B comparisons demonstrating near-indistinguishable voice cloning quality across different use cases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVoiceSamples.map((sample) => (
              <div
                key={sample.id}
                className="rounded-2xl border border-white/15 bg-[#0E0E0E] p-6 space-y-4 hover:border-white/25 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white font-serif-luxury mb-1">
                      {sample.title}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-2">{sample.description}</p>
                  </div>
                  <span className="text-[9px] font-mono-code uppercase px-2 py-0.5 rounded bg-black/60 border border-white/10 text-white/60 shrink-0">
                    {sample.category}
                  </span>
                </div>

                {sample.client && (
                  <div className="flex items-center gap-2 text-xs text-[#C5A36A]">
                    <Users className="w-3 h-3" />
                    <span>{sample.client}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Clock className="w-3 h-3" />
                  <span>{sample.duration}</span>
                  <span className="mx-1">•</span>
                  <Globe className="w-3 h-3" />
                  <span>{sample.language}</span>
                </div>

                {/* Audio Players */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                    <button
                      onClick={() => togglePlayback(`${sample.id}-original`)}
                      className="w-8 h-8 rounded-full bg-[#C5A36A] flex items-center justify-center text-black hover:bg-[#C5A36A]/80 transition-colors"
                    >
                      {isPlaying[`${sample.id}-original`] ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="text-xs text-white/70 mb-1">Original Voice</div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#C5A36A] w-1/3" />
                      </div>
                    </div>
                    <Volume2 className="w-4 h-4 text-white/40" />
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                    <button
                      onClick={() => togglePlayback(`${sample.id}-cloned`)}
                      className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black hover:bg-emerald-500/80 transition-colors"
                    >
                      {isPlaying[`${sample.id}-cloned`] ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="text-xs text-white/70 mb-1">AI Cloned Voice</div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-1/3" />
                      </div>
                    </div>
                    <Volume2 className="w-4 h-4 text-white/40" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Multilingual Dubbing Showcase */}
      {activeSection === 'dubbing' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#0E0E0E] p-6 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-xl font-serif-luxury font-bold text-white flex items-center gap-2">
              <Languages className="w-5 h-5 text-[#C5A36A]" />
              Multilingual Dubbing Showcase
            </h2>
            <p className="text-xs text-white/50">
              Side-by-side original vs. dubbed videos with lip-sync accuracy metrics for global content localization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DUBBING_SAMPLES.map((sample) => (
              <div
                key={sample.id}
                className="rounded-2xl border border-white/15 bg-[#0E0E0E] p-6 space-y-4 hover:border-white/25 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white font-serif-luxury mb-1">
                      {sample.title}
                    </h3>
                    <p className="text-xs text-white/60">{sample.client}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Globe className="w-3 h-3" />
                  <span>{sample.sourceLanguage} → {sample.targetLanguage}</span>
                </div>

                {/* Lip Sync Accuracy */}
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono-code text-emerald-400">Lip-Sync Accuracy</span>
                    <span className="text-lg font-bold text-emerald-400">{sample.lipSyncAccuracy}%</span>
                  </div>
                  <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all"
                      style={{ width: `${sample.lipSyncAccuracy}%` }}
                    />
                  </div>
                </div>

                {/* Video Comparison */}
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-xs text-white/70 mb-2">Original ({sample.sourceLanguage})</div>
                    <div className="aspect-video bg-black/60 rounded-lg flex items-center justify-center text-white/30">
                      <Video className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-xs text-white/70 mb-2">Dubbed ({sample.targetLanguage})</div>
                    <div className="aspect-video bg-black/60 rounded-lg flex items-center justify-center text-white/30">
                      <Video className="w-8 h-8" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Client Testimonials */}
      {activeSection === 'testimonials' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#0E0E0E] p-6 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-xl font-serif-luxury font-bold text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-[#C5A36A]" />
              Client Results & Social Proof
            </h2>
            <p className="text-xs text-white/50">
              Real results from content creators who've scaled their production with AI voice cloning.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CLIENT_TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-2xl border border-white/15 bg-[#0E0E0E] p-6 space-y-4 hover:border-white/25 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white font-serif-luxury text-lg shadow-lg border border-white/20"
                    style={{ backgroundColor: testimonial.avatarColor }}
                  >
                    {testimonial.clientName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white font-serif-luxury">
                      {testimonial.clientName}
                    </h3>
                    <p className="text-xs text-white/60">{testimonial.clientCompany}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#C5A36A] text-[#C5A36A]" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-white/80 leading-relaxed italic border-l-2 border-[#C5A36A]/50 pl-3">
                  "{testimonial.quote}"
                </p>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="text-[10px] font-mono-code text-[#C5A36A] uppercase font-bold">
                    Measured Results
                  </div>
                  {testimonial.results.map((result, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="text-white/60">{result.metric}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{result.value}</span>
                        <span className="text-emerald-400 text-[10px]">{result.improvement}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Service Tiers */}
      {activeSection === 'services' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#0E0E0E] p-6 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-xl font-serif-luxury font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#C5A36A]" />
              Service Tiers & Pricing
            </h2>
            <p className="text-xs text-white/50">
              Choose the perfect tier for your content production needs. All tiers include quality assurance and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-2xl border p-6 space-y-4 transition-all relative ${
                  tier.popular
                    ? 'border-[#C5A36A] bg-gradient-to-br from-[#161410] to-[#0E0E0E] shadow-[0_0_20px_rgba(197,163,106,0.2)]'
                    : 'border-white/15 bg-[#0E0E0E] hover:border-white/25'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#C5A36A] text-black text-[10px] font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C5A36A]/10 flex items-center justify-center text-[#C5A36A]">
                    {tier.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white font-serif-luxury">
                      {tier.name}
                    </h3>
                    <p className="text-lg font-bold text-[#C5A36A]">{tier.price}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-mono-code text-white/50 uppercase font-bold">
                    Deliverables
                  </div>
                  {tier.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-white/80">
                      <Check className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="text-[10px] font-mono-code text-white/50 uppercase font-bold">
                    Features
                  </div>
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-white/70">
                      <Sparkles className="w-3 h-3 text-[#C5A36A] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setActiveSection('contact');
                    setInquiryForm(prev => ({ ...prev, serviceTier: tier.name }));
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#C5A36A] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#C5A36A]/90 transition-colors"
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Form */}
      {activeSection === 'contact' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#0E0E0E] p-6 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-xl font-serif-luxury font-bold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-[#C5A36A]" />
              Start Your Project
            </h2>
            <p className="text-xs text-white/50">
              Tell us about your project and get a custom quote. Free 30-second voice sample available for qualified inquiries.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl border border-white/15 bg-[#0E0E0E] p-6 sm:p-8 space-y-6">
              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-serif-luxury font-bold text-white">
                    Inquiry Received!
                  </h3>
                  <p className="text-sm text-white/60">
                    Thank you for your interest. We'll review your project details and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2 rounded-xl bg-[#C5A36A] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#C5A36A]/90 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono-code text-white/70 uppercase">Name *</label>
                      <input
                        type="text"
                        required
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A36A]"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono-code text-white/70 uppercase">Email *</label>
                      <input
                        type="email"
                        required
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A36A]"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono-code text-white/70 uppercase">Company (Optional)</label>
                    <input
                      type="text"
                      value={inquiryForm.company}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A36A]"
                      placeholder="Your company or channel name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono-code text-white/70 uppercase">Service Tier *</label>
                    <select
                      required
                      value={inquiryForm.serviceTier}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, serviceTier: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#C5A36A]"
                    >
                      <option value="">Select a service tier</option>
                      {SERVICE_TIERS.map(tier => (
                        <option key={tier.id} value={tier.name}>{tier.name} - {tier.price}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono-code text-white/70 uppercase">Project Details *</label>
                    <textarea
                      required
                      rows={4}
                      value={inquiryForm.projectDetails}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, projectDetails: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A36A] resize-none"
                      placeholder="Describe your project, content type, target audience, and any specific requirements..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono-code text-white/70 uppercase">Timeline (Optional)</label>
                      <input
                        type="text"
                        value={inquiryForm.timeline}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, timeline: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A36A]"
                        placeholder="e.g., Within 2 weeks"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono-code text-white/70 uppercase">Budget Range (Optional)</label>
                      <input
                        type="text"
                        value={inquiryForm.budget}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, budget: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A36A]"
                        placeholder="e.g., $200-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#C5A36A] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#C5A36A]/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <p className="text-xs text-white/50">
              Connect with us on social media for daily voice cloning tips and behind-the-scenes content.
            </p>
            <div className="flex items-center justify-center gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}