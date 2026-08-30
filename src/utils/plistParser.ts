import { DesktopPictureAsset, ManifestMetadata, MacOSVersion, AssetType } from '../types';

/**
 * Assigns category, macOS release tags, and visual gradient styling based on wallpaper ID
 */
export function enrichAssetMetadata(assetData: Record<string, any>): DesktopPictureAsset {
  const id: string = assetData.DesktopPictureID || 'Unknown Asset';
  const baseURL: string = assetData.__BaseURL || '';
  const relativePath: string = assetData.__RelativePath || '';
  const fullUrl = baseURL && relativePath 
    ? (baseURL.endsWith('/') ? baseURL + relativePath : `${baseURL}/${relativePath}`)
    : '';

  let category: DesktopPictureAsset['category'] = 'Abstract & Studio';
  let macOSVersionTag = 'macOS';
  let macOSVersionCategory: MacOSVersion = 'Classic Macintosh';
  let assetType: AssetType = 'Abstract & Graphic';

  let gradientTheme: DesktopPictureAsset['gradientTheme'] = {
    from: '#1e293b',
    to: '#0f172a',
    accent: '#38bdf8',
    darkFrom: '#090d16',
    darkTo: '#020617',
    darkAccent: '#0ea5e9',
    style: 'gradient',
    description: 'macOS Desktop Picture',
  };

  const lower = id.toLowerCase();

  // 1. SEQUOIA
  if (lower.startsWith('sequoia') || lower.includes('sequoia')) {
    category = 'macOS Releases';
    macOSVersionTag = 'macOS Sequoia 15';
    macOSVersionCategory = 'macOS Sequoia 15';
    if (lower.includes('night') || lower.includes('dark')) {
      assetType = 'Dark Mode';
      gradientTheme = {
        from: '#1c1917',
        via: '#292524',
        to: '#0c0a09',
        accent: '#f59e0b',
        darkFrom: '#0c0a09',
        darkVia: '#1c1917',
        darkTo: '#000000',
        darkAccent: '#d97706',
        style: 'landscape',
        description: 'Nocturnal Sierra Nevada giant sequoia forest under starlight',
      };
    } else if (lower.includes('sunrise') || lower.includes('light')) {
      assetType = 'Light Mode';
      gradientTheme = {
        from: '#ea580c',
        via: '#fbbf24',
        to: '#0284c7',
        accent: '#f97316',
        darkFrom: '#431407',
        darkVia: '#78350f',
        darkTo: '#082f49',
        darkAccent: '#ea580c',
        style: 'landscape',
        description: 'Dramatic dawn illumination over ancient California sequoia groves',
      };
    } else {
      assetType = 'Dynamic / Dual';
      gradientTheme = {
        from: '#b45309',
        via: '#d97706',
        to: '#1e3a5f',
        accent: '#f59e0b',
        darkFrom: '#1c1917',
        darkVia: '#0c0a09',
        darkTo: '#0f172a',
        darkAccent: '#fbbf24',
        style: 'landscape',
        description: 'Official macOS Sequoia 15 master dynamic desktop study',
      };
    }
  } 
  // 2. SONOMA
  else if (lower.startsWith('sonoma') || lower.includes('sonoma')) {
    category = 'macOS Releases';
    macOSVersionTag = 'macOS Sonoma 14';
    macOSVersionCategory = 'macOS Sonoma 14';
    if (lower.includes('night') || lower.includes('dark')) {
      assetType = 'Dark Mode';
      gradientTheme = {
        from: '#0f172a',
        via: '#1e1b4b',
        to: '#020617',
        accent: '#38bdf8',
        darkFrom: '#020617',
        darkVia: '#0f172a',
        darkTo: '#000000',
        darkAccent: '#0ea5e9',
        style: 'landscape',
        description: 'Midnight shadows over rolling Sonoma hillside vineyards',
      };
    } else if (lower.includes('light') || lower.includes('day')) {
      assetType = 'Light Mode';
      gradientTheme = {
        from: '#38bdf8',
        via: '#fdba74',
        to: '#3b82f6',
        accent: '#f97316',
        darkFrom: '#0369a1',
        darkVia: '#9a3412',
        darkTo: '#1e3a8a',
        darkAccent: '#ea580c',
        style: 'landscape',
        description: 'Sun-drenched Sonoma valley landscape with golden hour rays',
      };
    } else {
      assetType = 'Dynamic / Dual';
      gradientTheme = {
        from: '#0ea5e9',
        via: '#f97316',
        to: '#1e1b4b',
        accent: '#38bdf8',
        darkFrom: '#082f49',
        darkVia: '#431407',
        darkTo: '#020617',
        darkAccent: '#0ea5e9',
        style: 'landscape',
        description: 'Iconic Sonoma wine country sweeping hills & atmospheric horizon',
      };
    }
  } 
  // 3. VENTURA
  else if (lower.startsWith('ventura') || lower.includes('ventura')) {
    category = 'macOS Releases';
    macOSVersionTag = 'macOS Ventura 13';
    macOSVersionCategory = 'macOS Ventura 13';
    if (lower.includes('dark')) {
      assetType = 'Dark Mode';
      gradientTheme = {
        from: '#431407',
        via: '#7c2d12',
        to: '#0f172a',
        accent: '#ea580c',
        darkFrom: '#1c0702',
        darkVia: '#330e04',
        darkTo: '#020617',
        darkAccent: '#c2410c',
        style: 'mesh',
        description: 'Deep amber velvet bloom petals in high contrast dark space',
      };
    } else if (lower.includes('light')) {
      assetType = 'Light Mode';
      gradientTheme = {
        from: '#f97316',
        via: '#fbbf24',
        to: '#ea580c',
        accent: '#fb923c',
        darkFrom: '#9a3412',
        darkVia: '#b45309',
        darkTo: '#7c2d12',
        darkAccent: '#f97316',
        style: 'mesh',
        description: 'Vibrant sunlit California poppy petal architecture',
      };
    } else {
      assetType = 'Abstract & Graphic';
      gradientTheme = {
        from: '#ea580c',
        via: '#f59e0b',
        to: '#7c2d12',
        accent: '#fb923c',
        darkFrom: '#7c2d12',
        darkVia: '#451a03',
        darkTo: '#0c0a09',
        darkAccent: '#ea580c',
        style: 'mesh',
        description: 'Sculptural vibrant orange California poppy flora in abstract form',
      };
    }
  } 
  // 4. MONTEREY
  else if (lower.startsWith('monterey') || lower.includes('monterey')) {
    category = 'macOS Releases';
    macOSVersionTag = 'macOS Monterey 12';
    macOSVersionCategory = 'macOS Monterey 12';
    if (lower.includes('dark')) {
      assetType = 'Dark Mode';
      gradientTheme = {
        from: '#312e81',
        via: '#4c1d95',
        to: '#020617',
        accent: '#818cf8',
        darkFrom: '#1e1b4b',
        darkVia: '#2e1065',
        darkTo: '#000000',
        darkAccent: '#6366f1',
        style: 'topography',
        description: 'Deep ultraviolet midnight topographic Monterey canyon depths',
      };
    } else if (lower.includes('light')) {
      assetType = 'Light Mode';
      gradientTheme = {
        from: '#818cf8',
        via: '#f472b6',
        to: '#6366f1',
        accent: '#ec4899',
        darkFrom: '#3730a3',
        darkVia: '#9d174d',
        darkTo: '#312e81',
        darkAccent: '#db2777',
        style: 'topography',
        description: 'Radiant magenta and periwinkle abstract Monterey contour lines',
      };
    } else {
      assetType = 'Abstract & Graphic';
      gradientTheme = {
        from: '#6366f1',
        via: '#ec4899',
        to: '#312e81',
        accent: '#a855f7',
        darkFrom: '#312e81',
        darkVia: '#831843',
        darkTo: '#0f172a',
        darkAccent: '#818cf8',
        style: 'topography',
        description: 'Abstract topographic layers of Monterey Bay oceanic canyon',
      };
    }
  } 
  // 5. BIG SUR
  else if (lower.startsWith('big sur') || lower.includes('big sur')) {
    category = lower.includes('graphic') ? 'macOS Releases' : 'Nature & Landscapes';
    macOSVersionTag = 'macOS Big Sur 11';
    macOSVersionCategory = 'macOS Big Sur 11';
    if (lower.includes('night') || lower.includes('dark')) {
      assetType = 'Dark Mode';
      gradientTheme = {
        from: '#0f172a',
        via: '#1e293b',
        to: '#334155',
        accent: '#60a5fa',
        darkFrom: '#020617',
        darkVia: '#0f172a',
        darkTo: '#1e293b',
        darkAccent: '#3b82f6',
        style: 'glow',
        description: 'Atmospheric midnight coastal Big Sur study',
      };
    } else if (lower.includes('graphic')) {
      assetType = 'Abstract & Graphic';
      gradientTheme = {
        from: '#ec4899',
        via: '#8b5cf6',
        to: '#0284c7',
        accent: '#f43f5e',
        darkFrom: '#831843',
        darkVia: '#4c1d95',
        darkTo: '#075985',
        darkAccent: '#e11d48',
        style: 'mesh',
        description: 'Legendary multi-colored vector mountains of Big Sur',
      };
    } else {
      assetType = 'Nature & Landscape';
      gradientTheme = {
        from: '#0369a1',
        via: '#38bdf8',
        to: '#0c4a6e',
        accent: '#7dd3fc',
        darkFrom: '#075985',
        darkVia: '#0284c7',
        darkTo: '#082f49',
        darkAccent: '#38bdf8',
        style: 'landscape',
        description: 'Rugged California coastline along Highway 1 Bixby Bridge',
      };
    }
  } 
  // 6. CATALINA
  else if (lower.startsWith('catalina') || lower.includes('catalina')) {
    category = 'Nature & Landscapes';
    macOSVersionTag = 'macOS Catalina 10.15';
    macOSVersionCategory = 'macOS Catalina 10.15';
    if (lower.includes('sunset') || lower.includes('evening') || lower.includes('night')) {
      assetType = 'Dark Mode';
      gradientTheme = {
        from: '#7c2d12',
        via: '#c2410c',
        to: '#1e1b4b',
        accent: '#fdba74',
        darkFrom: '#431407',
        darkVia: '#7c2d12',
        darkTo: '#020617',
        darkAccent: '#ea580c',
        style: 'glow',
        description: 'Warm Pacific twilight over Santa Catalina Island',
      };
    } else {
      assetType = 'Nature & Landscape';
      gradientTheme = {
        from: '#0284c7',
        via: '#0369a1',
        to: '#0f172a',
        accent: '#38bdf8',
        darkFrom: '#075985',
        darkVia: '#0c4a6e',
        darkTo: '#020617',
        darkAccent: '#0284c7',
        style: 'landscape',
        description: 'Iconic offshore rock formations & crystal waters of Santa Catalina',
      };
    }
  } 
  // 7. IMAC 24"
  else if (lower.startsWith('imac') || lower.includes('imac')) {
    category = 'iMac Collections';
    macOSVersionCategory = '24" iMac Editions';
    const color = lower.replace('imac', '').trim();
    macOSVersionTag = `24" iMac (${color ? color.charAt(0).toUpperCase() + color.slice(1) : 'Edition'})`;
    assetType = lower.includes('dark') ? 'Dark Mode' : 'Abstract & Graphic';

    const colorMap: Record<string, { from: string; via?: string; to: string; accent: string }> = {
      silver: { from: '#e2e8f0', via: '#94a3b8', to: '#475569', accent: '#cbd5e1' },
      green: { from: '#10b981', via: '#059669', to: '#064e3b', accent: '#34d399' },
      yellow: { from: '#eab308', via: '#ca8a04', to: '#713f12', accent: '#fde047' },
      blue: { from: '#3b82f6', via: '#1d4ed8', to: '#172554', accent: '#60a5fa' },
      purple: { from: '#a855f7', via: '#7e22ce', to: '#3b0764', accent: '#c084fc' },
      orange: { from: '#f97316', via: '#c2410c', to: '#431407', accent: '#fb923c' },
      pink: { from: '#ec4899', via: '#db2777', to: '#831843', accent: '#f472b6' },
    };
    const c = colorMap[color] || { from: '#64748b', to: '#334155', accent: '#94a3b8' };
    gradientTheme = {
      ...c,
      darkFrom: '#0f172a',
      darkTo: '#020617',
      darkAccent: c.accent,
      style: 'mesh',
      description: `Signature dual-tone geometry tailored for ${color || 'vibrant'} 24" iMac`,
    };
  } 
  // 8. HELLO METALLIC
  else if (lower.startsWith('hello metallic') || lower.includes('metallic')) {
    category = 'Hello Metallic';
    macOSVersionCategory = 'Classic Macintosh';
    macOSVersionTag = 'Hello Metallic Edition';
    assetType = 'Studio & Metallic';
    gradientTheme = {
      from: '#334155',
      via: '#64748b',
      to: '#0f172a',
      accent: '#e2e8f0',
      darkFrom: '#0f172a',
      darkVia: '#1e293b',
      darkTo: '#020617',
      darkAccent: '#94a3b8',
      style: 'metallic',
      description: '3D precision-rendered metallic Apple calligraphy script in platinum chrome',
    };
  } 
  // 9. HELLO CLASSIC
  else if (lower.startsWith('hello') || lower.includes('hello')) {
    category = 'Hello Modern & Retro';
    macOSVersionCategory = 'Classic Macintosh';
    macOSVersionTag = 'Classic "hello" Script';
    assetType = 'Hello & Typography';
    gradientTheme = {
      from: '#0f172a',
      via: '#1e293b',
      to: '#090d16',
      accent: '#38bdf8',
      darkFrom: '#020617',
      darkVia: '#0f172a',
      darkTo: '#000000',
      darkAccent: '#0ea5e9',
      style: 'glow',
      description: 'Tribute to original 1984 Macintosh "hello" introductory script',
    };
  } 
  // 10. MOTION & RADIAL
  else if (lower.startsWith('motion') || lower.startsWith('radial') || lower.includes('motion') || lower.includes('radial')) {
    category = 'Motion & Radial';
    macOSVersionCategory = 'Classic Macintosh';
    macOSVersionTag = 'Dynamic Geometry';
    assetType = 'Abstract & Graphic';
    gradientTheme = {
      from: '#312e81',
      via: '#4338ca',
      to: '#0f172a',
      accent: '#818cf8',
      darkFrom: '#1e1b4b',
      darkVia: '#312e81',
      darkTo: '#020617',
      darkAccent: '#6366f1',
      style: 'lines',
      description: 'Fluid kinetic ribbons and radial light dispersions',
    };
  } 
  // 11. LIGHT STREAM & CHROMA
  else if (lower.startsWith('light stream') || lower.startsWith('chroma') || lower.includes('stream') || lower.includes('chroma')) {
    category = 'Light Stream & Chroma';
    macOSVersionCategory = 'Classic Macintosh';
    macOSVersionTag = 'Chromatic Spectrum';
    assetType = 'Abstract & Graphic';
    gradientTheme = {
      from: '#1e1b4b',
      via: '#4c1d95',
      to: '#020617',
      accent: '#c084fc',
      darkFrom: '#090514',
      darkVia: '#1e1b4b',
      darkTo: '#000000',
      darkAccent: '#a855f7',
      style: 'glow',
      description: 'High-speed prism refraction and spectral light rays',
    };
  } 
  // 12. NATURE & LANDSCAPES
  else if (
    ['the cliffs', 'the lake', 'the desert', 'the beach', 'peak', 'tree', 'dome', 'valley', 'dome', 'rocks'].some((k) =>
      lower.includes(k)
    )
  ) {
    category = 'Nature & Landscapes';
    macOSVersionCategory = 'macOS Big Sur 11';
    macOSVersionTag = 'macOS Pro Aerials';
    assetType = 'Nature & Landscape';
    gradientTheme = {
      from: '#047857',
      via: '#065f46',
      to: '#022c22',
      accent: '#34d399',
      darkFrom: '#022c22',
      darkVia: '#064e3b',
      darkTo: '#000000',
      darkAccent: '#10b981',
      style: 'landscape',
      description: 'Fine art environmental aerial photography of world landmarks',
    };
  } 
  // 13. STUDIO & CALIBRATED
  else if (
    lower.includes('studio') ||
    lower.includes('pro black') ||
    lower.includes('solar') ||
    lower.includes('grid') ||
    lower.includes('iridescence') ||
    lower.includes('color')
  ) {
    category = 'Abstract & Studio';
    macOSVersionCategory = '24" iMac Editions';
    macOSVersionTag = 'Studio / Pro Display';
    assetType = 'Studio & Metallic';
    gradientTheme = {
      from: '#0f172a',
      via: '#3b0764',
      to: '#020617',
      accent: '#e879f9',
      darkFrom: '#020617',
      darkVia: '#1f0436',
      darkTo: '#000000',
      darkAccent: '#c026d3',
      style: 'metallic',
      description: 'Reference calibrated studio mastering display wallpaper',
    };
  }

  return {
    desktopPictureId: id,
    build: assetData.Build || '10M8877',
    compatibilityVersion: Number(assetData._CompatibilityVersion || 1),
    compressionAlgorithm: assetData._CompressionAlgorithm || 'zip',
    contentVersion: Number(assetData._ContentVersion || 1),
    downloadSize: Number(assetData._DownloadSize || 0),
    unarchivedSize: Number(assetData._UnarchivedSize || 0),
    isZipStreamable: Boolean(assetData._IsZipStreamable),
    masteredVersion: String(assetData._MasteredVersion || ''),
    measurement: (assetData._Measurement || '').trim(),
    measurementAlgorithm: assetData._MeasurementAlgorithm || 'SHA-1',
    baseURL: baseURL,
    relativePath: relativePath,
    requiredByOS: Boolean(assetData.__RequiredByOS),
    canUseLocalCacheServer: Boolean(assetData.__CanUseLocalCacheServer),
    fullUrl: fullUrl,
    category,
    macOSVersionTag,
    macOSVersionCategory,
    assetType,
    gradientTheme,
  };
}

/**
 * Parses Apple XML Property List (plist)
 */
export function parsePlistXml(xmlString: string): {
  assets: DesktopPictureAsset[];
  metadata: ManifestMetadata;
} {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

  // Check for parser errors
  const parseError = xmlDoc.querySelector('parsererror');
  if (parseError) {
    throw new Error(`XML Parsing error: ${parseError.textContent}`);
  }

  const plist = xmlDoc.querySelector('plist');
  if (!plist) {
    throw new Error('Root <plist> element not found');
  }

  const topDict = plist.querySelector(':scope > dict');
  if (!topDict) {
    throw new Error('Top-level <dict> in <plist> not found');
  }

  const rawMetadata: Record<string, any> = {};
  const rawAssetsList: Record<string, any>[] = [];

  const children = Array.from(topDict.children);
  for (let i = 0; i < children.length; i++) {
    const el = children[i];
    if (el.tagName.toLowerCase() === 'key') {
      const keyName = el.textContent?.trim() || '';
      const valueEl = children[i + 1];
      if (!valueEl) continue;

      if (keyName === 'Assets' && valueEl.tagName.toLowerCase() === 'array') {
        const dictElements = Array.from(valueEl.querySelectorAll(':scope > dict'));
        for (const assetDict of dictElements) {
          const assetObj: Record<string, any> = {};
          const assetChildren = Array.from(assetDict.children);
          for (let j = 0; j < assetChildren.length; j++) {
            const aEl = assetChildren[j];
            if (aEl.tagName.toLowerCase() === 'key') {
              const aKey = aEl.textContent?.trim() || '';
              const aVal = assetChildren[j + 1];
              if (aVal) {
                assetObj[aKey] = parsePlistValue(aVal);
              }
            }
          }
          rawAssetsList.push(assetObj);
        }
      } else {
        rawMetadata[keyName] = parsePlistValue(valueEl);
      }
    }
  }

  // Enrich assets
  const assets: DesktopPictureAsset[] = rawAssetsList.map((raw) => enrichAssetMetadata(raw));

  const totalDownloadSizeBytes = assets.reduce((sum, a) => sum + (a.downloadSize || 0), 0);
  const totalUnarchivedSizeBytes = assets.reduce((sum, a) => sum + (a.unarchivedSize || 0), 0);

  const metadata: ManifestMetadata = {
    assetType: rawMetadata.AssetType || 'com.apple.MobileAsset.DesktopPicture',
    certificate: rawMetadata._Certificate || '',
    downloadedFrom: rawMetadata._DownloadedFrom || '',
    downloadedFromXml: rawMetadata._DownloadedFromXml || 'https://mesu.apple.com/assets/macos/com_apple_MobileAsset_DesktopPicture/com_apple_MobileAsset_DesktopPicture.xml',
    formatVersion: Number(rawMetadata._FormatVersion || 1),
    signature: rawMetadata._Signature || '',
    signingKey: rawMetadata._SigningKey || '',
    catalogInfo: {
      isLiveServer: Boolean(rawMetadata.__CatalogInfo?.isLiveServer ?? true),
    },
    lastTimeChecked: rawMetadata.__LastTimeChecked || new Date().toISOString(),
    postedDate: rawMetadata.__PostedDate || '2025-01-20',
    totalAssetsCount: assets.length,
    totalDownloadSizeBytes,
    totalUnarchivedSizeBytes,
  };

  return { assets, metadata };
}

function parsePlistValue(el: Element): any {
  const tag = el.tagName.toLowerCase();
  switch (tag) {
    case 'string':
      return el.textContent || '';
    case 'integer':
      return parseInt(el.textContent || '0', 10);
    case 'real':
      return parseFloat(el.textContent || '0');
    case 'true':
      return true;
    case 'false':
      return false;
    case 'data':
      return el.textContent?.trim() || '';
    case 'date':
      return el.textContent || '';
    case 'array':
      return Array.from(el.children).map((child) => parsePlistValue(child));
    case 'dict': {
      const dictObj: Record<string, any> = {};
      const dictChildren = Array.from(el.children);
      for (let i = 0; i < dictChildren.length; i++) {
        if (dictChildren[i].tagName.toLowerCase() === 'key') {
          const k = dictChildren[i].textContent?.trim() || '';
          const v = dictChildren[i + 1];
          if (v) dictObj[k] = parsePlistValue(v);
        }
      }
      return dictObj;
    }
    default:
      return el.textContent || '';
  }
}

/**
 * Human-friendly byte size formatter
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
