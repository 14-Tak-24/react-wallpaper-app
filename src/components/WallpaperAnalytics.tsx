import { useMemo } from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Download,
  HardDrive,
  Clock,
  Layers,
  Tag,
  Monitor,
  Calendar,
  Star,
  Eye,
  Zap,
  Award,
  Target,
  Activity,
  Shield,
  Globe,
  Cpu,
  MemoryStick,
  Image as ImageIcon
} from 'lucide-react';
import { DesktopPictureAsset, MacOSVersion, AssetType } from '../types';

interface WallpaperAnalyticsProps {
  assets: DesktopPictureAsset[];
}

export function WallpaperAnalytics({ assets }: WallpaperAnalyticsProps) {
  // Calculate analytics
  const analytics = useMemo(() => {
    // Basic counts
    const totalAssets = assets.length;
    const totalDownloadSize = assets.reduce((sum, asset) => sum + asset.downloadSize, 0);
    const totalUnarchivedSize = assets.reduce((sum, asset) => sum + asset.unarchivedSize, 0);
    const averageFileSize = totalAssets > 0 ? totalDownloadSize / totalAssets : 0;

    // Compression ratio
    const compressionRatio = totalUnarchivedSize > 0 
      ? ((totalUnarchivedSize - totalDownloadSize) / totalUnarchivedSize * 100).toFixed(1)
      : '0.0';

    // macOS version distribution
    const versionDistribution = assets.reduce((acc, asset) => {
      const version = asset.macOSVersionCategory;
      acc[version] = (acc[version] || 0) + 1;
      return acc;
    }, {} as Record<MacOSVersion, number>);

    // Asset type distribution
    const typeDistribution = assets.reduce((acc, asset) => {
      const type = asset.assetType;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<AssetType, number>);

    // Category distribution
    const categoryDistribution = assets.reduce((acc, asset) => {
      const category = asset.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Compression algorithm distribution
    const compressionDistribution = assets.reduce((acc, asset) => {
      const algo = asset.compressionAlgorithm;
      acc[algo] = (acc[algo] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Build distribution
    const buildDistribution = assets.reduce((acc, asset) => {
      const build = asset.build;
      acc[build] = (acc[build] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Streamable assets
    const streamableCount = assets.filter(a => a.isZipStreamable).length;
    const streamablePercentage = totalAssets > 0 ? (streamableCount / totalAssets * 100).toFixed(1) : '0.0';

    // Required by OS
    const requiredByOSCount = assets.filter(a => a.requiredByOS).length;
    const requiredByOSPercentage = totalAssets > 0 ? (requiredByOSCount / totalAssets * 100).toFixed(1) : '0.0';

    // Can use local cache server
    const localCacheCount = assets.filter(a => a.canUseLocalCacheServer).length;
    const localCachePercentage = totalAssets > 0 ? (localCacheCount / totalAssets * 100).toFixed(1) : '0.0';

    // Largest and smallest assets
    const sortedBySize = [...assets].sort((a, b) => b.downloadSize - a.downloadSize);
    const largestAsset = sortedBySize[0];
    const smallestAsset = sortedBySize[sortedBySize.length - 1];

    // Format bytes
    const formatBytes = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    };

    return {
      totalAssets,
      totalDownloadSize: formatBytes(totalDownloadSize),
      totalUnarchivedSize: formatBytes(totalUnarchivedSize),
      averageFileSize: formatBytes(averageFileSize),
      compressionRatio,
      versionDistribution,
      typeDistribution,
      categoryDistribution,
      compressionDistribution,
      buildDistribution,
      streamableCount,
      streamablePercentage,
      requiredByOSCount,
      requiredByOSPercentage,
      localCacheCount,
      localCachePercentage,
      largestAsset,
      smallestAsset,
      formatBytes
    };
  }, [assets]);

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl border border-[#C5A36A]/30 bg-gradient-to-br from-[#120D08] via-[#0E0E0E] to-[#080808] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A36A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A36A]/40 bg-[#C5A36A]/10 text-xs font-mono-code text-[#C5A36A]">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>WALLPAPER ANALYTICS DASHBOARD</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-light text-white leading-tight">
            Catalog Analytics
          </h1>

          <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed max-w-3xl">
            Comprehensive statistics and insights about the macOS wallpaper catalog, including size distribution, version coverage, and technical specifications.
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-white/15 bg-[#0E0E0E] space-y-3">
          <div className="flex items-center justify-between">
            <Layers className="w-5 h-5 text-[#C5A36A]" />
            <span className="text-[10px] font-mono-code text-white/40 uppercase">Total Assets</span>
          </div>
          <div className="text-2xl font-bold text-white font-serif-luxury">{analytics.totalAssets}</div>
          <div className="text-xs text-white/50">Wallpapers in catalog</div>
        </div>

        <div className="p-5 rounded-2xl border border-white/15 bg-[#0E0E0E] space-y-3">
          <div className="flex items-center justify-between">
            <HardDrive className="w-5 h-5 text-emerald-400" />
            <span className="text-[10px] font-mono-code text-white/40 uppercase">Total Size</span>
          </div>
          <div className="text-2xl font-bold text-white font-serif-luxury">{analytics.totalDownloadSize}</div>
          <div className="text-xs text-white/50">Download size</div>
        </div>

        <div className="p-5 rounded-2xl border border-white/15 bg-[#0E0E0E] space-y-3">
          <div className="flex items-center justify-between">
            <TrendingUp className="w-5 h-5 text-sky-400" />
            <span className="text-[10px] font-mono-code text-white/40 uppercase">Avg Size</span>
          </div>
          <div className="text-2xl font-bold text-white font-serif-luxury">{analytics.averageFileSize}</div>
          <div className="text-xs text-white/50">Per wallpaper</div>
        </div>

        <div className="p-5 rounded-2xl border border-white/15 bg-[#0E0E0E] space-y-3">
          <div className="flex items-center justify-between">
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="text-[10px] font-mono-code text-white/40 uppercase">Compression</span>
          </div>
          <div className="text-2xl font-bold text-white font-serif-luxury">{analytics.compressionRatio}%</div>
          <div className="text-xs text-white/50">Space saved</div>
        </div>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* macOS Version Distribution */}
        <div className="rounded-2xl border border-white/15 bg-[#0E0E0E] p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-[#C5A36A]" />
            <h2 className="text-lg font-serif-luxury font-bold text-white">macOS Version Distribution</h2>
          </div>
          <div className="space-y-3">
            {Object.entries(analytics.versionDistribution)
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .map(([version, count]) => {
                const percentage = (((count as number) / analytics.totalAssets) * 100).toFixed(1);
                return (
                  <div key={version} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/80">{version}</span>
                      <span className="text-white/60">{count} ({percentage}%)</span>
                    </div>
                    <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#C5A36A] to-[#C5A36A]/60 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Asset Type Distribution */}
        <div className="rounded-2xl border border-white/15 bg-[#0E0E0E] p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-serif-luxury font-bold text-white">Asset Type Distribution</h2>
          </div>
          <div className="space-y-3">
            {Object.entries(analytics.typeDistribution)
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .map(([type, count]) => {
                const percentage = (((count as number) / analytics.totalAssets) * 100).toFixed(1);
                return (
                  <div key={type} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/80">{type}</span>
                      <span className="text-white/60">{count} ({percentage}%)</span>
                    </div>
                    <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-500/60 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="rounded-2xl border border-white/15 bg-[#0E0E0E] p-6 space-y-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-serif-luxury font-bold text-white">Category Distribution</h2>
          </div>
          <div className="space-y-3">
            {Object.entries(analytics.categoryDistribution)
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .map(([category, count]) => {
                const percentage = (((count as number) / analytics.totalAssets) * 100).toFixed(1);
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/80">{category}</span>
                      <span className="text-white/60">{count} ({percentage}%)</span>
                    </div>
                    <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-500 to-sky-500/60 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="rounded-2xl border border-white/15 bg-[#0E0E0E] p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-rose-400" />
            <h2 className="text-lg font-serif-luxury font-bold text-white">Technical Specifications</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <div className="text-[10px] font-mono-code text-white/50 uppercase">Streamable</div>
              <div className="text-lg font-bold text-emerald-400">{analytics.streamablePercentage}%</div>
              <div className="text-xs text-white/60">{analytics.streamableCount} assets</div>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <div className="text-[10px] font-mono-code text-white/50 uppercase">Required by OS</div>
              <div className="text-lg font-bold text-amber-400">{analytics.requiredByOSPercentage}%</div>
              <div className="text-xs text-white/60">{analytics.requiredByOSCount} assets</div>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <div className="text-[10px] font-mono-code text-white/50 uppercase">Local Cache</div>
              <div className="text-lg font-bold text-sky-400">{analytics.localCachePercentage}%</div>
              <div className="text-xs text-white/60">{analytics.localCacheCount} assets</div>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <div className="text-[10px] font-mono-code text-white/50 uppercase">Compression Algos</div>
              <div className="text-lg font-bold text-[#C5A36A]">{Object.keys(analytics.compressionDistribution).length}</div>
              <div className="text-xs text-white/60">Different types</div>
            </div>
          </div>
        </div>
      </div>

      {/* Size Extremes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analytics.largestAsset && (
          <div className="rounded-2xl border border-white/15 bg-[#0E0E0E] p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-serif-luxury font-bold text-white">Largest Asset</h2>
            </div>
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white font-serif-luxury">
                  {analytics.largestAsset.desktopPictureId}
                </h3>
                <span className="text-lg font-bold text-amber-400">
                  {analytics.formatBytes(analytics.largestAsset.downloadSize)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/60">
                <span>{analytics.largestAsset.macOSVersionTag}</span>
                <span>•</span>
                <span>{analytics.largestAsset.category}</span>
              </div>
            </div>
          </div>
        )}

        {analytics.smallestAsset && (
          <div className="rounded-2xl border border-white/15 bg-[#0E0E0E] p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-serif-luxury font-bold text-white">Smallest Asset</h2>
            </div>
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white font-serif-luxury">
                  {analytics.smallestAsset.desktopPictureId}
                </h3>
                <span className="text-lg font-bold text-emerald-400">
                  {analytics.formatBytes(analytics.smallestAsset.downloadSize)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/60">
                <span>{analytics.smallestAsset.macOSVersionTag}</span>
                <span>•</span>
                <span>{analytics.smallestAsset.category}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Build Distribution */}
      <div className="rounded-2xl border border-white/15 bg-[#0E0E0E] p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-serif-luxury font-bold text-white">Build Distribution</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Object.entries(analytics.buildDistribution)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .slice(0, 12)
            .map(([build, count]) => (
              <div key={build} className="p-3 rounded-xl bg-black/40 border border-white/5 text-center">
                <div className="text-xs font-mono-code text-white/50 mb-1">{build}</div>
                <div className="text-lg font-bold text-white">{count}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}