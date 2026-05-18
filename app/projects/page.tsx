const projects = [
  {
    title: 'Potion Problems — Game Marketing Campaign',
    category: 'Product Marketing',
    tags: ['Project Management', 'Marketing Strategy'],
    description: 'Led marketing strategy for USC Advanced Games Project, managing cross-functional collaboration across 8 teams to launch a successful game trailer.',
  },
  {
    title: 'Sustainability Dashboard — Ringley Group',
    category: 'Product Management',
    tags: ['Product Management', 'Data Analysis'],
    description: 'Product roadmap and strategy for a sustainability dashboard tracking 10,000+ data points to guide net-zero initiatives and property acquisition decisions.',
  },
  {
    title: 'APASA Community Impact Program',
    category: 'Product Marketing',
    tags: ['Program Management', 'Community Engagement'],
    description: 'Designed and launched a service initiative requiring 40+ member organizations to conduct community projects across Los Angeles, achieving 60% sustained engagement.',
  },
  {
    title: 'Anthropogenic Climate Change Analysis',
    category: 'Product Management',
    tags: ['Python', 'Data Analysis'],
    description: 'Data analysis examining CO2 emissions, urbanization, and global temperature increases using multiple datasets to demonstrate human impact on climate change.',
  },
  {
    title: 'Pokemon Stats ML Predictor',
    category: 'Product Management',
    tags: ['Machine Learning', 'Python'],
    description: 'Neural network project to analyze Pokemon statistics and predict legendary status, featuring confusion matrix visualization and interactive prediction.',
  },
  {
    title: 'Alongside AI — Kiwi Connect PRD',
    category: 'Product Management',
    tags: ['Product Management', 'AI Integration', 'EdTech'],
    description: 'Full PRD for Kiwi Connect — an anonymous AI-moderated peer chat feature for Alongside. Includes problem framing, success metrics (50% adoption target), 12-month rollout timeline, A/B testing plan, and future expansion roadmap.',
  },
  {
    title: 'Alongside AI — Kiwi Connect Press Release',
    category: 'Product Marketing',
    tags: ['Product Marketing', 'Go-to-Market', 'Copywriting'],
    description: 'Launch press release for Kiwi Connect announcing the feature to schools, counselors, and the public. Covers product positioning, availability, pricing, and FAQs.',
  },
  {
    title: 'Pokémon Team Builder',
    category: 'Product Management',
    tags: ['React', 'Next.js', 'UI/UX'],
    description: 'Full-stack team builder web app supporting multiple competitive formats (VGC, Smogon), with EV spreads, item/nature selection, and preset meta spreads.',
    link: '/pokemonteambuilder',
  },
  {
    title: 'AI Time Entry System — Concept Prototype',
    category: 'Product Management',
    tags: ['Product Management', 'AI Integration', 'Prototyping'],
    description: 'Interactive prototype for an AI-powered time tracking tool targeting complex users. Features calendar-based auto-suggestions, pattern detection, and a phased rollout roadmap designed to reduce manual entry time by 60%.',
    link: '/pwccase',
  },
];

const categoryColor: Record<string, string> = {
  'Product Management': 'bg-blue-50 text-blue-600 border-blue-200',
  'Product Marketing': 'bg-purple-50 text-purple-600 border-purple-200',
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
            <div key={i} className="py-6 flex gap-6 items-start group">
              <span className="text-xs text-gray-300 font-mono mt-1 w-5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  {'link' in project && project.link ? (
                    <a href={project.link} className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors underline-offset-2 hover:underline">
                      {project.title}
                    </a>
                  ) : (
                    <h2 className="text-base font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                      {project.title}
                    </h2>
                  )}
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
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
