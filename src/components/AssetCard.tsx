import { useState, MouseEvent } from 'react';
import { Download, ExternalLink, Sparkles, Copy, Check, ShieldCheck, Terminal } from 'lucide-react';
import { DesktopPictureAsset } from '../types';
import { formatBytes } from '../utils/plistParser';

export interface AssetCardProps {
  key?: string;
  asset: DesktopPictureAsset;
  onPreview: (asset: DesktopPictureAsset) => void;
  viewMode: 'grid' | 'list';
}

export function AssetCard({ asset, onPreview, viewMode }: AssetCardProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  const handleCopyUrl = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(asset.fullUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyCurl = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const curlCmd = `curl -L -O -J "${asset.fullUrl}"`;
    navigator.clipboard.writeText(curlCmd);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const { from, via, to, accent, style } = asset.gradientTheme;

  // Render simulated artistic canvas
  const renderCanvasArt = () => {
    return (
      <div
        className="w-full h-full relative overflow-hidden flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
        style={{
          background: via
            ? `linear-gradient(135deg, ${from} 0%, ${via} 50%, ${to} 100%)`
            : `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
        }}
      >
        {/* Abstract Geometry / Mesh Overlays */}
        {style === 'mesh' && (
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 30%, ${accent} 0%, transparent 60%), radial-gradient(circle at 70% 70%, #ffffff 0%, transparent 50%)`,
            }}
          />
        )}
        {style === 'topography' && (
          <div className="absolute inset-0 opacity-30 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border border-white/20 scale-150 animate-pulse" />
            <div className="w-32 h-32 rounded-full border border-white/30 absolute" />
            <div className="w-16 h-16 rounded-full border border-[#C5A36A]/50 absolute" />
          </div>
        )}
        {style === 'lines' && (
          <div className="absolute inset-0 opacity-30 flex justify-around">
            <div className="w-[1px] h-full bg-white/30 rotate-12" />
            <div className="w-[1px] h-full bg-white/20 -rotate-12" />
            <div className="w-[1px] h-full bg-[#C5A36A]/40 rotate-45" />
          </div>
        )}
        {style === 'glow' && (
          <div
            className="absolute w-36 h-36 rounded-full blur-2xl opacity-60"
            style={{ backgroundColor: accent }}
          />
        )}
        {style === 'metallic' && (
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/40 opacity-70" />
        )}
        {style === 'landscape' && (
          <div className="absolute inset-0 opacity-35 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200/20 via-transparent to-black/60" />
        )}

        {/* Dynamic Display Title in Artwork */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10 bg-black/20 backdrop-blur-[1px]">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-white/70 mb-1">
            {asset.macOSVersionTag}
          </span>
          <h3 className="text-xl font-serif-luxury font-light text-white tracking-wide drop-shadow-md">
            {asset.desktopPictureId}
          </h3>
        </div>

        {/* Aspect Ratio Badge */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono-code text-white/70">
          5K / 6K
        </div>
      </div>
    );
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onPreview(asset)}
        className="group flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border border-white/10 bg-[#0E0E0E]/80 hover:border-[#C5A36A]/50 hover:bg-neutral-900/60 transition-all cursor-pointer gap-4"
      >
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10 relative">
            {renderCanvasArt()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-serif-luxury font-medium text-[#F5F5F0]">
                {asset.desktopPictureId}
              </span>
              <span className="text-[9px] font-mono-code px-2 py-0.5 rounded-full border border-white/10 text-white/50">
                {asset.category}
              </span>
            </div>
            <div className="text-[11px] text-white/40 font-mono-code mt-0.5">
              Build {asset.build} • {formatBytes(asset.downloadSize)} (Unpacked {formatBytes(asset.unarchivedSize)})
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleCopyCurl}
            className="p-2 rounded-full border border-white/10 bg-black/40 text-white/60 hover:text-[#C5A36A] hover:border-[#C5A36A]/40 transition-all text-xs"
            title="Copy curl download command"
          >
            {copiedCurl ? <Check className="w-3.5 h-3.5 text-[#C5A36A]" /> : <Terminal className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleCopyUrl}
            className="p-2 rounded-full border border-white/10 bg-black/40 text-white/60 hover:text-[#C5A36A] hover:border-[#C5A36A]/40 transition-all text-xs"
            title="Copy Apple CDN URL"
          >
            {copiedUrl ? <Check className="w-3.5 h-3.5 text-[#C5A36A]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <a
            href={asset.fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C5A36A]/15 text-[#C5A36A] border border-[#C5A36A]/30 hover:bg-[#C5A36A] hover:text-black transition-all text-xs font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ZIP ({formatBytes(asset.downloadSize)})</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onPreview(asset)}
      className="group flex flex-col rounded-2xl border border-white/10 bg-[#0E0E0E]/90 hover:border-[#C5A36A]/50 hover:shadow-[0_0_30px_rgba(197,163,106,0.12)] transition-all overflow-hidden cursor-pointer"
    >
      {/* Visual Canvas Area */}
      <div className="relative aspect-[16/10] w-full border-b border-white/10">
        {renderCanvasArt()}

        {/* Hover Quick Action overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(asset);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#C5A36A] transition-all shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Simulator</span>
          </button>
        </div>
      </div>

      {/* Info Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#C5A36A] font-semibold">
              {asset.category}
            </span>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full border border-white/10 bg-black text-white/50">
              {formatBytes(asset.downloadSize)}
            </span>
          </div>

          <h3 className="text-xl font-serif-luxury font-light text-[#F5F5F0] mb-2 group-hover:text-[#C5A36A] transition-colors">
            {asset.desktopPictureId}
          </h3>

          <p className="text-xs text-white/50 leading-relaxed line-clamp-2 mb-4 font-light">
            {asset.gradientTheme.description}
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCurl}
              className="p-1.5 rounded-full border border-white/10 hover:border-[#C5A36A]/40 text-white/40 hover:text-[#C5A36A] transition-all"
              title="Copy curl command"
            >
              {copiedCurl ? <Check className="w-3.5 h-3.5 text-[#C5A36A]" /> : <Terminal className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleCopyUrl}
              className="p-1.5 rounded-full border border-white/10 hover:border-[#C5A36A]/40 text-white/40 hover:text-[#C5A36A] transition-all"
              title="Copy direct Apple CDN URL"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-[#C5A36A]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <a
            href={asset.fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C5A36A]/10 text-[#C5A36A] border border-[#C5A36A]/30 hover:bg-[#C5A36A] hover:text-black transition-all font-sans text-[11px] font-semibold tracking-wider"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </a>
        </div>
      </div>
    </div>
  );
}
