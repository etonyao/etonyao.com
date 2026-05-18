const projects = [
  {
    title: 'Potion Problems — Game Marketing Campaign',
    tags: ['Project Management', 'Marketing Strategy'],
    description: 'Led marketing strategy for USC Advanced Games Project, managing cross-functional collaboration across 8 teams to launch a successful game trailer.',
  },
  {
    title: 'APASA Community Impact Program',
    tags: ['Program Management', 'Community Engagement'],
    description: 'Designed and launched a service initiative requiring 40+ member organizations to conduct community projects across Los Angeles, achieving 60% sustained engagement.',
  },
  {
    title: 'Alongside AI — Kiwi Connect Press Release',
    tags: ['Marketing', 'Go-to-Market', 'Copywriting'],
    description: 'Launch press release for Kiwi Connect announcing the feature to schools, counselors, and the public. Covers product positioning, availability, pricing, and FAQs.',
  },
  {
    title: 'The Sims — GTM & Brand Strategy',
    tags: ['Go-to-Market', 'Brand Strategy', 'Gaming'],
    description: 'Full go-to-market strategy for The Sims franchise covering transmedia storytelling, the #MySimLife UGC TikTok challenge, a Sims x Love Island brand partnership, and the PLUMBOB Rave PR event — a branded rave where attendees become "Sims IRL" with mood-reactive Plumbob headpieces.',
  },
  {
    title: 'Fable — Marketing Launch Campaign',
    tags: ['Go-to-Market', 'Gaming', 'Experiential Marketing'],
    description: 'Full marketing launch plan for the Fable reboot. Includes positioning statement, three customer personas (Strategist, Immersionist, Escapist), a Renaissance Faire pop-up PR event ("Write Your Fable"), an AR TikTok filter ("Choose Your Fate"), interactive bus stop OOH ("Mirror of Albion"), and brand partnerships with Guinness and Cadbury.',
  },
  {
    title: 'Pokémon Pokopia — Full GTM Strategy',
    tags: ['Go-to-Market', 'Gaming', 'Brand Strategy'],
    description: 'Comprehensive go-to-market plan for Pokopia, a creature-collecting habitat-restoration RPG targeting casual and cozy gamers ages 7–30. Covers full-funnel paid media strategy across 3 phases ($35–45M budget), Pokémon Presents reveal mechanics, creator tier structure, franchise synergy across TCG/anime/mobile, experiential AR pop-ups in LA/NYC/Tokyo, and brand partnerships with LEGO and Gong Cha. Targets 5–6M Year 1 units and 8–10M MAU by Month 6.',
  },
];

export default function MarketingProjects() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <a
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back
          </a>
          <span className="text-gray-300">|</span>
          <span className="text-gray-900 font-semibold">Marketing Projects</span>
        </div>
      </nav>

      <section className="pt-32 pb-12 px-6 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block mb-4 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold uppercase tracking-wide border border-purple-200">
            Marketing
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Marketing Projects</h1>
          <p className="text-gray-400 text-sm mt-2">{projects.length} projects</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-gray-200 bg-white p-6 flex flex-col gap-3 hover:border-purple-400 hover:shadow-lg transition-all duration-300"
              >
                <h2 className="text-base font-semibold text-gray-900 group-hover:text-purple-600 transition-colors leading-snug">
                  {project.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
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
