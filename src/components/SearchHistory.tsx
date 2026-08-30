import { useState, useEffect } from 'react';
import { Clock, Search, Trash2, TrendingUp, X } from 'lucide-react';

interface SearchHistoryProps {
  onSelectQuery: (query: string) => void;
}

interface SearchEntry {
  query: string;
  timestamp: number;
  count: number;
}

export function SearchHistory({ onSelectQuery }: SearchHistoryProps) {
  const [history, setHistory] = useState<SearchEntry[]>([]);
  const [recentSearches, setRecentSearches] = useState<SearchEntry[]>([]);
  const [trendingSearches, setTrendingSearches] = useState<SearchEntry[]>([]);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('search-history');
    if (saved) {
      const parsed = JSON.parse(saved);
      setHistory(parsed);
      categorizeSearches(parsed);
    }
  }, []);

  const categorizeSearches = (searches: SearchEntry[]) => {
    // Recent searches (last 7 days)
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recent = searches.filter(s => s.timestamp > sevenDaysAgo).slice(0, 10);
    setRecentSearches(recent);

    // Trending searches (most frequent)
    const trending = [...searches]
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    setTrendingSearches(trending);
  };

  const addSearch = (query: string) => {
    if (!query.trim()) return;

    const existing = history.find(h => h.query.toLowerCase() === query.toLowerCase());
    let newHistory: SearchEntry[];

    if (existing) {
      newHistory = history.map(h =>
        h.query.toLowerCase() === query.toLowerCase()
          ? { ...h, timestamp: Date.now(), count: h.count + 1 }
          : h
      );
    } else {
      newHistory = [{ query, timestamp: Date.now(), count: 1 }, ...history];
    }

    // Keep only last 100 searches
    newHistory = newHistory.slice(0, 100);
    setHistory(newHistory);
    localStorage.setItem('search-history', JSON.stringify(newHistory));
    categorizeSearches(newHistory);
  };

  const removeSearch = (query: string) => {
    const newHistory = history.filter(h => h.query !== query);
    setHistory(newHistory);
    localStorage.setItem('search-history', JSON.stringify(newHistory));
    categorizeSearches(newHistory);
  };

  const clearAllHistory = () => {
    if (confirm('Clear all search history?')) {
      setHistory([]);
      setRecentSearches([]);
      setTrendingSearches([]);
      localStorage.removeItem('search-history');
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif-luxury font-light text-white mb-2">Search History</h1>
          <p className="text-sm text-white/50 font-mono-code">
            {history.length} searches recorded
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearAllHistory}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-xs"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border border-white/10 bg-[#0E0E0E] p-8 space-y-4">
          <div className="w-16 h-16 rounded-full border border-white/20 mx-auto flex items-center justify-center text-[#C5A36A]">
            <Clock className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-serif-luxury font-light text-white">
            No search history yet
          </h3>
          <p className="text-sm text-white/50 max-w-md mx-auto">
            Your search queries will appear here as you explore the wallpaper catalog.
          </p>
        </div>
      ) : (
        <>
          {/* Trending Searches */}
          {trendingSearches.length > 0 && (
            <div className="bg-[#0E0E0E] rounded-2xl border border-white/10 p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <TrendingUp className="w-5 h-5 text-[#C5A36A]" />
                <h2 className="text-lg font-serif-luxury text-white">Trending Searches</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((entry, index) => (
                  <button
                    key={entry.query}
                    onClick={() => onSelectQuery(entry.query)}
                    className="group flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/60 border border-white/10 hover:border-[#C5A36A] transition-all text-sm text-white/80 hover:text-white"
                  >
                    <span className="text-[#C5A36A] font-mono-code text-xs">#{index + 1}</span>
                    <span>{entry.query}</span>
                    <span className="text-xs text-white/40">{entry.count}x</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="bg-[#0E0E0E] rounded-2xl border border-white/10 p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Clock className="w-5 h-5 text-[#C5A36A]" />
                <h2 className="text-lg font-serif-luxury text-white">Recent Searches</h2>
              </div>
              <div className="space-y-2">
                {recentSearches.map((entry) => (
                  <div
                    key={entry.query}
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/40 border border-white/5 hover:border-white/20 transition-all group"
                  >
                    <button
                      onClick={() => onSelectQuery(entry.query)}
                      className="flex items-center gap-3 flex-1 text-left"
                    >
                      <Search className="w-4 h-4 text-white/40" />
                      <span className="text-sm text-white/80 group-hover:text-white">{entry.query}</span>
                    </button>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-white/40 font-mono-code">
                        {formatDate(entry.timestamp)}
                      </span>
                      <button
                        onClick={() => removeSearch(entry.query)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 text-red-400 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All History */}
          <div className="bg-[#0E0E0E] rounded-2xl border border-white/10 p-6 space-y-4">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Search className="w-5 h-5 text-[#C5A36A]" />
              <h2 className="text-lg font-serif-luxury text-white">All History</h2>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {history.map((entry) => (
                <div
                  key={entry.query}
                  className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/40 border border-white/5 hover:border-white/20 transition-all group"
                >
                  <button
                    onClick={() => onSelectQuery(entry.query)}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    <Search className="w-4 h-4 text-white/40" />
                    <span className="text-sm text-white/80 group-hover:text-white">{entry.query}</span>
                  </button>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/40 font-mono-code">
                      {entry.count}x • {formatDate(entry.timestamp)}
                    </span>
                    <button
                      onClick={() => removeSearch(entry.query)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 text-red-400 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
