import { useState, useEffect } from 'react';
import {
  Monitor,
  Laptop,
  Smartphone,
  Tablet,
  Download,
  Copy,
  Check,
  Sun,
  Moon,
  Sparkles,
  Layers,
  Terminal,
  ShieldCheck,
  ExternalLink,
  Sliders,
  Maximize2,
  Minimize2,
  Clock,
  Zap,
} from 'lucide-react';
import { DesktopPictureAsset, DesktopResolution, ResolutionProfile } from '../types';
import { formatBytes } from '../utils/plistParser';

export const RESOLUTION_PROFILES: ResolutionProfile[] = [
  {
    id: '4k-uhd',
    label: '4K UHD',
    name: '4K Ultra HD Display',
    width: 3840,
    height: 2160,
    aspectRatio: '16:9',
    deviceType: 'desktop',
    density: '163 ppi',
  },
  {
    id: 'macbook-pro-14',
    label: 'MacBook Pro 14"',
    name: 'MacBook Pro 14-inch Liquid Retina XDR',
    width: 3024,
    height: 1964,
    aspectRatio: '16:10',
    deviceType: 'laptop',
    density: '254 ppi',
  },
  {
    id: '1080p-fhd',
    label: '1080p FHD',
    name: 'Standard Full HD Monitor',
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    deviceType: 'desktop',
    density: '92 ppi',
  },
  {
    id: '5k-studio',
    label: '5K Studio Display',
    name: 'Apple Studio Display 27"',
    width: 5120,
    height: 2880,
    aspectRatio: '16:9',
    deviceType: 'desktop',
    density: '218 ppi',
  },
  {
    id: 'ultrawide-21-9',
    label: '21:9 UltraWide',
    name: 'UltraWide Curved Cinema Monitor',
    width: 3440,
    height: 1440,
    aspectRatio: '21:9',
    deviceType: 'ultrawide',
    density: '109 ppi',
  },
  {
    id: 'ipad-pro',
    label: 'iPad Pro 12.9"',
    name: 'iPad Pro Liquid Retina XDR',
    width: 2732,
    height: 2048,
    aspectRatio: '4:3',
    deviceType: 'tablet',
    density: '264 ppi',
  },
  {
    id: 'iphone-16-pro',
    label: 'iPhone 16 Pro',
    name: 'Super Retina XDR Mobile',
    width: 1179,
    height: 2556,
    aspectRatio: '9:19.5',
    deviceType: 'mobile',
    density: '460 ppi',
  },
];

interface WallpaperPreviewerProps {
  asset: DesktopPictureAsset | null;
  allAssets: DesktopPictureAsset[];
  onSelectAsset: (asset: DesktopPictureAsset) => void;
  onAddToDownloadQueue?: (asset: DesktopPictureAsset) => void;
  onOpenBatchModal?: () => void;
}

export function WallpaperPreviewer({
  asset,
  allAssets,
  onSelectAsset,
  onAddToDownloadQueue,
  onOpenBatchModal,
}: WallpaperPreviewerProps) {
  const [selectedResolution, setSelectedResolution] = useState<DesktopResolution>('macbook-pro-14');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');
  const [timeOfDay, setTimeOfDay] = useState<'dawn' | 'noon' | 'sunset' | 'midnight'>('noon');
  const [showSystemWindow, setShowSystemWindow] = useState(true);
  const [showDock, setShowDock] = useState(true);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState('9:41 AM');
  const [currentDateStr, setCurrentDateStr] = useState('Tuesday, Oct 24');

  // Real-time time updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
      setCurrentDateStr(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const activeAsset = asset || allAssets[0];
  if (!activeAsset) return null;

  const currentProfile = RESOLUTION_PROFILES.find((p) => p.id === selectedResolution) || RESOLUTION_PROFILES[1];

  const { from, via, to, accent, darkFrom, darkVia, darkTo, darkAccent, style } = activeAsset.gradientTheme;

  // Resolve active gradient based on theme mode & time of day
  const getGradientStyles = () => {
    if (themeMode === 'dark') {
      const df = darkFrom || '#090d16';
      const dt = darkTo || '#020617';
      const dv = darkVia;
      return dv
        ? `linear-gradient(135deg, ${df} 0%, ${dv} 50%, ${dt} 100%)`
        : `linear-gradient(135deg, ${df} 0%, ${dt} 100%)`;
    }

    // Light / dynamic daytime
    if (timeOfDay === 'dawn') {
      return `linear-gradient(135deg, #f97316 0%, ${via || '#fbbf24'} 45%, ${from} 100%)`;
    }
    if (timeOfDay === 'sunset') {
      return `linear-gradient(135deg, #7c2d12 0%, #c2410c 40%, ${to} 100%)`;
    }
    if (timeOfDay === 'midnight') {
      return `linear-gradient(135deg, #020617 0%, #0f172a 60%, #1e1b4b 100%)`;
    }

    return via
      ? `linear-gradient(135deg, ${from} 0%, ${via} 50%, ${to} 100%)`
      : `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(activeAsset.fullUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyCurl = () => {
    const cmd = `curl -L -O -J "${activeAsset.fullUrl}"`;
    navigator.clipboard.writeText(cmd);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <div id="wallpaper-previewer-component" className="w-full space-y-6 animate-fadeIn">
      {/* Top Banner & Control Deck */}
      <div className="bg-[#0E0E0E]/90 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono-code uppercase px-2.5 py-0.5 rounded-full bg-[#C5A36A]/15 text-[#C5A36A] border border-[#C5A36A]/30">
                Resolution Studio
              </span>
              <span className="text-xs text-white/50 font-mono-code">
                {currentProfile.width} × {currentProfile.height} ({currentProfile.aspectRatio}) • {currentProfile.density}
              </span>
            </div>
            <h2 className="text-2xl font-serif-luxury font-light text-white mt-1">
              {activeAsset.desktopPictureId}
            </h2>
            <p className="text-xs text-white/50 max-w-xl font-light">
              {activeAsset.gradientTheme.description}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="previewer-copy-curl-btn"
              onClick={handleCopyCurl}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/15 bg-black/40 text-white/80 hover:text-[#C5A36A] hover:border-[#C5A36A]/40 text-xs font-mono-code transition-all"
              title="Copy cURL Command"
            >
              {copiedCurl ? <Check className="w-3.5 h-3.5 text-[#C5A36A]" /> : <Terminal className="w-3.5 h-3.5" />}
              <span>{copiedCurl ? 'Copied' : 'cURL'}</span>
            </button>

            <button
              id="previewer-copy-url-btn"
              onClick={handleCopyUrl}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/15 bg-black/40 text-white/80 hover:text-[#C5A36A] hover:border-[#C5A36A]/40 text-xs font-mono-code transition-all"
              title="Copy Direct Apple CDN URL"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-[#C5A36A]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? 'Copied' : 'Copy URL'}</span>
            </button>

            {onAddToDownloadQueue && (
              <button
                id="previewer-queue-btn"
                onClick={() => onAddToDownloadQueue(activeAsset)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#C5A36A]/40 bg-[#C5A36A]/10 text-[#C5A36A] hover:bg-[#C5A36A]/20 text-xs font-semibold tracking-wider uppercase transition-all"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Queue CDN Fetch</span>
              </button>
            )}

            <a
              id="previewer-download-zip-btn"
              href={activeAsset.fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#C5A36A] text-black font-semibold hover:bg-white text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(197,163,106,0.25)] transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ZIP ({formatBytes(activeAsset.downloadSize)})</span>
            </a>
          </div>
        </div>

        {/* Resolution Tabs */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
            <span className="text-[10px] uppercase font-mono-code text-white/40 mr-2 flex items-center gap-1">
              <Monitor className="w-3 h-3 text-[#C5A36A]" /> Resolution:
            </span>
            {RESOLUTION_PROFILES.map((prof) => {
              const isActive = selectedResolution === prof.id;
              return (
                <button
                  key={prof.id}
                  id={`res-profile-${prof.id}`}
                  onClick={() => setSelectedResolution(prof.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono-code transition-all whitespace-nowrap border ${
                    isActive
                      ? 'bg-[#C5A36A] text-black border-[#C5A36A] font-bold shadow-[0_0_12px_rgba(197,163,106,0.25)]'
                      : 'bg-[#050505] text-white/60 border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {prof.label}
                </button>
              );
            })}
          </div>

          {/* Theme & Time of day toggles */}
          <div className="flex items-center gap-3">
            {/* Light / Dark Mode Toggle */}
            <div className="flex items-center border border-white/15 rounded-full p-0.5 bg-[#050505] text-xs">
              <button
                id="preview-theme-light"
                onClick={() => setThemeMode('light')}
                className={`p-1.5 rounded-full transition-all flex items-center gap-1 text-[11px] ${
                  themeMode === 'light' ? 'bg-amber-400 text-black font-semibold' : 'text-white/40 hover:text-white'
                }`}
                title="Simulate Light Desktop Theme"
              >
                <Sun className="w-3 h-3" />
                <span className="hidden sm:inline">Light</span>
              </button>
              <button
                id="preview-theme-dark"
                onClick={() => setThemeMode('dark')}
                className={`p-1.5 rounded-full transition-all flex items-center gap-1 text-[11px] ${
                  themeMode === 'dark' ? 'bg-[#C5A36A] text-black font-semibold' : 'text-white/40 hover:text-white'
                }`}
                title="Simulate Dark Desktop Theme"
              >
                <Moon className="w-3 h-3" />
                <span className="hidden sm:inline">Dark</span>
              </button>
            </div>

            {/* Time of Day Lighting Morph */}
            <div className="hidden lg:flex items-center border border-white/15 rounded-full p-0.5 bg-[#050505] text-[10px] font-mono-code text-white/50">
              {(['dawn', 'noon', 'sunset', 'midnight'] as const).map((t) => (
                <button
                  key={t}
                  id={`preview-time-${t}`}
                  onClick={() => setTimeOfDay(t)}
                  className={`px-2.5 py-1 rounded-full uppercase transition-all ${
                    timeOfDay === t ? 'bg-white/20 text-white font-bold' : 'hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* macOS UI toggles */}
            <button
              id="preview-toggle-window"
              onClick={() => setShowSystemWindow(!showSystemWindow)}
              className={`p-2 rounded-full border border-white/15 transition-all text-xs ${
                showSystemWindow ? 'bg-white/20 text-white border-white/40' : 'bg-black text-white/40'
              }`}
              title="Toggle Simulated App Window"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Simulated Device Display Stage */}
      <div className="w-full rounded-2xl border border-white/15 bg-black/60 p-4 md:p-8 flex items-center justify-center overflow-hidden min-h-[480px]">
        {/* Device Frame Wrapper */}
        <div
          id="simulated-device-frame"
          className={`relative transition-all duration-500 rounded-2xl overflow-hidden border shadow-[0_20px_70px_rgba(0,0,0,0.9)] flex flex-col justify-between select-none ${
            currentProfile.id === 'iphone-16-pro'
              ? 'w-[280px] aspect-[9/19.5] border-neutral-700 bg-black rounded-[40px] p-2.5'
              : currentProfile.id === 'ipad-pro'
              ? 'w-[580px] aspect-[4/3] border-neutral-700 bg-black rounded-[28px] p-3'
              : currentProfile.id === 'ultrawide-21-9'
              ? 'w-full max-w-5xl aspect-[21/9] border-neutral-800 bg-[#0E0E0E]'
              : currentProfile.id === '1080p-fhd'
              ? 'w-full max-w-4xl aspect-[16/9] border-neutral-800 bg-[#0E0E0E]'
              : currentProfile.id === '5k-studio'
              ? 'w-full max-w-4xl aspect-[16/9] border-[#94A3B8]/40 bg-[#1E293B]/60 p-2 shadow-[0_0_50px_rgba(255,255,255,0.05)]'
              : 'w-full max-w-4xl aspect-[16/10] border-neutral-800 bg-[#0E0E0E]' // MacBook Pro 14
          }`}
        >
          {/* Inner Display Screen with Wallpaper */}
          <div
            id="simulated-wallpaper-canvas"
            className="w-full h-full relative rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-700"
            style={{
              background: getGradientStyles(),
            }}
          >
            {/* Abstract Artistic Overlays matching Apple Wallpaper Styles */}
            {style === 'mesh' && (
              <div
                className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 30%, ${accent} 0%, transparent 60%), radial-gradient(circle at 70% 70%, #ffffff 0%, transparent 50%)`,
                }}
              />
            )}
            {style === 'topography' && (
              <div className="absolute inset-0 opacity-30 flex items-center justify-center pointer-events-none">
                <div className="w-96 h-96 rounded-full border border-white/20 scale-150 animate-pulse" />
                <div className="w-64 h-64 rounded-full border border-white/30 absolute" />
                <div className="w-32 h-32 rounded-full border border-[#C5A36A]/50 absolute" />
              </div>
            )}
            {style === 'lines' && (
              <div className="absolute inset-0 opacity-30 flex justify-around pointer-events-none">
                <div className="w-[1px] h-full bg-white/30 rotate-12" />
                <div className="w-[1px] h-full bg-white/20 -rotate-12" />
                <div className="w-[1px] h-full bg-[#C5A36A]/40 rotate-45" />
              </div>
            )}
            {style === 'glow' && (
              <div
                className="absolute w-72 h-72 rounded-full blur-3xl opacity-60 pointer-events-none"
                style={{ backgroundColor: themeMode === 'dark' ? darkAccent || accent : accent }}
              />
            )}
            {style === 'metallic' && (
              <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-black/40 opacity-70 pointer-events-none" />
            )}
            {style === 'landscape' && (
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/20 via-transparent to-black/70 pointer-events-none" />
            )}

            {/* MacBook Pro Notch (rendered only on MacBook profile) */}
            {currentProfile.id === 'macbook-pro-14' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-3.5 bg-black rounded-b-xl z-40 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#1e293b] border border-white/10" />
              </div>
            )}

            {/* Dynamic Island / Mobile Notch */}
            {currentProfile.id === 'iphone-16-pro' && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-40 flex items-center justify-between px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1e293b]" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
              </div>
            )}

            {/* macOS Menu Bar */}
            <div
              className={`relative z-30 h-7 px-4 flex items-center justify-between text-[10px] font-sans transition-colors ${
                themeMode === 'light'
                  ? 'bg-white/40 text-neutral-900 backdrop-blur-md border-b border-black/10'
                  : 'bg-black/40 text-white/90 backdrop-blur-md border-b border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-xs"></span>
                <span className="font-semibold">Finder</span>
                <span className="hidden sm:inline opacity-80">File</span>
                <span className="hidden sm:inline opacity-80">Edit</span>
                <span className="hidden sm:inline opacity-80">View</span>
                <span className="hidden sm:inline opacity-80">Go</span>
                <span className="hidden sm:inline opacity-80">Window</span>
                <span className="hidden sm:inline opacity-80">Help</span>
              </div>
              <div className="flex items-center gap-3 font-mono-code text-[9px]">
                <span className="hidden sm:inline opacity-80">100%</span>
                <span className="hidden sm:inline opacity-80">Wi-Fi</span>
                <span className="font-semibold">{currentTimeStr}</span>
              </div>
            </div>

            {/* Center Area: Simulated Workspace & Floating macOS Window */}
            <div className="relative z-20 flex-1 p-4 flex items-center justify-center">
              {showSystemWindow && (
                <div
                  id="preview-telemetry-window"
                  className={`w-full max-w-md rounded-xl p-4 shadow-2xl border transition-all animate-scaleUp ${
                    themeMode === 'light'
                      ? 'bg-white/80 backdrop-blur-2xl border-black/15 text-neutral-900'
                      : 'bg-neutral-950/85 backdrop-blur-2xl border-white/20 text-white'
                  }`}
                >
                  {/* Window Title Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="text-[10px] font-mono-code font-semibold opacity-70">
                      MobileAsset • {activeAsset.desktopPictureId}
                    </div>
                    <div className="w-10" />
                  </div>

                  {/* Window Content */}
                  <div className="space-y-2 text-xs font-mono-code">
                    <div className="flex justify-between">
                      <span className="opacity-50">macOS Target:</span>
                      <span className="text-[#C5A36A] font-semibold">{activeAsset.macOSVersionTag}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-50">Aspect / Scale:</span>
                      <span className="font-semibold">{currentProfile.aspectRatio} • {currentProfile.density}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-50">Package Size:</span>
                      <span>{formatBytes(activeAsset.downloadSize)} (Unpacked: {formatBytes(activeAsset.unarchivedSize)})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-50">Build / Version:</span>
                      <span>{activeAsset.build} (v{activeAsset.contentVersion})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-50">SHA-1 Checksum:</span>
                      <span className="truncate max-w-[180px] text-[#C5A36A]">{activeAsset.measurement}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px]">
                    <span className="opacity-40">Apple CDN Stream Verified</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Ready
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Simulated macOS Dock */}
            {showDock && (
              <div
                className={`relative z-30 mx-auto mb-3 px-4 py-2 rounded-2xl backdrop-blur-xl border shadow-2xl flex items-center gap-2.5 transition-colors ${
                  themeMode === 'light'
                    ? 'bg-black/15 border-white/40'
                    : 'bg-white/10 border-white/20'
                }`}
              >
                {['Finder', 'Safari', 'Terminal', 'Photos', 'Studio', 'Settings'].map((app) => (
                  <div
                    key={app}
                    className="w-8 h-8 rounded-xl bg-neutral-900/90 border border-white/20 flex items-center justify-center text-[9px] font-mono-code text-white hover:scale-125 transition-transform cursor-pointer shadow-lg"
                    title={app}
                  >
                    {app[0]}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Wallpaper Selector Carousel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-white/50">
          <span className="font-mono-code uppercase tracking-wider text-[#C5A36A]">
            Select Wallpaper to Preview ({allAssets.length} total):
          </span>
          <span>Click any card to load into Resolution Simulator</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {allAssets.slice(0, 16).map((item) => {
            const isSelected = item.desktopPictureId === activeAsset.desktopPictureId;
            return (
              <button
                key={item.desktopPictureId}
                id={`preview-select-${item.desktopPictureId.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => onSelectAsset(item)}
                className={`group text-left rounded-xl border p-2 bg-[#0E0E0E] transition-all overflow-hidden ${
                  isSelected
                    ? 'border-[#C5A36A] shadow-[0_0_15px_rgba(197,163,106,0.3)] bg-neutral-900'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <div
                  className="aspect-[16/10] w-full rounded-lg mb-2 relative overflow-hidden"
                  style={{
                    background: item.gradientTheme.via
                      ? `linear-gradient(135deg, ${item.gradientTheme.from} 0%, ${item.gradientTheme.via} 50%, ${item.gradientTheme.to} 100%)`
                      : `linear-gradient(135deg, ${item.gradientTheme.from} 0%, ${item.gradientTheme.to} 100%)`,
                  }}
                />
                <div className="text-[11px] font-medium text-white truncate group-hover:text-[#C5A36A]">
                  {item.desktopPictureId}
                </div>
                <div className="text-[9px] font-mono-code text-white/40 truncate">
                  {item.macOSVersionTag}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
