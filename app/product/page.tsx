export default function ProductProjects() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav back link */}
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

      {/* Header */}
      <section className="pt-32 pb-12 px-6 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block mb-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wide border border-blue-200">
            Product Management
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">PM Projects</h1>
          <p className="text-xl text-gray-500 max-w-2xl">
            PRDs, roadmaps, feature strategy, and end-to-end product work — coming soon.
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
                className="rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/40 p-8 flex flex-col gap-3 opacity-60"
              >
                <div className="h-4 w-2/3 bg-blue-200 rounded-full" />
                <div className="h-3 w-full bg-blue-100 rounded-full" />
                <div className="h-3 w-4/5 bg-blue-100 rounded-full" />
                <div className="mt-4 flex gap-2">
                  <div className="h-6 w-20 bg-blue-200 rounded-full" />
                  <div className="h-6 w-16 bg-blue-200 rounded-full" />
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
