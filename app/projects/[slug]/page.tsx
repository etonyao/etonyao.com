import { notFound } from 'next/navigation';

type Section = { heading: string; body: string; bullets?: string[] };

type Project = {
  title: string;
  category: string;
  tags: string[];
  tagline: string;
  overview: string;
  sections: Section[];
  outcomes?: string[];
  link?: string;
  linkLabel?: string;
};

const projects: Record<string, Project> = {
  'sustainability-dashboard': {
    title: 'Sustainability Dashboard — Ringley Group',
    category: 'Product Management',
    tags: ['Product Management', 'Data Analysis', 'Roadmapping'],
    tagline: 'Turning 10,000+ data points into a net-zero decision engine.',
    overview: 'During my Product Management internship at Ringley Group in London, I defined the product roadmap for a sustainability dashboard designed to track environmental data across their property portfolio and guide net-zero acquisition decisions.',
    sections: [
      {
        heading: 'Problem',
        body: 'Ringley Group managed a large portfolio of properties and lacked a centralized tool to track sustainability metrics. Decision-makers had no reliable way to assess environmental impact across assets or prioritize net-zero initiatives.',
      },
      {
        heading: 'Approach',
        body: 'I conducted stakeholder interviews with property managers and executives to understand data needs, then mapped out the core feature set and data architecture. I defined the roadmap in phased sprints, prioritizing the highest-impact data points first.',
        bullets: [
          'Identified 10,000+ relevant data points across energy, water, and emissions',
          'Defined MVP scope and phased delivery roadmap',
          'Created user stories and acceptance criteria for the engineering team',
          'Facilitated weekly sprint reviews with cross-functional stakeholders',
        ],
      },
      {
        heading: 'Outcome',
        body: 'The roadmap was approved and development began during my tenure. The dashboard gave Ringley\'s leadership a single source of truth for sustainability metrics, directly informing property acquisition and net-zero strategy.',
      },
    ],
    outcomes: [
      '10,000+ data points tracked across the property portfolio',
      'Roadmap delivered across 3 phased sprints',
      'Directly informed net-zero property acquisition decisions',
    ],
  },

  'climate-change-analysis': {
    title: 'Anthropogenic Climate Change Analysis',
    category: 'Product Management',
    tags: ['Python', 'Data Analysis', 'Research'],
    tagline: 'Using data to prove humans are changing the climate.',
    overview: 'A data analysis project examining the statistical relationship between CO2 emissions, urbanization rates, and global temperature increases using multiple public datasets.',
    sections: [
      {
        heading: 'Problem',
        body: 'Climate change is often discussed qualitatively. The goal of this project was to quantitatively demonstrate the correlation between human activity and rising global temperatures using real-world data.',
      },
      {
        heading: 'Approach',
        body: 'Using Python, I pulled and cleaned datasets from public sources including NASA and NOAA, then applied statistical analysis and visualization to surface meaningful trends.',
        bullets: [
          'Cleaned and merged multiple public climate datasets in Python',
          'Applied regression analysis to measure correlation between CO2 and temperature',
          'Visualized urbanization trends alongside temperature anomalies',
          'Documented findings with reproducible Jupyter notebooks',
        ],
      },
      {
        heading: 'Outcome',
        body: 'The analysis clearly demonstrated a statistically significant correlation between human CO2 emissions, urbanization, and global temperature increases — providing a data-backed foundation for climate policy discussion.',
      },
    ],
    outcomes: [
      'Strong correlation found between CO2 emissions and temperature rise',
      'Multi-dataset analysis combining NASA, NOAA, and World Bank sources',
      'Fully reproducible Python/Jupyter notebook deliverable',
    ],
  },

  'pokemon-ml-predictor': {
    title: 'Pokémon Stats ML Predictor',
    category: 'Product Management',
    tags: ['Machine Learning', 'Python', 'Neural Networks'],
    tagline: 'Can a neural network tell a Legendary from the stats alone?',
    overview: 'A machine learning project using neural networks to analyze Pokémon base statistics and predict whether a Pokémon is Legendary, complete with confusion matrix visualization and interactive predictions.',
    sections: [
      {
        heading: 'Problem',
        body: 'Legendary Pokémon are rare and powerful — but can their status be predicted from raw stats alone, without any metadata? This project explored whether a neural network could learn that distinction.',
      },
      {
        heading: 'Approach',
        body: 'I built and trained a neural network in Python using the full Pokémon stats dataset, experimenting with model architecture and hyperparameters to maximize classification accuracy.',
        bullets: [
          'Preprocessed and normalized a dataset of 800+ Pokémon with 6 base stats each',
          'Designed and trained a multi-layer neural network classifier',
          'Evaluated model performance using a confusion matrix',
          'Built an interactive prediction interface for user-inputted stats',
        ],
      },
      {
        heading: 'Outcome',
        body: 'The model achieved strong classification accuracy and could reliably identify Legendary Pokémon from stats alone. The confusion matrix revealed which types of Pokémon were most likely to be misclassified.',
      },
    ],
    outcomes: [
      'Successfully trained neural network classifier on 800+ Pokémon',
      'Confusion matrix visualization of model performance',
      'Interactive prediction interface for real-time classification',
    ],
  },

  'alongside-prd': {
    title: 'Alongside AI — Kiwi Connect PRD',
    category: 'Product Management',
    tags: ['Product Management', 'AI Integration', 'EdTech'],
    tagline: 'An AI-moderated peer chat feature to help students feel less alone.',
    overview: 'A full Product Requirements Document for Kiwi Connect — a proposed feature for Alongside AI that enables anonymous, AI-moderated peer-to-peer chat between students across different schools.',
    sections: [
      {
        heading: 'Problem',
        body: 'Alongside\'s research showed that "building and navigating interpersonal relationships is the stickiest issue for today\'s teens." Students who used the app were developing skills with Kiwi AI but had no way to practice those skills with real peers. Alongside also lacked a defensible moat against general-purpose AI competitors like ChatGPT.',
      },
      {
        heading: 'Solution',
        body: 'Kiwi Connect pairs students anonymously from different schools for ongoing conversations moderated by Kiwi AI. Kiwi provides prompts, keeps discussions respectful, and encourages empathy — without generating the conversation itself.',
        bullets: [
          'Anonymous cross-school pairing to protect student privacy',
          'Kiwi moderates and guides without replacing human connection',
          'Students can volunteer as peer supporters to build leadership skills',
          'Covers wellbeing topics: sleep, exercise, diet, emotional goals',
        ],
      },
      {
        heading: 'Go-to-Market & Experiment Plan',
        body: 'Proposed a school-by-school pilot rollout with A/B testing of different Kiwi moderation styles, and a control group of students without the feature to measure engagement and wellbeing impact.',
      },
      {
        heading: 'Timeline',
        body: 'Designed a 12-month delivery roadmap with four major milestones.',
        bullets: [
          'Month 3 — MVP chat interface + Kiwi moderation prototype',
          'Month 6 — Pilot in 3–5 schools',
          'Month 9 — Evaluate engagement and safety metrics',
          'Month 12 — Full rollout',
        ],
      },
    ],
    outcomes: [
      '50% adoption rate target with hourly–daily usage goal',
      'Creates a defensible moat no other AI platform offers',
      'Future expansions: peer mentor badges, group topic rooms, counselor integrations',
    ],
  },

  'pokemon-team-builder': {
    title: 'Pokémon Team Builder',
    category: 'Product Management',
    tags: ['React', 'Next.js', 'UI/UX'],
    tagline: 'A competitive team builder built for serious VGC players.',
    overview: 'A full-stack web application for building and managing competitive Pokémon teams. Supports multiple formats including VGC and Smogon, with EV spread management, item and nature selection, and curated meta spreads.',
    sections: [
      {
        heading: 'Problem',
        body: 'Existing team builders like Showdown\'s teambuilder are functional but not optimized for mobile or casual competitive players. I wanted to build something cleaner, faster, and format-aware.',
      },
      {
        heading: 'What I Built',
        body: 'A Next.js app with a full team management UI, Pokémon selection modal with search and format filtering, and a detailed edit modal for each Pokémon.',
        bullets: [
          'Format-aware Pokémon filtering (VGC Reg I, Reg H, Smogon OU, Pokémon Champions)',
          'EV spread sliders with 510-point cap enforcement',
          'Nature selection with stat boost/drop preview',
          'Curated "Popular EV Spreads" for meta Pokémon',
          'Live sprites via PokéAPI',
        ],
      },
    ],
    outcomes: [
      'Supports 4 competitive formats with format-locked Pokémon pools',
      'Full EV/nature/item customization per Pokémon slot',
      'Pre-loaded meta spreads for top VGC Pokémon',
    ],
    link: '/pokemonteambuilder',
    linkLabel: 'Try the Team Builder',
  },

  'ai-time-entry': {
    title: 'AI Time Entry System — Concept Prototype',
    category: 'Product Management',
    tags: ['Product Management', 'AI Integration', 'Prototyping'],
    tagline: 'Reducing 30-minute time entry sessions to under 12 minutes with AI.',
    overview: 'An interactive prototype for an AI-powered time tracking system targeting "complex users" — professionals who log 6+ WBS codes daily and spend 30+ minutes on time entry. The prototype demonstrates how calendar-based AI suggestions can dramatically streamline the process.',
    sections: [
      {
        heading: 'Problem',
        body: 'Complex users (18% of the user base) spent over 30 minutes per day on manual time entry, often submitting late or inaccurately. Existing tools were reactive — they required full manual input with no intelligence layered on top.',
      },
      {
        heading: 'Solution',
        body: 'An AI assistant that activates after 15 minutes of activity and surfaces calendar-based suggestions for time entries, allowing users to apply all their entries in one click.',
        bullets: [
          'Calendar sync auto-suggests WBS codes from Outlook events',
          'AI detects recurring patterns and pre-fills common entries',
          'Bulk entry mode with keyboard shortcuts for power users',
          'AI appears non-intrusively after threshold time, not upfront',
        ],
      },
      {
        heading: 'Phased Rollout Strategy',
        body: 'Designed a 3-phase product roadmap to ship incrementally and validate each layer before expanding.',
        bullets: [
          'Phase 1 — Calendar Sync + Smart Detection (Live)',
          'Phase 2 — Pattern Recognition, Bulk Entry, Time Splitting (Q2)',
          'Phase 3 — Voice Input, Mobile App, Auto-Save Drafts (Q3)',
        ],
      },
    ],
    outcomes: [
      'Target: 60% reduction in time entry duration for complex users',
      '25% increase in same-day submission rates by end of Phase 2',
      'Interactive prototype built and demoed end-to-end',
    ],
    link: '/pwccase',
    linkLabel: 'View Live Prototype',
  },

  'netflix-film-of-the-week': {
    title: 'Netflix — Film of the Week PRD',
    category: 'Product Management',
    tags: ['Product Management', 'Streaming', 'Content Discovery'],
    tagline: 'One film. One week. A shared cultural moment on Netflix.',
    overview: 'A Product Requirements Document for a curated weekly film spotlight feature on Netflix, designed to combat decision fatigue and surface under-discovered catalog titles through a TikTok-native content strategy.',
    sections: [
      {
        heading: 'Problem',
        body: 'Netflix users frequently scroll for long periods without selecting content — and many leave the platform entirely. High-quality catalog films remain invisible due to algorithmic prioritization of new releases. Users were turning to TikTok for recommendations, signaling a gap in Netflix\'s internal discovery.',
      },
      {
        heading: 'Solution',
        body: 'A dedicated "Film of the Week" homepage section featuring one curated film per week — often older, critically acclaimed, or under-discovered — with a short-form vertical preview designed to mimic TikTok-style content.',
        bullets: [
          'Prominent homepage banner with editorial curation rationale',
          'Short-form vertical preview optimized for mobile and social sharing',
          'Film selection combines algorithmic signals with editorial judgment',
          'UGC campaign extension on Netflix\'s social channels',
        ],
      },
      {
        heading: 'Experiment Plan',
        body: 'A/B test with one group exposed to the Film of the Week feature vs. a standard homepage control group. Parallel social media test to evaluate whether short-form content drives viewing behavior.',
      },
      {
        heading: 'Future Expansions',
        body: 'Show of the Week, Short of the Week, personalized or region-specific weekly picks.',
      },
    ],
    outcomes: [
      'Low engineering lift — builds on existing homepage infrastructure',
      'Increases visibility for high-quality catalog titles',
      'Creates a weekly social media moment to drive off-platform awareness',
    ],
  },

  'netflix-mood-meter': {
    title: 'Netflix — Mood Meter PRD + Lean Canvas',
    category: 'Product Management',
    tags: ['Product Management', 'AI Integration', 'Streaming'],
    tagline: 'What\'s your mood tonight? Netflix should ask.',
    overview: 'A full group PRD, Lean Canvas, user stories, and ICE-scored product backlog for the Netflix Mood Meter — a mood-first content discovery feature that lets users pick their vibe and receive a curated recommendation in under 90 seconds.',
    sections: [
      {
        heading: 'Problem',
        body: 'U.S. streaming viewers spend an average of 12 minutes per session searching for content. 19% abandon sessions entirely when they can\'t find something to watch, rising to 29% among 18–24 year olds. Netflix\'s "Play Something" feature was retired in 2024 due to low usage — proving that passive randomization wasn\'t the answer. Users needed structured, intention-aware discovery.',
      },
      {
        heading: 'Solution',
        body: 'The Mood Meter is a persistent homepage banner ("What\'s your mood tonight?") that walks users through a 3-screen flow: mood tile selection, preference tuning, and a personalized results page — completable in under 90 seconds.',
        bullets: [
          '8 mood tiles: Chill, Hyped, Laugh, Emotional, Scared, Romantic, Mind-Bending, Action',
          'Preference sliders for watch length and content familiarity',
          'Viewing context toggle: Solo / With Others / Family (filters by maturity rating)',
          'Results page with AI-generated reasoning connecting mood to pick',
          'Persistent banner on all devices — no account setup required',
        ],
      },
      {
        heading: 'ICE Scoring & Prioritization',
        body: 'Our team evaluated three competing feature ideas using ICE scoring. The Mood Meter scored highest at 28 (Impact: 8, Confidence: 0.5, Ease: 7), beating out Film of the Week (16.8) and a Social Review Layer (4).',
      },
      {
        heading: 'Experiment Plan',
        body: 'Three-phase rollout: observe (5% US rollout, weeks 1–8), A/B test (mood meter vs. standard homepage, weeks 9–20), then structured user interviews before full launch at week 25+.',
      },
    ],
    outcomes: [
      'Target: 20% homepage entry rate within 90 days of launch',
      'Target: 65% of Mood Meter sessions result in playback',
      'Target: +12% average watch time vs. control group',
      'Target: 40% of first-time users return within 14 days',
    ],
  },

  'potion-problems': {
    title: 'Potion Problems — Game Marketing Campaign',
    category: 'Marketing',
    tags: ['Project Management', 'Marketing Strategy', 'Gaming'],
    tagline: 'Leading the marketing launch for USC\'s Advanced Games Project.',
    overview: 'As Marketing Lead for the USC Advanced Games Project, I drove the full marketing strategy for Potion Problems — a student-developed game — managing cross-functional collaboration across 8 teams to deliver a successful game trailer and launch campaign.',
    sections: [
      {
        heading: 'My Role',
        body: 'I served as the marketing lead, responsible for coordinating with engineering, design, narrative, and audio teams to align on the product story and deliver marketing assets on deadline.',
      },
      {
        heading: 'What I Did',
        body: 'Led the end-to-end marketing process from positioning through trailer launch.',
        bullets: [
          'Defined the game\'s marketing positioning and key messaging',
          'Coordinated asset delivery across 8 cross-functional teams',
          'Produced and launched the official game trailer',
          'Managed social media rollout and community engagement strategy',
        ],
      },
      {
        heading: 'Outcome',
        body: 'Successfully launched the game trailer on schedule, driving awareness for the USC Advanced Games Project showcase and building an audience ahead of the game\'s public demo.',
      },
    ],
    outcomes: [
      'Game trailer delivered on schedule across 8 teams',
      'Cross-functional collaboration with engineering, design, audio, and narrative',
      'Drove audience growth ahead of the public showcase',
    ],
  },

  'apasa': {
    title: 'APASA Community Impact Program',
    category: 'Marketing',
    tags: ['Program Management', 'Community Engagement', 'Events'],
    tagline: 'Building a service culture across 40+ organizations in LA.',
    overview: 'Designed and launched a community service initiative for APASA (Asian Pacific American Student Assembly), requiring 40+ member organizations to conduct coordinated community projects across Los Angeles.',
    sections: [
      {
        heading: 'Problem',
        body: 'APASA\'s member organizations operated largely independently, with little coordinated community impact. There was no shared program to drive collective service and build a culture of giving back among the 5,000+ students across the network.',
      },
      {
        heading: 'What I Built',
        body: 'A structured community impact program requiring all 40+ member organizations to plan and execute a community service project as part of their organizational requirements.',
        bullets: [
          'Designed the program framework, requirements, and participation criteria',
          'Onboarded 40+ organizations with clear guidelines and support',
          'Coordinated impact projects across Los Angeles communities',
          'Tracked engagement and sustained participation over multiple cycles',
        ],
      },
      {
        heading: 'Outcome',
        body: 'The program achieved a 60% sustained engagement rate — a strong result for a voluntary service initiative at this scale — and established community impact as a core pillar of APASA\'s organizational identity.',
      },
    ],
    outcomes: [
      '40+ member organizations participating',
      '5,000+ students engaged across the LA network',
      '60% sustained engagement rate across program cycles',
    ],
  },

  'kiwi-connect-press-release': {
    title: 'Alongside AI — Kiwi Connect Press Release',
    category: 'Marketing',
    tags: ['Marketing', 'Go-to-Market', 'Copywriting'],
    tagline: 'Announcing a feature that helps students feel less alone.',
    overview: 'A full launch press release for Kiwi Connect, Alongside AI\'s anonymous peer chat feature — written to communicate the product vision to schools, counselors, parents, and press.',
    sections: [
      {
        heading: 'The Challenge',
        body: 'Alongside needed to communicate a nuanced product — AI-moderated peer chat — to audiences who might be skeptical about student privacy, safety, and the role of AI in mental health. The press release needed to build trust while generating excitement.',
      },
      {
        heading: 'My Approach',
        body: 'I wrote the press release to lead with the student benefit and counselor validation, then follow with the product mechanics, safety model, and availability details.',
        bullets: [
          'Led with a counselor quote to establish credibility and empathy',
          'Explained the "how it works" clearly for non-technical audiences',
          'Addressed safety and privacy proactively in the FAQ section',
          'Positioned the feature as differentiated from ChatGPT and anonymous chat apps',
        ],
      },
      {
        heading: 'Key Message',
        body: '"Our mission has always been to help students feel less alone. Kiwi Connect goes one step further by empowering them to be part of that solution — not just receiving support but giving it."',
      },
    ],
    outcomes: [
      'Full press release with FAQ ready for media distribution',
      'Positions Alongside as the only AI platform combining peer empathy with AI safety',
      'School rollout framing: select U.S. schools early 2026, nationwide by year-end',
    ],
  },

  'the-sims-gtm': {
    title: 'The Sims — GTM & Brand Strategy',
    category: 'Marketing',
    tags: ['Go-to-Market', 'Brand Strategy', 'Gaming'],
    tagline: 'Turning a 25-year-old franchise into a cultural moment.',
    overview: 'A comprehensive go-to-market and brand strategy for The Sims franchise, built around a creator-first, community-led approach. Developed as part of a team project covering transmedia storytelling, UGC campaigns, brand partnerships, and an immersive PR event.',
    sections: [
      {
        heading: 'Context',
        body: 'The Sims has sold 200M+ units and reached 500M+ lifetime players, but moved to a free-to-play model in 2022. With an Amazon MGM movie in development, the franchise needed a strategy to re-establish cultural relevance and activate its massive but passive fanbase.',
      },
      {
        heading: '#MySimLife UGC Challenge',
        body: 'A TikTok/IG/YouTube Shorts campaign where players recreate real-life stories and dream scenarios using The Sims and share them with #MySimLife.',
        bullets: [
          'Weekly themes: "Dream Life," "Day in My Life," "Future Self," "Alternate Reality Me"',
          'Top creators featured on official Sims channels',
          'In-game rewards (exclusive items) for top submissions',
          'Turns players into creators and organic marketers',
        ],
      },
      {
        heading: 'PLUMBOB Rave — PR Event',
        body: 'A Sims-branded rave where attendees become "Sims IRL," entering through a Create-A-Sim check-in and wearing mood-reactive Plumbob headpieces that change color throughout the night based on their choices.',
        bullets: [
          'Guests choose character traits at entry (Romantic, Creative, Chaotic, etc.)',
          'Color-changing Plumbob headpieces reflect mood in real time',
          '"Sim chaos moments": flickering lights, random dance battles, NPC actors',
          'Creator integrations: DJs, TikTok creators, fashion/DIY influencers',
        ],
      },
      {
        heading: 'Sims x Love Island Partnership',
        body: 'A cross-platform brand partnership where Love Island contestants are added as playable Sims for a limited time, and in-show challenges are themed around Sims gameplay mechanics.',
      },
    ],
    outcomes: [
      'Full transmedia strategy across social, PR, experiential, and brand partnerships',
      'Creator-first campaign designed to generate millions in earned media',
      'Positions The Sims as a lifestyle brand, not just a game',
    ],
  },

  'fable-marketing': {
    title: 'Fable — Marketing Launch Campaign',
    category: 'Marketing',
    tags: ['Go-to-Market', 'Gaming', 'Experiential Marketing'],
    tagline: 'Who will you become in Albion?',
    overview: 'A full marketing launch plan for the Fable reboot — covering brand positioning, customer personas, experiential activations, social/digital campaigns, and brand partnerships designed to drive awareness and pre-orders.',
    sections: [
      {
        heading: 'Positioning',
        body: 'Fable seeks to enable players to experience a fresh yet nostalgic fantasy adventure — reimagining the action RPG and modernizing choice and consequence for a new generation, while preserving the charm, satire, and moral transformation that made the original beloved.',
      },
      {
        heading: 'Target Audience',
        body: 'Three core personas: Ryan the Strategist (22–35, loves Baldur\'s Gate 3), Cheryl the Immersionist (21–30, loves The Witcher 3), and Veronica the Escapist (20–45, loves Skyrim). All share the "Explorer" archetype — players who want to immerse fully and shape their own story.',
      },
      {
        heading: '"Write Your Fable" — PR Pop-Up Event',
        body: 'Partner with a Renaissance Faire to create an immersive pop-up where attendees dress in Fable-inspired outfits matching their character archetype. Each outfit rental includes a unique code to unlock the same cosmetic in-game.',
        bullets: [
          'Drives "IRL vs. In-Game" social sharing',
          'Strengthens emotional connection before launch',
          'Boosts player acquisition and in-game cosmetic engagement',
        ],
      },
      {
        heading: '"Mirror of Albion" — Interactive OOH',
        body: 'An interactive bus stop screen that detects passersby\'s silhouettes and transforms their clothing into fantasy gear in real time — a hoodie becomes leather armor, headphones become a glowing crown.',
      },
      {
        heading: '"Choose Your Fate" — TikTok AR Filter',
        body: 'An AR filter that determines whether you\'re a Hero, Rogue, or Villain in Albion. Seeded through Twitch streamers and fantasy RPG TikTok creators.',
      },
      {
        heading: 'Brand Partnerships',
        body: 'Guinness (21+): Fable-themed can design aligning with the British fantasy world. Cadbury (under 21): Gold wrapper QR codes unlocking limited-time in-game skins, regions, or tools.',
      },
    ],
    outcomes: [
      'Full integrated campaign covering Awareness → Interest → Involvement → Purchase',
      'Four activations spanning digital, experiential, OOH, and brand partnerships',
      'Positioned Fable as a cultural event, not just a game launch',
    ],
  },

  'pokemon-pokopia-gtm': {
    title: 'Pokémon Pokopia — Full GTM Strategy',
    category: 'Marketing',
    tags: ['Go-to-Market', 'Gaming', 'Brand Strategy'],
    tagline: 'Bring life back, one habitat at a time.',
    overview: 'A comprehensive go-to-market strategy for Pokopia — a creature-collecting, habitat-restoration RPG for Nintendo Switch, mobile, and PC targeting casual and cozy gamers ages 7–30. The plan covers a $35–45M marketing budget across 3 phases, targeting 5–6M Year 1 units and 8–10M MAU by Month 6.',
    sections: [
      {
        heading: 'Positioning',
        body: '"For casual gamers aged 7–30, Pokémon Pokopia is a social simulation adventure game that delivers a mysterious quest and a narrative that can be enjoyed at any pace." Pokopia differentiates through restoration over conquest — players fix a damaged world rather than battle through it.',
        bullets: [
          'New habitat-building mechanic drives creativity and player ownership',
          'Short-session friendly — visible progress every play, no grind required',
          'Leverages the Pokémon franchise\'s 300M+ casual fan base',
        ],
      },
      {
        heading: 'Reveal Strategy',
        body: 'A cryptic teaser at Pokémon Presents (6–8 months pre-launch) showing a damaged world and a transforming Ditto, with no title revealed. Followed by a full gameplay trailer reveal 4–5 months out with an IGN exclusive deep-dive.',
      },
      {
        heading: 'Paid Media — 3-Phase Plan',
        body: 'Total budget: ~$35–45M (~10% of projected $350–420M revenue).',
        bullets: [
          'Phase 1 (20% budget): Always-on awareness via Meta, YouTube, TikTok targeting Pokémon fans 10–35',
          'Phase 2 (25% budget): Heavy pre-order creative; Twitch homepage takeover; Google UAC for mobile pre-registration',
          'Phase 3 (55% budget): Launch saturation — TikTok TopView Day 1, YouTube bumpers, Connected TV, full-funnel Meta',
        ],
      },
      {
        heading: 'Creator Strategy',
        body: 'Three-tier influencer structure: Tier 1 Anchors (2–4 creators, 500K–5M subs) with embargoed early access; Tier 2 Amplifiers (15–30, 100K–500K) with affiliate codes; Tier 3 Seeders (100+, 5K–100K) for algorithm-driven organic discovery.',
      },
      {
        heading: 'Franchise Synergy',
        body: 'Deep cross-promotion across the Pokémon ecosystem: Mystery Gift Ditto event in Scarlet/Violet, Ditto Disguise TCG card series, multi-episode anime arc, and unified Ditto events in Pokémon GO, Sleep, and Café ReMix.',
      },
      {
        heading: 'Brand Partnerships',
        body: 'LEGO: in-game "Convert to LEGO" button exports player builds to LEGO.com with a piece list and exclusive LEGO Ditto. Gong Cha: 3 Pokopia-themed drinks with a punch-card QR challenge rewarding in-game items and a free drink.',
      },
    ],
    outcomes: [
      '5–6M units sold Year 1 ($350–420M projected gross revenue)',
      '8–10M MAU target by Month 6',
      '15M+ mobile installs within 90 days',
      '80%+ aided awareness among Pokémon fans 8–30 within 90 days of announce',
      '500M+ organic social impressions via #Pokopia',
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) notFound();

  const isMarketing = project.category === 'Marketing';
  const accent = isMarketing ? 'purple' : 'blue';
  const accentClasses = {
    badge: isMarketing ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-blue-100 text-blue-700 border-blue-200',
    tag: isMarketing ? 'text-purple-700 bg-purple-50 border-purple-200' : 'text-blue-700 bg-blue-50 border-blue-200',
    heading: isMarketing ? 'text-purple-700' : 'text-blue-700',
    bullet: isMarketing ? 'bg-purple-400' : 'bg-blue-400',
    outcome: isMarketing ? 'border-purple-200 bg-purple-50 text-purple-800' : 'border-blue-200 bg-blue-50 text-blue-800',
    back: isMarketing ? 'hover:text-purple-600' : 'hover:text-blue-600',
    hero: isMarketing ? 'from-purple-50' : 'from-blue-50',
  };

  const backHref = isMarketing ? '/marketing' : '/product';

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 z-40 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <a href={backHref} className={`flex items-center gap-2 text-gray-600 ${accentClasses.back} transition-colors font-medium text-sm`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back
          </a>
          <span className="text-gray-300">|</span>
          <span className="text-gray-400 text-sm truncate">{project.title}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className={`pt-32 pb-16 px-6 bg-gradient-to-b ${accentClasses.hero} to-white`}>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border ${accentClasses.badge}`}>
              {project.category}
            </span>
            {project.tags.map((tag) => (
              <span key={tag} className={`px-3 py-1 rounded-full text-xs border ${accentClasses.tag}`}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{project.title}</h1>
          <p className={`text-xl font-medium mb-6 ${accentClasses.heading}`}>{project.tagline}</p>
          <p className="text-lg text-gray-600 leading-relaxed">{project.overview}</p>
          {project.link && (
            <a
              href={project.link}
              className={`inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all ${isMarketing ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {project.linkLabel || 'View Project'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}
        </div>
      </section>

      {/* Sections */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto space-y-14">
          {project.sections.map((section, i) => (
            <div key={i}>
              <h2 className={`text-xs font-bold uppercase tracking-widest mb-3 ${accentClasses.heading}`}>{section.heading}</h2>
              <p className="text-gray-700 leading-relaxed text-base mb-4">{section.body}</p>
              {section.bullets && (
                <ul className="space-y-2">
                  {section.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${accentClasses.bullet}`} />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Outcomes */}
          {project.outcomes && project.outcomes.length > 0 && (
            <div>
              <h2 className={`text-xs font-bold uppercase tracking-widest mb-4 ${accentClasses.heading}`}>Key Outcomes</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.outcomes.map((outcome, i) => (
                  <div key={i} className={`px-4 py-3 rounded-xl border text-sm font-medium ${accentClasses.outcome}`}>
                    {outcome}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
