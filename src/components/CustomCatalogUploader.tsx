import { useState, ChangeEvent } from 'react';
import { X, Upload, FileText, Sparkles, AlertCircle } from 'lucide-react';
import { parsePlistXml } from '../utils/plistParser';
import { DesktopPictureAsset, ManifestMetadata } from '../types';

interface CustomCatalogUploaderProps {
  onCatalogLoaded: (xmlString: string, assets: DesktopPictureAsset[], metadata: ManifestMetadata) => void;
  onClose: () => void;
}

export function CustomCatalogUploader({ onCatalogLoaded, onClose }: CustomCatalogUploaderProps) {
  const [pasteText, setPasteText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleParseText = () => {
    if (!pasteText.trim()) {
      setError('Please paste valid Apple MobileAsset XML/plist content');
      return;
    }
    try {
      const { assets, metadata } = parsePlistXml(pasteText);
      onCatalogLoaded(pasteText, assets, metadata);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to parse XML Plist');
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const { assets, metadata } = parsePlistXml(content);
        onCatalogLoaded(content, assets, metadata);
        onClose();
      } catch (err: any) {
        setError(err.message || 'Failed to parse file as Apple Plist');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/15 bg-[#0A0A0A] shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#C5A36A]/40 bg-neutral-900 flex items-center justify-center">
              <Upload className="w-4 h-4 text-[#C5A36A]" />
            </div>
            <div>
              <h3 className="text-lg font-serif-luxury font-light text-white">
                Load Custom MobileAsset Plist
              </h3>
              <p className="text-xs text-white/50">
                Parse any Apple macOS or iOS MobileAsset XML catalog
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* File Upload Zone */}
          <label className="border-2 border-dashed border-white/15 hover:border-[#C5A36A]/60 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-neutral-950/40 hover:bg-[#C5A36A]/5 transition-all">
            <Upload className="w-6 h-6 text-[#C5A36A]" />
            <span className="text-xs font-semibold text-white/80">Choose .plist or .xml file</span>
            <span className="text-[11px] text-white/40">Drag &amp; drop or click to browse</span>
            <input type="file" accept=".xml,.plist,.txt" onChange={handleFileUpload} className="hidden" />
          </label>

          <div className="flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-white/10" />
            <span className="text-[10px] uppercase font-mono-code text-white/30">Or Paste XML Plist</span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <textarea
            rows={7}
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            placeholder="<?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?>&#10;<!DOCTYPE plist PUBLIC...>"
            className="w-full bg-[#050505] border border-white/10 focus:border-[#C5A36A]/60 rounded-xl p-3 text-xs font-mono-code text-white/90 placeholder:text-white/20 focus:outline-none"
          />

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full border border-white/15 text-white/60 hover:text-white text-xs"
            >
              Cancel
            </button>
            <button
              onClick={handleParseText}
              className="px-6 py-2 rounded-full bg-[#C5A36A] text-black font-semibold hover:bg-white transition-all text-xs"
            >
              Parse &amp; Load Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
