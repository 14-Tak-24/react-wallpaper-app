import { useState } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Palette, Layout, Bell, Lock, Globe, Trash2 } from 'lucide-react';

interface SettingsProps {
  onClose?: () => void;
}

export function Settings({ onClose }: SettingsProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [denseMode, setDenseMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [language, setLanguage] = useState('en');

  const handleResetSettings = () => {
    if (confirm('Reset all settings to default?')) {
      setTheme('dark');
      setDenseMode(false);
      setNotifications(true);
      setAutoPlay(false);
      setLanguage('en');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif-luxury font-light text-white mb-2">Settings</h1>
          <p className="text-sm text-white/50 font-mono-code">Customize your experience</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-white/20 hover:border-[#C5A36A] transition-all text-xs text-white/70 hover:text-white"
          >
            Close
          </button>
        )}
      </div>

      {/* Appearance Section */}
      <div className="bg-[#0E0E0E] rounded-2xl border border-white/10 p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Palette className="w-5 h-5 text-[#C5A36A]" />
          <h2 className="text-lg font-serif-luxury text-white">Appearance</h2>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border border-white/20 bg-neutral-900 flex items-center justify-center">
              {theme === 'dark' ? <Moon className="w-5 h-5 text-[#C5A36A]" /> : <Sun className="w-5 h-5 text-[#C5A36A]" />}
            </div>
            <div>
              <p className="text-sm font-medium text-white">Theme</p>
              <p className="text-xs text-white/50">Choose your preferred color scheme</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme('dark')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                theme === 'dark' ? 'bg-[#C5A36A] text-black' : 'bg-neutral-800 text-white/60 hover:text-white'
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                theme === 'light' ? 'bg-[#C5A36A] text-black' : 'bg-neutral-800 text-white/60 hover:text-white'
              }`}
            >
              Light
            </button>
          </div>
        </div>

        {/* Dense Mode */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border border-white/20 bg-neutral-900 flex items-center justify-center">
              <Layout className="w-5 h-5 text-[#C5A36A]" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Dense Mode</p>
              <p className="text-xs text-white/50">Show more content per screen</p>
            </div>
          </div>
          <button
            onClick={() => setDenseMode(!denseMode)}
            className={`w-12 h-6 rounded-full transition-all relative ${
              denseMode ? 'bg-[#C5A36A]' : 'bg-neutral-800'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-all absolute top-0.5 ${
                denseMode ? 'left-6' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Behavior Section */}
      <div className="bg-[#0E0E0E] rounded-2xl border border-white/10 p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <SettingsIcon className="w-5 h-5 text-[#C5A36A]" />
          <h2 className="text-lg font-serif-luxury text-white">Behavior</h2>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border border-white/20 bg-neutral-900 flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#C5A36A]" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Notifications</p>
              <p className="text-xs text-white/50">Receive updates about new wallpapers</p>
            </div>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-all relative ${
              notifications ? 'bg-[#C5A36A]' : 'bg-neutral-800'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-all absolute top-0.5 ${
                notifications ? 'left-6' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Auto Play */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border border-white/20 bg-neutral-900 flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#C5A36A]" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Auto-Play Audio</p>
              <p className="text-xs text-white/50">Automatically play audio in wallpaper experience</p>
            </div>
          </div>
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`w-12 h-6 rounded-full transition-all relative ${
              autoPlay ? 'bg-[#C5A36A]' : 'bg-neutral-800'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-all absolute top-0.5 ${
                autoPlay ? 'left-6' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border border-white/20 bg-neutral-900 flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#C5A36A]" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Language</p>
              <p className="text-xs text-white/50">Select your preferred language</p>
            </div>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 rounded-lg bg-neutral-800 border border-white/20 text-white text-sm focus:border-[#C5A36A] focus:outline-none"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="ja">日本語</option>
            <option value="zh">中文</option>
          </select>
        </div>
      </div>

      {/* Privacy Section */}
      <div className="bg-[#0E0E0E] rounded-2xl border border-white/10 p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Lock className="w-5 h-5 text-[#C5A36A]" />
          <h2 className="text-lg font-serif-luxury text-white">Privacy & Data</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-neutral-900/50 border border-white/10">
            <p className="text-sm text-white/70 mb-2">
              Your search history and preferences are stored locally in your browser. No data is sent to external servers.
            </p>
          </div>

          <button
            onClick={handleResetSettings}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Reset All Settings
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          className="px-6 py-3 rounded-full bg-[#C5A36A] text-black font-semibold hover:bg-[#D4B878] transition-all text-sm tracking-wide"
          onClick={() => {
            // Save settings to localStorage
            localStorage.setItem('app-settings', JSON.stringify({
              theme,
              denseMode,
              notifications,
              autoPlay,
              language,
            }));
            alert('Settings saved successfully!');
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
