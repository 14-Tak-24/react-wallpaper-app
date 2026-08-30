import { Sparkles, ShieldCheck, Database, FileText, Layers, Compass, Cpu, Radio, Crown, Atom, ScrollText } from 'lucide-react';
import { ContentTab } from '../types/gnostic';

interface GnosticNavbarProps {
  activeTab: ContentTab;
  onSelectTab: (tab: ContentTab) => void;
  activeSoulCount: number;
}

export function GnosticNavbar({
  activeTab,
  onSelectTab,
  activeSoulCount,
}: GnosticNavbarProps) {
  const tabs: { id: ContentTab; label: string; icon: any }[] = [
    { id: 'portfolio', label: '7 Mastershots & Logos', icon: Sparkles },
    { id: 'poster', label: 'Series Poster & Moodboard', icon: Layers },
    { id: 'video-script', label: 'Video Intro & Pilot Scene', icon: Radio },
    { id: 'case-story', label: 'Mary & Mac Case Study', icon: FileText },
    { id: 'character-bible', label: 'The Gnostic Auto-Didactico', icon: Compass },
    { id: 'presentation', label: 'Executive Deck', icon: Crown },
    { id: 'templates', label: 'Prompt Vault & SOPs', icon: Cpu },
    { id: 'registry', label: 'Active Soul Registry (7)', icon: Database },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#050505]/95 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Identity */}
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#1C1917] to-[#0A0A0A] border border-[#C5A36A]/50 shadow-[0_0_20px_rgba(197,163,106,0.25)]">
              <span className="font-serif-luxury text-xl font-bold text-[#C5A36A] tracking-wider">GM</span>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center" title="Safe Adult Verified" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-luxury tracking-widest text-base font-semibold text-white uppercase">
                  Gilded Mirrors
                </span>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full border border-[#C5A36A]/40 text-[#C5A36A] bg-[#C5A36A]/10 font-bold">
                  HEART-TIAPMAATZU OS
                </span>
              </div>
              <p className="text-[11px] text-white/50 font-sans tracking-wide">
                The Gnostic Auto-Didactico • Mary Magnumbytes &amp; Mac Nazarene
              </p>
            </div>
          </div>

          {/* Quick Safety & Status Badges */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/20 text-[11px] font-mono-code text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Safe Adult Audited &amp; Compliant</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-neutral-900/60 text-[11px] font-mono-code text-white/70">
              <Database className="w-3.5 h-3.5 text-[#C5A36A]" />
              <span>{activeSoulCount} Master Souls Registered</span>
            </div>
          </div>
        </div>

        {/* Navigation Bar Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-2.5 scrollbar-none border-t border-white/5 text-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-sans font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#C5A36A] text-black font-semibold shadow-[0_0_15px_rgba(197,163,106,0.3)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-[#C5A36A]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
