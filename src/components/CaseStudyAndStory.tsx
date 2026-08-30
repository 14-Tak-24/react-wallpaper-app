import { useState } from 'react';
import { FileText, ShieldAlert, CheckCircle2, Copy, Check, Sparkles, MessageSquare, Terminal } from 'lucide-react';
import { FEATURED_CASE_FILE } from '../data/gnosticCatalog';

export function CaseStudyAndStory() {
  const [copied, setCopied] = useState(false);

  const handleCopyCase = () => {
    navigator.clipboard.writeText(JSON.stringify(FEATURED_CASE_FILE, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl border border-[#C5A36A]/20 bg-[#0F0F0F] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A36A]/30 bg-[#C5A36A]/10 text-[11px] font-mono-code text-[#C5A36A]">
            <FileText className="w-3 h-3" />
            <span>5TH &amp; 11TH DELIVERABLE • COMPLETE MARY &amp; MAC INVESTIGATIVE CASE STUDY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-luxury font-light text-white">
            Case File #047: The Silent Escrow &amp; The Phantom Algorithm
          </h1>
          <p className="text-sm text-white/60 font-sans leading-relaxed">
            A comprehensive, end-to-end case demonstration illustrating the Mary &amp; Mac counterweight engine: uncovering technical telemetry anomalies while navigating moral crisis and personal agency.
          </p>
        </div>
      </div>

      {/* Main Dossier Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Case Synopsis & Dual Analysis */}
        <div className="lg:col-span-7 space-y-6">
          {/* Executive Overview */}
          <div className="rounded-2xl border border-white/10 bg-[#0E0E0E] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono-code text-xs px-2.5 py-1 rounded bg-[#C5A36A]/20 text-[#C5A36A] font-bold">
                  {FEATURED_CASE_FILE.caseNumber}
                </span>
                <h3 className="text-lg font-serif-luxury font-semibold text-white">
                  {FEATURED_CASE_FILE.title}
                </h3>
              </div>
              <button
                onClick={handleCopyCase}
                className="text-xs text-white/60 hover:text-white flex items-center gap-1 font-mono-code cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#C5A36A]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'JSON Exported' : 'Copy Case JSON'}</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
              {FEATURED_CASE_FILE.synopsis}
            </p>
          </div>

          {/* Mary's Technical Finding vs Mac's Conscience Finding */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Technical */}
            <div className="p-5 rounded-2xl border border-sky-500/20 bg-sky-950/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#38BDF8] uppercase font-bold">
                <Terminal className="w-4 h-4" />
                <span>Mary's Technical Diagnosis</span>
              </div>
              <p className="text-xs text-white/70 font-sans leading-relaxed">
                {FEATURED_CASE_FILE.technicalDiscovery}
              </p>
            </div>

            {/* Human Conscience */}
            <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-950/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#F59E0B] uppercase font-bold">
                <ShieldAlert className="w-4 h-4" />
                <span>Mac's Moral Diagnosis</span>
              </div>
              <p className="text-xs text-white/70 font-sans leading-relaxed">
                {FEATURED_CASE_FILE.humanStakes}
              </p>
            </div>
          </div>

          {/* Final Resolution & Consequence */}
          <div className="p-6 rounded-2xl border border-emerald-500/20 bg-[#0A120A] space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono-code text-emerald-400 uppercase font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verdict &amp; Institutional Consequence</span>
            </div>
            <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
              {FEATURED_CASE_FILE.verdictAndConsequence}
            </p>
            <div className="p-3 rounded-xl border border-emerald-500/20 bg-black/50 text-xs italic font-serif-luxury text-emerald-200">
              Philosophical Core: "{FEATURED_CASE_FILE.moralInsight}"
            </div>
          </div>
        </div>

        {/* Right Column: Case Story Scene Script */}
        <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0E0E0E] p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-xs font-serif-luxury font-semibold text-white">
              <MessageSquare className="w-4 h-4 text-[#C5A36A]" />
              <span>In-Scene Dialogue Excerpts</span>
            </div>
            <p className="text-xs text-white/50">Verbatim confrontation between Mary, Mac, and Dr. Harrison Vane.</p>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto pr-1">
            {FEATURED_CASE_FILE.dialogueExcerpts.map((d, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border space-y-1 ${
                  d.speaker.includes('Mary')
                    ? 'border-sky-500/20 bg-sky-950/20'
                    : 'border-amber-500/20 bg-amber-950/20'
                }`}
              >
                <div
                  className={`text-[11px] font-mono-code font-bold uppercase ${
                    d.speaker.includes('Mary') ? 'text-[#38BDF8]' : 'text-[#F59E0B]'
                  }`}
                >
                  {d.speaker}
                </div>
                <p className="text-xs text-white/85 font-sans leading-relaxed">"{d.line}"</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 text-[11px] font-mono-code text-white/40 flex items-center justify-between">
            <span>Canonical Case Integrity: 100%</span>
            <span>Authored by: Gnostic Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
}
