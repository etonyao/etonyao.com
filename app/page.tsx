export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Eton Yao</h1>
            <div className="flex gap-6">
              <a href="#about" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">About</a>
              <a href="#projects" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Projects</a>
              <a href="#contact" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              Hi, I'm Eton Yao
            </h2>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8">
              I'm a student passionate about building innovative web applications and learning new technologies.
            </p>
            <div className="flex gap-4">
              <a
                href="#contact"
                className="px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors font-medium"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors font-medium"
              >
                View Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">About Me</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
                I'm a student passionate about web development and software engineering, constantly learning and building projects with modern technologies.
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
                I enjoy creating innovative solutions and exploring new frameworks, with a focus on delivering quality user experiences.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {['Product Management', 'Python', 'Data Analysis', 'Machine Learning', 'React', 'Next.js', 'TypeScript', 'Project Management', 'UX Strategy', 'AI Integration'].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg border border-zinc-200 dark:border-zinc-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">Featured Projects</h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-12">A collection of my recent work showcasing various skills and technologies</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1: Potion Problems */}
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Potion Problems - Game Marketing Campaign</h4>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Led marketing strategy for USC Advanced Games Project, managing cross-functional collaboration across 8 teams including engineering and design to launch a successful game trailer.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded">Project Management</span>
                <span className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded">Marketing Strategy</span>
              </div>
            </div>

            {/* Project 2: Sustainability Dashboard */}
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Sustainability Dashboard - Ringley Group</h4>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Product roadmap and strategy for a comprehensive sustainability dashboard tracking 10,000+ data points to guide net-zero initiatives and property acquisition decisions.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded">Product Management</span>
                <span className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded">Data Analysis</span>
              </div>
            </div>

            {/* Project 3: APASA Community Impact */}
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">APASA Community Impact Program</h4>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Designed and launched a service initiative requiring 40+ member organizations to conduct community projects across Los Angeles, achieving 60% sustained engagement rate.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded">Program Management</span>
                <span className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded">Community Engagement</span>
              </div>
            </div>

            {/* Project 4: Climate Change Analysis */}
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Anthropogenic Climate Change Analysis</h4>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Data analysis project examining the relationship between CO2 emissions, urbanization, and global temperature increases using multiple datasets to demonstrate human impact on climate change.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded">Python</span>
                <span className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded">Data Analysis</span>
              </div>
            </div>

            {/* Project 5: Pokemon ML Predictor */}
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Pokemon Stats ML Predictor</h4>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Machine learning project using neural networks to analyze Pokemon statistics and predict legendary status, featuring confusion matrix visualization and interactive prediction capabilities.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded">Machine Learning</span>
                <span className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded">Python</span>
              </div>
            </div>

            {/* Project 6: Alongside AI */}
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Alongside AI - Peer Chat Feature PRD</h4>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Product strategy for an AI-moderated anonymous peer-to-peer chat feature, enabling students to practice interpersonal skills while receiving mental health support from Kiwi AI assistant.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded">Product Management</span>
                <span className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded">AI Integration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Get In Touch</h3>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
            I'm always open to new opportunities and interesting projects. Feel free to reach out!
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="mailto:etonyao@gmail.com"
              className="px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors font-medium"
            >
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/eton-yao/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg hover:bg-white dark:hover:bg-zinc-800 transition-colors font-medium"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto text-center text-zinc-600 dark:text-zinc-400">
          <p>&copy; {new Date().getFullYear()} Eton Yao. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
