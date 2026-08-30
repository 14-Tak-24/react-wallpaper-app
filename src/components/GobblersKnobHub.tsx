import { useState, useMemo } from 'react';
import {
  Compass,
  Users,
  MapPin,
  MessageSquare,
  Sparkles,
  BookOpen,
  ShoppingBag,
  Cpu,
  Search,
  Filter,
  Eye,
  Zap,
  Lock,
  Volume2,
  Sun,
  Flame,
  Radio,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
  ShieldAlert,
  Crown,
  Layers,
  FileText,
  Activity,
  Award
} from 'lucide-react';
import {
  GOBBLER_CHARACTERS,
  GOBBLER_LOCATIONS,
  DUAL_ANALYSIS_NODES,
  GOBBLER_LEXICON,
  GOBBLER_MERCH,
  J72_GOLDEN_RHINO_CHRONICLE,
  GOBBLER_DEMOGRAPHICS
} from '../data/gobblersKnobData';
import { GobblerCharacter, GobblerLocation, DualAnalysisNode, LexiconItem, MerchItem } from '../types/gobbler';

export type GobblerSubTab =
  | 'characters'
  | 'dual-analysis'
  | 'locations'
  | 'golden-rhino'
  | 'lexicon'
  | 'merch'
  | 'demographics';

export function GobblersKnobHub() {
  const [activeSubTab, setActiveSubTab] = useState<GobblerSubTab>('characters');

  // Character Bible State
  const [characterSearch, setCharacterSearch] = useState('');
  const [characterCategory, setCharacterCategory] = useState<string>('All');
  const [selectedCharacter, setSelectedCharacter] = useState<GobblerCharacter>(GOBBLER_CHARACTERS[0]);

  // Dual Analysis State
  const [analysisSearch, setAnalysisSearch] = useState('');
  const [analysisCategory, setAnalysisCategory] = useState<string>('All');
  const [perspectiveView, setPerspectiveView] = useState<'both' | 'cuzzn-j' | 'drillbot'>('both');

  // Locations State
  const [selectedLocation, setSelectedLocation] = useState<GobblerLocation>(GOBBLER_LOCATIONS[0]);
  const [locationFilter, setLocationFilter] = useState<string>('All');

  // Lexicon State
  const [lexiconSearch, setLexiconSearch] = useState('');
  const [lexiconCategory, setLexiconCategory] = useState<string>('All');

  // Wish Simulator State
  const [wishInput, setWishInput] = useState('');
  const [grantedWish, setGrantedWish] = useState<{ wish: string; consequence: string } | null>(null);
  const [isGranting, setIsGranting] = useState(false);

  // Copy Feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered Characters
  const filteredCharacters = useMemo(() => {
    return GOBBLER_CHARACTERS.filter((char) => {
      const matchesCat = characterCategory === 'All' || char.category === characterCategory;
      const q = characterSearch.toLowerCase().trim();
      const matchesQuery =
        !q ||
        char.name.toLowerCase().includes(q) ||
        char.description.toLowerCase().includes(q) ||
        char.keywords.some((k) => k.toLowerCase().includes(q)) ||
        (char.kinks && char.kinks.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [characterSearch, characterCategory]);

  // Filtered Analysis Nodes
  const filteredAnalysis = useMemo(() => {
    return DUAL_ANALYSIS_NODES.filter((node) => {
      const matchesCat = analysisCategory === 'All' || node.category === analysisCategory;
      const q = analysisSearch.toLowerCase().trim();
      const matchesQuery =
        !q ||
        node.topic.toLowerCase().includes(q) ||
        node.cuzznJQuote.toLowerCase().includes(q) ||
        node.drillBotAnalysis.toLowerCase().includes(q) ||
        node.systemicTags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [analysisSearch, analysisCategory]);

  // Filtered Lexicon
  const filteredLexicon = useMemo(() => {
    return GOBBLER_LEXICON.filter((item) => {
      const matchesCat = lexiconCategory === 'All' || item.category === lexiconCategory;
      const q = lexiconSearch.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        (item.socialCommentary && item.socialCommentary.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [lexiconSearch, lexiconCategory]);

  // Handle Wish Granting
  const handleMakeWish = () => {
    if (!wishInput.trim()) return;
    setIsGranting(true);
    setTimeout(() => {
      const consequences = [
        "Your desire is granted, but your sleep will be haunted by the whispers of the Knob Goblin.",
        "Ecstasy is unlocked, but you can never leave Gobbler's Knob until your final breath.",
        "Your wish echoes across the valley; a Golden Rhino blessing manifests with an equal demand for absolute honesty.",
        "Granted in full. Your deepest kink is now cataloged in the Traveler Archives for eternity.",
        "Granted, though Dr. Chlem E. Dia has flagged your file for mandatory routine inspection."
      ];
      const randomConsequence = consequences[Math.floor(Math.random() * consequences.length)];
      setGrantedWish({
        wish: wishInput,
        consequence: randomConsequence
      });
      setIsGranting(false);
      setWishInput('');
    }, 1200);
  };

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      {/* Hero Header Banner */}
      <div className="rounded-3xl border border-[#C5A36A]/30 bg-gradient-to-br from-[#120D08] via-[#0E0E0E] to-[#080808] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A36A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A36A]/40 bg-[#C5A36A]/10 text-xs font-mono-code text-[#C5A36A]">
            <Crown className="w-3.5 h-3.5" />
            <span>GOBBLER'S KNOB, CA • LORE &amp; BEHAVIORAL LABORATORY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-light text-white leading-tight">
            Gobbler's Knob Archive &amp; Intel Hub
          </h1>

          <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed max-w-3xl">
            "Think Sin City, but with more texture. The oppressive heat, the neon glow reflecting off sweat-slicked skin, the constant hum of hidden desires... A closed behavioral laboratory where nobody leaves unless they die."
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono-code">
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-white/80">
              👥 40+ Character Profiles
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[#C5A36A]">
              🦏 J72 Golden Rhino Legend
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-emerald-400">
              🎙️ Cuzzn_J &amp; DrillBOT Dual Analysis
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-rose-400">
              📍 12 Venues &amp; Sensory Profiles
            </span>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
        <button
          onClick={() => setActiveSubTab('characters')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'characters'
              ? 'bg-[#C5A36A] text-black font-semibold shadow-lg'
              : 'bg-neutral-900/60 text-white/60 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Character Bible ({GOBBLER_CHARACTERS.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('dual-analysis')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'dual-analysis'
              ? 'bg-[#C5A36A] text-black font-semibold shadow-lg'
              : 'bg-neutral-900/60 text-white/60 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Cuzzn_J vs DrillBOT Intel</span>
        </button>

        <button
          onClick={() => setActiveSubTab('locations')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'locations'
              ? 'bg-[#C5A36A] text-black font-semibold shadow-lg'
              : 'bg-neutral-900/60 text-white/60 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Venues &amp; Sensory Atlas</span>
        </button>

        <button
          onClick={() => setActiveSubTab('golden-rhino')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'golden-rhino'
              ? 'bg-[#C5A36A] text-black font-semibold shadow-lg'
              : 'bg-neutral-900/60 text-white/60 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Golden Rhino Legend (J72)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('lexicon')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'lexicon'
              ? 'bg-[#C5A36A] text-black font-semibold shadow-lg'
              : 'bg-neutral-900/60 text-white/60 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Slang &amp; Lexicon Dictionary</span>
        </button>

        <button
          onClick={() => setActiveSubTab('merch')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'merch'
              ? 'bg-[#C5A36A] text-black font-semibold shadow-lg'
              : 'bg-neutral-900/60 text-white/60 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Town Merch &amp; Oddities</span>
        </button>

        <button
          onClick={() => setActiveSubTab('demographics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'demographics'
              ? 'bg-[#C5A36A] text-black font-semibold shadow-lg'
              : 'bg-neutral-900/60 text-white/60 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Systems &amp; Demographics</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. CHARACTER BIBLE VIEW */}
      {/* ========================================================================= */}
      {activeSubTab === 'characters' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-[#0E0E0E] p-4 rounded-2xl border border-white/10">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search by name, description, kinks, or keywords..."
                value={characterSearch}
                onChange={(e) => setCharacterSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A36A]"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              {['All', 'Denizens & Icons', 'Mythic & Supernatural', 'Couples & Collectives', 'Visitors & Pilgrims', 'Classic Reimagined'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCharacterCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    characterCategory === cat
                      ? 'bg-[#C5A36A] text-black font-semibold'
                      : 'bg-black/40 text-white/60 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Master 2-Column Character Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Character List */}
            <div className="lg:col-span-5 space-y-3 max-h-[850px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/20">
              <div className="text-[11px] font-mono-code text-white/40 uppercase tracking-wider px-2">
                Showing {filteredCharacters.length} of {GOBBLER_CHARACTERS.length} Characters
              </div>

              {filteredCharacters.length === 0 ? (
                <div className="p-8 text-center bg-[#0E0E0E] rounded-2xl border border-white/10 text-xs text-white/50">
                  No character matches found.
                </div>
              ) : (
                filteredCharacters.map((char) => {
                  const isSelected = selectedCharacter.id === char.id;
                  return (
                    <div
                      key={char.id}
                      onClick={() => setSelectedCharacter(char)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C5A36A] bg-[#161410] shadow-[0_0_20px_rgba(197,163,106,0.2)]'
                          : 'border-white/10 bg-[#0E0E0E] hover:border-white/20 hover:bg-[#121212]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white font-serif-luxury shrink-0 text-sm shadow-md"
                            style={{ backgroundColor: char.avatarColor }}
                          >
                            {char.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-white font-serif-luxury">
                              {char.name}
                            </h3>
                            <p className="text-[11px] text-white/50 line-clamp-1">{char.description}</p>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono-code uppercase px-2 py-0.5 rounded bg-black/60 border border-white/10 text-white/60 shrink-0">
                          {char.category.split(' ')[0]}
                        </span>
                      </div>

                      {/* Keywords Chips */}
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {char.keywords.slice(0, 4).map((kw) => (
                          <span
                            key={kw}
                            className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-white/5 text-[#C5A36A]"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Column: In-Depth Character Sheet & Dossier */}
            <div className="lg:col-span-7 rounded-3xl border border-white/15 bg-[#0E0E0E] p-6 sm:p-8 space-y-6 shadow-2xl sticky top-24">
              {/* Character Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white font-serif-luxury text-xl shadow-lg border border-white/20"
                    style={{ backgroundColor: selectedCharacter.avatarColor }}
                  >
                    {selectedCharacter.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-serif-luxury font-bold text-white">
                        {selectedCharacter.name}
                      </h2>
                      <span className="text-[10px] font-mono-code px-2.5 py-0.5 rounded-full border border-[#C5A36A]/40 text-[#C5A36A] bg-[#C5A36A]/10">
                        {selectedCharacter.category}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 mt-0.5">{selectedCharacter.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(selectedCharacter.id, JSON.stringify(selectedCharacter, null, 2))}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/15 bg-neutral-900 text-white/70 hover:text-white text-xs font-mono-code transition-all self-start sm:self-auto"
                  title="Copy JSON Dossier"
                >
                  {copiedId === selectedCharacter.id ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-[#C5A36A]" />
                  )}
                  <span>Export Profile</span>
                </button>
              </div>

              {/* Dossier Grid Details */}
              <div className="space-y-4 text-xs font-sans">
                {/* Physical & Personality */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="text-[10px] font-mono-code text-[#C5A36A] uppercase font-bold">
                      Physical Details
                    </div>
                    <p className="text-white/80 leading-relaxed">{selectedCharacter.physicalDetails}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="text-[10px] font-mono-code text-[#C5A36A] uppercase font-bold">
                      Personality Style
                    </div>
                    <p className="text-white/80 leading-relaxed">{selectedCharacter.personalityStyle}</p>
                  </div>
                </div>

                {/* Desires & Favorites */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="text-[10px] font-mono-code text-emerald-400 uppercase font-bold">
                    Core Desires
                  </div>
                  <p className="text-white/80 leading-relaxed">{selectedCharacter.desires}</p>
                </div>

                {selectedCharacter.favoriteThings && (
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="text-[10px] font-mono-code text-sky-400 uppercase font-bold">
                      Favorite Things &amp; Triggers
                    </div>
                    <p className="text-white/80 leading-relaxed">{selectedCharacter.favoriteThings}</p>
                  </div>
                )}

                {/* Backstory */}
                {selectedCharacter.backstory && (
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="text-[10px] font-mono-code text-amber-400 uppercase font-bold">
                      Backstory &amp; Origins
                    </div>
                    <p className="text-white/80 leading-relaxed">{selectedCharacter.backstory}</p>
                  </div>
                )}

                {/* Quirks, Flaws, Fantasies, Kinks & Limits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedCharacter.kinks && (
                    <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1">
                      <div className="text-[10px] font-mono-code text-rose-400 uppercase font-bold">
                        Kinks &amp; Fetishes
                      </div>
                      <p className="text-rose-200/90 leading-relaxed">{selectedCharacter.kinks}</p>
                    </div>
                  )}

                  {selectedCharacter.limits && (
                    <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-1">
                      <div className="text-[10px] font-mono-code text-amber-400 uppercase font-bold">
                        Hard Limits &amp; Vulnerabilities
                      </div>
                      <p className="text-amber-200/90 leading-relaxed">{selectedCharacter.limits}</p>
                    </div>
                  )}
                </div>

                {/* Keywords Cloud */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCharacter.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DUAL ANALYSIS ENGINE (CUZZN_J VS DRILLBOT) */}
      {/* ========================================================================= */}
      {activeSubTab === 'dual-analysis' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Description & Controls */}
          <div className="bg-[#0E0E0E] p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif-luxury font-bold text-white flex items-center gap-2">
                  <span>Cuzzn_J &amp; DrillBOT Dual Telemetry Console</span>
                </h2>
                <p className="text-xs text-white/50 mt-1">
                  Comparative discourse engine contrasting human-narrative, psychological immersion (Cuzzn_J) with systemic, biometric, and sociological data modeling (DrillBOT).
                </p>
              </div>

              {/* View Perspective Selector */}
              <div className="flex items-center gap-1 border border-white/15 p-1 rounded-xl bg-black/60 self-start md:self-auto text-xs">
                <button
                  onClick={() => setPerspectiveView('both')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    perspectiveView === 'both' ? 'bg-[#C5A36A] text-black font-semibold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  Both Perspectives
                </button>
                <button
                  onClick={() => setPerspectiveView('cuzzn-j')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    perspectiveView === 'cuzzn-j' ? 'bg-rose-500 text-white font-semibold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  Cuzzn_J Only
                </button>
                <button
                  onClick={() => setPerspectiveView('drillbot')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    perspectiveView === 'drillbot' ? 'bg-cyan-500 text-black font-semibold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  DrillBOT Only
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-white/5">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search topics, quotes, or systemic telemetry tags..."
                  value={analysisSearch}
                  onChange={(e) => setAnalysisSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A36A]"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
                {['All', 'Setting & Infrastructure', 'Entities & Figures', 'Venues & Nightlife', 'Culture & Slang', 'Myths & Lore'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setAnalysisCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-all ${
                      analysisCategory === cat
                        ? 'bg-[#C5A36A] text-black font-semibold'
                        : 'bg-black/40 text-white/60 hover:text-white border border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Analysis Cards Grid */}
          <div className="space-y-6">
            {filteredAnalysis.map((node) => (
              <div
                key={node.id}
                className="rounded-2xl border border-white/15 bg-[#0E0E0E] p-6 space-y-5 shadow-xl hover:border-white/25 transition-all"
              >
                {/* Node Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#C5A36A]" />
                    <h3 className="text-lg font-serif-luxury font-bold text-white">{node.topic}</h3>
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/10">
                      {node.category}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {node.systemicTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono-code px-2 py-0.5 rounded-full bg-[#C5A36A]/10 text-[#C5A36A] border border-[#C5A36A]/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Perspective Dialogue Columns */}
                <div
                  className={`grid gap-6 ${
                    perspectiveView === 'both' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
                  }`}
                >
                  {/* Cuzzn_J Column */}
                  {(perspectiveView === 'both' || perspectiveView === 'cuzzn-j') && (
                    <div className="p-5 rounded-xl bg-gradient-to-br from-rose-950/20 via-black/40 to-black/60 border border-rose-500/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-xs font-bold text-rose-400">
                            J
                          </div>
                          <span className="text-xs font-serif-luxury font-bold text-rose-300">
                            Cuzzn_J • Narrative &amp; Psychological Angle
                          </span>
                        </div>
                        <span className="text-[9px] font-mono-code text-rose-400/60 uppercase">Visceral Immersion</span>
                      </div>
                      <p className="text-xs text-white/90 font-sans leading-relaxed italic border-l-2 border-rose-500/50 pl-3">
                        "{node.cuzznJQuote}"
                      </p>
                    </div>
                  )}

                  {/* DrillBOT Column */}
                  {(perspectiveView === 'both' || perspectiveView === 'drillbot') && (
                    <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-950/20 via-black/40 to-black/60 border border-cyan-500/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xs font-bold text-cyan-400">
                            BOT
                          </div>
                          <span className="text-xs font-mono-code font-bold text-cyan-300">
                            DrillBOT • Systemic &amp; Data Telemetry
                          </span>
                        </div>
                        <span className="text-[9px] font-mono-code text-cyan-400/60 uppercase">Behavioral Lab</span>
                      </div>
                      <p className="text-xs text-white/90 font-sans leading-relaxed border-l-2 border-cyan-500/50 pl-3">
                        {node.drillBotAnalysis}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. VENUES & SENSORY ATLAS */}
      {/* ========================================================================= */}
      {activeSubTab === 'locations' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Venue List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-[11px] font-mono-code text-white/40 uppercase tracking-wider px-2">
                Select Venue ({GOBBLER_LOCATIONS.length})
              </div>
              <div className="space-y-2.5">
                {GOBBLER_LOCATIONS.map((loc) => {
                  const isSelected = selectedLocation.id === loc.id;
                  return (
                    <div
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#C5A36A] bg-[#161410] shadow-[0_0_20px_rgba(197,163,106,0.2)]'
                          : 'border-white/10 bg-[#0E0E0E] hover:border-white/20 hover:bg-[#121212]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-serif-luxury font-bold text-white">{loc.name}</h3>
                          <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-black/60 text-emerald-400 border border-white/10">
                            ★ {loc.rating}.0
                          </span>
                        </div>
                        <p className="text-xs text-white/50 line-clamp-1">{loc.type}</p>
                      </div>
                      <span className="text-[10px] font-mono-code uppercase px-2 py-0.5 rounded bg-white/5 text-[#C5A36A]">
                        {loc.priceRange}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Venue Deep Dive & Sensory Profile */}
            <div className="lg:col-span-7 rounded-3xl border border-white/15 bg-[#0E0E0E] p-6 sm:p-8 space-y-6 shadow-2xl sticky top-24">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-serif-luxury font-bold text-white">
                      {selectedLocation.name}
                    </h2>
                    <span className="text-xs font-mono-code px-2.5 py-0.5 rounded-full border border-emerald-500/40 text-emerald-400 bg-emerald-950/20">
                      ★ {selectedLocation.rating}.0 Rating
                    </span>
                  </div>
                  <p className="text-xs text-[#C5A36A] font-mono-code mt-0.5">{selectedLocation.type}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono-code uppercase px-3 py-1 rounded-full bg-white/10 text-white border border-white/10">
                    Price Tier: {selectedLocation.priceRange}
                  </span>
                </div>
              </div>

              {/* Description & Atmosphere */}
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="text-[10px] font-mono-code text-[#C5A36A] uppercase font-bold">
                    Venue Overview
                  </div>
                  <p className="text-white/80 leading-relaxed">{selectedLocation.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="text-[10px] font-mono-code text-cyan-400 uppercase font-bold">
                      Atmosphere
                    </div>
                    <p className="text-white/80 leading-relaxed">{selectedLocation.atmosphere}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                    <div className="text-[10px] font-mono-code text-amber-400 uppercase font-bold">
                      Clientele
                    </div>
                    <p className="text-white/80 leading-relaxed">{selectedLocation.clientele}</p>
                  </div>
                </div>

                {/* Activities & Secrets */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="text-[10px] font-mono-code text-emerald-400 uppercase font-bold">
                    Primary Activities
                  </div>
                  <p className="text-white/80 leading-relaxed">{selectedLocation.activities}</p>
                </div>

                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1">
                  <div className="text-[10px] font-mono-code text-rose-400 uppercase font-bold flex items-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    <span>Classified Secrets &amp; Lore</span>
                  </div>
                  <p className="text-rose-200/90 leading-relaxed">{selectedLocation.secrets}</p>
                </div>

                {/* Sensory Telemetry Profile */}
                {selectedLocation.sensoryProfile && (
                  <div className="p-5 rounded-2xl bg-neutral-900/90 border border-white/10 space-y-3">
                    <div className="text-[11px] font-mono-code text-[#C5A36A] uppercase font-bold flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5" />
                      <span>Sensory &amp; Biometric Field Profile</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                      <div className="p-2.5 rounded-lg bg-black/50 border border-white/5">
                        <div className="text-[9px] font-mono-code text-white/40 uppercase">Lighting Index</div>
                        <div className="text-white/80 mt-0.5">{selectedLocation.sensoryProfile.lighting}</div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-black/50 border border-white/5">
                        <div className="text-[9px] font-mono-code text-white/40 uppercase">Acoustics (dB)</div>
                        <div className="text-white/80 mt-0.5">{selectedLocation.sensoryProfile.acoustics}</div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-black/50 border border-white/5">
                        <div className="text-[9px] font-mono-code text-white/40 uppercase">Dominant Pheromones</div>
                        <div className="text-white/80 mt-0.5">{selectedLocation.sensoryProfile.dominantPheromones}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. THE GOLDEN RHINO SACRED LEGEND (J72) */}
      {/* ========================================================================= */}
      {activeSubTab === 'golden-rhino' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Sacred Lore Header */}
          <div className="rounded-3xl border border-[#C5A36A]/40 bg-gradient-to-b from-[#1E160C] to-[#0A0A0A] p-8 sm:p-10 text-center space-y-4 shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-[#C5A36A]/20 border border-[#C5A36A]/50 mx-auto flex items-center justify-center text-2xl shadow-[0_0_30px_rgba(197,163,106,0.3)]">
              🦏
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#C5A36A]">
              The Sacred Legend of the Golden Gifting Rhino
            </h2>
            <p className="text-xs sm:text-sm text-white/70 max-w-2xl mx-auto font-sans leading-relaxed">
              "In the heart of Gobbler's Knob, where the veil between worlds is at its thinnest, the legend of the Golden Gifting Rhino unfolds with every passing decade... Its horn, forged from the purest gold, holds the key to unlocking desires beyond imagination."
            </p>
          </div>

          {/* Interactive Wish Portal Simulator */}
          <div className="rounded-3xl border border-[#C5A36A]/30 bg-[#0E0E0E] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-lg font-serif-luxury font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A36A]" />
                <span>The Circle of Desires • Wish-Granting Conduit</span>
              </h3>
              <p className="text-xs text-white/50">
                Submit your deepest desire to the Golden Rhino. Remember the universal law: for every wish granted, an equal consequence must balance the fabric of reality.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Declare your deepest desire to the Golden Horn..."
                value={wishInput}
                onChange={(e) => setWishInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleMakeWish()}
                className="flex-1 px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A36A]"
              />
              <button
                onClick={handleMakeWish}
                disabled={isGranting || !wishInput.trim()}
                className="px-6 py-3 rounded-xl bg-[#C5A36A] text-black font-semibold text-xs uppercase tracking-wider hover:bg-white transition-all disabled:opacity-50 cursor-pointer shrink-0 shadow-[0_0_20px_rgba(197,163,106,0.3)]"
              >
                {isGranting ? 'Channelling Magic...' : 'Bestow Offering'}
              </button>
            </div>

            {grantedWish && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1C160B] to-[#120F08] border border-[#C5A36A]/50 space-y-3 animate-fadeIn">
                <div className="text-xs font-mono-code text-[#C5A36A] uppercase font-bold flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>The Oracle Decrees:</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-white/60">Your Petition: "{grantedWish.wish}"</div>
                  <div className="text-sm font-serif-luxury text-white italic">
                    "{grantedWish.consequence}"
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Full Manuscript Reader */}
          <div className="rounded-3xl border border-white/15 bg-[#0E0E0E] p-8 sm:p-12 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-mono-code text-[#C5A36A] uppercase tracking-wider">
                Canonical Manuscript: J72 Sacred Text
              </span>
              <button
                onClick={() => handleCopy('j72-text', J72_GOLDEN_RHINO_CHRONICLE)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 bg-neutral-900 text-xs font-mono-code text-white/70 hover:text-white transition-all"
              >
                {copiedId === 'j72-text' ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3 text-[#C5A36A]" />
                )}
                <span>Copy Full Chronicle</span>
              </button>
            </div>

            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-white/80 font-sans leading-relaxed space-y-4">
              {J72_GOLDEN_RHINO_CHRONICLE.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('#')) {
                  return (
                    <h3 key={idx} className="text-xl font-serif-luxury font-bold text-[#C5A36A] pt-4">
                      {paragraph.replace(/#/g, '').trim()}
                    </h3>
                  );
                }
                return <p key={idx}>{paragraph.trim()}</p>;
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SLANG & LEXICON DICTIONARY */}
      {/* ========================================================================= */}
      {activeSubTab === 'lexicon' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Search and Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3 bg-[#0E0E0E] p-4 rounded-2xl border border-white/10">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search definitions, terms, or social commentary..."
                value={lexiconSearch}
                onChange={(e) => setLexiconSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A36A]"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
              {['All', 'Slang', 'Street Names', 'Creatures', 'Phrases & Tropes'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setLexiconCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    lexiconCategory === cat
                      ? 'bg-[#C5A36A] text-black font-semibold'
                      : 'bg-black/40 text-white/60 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Lexicon Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLexicon.map((item) => (
              <div
                key={item.term}
                className="p-5 rounded-2xl border border-white/10 bg-[#0E0E0E] space-y-3 hover:border-white/20 transition-all shadow-lg"
              >
                <div className="flex items-start justify-between gap-3 border-b border-white/5 pb-2.5">
                  <div>
                    <h3 className="text-base font-serif-luxury font-bold text-white capitalize">
                      {item.term}
                    </h3>
                    <span className="text-[10px] font-mono-code text-[#C5A36A] uppercase">{item.category}</span>
                  </div>
                  {item.connotation && (
                    <span className="text-[9px] font-mono-code px-2 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/10">
                      {item.connotation}
                    </span>
                  )}
                </div>

                <p className="text-xs text-white/80 leading-relaxed font-sans">{item.definition}</p>

                {item.usage && (
                  <div className="text-[11px] text-white/60 bg-black/40 p-2.5 rounded-lg border border-white/5">
                    <span className="text-[#C5A36A] font-mono-code font-bold">Usage: </span>
                    {item.usage}
                  </div>
                )}

                {item.socialCommentary && (
                  <div className="text-[11px] text-cyan-300/80 bg-cyan-950/20 p-2.5 rounded-lg border border-cyan-500/20">
                    <span className="text-cyan-400 font-mono-code font-bold">Sociological Note: </span>
                    {item.socialCommentary}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. TOWN MERCH & ODDITIES */}
      {/* ========================================================================= */}
      {activeSubTab === 'merch' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#0E0E0E] p-6 rounded-2xl border border-white/10 space-y-1">
            <h2 className="text-xl font-serif-luxury font-bold text-white">
              Official Gobbler's Knob Novelty &amp; Transgressive Merch
            </h2>
            <p className="text-xs text-white/50">
              "The merchandise of Gobbler's Knob is a reflection of its warped values, its unapologetic embrace of the obscene as mainstream commerce."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GOBBLER_MERCH.map((m) => (
              <div
                key={m.id}
                className="p-6 rounded-2xl border border-white/10 bg-[#0E0E0E] space-y-4 hover:border-[#C5A36A]/40 transition-all shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-serif-luxury font-bold text-white">{m.name}</h3>
                    <span className="text-[9px] font-mono-code px-2 py-0.5 rounded bg-[#C5A36A]/15 text-[#C5A36A] border border-[#C5A36A]/30 shrink-0">
                      {m.type}
                    </span>
                  </div>

                  <p className="text-xs text-white/80 font-sans leading-relaxed">{m.description}</p>
                </div>

                <div className="space-y-2 text-[11px] pt-3 border-t border-white/5">
                  <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 space-y-0.5">
                    <div className="text-[9px] font-mono-code text-[#C5A36A] uppercase">Target Audience</div>
                    <div className="text-white/70">{m.targetAudience}</div>
                  </div>

                  <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 space-y-0.5">
                    <div className="text-[9px] font-mono-code text-emerald-400 uppercase">Social Implications</div>
                    <div className="text-white/70">{m.socialImplications}</div>
                  </div>

                  {m.symbolism && (
                    <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 space-y-0.5">
                      <div className="text-[9px] font-mono-code text-cyan-400 uppercase">Underlying Symbolism</div>
                      <div className="text-white/70">{m.symbolism}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. SYSTEMS & DEMOGRAPHICS */}
      {/* ========================================================================= */}
      {activeSubTab === 'demographics' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Demographics Overview Deck */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-white/10 space-y-2">
              <div className="text-xs font-mono-code text-[#C5A36A] uppercase font-bold">Age Demographics</div>
              <div className="text-2xl font-serif-luxury font-bold text-white">{GOBBLER_DEMOGRAPHICS.ageRange}</div>
              <p className="text-xs text-white/50">Radically diverse multi-generational adult populace.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-white/10 space-y-2">
              <div className="text-xs font-mono-code text-cyan-400 uppercase font-bold">Technical Savviness</div>
              <div className="text-2xl font-serif-luxury font-bold text-white">Extremely High</div>
              <p className="text-xs text-white/50">Widespread biometric telemetry, neural tracking, encrypted channels.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-white/10 space-y-2">
              <div className="text-xs font-mono-code text-rose-400 uppercase font-bold">Social Attitude</div>
              <div className="text-2xl font-serif-luxury font-bold text-white">Hyper-Liberated</div>
              <p className="text-xs text-white/50">Total rejection of conventional puritanical shame.</p>
            </div>
          </div>

          {/* Narrative Devices */}
          <div className="rounded-3xl border border-white/15 bg-[#0E0E0E] p-8 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-xl font-serif-luxury font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#C5A36A]" />
                <span>Core Narrative Engines &amp; MacGuffins</span>
              </h3>
              <p className="text-xs text-white/50">
                Architectural devices driving the closed-system pressure cooker in Gobbler's Knob.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GOBBLER_DEMOGRAPHICS.narrativeDevices.map((dev) => (
                <div
                  key={dev.name}
                  className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3"
                >
                  <h4 className="text-sm font-serif-luxury font-bold text-[#C5A36A]">{dev.name}</h4>
                  <p className="text-xs text-white/80 font-sans leading-relaxed">{dev.concept}</p>

                  <div className="text-[11px] text-white/60 pt-2 border-t border-white/5 space-y-1">
                    <div>
                      <span className="font-mono-code text-emerald-400 font-bold">Function: </span>
                      {dev.narrativeFunction}
                    </div>
                    <div>
                      <span className="font-mono-code text-cyan-400 font-bold">Sociological: </span>
                      {dev.sociologicalAngle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Universe Themes Checklist */}
          <div className="rounded-3xl border border-white/15 bg-[#0E0E0E] p-8 space-y-4 shadow-2xl">
            <div className="text-sm font-mono-code text-[#C5A36A] uppercase font-bold">
              Thematic Pillars of Gobbler's Knob Universe
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {GOBBLER_DEMOGRAPHICS.coreThemes.map((theme, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-black/50 border border-white/5 text-xs text-white/90 flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5A36A] shrink-0" />
                  <span>{theme}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
