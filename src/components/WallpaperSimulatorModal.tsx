import { useState, useEffect } from 'react';
import { X, Download, Copy, Check, Monitor, Laptop, Maximize2, Terminal, Shield, Sparkles } from 'lucide-react';
import { DesktopPictureAsset } from '../types';
import { formatBytes } from '../utils/plistParser';

interface WallpaperSimulatorModalProps {
  asset: DesktopPictureAsset | null;
  onClose: () => void;
}

export function WallpaperSimulatorModal({ asset, onClose }: WallpaperSimulatorModalProps) {
  const [aspectRatio, setAspectRatio] = useState<'16:10' | '16:9' | '21:9' | 'phone'>('16:10');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [currentTime, setCurrentTime] = useState('9:41 AM');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!asset) return null;

  const { from, via, to, accent, style } = asset.gradientTheme;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(asset.fullUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-5xl rounded-2xl border border-white/15 bg-[#0A0A0A] shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#C5A36A]/40 bg-neutral-900 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#C5A36A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-serif-luxury font-medium text-white">{asset.desktopPictureId}</span>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full border border-[#C5A36A]/30 text-[#C5A36A] bg-[#C5A36A]/10">
                  {asset.macOSVersionTag}
                </span>
              </div>
              <p className="text-[11px] text-white/50">{asset.gradientTheme.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Aspect Ratio Switcher */}
            <div className="hidden sm:flex items-center border border-white/10 rounded-full p-0.5 bg-black/50 text-xs">
              <button
                onClick={() => setAspectRatio('16:10')}
                className={`px-3 py-1 rounded-full text-[10px] font-mono-code transition-all ${
                  aspectRatio === '16:10' ? 'bg-[#C5A36A] text-black font-bold' : 'text-white/40 hover:text-white'
                }`}
              >
                16:10 MacBook
              </button>
              <button
                onClick={() => setAspectRatio('16:9')}
                className={`px-3 py-1 rounded-full text-[10px] font-mono-code transition-all ${
                  aspectRatio === '16:9' ? 'bg-[#C5A36A] text-black font-bold' : 'text-white/40 hover:text-white'
                }`}
              >
                16:9 4K
              </button>
              <button
                onClick={() => setAspectRatio('21:9')}
                className={`px-3 py-1 rounded-full text-[10px] font-mono-code transition-all ${
                  aspectRatio === '21:9' ? 'bg-[#C5A36A] text-black font-bold' : 'text-white/40 hover:text-white'
                }`}
              >
                21:9 UltraWide
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-all ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Interactive macOS Desktop Display */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-black/40">
          <div
            className={`w-full relative rounded-xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between ${
              aspectRatio === '16:10'
                ? 'aspect-[16/10] max-w-3xl'
                : aspectRatio === '16:9'
                ? 'aspect-[16/9] max-w-3xl'
                : 'aspect-[21/9] max-w-4xl'
            }`}
            style={{
              background: via
                ? `linear-gradient(135deg, ${from} 0%, ${via} 50%, ${to} 100%)`
                : `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
            }}
          >
            {/* Abstract Overlay Art */}
            {style === 'mesh' && (
              <div
                className="absolute inset-0 opacity-40 mix-blend-overlay"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 30%, ${accent} 0%, transparent 60%), radial-gradient(circle at 70% 70%, #ffffff 0%, transparent 50%)`,
                }}
              />
            )}
            {style === 'topography' && (
              <div className="absolute inset-0 opacity-30 flex items-center justify-center pointer-events-none">
                <div className="w-80 h-80 rounded-full border border-white/20 scale-150 animate-pulse" />
                <div className="w-56 h-56 rounded-full border border-[#C5A36A]/40 absolute" />
              </div>
            )}
            {style === 'glow' && (
              <div
                className="absolute w-64 h-64 rounded-full blur-3xl opacity-50 pointer-events-none"
                style={{ backgroundColor: accent }}
              />
            )}

            {/* Simulated macOS Menu Bar */}
            <div className="relative z-20 h-7 bg-black/30 backdrop-blur-md border-b border-white/10 px-4 flex items-center justify-between text-[10px] text-white/90 font-sans select-none">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-xs"></span>
                <span className="font-semibold text-white">Finder</span>
                <span className="text-white/70 hidden sm:inline">File</span>
                <span className="text-white/70 hidden sm:inline">Edit</span>
                <span className="text-white/70 hidden sm:inline">View</span>
                <span className="text-white/70 hidden sm:inline">Go</span>
                <span className="text-white/70 hidden sm:inline">Window</span>
                <span className="text-white/70 hidden sm:inline">Help</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/80">100%</span>
                <span className="text-white/80">Wi-Fi</span>
                <span className="font-medium text-white">{currentTime}</span>
              </div>
            </div>

            {/* Simulated macOS Window Centerpiece */}
            <div className="relative z-10 mx-auto my-auto w-[65%] max-w-md rounded-lg border border-white/20 bg-neutral-950/80 backdrop-blur-2xl shadow-2xl overflow-hidden text-left p-4 animate-scaleUp">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-[10px] font-mono-code text-white/40">Desktop Picture Inspector</div>
                <div className="w-10" />
              </div>
              <div className="space-y-1.5 text-[11px] font-mono-code text-white/70">
                <div><span className="text-[#C5A36A]">ID:</span> {asset.desktopPictureId}</div>
                <div><span className="text-[#C5A36A]">Format:</span> Master ZIP Archive</div>
                <div><span className="text-[#C5A36A]">Archive:</span> {formatBytes(asset.downloadSize)}</div>
                <div><span className="text-[#C5A36A]">Expanded:</span> {formatBytes(asset.unarchivedSize)}</div>
                <div><span className="text-[#C5A36A]">Algorithm:</span> {asset.compressionAlgorithm} / {asset.measurementAlgorithm}</div>
              </div>
            </div>

            {/* Simulated macOS Dock */}
            <div className="relative z-20 mx-auto mb-2 px-3 py-1.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center gap-2">
              {['Finder', 'Safari', 'Terminal', 'Photos', 'Studio', 'Settings'].map((app, i) => (
                <div
                  key={app}
                  className="w-7 h-7 rounded-lg bg-neutral-900/80 border border-white/20 flex items-center justify-center text-[8px] font-mono-code text-white/80 hover:scale-125 transition-transform cursor-pointer shadow-md"
                  title={app}
                >
                  {app[0]}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-white/10 bg-neutral-950/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-white/50 font-mono-code">
            <Shield className="w-3.5 h-3.5 text-[#C5A36A]" />
            <span className="truncate max-w-xs sm:max-w-md">SHA-1: {asset.measurement}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopyUrl}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-[#C5A36A]/50 transition-all text-xs"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-[#C5A36A]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy CDN Link</span>
            </button>

            <a
              href={asset.fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#C5A36A] text-black font-semibold hover:bg-white transition-all text-xs tracking-wide"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ZIP ({formatBytes(asset.downloadSize)})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
