import { useState } from 'react';
import { X, ArrowLeftRight, Info, Download } from 'lucide-react';
import { DesktopPictureAsset } from '../types';

interface WallpaperComparisonProps {
  assets: DesktopPictureAsset[];
  onClose?: () => void;
}

export function WallpaperComparison({ assets, onClose }: WallpaperComparisonProps) {
  const [leftAsset, setLeftAsset] = useState<DesktopPictureAsset | null>(assets[0] || null);
  const [rightAsset, setRightAsset] = useState<DesktopPictureAsset | null>(assets[1] || null);
  const [showSpecs, setShowSpecs] = useState(true);

  const handleSwap = () => {
    const temp = leftAsset;
    setLeftAsset(rightAsset);
    setRightAsset(temp);
  };

  const handleDownload = (asset: DesktopPictureAsset) => {
    window.open(asset.fullUrl, '_blank');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const availableAssets = assets.filter(a => a !== leftAsset && a !== rightAsset);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif-luxury font-light text-white mb-2">Wallpaper Comparison</h1>
          <p className="text-sm text-white/50 font-mono-code">Compare wallpapers side by side</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSpecs(!showSpecs)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-[#C5A36A] transition-all text-xs text-white/70 hover:text-white"
          >
            <Info className="w-4 h-4" />
            {showSpecs ? 'Hide Specs' : 'Show Specs'}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-white/20 hover:border-[#C5A36A] transition-all text-xs text-white/70 hover:text-white"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="bg-[#0E0E0E] rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-sm font-serif-luxury text-white">Wallpaper A</h3>
            <select
              value={leftAsset?.desktopPictureId || ''}
              onChange={(e) => {
                const selected = assets.find(a => a.desktopPictureId === e.target.value);
                if (selected) setLeftAsset(selected);
              }}
              className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/20 text-white text-xs focus:border-[#C5A36A] focus:outline-none"
            >
              {assets.map(asset => (
                <option key={asset.desktopPictureId} value={asset.desktopPictureId}>
                  {asset.desktopPictureId}
                </option>
              ))}
            </select>
          </div>

          {leftAsset ? (
            <>
              <div className="aspect-video bg-neutral-900 relative overflow-hidden">
                <img
                  src={leftAsset.downloadUrl}
                  alt={leftAsset.desktopPictureId}
                  className="w-full h-full object-cover"
                />
              </div>

              {showSpecs && (
                <div className="p-4 space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono-code text-white/60 uppercase">Specifications</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-neutral-900/60">
                        <p className="text-white/40">Resolution</p>
                        <p className="text-white font-mono-code">{leftAsset.measurement}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-900/60">
                        <p className="text-white/40">File Size</p>
                        <p className="text-white font-mono-code">{formatFileSize(leftAsset.downloadSize)}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-900/60">
                        <p className="text-white/40">macOS Version</p>
                        <p className="text-white font-mono-code">{leftAsset.macOSVersionTag}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-900/60">
                        <p className="text-white/40">Type</p>
                        <p className="text-white font-mono-code">{leftAsset.assetType}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-mono-code text-white/60 uppercase">Theme</h4>
                    <div className="p-3 rounded-lg bg-neutral-900/60">
                      <p className="text-sm text-white">{leftAsset.gradientTheme.description}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(leftAsset)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#C5A36A] text-black font-semibold hover:bg-[#D4B878] transition-all text-xs"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="aspect-video flex items-center justify-center text-white/40">
              Select a wallpaper
            </div>
          )}
        </div>

        {/* Swap Button (Center) */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <button
            onClick={handleSwap}
            className="w-12 h-12 rounded-full bg-[#C5A36A] text-black flex items-center justify-center shadow-lg hover:bg-[#D4B878] transition-all"
          >
            <ArrowLeftRight className="w-6 h-6" />
          </button>
        </div>

        {/* Right Panel */}
        <div className="bg-[#0E0E0E] rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-sm font-serif-luxury text-white">Wallpaper B</h3>
            <select
              value={rightAsset?.desktopPictureId || ''}
              onChange={(e) => {
                const selected = assets.find(a => a.desktopPictureId === e.target.value);
                if (selected) setRightAsset(selected);
              }}
              className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/20 text-white text-xs focus:border-[#C5A36A] focus:outline-none"
            >
              {assets.map(asset => (
                <option key={asset.desktopPictureId} value={asset.desktopPictureId}>
                  {asset.desktopPictureId}
                </option>
              ))}
            </select>
          </div>

          {rightAsset ? (
            <>
              <div className="aspect-video bg-neutral-900 relative overflow-hidden">
                <img
                  src={rightAsset.downloadUrl}
                  alt={rightAsset.desktopPictureId}
                  className="w-full h-full object-cover"
                />
              </div>

              {showSpecs && (
                <div className="p-4 space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono-code text-white/60 uppercase">Specifications</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-neutral-900/60">
                        <p className="text-white/40">Resolution</p>
                        <p className="text-white font-mono-code">{rightAsset.measurement}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-900/60">
                        <p className="text-white/40">File Size</p>
                        <p className="text-white font-mono-code">{formatFileSize(rightAsset.downloadSize)}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-900/60">
                        <p className="text-white/40">macOS Version</p>
                        <p className="text-white font-mono-code">{rightAsset.macOSVersionTag}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-neutral-900/60">
                        <p className="text-white/40">Type</p>
                        <p className="text-white font-mono-code">{rightAsset.assetType}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-mono-code text-white/60 uppercase">Theme</h4>
                    <div className="p-3 rounded-lg bg-neutral-900/60">
                      <p className="text-sm text-white">{rightAsset.gradientTheme.description}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(rightAsset)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#C5A36A] text-black font-semibold hover:bg-[#D4B878] transition-all text-xs"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="aspect-video flex items-center justify-center text-white/40">
              Select a wallpaper
            </div>
          )}
        </div>
      </div>

      {/* Mobile Swap Button */}
      <div className="lg:hidden flex justify-center">
        <button
          onClick={handleSwap}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#C5A36A] text-black font-semibold hover:bg-[#D4B878] transition-all text-sm"
        >
          <ArrowLeftRight className="w-5 h-5" />
          Swap Wallpapers
        </button>
      </div>

      {/* Quick Selection */}
      {availableAssets.length > 0 && (
        <div className="bg-[#0E0E0E] rounded-2xl border border-white/10 p-6">
          <h3 className="text-sm font-serif-luxury text-white mb-4">Quick Selection</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {availableAssets.slice(0, 12).map(asset => (
              <button
                key={asset.desktopPictureId}
                onClick={() => {
                  if (!leftAsset) setLeftAsset(asset);
                  else if (!rightAsset) setRightAsset(asset);
                  else setRightAsset(asset);
                }}
                className="group relative aspect-video rounded-lg overflow-hidden border border-white/10 hover:border-[#C5A36A] transition-all"
              >
                <img
                  src={asset.fullUrl}
                  alt={asset.desktopPictureId}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <span className="text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded bg-black/50">
                    {asset.desktopPictureId}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
