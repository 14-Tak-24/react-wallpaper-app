import { useState } from 'react';
import { Terminal, Code2, Sparkles, SlidersHorizontal, Layers, Check, Monitor, Download, Mic, Music, BarChart3, Heart, Settings, Clock, Palette, Columns } from 'lucide-react';
import { ManifestMetadata } from '../types';

export type MainNavTab = 'gobblers-knob' | 'catalog' | 'previewer' | 'downloader' | 'voice-cloning' | 'audio-experience' | 'analytics' | 'collections' | 'settings' | 'search-history' | 'color-palette' | 'comparison';

interface NavbarProps {
  metadata: ManifestMetadata;
  activeNavTab: MainNavTab;
  onSelectNavTab: (tab: MainNavTab) => void;
  onOpenBatchModal: () => void;
  onOpenPlistModal: () => void;
  onOpenUploadModal: () => void;
}

export function Navbar({
  metadata,
  activeNavTab,
  onSelectNavTab,
  onOpenBatchModal,
  onOpenPlistModal,
  onOpenUploadModal,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => onSelectNavTab('gobblers-knob')}
          className="flex items-center gap-3.5 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-2xl border border-[#C5A36A]/40 bg-neutral-900/90 flex items-center justify-center relative shadow-[0_0_20px_rgba(197,163,106,0.15)] group-hover:border-[#C5A36A] transition-all">
            <span className="font-display text-[#C5A36A] text-base font-semibold">GK</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display tracking-[0.2em] text-xs font-medium uppercase text-white">
                GOBBLER'S KNOB
              </span>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full border border-[#C5A36A]/30 bg-[#C5A36A]/10 text-[#C5A36A] tracking-wider">
                CA • BEHAVIORAL INTEL
              </span>
            </div>
            <h1 className="text-xs font-serif-luxury tracking-wide text-white/60 italic hidden sm:block">
              Lore Archive, Character Bible &amp; Telemetry Hub
            </h1>
          </div>
        </div>

        {/* Navigation Switcher Tabs */}
        <nav className="flex items-center border border-white/15 rounded-full p-1 bg-[#0E0E0E] overflow-x-auto scrollbar-none">
          <button
            id="nav-tab-gobblers-knob"
            onClick={() => onSelectNavTab('gobblers-knob')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              activeNavTab === 'gobblers-knob'
                ? 'bg-[#C5A36A] text-black font-semibold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gobbler's Knob CA</span>
          </button>

          <button
            id="nav-tab-catalog"
            onClick={() => onSelectNavTab('catalog')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              activeNavTab === 'catalog'
                ? 'bg-[#C5A36A] text-black font-semibold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>macOS Catalog</span>
          </button>

          <button
            id="nav-tab-previewer"
            onClick={() => onSelectNavTab('previewer')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              activeNavTab === 'previewer'
                ? 'bg-[#C5A36A] text-black font-semibold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Resolution Studio</span>
          </button>

          <button
            id="nav-tab-downloader"
            onClick={() => onSelectNavTab('downloader')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              activeNavTab === 'downloader'
                ? 'bg-[#C5A36A] text-black font-semibold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>CDN Downloader</span>
          </button>

          <button
            id="nav-tab-voice-cloning"
            onClick={() => onSelectNavTab('voice-cloning')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              activeNavTab === 'voice-cloning'
                ? 'bg-[#C5A36A] text-black font-semibold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Voice Studio</span>
          </button>

          <button
            id="nav-tab-audio-experience"
            onClick={() => onSelectNavTab('audio-experience')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              activeNavTab === 'audio-experience'
                ? 'bg-[#C5A36A] text-black font-semibold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Audio Experience</span>
          </button>

          <button
            id="nav-tab-analytics"
            onClick={() => onSelectNavTab('analytics')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              activeNavTab === 'analytics'
                ? 'bg-[#C5A36A] text-black font-semibold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </button>

          <button
            id="nav-tab-collections"
            onClick={() => onSelectNavTab('collections')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              activeNavTab === 'collections'
                ? 'bg-[#C5A36A] text-black font-semibold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Collections</span>
          </button>

          <button
            id="nav-tab-settings"
            onClick={() => onSelectNavTab('settings')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              activeNavTab === 'settings'
                ? 'bg-[#C5A36A] text-black font-semibold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>

          <button
            id="nav-tab-search-history"
            onClick={() => onSelectNavTab('search-history')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              activeNavTab === 'search-history'
                ? 'bg-[#C5A36A] text-black font-semibold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>History</span>
          </button>

          <button
            id="nav-tab-color-palette"
            onClick={() => onSelectNavTab('color-palette')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              activeNavTab === 'color-palette'
                ? 'bg-[#C5A36A] text-black font-semibold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Palette</span>
          </button>

          <button
            id="nav-tab-comparison"
            onClick={() => onSelectNavTab('comparison')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
              activeNavTab === 'comparison'
                ? 'bg-[#C5A36A] text-black font-semibold shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Compare</span>
          </button>
        </nav>

        {/* Global Modal Actions */}
        <div className="flex items-center gap-2">
          <button
            id="nav-batch-script-btn"
            onClick={onOpenBatchModal}
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-neutral-900/60 hover:border-[#C5A36A]/60 hover:bg-[#C5A36A]/10 transition-all text-[11px] uppercase tracking-wider text-white/80 hover:text-white"
            title="Batch Shell Downloader Script Generator"
          >
            <Terminal className="w-3.5 h-3.5 text-[#C5A36A]" />
            <span>Batch .sh</span>
          </button>

          <button
            id="nav-plist-inspector-btn"
            onClick={onOpenPlistModal}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-neutral-900/60 hover:border-[#C5A36A]/60 transition-all text-[11px] text-white/70 hover:text-white"
            title="Inspect raw XML Property List"
          >
            <Code2 className="w-3.5 h-3.5 text-[#C5A36A]" />
            <span>Plist</span>
          </button>

          <button
            id="nav-load-plist-btn"
            onClick={onOpenUploadModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black font-semibold hover:bg-[#C5A36A] transition-all text-xs tracking-wide"
            title="Load custom Apple XML Plist"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Load Plist</span>
          </button>
        </div>
      </div>
    </header>
  );
}
