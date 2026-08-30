import { useState } from 'react';
import { X, Copy, Check, Terminal, Download, FolderArchive, Shield } from 'lucide-react';
import { DesktopPictureAsset } from '../types';
import { formatBytes } from '../utils/plistParser';

interface BatchDownloadModalProps {
  assets: DesktopPictureAsset[];
  onClose: () => void;
}

export function BatchDownloadModal({ assets, onClose }: BatchDownloadModalProps) {
  const [scriptType, setScriptType] = useState<'bash-curl' | 'bash-aria2' | 'powershell' | 'urls-only'>('bash-curl');
  const [copied, setCopied] = useState(false);

  const totalSize = assets.reduce((sum, a) => sum + a.downloadSize, 0);

  const generateScript = () => {
    if (scriptType === 'urls-only') {
      return assets.map((a) => a.fullUrl).join('\n');
    }

    if (scriptType === 'bash-curl') {
      return `#!/usr/bin/env bash
# ==============================================================================
# Apple macOS Official Desktop Pictures Batch Downloader
# Total Assets: ${assets.length} | Size: ${formatBytes(totalSize)}
# ==============================================================================

TARGET_DIR="$HOME/Pictures/Wallpapers/macOS"
mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR" || exit 1

echo "🎨 Downloading ${assets.length} official Apple Desktop Pictures into $TARGET_DIR..."

${assets
  .map(
    (a, idx) =>
      `# [${idx + 1}/${assets.length}] ${a.desktopPictureId} (${formatBytes(a.downloadSize)})\ncurl -fSL -C - -o "${a.desktopPictureId.replace(/\s+/g, '_')}.zip" "${a.fullUrl}"`
  )
  .join('\n\n')}

echo "✨ All downloads finished! Extracting ZIP archives..."
for zip in *.zip; do
  if [ -f "$zip" ]; then
    echo "📦 Extracting $zip..."
    unzip -q -o "$zip"
  fi
done

echo "🎉 Done! Your wallpapers are available at: $TARGET_DIR"
`;
    }

    if (scriptType === 'bash-aria2') {
      return `#!/usr/bin/env bash
# High-Speed Multi-Connection Downloader using aria2c
TARGET_DIR="$HOME/Pictures/Wallpapers/macOS"
mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR" || exit 1

cat << 'EOF' > urls.txt
${assets.map((a) => `${a.fullUrl}\n  out=${a.desktopPictureId.replace(/\s+/g, '_')}.zip`).join('\n')}
EOF

echo "🚀 Downloading ${assets.length} assets concurrently with aria2c..."
aria2c -i urls.txt -j 8 -x 4 -s 4 -c

echo "📦 Extracting archives..."
for zip in *.zip; do
  unzip -q -o "$zip"
done
`;
    }

    if (scriptType === 'powershell') {
      return `# ==============================================================================
# Apple macOS Official Desktop Pictures Downloader for Windows PowerShell
# ==============================================================================

$TargetDir = "$HOME\\Pictures\\Wallpapers\\macOS"
New-Item -ItemType Directory -Force -Path $TargetDir | Out-Null
Set-Location -Path $TargetDir

Write-Host "🎨 Downloading ${assets.length} official Apple Desktop Pictures..." -ForegroundColor Cyan

$assets = @(
${assets
  .map(
    (a) =>
      `    @{ Name = "${a.desktopPictureId.replace(/\s+/g, '_')}.zip"; Url = "${a.fullUrl}" }`
  )
  .join(',\n')}
)

foreach ($asset in $assets) {
    Write-Host "⬇️ Downloading $($asset.Name)..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $asset.Url -OutFile $asset.Name -UseBasicParsing
    Expand-Archive -Path $asset.Name -DestinationPath . -Force
}

Write-Host "🎉 Finished downloading to $TargetDir" -ForegroundColor Green
`;
    }

    return '';
  };

  const scriptContent = generateScript();

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadScriptFile = () => {
    const ext = scriptType === 'powershell' ? 'ps1' : scriptType === 'urls-only' ? 'txt' : 'sh';
    const blob = new Blob([scriptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `download_macos_wallpapers.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl rounded-2xl border border-white/15 bg-[#0A0A0A] shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#C5A36A]/40 bg-neutral-900 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-[#C5A36A]" />
            </div>
            <div>
              <h3 className="text-lg font-serif-luxury font-light text-white">
                Batch CLI Download &amp; Unpack Generator
              </h3>
              <p className="text-xs text-white/50">
                {assets.length} Apple desktop picture packages • {formatBytes(totalSize)}
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

        {/* Script Selection Bar */}
        <div className="px-6 py-3 border-b border-white/10 bg-black/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {[
              { id: 'bash-curl', label: 'Bash + curl' },
              { id: 'bash-aria2', label: 'Bash + aria2c (Fast)' },
              { id: 'powershell', label: 'PowerShell (Win)' },
              { id: 'urls-only', label: 'Plain URL List' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setScriptType(tab.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono-code transition-all border ${
                  scriptType === tab.id
                    ? 'bg-[#C5A36A] text-black border-[#C5A36A] font-semibold'
                    : 'bg-neutral-900 text-white/60 border-white/10 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-neutral-900 text-white/80 hover:text-white hover:border-[#C5A36A]/50 transition-all text-xs font-mono-code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#C5A36A]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Script'}</span>
            </button>

            <button
              onClick={handleDownloadScriptFile}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C5A36A] text-black font-semibold hover:bg-white transition-all text-xs font-sans"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save File</span>
            </button>
          </div>
        </div>

        {/* Code Display Area */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#050505] font-mono-code text-xs text-emerald-400/90 leading-relaxed select-all">
          <pre className="whitespace-pre-wrap">{scriptContent}</pre>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-white/10 bg-neutral-950/80 text-[11px] text-white/40 flex items-center justify-between">
          <span>Target Directory: ~/Pictures/Wallpapers/macOS</span>
          <span>Apple CDN direct streamable ZIP format</span>
        </div>
      </div>
    </div>
  );
}
