import { useState } from 'react';
import { Layers, Sparkles, Download, Copy, Check, Terminal, Shield, Palette } from 'lucide-react';

export function PosterAndMoodboard() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const posterPrompt = `Cinematic official series teaser poster for 'GILDED MIRRORS: THE GNOSTIC AUTO-DIDACTICO'. Centering the iconic duo: Mary Magnumbytes (a 39yo stylish German-Dutch-American puppet with smooth alabaster skin, sharp auburn-highlighted bob, smart AR glasses, form-fitting emerald tech dress) standing back-to-back with Mac Nazarene (a 33yo Aborigine-Ameri-Indian-African-American puppet with textured dreadlocks, warm copper felt skin, vintage brown leather bomber jacket). Background features a towering neon-lit urban metropolis reflecting in rain-slick glass, fractured holographic data streams, and ancient gilded Babylonian glyphs. High contrast, atmospheric golden hour and teal cinematic lighting, typography at bottom reads 'TRUTH IS FOUND IN SYSTEMS. RESPONSIBILITY IS PROVEN IN ACTION.' 8k masterpiece.`;

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl border border-[#C5A36A]/20 bg-[#0F0F0F] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A36A]/30 bg-[#C5A36A]/10 text-[11px] font-mono-code text-[#C5A36A]">
            <Layers className="w-3 h-3" />
            <span>2ND DELIVERABLE • OFFICIAL SERIES POSTER &amp; CINEMATIC MOOD BOARD</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-luxury font-light text-white">
            Series Poster &amp; Visual World Mood Board
          </h1>
          <p className="text-sm text-white/60 font-sans leading-relaxed">
            The sensory atmosphere of the Gilded Mirrors universe. An intersection of warm tactile craft (distressed leather, silicone, wool felt) and high-velocity digital forensics (telemetry streams, holographic buffers, and noir architecture).
          </p>
        </div>
      </div>

      {/* Main Teaser Poster Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Visual Poster Frame */}
        <div className="lg:col-span-7 rounded-3xl border border-white/15 bg-gradient-to-b from-[#141414] via-[#0A0A0A] to-[#020202] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl min-h-[580px]">
          {/* Subtle Gilded Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#C5A36A]/20 via-rose-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-sky-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Poster Top Billing */}
          <div className="relative z-10 text-center space-y-2 border-b border-white/10 pb-6">
            <div className="text-[10px] uppercase font-mono-code tracking-[0.3em] text-[#C5A36A] font-bold">
              RELLYVENT MEDIA GROUP • TIAPMAATZU ORIGINAL SERIES
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-wider">
              GILDED MIRRORS
            </h2>
            <div className="text-xs font-serif-luxury italic text-white/60 tracking-widest uppercase">
              THE GNOSTIC AUTO-DIDACTICO
            </div>
          </div>

          {/* Central Duo Visual Representation */}
          <div className="relative z-10 my-8 py-6 px-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md grid grid-cols-2 gap-4">
            {/* Mary Side */}
            <div className="border-r border-white/10 pr-4 space-y-2 text-left">
              <div className="text-xs font-mono-code text-[#38BDF8] uppercase tracking-wider font-bold">
                MARY MAGNUMBYTES
              </div>
              <div className="text-xs text-white/70 font-sans">
                "Where all that big Data actually goes."
              </div>
              <div className="text-[10px] font-mono-code text-white/40">
                • 120Hz Telemetry &amp; Forensics<br />
                • Alabaster Silicone &amp; AR Glass<br />
                • Fast, Sharp, Systemic
              </div>
            </div>

            {/* Mac Side */}
            <div className="pl-2 space-y-2 text-left">
              <div className="text-xs font-mono-code text-[#F59E0B] uppercase tracking-wider font-bold">
                MAC NAZARENE
              </div>
              <div className="text-xs text-white/70 font-sans">
                "What you're going to do about it, NOW."
              </div>
              <div className="text-[10px] font-mono-code text-white/40">
                • Conscience &amp; Deceptive Signals<br />
                • Distressed Leather &amp; Amber Felt<br />
                • Calm, Grounded, Moral Action
              </div>
            </div>
          </div>

          {/* Poster Tagline & Credits Block */}
          <div className="relative z-10 text-center space-y-4 border-t border-white/10 pt-6">
            <p className="text-sm font-serif-luxury italic text-white/90 tracking-wide">
              "Truth is uncovered in the code. Accountability is chosen in the soul."
            </p>
            <div className="text-[9px] font-mono-code text-white/30 tracking-[0.2em] uppercase">
              EXECUTIVE PRODUCER: TZI.ZI.0 • SCRIPT ARCHITECTURE: GNOSTIC ENGINE • SOUND DESIGN: BABELONIA NOCTURNE
            </div>
          </div>
        </div>

        {/* Poster Specifications & Moodboard Palette */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          {/* Color Palette Moodboard Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0E0E0E] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-serif-luxury font-semibold text-white">
                <Palette className="w-4 h-4 text-[#C5A36A]" />
                <span>The Cinematic Color System</span>
              </div>
              <span className="text-[10px] font-mono-code text-white/40">4 Core Swatches</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono-code">
              <div className="p-3 rounded-xl border border-white/5 bg-[#050505] space-y-1.5">
                <div className="w-full h-8 rounded-lg bg-[#050505] border border-white/20" />
                <div className="text-white font-bold">#050505 Vanta Black</div>
                <div className="text-[10px] text-white/40">The Void Mirror (Receptive Baseline)</div>
              </div>

              <div className="p-3 rounded-xl border border-white/5 bg-[#050505] space-y-1.5">
                <div className="w-full h-8 rounded-lg bg-[#C5A36A] shadow-md" />
                <div className="text-[#C5A36A] font-bold">#C5A36A Metallic Gold</div>
                <div className="text-[10px] text-white/40">The Gilded Edge (Value Elevation)</div>
              </div>

              <div className="p-3 rounded-xl border border-white/5 bg-[#050505] space-y-1.5">
                <div className="w-full h-8 rounded-lg bg-[#0284C7] shadow-md" />
                <div className="text-[#38BDF8] font-bold">#0284C7 Deep Cyber Teal</div>
                <div className="text-[10px] text-white/40">The Active Mirror (Data Insight)</div>
              </div>

              <div className="p-3 rounded-xl border border-white/5 bg-[#050505] space-y-1.5">
                <div className="w-full h-8 rounded-lg bg-[#E11D48] shadow-md" />
                <div className="text-[#FB7185] font-bold">#E11D48 Infra-Red</div>
                <div className="text-[10px] text-white/40">The Shattered Mirror (Transformation)</div>
              </div>
            </div>
          </div>

          {/* Prompt Generator Card */}
          <div className="rounded-2xl border border-white/10 bg-[#0E0E0E] p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif-luxury font-semibold text-white">Full Poster Midjourney Prompt</span>
              <button
                onClick={() => handleCopy('poster-prompt', posterPrompt)}
                className="text-xs text-[#C5A36A] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copiedSection === 'poster-prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'poster-prompt' ? 'Copied' : 'Copy Prompt'}</span>
              </button>
            </div>
            <div className="p-3 rounded-xl border border-white/10 bg-black text-[11px] font-mono-code text-emerald-400/90 leading-relaxed max-h-44 overflow-y-auto select-all">
              {posterPrompt}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
