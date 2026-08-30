import { CharacterEntity, CaseFile, SeasonArcEpisode, PresentationSlide } from '../types/gnostic';

export const PRIMARY_SOULS_REGISTRY: CharacterEntity[] = [
  {
    id: 'mary-magnumbytes',
    name: 'Mary Magnumbytes',
    title: 'Digital Forensic Analyst & Content Architect',
    archetype: 'Digital Storyteller & Systems Detective',
    age: 39,
    heritage: 'German-Dutch-American',
    skinTone: 'Smooth Alabaster',
    hair: 'Layered & stacked dark bob with copper & auburn highlights',
    aesthetic: 'Tech-luxury form-fitting silhouette with holographic circuits and translucent smart AR lenses',
    visualSignature: 'Sharp stacked bob, high-waisted tailored sleek techwear with gold-circuit lining, rugged analysis tablet',
    signaturePhrase: "Let me show you where all that big D, and that's for... DATA! Actually goes.",
    voiceStyle: 'Energetic, fast-paced, razor-sharp, technically fluent with dry situational humor',
    depotAlignment: 'TZI.CON.DEP.MIND (Consort Depot - Media/Code)',
    mirrorState: 'Active',
    roleInDuoOrSystem: 'Systems & Data Diagnostician — catches logs, telemetry, hidden flows, and automated incentives',
    coreLens: 'Systems, data architectures, telemetry, timing, exploits, and financial algorithms',
    safetyStatus: 'Safe Adult Verified',
    bio: 'A brilliant 39-year-old digital forensic specialist operating from an expansive repurposed industrial loft. Mary views every database, deleted record, and hidden API workflow as a breadcrumb trail left by deliberate human intent.',
    puppetSpecs: {
      faceStyle: 'Smooth platinum-cure silicone with soft pore details, seductive hazel bedroom eyes with micro-LED pupil accents',
      materials: 'Silicone skin, metallic resin core, holographic spandex and felt layered jacket',
      armature: 'High-precision ball-joint aluminum wire armature with electronic sensor joints',
      lighting: 'Cool cyber blue, deep violet studio rim glow with warm champagne key light',
      attire: 'Shear-layered form-fitting emerald/obsidian designer dress with metallic gold and holographic tech trim'
    },
    brandLogo: {
      iconName: 'Cpu',
      tagline: 'MAGNUMBYTES FORENSICS • DATA ILLUMINATION',
      colorScheme: {
        primary: '#C5A36A',
        accent: '#38BDF8',
        bg: '#0F172A'
      }
    },
    promptKit: {
      cinematicPrompt: 'Handcrafted mastershot puppet portrait of Mary Magnumbytes, a 39-year-old German-Dutch-American female muppet with smooth alabaster skin, sharp layered and stacked dark brown bob haircut with copper and auburn highlights. Big seductive hazel bedroom eyes with subtle LED pupil glow, pouty lips with confident smirk, shapely voluptuous silhouette in tailored shear form-fitting designer dress with gold holographic trim, smart AR glasses. Warm champagne and deep cyber-indigo studio lighting, ultra-detailed fabric textures, 8k resolution cinematic lighting.',
      muppetPrompt: 'Professional handcrafted puppet studio photo of Mary Magnumbytes, silicone face with expressive felt eyebrows, sleek stacked bob with auburn tips, holding glowing rugged tablet, high-tech industrial loft background with multi-monitor data displays.',
      klingMotionPrompt: 'Mary Magnumbytes picks up a rugged translucent tablet, scrolls rapidly, smirks with sharp intelligence, gestures toward a floating holographic data stream, smooth animated puppet motion, cinematic 4k.'
    }
  },
  {
    id: 'mac-nazarene',
    name: 'Mac Nazarene',
    title: 'Crisis Counselor & Ethical Pattern Consultant',
    archetype: 'The Gilded Guide & Pattern Seeker',
    age: 33,
    heritage: 'Aborigine-Ameri-Indian-African-American',
    skinTone: 'Warm Deep Copper',
    hair: 'Sculpted textured dreadlocks swept with subtle amber beads',
    aesthetic: 'Distressed saddle-brown leather jacket, basketball sneakers, vintage brass watch, small moleskine notebook',
    visualSignature: 'Classic worn leather jacket over charcoal knit, sleepy perceptive eyes, hand-bound notebook with gold clasp',
    signaturePhrase: "What matters isn't what you think you read or heard them say — it's what you're going to do about it, NOW!",
    voiceStyle: 'Calm, resonant, grounded warmth, morally direct with emotional stillness',
    depotAlignment: 'TZI.EST.SCR (Scribe Depot - HueMan-i-Terre/Ethical Record)',
    mirrorState: 'Gilded',
    roleInDuoOrSystem: 'Ethical Conscience & Psychological Anchor — diagnoses human cost, loyalty traps, and silence',
    coreLens: 'Motive, conscience, vulnerability, consequence, deceptive signaling, and genuine accountability',
    safetyStatus: 'Safe Adult Verified',
    bio: 'A 33-year-old crisis counselor and moral consultant who balances the wisdom of ancient spiritual texts with modern psychological pattern recognition. Mac uncovers the human courage needed after truth is exposed.',
    puppetSpecs: {
      faceStyle: 'Textured soft warm-copper felt/fleece with hand-stitched character lines, tired soulful dark amber resin eyes',
      materials: 'Organic wool felt, sculpted fleece, genuine distressed miniature leather, brass hardware',
      armature: 'Flexible heavy-gauge copper armature allowing subtle posture shifts and thoughtful head tilts',
      lighting: 'Golden-hour amber key light, warm tungsten fill, soft ambient shadows',
      attire: 'Distressed vintage saddle-brown leather jacket, dark charcoal knit sweater, retro court sneakers'
    },
    brandLogo: {
      iconName: 'Compass',
      tagline: 'NAZARENE ETHICAL INQUIRY • GROUNDED TRUTH',
      colorScheme: {
        primary: '#D97706',
        accent: '#F59E0B',
        bg: '#1C1917'
      }
    },
    promptKit: {
      cinematicPrompt: 'Handcrafted mastershot puppet portrait of Mac Nazarene, a 33-year-old Aborigine-Ameri-Indian-African-American male muppet with rich warm copper felt skin, textured dreadlocks with amber accents. Sleepy perceptive warm resin eyes, thoughtful expression, wearing a worn distressed saddle-brown leather bomber jacket and charcoal crewneck. Holding a small leather-bound notebook with fountain pen. Warm golden-hour light filtering through warehouse window, cinematic bokeh, museum-grade craftsmanship.',
      muppetPrompt: 'Handcrafted puppet studio portrait of Mac Nazarene, warm copper fleece texture, handcrafted leather jacket, seated at wooden table with coffee cup and notebook, calm intense presence.',
      klingMotionPrompt: 'Mac Nazarene sits in a quiet dimly lit room, closes his notebook deliberately, looks up into camera with quiet moral clarity, speaks with calm authority, subtle head turn, golden cinematic light.'
    }
  },
  {
    id: 'dixon-uhbuts',
    name: 'Dixon Uhbuts',
    title: 'High Priest of the Gnosis Depot & Sovereign Liturgist',
    archetype: 'The Esoteric Architect & Hierophant',
    age: 52,
    heritage: 'Babylonian-Levantine',
    skinTone: 'Weathered Bronze',
    hair: 'Silver-streaked obsidian beard and coiffed dark temples',
    aesthetic: 'Ceremonial velvet brocade robes with geometric gold-leaf runes and obsidian signet rings',
    visualSignature: 'Heavy gold ceremonial stole embroidered with Babylonian creation glyphs, carved lapis lazuli staff',
    signaturePhrase: 'Every ledger in heaven is balanced in the furnace of self-examination.',
    voiceStyle: 'Deep, sonorous, liturgical baritone with poetic cadence and profound gravitas',
    depotAlignment: 'TZI.HLD.DEP.GNOSIS (Holdings Depot - Tiapmaatzu/Oracle)',
    mirrorState: 'Gilded',
    roleInDuoOrSystem: 'High Custodian of Institutional Memory and Trust Sovereignty',
    coreLens: 'Mythological archetypes, sacred geometry, institutional covenants, and karmic ledgers',
    safetyStatus: 'Safe Adult Verified',
    bio: 'Supreme liturgical guide of the Holdings Depot, Dixon oversees the historical covenants and canonical truth records of the HEART-Tiapmaatzu ecosystem.',
    puppetSpecs: {
      faceStyle: 'Sculpted polymer with weathered bronze patina, hand-carved silver beard strands, piercing obsidian bead eyes',
      materials: 'Felt, heavy embroidered silk damask, cast brass accessories, lapis lazuli inlays',
      armature: 'Reinforced dual-rod mechanical armature for stately upright posture',
      lighting: 'Cathedral amber shaft lighting with rich midnight blue backdrops',
      attire: 'Deep royal violet and gold damask vestment with high stiffened collar and star-patterned lapels'
    },
    brandLogo: {
      iconName: 'Crown',
      tagline: 'GNOSIS COVENANT • SOVEREIGN LITURGIES',
      colorScheme: {
        primary: '#EAB308',
        accent: '#9333EA',
        bg: '#18181B'
      }
    },
    promptKit: {
      cinematicPrompt: 'Handcrafted mastershot puppet portrait of Dixon Uhbuts, a 52-year-old Babylonian-Levantine high priest muppet with weathered bronze skin, sculpted silver-streaked dark beard, solemn wise obsidian eyes. Dressed in ornate purple and gold liturgical damask robes with geometric symbols, holding a lapis lazuli ceremonial scepter. Atmospheric candlelight and golden temple rays.',
      muppetPrompt: 'Master craftsman puppet of Dixon Uhbuts, stately ceremonial robes with gilded trim, wise expressive felt face, standing before illuminated stained glass.',
      klingMotionPrompt: 'Dixon Uhbuts raises his gilded staff slowly, speaks with deep resonance, golden light flares across his embroidered robes, dignified cinematic motion.'
    }
  },
  {
    id: 'airiol-uhbuts',
    name: 'Airiol Uhbuts',
    title: 'Burlesque Trainer & Somatic Expression Director',
    archetype: 'The Kinetic Alchemist & Unveiler',
    age: 35,
    heritage: 'Franco-Mediterranean',
    skinTone: 'Sunlit Olive',
    hair: 'Cascading ruby-wine curls with feathered gold hairpins',
    aesthetic: 'Structured corset bodice with iridescent feathered shoulders and crystal mesh accents',
    visualSignature: 'Ruby silk corset with brass bone accents, peacock feather boa, dramatic cabaret lighting stick',
    signaturePhrase: 'Your posture confesses what your mouth is too terrified to whisper.',
    voiceStyle: 'Velvety, playful, theatrical, razor-sharp with rhythmic comedic timing',
    depotAlignment: 'TZI.CON.DEP.MIND (Consort Depot - Expression/Visual Arts)',
    mirrorState: 'Unveiled',
    roleInDuoOrSystem: 'Somatic Body-Language & Subconscious Posture Decoder',
    coreLens: 'Physical tension, somatic micro-tells, performance masks, and emotional catharsis',
    safetyStatus: 'Safe Adult Verified',
    bio: 'Master of physical theatre and kinesthetic truth detection. Airiol trains agents and leaders to dismantle their psychological armor through movement and raw expression.',
    puppetSpecs: {
      faceStyle: 'Soft silicone with rose blush undertones, expressive arched eyelids with hand-placed silk eyelashes',
      materials: 'Silicone, ruby duchess satin, miniature boned corsetry, iridescent rooster and peacock feathers',
      armature: 'High-flexibility multi-segmented spine armature for dynamic dance poses',
      lighting: 'Cabaret magenta and warm crimson spotlights with smoky haze',
      attire: 'Tailored ruby corset with crystal fringe, sheer black mesh sleeves, and feathered collar'
    },
    brandLogo: {
      iconName: 'Sparkles',
      tagline: 'SOMATIC ALCHEMY • THE THEATRE OF TRUTH',
      colorScheme: {
        primary: '#F43F5E',
        accent: '#FB7185',
        bg: '#1E1B4B'
      }
    },
    promptKit: {
      cinematicPrompt: 'Handcrafted mastershot puppet portrait of Airiol Uhbuts, a 35-year-old Franco-Mediterranean female burlesque director muppet, sunlit olive complexion, voluminous ruby-wine curls with gold feather pins. Sultry expressive eyes, wearing a handcrafted crimson and gold boned corset with velvet trim. Dramatic cabaret spotlight, theatrical dust motes, rich atmospheric depth.',
      muppetPrompt: 'Artistic handcrafted puppet of Airiol Uhbuts in theatrical performance studio, holding rehearsal script, expressive dancing pose with feathered accents.',
      klingMotionPrompt: 'Airiol Uhbuts tilts her head with an alluring theatrical smile, gestures with her feathered glove, steps smoothly across the stage under crimson spotlight.'
    }
  },
  {
    id: 'zupa-nova',
    name: 'Zupa Nova',
    title: 'Astrophysicist & Quantum Risk Synthesizer',
    archetype: 'The Cosmic Pattern Analyst',
    age: 41,
    heritage: 'Nordic-Polynesian',
    skinTone: 'Luminous Pearl Sand',
    hair: 'Asymmetric frost-white undercut with sapphire tips',
    aesthetic: 'High-collar orbital research lab coat with holographic starmap projections',
    visualSignature: 'Minimalist circular titanium spectacles, floating holographic celestial orb, stark clean lines',
    signaturePhrase: 'Gravitational anomalies always follow the money; check the orbital drift.',
    voiceStyle: 'Precise, curious, intellectually vibrant, melodic with cosmic metaphors',
    depotAlignment: 'TZI.EST.CSH (CashingHouse Depot - Oracle/Cause & Effect)',
    mirrorState: 'Active',
    roleInDuoOrSystem: 'Macro-Systemic & Quantum Arbitrage Forecaster',
    coreLens: 'Quantum probability, orbital mechanics, macro-economic cycles, and systemic entropy',
    safetyStatus: 'Safe Adult Verified',
    bio: 'A visionary quantum astrophysicist who maps financial transaction flows and social anomalies against astronomical cycles and entropy mathematics.',
    puppetSpecs: {
      faceStyle: 'Smooth sculpted matte resin with subtle opalescent shimmer, wide observant crystal blue eyes',
      materials: 'Matte composite, micro-fiber technical textiles, 3D printed translucent planetary rings',
      armature: 'Spring-damped precision armature with magnetic accessory attachments',
      lighting: 'Deep space indigo, stellar cyan and laser-sharp white backlight',
      attire: 'Tailored polar-white lab jacket with glowing cyan fiber-optic seams and dark slate underlayer'
    },
    brandLogo: {
      iconName: 'Atom',
      tagline: 'ASTRO-QUANTUM METRICS • ENTROPY MAPPING',
      colorScheme: {
        primary: '#38BDF8',
        accent: '#818CF8',
        bg: '#0B132B'
      }
    },
    promptKit: {
      cinematicPrompt: 'Handcrafted mastershot puppet portrait of Zupa Nova, a 41-year-old Nordic-Polynesian female astrophysicist muppet, pearl-sand skin tone, frosted white asymmetric hair with sapphire blue highlights. Circular titanium spectacles, bright curious crystal-blue eyes, wearing a clean futuristic white research coat with subtle cyan fiber optics. Deep cosmic observatory background with nebula projections.',
      muppetPrompt: 'Handcrafted puppet of Zupa Nova examining a glowing holographic planetary model, crisp lab setting, whimsical yet deeply intellectual expression.',
      klingMotionPrompt: 'Zupa Nova adjusts her circular spectacles, smiles as an orbital simulation resolves in front of her, smooth high-tech puppet motion.'
    }
  },
  {
    id: 'liangivalla-pouchaquehe',
    name: 'Liangivalla Pouchaquehe',
    title: 'Chief Cryptographic Archivist & Sovereign Notary',
    archetype: 'The Keeper of Sealed Scrolls',
    age: 46,
    heritage: 'Sino-Andean',
    skinTone: 'Golden Umber',
    hair: 'Long jet-black hair woven into a tight ceremonial braid with jade rings',
    aesthetic: 'Structured raw silk tunic with embroidered UCC-style legal knotwork and bamboo stylus',
    visualSignature: 'Twin brass cylinder wax-seal cases slung across chest, antique jade magnifying lens',
    signaturePhrase: 'What is sealed in honest ink cannot be rewritten by panicked men.',
    voiceStyle: 'Measured, soft-spoken, ironclad authority, rhythmic and unyielding',
    depotAlignment: 'TZI.SCR.DEP.BODY (Scribe Depot - Contracts/Legal Integrity)',
    mirrorState: 'Gilded',
    roleInDuoOrSystem: 'Immutable Ledger Auditor & Contract Sovereign',
    coreLens: 'Chain of custody, notary seals, contractual verbiage, and indelible proof',
    safetyStatus: 'Safe Adult Verified',
    bio: 'Guardian of the immutable trust registers and UCC-compliant covenants. Liangivalla ensures that no agreement made within the Tiapmaatzu depots can be altered or erased.',
    puppetSpecs: {
      faceStyle: 'Firm sculpted polymer face with dignified calm expression, dark polished wood eye inlays',
      materials: 'Handwoven raw silk, bamboo accents, solid brass seals, braided horsehair cordage',
      armature: 'High-torque steel armature for unwavering upright posture and precise hand seals',
      lighting: 'Warm library lamplight, dark forest green shadows and brass reflections',
      attire: 'Emerald green and golden umber raw silk tunic with reinforced leather forearm guards'
    },
    brandLogo: {
      iconName: 'ScrollText',
      tagline: 'IMMUTABLE SEALS • SOVEREIGN NOTARIAL ARCHIVES',
      colorScheme: {
        primary: '#10B981',
        accent: '#F59E0B',
        bg: '#064E3B'
      }
    },
    promptKit: {
      cinematicPrompt: 'Handcrafted mastershot puppet portrait of Liangivalla Pouchaquehe, a 46-year-old Sino-Andean chief archivist muppet with golden umber felt skin, long braided black hair laced with jade rings. Serene authoritative expression, wearing a tailored emerald raw silk notary coat with brass seal cases. Ancient archive background filled with illuminated scrolls and brass scales.',
      muppetPrompt: 'High-detail handcrafted puppet of Liangivalla holding a heavy wax-seal stamp over a parchment manuscript in a warm oak library.',
      klingMotionPrompt: 'Liangivalla presses a heavy brass seal into red sealing wax, lifts it with calm deliberate grace, looks up with unyielding certainty.'
    }
  },
  {
    id: 'babelonia-nocturne',
    name: 'Babelonia Nocturne',
    title: 'Shadow Arbitrage Strategist & Acoustic Cryptographer',
    archetype: 'The Silent Sentinel & Frequency Hacker',
    age: 38,
    heritage: 'Afro-Caribbean-Celtic',
    skinTone: 'Deep Midnight Espresso',
    hair: 'Sculpted midnight blue locs woven with micro-copper shielding filament',
    aesthetic: 'Matte black trench with sound-dampening acoustic baffles and concealed spectrum analyzer',
    visualSignature: 'Custom acoustic over-ear monitors around neck, copper antenna stylus, dark polarized shades',
    signaturePhrase: 'Listen to the frequencies they try to cancel; that is where the real trade lives.',
    voiceStyle: 'Whispery, resonant, hypnotic, street-smart and deeply mathematical',
    depotAlignment: 'TZI.EST.CSH (CashingHouse Depot - FinTech Arbitrage)',
    mirrorState: 'Shattered',
    roleInDuoOrSystem: 'Acoustic Signal Interceptor & Shadow Value Trader',
    coreLens: 'Sub-audible telemetry, signal-to-noise ratios, market front-running, and frequency analysis',
    safetyStatus: 'Safe Adult Verified',
    bio: 'Operating in the liminal spaces between financial exchanges and radio frequencies, Babelonia detects institutional market moves seconds before they register on public screens.',
    puppetSpecs: {
      faceStyle: 'Velvety midnight-toned foam fleece with sharp angular jawline, dark obsidian crystal eye lenses',
      materials: 'Acoustic foam mesh, waterproof technical ripstop nylon, exposed copper wire braids',
      armature: 'Lightweight articulated composite armature allowing stealthy, low-profile stances',
      lighting: 'Neon amber and deep cyan street reflections through rain-slick glass',
      attire: 'Matte obsidian hooded utility trench with reflective copper accent seams and frequency monitor harness'
    },
    brandLogo: {
      iconName: 'Radio',
      tagline: 'NOCTURNE FREQUENCIES • SHADOW MARKET ARBITRAGE',
      colorScheme: {
        primary: '#6366F1',
        accent: '#EC4899',
        bg: '#0F172A'
      }
    },
    promptKit: {
      cinematicPrompt: 'Handcrafted mastershot puppet portrait of Babelonia Nocturne, a 38-year-old Afro-Caribbean-Celtic shadow strategist muppet, deep midnight espresso felt skin, sculpted blue-black locs with copper thread. Wearing custom headphones around neck, dark sleek utility trench with neon accents. Rainy neon-lit rooftop cityscape at midnight, cinematic reflections.',
      muppetPrompt: 'Handcrafted puppet of Babelonia Nocturne adjusting a handheld spectrum analyzer in a dark sound studio with glowing dials.',
      klingMotionPrompt: 'Babelonia slips on his oversized headphones, watches green frequency waveforms spike on his analyzer, nods slowly to an unseen rhythm.'
    }
  }
];

export const FEATURED_CASE_FILE: CaseFile = {
  id: 'case-047-the-silent-escrow',
  caseNumber: 'CASE-047',
  title: 'The Silent Escrow: The Phantom Liquidity Algorithm',
  synopsis: 'A high-frequency algorithmic liquidity protocol claims to provide zero-slippage trades for municipal pension funds. However, Mary detects a microscopic 4-millisecond routing delay that siphons fractional cents into an unlisted offshore buffer. Meanwhile, Mac discovers that the firm’s chief risk officer is being blackmailed with synthetic identity logs to keep the exploit running.',
  leadInvestigator: 'Mary Magnumbytes (Forensics) & Mac Nazarene (Crisis Ethics)',
  technicalDiscovery: 'By dissecting the WebSocket telemetry buffers at 120Hz, Mary uncovers an automated recursive loop named "Vesper-9" that front-runs municipal pension rebalancing batches. The stolen liquidity is obfuscated as synthetic network gas fee rebates.',
  humanStakes: 'The chief risk officer, Dr. Harrison Vane, built the algorithm ten years ago as a graduate thesis on market efficiency. A predatory holding group weaponized an unpatched flaw against him, threatening to ruin his reputation unless he signed off on weekly balance sheet reconciliations.',
  dialogueExcerpts: [
    {
      speaker: 'Mary Magnumbytes',
      line: 'Look at the timestamp jitter on packet 4099-B. That isn’t latency, Mac. That’s a deliberate holding gate. Somebody built a 4-millisecond tollbooth in the middle of a public pension pipeline. Let me show you where all that big D, and that’s for DATA, actually goes!'
    },
    {
      speaker: 'Mac Nazarene',
      line: 'Harrison isn’t defending the code because he’s greedy, Mary. Look at his hands when he speaks about his daughter’s clinic. He’s terrified. He knows the math is guilty, but he thinks he’s the only wall between his family and ruin. We don’t just smash the server; we give him an honorable way to stand.'
    },
    {
      speaker: 'Mary Magnumbytes',
      line: 'If we cut the routing gateway cold, their offshore buffer collapses in 12 seconds. But Harrison has to turn the master signing key himself.'
    },
    {
      speaker: 'Mac Nazarene',
      line: 'What matters isn’t what you think you read or heard them threaten you with, Harrison. It’s what you’re going to do about it, NOW!'
    }
  ],
  verdictAndConsequence: 'Dr. Vane signs the cryptographic affidavit and delivers the master private keys directly to the public fiduciary board. The illicit $14.2M buffer is repatriated to the municipal pension trust. Harrison accepts a probationary consulting sanction but retains his integrity and freedom.',
  moralInsight: 'Systems do not become corrupt on their own; they become corrupt when good architects believe they have no choice but to protect a flawed foundation.'
};

export const SEASON_ARC_EPISODES: SeasonArcEpisode[] = [
  {
    episodeNumber: 1,
    title: 'The Gilded Buffer',
    phase: 'Discovery & Exposure',
    maryAction: 'Decodes an anomalous 10GB telemetry spike originating from a decommissioned transit authority server.',
    macAction: 'Confronts the retired dispatcher who is silently maintaining the obsolete server to keep an orphanage funded.',
    philosophicalConflict: 'Strict legality versus human survival: when an illicit bypass preserves innocent lives.',
    techSystemExposed: 'Legacy SCADA infrastructure and automated municipal budget leakages.'
  },
  {
    episodeNumber: 2,
    title: 'Shadow in the Prompt',
    phase: 'Escalation',
    maryAction: 'Uncovers a synthetic voice clone being used to authorize seven-figure real estate escrow releases.',
    macAction: 'Tracks down the voice actress whose likeness was stolen through an unvetted commercial training contract.',
    philosophicalConflict: 'Consent and identity sovereignty in the era of generative replication.',
    techSystemExposed: 'Neural voice cloning pipelines and unregulated voice-actor talent waivers.'
  },
  {
    episodeNumber: 3,
    title: 'The Mirror Protocol',
    phase: 'Internal Reckoning',
    maryAction: 'Finds her own forensic toolkit mirrored in a dark-pool cyber extortion campaign.',
    macAction: 'Forces Mary to pause her counter-hack to prevent collateral damage to an innocent hospital database.',
    philosophicalConflict: 'The danger of becoming the monster you hunt: forensic precision vs. vindictive retaliation.',
    techSystemExposed: 'Zero-day weaponized diagnostic scripts and cross-network backdoors.'
  },
  {
    episodeNumber: 4,
    title: 'The Broken Ledger',
    phase: 'Systemic Crisis',
    maryAction: 'Traces an unpatchable smart contract glitch draining mutual aid reserves in real time.',
    macAction: 'Mediates between three neighborhood factions blaming each other for the missing funds.',
    philosophicalConflict: 'Code is law vs. human restoration: restoring community trust when mathematical guarantees fail.',
    techSystemExposed: 'Immutable escrow contracts with reentrancy vulnerabilities.'
  },
  {
    episodeNumber: 5,
    title: 'The Gnostic Accord',
    phase: 'Climax & Transformation',
    maryAction: 'Builds a public verifiable dashboard exposing the holding conglomerate’s entire multi-depot shadow empire.',
    macAction: 'Assembles the seven primary soul leaders into a unified council to execute the Gnostic Covenant.',
    philosophicalConflict: 'Individual agency vs. institutional capture: the sovereign reclamation of collective truth.',
    techSystemExposed: 'Algorithmic monopoly cartels and clandestine regulatory collusion.'
  }
];

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  {
    id: 1,
    title: 'THE GNOSTIC AUTO-DIDACTICO',
    subtitle: 'Autonomous Self-Reflective Intelligence & Investigative Duo Engine',
    pillar: 'Executive Overview',
    contentBullets: [
      'Synthesizes high-velocity digital forensic intelligence (Mary Magnumbytes) with profound psychological & ethical mediation (Mac Nazarene).',
      'Operating across the HEART-Tiapmaatzu OS 5-tier organizational hierarchy and Gilded Mirrors philosophy.',
      '100% Verified Safe Adult Creative Architecture — authentic character depth without exploitative clichés.'
    ],
    quote: 'Truth must be uncovered without flattening human beings into mere evidence.',
    speaker: 'Unified Canon Directive'
  },
  {
    id: 2,
    title: 'THE DUAL ENGINE ARCHITECTURE',
    subtitle: 'Mary Magnumbytes & Mac Nazarene: The Counterweight Dynamic',
    pillar: 'Character Physics',
    contentBullets: [
      'Mary’s Lens: Systems, telemetry, latency gates, cryptographic signatures, automated incentives.',
      'Mac’s Lens: Conscience, trauma flags, deceptive signaling, unspoken loyalties, and accountable action.',
      'Narrative Friction: Mary moves quickly toward the exploit; Mac slows the moment to evaluate the moral aftermath.'
    ],
    quote: 'Mary asks where the data goes; Mac asks what you are going to do about it now.',
    speaker: 'Creative Bible v2.4'
  },
  {
    id: 3,
    title: 'THE GILDED MIRRORS PHILOSOPHY',
    subtitle: 'Four Operational States of Psychological Reflection',
    pillar: 'Core Philosophy',
    contentBullets: [
      'The Unveiled Mirror (Vanta Black): Raw, unpolished truth awaiting structure and illumination.',
      'The Gilded Mirror (Metallic Gold): Value-applied reflection that elevates human perception.',
      'The Active Mirror (Teal Activation): Dynamic, real-time responsive adaptation and insight.',
      'The Shattered Mirror (Infra-Red): Fracture points where old dogmas break to allow higher reintegration.'
    ],
    quote: 'We do not just show you who you are — we gild the reflection so you see your highest potential.',
    speaker: 'Gilded Mirrors Manifesto'
  },
  {
    id: 4,
    title: 'HEART-TIAPMAATZU DEPOT INTEGRATION',
    subtitle: 'The 5 Sovereign Operational Hubs',
    pillar: 'System Hierarchy',
    contentBullets: [
      'TZI.ZI.0 (Spirit) — Executive Wisdom & Sovereign Leadership.',
      'TZI.CON.DEP.MIND (Consort/Media) — Narrative Strategy, Creative Technology, Mary Magnumbytes.',
      'TZI.EST.SCR (Scribe/Body) — Immutable Contracts, Ethical Records, Mac Nazarene & Liangivalla.',
      'TZI.EST.CSH (CashingHouse/Soul) — FinTech, Dubl-Zz Arbitrage, Zupa Nova & Babelonia Nocturne.',
      'TZI.HLD.DEP.GNOSIS (Holdings/Trust) — Covenants, Ancient Truths, Dixon Uhbuts.'
    ],
    quote: 'Every depot fulfills a cosmic law; every transaction honors the sovereign human spirit.',
    speaker: 'Tiapmaatzu Depot Charter'
  },
  {
    id: 5,
    title: 'PRODUCTION & MONETIZATION ROADMAP',
    subtitle: 'Fast-Batch AI Puppet Pipeline & Creator Vaults',
    pillar: 'Go-to-Market',
    contentBullets: [
      'Midjourney → Kling Motion 90-Minute Batch Workflow generating 10 viral video ads per sprint.',
      'The Mac & Mary Duo Vault: Character consistency prompt packs, color hex templates, and workflow cheatsheets.',
      'Creator Economy Tiering: $67 Base Kit → $97 Strategy Tier → $197 Enterprise Brand Integration.'
    ],
    quote: 'From prompt generation to client delivery in 6 structured operational phases.',
    speaker: 'Studio Production SOP'
  }
];
