const projects = [
  {
    title: 'Sustainability Dashboard — Ringley Group',
    tags: ['Product Management', 'Data Analysis'],
    description: 'Product roadmap and strategy for a sustainability dashboard tracking 10,000+ data points to guide net-zero initiatives and property acquisition decisions.',
  },
  {
    title: 'Anthropogenic Climate Change Analysis',
    tags: ['Python', 'Data Analysis'],
    description: 'Data analysis examining CO2 emissions, urbanization, and global temperature increases using multiple datasets to demonstrate human impact on climate change.',
  },
  {
    title: 'Pokemon Stats ML Predictor',
    tags: ['Machine Learning', 'Python'],
    description: 'Neural network project to analyze Pokemon statistics and predict legendary status, featuring confusion matrix visualization and interactive prediction.',
  },
  {
    title: 'Alongside AI — Kiwi Connect PRD',
    tags: ['Product Management', 'AI Integration', 'EdTech'],
    description: 'Full PRD for Kiwi Connect — an anonymous AI-moderated peer chat feature for Alongside. Includes problem framing, success metrics (50% adoption target), 12-month rollout timeline, A/B testing plan, and future expansion roadmap.',
  },
  {
    title: 'Pokémon Team Builder',
    tags: ['React', 'Next.js', 'UI/UX'],
    description: 'Full-stack team builder web app supporting multiple competitive formats (VGC, Smogon), with EV spreads, item/nature selection, and preset meta spreads.',
    link: '/pokemonteambuilder',
  },
  {
    title: 'AI Time Entry System — Concept Prototype',
    tags: ['Product Management', 'AI Integration', 'Prototyping'],
    description: 'Interactive prototype for an AI-powered time tracking tool targeting complex users. Features calendar-based auto-suggestions, pattern detection, and a phased rollout roadmap designed to reduce manual entry time by 60%.',
    link: '/pwccase',
  },
  {
    title: 'Netflix — Film of the Week PRD',
    tags: ['Product Management', 'Streaming', 'Content Discovery'],
    description: 'PRD for a curated weekly film spotlight on Netflix targeting decision fatigue. Features a homepage banner, TikTok-style short-form preview, and UGC campaign. Includes A/B test plan and roadmap to expand into Show/Short of the Week.',
  },
  {
    title: 'Netflix — Mood Meter PRD + Lean Canvas',
    tags: ['Product Management', 'AI Integration', 'Streaming'],
    description: 'Full group PRD and Lean Canvas for a mood-first content discovery feature on Netflix. Users pick from 8 mood tiles, tune watch length and familiarity, and receive a personalized results page in under 90 seconds. Includes ICE scoring, 10 user stories, phased A/B experiment plan, and SMART success metrics (65% playback conversion, +12% watch time uplift targets).',
  },
];

export default function ProductProjects() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <a
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back
          </a>
          <span className="text-gray-300">|</span>
          <span className="text-gray-900 font-semibold">Product Management Projects</span>
        </div>
      </nav>

      <section className="pt-32 pb-12 px-6 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block mb-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wide border border-blue-200">
            Product Management
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">PM Projects</h1>
          <p className="text-gray-400 text-sm mt-2">{projects.length} projects</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-gray-200 bg-white p-6 flex flex-col gap-3 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
              >
                <h2 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {'link' in project && project.link ? (
                    <a href={project.link} className="hover:underline underline-offset-2">{project.title}</a>
                  ) : project.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
