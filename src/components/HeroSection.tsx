import { Sparkles, Download, ShieldCheck, HardDrive, Cpu, Globe } from 'lucide-react';
import { formatBytes } from '../utils/plistParser';
import { ManifestMetadata } from '../types';

interface HeroSectionProps {
  metadata: ManifestMetadata;
  totalWallpapers: number;
  filteredCount: number;
  onOpenBatchModal: () => void;
  onOpenSimulatorForFeatured: () => void;
}

export function HeroSection({
  metadata,
  totalWallpapers,
  filteredCount,
  onOpenBatchModal,
  onOpenSimulatorForFeatured,
}: HeroSectionProps) {
  return (
    <section className="relative border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#0A0A0A] to-[#050505]">
      {/* Subtle luxury glow accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A36A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Editorial Headline */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-8 bg-[#C5A36A]" />
              <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#C5A36A] font-semibold">
                Apple Mesu Official Manifest
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light font-serif-luxury tracking-tight leading-[1.05] mb-6 text-[#F5F5F0]">
              The Architecture of <br />
              <span className="italic text-[#C5A36A] font-normal">macOS Aesthetics.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/60 font-light leading-relaxed max-w-xl mb-8">
              Explore authentic 5K &amp; 6K studio master desktop pictures verified via SHA-1 
              cryptographic certificates directly from Apple's CDN network.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBatchModal}
                className="bg-[#C5A36A] text-black px-8 py-3.5 rounded-full font-sans text-[11px] uppercase tracking-widest font-bold hover:bg-white transition-all shadow-[0_0_25px_rgba(197,163,106,0.3)] flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download All Assets ({formatBytes(metadata.totalDownloadSizeBytes)})</span>
              </button>

              <button
                onClick={onOpenSimulatorForFeatured}
                className="px-6 py-3.5 rounded-full border border-white/20 bg-neutral-900/40 text-white/80 hover:text-white hover:border-[#C5A36A]/50 transition-all font-sans text-[11px] uppercase tracking-widest flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#C5A36A]" />
                <span>Launch Desktop Studio</span>
              </button>
            </div>
          </div>

          {/* Luxury Metric & Cryptographic Verification Bento Box */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-6 rounded-2xl border border-white/10 bg-[#0E0E0E]/80 backdrop-blur-md relative overflow-hidden group hover:border-[#C5A36A]/40 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A36A]/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A36A]" />
                  <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-white/50">
                    Cryptographic Signature
                  </span>
                </div>
                <span className="text-[10px] font-mono-code text-[#C5A36A] bg-[#C5A36A]/10 px-2 py-0.5 rounded border border-[#C5A36A]/30">
                  {metadata.signingKey}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Total Catalog Assets</div>
                  <div className="text-3xl font-serif-luxury font-light text-[#F5F5F0]">{totalWallpapers} Master Files</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Archive Total Size</div>
                  <div className="text-3xl font-serif-luxury font-light text-[#C5A36A]">
                    {formatBytes(metadata.totalDownloadSizeBytes)}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-[11px] font-mono-code text-white/40">
                <div>Unarchived: <span className="text-white/70">{formatBytes(metadata.totalUnarchivedSizeBytes)}</span></div>
                <div>Build Code: <span className="text-white/70">10M8877</span></div>
              </div>
            </div>

            {/* CDN Endpoint Info */}
            <div className="p-4 rounded-xl border border-white/10 bg-black/60 flex items-center justify-between text-xs text-white/60">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#C5A36A]" />
                <span className="font-mono-code text-[11px]">updates.cdn-apple.com</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono-code text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Direct CDN Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
