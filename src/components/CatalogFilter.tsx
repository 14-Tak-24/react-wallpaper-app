import { Search, Filter, ArrowUpDown, Grid3X3, LayoutList, X, Laptop, Sparkles, Layers, RotateCcw } from 'lucide-react';
import { MacOSVersion, AssetType } from '../types';

interface CatalogFilterProps {
  macOSVersions: MacOSVersion[];
  selectedVersion: MacOSVersion;
  onSelectVersion: (version: MacOSVersion) => void;
  assetTypes: AssetType[];
  selectedAssetType: AssetType;
  onSelectAssetType: (type: AssetType) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: 'name' | 'size-desc' | 'size-asc' | 'version';
  onSortChange: (sort: 'name' | 'size-desc' | 'size-asc' | 'version') => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalFiltered: number;
  onResetFilters: () => void;
}

export function CatalogFilter({
  macOSVersions,
  selectedVersion,
  onSelectVersion,
  assetTypes,
  selectedAssetType,
  onSelectAssetType,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalFiltered,
  onResetFilters,
}: CatalogFilterProps) {
  const isFiltered = searchQuery !== '' || selectedVersion !== 'All' || selectedAssetType !== 'All';

  return (
    <div id="catalog-filter-controls" className="sticky top-20 z-30 bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 py-4 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Top Control Bar: Search + Sort + View */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A36A]" />
            <input
              id="wallpaper-search-input"
              type="text"
              placeholder="Search by macOS release (e.g., Sequoia, Sonoma), style, SHA-1..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#0E0E0E] border border-white/15 focus:border-[#C5A36A] focus:ring-1 focus:ring-[#C5A36A]/50 rounded-full pl-10 pr-9 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                id="clear-search-btn"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Tools: Sort dropdown + Reset + View switcher */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end flex-wrap">
            {isFiltered && (
              <button
                id="reset-filter-btn"
                onClick={onResetFilters}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-[11px] font-mono-code transition-all"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}

            <div className="flex items-center gap-2 text-xs text-white/60">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#C5A36A]" />
              <span className="text-[11px] uppercase tracking-wider text-white/40 hidden sm:inline">Sort:</span>
              <select
                id="wallpaper-sort-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as any)}
                className="bg-[#0E0E0E] border border-white/15 text-white/90 rounded-full px-3 py-1.5 text-xs focus:border-[#C5A36A] focus:outline-none cursor-pointer"
              >
                <option value="name">Name (A-Z)</option>
                <option value="version">macOS Version</option>
                <option value="size-desc">Largest File Size</option>
                <option value="size-asc">Smallest File Size</option>
              </select>
            </div>

            <div className="flex items-center border border-white/15 rounded-full p-0.5 bg-[#0E0E0E]">
              <button
                id="view-mode-grid"
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 rounded-full transition-all ${
                  viewMode === 'grid' ? 'bg-[#C5A36A] text-black shadow-md' : 'text-white/40 hover:text-white'
                }`}
                title="Grid View"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
              <button
                id="view-mode-list"
                onClick={() => onViewModeChange('list')}
                className={`p-1.5 rounded-full transition-all ${
                  viewMode === 'list' ? 'bg-[#C5A36A] text-black shadow-md' : 'text-white/40 hover:text-white'
                }`}
                title="List View"
              >
                <LayoutList className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-[11px] font-mono-code text-white/40 pl-2">
              <span className="text-[#C5A36A] font-semibold">{totalFiltered}</span> assets found
            </div>
          </div>
        </div>

        {/* Filter Row 1: macOS Versions */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[10px] uppercase font-mono-code text-[#C5A36A] tracking-wider">
            <Laptop className="w-3 h-3" />
            <span>Filter by macOS Version:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {macOSVersions.map((version) => {
              const isSelected = selectedVersion === version;
              return (
                <button
                  key={version}
                  id={`filter-ver-${version.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => onSelectVersion(version)}
                  className={`whitespace-nowrap px-3.5 py-1 rounded-full text-[11px] tracking-wide font-sans transition-all border ${
                    isSelected
                      ? 'bg-[#C5A36A] text-black border-[#C5A36A] font-bold shadow-[0_0_12px_rgba(197,163,106,0.3)]'
                      : 'bg-[#0E0E0E] text-white/60 border-white/10 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {version}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Row 2: Asset Types */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center gap-2 text-[10px] uppercase font-mono-code text-[#C5A36A] tracking-wider">
            <Layers className="w-3 h-3" />
            <span>Filter by Asset Type:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {assetTypes.map((type) => {
              const isSelected = selectedAssetType === type;
              return (
                <button
                  key={type}
                  id={`filter-type-${type.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => onSelectAssetType(type)}
                  className={`whitespace-nowrap px-3.5 py-1 rounded-full text-[11px] tracking-wide font-sans transition-all border ${
                    isSelected
                      ? 'bg-white text-black border-white font-bold shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                      : 'bg-[#0E0E0E] text-white/60 border-white/10 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
