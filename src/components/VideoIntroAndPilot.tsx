import { useState } from 'react';
import { Radio, Play, Copy, Check, Sparkles, Clapperboard, Film, Terminal } from 'lucide-react';
import { SEASON_ARC_EPISODES } from '../data/gnosticCatalog';

export function VideoIntroAndPilot() {
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(id);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  const videoIntroScript = `[TITLE SEQUENCE: GILDED MIRRORS (30 SECONDS)]

(0:00 - 0:08)
AUDIO: Low modular sub-bass drone with rhythmic acoustic clicking of a vintage fountain pen.
VISUAL: Extreme macro shot of hand-stitched leather texture. A gold stylus touches an illuminated glass tablet. Green and amber waveform lines blossom across the dark surface.
VOICEOVER (MARY): "Systems don't lie. Logs don't forget. Every time someone tries to bury the truth, they leave a signature."

(0:08 - 0:18)
AUDIO: Fast-tempo mechanical clock ticking merges with a high-speed data stream whoosh.
VISUAL: Mary Magnumbytes turns smoothly under neon cyber-cyan lighting, lifting her AR glasses with a knowing smirk. Cut to Mac Nazarene standing in the warm amber glow of a street corner lamp, closing his weathered notebook and looking straight into the camera lens with penetrating stillness.
VOICEOVER (MAC): "What matters isn't what you think you heard them promise. It's what you're going to do about it... right now."

(0:18 - 0:30)
AUDIO: Explosive cinematic brass hit followed by rich vinyl cello chord.
VISUAL: The two handcrafted puppet silhouettes stand back-to-back as fractured gold mirror shards orbit them in 3D space, resolving into the master title logo:
GILDED MIRRORS: THE GNOSTIC AUTO-DIDACTICO.`;

  const pilotSceneScript = `SCENE 1: EXT. REPURPOSED INDUSTRIAL LOFT - RAINY MIDNIGHT

The camera pushes through steam-fogged floor-to-ceiling warehouse windows into Mary’s multi-monitor forensic workstation.

MARY MAGNUMBYTES (39, alabaster puppet with sharp copper-highlighted bob, wearing an emerald form-fitting tech dress) has five holographic telemetry streams suspended in front of her. She types furiously with one hand while holding a steaming espresso cup in the other.

MAC NAZARENE (33, warm copper felt skin, worn leather jacket) leans against the heavy timber doorframe, drinking black coffee from a chipped ceramic mug.

MARY
(Without looking up)
You’re doing that breathing thing again. The three-second exhale. That means you’ve already figured out who’s lying and you’re feeling sorry for them.

MAC
(Gentle smile, stepping inside)
I don’t feel sorry for him, Mary. I feel sorry for what he’s about to wake up to. Did the packet traces confirm the leak?

MARY
(Spinning her chair, smiling sharply)
Confirm it? Mac, they didn’t just leak it—they built a four-lane highway through the municipal transit escrow. 
(She taps the tablet, projecting a pulsing gold waveform)
Let me show you where all that big D—and yes, that’s for DATA—actually goes. Every Sunday at 2:03 AM, four million dollars disappears into an unlisted sub-ledger in Zurich.

MAC
(Looking at the waveform, nodding slowly)
And who signs off on the transfer?

MARY
Dr. Harrison Vane. Chief Risk Officer. Your boy from the clinic board.

MAC
(Pauses, looking at his small notebook)
Harrison hasn't bought a new suit in nine years. He drives a rusted sedan with 200,000 miles. He isn't spending that money, Mary. Somebody has him in a vise.

MARY
Then he’d better tell us who’s turning the crank before the federal wire monitors hit at 6:00 AM.

MAC
(Snapping his notebook shut with a clean click)
Let’s go give him a reason to speak.`;

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl border border-[#C5A36A]/20 bg-[#0F0F0F] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A36A]/30 bg-[#C5A36A]/10 text-[11px] font-mono-code text-[#C5A36A]">
            <Clapperboard className="w-3 h-3" />
            <span>3RD &amp; 4TH DELIVERABLE • VIDEO INTRO, PILOT OPENING &amp; SEASON ARC</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-luxury font-light text-white">
            Cinematic Video Intro, Pilot Script &amp; Season Narrative Arc
          </h1>
          <p className="text-sm text-white/60 font-sans leading-relaxed">
            Full production screenplay drafts, motion cues, and high-tension character dialogues engineered specifically for AI video generation pipelines (Midjourney + Kling Motion + ElevenLabs).
          </p>
        </div>
      </div>

      {/* Screenplay Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Intro Script */}
        <div className="rounded-2xl border border-white/10 bg-[#0E0E0E] p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-[#C5A36A]" />
                <h3 className="text-base font-serif-luxury font-semibold text-white">30-Second Series Teaser Intro</h3>
              </div>
              <button
                onClick={() => handleCopy('intro-script', videoIntroScript)}
                className="text-xs text-[#C5A36A] hover:text-white flex items-center gap-1 cursor-pointer font-mono-code"
              >
                {copiedScript === 'intro-script' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedScript === 'intro-script' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-xs text-white/50">Designed for automated Kling / ElevenLabs batch rendering.</p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-[#050505] font-mono-code text-xs text-emerald-400/90 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
            {videoIntroScript}
          </div>
        </div>

        {/* Pilot Scene Opening */}
        <div className="rounded-2xl border border-white/10 bg-[#0E0E0E] p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[#C5A36A]" />
                <h3 className="text-base font-serif-luxury font-semibold text-white">Pilot Episode Opening Scene</h3>
              </div>
              <button
                onClick={() => handleCopy('pilot-script', pilotSceneScript)}
                className="text-xs text-[#C5A36A] hover:text-white flex items-center gap-1 cursor-pointer font-mono-code"
              >
                {copiedScript === 'pilot-script' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedScript === 'pilot-script' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-xs text-white/50">Scene 1: The Midnight Industrial Loft Investigation.</p>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-[#050505] font-mono-code text-xs text-white/80 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
            {pilotSceneScript}
          </div>
        </div>
      </div>

      {/* Whole Season 1 Arc Breakdown */}
      <div className="rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-2xl font-serif-luxury font-semibold text-white">Season 1 Arc: The Gnostic Inversion</h3>
            <p className="text-xs text-white/50">Five canonical episodes mapping the escalation from local algorithmic fraud to global depot sovereignty.</p>
          </div>
          <span className="text-xs font-mono-code px-3 py-1 rounded-full border border-[#C5A36A]/40 text-[#C5A36A] bg-[#C5A36A]/10">
            5 Episodes Completed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEASON_ARC_EPISODES.map((ep) => (
            <div
              key={ep.episodeNumber}
              className="p-5 rounded-2xl border border-white/10 bg-[#121212] space-y-3 hover:border-[#C5A36A]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono-code text-[#C5A36A] font-bold">
                  EPISODE 0{ep.episodeNumber}
                </span>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full border border-white/10 bg-black text-white/60">
                  {ep.phase}
                </span>
              </div>
              <h4 className="text-base font-serif-luxury font-semibold text-white">{ep.title}</h4>

              <div className="space-y-2 text-xs font-sans text-white/70">
                <div>
                  <span className="text-[#38BDF8] font-mono-code text-[10px] uppercase block">Mary’s Investigation:</span>
                  <p className="text-white/80">{ep.maryAction}</p>
                </div>
                <div>
                  <span className="text-[#F59E0B] font-mono-code text-[10px] uppercase block">Mac’s Mediation:</span>
                  <p className="text-white/80">{ep.macAction}</p>
                </div>
                <div className="pt-1 border-t border-white/5 text-[11px] text-white/50 italic">
                  Conflict: {ep.philosophicalConflict}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
