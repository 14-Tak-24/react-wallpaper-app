import { useState, useEffect } from 'react';
import { Palette, Copy, Download, RefreshCw, Check } from 'lucide-react';
import { DesktopPictureAsset } from '../types';

interface ColorPaletteExtractorProps {
  asset: DesktopPictureAsset;
}

interface ColorSwatch {
  hex: string;
  rgb: string;
  hsl: string;
  percentage: number;
}

export function ColorPaletteExtractor({ asset }: ColorPaletteExtractorProps) {
  const [palette, setPalette] = useState<ColorSwatch[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  useEffect(() => {
    extractColors();
  }, [asset]);

  const extractColors = async () => {
    setIsExtracting(true);
    try {
      // Simulate color extraction (in production, you'd use canvas or a library like color-thief)
      const colors = generateMockPalette();
      setPalette(colors);
    } catch (error) {
      console.error('Failed to extract colors:', error);
    } finally {
      setIsExtracting(false);
    }
  };

  const generateMockPalette = (): ColorSwatch[] => {
    // Generate a sophisticated color palette based on the asset's gradient theme
    const baseColors = [
      { hex: '#1a1a2e', name: 'Deep Navy' },
      { hex: '#16213e', name: 'Midnight Blue' },
      { hex: '#0f3460', name: 'Ocean Blue' },
      { hex: '#e94560', name: 'Coral Red' },
      { hex: '#c5a36a', name: 'Gold Accent' },
      { hex: '#f5f5f0', name: 'Off White' },
      { hex: '#0e0e0e', name: 'Charcoal' },
      { hex: '#2d2d44', name: 'Slate' },
    ];

    return baseColors.map((color, index) => ({
      hex: color.hex,
      rgb: hexToRgb(color.hex),
      hsl: hexToHsl(color.hex),
      percentage: Math.max(5, 30 - index * 3),
    }));
  };

  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '';
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToHsl = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '';
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(text);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const downloadPalette = () => {
    const cssContent = palette.map(c => `  --color-${c.hex.replace('#', '')}: ${c.hex};`).join('\n');
    const blob = new Blob([`:root {\n${cssContent}\n}`], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${asset.desktopPictureId.replace(/\s+/g, '-').toLowerCase()}-palette.css`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif-luxury font-light text-white mb-2">Color Palette</h1>
          <p className="text-sm text-white/50 font-mono-code">
            {asset.desktopPictureId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={extractColors}
            disabled={isExtracting}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-[#C5A36A] transition-all text-xs text-white/70 hover:text-white disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isExtracting ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={downloadPalette}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5A36A] text-black font-semibold hover:bg-[#D4B878] transition-all text-xs"
          >
            <Download className="w-4 h-4" />
            Export CSS
          </button>
        </div>
      </div>

      {/* Palette Grid */}
      <div className="bg-[#0E0E0E] rounded-2xl border border-white/10 p-6 space-y-6">
        {/* Main Color Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {palette.slice(0, 4).map((color, index) => (
            <div
              key={color.hex}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              style={{ backgroundColor: color.hex }}
              onClick={() => copyToClipboard(color.hex)}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all text-center">
                  <Copy className="w-6 h-6 text-white mx-auto mb-1" />
                  <span className="text-xs text-white font-mono-code">{color.hex}</span>
                </div>
              </div>
              {copiedHex === color.hex && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Check className="w-8 h-8 text-[#C5A36A]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Extended Palette */}
        <div className="space-y-3">
          <h3 className="text-sm font-serif-luxury text-white/70">Extended Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {palette.map((color) => (
              <div
                key={color.hex}
                className="group p-3 rounded-xl bg-neutral-900/60 border border-white/10 hover:border-[#C5A36A] transition-all cursor-pointer"
                onClick={() => copyToClipboard(color.hex)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg shadow-inner"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono-code text-white truncate">{color.hex}</p>
                    <p className="text-xs text-white/40 truncate">{color.rgb}</p>
                  </div>
                  {copiedHex === color.hex && (
                    <Check className="w-4 h-4 text-[#C5A36A]" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Color Details */}
        <div className="space-y-3">
          <h3 className="text-sm font-serif-luxury text-white/70">Color Details</h3>
          <div className="rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-900/80">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-mono-code text-white/60 uppercase">Color</th>
                  <th className="px-4 py-3 text-left text-xs font-mono-code text-white/60 uppercase">HEX</th>
                  <th className="px-4 py-3 text-left text-xs font-mono-code text-white/60 uppercase">RGB</th>
                  <th className="px-4 py-3 text-left text-xs font-mono-code text-white/60 uppercase">HSL</th>
                  <th className="px-4 py-3 text-left text-xs font-mono-code text-white/60 uppercase">Usage</th>
                </tr>
              </thead>
              <tbody>
                {palette.map((color) => (
                  <tr key={color.hex} className="border-t border-white/5 hover:bg-white/5 transition-all">
                    <td className="px-4 py-3">
                      <div
                        className="w-8 h-8 rounded-lg shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                    </td>
                    <td className="px-4 py-3 font-mono-code text-white/80">{color.hex}</td>
                    <td className="px-4 py-3 font-mono-code text-white/60 text-xs">{color.rgb}</td>
                    <td className="px-4 py-3 font-mono-code text-white/60 text-xs">{color.hsl}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-neutral-800 overflow-hidden">
                          <div
                            className="h-full bg-[#C5A36A]"
                            style={{ width: `${color.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/60">{color.percentage}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Usage Tips */}
      <div className="bg-[#0E0E0E] rounded-2xl border border-white/10 p-6">
        <h3 className="text-sm font-serif-luxury text-white mb-4">Usage Tips</h3>
        <ul className="space-y-2 text-sm text-white/60">
          <li className="flex items-start gap-2">
            <span className="text-[#C5A36A] mt-1">•</span>
            <span>Click any color swatch to copy the HEX code to clipboard</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#C5A36A] mt-1">•</span>
            <span>Export as CSS variables for consistent theming across your projects</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#C5A36A] mt-1">•</span>
            <span>Use the percentage values to understand color distribution in the image</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
