import { useState, useMemo } from 'react';
import { Navbar, MainNavTab } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CatalogFilter } from './components/CatalogFilter';
import { AssetCard } from './components/AssetCard';
import { WallpaperPreviewer } from './components/WallpaperPreviewer';
import { WallpaperDownloader } from './components/WallpaperDownloader';
import { WallpaperSimulatorModal } from './components/WallpaperSimulatorModal';
import { BatchDownloadModal } from './components/BatchDownloadModal';
import { PlistInspectorModal } from './components/PlistInspectorModal';
import { CustomCatalogUploader } from './components/CustomCatalogUploader';
import { GobblersKnobHub } from './components/GobblersKnobHub';
import { VoiceCloningPortfolio } from './components/VoiceCloningPortfolio';
import { AudioWallpaperExperience } from './components/AudioWallpaperExperience';
import { WallpaperAnalytics } from './components/WallpaperAnalytics';
import { WallpaperCollections } from './components/WallpaperCollections';
import { DEFAULT_PLIST_XML } from './data/defaultCatalog';
import { parsePlistXml } from './utils/plistParser';
import { DesktopPictureAsset, ManifestMetadata, MacOSVersion, AssetType } from './types';

// Pre-parse default catalog
const INITIAL_PARSED = parsePlistXml(DEFAULT_PLIST_XML);

const ALL_MACOS_VERSIONS: MacOSVersion[] = [
  'All',
  'macOS Sequoia 15',
  'macOS Sonoma 14',
  'macOS Ventura 13',
  'macOS Monterey 12',
  'macOS Big Sur 11',
  'macOS Catalina 10.15',
  '24" iMac Editions',
  'Classic Macintosh',
];

const ALL_ASSET_TYPES: AssetType[] = [
  'All',
  'Light Mode',
  'Dark Mode',
  'Dynamic / Dual',
  'Abstract & Graphic',
  'Nature & Landscape',
  'Hello & Typography',
  'Studio & Metallic',
];

export default function App() {
  // Navigation
  const [activeNavTab, setActiveNavTab] = useState<MainNavTab>('gobblers-knob');

  // Catalog State
  const [currentPlistXml, setCurrentPlistXml] = useState<string>(DEFAULT_PLIST_XML);
  const [assets, setAssets] = useState<DesktopPictureAsset[]>(INITIAL_PARSED.assets);
  const [metadata, setMetadata] = useState<ManifestMetadata>(INITIAL_PARSED.metadata);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVersion, setSelectedVersion] = useState<MacOSVersion>('All');
  const [selectedAssetType, setSelectedAssetType] = useState<AssetType>('All');
  const [sortBy, setSortBy] = useState<'name' | 'size-desc' | 'size-asc' | 'version'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Active Preview Asset
  const [previewingAsset, setPreviewingAsset] = useState<DesktopPictureAsset | null>(INITIAL_PARSED.assets[0] || null);

  // Modals
  const [isSimulatorModalOpen, setIsSimulatorModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isPlistModalOpen, setIsPlistModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Filter Logic
  const filteredAssets = useMemo(() => {
    return assets
      .filter((asset) => {
        // macOS Version Filter
        if (selectedVersion !== 'All') {
          if (asset.macOSVersionCategory !== selectedVersion) {
            return false;
          }
        }

        // Asset Type Filter
        if (selectedAssetType !== 'All') {
          if (asset.assetType !== selectedAssetType) {
            return false;
          }
        }

        // Text Search
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase().trim();
          const matchId = asset.desktopPictureId.toLowerCase().includes(q);
          const matchTag = asset.macOSVersionTag.toLowerCase().includes(q);
          const matchCat = asset.category.toLowerCase().includes(q);
          const matchSha = asset.measurement.toLowerCase().includes(q);
          const matchDesc = asset.gradientTheme.description.toLowerCase().includes(q);
          const matchBuild = asset.build.toLowerCase().includes(q);
          if (!matchId && !matchTag && !matchCat && !matchSha && !matchDesc && !matchBuild) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.desktopPictureId.localeCompare(b.desktopPictureId);
        }
        if (sortBy === 'size-desc') {
          return b.downloadSize - a.downloadSize;
        }
        if (sortBy === 'size-asc') {
          return a.downloadSize - b.downloadSize;
        }
        if (sortBy === 'version') {
          return a.macOSVersionTag.localeCompare(b.macOSVersionTag);
        }
        return 0;
      });
  }, [assets, selectedVersion, selectedAssetType, searchQuery, sortBy]);

  // Handlers
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedVersion('All');
    setSelectedAssetType('All');
    setSortBy('name');
  };

  const handleOpenPreviewStudio = (asset: DesktopPictureAsset) => {
    setPreviewingAsset(asset);
    setActiveNavTab('previewer');
  };

  const handleOpenSimulatorModal = (asset?: DesktopPictureAsset) => {
    if (asset) setPreviewingAsset(asset);
    setIsSimulatorModalOpen(true);
  };

  const handleCustomPlistLoaded = (xmlString: string) => {
    try {
      const parsed = parsePlistXml(xmlString);
      setCurrentPlistXml(xmlString);
      setAssets(parsed.assets);
      setMetadata(parsed.metadata);
      if (parsed.assets.length > 0) {
        setPreviewingAsset(parsed.assets[0]);
      }
      setIsUploadModalOpen(false);
    } catch (err: any) {
      alert(`Failed to parse XML Plist: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F0] flex flex-col font-sans selection:bg-[#C5A36A] selection:text-black">
      {/* Top Navbar */}
      <Navbar
        metadata={metadata}
        activeNavTab={activeNavTab}
        onSelectNavTab={setActiveNavTab}
        onOpenBatchModal={() => setIsBatchModalOpen(true)}
        onOpenPlistModal={() => setIsPlistModalOpen(true)}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-20">
        {/* GOBBLER'S KNOB ARCHIVE & INTEL HUB */}
        {activeNavTab === 'gobblers-knob' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            <GobblersKnobHub />
          </div>
        )}

        {/* CATALOG VIEW */}
        {activeNavTab === 'catalog' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Hero Section */}
            <HeroSection
              metadata={metadata}
              totalWallpapers={assets.length}
              filteredCount={filteredAssets.length}
              onOpenBatchModal={() => setIsBatchModalOpen(true)}
              onOpenSimulatorForFeatured={() => handleOpenPreviewStudio(assets[0])}
            />

            {/* Filter & Search Bar */}
            <CatalogFilter
              macOSVersions={ALL_MACOS_VERSIONS}
              selectedVersion={selectedVersion}
              onSelectVersion={setSelectedVersion}
              assetTypes={ALL_ASSET_TYPES}
              selectedAssetType={selectedAssetType}
              onSelectAssetType={setSelectedAssetType}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              totalFiltered={filteredAssets.length}
              onResetFilters={handleResetFilters}
            />

            {/* Assets Grid / List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {filteredAssets.length === 0 ? (
                <div className="py-20 text-center rounded-2xl border border-white/10 bg-[#0E0E0E] p-8 space-y-4">
                  <div className="w-12 h-12 rounded-full border border-white/20 mx-auto flex items-center justify-center text-[#C5A36A]">
                    🔍
                  </div>
                  <h3 className="text-xl font-serif-luxury font-light text-white">
                    No matching wallpapers found
                  </h3>
                  <p className="text-xs text-white/50 max-w-md mx-auto">
                    Try adjusting your search query, macOS version selection, or asset type filter.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2 rounded-full bg-[#C5A36A] text-black font-semibold text-xs tracking-wider uppercase"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredAssets.map((asset) => (
                    <AssetCard
                      key={asset.desktopPictureId}
                      asset={asset}
                      onPreview={handleOpenPreviewStudio}
                      viewMode="grid"
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAssets.map((asset) => (
                    <AssetCard
                      key={asset.desktopPictureId}
                      asset={asset}
                      onPreview={handleOpenPreviewStudio}
                      viewMode="list"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* RESOLUTION PREVIEWER VIEW */}
        {activeNavTab === 'previewer' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            <WallpaperPreviewer
              asset={previewingAsset}
              allAssets={assets}
              onSelectAsset={setPreviewingAsset}
              onAddToDownloadQueue={(a) => {
                setPreviewingAsset(a);
                setActiveNavTab('downloader');
              }}
              onOpenBatchModal={() => setIsBatchModalOpen(true)}
            />
          </div>
        )}

        {/* CDN DOWNLOADER VIEW */}
        {activeNavTab === 'downloader' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            <WallpaperDownloader
              assets={assets}
              onOpenBatchModal={() => setIsBatchModalOpen(true)}
              onPreviewAsset={handleOpenPreviewStudio}
            />
          </div>
        )}

        {/* VOICE CLONING PORTFOLIO VIEW */}
        {activeNavTab === 'voice-cloning' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            <VoiceCloningPortfolio />
          </div>
        )}

        {/* AUDIO WALLPAPER EXPERIENCE VIEW */}
        {activeNavTab === 'audio-experience' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            <AudioWallpaperExperience wallpapers={assets} />
          </div>
        )}

        {/* ANALYTICS VIEW */}
        {activeNavTab === 'analytics' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            <WallpaperAnalytics assets={assets} />
          </div>
        )}

        {/* COLLECTIONS VIEW */}
        {activeNavTab === 'collections' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            <WallpaperCollections wallpapers={assets} allAssets={assets} />
          </div>
        )}
      </main>

      {/* Global Modals */}
      {isSimulatorModalOpen && (
        <WallpaperSimulatorModal
          asset={previewingAsset}
          onClose={() => setIsSimulatorModalOpen(false)}
        />
      )}

      {isBatchModalOpen && (
        <BatchDownloadModal
          assets={assets}
          onClose={() => setIsBatchModalOpen(false)}
        />
      )}

      {isPlistModalOpen && (
        <PlistInspectorModal
          xmlString={currentPlistXml}
          metadata={metadata}
          assets={assets}
          onClose={() => setIsPlistModalOpen(false)}
        />
      )}

      {isUploadModalOpen && (
        <CustomCatalogUploader
          onCatalogLoaded={(xmlString, newAssets, newMetadata) => {
            setCurrentPlistXml(xmlString);
            setAssets(newAssets);
            setMetadata(newMetadata);
            if (newAssets.length > 0) {
              setPreviewingAsset(newAssets[0]);
            }
            setIsUploadModalOpen(false);
          }}
          onClose={() => setIsUploadModalOpen(false)}
        />
      )}

      {/* Luxury Footer */}
      <footer className="border-t border-white/10 bg-[#050505] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/40 font-mono-code">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border border-[#C5A36A]/40 flex items-center justify-center text-[10px] text-[#C5A36A] font-bold">
              
            </div>
            <span className="font-serif-luxury italic text-sm text-white/70">
              macOS MobileAsset Desktop Picture Engine • updates.cdn-apple.com
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <button onClick={() => setActiveNavTab('gobblers-knob')} className="hover:text-[#C5A36A] transition-colors cursor-pointer text-[#C5A36A]">
              ★ Gobbler's Knob Archive
            </button>
            <button onClick={() => setActiveNavTab('catalog')} className="hover:text-[#C5A36A] transition-colors cursor-pointer">
              macOS Catalog ({assets.length})
            </button>
            <button onClick={() => setActiveNavTab('previewer')} className="hover:text-[#C5A36A] transition-colors cursor-pointer">
              Resolution Studio
            </button>
            <button onClick={() => setActiveNavTab('downloader')} className="hover:text-[#C5A36A] transition-colors cursor-pointer">
              CDN Downloader
            </button>
            <button onClick={() => setActiveNavTab('voice-cloning')} className="hover:text-[#C5A36A] transition-colors cursor-pointer">
              Voice Cloning Studio
            </button>
            <button onClick={() => setActiveNavTab('audio-experience')} className="hover:text-[#C5A36A] transition-colors cursor-pointer">
              Audio-Wallpaper Experience
            </button>
            <button onClick={() => setActiveNavTab('analytics')} className="hover:text-[#C5A36A] transition-colors cursor-pointer">
              Analytics Dashboard
            </button>
            <button onClick={() => setActiveNavTab('collections')} className="hover:text-[#C5A36A] transition-colors cursor-pointer">
              Collections & Favorites
            </button>
            <button onClick={() => setIsBatchModalOpen(true)} className="hover:text-[#C5A36A] transition-colors cursor-pointer">
              Batch CLI Generator
            </button>
            <button onClick={() => setIsPlistModalOpen(true)} className="hover:text-[#C5A36A] transition-colors cursor-pointer">
              Property List XML
            </button>
          </div>

          <div className="text-[10px] text-white/30">
            Apple MobileAsset Build 10M8877 • SHA-1 Verified
          </div>
        </div>
      </footer>
    </div>
  );
}
