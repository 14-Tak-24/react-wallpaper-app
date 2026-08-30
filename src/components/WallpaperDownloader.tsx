import { useState } from 'react';
import {
  Download,
  Terminal,
  FileCode,
  Copy,
  Check,
  Zap,
  Play,
  RotateCw,
  FolderArchive,
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowDownToLine,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { DesktopPictureAsset, DownloadQueueItem } from '../types';
import { formatBytes } from '../utils/plistParser';

interface WallpaperDownloaderProps {
  assets: DesktopPictureAsset[];
  onOpenBatchModal: () => void;
  onPreviewAsset: (asset: DesktopPictureAsset) => void;
}

export function WallpaperDownloader({
  assets,
  onOpenBatchModal,
  onPreviewAsset,
}: WallpaperDownloaderProps) {
  const [downloadQueue, setDownloadQueue] = useState<DownloadQueueItem[]>(
    assets.slice(0, 8).map((a) => ({
      asset: a,
      status: 'idle',
      progress: 0,
    }))
  );
  const [activeDownloadingId, setActiveDownloadingId] = useState<string | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedUrlId, setCopiedUrlId] = useState<string | null>(null);

  const totalCatalogSize = assets.reduce((sum, a) => sum + a.downloadSize, 0);
  const completedCount = downloadQueue.filter((i) => i.status === 'completed').length;

  // Single asset fetcher simulator with real Blob generation
  const handleFetchAsset = async (item: DownloadQueueItem) => {
    setActiveDownloadingId(item.asset.desktopPictureId);
    setDownloadQueue((prev) =>
      prev.map((q) =>
        q.asset.desktopPictureId === item.asset.desktopPictureId
          ? { ...q, status: 'downloading', progress: 10, downloadSpeed: '18.4 MB/s' }
          : q
      )
    );

    // Simulate progressive chunk download
    const steps = [25, 55, 80, 100];
    for (const step of steps) {
      await new Promise((res) => setTimeout(res, 250));
      setDownloadQueue((prev) =>
        prev.map((q) =>
          q.asset.desktopPictureId === item.asset.desktopPictureId
            ? { ...q, progress: step, downloadSpeed: `${(15 + Math.random() * 8).toFixed(1)} MB/s` }
            : q
        )
      );
    }

    // Create placeholder SVG blob representing the wallpaper asset
    const svgData = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${item.asset.gradientTheme.from}" />
            <stop offset="100%" stop-color="${item.asset.gradientTheme.to}" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
        <text x="50%" y="45%" font-family="sans-serif" font-size="44" font-weight="bold" fill="#ffffff" text-anchor="middle">
          ${item.asset.desktopPictureId}
        </text>
        <text x="50%" y="55%" font-family="monospace" font-size="22" fill="rgba(255,255,255,0.7)" text-anchor="middle">
          Apple MobileAsset • ${item.asset.macOSVersionTag} • ${formatBytes(item.asset.downloadSize)}
        </text>
      </svg>
    `;
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const blobUrl = URL.createObjectURL(blob);

    setDownloadQueue((prev) =>
      prev.map((q) =>
        q.asset.desktopPictureId === item.asset.desktopPictureId
          ? {
              ...q,
              status: 'completed',
              progress: 100,
              blobUrl,
              downloadedBytes: item.asset.downloadSize,
            }
          : q
      )
    );
    setActiveDownloadingId(null);
  };

  // Download all in queue
  const handleDownloadAllQueue = async () => {
    for (const item of downloadQueue) {
      if (item.status !== 'completed') {
        await handleFetchAsset(item);
      }
    }
  };

  // Generate .sh file directly
  const handleGenerateAndDownloadSh = () => {
    const script = `#!/usr/bin/env bash
# ==============================================================================
# Apple macOS Official MobileAsset Desktop Pictures Batch Downloader
# Total Catalog Size: ${formatBytes(totalCatalogSize)} (${assets.length} Wallpapers)
# Generated from Apple MobileAsset Catalog
# ==============================================================================

set -e

DEST_DIR="$HOME/Pictures/Wallpapers/macOS"
mkdir -p "$DEST_DIR"
cd "$DEST_DIR"

echo "🎨 Starting download of ${assets.length} official macOS Desktop Pictures to $DEST_DIR..."

${assets
  .map(
    (a, i) =>
      `# [${i + 1}/${assets.length}] ${a.desktopPictureId} (${formatBytes(a.downloadSize)})\ncurl -fSL -C - -o "${a.desktopPictureId.replace(/\s+/g, '_')}.zip" "${a.fullUrl}"`
  )
  .join('\n\n')}

echo "✨ All archives downloaded successfully! Extracting packages..."
for file in *.zip; do
  if [ -f "$file" ]; then
    echo "📦 Extracting $file..."
    unzip -q -o "$file"
  fi
done

echo "🎉 Batch download complete! Wallpapers ready in: $DEST_DIR"
`;

    const blob = new Blob([script], { type: 'application/x-sh' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'download_macos_wallpapers.sh';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrlId(id);
    setTimeout(() => setCopiedUrlId(null), 2000);
  };

  return (
    <div id="wallpaper-downloader-component" className="w-full space-y-6 animate-fadeIn">
      {/* Downloader Header & Batch Script Deck */}
      <div className="bg-[#0E0E0E]/90 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono-code uppercase px-2.5 py-0.5 rounded-full bg-[#C5A36A]/15 text-[#C5A36A] border border-[#C5A36A]/30">
                CDN Stream Engine
              </span>
              <span className="text-xs text-white/50 font-mono-code">
                {assets.length} Total Wallpapers • {formatBytes(totalCatalogSize)}
              </span>
            </div>
            <h2 className="text-2xl font-serif-luxury font-light text-white">
              Apple MobileAsset Direct Downloader &amp; CLI Generator
            </h2>
            <p className="text-xs text-white/50 max-w-2xl font-light">
              Stream binary packages directly from Apple's CDN (<code className="text-[#C5A36A] font-mono-code">updates.cdn-apple.com</code>) or generate executable shell scripts to automate bulk downloading and unzipping.
            </p>
          </div>

          {/* Core Batch Script Generator Button */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              id="batch-script-generator-btn"
              onClick={handleGenerateAndDownloadSh}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#C5A36A] text-black font-semibold hover:bg-white text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(197,163,106,0.3)] transition-all cursor-pointer"
              title="Generate and download download_macos_wallpapers.sh"
            >
              <Terminal className="w-4 h-4" />
              <span>Batch Script Generator (.sh)</span>
            </button>

            <button
              id="open-batch-modal-btn"
              onClick={onOpenBatchModal}
              className="flex items-center gap-2 px-4 py-3 rounded-full border border-white/15 bg-neutral-900/80 text-white/80 hover:text-white hover:border-[#C5A36A]/50 text-xs tracking-wider uppercase transition-all"
              title="Open multi-platform CLI script generator modal"
            >
              <FileCode className="w-4 h-4 text-[#C5A36A]" />
              <span>Inspect CLI Scripts</span>
            </button>
          </div>
        </div>

        {/* Aggregate Telemetry Row */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
            <div className="text-[10px] font-mono-code uppercase text-white/40">Total Catalog Size</div>
            <div className="text-lg font-mono-code font-bold text-[#C5A36A] mt-0.5">{formatBytes(totalCatalogSize)}</div>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
            <div className="text-[10px] font-mono-code uppercase text-white/40">Total Wallpaper Assets</div>
            <div className="text-lg font-mono-code font-bold text-white mt-0.5">{assets.length} packages</div>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
            <div className="text-[10px] font-mono-code uppercase text-white/40">Active Queue Status</div>
            <div className="text-lg font-mono-code font-bold text-emerald-400 mt-0.5">{completedCount} / {downloadQueue.length} fetched</div>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
            <div className="text-[10px] font-mono-code uppercase text-white/40">CDN Protocol</div>
            <div className="text-lg font-mono-code font-bold text-white mt-0.5">HTTP/2 HTTPS Direct</div>
          </div>
        </div>
      </div>

      {/* Queue Control Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-code uppercase text-[#C5A36A] tracking-wider">
            CDN Download &amp; Blob Inspector:
          </span>
          <span className="text-xs text-white/40">({downloadQueue.length} items in active workspace)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="download-all-queue-btn"
            onClick={handleDownloadAllQueue}
            disabled={activeDownloadingId !== null}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/15 text-xs font-semibold tracking-wider uppercase transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Fetch All in Queue</span>
          </button>
        </div>
      </div>

      {/* Downloader Queue List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {downloadQueue.map((item) => {
          const isDownloading = activeDownloadingId === item.asset.desktopPictureId;
          const isCompleted = item.status === 'completed';

          return (
            <div
              key={item.asset.desktopPictureId}
              id={`download-card-${item.asset.desktopPictureId.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className="rounded-xl border border-white/10 bg-[#0E0E0E]/90 p-4 flex flex-col justify-between gap-3 hover:border-white/20 transition-all shadow-lg"
            >
              {/* Asset Header Info */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Thumbnail / Blob Preview */}
                  <div
                    onClick={() => onPreviewAsset(item.asset)}
                    className="w-16 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0 cursor-pointer relative group"
                    style={{
                      background: item.asset.gradientTheme.via
                        ? `linear-gradient(135deg, ${item.asset.gradientTheme.from} 0%, ${item.asset.gradientTheme.via} 50%, ${item.asset.gradientTheme.to} 100%)`
                        : `linear-gradient(135deg, ${item.asset.gradientTheme.from} 0%, ${item.asset.gradientTheme.to} 100%)`,
                    }}
                  >
                    {item.blobUrl && (
                      <img
                        src={item.blobUrl}
                        alt={item.asset.desktopPictureId}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-serif-luxury font-medium text-white">
                      {item.asset.desktopPictureId}
                    </h4>
                    <div className="text-[10px] font-mono-code text-white/50 flex items-center gap-2 mt-0.5">
                      <span className="text-[#C5A36A]">{item.asset.macOSVersionTag}</span>
                      <span>•</span>
                      <span>{formatBytes(item.asset.downloadSize)}</span>
                    </div>
                  </div>
                </div>

                {/* Status Indicator Badge */}
                <div>
                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[10px] font-mono-code px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> Blob Ready
                    </span>
                  ) : isDownloading ? (
                    <span className="flex items-center gap-1 text-[10px] font-mono-code px-2.5 py-1 rounded-full bg-[#C5A36A]/10 text-[#C5A36A] border border-[#C5A36A]/30 animate-pulse">
                      <RotateCw className="w-3 h-3 animate-spin" /> {item.progress}%
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono-code px-2.5 py-1 rounded-full bg-white/5 text-white/40 border border-white/10">
                      Pending
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {isDownloading && (
                <div className="w-full bg-black/60 rounded-full h-1.5 overflow-hidden border border-white/10">
                  <div
                    className="bg-[#C5A36A] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}

              {/* Checksum & CDN URL Info */}
              <div className="text-[10px] font-mono-code text-white/40 truncate bg-black/40 p-2 rounded-lg border border-white/5 flex items-center justify-between">
                <span className="truncate max-w-[280px]">SHA-1: {item.asset.measurement}</span>
                <span className="text-[#C5A36A] shrink-0">ZIP Streamable</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyUrl(item.asset.desktopPictureId, item.asset.fullUrl)}
                    className="p-1.5 rounded-full border border-white/10 hover:border-[#C5A36A]/40 text-white/40 hover:text-[#C5A36A] text-xs transition-all"
                    title="Copy Apple CDN URL"
                  >
                    {copiedUrlId === item.asset.desktopPictureId ? (
                      <Check className="w-3.5 h-3.5 text-[#C5A36A]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {item.blobUrl && (
                    <a
                      href={item.blobUrl}
                      download={`${item.asset.desktopPictureId}.svg`}
                      className="text-[11px] font-mono-code text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <ArrowDownToLine className="w-3 h-3" /> Save Blob
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {!isCompleted && (
                    <button
                      onClick={() => handleFetchAsset(item)}
                      disabled={isDownloading}
                      className="flex items-center gap-1 px-3 py-1 rounded-full border border-white/15 bg-neutral-900 text-white hover:border-[#C5A36A] hover:text-[#C5A36A] text-[11px] font-mono-code transition-all"
                    >
                      <Zap className="w-3 h-3" />
                      <span>Fetch Blob</span>
                    </button>
                  )}

                  <a
                    href={item.asset.fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#C5A36A]/15 text-[#C5A36A] border border-[#C5A36A]/30 hover:bg-[#C5A36A] hover:text-black text-[11px] font-semibold transition-all"
                  >
                    <Download className="w-3 h-3" />
                    <span>Direct ZIP</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
