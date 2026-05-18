export default function MarketingProjects() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav back link */}
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

      {/* Header */}
      <section className="pt-32 pb-12 px-6 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block mb-4 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold uppercase tracking-wide border border-purple-200">
            Marketing
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Marketing Projects</h1>
          <p className="text-xl text-gray-500 max-w-2xl">
            Go-to-market strategy, campaigns, and brand storytelling — coming soon.
          </p>
        </div>
      </section>

      {/* Placeholder grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/40 p-8 flex flex-col gap-3 opacity-60"
              >
                <div className="h-4 w-2/3 bg-purple-200 rounded-full" />
                <div className="h-3 w-full bg-purple-100 rounded-full" />
                <div className="h-3 w-4/5 bg-purple-100 rounded-full" />
                <div className="mt-4 flex gap-2">
                  <div className="h-6 w-20 bg-purple-200 rounded-full" />
                  <div className="h-6 w-16 bg-purple-200 rounded-full" />
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-12 text-sm">Projects coming soon</p>
        </div>
      </section>
    </div>
  );
}
