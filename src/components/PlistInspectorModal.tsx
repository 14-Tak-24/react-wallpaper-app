import { useState } from 'react';
import { X, Copy, Check, Download, FileCode, ShieldCheck, Braces } from 'lucide-react';
import { ManifestMetadata, DesktopPictureAsset } from '../types';

interface PlistInspectorModalProps {
  xmlString: string;
  metadata: ManifestMetadata;
  assets: DesktopPictureAsset[];
  onClose: () => void;
}

export function PlistInspectorModal({ xmlString, metadata, assets, onClose }: PlistInspectorModalProps) {
  const [viewFormat, setViewFormat] = useState<'xml' | 'json'>('xml');
  const [copied, setCopied] = useState(false);

  const jsonContent = JSON.stringify({ metadata, assets }, null, 2);
  const activeContent = viewFormat === 'xml' ? xmlString : jsonContent;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = viewFormat === 'xml' ? 'plist' : 'json';
    const blob = new Blob([activeContent], { type: viewFormat === 'xml' ? 'application/xml' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `com_apple_MobileAsset_DesktopPicture.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-5xl rounded-2xl border border-white/15 bg-[#0A0A0A] shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#C5A36A]/40 bg-neutral-900 flex items-center justify-center">
              <FileCode className="w-4 h-4 text-[#C5A36A]" />
            </div>
            <div>
              <h3 className="text-lg font-serif-luxury font-light text-white">
                Apple MobileAsset Manifest Inspector
              </h3>
              <p className="text-xs text-white/50">
                {metadata.assetType} • FormatVersion {metadata.formatVersion}
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

        {/* View Switcher & Action Bar */}
        <div className="px-6 py-3 border-b border-white/10 bg-black/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewFormat('xml')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-code transition-all border ${
                viewFormat === 'xml'
                  ? 'bg-[#C5A36A] text-black border-[#C5A36A] font-semibold'
                  : 'bg-neutral-900 text-white/60 border-white/10 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Raw Apple Plist XML</span>
            </button>

            <button
              onClick={() => setViewFormat('json')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-code transition-all border ${
                viewFormat === 'json'
                  ? 'bg-[#C5A36A] text-black border-[#C5A36A] font-semibold'
                  : 'bg-neutral-900 text-white/60 border-white/10 hover:text-white'
              }`}
            >
              <Braces className="w-3.5 h-3.5" />
              <span>Structured JSON Schema</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-neutral-900 text-white/80 hover:text-white hover:border-[#C5A36A]/50 transition-all text-xs font-mono-code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#C5A36A]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C5A36A] text-black font-semibold hover:bg-white transition-all text-xs font-sans"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export {viewFormat.toUpperCase()}</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#050505] font-mono-code text-[11px] text-white/70 leading-relaxed select-all">
          <pre className="whitespace-pre-wrap">{activeContent}</pre>
        </div>

        {/* Cryptographic Footprint */}
        <div className="px-6 py-3 border-t border-white/10 bg-neutral-950/80 text-[11px] text-white/40 flex items-center justify-between">
          <span className="truncate max-w-lg">Certificate: Apple iOS / macOS Asset Manifest Signing</span>
          <span>Checked: {metadata.lastTimeChecked || '2026-07-20'}</span>
        </div>
      </div>
    </div>
  );
}
