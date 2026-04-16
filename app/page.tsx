'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleProjectHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleProjectLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Interactive Mouse Spotlight Effect */}
      <div
        className="fixed pointer-events-none z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
          inset: 0,
        }}
      />
      <div
        className="fixed pointer-events-none z-30"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.1), transparent 40%)`,
          inset: 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-slate-950/50 backdrop-blur-md border-b border-white/10 z-40">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Eton Yao
              </h1>
              <div className="flex gap-6">
                <a href="#about" className="text-slate-300 hover:text-blue-400 transition-colors">About</a>
                <a href="#projects" className="text-slate-300 hover:text-blue-400 transition-colors">Projects</a>
                <a href="#contact" className="text-slate-300 hover:text-blue-400 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 min-h-screen flex items-center">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              <div className="mb-6 overflow-hidden">
                <h2 className="text-6xl md:text-8xl font-bold text-white mb-2 animate-fade-in">
                  Hi, I'm
                </h2>
                <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  Eton Yao
                </h2>
              </div>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                I'm a student passionate about building innovative web applications and learning new technologies.
              </p>
              <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <a
                  href="#contact"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  <span className="relative z-10">Get in Touch</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
                <a
                  href="#projects"
                  className="px-8 py-4 border-2 border-blue-400/50 text-blue-400 rounded-lg font-medium hover:bg-blue-400/10 hover:border-blue-400 transition-all duration-300 hover:scale-105"
                >
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 bg-slate-900/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-lg text-slate-300 mb-4 leading-relaxed">
                  I'm a student passionate about web development and software engineering, constantly learning and building projects with modern technologies.
                </p>
                <p className="text-lg text-slate-300 mb-4 leading-relaxed">
                  I enjoy creating innovative solutions and exploring new frameworks, with a focus on delivering quality user experiences.
                </p>
              </div>
              <div>
                <h4 className="text-2xl font-semibold text-white mb-6">Skills</h4>
                <div className="flex flex-wrap gap-3">
                  {['Product Management', 'Python', 'Data Analysis', 'Machine Learning', 'React', 'Next.js', 'TypeScript', 'Project Management', 'UX Strategy', 'AI Integration'].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm text-blue-300 rounded-lg border border-blue-400/30 hover:border-blue-400 hover:bg-slate-700/50 transition-all duration-300 cursor-default hover:scale-105"
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
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </h3>
            <p className="text-slate-400 mb-12 text-lg">A collection of my recent work showcasing various skills and technologies</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project 1 */}
              <div
                onMouseMove={handleProjectHover}
                onMouseLeave={handleProjectLeave}
                className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative z-10">
                  <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    Potion Problems - Game Marketing Campaign
                  </h4>
                  <p className="text-slate-400 mb-4 leading-relaxed">
                    Led marketing strategy for USC Advanced Games Project, managing cross-functional collaboration across 8 teams including engineering and design to launch a successful game trailer.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">Project Management</span>
                    <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">Marketing Strategy</span>
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div
                onMouseMove={handleProjectHover}
                onMouseLeave={handleProjectLeave}
                className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative z-10">
                  <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    Sustainability Dashboard - Ringley Group
                  </h4>
                  <p className="text-slate-400 mb-4 leading-relaxed">
                    Product roadmap and strategy for a comprehensive sustainability dashboard tracking 10,000+ data points to guide net-zero initiatives and property acquisition decisions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">Product Management</span>
                    <span className="text-xs px-3 py-1 bg-green-500/20 text-green-300 rounded-full border border-green-500/30">Data Analysis</span>
                  </div>
                </div>
              </div>

              {/* Project 3 */}
              <div
                onMouseMove={handleProjectHover}
                onMouseLeave={handleProjectLeave}
                className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative z-10">
                  <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    APASA Community Impact Program
                  </h4>
                  <p className="text-slate-400 mb-4 leading-relaxed">
                    Designed and launched a service initiative requiring 40+ member organizations to conduct community projects across Los Angeles, achieving 60% sustained engagement rate.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full border border-pink-500/30">Program Management</span>
                    <span className="text-xs px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30">Community Engagement</span>
                  </div>
                </div>
              </div>

              {/* Project 4 */}
              <div
                onMouseMove={handleProjectHover}
                onMouseLeave={handleProjectLeave}
                className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative z-10">
                  <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    Anthropogenic Climate Change Analysis
                  </h4>
                  <p className="text-slate-400 mb-4 leading-relaxed">
                    Data analysis project examining the relationship between CO2 emissions, urbanization, and global temperature increases using multiple datasets to demonstrate human impact on climate change.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-500/30">Python</span>
                    <span className="text-xs px-3 py-1 bg-green-500/20 text-green-300 rounded-full border border-green-500/30">Data Analysis</span>
                  </div>
                </div>
              </div>

              {/* Project 5 */}
              <div
                onMouseMove={handleProjectHover}
                onMouseLeave={handleProjectLeave}
                className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative z-10">
                  <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    Pokemon Stats ML Predictor
                  </h4>
                  <p className="text-slate-400 mb-4 leading-relaxed">
                    Machine learning project using neural networks to analyze Pokemon statistics and predict legendary status, featuring confusion matrix visualization and interactive prediction capabilities.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">Machine Learning</span>
                    <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">Python</span>
                  </div>
                </div>
              </div>

              {/* Project 6 */}
              <div
                onMouseMove={handleProjectHover}
                onMouseLeave={handleProjectLeave}
                className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative z-10">
                  <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    Alongside AI - Peer Chat Feature PRD
                  </h4>
                  <p className="text-slate-400 mb-4 leading-relaxed">
                    Product strategy for an AI-moderated anonymous peer-to-peer chat feature, enabling students to practice interpersonal skills while receiving mental health support from Kiwi AI assistant.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">Product Management</span>
                    <span className="text-xs px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">AI Integration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-slate-900/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Get In Touch
            </h3>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              I'm always open to new opportunities and interesting projects. Feel free to reach out!
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="mailto:etonyao@gmail.com"
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
              >
                <span className="relative z-10">Email Me</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              <a
                href="https://www.linkedin.com/in/eton-yao/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-blue-400/50 text-blue-400 rounded-lg font-medium hover:bg-blue-400/10 hover:border-blue-400 transition-all duration-300 hover:scale-105"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} Eton Yao. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
