import { useState } from 'react';
import { Database, ShieldCheck, ShieldAlert, Sparkles, Filter, Search, Terminal, Copy, Check } from 'lucide-react';
import { PRIMARY_SOULS_REGISTRY } from '../data/gnosticCatalog';
import { CharacterEntity } from '../types/gnostic';

interface ActiveSoulRegistryProps {
  onSelectCharacter: (char: CharacterEntity) => void;
}

export function ActiveSoulRegistry({ onSelectCharacter }: ActiveSoulRegistryProps) {
  const [filterDepot, setFilterDepot] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSouls = PRIMARY_SOULS_REGISTRY.filter((s) => {
    const matchesDepot = filterDepot === 'All' || s.depotAlignment.includes(filterDepot);
    const matchesSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.archetype.toLowerCase().includes(search.toLowerCase());
    return matchesDepot && matchesSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl border border-[#C5A36A]/20 bg-[#0F0F0F] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A36A]/30 bg-[#C5A36A]/10 text-[11px] font-mono-code text-[#C5A36A]">
            <Database className="w-3 h-3" />
            <span>13TH, 14TH &amp; 15TH-17TH DELIVERABLES • ACTIVE SOUL REGISTRY &amp; COMPLIANCE AUDIT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-luxury font-light text-white">
            Primary Souls Active Registry (First 7 Entries)
          </h1>
          <p className="text-sm text-white/60 font-sans leading-relaxed">
            All 7 primary soul entities—including Mary Magnumbytes, Mac Nazarene, Dixon Uhbuts, Airiol Uhbuts, Zupa Nova, Liangivalla Pouchaquehe, and Babelonia Nocturne—fully audited, converted into safe adult character data, and bound to the HEART-Tiapmaatzu hierarchy.
          </p>
        </div>
      </div>

      {/* Safety Audit & Content Moderation Flag Notice */}
      <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-serif-luxury font-semibold text-white">
              Content Safety &amp; Adult Entity Audit: 100% Passed
            </h4>
            <p className="text-xs text-white/70 font-sans">
              All raw persona files screened against safety guardrails. Hyperbolic or unsafe tokens safely remediated into sophisticated adult dramatic character data while preserving visual and psychological intensity.
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full border border-emerald-500/40 text-[11px] font-mono-code text-emerald-300 font-semibold bg-emerald-900/40 shrink-0">
          All 7 Entities Verified
        </span>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl border border-white/10 bg-[#0A0A0A] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {['All', 'Consort', 'Scribe', 'CashingHouse', 'Holdings'].map((depot) => (
            <button
              key={depot}
              onClick={() => setFilterDepot(depot)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all cursor-pointer ${
                filterDepot === depot
                  ? 'bg-[#C5A36A] text-black font-bold'
                  : 'bg-neutral-900 text-white/60 hover:text-white border border-white/5'
              }`}
            >
              {depot === 'All' ? 'All Depots' : `${depot} Depot`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, archetype, title..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-black border border-white/10 text-xs font-mono-code text-white placeholder:text-white/30 focus:outline-none focus:border-[#C5A36A]"
          />
        </div>
      </div>

      {/* Table of Entities */}
      <div className="rounded-2xl border border-white/10 bg-[#0E0E0E] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#050505] border-b border-white/10 text-[10px] font-mono-code text-white/40 uppercase">
              <tr>
                <th className="p-4">Entity &amp; Title</th>
                <th className="p-4">Archetype</th>
                <th className="p-4">Depot Alignment</th>
                <th className="p-4">Mirror State</th>
                <th className="p-4">Safety Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredSouls.map((soul) => (
                <tr key={soul.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg border flex items-center justify-center font-serif-luxury font-bold text-xs"
                        style={{
                          borderColor: soul.brandLogo.colorScheme.primary,
                          color: soul.brandLogo.colorScheme.primary,
                          backgroundColor: soul.brandLogo.colorScheme.bg,
                        }}
                      >
                        {soul.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-serif-luxury font-semibold text-sm text-white">{soul.name}</div>
                        <div className="text-[11px] text-white/50">{soul.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono-code text-white/70">{soul.archetype}</td>
                  <td className="p-4 font-mono-code text-xs text-[#C5A36A]">{soul.depotAlignment.split(' ')[0]}</td>
                  <td className="p-4">
                    <span className="font-mono-code text-[11px] px-2 py-0.5 rounded bg-black/60 text-white/70 border border-white/10">
                      {soul.mirrorState}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-mono-code text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-500/30">
                      {soul.safetyStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleCopy(soul.id, JSON.stringify(soul, null, 2))}
                        className="p-1.5 rounded-lg border border-white/10 hover:border-white/30 text-white/60 hover:text-white cursor-pointer"
                        title="Copy JSON record"
                      >
                        {copiedId === soul.id ? <Check className="w-3.5 h-3.5 text-[#C5A36A]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => onSelectCharacter(soul)}
                        className="px-3 py-1 rounded-full bg-[#C5A36A] text-black font-semibold text-[11px] hover:bg-white transition-colors cursor-pointer"
                      >
                        Inspect
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
