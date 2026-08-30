import { useState } from 'react';
import { Cpu, Terminal, Copy, Check, Sparkles, FolderArchive, Clock, DollarSign } from 'lucide-react';

export function PromptVaultAndSop() {
  const [activeSubTab, setActiveSubTab] = useState<'video-prompts' | 'sop' | 'monetization'>('video-prompts');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const MAC_SOLO_PROMPTS = [
    { num: 1, prompt: "Mac Nazarene walks slowly through a quiet urban street at golden hour, reflective expression, slight head turn, warm tungsten light.", caption: "This character. Full kit ↓" },
    { num: 2, prompt: "Mac sits at a worn wooden table, picks up an antique leather notebook, thoughtful pause, natural lighting, intimate documentary feel.", caption: "Steal his voice." },
    { num: 3, prompt: "Mac leans against a brick warehouse doorframe, looks toward someone off-camera, subtle smile, soft amber shadows.", caption: "30 video prompts inside." },
    { num: 4, prompt: "Mac walks past a steam-fogged cafe window, pauses, notices something outside, contemplative, cinematic depth of field.", caption: "Link in bio." },
    { num: 5, prompt: "Mac in a dimly lit consultation room, looks down, slow exhale, emotional restraint, warm interior bokeh.", caption: "Writers. Creators. This is for you." },
    { num: 6, prompt: "Mac turns toward camera, holds steady eye contact, calm intense moral clarity, shallow depth of field.", caption: "The Mac Nazarene pack." },
    { num: 7, prompt: "Mac enters a vintage archive room, scans quietly, moves with purpose, dramatic shadow play across his leather jacket.", caption: "Done-for-you character prompts." },
    { num: 8, prompt: "Mac looks out a penthouse window at night, city lights reflecting in his eyes, pensive, slow camera push-in.", caption: "Full consistency kit." },
    { num: 9, prompt: "Mac walks away from camera along a gravel path, stops, looks back over shoulder, golden hour flare.", caption: "Get the duo pack." },
    { num: 10, prompt: "Mac sits in an armchair, leans forward, speaks directly to camera with calm magnetic conviction, cinematic 4k.", caption: "Mac Nazarene. Ready to animate." }
  ];

  const MARY_SOLO_PROMPTS = [
    { num: 1, prompt: "Mary Magnumbytes stands in a modern glass workstation, data telemetry streams reflecting in her hazel eyes, sharp expression.", caption: "Mary Magnumbytes. Full kit ↓" },
    { num: 2, prompt: "Mary walks through an industrial loft corridor, holographic data streams on glass behind her, confident stride.", caption: "Digital-age characters that sell." },
    { num: 3, prompt: "Mary picks up a rugged translucent tablet, scrolls rapidly, smirks at the anomaly she uncovers, clever, fast.", caption: "30 prompts. 1 click." },
    { num: 4, prompt: "Mary leans on a polished metal desk, explains complex packet traces with her hands, witty and warm.", caption: "Creators. This is your vault." },
    { num: 5, prompt: "Mary turns from five glowing monitors, looks directly at camera, raised eyebrow, effortless confidence.", caption: "Link in bio." },
    { num: 6, prompt: "Mary walks fast through a bright server facility, adjusting her holographic cuff, determined.", caption: "Mary Magnumbytes pack." },
    { num: 7, prompt: "Mary looks at a broken network node, touches the glass lightly, solves the exploit with her eyes.", caption: "Done-for-you character consistency." },
    { num: 8, prompt: "Mary sits in a booth with an espresso cup, catches someone's gaze, knowing smirk, cyber rim light.", caption: "$67. Instant download." },
    { num: 9, prompt: "Mary gestures toward an orbital holographic diagram, clean, premium, high-fashion meets digital forensics.", caption: "The duo dynamic." },
    { num: 10, prompt: "Mary leans back in her ergonomic mesh chair, crosses arms, challenges the viewer with razor-sharp gaze.", caption: "Steal her confidence." }
  ];

  const DUO_PROMPTS = [
    { num: 1, prompt: "Mary and Mac stand side by side in a dim loft, Mary looking at a tablet screen, Mac looking at her, tension and trust.", caption: "The complete duo pack." },
    { num: 2, prompt: "Mary gestures toward a glowing data anomaly, Mac nods slowly in understanding, shared investigative focus.", caption: "Two characters. One vault." },
    { num: 3, prompt: "Mary and Mac walk together through a rain-slick city street, Mary walking fast, Mac steady, complementary motion.", caption: "Full consistency. Full contrast." },
    { num: 4, prompt: "Mary and Mac sit across a table, Mary speaking rapidly, Mac listening with calm stillness, dynamic chemistry.", caption: "Used by creators worldwide." },
    { num: 5, prompt: "Mary and Mac at a forensic glass board, Mary tracing packet logs, Mac evaluating human motives, dual angles.", caption: "Get the bundle." }
  ];

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl border border-[#C5A36A]/20 bg-[#0F0F0F] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A36A]/30 bg-[#C5A36A]/10 text-[11px] font-mono-code text-[#C5A36A]">
            <Cpu className="w-3 h-3" />
            <span>9TH &amp; 12TH DELIVERABLE • PROMPT VAULT, 90-MIN BATCH SOP &amp; MONETIZATION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-luxury font-light text-white">
            Character Prompt Vault &amp; Creator Production Pipeline
          </h1>
          <p className="text-sm text-white/60 font-sans leading-relaxed">
            The turn-key commercial kit for AI creators: 30 ready-to-run Kling motion prompts, the 90-minute batch production SOP, and structured Gumroad product tiers.
          </p>
        </div>
      </div>

      {/* Sub-Navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        {[
          { id: 'video-prompts', label: '30 Video Motion Prompts' },
          { id: 'sop', label: '90-Min Production Batch SOP' },
          { id: 'monetization', label: 'Gumroad Monetization Matrix' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2 rounded-full text-xs font-mono-code transition-all cursor-pointer ${
              activeSubTab === tab.id
                ? 'bg-[#C5A36A] text-black font-bold shadow-md'
                : 'bg-neutral-900 text-white/60 hover:text-white border border-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sub-Tab 1: 30 Video Prompts */}
      {activeSubTab === 'video-prompts' && (
        <div className="space-y-8">
          {/* Mac Solo */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif-luxury font-semibold text-white flex items-center gap-2">
              <span className="text-[#F59E0B]">Mac Nazarene</span> Solo Prompts (10 Video Assets)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MAC_SOLO_PROMPTS.map((item) => (
                <div key={item.num} className="p-4 rounded-xl border border-white/10 bg-[#0E0E0E] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className="text-[#F59E0B] font-bold">Mac Video #{item.num}</span>
                    <button
                      onClick={() => handleCopy(`mac-${item.num}`, item.prompt)}
                      className="text-white/50 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === `mac-${item.num}` ? <Check className="w-3 h-3 text-[#C5A36A]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === `mac-${item.num}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-white/80 font-mono-code leading-relaxed">"{item.prompt}"</p>
                  <div className="text-[11px] font-sans text-white/40 italic">Caption Hook: "{item.caption}"</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mary Solo */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-lg font-serif-luxury font-semibold text-white flex items-center gap-2">
              <span className="text-[#38BDF8]">Mary Magnumbytes</span> Solo Prompts (10 Video Assets)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MARY_SOLO_PROMPTS.map((item) => (
                <div key={item.num} className="p-4 rounded-xl border border-white/10 bg-[#0E0E0E] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className="text-[#38BDF8] font-bold">Mary Video #{item.num}</span>
                    <button
                      onClick={() => handleCopy(`mary-${item.num}`, item.prompt)}
                      className="text-white/50 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === `mary-${item.num}` ? <Check className="w-3 h-3 text-[#C5A36A]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === `mary-${item.num}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-white/80 font-mono-code leading-relaxed">"{item.prompt}"</p>
                  <div className="text-[11px] font-sans text-white/40 italic">Caption Hook: "{item.caption}"</div>
                </div>
              ))}
            </div>
          </div>

          {/* Duo Prompts */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-lg font-serif-luxury font-semibold text-white flex items-center gap-2">
              <span className="text-[#C5A36A]">Mary &amp; Mac</span> Dynamic Duo Prompts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DUO_PROMPTS.map((item) => (
                <div key={item.num} className="p-4 rounded-xl border border-white/10 bg-[#0E0E0E] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className="text-[#C5A36A] font-bold">Duo Video #{item.num}</span>
                    <button
                      onClick={() => handleCopy(`duo-${item.num}`, item.prompt)}
                      className="text-white/50 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === `duo-${item.num}` ? <Check className="w-3 h-3 text-[#C5A36A]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === `duo-${item.num}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-white/80 font-mono-code leading-relaxed">"{item.prompt}"</p>
                  <div className="text-[11px] font-sans text-white/40 italic">Caption Hook: "{item.caption}"</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: 90-Min SOP */}
      {activeSubTab === 'sop' && (
        <div className="rounded-2xl border border-white/10 bg-[#0E0E0E] p-8 space-y-6">
          <div className="flex items-center gap-2 text-base font-serif-luxury font-semibold text-white">
            <Clock className="w-5 h-5 text-[#C5A36A]" />
            <span>The 90-Minute Batch Production Protocol (50 Videos / 5 Days Buffer)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-sans">
            <div className="p-4 rounded-xl border border-white/5 bg-black/60 space-y-2">
              <span className="text-[#C5A36A] font-mono-code font-bold">00–20 MIN: GENERATION</span>
              <p className="text-white/70 leading-relaxed">
                Generate 5 Midjourney seed images (mix of Mac solo, Mary solo, duo) using the audited character prompts.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/5 bg-black/60 space-y-2">
              <span className="text-[#C5A36A] font-mono-code font-bold">20–50 MIN: ANIMATION</span>
              <p className="text-white/70 leading-relaxed">
                Run all 5 images through Kling Motion (2 prompt variations each = 10 high-definition video clips).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/5 bg-black/60 space-y-2">
              <span className="text-[#C5A36A] font-mono-code font-bold">50–70 MIN: POLISH</span>
              <p className="text-white/70 leading-relaxed">
                Export, add brand watermark, apply subtle color grade, trim to high-retention 5–8 second hooks.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-white/5 bg-black/60 space-y-2">
              <span className="text-[#C5A36A] font-mono-code font-bold">70–90 MIN: DISTRIBUTION</span>
              <p className="text-white/70 leading-relaxed">
                Copy the 10 pre-written captions, attach Gumroad vault link, schedule across TikTok / Reels / X.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Monetization Matrix */}
      {activeSubTab === 'monetization' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-[#0E0E0E] space-y-4">
            <div className="text-xs font-mono-code text-[#C5A36A] uppercase font-bold">TIER 1 • CREATOR VAULT</div>
            <div className="text-3xl font-serif-luxury font-bold text-white">$67</div>
            <p className="text-xs text-white/60">The Mac &amp; Mary Character Consistency Kit for AI Creators.</p>
            <ul className="space-y-2 text-xs text-white/80 font-sans">
              <li>✓ Mac &amp; Mary Character Master Prompts</li>
              <li>✓ 30 Ready-to-run Kling Motion Prompts</li>
              <li>✓ Color Hex Template &amp; Midjourney Guide</li>
              <li>✓ 1-Page 90-Minute Batch Cheatsheet</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-[#C5A36A]/40 bg-[#161410] space-y-4 shadow-xl">
            <div className="text-xs font-mono-code text-[#C5A36A] uppercase font-bold">TIER 2 • STRATEGY SUITE</div>
            <div className="text-3xl font-serif-luxury font-bold text-white">$97</div>
            <p className="text-xs text-white/60">Full Multi-Soul Expansion &amp; Consultation Framework.</p>
            <ul className="space-y-2 text-xs text-white/80 font-sans">
              <li>✓ Everything in Tier 1 ($67 Kit)</li>
              <li>✓ 5 Additional Primary Souls Prompt Packs</li>
              <li>✓ Video Intro &amp; Pilot Screenplay Assets</li>
              <li>✓ 1-Hour Async Strategy Call Template</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0E0E0E] space-y-4">
            <div className="text-xs font-mono-code text-[#C5A36A] uppercase font-bold">TIER 3 • EMPIRE INTEGRATION</div>
            <div className="text-3xl font-serif-luxury font-bold text-white">$197</div>
            <p className="text-xs text-white/60">Enterprise Depot Hierarchy &amp; Full Content Calendar.</p>
            <ul className="space-y-2 text-xs text-white/80 font-sans">
              <li>✓ Everything in Tier 2 ($97 Kit)</li>
              <li>✓ 30-Day Automated Content Calendar</li>
              <li>✓ HEART-Tiapmaatzu 5-Depot Operating Hierarchy</li>
              <li>✓ Monthly Prompt Refresh Vault Access</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
