import { useState, useMemo } from 'react';
import {
  Heart,
  FolderPlus,
  Star,
  Trash2,
  Edit,
  Copy,
  Check,
  Download,
  Eye,
  Share2,
  Grid3x3,
  List,
  Search,
  Filter,
  X,
  ChevronRight,
  Plus,
  Settings,
  Lock,
  Unlock,
  Calendar,
  Clock,
  Image as ImageIcon,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { DesktopPictureAsset } from '../types';

export interface WallpaperCollection {
  id: string;
  name: string;
  description: string;
  wallpapers: string[]; // wallpaper IDs
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  icon?: string;
  color?: string;
}

export interface WallpaperFavorites {
  wallpaperIds: string[];
  collections: WallpaperCollection[];
}

// Sample collections data
const SAMPLE_COLLECTIONS: WallpaperCollection[] = [
  {
    id: 'col-001',
    name: 'Abstract Favorites',
    description: 'Best abstract and graphic wallpapers',
    wallpapers: [],
    isPublic: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-08-28T14:20:00Z',
    icon: '✨',
    color: '#C5A36A'
  },
  {
    id: 'col-002',
    name: 'Nature Collection',
    description: 'Beautiful nature and landscape wallpapers',
    wallpapers: [],
    isPublic: false,
    createdAt: '2024-02-20T09:15:00Z',
    updatedAt: '2024-08-25T11:45:00Z',
    icon: '🌿',
    color: '#50C878'
  },
  {
    id: 'col-003',
    name: 'Dark Mode Essentials',
    description: 'Perfect dark mode wallpapers for focus',
    wallpapers: [],
    isPublic: true,
    createdAt: '2024-03-10T16:00:00Z',
    updatedAt: '2024-08-29T08:30:00Z',
    icon: '🌙',
    color: '#4A90E2'
  }
];

export function WallpaperCollections({ wallpapers, allAssets }: { wallpapers: DesktopPictureAsset[]; allAssets: DesktopPictureAsset[] }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [collections, setCollections] = useState<WallpaperCollection[]>(SAMPLE_COLLECTIONS);
  const [selectedCollection, setSelectedCollection] = useState<WallpaperCollection | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState<WallpaperCollection | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New collection form state
  const [newCollection, setNewCollection] = useState({
    name: '',
    description: '',
    isPublic: false,
    icon: '📁',
    color: '#C5A36A'
  });

  // Filter wallpapers based on search
  const filteredWallpapers = useMemo(() => {
    return wallpapers.filter(wallpaper => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        wallpaper.desktopPictureId.toLowerCase().includes(q) ||
        wallpaper.category.toLowerCase().includes(q) ||
        wallpaper.macOSVersionTag.toLowerCase().includes(q)
      );
    });
  }, [wallpapers, searchQuery]);

  // Get wallpapers for selected collection
  const collectionWallpapers = useMemo(() => {
    if (!selectedCollection) return [];
    return allAssets.filter(asset => selectedCollection.wallpapers.includes(asset.desktopPictureId));
  }, [selectedCollection, allAssets]);

  // Toggle favorite
  const toggleFavorite = (wallpaperId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(wallpaperId)) {
      newFavorites.delete(wallpaperId);
    } else {
      newFavorites.add(wallpaperId);
    }
    setFavorites(newFavorites);
  };

  // Add wallpaper to collection
  const addToCollection = (wallpaperId: string, collectionId: string) => {
    setCollections(prev => prev.map(col => {
      if (col.id === collectionId && !col.wallpapers.includes(wallpaperId)) {
        return {
          ...col,
          wallpapers: [...col.wallpapers, wallpaperId],
          updatedAt: new Date().toISOString()
        };
      }
      return col;
    }));
  };

  // Remove wallpaper from collection
  const removeFromCollection = (wallpaperId: string, collectionId: string) => {
    setCollections(prev => prev.map(col => {
      if (col.id === collectionId) {
        return {
          ...col,
          wallpapers: col.wallpapers.filter(id => id !== wallpaperId),
          updatedAt: new Date().toISOString()
        };
      }
      return col;
    }));
  };

  // Create new collection
  const handleCreateCollection = () => {
    if (!newCollection.name.trim()) return;

    const collection: WallpaperCollection = {
      id: `col-${Date.now()}`,
      name: newCollection.name,
      description: newCollection.description,
      wallpapers: [],
      isPublic: newCollection.isPublic,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      icon: newCollection.icon,
      color: newCollection.color
    };

    setCollections([...collections, collection]);
    setNewCollection({ name: '', description: '', isPublic: false, icon: '📁', color: '#C5A36A' });
    setShowCreateModal(false);
  };

  // Update collection
  const handleUpdateCollection = () => {
    if (!editingCollection) return;

    setCollections(prev => prev.map(col => {
      if (col.id === editingCollection.id) {
        return {
          ...editingCollection,
          updatedAt: new Date().toISOString()
        };
      }
      return col;
    }));

    setShowEditModal(false);
    setEditingCollection(null);
  };

  // Delete collection
  const handleDeleteCollection = (collectionId: string) => {
    setCollections(prev => prev.filter(col => col.id !== collectionId));
    if (selectedCollection?.id === collectionId) {
      setSelectedCollection(null);
    }
  };

  // Copy collection
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const ICON_OPTIONS = ['📁', '✨', '🌿', '🌙', '🎨', '🖼️', '🌊', '🔥', '💎', '🚀'];
  const COLOR_OPTIONS = ['#C5A36A', '#4A90E2', '#50C878', '#E74C3C', '#9B59B6', '#F39C12', '#1ABC9C', '#34495E'];

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl border border-[#C5A36A]/30 bg-gradient-to-br from-[#120D08] via-[#0E0E0E] to-[#080808] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A36A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A36A]/40 bg-[#C5A36A]/10 text-xs font-mono-code text-[#C5A36A]">
            <Heart className="w-3.5 h-3.5" />
            <span>COLLECTIONS & FAVORITES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-light text-white leading-tight">
            Wallpaper Collections
          </h1>

          <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed max-w-3xl">
            Organize your favorite wallpapers into custom collections. Create themed sets, share curated lists, and quickly access your most-loved desktop pictures.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono-code">
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-white/80">
              <Heart className="w-3 h-3 inline mr-1" /> {favorites.size} Favorites
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[#C5A36A]">
              <FolderPlus className="w-3 h-3 inline mr-1" /> {collections.length} Collections
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-emerald-400">
              <ImageIcon className="w-3 h-3 inline mr-1" /> {wallpapers.length} Available
            </span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-[#0E0E0E] p-4 rounded-2xl border border-white/10">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search wallpapers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A36A]"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'grid' ? 'bg-[#C5A36A] text-black' : 'bg-black/40 text-white/60 hover:text-white'
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'list' ? 'bg-[#C5A36A] text-black' : 'bg-black/40 text-white/60 hover:text-white'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C5A36A] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#C5A36A]/90 transition-colors"
          >
            <FolderPlus className="w-4 h-4" />
            <span>New Collection</span>
          </button>
        </div>
      </div>

      {/* Collections Grid */}
      {!selectedCollection && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif-luxury font-bold text-white">Your Collections</h2>
            <span className="text-xs font-mono-code text-white/50">{collections.length} collections</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collections.map((collection) => (
              <div
                key={collection.id}
                onClick={() => setSelectedCollection(collection)}
                className="p-5 rounded-2xl border border-white/15 bg-[#0E0E0E] hover:border-white/25 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg border border-white/20"
                      style={{ backgroundColor: `${collection.color}20` }}
                    >
                      {collection.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white font-serif-luxury">{collection.name}</h3>
                      <p className="text-xs text-white/50">{collection.wallpapers.length} wallpapers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {collection.isPublic && (
                      <div className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono-code">
                        Public
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-white/60 line-clamp-2 mb-4">{collection.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(collection.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-[#C5A36A] transition-colors" />
                </div>
              </div>
            ))}

            {/* Create New Collection Card */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="p-5 rounded-2xl border border-dashed border-white/20 bg-[#0E0E0E] hover:border-[#C5A36A]/50 hover:bg-[#161410] transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#C5A36A]/10 transition-colors">
                  <Plus className="w-6 h-6 text-white/40 group-hover:text-[#C5A36A]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white font-serif-luxury">Create Collection</h3>
                  <p className="text-xs text-white/50">Organize wallpapers</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Selected Collection View */}
      {selectedCollection && (
        <div className="space-y-6">
          {/* Collection Header */}
          <div className="p-6 rounded-2xl border border-white/15 bg-[#0E0E0E]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-white/20"
                  style={{ backgroundColor: `${selectedCollection.color}20` }}
                >
                  {selectedCollection.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-serif-luxury font-bold text-white">{selectedCollection.name}</h2>
                    {selectedCollection.isPublic && (
                      <div className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono-code">
                        Public
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-white/60 mb-2">{selectedCollection.description}</p>
                  <div className="flex items-center gap-4 text-xs text-white/40">
                    <span>{selectedCollection.wallpapers.length} wallpapers</span>
                    <span>•</span>
                    <span>Updated {new Date(selectedCollection.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingCollection(selectedCollection);
                    setShowEditModal(true);
                  }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  title="Edit collection"
                >
                  <Edit className="w-4 h-4 text-white/60" />
                </button>
                <button
                  onClick={() => handleCopy(selectedCollection.id, JSON.stringify(selectedCollection, null, 2))}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  title="Copy collection data"
                >
                  {copiedId === selectedCollection.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-white/60" />
                  )}
                </button>
                <button
                  onClick={() => handleDeleteCollection(selectedCollection.id)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
                  title="Delete collection"
                >
                  <Trash2 className="w-4 h-4 text-white/60" />
                </button>
                <button
                  onClick={() => setSelectedCollection(null)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  title="Back to collections"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>
            </div>
          </div>

          {/* Collection Wallpapers */}
          {collectionWallpapers.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Wallpapers in Collection</h3>
                <span className="text-xs font-mono-code text-white/50">{collectionWallpapers.length} items</span>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {collectionWallpapers.map((wallpaper) => (
                    <div
                      key={wallpaper.desktopPictureId}
                      className="p-4 rounded-xl border border-white/15 bg-[#0E0E0E] hover:border-white/25 transition-all group"
                    >
                      <div className="aspect-video bg-[#050505] rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                        <ImageIcon className="w-8 h-8 text-white/20" />
                        <button
                          onClick={() => removeFromCollection(wallpaper.desktopPictureId, selectedCollection.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-rose-500/20 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold text-white font-serif-luxury truncate">
                          {wallpaper.desktopPictureId}
                        </h4>
                        <p className="text-[10px] text-white/50">{wallpaper.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {collectionWallpapers.map((wallpaper) => (
                    <div
                      key={wallpaper.desktopPictureId}
                      className="p-4 rounded-xl border border-white/15 bg-[#0E0E0E] hover:border-white/25 transition-all flex items-center gap-4 group"
                    >
                      <div className="w-16 h-10 bg-[#050505] rounded-lg flex items-center justify-center shrink-0">
                        <ImageIcon className="w-5 h-5 text-white/20" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-white font-serif-luxury truncate">
                          {wallpaper.desktopPictureId}
                        </h4>
                        <p className="text-[10px] text-white/50">{wallpaper.category} • {wallpaper.macOSVersionTag}</p>
                      </div>
                      <button
                        onClick={() => removeFromCollection(wallpaper.desktopPictureId, selectedCollection.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4 text-white/60" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl border border-white/10 bg-[#0E0E0E]">
              <div className="w-16 h-16 rounded-full border border-white/20 mx-auto flex items-center justify-center text-white/30 mb-4">
                <ImageIcon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif-luxury font-semibold text-white mb-2">
                No wallpapers yet
              </h3>
              <p className="text-sm text-white/50 max-w-md mx-auto">
                Add wallpapers to this collection from the main catalog to start organizing your favorites.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Create Collection Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E0E0E] rounded-2xl border border-white/15 max-w-md w-full">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-lg font-serif-luxury font-bold text-white">Create Collection</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono-code text-white/70 uppercase">Name *</label>
                <input
                  type="text"
                  value={newCollection.name}
                  onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A36A]"
                  placeholder="Collection name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono-code text-white/70 uppercase">Description</label>
                <textarea
                  value={newCollection.description}
                  onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A36A] resize-none"
                  rows={3}
                  placeholder="Describe your collection..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono-code text-white/70 uppercase">Icon</label>
                  <div className="grid grid-cols-5 gap-2">
                    {ICON_OPTIONS.map((icon) => (
                      <button
                        key={icon}
                        onClick={() => setNewCollection({ ...newCollection, icon })}
                        className={`p-2 rounded-lg text-center transition-all ${
                          newCollection.icon === icon
                            ? 'bg-[#C5A36A] text-black'
                            : 'bg-black/40 hover:bg-white/10'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono-code text-white/70 uppercase">Color</label>
                  <div className="grid grid-cols-4 gap-2">
                    {COLOR_OPTIONS.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewCollection({ ...newCollection, color })}
                        className={`w-8 h-8 rounded-lg transition-all ${
                          newCollection.color === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0E0E0E]' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                <button
                  onClick={() => setNewCollection({ ...newCollection, isPublic: !newCollection.isPublic })}
                  className={`p-2 rounded-lg transition-all ${
                    newCollection.isPublic ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/60'
                  }`}
                >
                  {newCollection.isPublic ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </button>
                <div className="flex-1">
                  <div className="text-xs text-white font-medium">
                    {newCollection.isPublic ? 'Public Collection' : 'Private Collection'}
                  </div>
                  <div className="text-[10px] text-white/50">
                    {newCollection.isPublic ? 'Visible to everyone' : 'Only visible to you'}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs font-medium text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCollection}
                className="px-4 py-2 rounded-lg bg-[#C5A36A] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#C5A36A]/90 transition-colors"
              >
                Create Collection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Collection Modal */}
      {showEditModal && editingCollection && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E0E0E] rounded-2xl border border-white/15 max-w-md w-full">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-lg font-serif-luxury font-bold text-white">Edit Collection</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCollection(null);
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono-code text-white/70 uppercase">Name</label>
                <input
                  type="text"
                  value={editingCollection.name}
                  onChange={(e) => setEditingCollection({ ...editingCollection, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A36A]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono-code text-white/70 uppercase">Description</label>
                <textarea
                  value={editingCollection.description}
                  onChange={(e) => setEditingCollection({ ...editingCollection, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A36A] resize-none"
                  rows={3}
                />
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                <button
                  onClick={() => setEditingCollection({ ...editingCollection, isPublic: !editingCollection.isPublic })}
                  className={`p-2 rounded-lg transition-all ${
                    editingCollection.isPublic ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/60'
                  }`}
                >
                  {editingCollection.isPublic ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </button>
                <div className="flex-1">
                  <div className="text-xs text-white font-medium">
                    {editingCollection.isPublic ? 'Public Collection' : 'Private Collection'}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCollection(null);
                }}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs font-medium text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCollection}
                className="px-4 py-2 rounded-lg bg-[#C5A36A] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#C5A36A]/90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}