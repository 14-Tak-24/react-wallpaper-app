import { useState } from 'react';
import { Sparkles, Copy, Check, Eye, Download, ShieldCheck, ChevronRight, Layers } from 'lucide-react';
import { CharacterEntity } from '../types/gnostic';

interface MastershotsPortfolioProps {
  characters: CharacterEntity[];
  onSelectCharacter: (char: CharacterEntity) => void;
}

export function MastershotsPortfolio({ characters, onSelectCharacter }: MastershotsPortfolioProps) {
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Portfolio Header & Strategic Philosophy */}
      <div className="rounded-3xl border border-[#C5A36A]/20 bg-gradient-to-b from-[#0F0F0F] via-[#0A0A0A] to-[#050505] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A36A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A36A]/30 bg-[#C5A36A]/10 text-[11px] font-mono-code text-[#C5A36A]">
            <Sparkles className="w-3 h-3" />
            <span>1ST DELIVERABLE • 7 CHARACTER MASTER PORTFOLIO &amp; BRAND IDENTITIES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-luxury font-light text-white leading-tight">
            The Seven Primary Souls: Mastershot Gallery &amp; Brand Systems
          </h1>
          <p className="text-sm sm:text-base text-white/60 font-sans leading-relaxed">
            Crafted in the signature handcrafted puppet/muppet aesthetic of <span className="text-[#C5A36A] font-medium">Gilded Mirrors</span> and <span className="text-[#C5A36A] font-medium">HEART-Tiapmaatzu OS</span>. Each primary entity is anchored with an audited safe-adult character profile, bespoke brand typography, distinct color palettes, and cinematic render prompts.
          </p>
        </div>
      </div>

      {/* Grid of 7 Mastershots with Dedicated Brand Logos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {characters.map((char, index) => {
          const isCopied = copiedPromptId === char.id;
          return (
            <div
              key={char.id}
              className="group relative rounded-2xl border border-white/10 bg-[#0E0E0E] hover:border-[#C5A36A]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-[0_0_30px_rgba(197,163,106,0.15)]"
            >
              {/* Top Banner with Brand Logo */}
              <div
                className="p-5 border-b border-white/10 relative overflow-hidden"
                style={{ backgroundColor: char.brandLogo.colorScheme.bg }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl border flex items-center justify-center font-serif-luxury font-bold text-sm shadow-md"
                      style={{
                        borderColor: char.brandLogo.colorScheme.primary,
                        color: char.brandLogo.colorScheme.primary,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                      }}
                    >
                      {char.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-[10px] font-mono-code tracking-widest uppercase text-white/80 font-bold">
                        {char.brandLogo.tagline}
                      </div>
                      <div className="text-xs text-white/40 font-sans">
                        Asset #{index + 1} • {char.depotAlignment.split(' ')[0]}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-950/40">
                    Safe
                  </span>
                </div>
              </div>

              {/* Character Visual Showcase / Mock Mastershot */}
              <div className="relative p-6 bg-gradient-to-b from-black/40 to-black/80 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-serif-luxury font-semibold text-white group-hover:text-[#C5A36A] transition-colors">
                      {char.name}
                    </h3>
                    <span className="text-xs text-white/40 font-mono-code">Age {char.age}</span>
                  </div>
                  <p className="text-xs text-[#C5A36A] font-sans font-medium">{char.title}</p>
                </div>

                {/* Aesthetic Visual Highlights */}
                <div className="p-3.5 rounded-xl border border-white/5 bg-black/60 space-y-2 text-xs font-sans text-white/70">
                  <div className="flex items-start gap-2">
                    <span className="text-white/40 font-mono-code shrink-0 text-[10px] uppercase">Style:</span>
                    <span className="line-clamp-2">{char.aesthetic}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-white/40 font-mono-code shrink-0 text-[10px] uppercase">Mirror:</span>
                    <span className="text-[#C5A36A] font-mono-code">{char.mirrorState} Mirror</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-white/40 font-mono-code shrink-0 text-[10px] uppercase">Phrase:</span>
                    <span className="italic text-white/90 font-serif-luxury">"{char.signaturePhrase}"</span>
                  </div>
                </div>

                {/* Prompt Box */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-white/40 font-mono-code">
                    <span>Midjourney / Kling Mastershot Prompt</span>
                    <button
                      onClick={() => handleCopyPrompt(char.id, char.promptKit.cinematicPrompt)}
                      className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-[#C5A36A]" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? 'Copied!' : 'Copy Prompt'}</span>
                    </button>
                  </div>
                  <div className="p-3 rounded-lg border border-white/10 bg-[#050505] text-[11px] font-mono-code text-emerald-400/90 leading-relaxed line-clamp-3 select-all">
                    {char.promptKit.cinematicPrompt}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 border-t border-white/10 bg-neutral-950/80 flex items-center justify-between">
                <button
                  onClick={() => onSelectCharacter(char)}
                  className="flex items-center gap-1.5 text-xs text-white/70 hover:text-[#C5A36A] font-sans font-medium transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Full Dossier</span>
                  <ChevronRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => handleCopyPrompt(char.id, char.promptKit.klingMotionPrompt)}
                  className="px-3 py-1.5 rounded-full border border-white/15 bg-neutral-900 text-white/80 hover:text-white hover:border-[#C5A36A]/50 text-[11px] font-mono-code transition-all cursor-pointer"
                >
                  Kling Motion
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
