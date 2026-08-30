import { useState } from 'react';
import { Compass, BookOpen, Layers, ShieldCheck, Copy, Check, Users, Sparkles, Terminal } from 'lucide-react';
import { PRIMARY_SOULS_REGISTRY } from '../data/gnosticCatalog';
import { CharacterEntity } from '../types/gnostic';

export function CharacterBibleViewer() {
  const [selectedEntity, setSelectedEntity] = useState<CharacterEntity>(PRIMARY_SOULS_REGISTRY[0]);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl border border-[#C5A36A]/20 bg-[#0F0F0F] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A36A]/30 bg-[#C5A36A]/10 text-[11px] font-mono-code text-[#C5A36A]">
            <Compass className="w-3 h-3" />
            <span>8TH DELIVERABLE • THE GNOSTIC AUTO-DIDACTICO CHARACTER BIBLE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-luxury font-light text-white">
            The Gnostic Auto-Didactico: Master Entity Bible
          </h1>
          <p className="text-sm text-white/60 font-sans leading-relaxed">
            The canonical interactive repository defining physical puppet specifications, psychological archetypes, voice guidelines, and organizational depot alignments across the Gilded Mirrors universe.
          </p>
        </div>
      </div>

      {/* Main Interactive Bible Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Entity Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono-code text-white/40 uppercase tracking-wider px-2">
            Select Soul Entity ({PRIMARY_SOULS_REGISTRY.length})
          </div>
          <div className="space-y-2">
            {PRIMARY_SOULS_REGISTRY.map((entity) => {
              const isSelected = selectedEntity.id === entity.id;
              return (
                <button
                  key={entity.id}
                  onClick={() => setSelectedEntity(entity)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#C5A36A] bg-[#161410] shadow-[0_0_20px_rgba(197,163,106,0.2)]'
                      : 'border-white/10 bg-[#0E0E0E] hover:border-white/20 hover:bg-[#121212]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif-luxury font-semibold text-sm text-white">{entity.name}</span>
                      <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-black/50 text-white/60">
                        {entity.mirrorState}
                      </span>
                    </div>
                    <div className="text-xs text-white/50 truncate max-w-[200px]">{entity.title}</div>
                  </div>
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: entity.brandLogo.colorScheme.primary }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Entity Dossier & Visual Character Sheet */}
        <div className="lg:col-span-8 rounded-3xl border border-white/15 bg-[#0E0E0E] p-8 space-y-8 shadow-2xl">
          {/* Dossier Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
                  {selectedEntity.name}
                </h2>
                <span className="text-xs font-mono-code px-2.5 py-1 rounded-full border border-[#C5A36A]/40 text-[#C5A36A] bg-[#C5A36A]/10">
                  {selectedEntity.archetype}
                </span>
              </div>
              <p className="text-xs text-white/60 font-sans">{selectedEntity.title}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-code px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-950/30">
                {selectedEntity.safetyStatus}
              </span>
            </div>
          </div>

          {/* Core Biography & Signature */}
          <div className="space-y-4">
            <p className="text-sm text-white/80 font-sans leading-relaxed">
              {selectedEntity.bio}
            </p>
            <div className="p-4 rounded-xl border border-white/10 bg-[#050505] flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono-code uppercase text-[#C5A36A] block">Canonical Signature Phrase:</span>
                <span className="text-sm font-serif-luxury italic text-white">"{selectedEntity.signaturePhrase}"</span>
              </div>
              <button
                onClick={() => handleCopy(selectedEntity.signaturePhrase)}
                className="text-xs text-white/50 hover:text-white shrink-0 cursor-pointer"
              >
                {copiedPrompt ? <Check className="w-4 h-4 text-[#C5A36A]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 6th Deliverable: Visual Character Sheet & Puppet Construction Specs */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-serif-luxury font-semibold text-white">
              <Layers className="w-4 h-4 text-[#C5A36A]" />
              <span>Puppet Construction &amp; Material Specifications</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl border border-white/5 bg-black/50 space-y-1">
                <span className="text-[10px] font-mono-code text-white/40 uppercase">Skin &amp; Facial Craft:</span>
                <p className="text-white/80">{selectedEntity.puppetSpecs.faceStyle}</p>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-black/50 space-y-1">
                <span className="text-[10px] font-mono-code text-white/40 uppercase">Materials &amp; Textiles:</span>
                <p className="text-white/80">{selectedEntity.puppetSpecs.materials}</p>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-black/50 space-y-1">
                <span className="text-[10px] font-mono-code text-white/40 uppercase">Armature &amp; Joints:</span>
                <p className="text-white/80">{selectedEntity.puppetSpecs.armature}</p>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-black/50 space-y-1">
                <span className="text-[10px] font-mono-code text-white/40 uppercase">Lighting Environment:</span>
                <p className="text-white/80">{selectedEntity.puppetSpecs.lighting}</p>
              </div>
            </div>
          </div>

          {/* Performance & Voice Guidelines */}
          <div className="space-y-3 p-5 rounded-2xl border border-white/10 bg-neutral-950">
            <h4 className="text-xs font-serif-luxury font-semibold text-white uppercase tracking-wider">
              Performance Cadence &amp; Voice Directives
            </h4>
            <p className="text-xs text-white/70 font-sans leading-relaxed">
              <strong className="text-[#C5A36A]">Vocal Style:</strong> {selectedEntity.voiceStyle}
            </p>
            <p className="text-xs text-white/70 font-sans leading-relaxed">
              <strong className="text-[#C5A36A]">Depot Alignment:</strong> {selectedEntity.depotAlignment}
            </p>
            <p className="text-xs text-white/70 font-sans leading-relaxed">
              <strong className="text-[#C5A36A]">Core Analytical Lens:</strong> {selectedEntity.coreLens}
            </p>
          </div>

          {/* AI Generation Prompts */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif-luxury font-semibold text-white">Production AI Render Prompt</span>
              <button
                onClick={() => handleCopy(selectedEntity.promptKit.cinematicPrompt)}
                className="text-xs text-[#C5A36A] hover:text-white flex items-center gap-1 cursor-pointer font-mono-code"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Full Prompt</span>
              </button>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-black text-[11px] font-mono-code text-emerald-400/90 leading-relaxed select-all">
              {selectedEntity.promptKit.cinematicPrompt}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
