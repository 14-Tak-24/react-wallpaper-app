import { useState } from 'react';
import { Crown, ChevronLeft, ChevronRight, Sparkles, Copy, Check, Presentation, ShieldCheck } from 'lucide-react';
import { PRESENTATION_SLIDES } from '../data/gnosticCatalog';

export function ExecutivePresentation() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const slide = PRESENTATION_SLIDES[currentSlideIndex];

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % PRESENTATION_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + PRESENTATION_SLIDES.length) % PRESENTATION_SLIDES.length);
  };

  const handleCopySlide = () => {
    const text = `# ${slide.title}\n## ${slide.subtitle}\n\nPillar: ${slide.pillar}\n\n${slide.contentBullets.map((b) => `- ${b}`).join('\n')}\n\n> "${slide.quote}" — ${slide.speaker}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl border border-[#C5A36A]/20 bg-[#0F0F0F] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A36A]/30 bg-[#C5A36A]/10 text-[11px] font-mono-code text-[#C5A36A]">
            <Crown className="w-3 h-3" />
            <span>7TH DELIVERABLE • EXECUTIVE PITCH &amp; SYSTEM ARCHITECTURE PRESENTATION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-luxury font-light text-white">
            Executive Keynote: The Gnostic Auto-Didactico
          </h1>
          <p className="text-sm text-white/60 font-sans leading-relaxed">
            High-level pitch deck explaining the five foundational pillars: the Mary &amp; Mac dual engine, Gilded Mirrors philosophy, the 5-tier organizational hierarchy, and sustainable creator monetization.
          </p>
        </div>
      </div>

      {/* Slide Display Deck */}
      <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#141414] to-[#080808] p-8 sm:p-12 shadow-2xl space-y-8 min-h-[460px] flex flex-col justify-between relative overflow-hidden">
        {/* Subtle Slide Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A36A]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Slide Top Metadata Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono-code">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#C5A36A] text-black font-bold">
              SLIDE 0{slide.id} / 0{PRESENTATION_SLIDES.length}
            </span>
            <span className="text-[#C5A36A] tracking-wider uppercase">{slide.pillar}</span>
          </div>
          <button
            onClick={handleCopySlide}
            className="text-white/50 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#C5A36A]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Markdown Copied' : 'Copy Slide Text'}</span>
          </button>
        </div>

        {/* Slide Main Content Body */}
        <div className="space-y-6 max-w-4xl py-4">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-white tracking-wide">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base font-serif-luxury italic text-[#C5A36A]">
              {slide.subtitle}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {slide.contentBullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-white/80 font-sans leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C5A36A] mt-2 shrink-0" />
                <p>{bullet}</p>
              </div>
            ))}
          </div>

          {/* Slide Callout Quote */}
          <div className="p-4 rounded-xl border border-white/10 bg-black/50 text-xs sm:text-sm font-serif-luxury italic text-white/90">
            "{slide.quote}" — <span className="text-[#C5A36A] font-mono-code text-xs not-italic">{slide.speaker}</span>
          </div>
        </div>

        {/* Slide Deck Navigation Controls */}
        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <div className="flex items-center gap-2">
            {PRESENTATION_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  currentSlideIndex === idx ? 'w-8 bg-[#C5A36A]' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-full border border-white/15 bg-neutral-900 text-white/80 hover:text-white hover:border-[#C5A36A]/50 text-xs font-mono-code flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-full bg-[#C5A36A] text-black font-semibold hover:bg-white transition-all text-xs font-mono-code flex items-center gap-1 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
