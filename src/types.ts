export type MacOSVersion =
  | 'All'
  | 'macOS Sequoia 15'
  | 'macOS Sonoma 14'
  | 'macOS Ventura 13'
  | 'macOS Monterey 12'
  | 'macOS Big Sur 11'
  | 'macOS Catalina 10.15'
  | '24" iMac Editions'
  | 'Classic Macintosh';

export type AssetType =
  | 'All'
  | 'Light Mode'
  | 'Dark Mode'
  | 'Dynamic / Dual'
  | 'Abstract & Graphic'
  | 'Nature & Landscape'
  | 'Hello & Typography'
  | 'Studio & Metallic';

export type DesktopResolution =
  | '4k-uhd'
  | 'macbook-pro-14'
  | '1080p-fhd'
  | '5k-studio'
  | 'ultrawide-21-9'
  | 'ipad-pro'
  | 'iphone-16-pro';

export interface ResolutionProfile {
  id: DesktopResolution;
  label: string;
  name: string;
  width: number;
  height: number;
  aspectRatio: string;
  deviceType: 'desktop' | 'laptop' | 'ultrawide' | 'tablet' | 'mobile';
  density: string;
}

export interface DesktopPictureAsset {
  desktopPictureId: string;
  build: string;
  compatibilityVersion: number;
  compressionAlgorithm: string;
  contentVersion: number;
  downloadSize: number;
  unarchivedSize: number;
  isZipStreamable: boolean;
  masteredVersion: string;
  measurement: string;
  measurementAlgorithm: string;
  baseURL: string;
  relativePath: string;
  requiredByOS: boolean;
  canUseLocalCacheServer: boolean;
  fullUrl: string;
  category:
    | 'macOS Releases'
    | 'iMac Collections'
    | 'Hello Modern & Retro'
    | 'Hello Metallic'
    | 'Motion & Radial'
    | 'Light Stream & Chroma'
    | 'Nature & Landscapes'
    | 'Abstract & Studio';
  macOSVersionTag: string;
  macOSVersionCategory: MacOSVersion;
  assetType: AssetType;
  gradientTheme: {
    from: string;
    via?: string;
    to: string;
    accent: string;
    darkFrom?: string;
    darkVia?: string;
    darkTo?: string;
    darkAccent?: string;
    style: 'gradient' | 'mesh' | 'topography' | 'lines' | 'glow' | 'metallic' | 'landscape';
    description: string;
  };
}

export interface ManifestCatalogInfo {
  isLiveServer: boolean;
}

export interface ManifestMetadata {
  assetType: string;
  certificate: string;
  downloadedFrom: string;
  downloadedFromXml: string;
  formatVersion: number;
  signature: string;
  signingKey: string;
  catalogInfo: ManifestCatalogInfo;
  lastTimeChecked: string;
  postedDate: string;
  totalAssetsCount: number;
  totalDownloadSizeBytes: number;
  totalUnarchivedSizeBytes: number;
}

export interface DownloadQueueItem {
  asset: DesktopPictureAsset;
  status: 'idle' | 'downloading' | 'completed' | 'failed';
  progress: number;
  blobUrl?: string;
  error?: string;
  downloadedBytes?: number;
  downloadSpeed?: string;
}
