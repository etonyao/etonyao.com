const projects = [
  {
    title: 'Pokémon Pokopia — Full GTM Strategy',
    category: 'Marketing',
    tags: ['Go-to-Market', 'Gaming', 'Brand Strategy'],
    description: 'Comprehensive go-to-market plan for Pokopia, a creature-collecting habitat-restoration RPG targeting casual and cozy gamers ages 7–30. Covers full-funnel paid media strategy across 3 phases ($35–45M budget), Pokémon Presents reveal mechanics, creator tier structure, franchise synergy across TCG/anime/mobile, experiential AR pop-ups in LA/NYC/Tokyo, and brand partnerships with LEGO and Gong Cha. Targets 5–6M Year 1 units and 8–10M MAU by Month 6.',
    slug: 'pokemon-pokopia-gtm',
  },
  {
    title: 'Potion Problems — Game Marketing Campaign',
    category: 'Marketing',
    tags: ['Project Management', 'Marketing Strategy'],
    description: 'Led marketing strategy for USC Advanced Games Project, managing cross-functional collaboration across 8 teams to launch a successful game trailer.',
    slug: 'potion-problems',
  },
  {
    title: 'Fable — Marketing Launch Campaign',
    category: 'Marketing',
    tags: ['Go-to-Market', 'Gaming', 'Experiential Marketing'],
    description: 'Full marketing launch plan for the Fable reboot. Includes positioning statement, three customer personas (Strategist, Immersionist, Escapist), a Renaissance Faire pop-up PR event ("Write Your Fable"), an AR TikTok filter ("Choose Your Fate"), interactive bus stop OOH ("Mirror of Albion"), and brand partnerships with Guinness and Cadbury.',
    slug: 'fable-marketing',
  },
  {
    title: 'The Sims — GTM & Brand Strategy',
    category: 'Marketing',
    tags: ['Go-to-Market', 'Brand Strategy', 'Gaming'],
    description: 'Full go-to-market strategy for The Sims franchise covering transmedia storytelling, the #MySimLife UGC TikTok challenge, a Sims x Love Island brand partnership, and the PLUMBOB Rave PR event — a branded rave where attendees become "Sims IRL" with mood-reactive Plumbob headpieces.',
    slug: 'the-sims-gtm',
  },
  {
    title: 'Netflix — Mood Meter PRD + Lean Canvas',
    category: 'Product Management',
    tags: ['Product Management', 'AI Integration', 'Streaming'],
    description: 'Full group PRD and Lean Canvas for a mood-first content discovery feature on Netflix. Users pick from 8 mood tiles, tune watch length and familiarity, and receive a personalized results page in under 90 seconds. Includes ICE scoring, 10 user stories, phased A/B experiment plan, and SMART success metrics (65% playback conversion, +12% watch time uplift targets).',
    slug: 'netflix-mood-meter',
  },
  {
    title: 'Alongside AI — Kiwi Connect PRD',
    category: 'Product Management',
    tags: ['Product Management', 'AI Integration', 'EdTech'],
    description: 'Full PRD for Kiwi Connect — an anonymous AI-moderated peer chat feature for Alongside. Includes problem framing, success metrics (50% adoption target), 12-month rollout timeline, A/B testing plan, and future expansion roadmap.',
    slug: 'alongside-prd',
  },
  {
    title: 'AI Time Entry System — Concept Prototype',
    category: 'Product Management',
    tags: ['Product Management', 'AI Integration', 'Prototyping'],
    description: 'Interactive prototype for an AI-powered time tracking tool targeting complex users. Features calendar-based auto-suggestions, pattern detection, and a phased rollout roadmap designed to reduce manual entry time by 60%.',
    slug: 'ai-time-entry',
  },
  {
    title: 'Netflix — Film of the Week PRD',
    category: 'Product Management',
    tags: ['Product Management', 'Streaming', 'Content Discovery'],
    description: 'PRD for a curated weekly film spotlight on Netflix targeting decision fatigue. Features a homepage banner, TikTok-style short-form preview, and UGC campaign. Includes A/B test plan and roadmap to expand into Show/Short of the Week.',
    slug: 'netflix-film-of-the-week',
  },
  {
    title: 'Alongside AI — Kiwi Connect Press Release',
    category: 'Marketing',
    tags: ['Marketing', 'Go-to-Market', 'Copywriting'],
    description: 'Launch press release for Kiwi Connect announcing the feature to schools, counselors, and the public. Covers product positioning, availability, pricing, and FAQs.',
    slug: 'kiwi-connect-press-release',
  },
  {
    title: 'Pokémon Team Builder',
    category: 'Product Management',
    tags: ['React', 'Next.js', 'UI/UX'],
    description: 'Full-stack team builder web app supporting multiple competitive formats (VGC, Smogon), with EV spreads, item/nature selection, and preset meta spreads.',
    slug: 'pokemon-team-builder',
  },
  {
    title: 'Sustainability Dashboard — Ringley Group',
    category: 'Product Management',
    tags: ['Product Management', 'Data Analysis'],
    description: 'Product roadmap and strategy for a sustainability dashboard tracking 10,000+ data points to guide net-zero initiatives and property acquisition decisions.',
    slug: 'sustainability-dashboard',
  },
  {
    title: 'APASA Night Market 2024 — Event Planning Lead',
    category: 'Marketing',
    tags: ['Event Planning', 'Community Engagement', 'Program Management'],
    description: 'Led all activities programming for USC\'s largest APIDA cultural event — designing games, coordinating member organization booths, and running a prize ticket system for 500+ attendees at McCarthy Quad.',
    slug: 'apasa-night-market',
  },
  {
    title: 'APASA Community Impact Program',
    category: 'Marketing',
    tags: ['Program Management', 'Community Engagement'],
    description: 'Designed and launched a service initiative requiring 40+ member organizations to conduct community projects across Los Angeles, achieving 60% sustained engagement.',
    slug: 'apasa',
  },
  {
    title: 'Pokemon Stats ML Predictor',
    category: 'Product Management',
    tags: ['Machine Learning', 'Python'],
    description: 'Neural network project to analyze Pokemon statistics and predict legendary status, featuring confusion matrix visualization and interactive prediction.',
    slug: 'pokemon-ml-predictor',
  },
  {
    title: 'Anthropogenic Climate Change Analysis',
    category: 'Product Management',
    tags: ['Python', 'Data Analysis'],
    description: 'Data analysis examining CO2 emissions, urbanization, and global temperature increases using multiple datasets to demonstrate human impact on climate change.',
    slug: 'climate-change-analysis',
  },
];

const categoryColor: Record<string, string> = {
  'Product Management': 'bg-blue-50 text-blue-600 border-blue-200',
  'Marketing': 'bg-purple-50 text-purple-600 border-purple-200',
};

export default function ProjectsBacklog() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <a
            href="/#projects"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back
          </a>
          <span className="text-gray-300">|</span>
          <span className="text-gray-900 font-semibold">All Projects</span>
        </div>
      </nav>

      <section className="pt-32 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-medium">Backlog</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-1">All Projects</h1>
          <p className="text-gray-400 text-sm">{projects.length} entries</p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto divide-y divide-gray-100">
          {projects.map((project, i) => (
            <a
              key={i}
              href={`/projects/${project.slug}`}
              className="py-6 flex gap-6 items-start group no-underline block"
            >
              <span className="text-xs text-gray-300 font-mono mt-1 w-5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-base font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                    {project.title}
                  </h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${categoryColor[project.category]}`}>
                    {project.category}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
