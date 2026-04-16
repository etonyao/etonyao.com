'use client';

import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInHero, setIsMouseInHero] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const roles = [
    'Product Manager',
    'Marketing Strategist',
    'USC Student',
    'Video Game Enthusiast'
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        setIsMouseInHero(isInside);

        if (isInside) {
          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typing effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentRole.length) {
          setTypedText(currentRole.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentRole.slice(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex, roles]);

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
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle Background Accents */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 z-40 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {/* Animated Logo */}
                <div className="relative w-12 h-12 group cursor-pointer">
                  {/* Rotating rings */}
                  <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-600 border-r-blue-500"></div>
                  </div>
                  <div className="absolute inset-1 animate-spin-reverse">
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-b-blue-500 border-l-blue-400"></div>
                  </div>

                  {/* Logo container */}
                  <div className="relative w-12 h-12 rounded-full bg-white flex items-center justify-center border border-blue-200 group-hover:border-blue-400 transition-all duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-md">
                    {/* Glowing background */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300"></div>

                    {/* Abstract EY symbol */}
                    <svg className="w-7 h-7 relative z-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* E shape - three horizontal bars */}
                      <path
                        d="M12 10 L20 10 M12 20 L18 20 M12 30 L20 30"
                        stroke="url(#logo-grad-light)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="group-hover:stroke-[3.5] transition-all duration-300"
                      />
                      {/* Y shape - diagonal lines meeting */}
                      <path
                        d="M22 10 L28 18 M34 10 L28 18 L28 30"
                        stroke="url(#logo-grad-light)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:stroke-[3.5] transition-all duration-300"
                      />
                      {/* Accent dot */}
                      <circle
                        cx="28"
                        cy="20"
                        r="2"
                        fill="url(#logo-grad-light)"
                        className="group-hover:animate-pulse"
                      />
                      <defs>
                        <linearGradient id="logo-grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#2563eb">
                            <animate attributeName="stop-color" values="#2563eb; #0ea5e9; #3b82f6; #2563eb" dur="4s" repeatCount="indefinite" />
                          </stop>
                          <stop offset="100%" stopColor="#0ea5e9">
                            <animate attributeName="stop-color" values="#0ea5e9; #3b82f6; #2563eb; #0ea5e9" dur="4s" repeatCount="indefinite" />
                          </stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <h1 className="text-xl font-bold text-gray-900">
                  Eton Yao
                </h1>
              </div>
              <div className="flex gap-8">
                <a href="#about" className="text-gray-600 hover:text-blue-600 transition-all duration-300 relative group font-medium">
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#projects" className="text-gray-600 hover:text-blue-600 transition-all duration-300 relative group font-medium">
                  Projects
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-all duration-300 relative group font-medium">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section ref={heroRef} className="pt-32 pb-20 px-6 min-h-screen flex items-center relative overflow-hidden">
          {/* Interactive Mouse Spotlight Effect - Hero Only */}
          {isMouseInHero && (
            <>
              <div
                className="absolute pointer-events-none z-20 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
                  inset: 0,
                }}
              />
              <div
                className="absolute pointer-events-none z-20"
                style={{
                  background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.1), transparent 40%)`,
                  inset: 0,
                }}
              />
            </>
          )}
          <div className="max-w-6xl mx-auto relative z-30">
            <div className="max-w-3xl">
              {/* Badges */}
              <div className="flex gap-3 mb-6 animate-fade-in">
                <span className="px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-sm font-medium">
                  USC '27
                </span>
                <span className="px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-sm font-medium">
                  Open to Opportunities
                </span>
              </div>

              <div className="mb-6 overflow-hidden">
                <h2 className="text-6xl md:text-8xl font-bold text-gray-900 mb-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  Hi, I'm
                </h2>
                <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Eton Yao
                </h2>
              </div>

              {/* Typing animation */}
              <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <p className="text-xl md:text-2xl text-gray-600 mb-2">
                  <span className="text-gray-500">I'm a </span>
                  <span className="text-blue-600 font-semibold">
                    {typedText}
                    <span className="animate-pulse">|</span>
                  </span>
                </p>
                <p className="text-lg md:text-xl text-gray-700">
                  Business Administration @ USC | Product Management & Marketing Intern
                </p>
              </div>

              <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <a
                  href="#contact"
                  className="group px-8 py-4 bg-blue-600 text-white rounded-lg font-medium relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/30 hover:bg-blue-700"
                >
                  <span className="relative z-10">Get in Touch</span>
                </a>
                <a
                  href="#projects"
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 hover:scale-105"
                >
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
              About Me
            </h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  I'm a Business Administration student at USC (expected graduation May 2027), pursuing a Master of International Trade Law and Economics (MITLE). My passion lies at the intersection of product management, marketing, and technology.
                </p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Currently a Marketing Intern at <span className="text-blue-600 font-semibold">Clouted (a16z speedrun 003)</span>, where I drive social media campaigns reaching over 5M+ monthly views. Previously, I worked as a Product Management Intern at <span className="text-blue-600 font-semibold">Ringley Group</span> in London, defining roadmaps for sustainability dashboards tracking 10,000+ data points.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  I love building products that make a difference, from leading marketing for USC's Advanced Games Project to designing community programs that engage 5,000+ students across LA.
                </p>
              </div>
              <div>
                <h4 className="text-2xl font-semibold text-gray-900 mb-6">Skills & Tools</h4>
                <div className="flex flex-wrap gap-3">
                  {['Product Management', 'Figma', 'Python', 'AI', 'Data Analysis', 'Airtable', 'Linear', 'Microsoft Office', 'Marketing', 'Agile/Scrum'].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white text-blue-700 rounded-lg border border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-default hover:scale-105 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <h4 className="text-2xl font-semibold text-gray-900 mb-6 mt-8">Interests</h4>
                <div className="flex flex-wrap gap-3">
                  {['Video Games', 'Sustainability', 'Vibe Coding', 'Cooking', 'Travel', 'Kung Fu', 'Pickleball', 'Karaoke', 'Museums'].map((interest) => (
                    <span
                      key={interest}
                      className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 cursor-default hover:scale-105 shadow-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h3>
            <p className="text-gray-600 mb-12 text-lg">A collection of my recent work showcasing various skills and technologies</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project 1 */}
              <div
                onMouseMove={handleProjectHover}
                onMouseLeave={handleProjectLeave}
                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer shadow-sm"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative z-10">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    Potion Problems - Game Marketing Campaign
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Led marketing strategy for USC Advanced Games Project, managing cross-functional collaboration across 8 teams including engineering and design to launch a successful game trailer.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">Project Management</span>
                    <span className="text-xs px-3 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-200">Marketing Strategy</span>
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div
                onMouseMove={handleProjectHover}
                onMouseLeave={handleProjectLeave}
                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer shadow-sm"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative z-10">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    Sustainability Dashboard - Ringley Group
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Product roadmap and strategy for a comprehensive sustainability dashboard tracking 10,000+ data points to guide net-zero initiatives and property acquisition decisions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full border border-cyan-200">Product Management</span>
                    <span className="text-xs px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">Data Analysis</span>
                  </div>
                </div>
              </div>

              {/* Project 3 */}
              <div
                onMouseMove={handleProjectHover}
                onMouseLeave={handleProjectLeave}
                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer shadow-sm"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative z-10">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    APASA Community Impact Program
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Designed and launched a service initiative requiring 40+ member organizations to conduct community projects across Los Angeles, achieving 60% sustained engagement rate.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 bg-pink-50 text-pink-700 rounded-full border border-pink-200">Program Management</span>
                    <span className="text-xs px-3 py-1 bg-orange-50 text-orange-700 rounded-full border border-orange-200">Community Engagement</span>
                  </div>
                </div>
              </div>

              {/* Project 4 */}
              <div
                onMouseMove={handleProjectHover}
                onMouseLeave={handleProjectLeave}
                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer shadow-sm"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative z-10">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    Anthropogenic Climate Change Analysis
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Data analysis project examining the relationship between CO2 emissions, urbanization, and global temperature increases using multiple datasets to demonstrate human impact on climate change.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full border border-yellow-200">Python</span>
                    <span className="text-xs px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">Data Analysis</span>
                  </div>
                </div>
              </div>

              {/* Project 5 */}
              <div
                onMouseMove={handleProjectHover}
                onMouseLeave={handleProjectLeave}
                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer shadow-sm"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative z-10">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    Pokemon Stats ML Predictor
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Machine learning project using neural networks to analyze Pokemon statistics and predict legendary status, featuring confusion matrix visualization and interactive prediction capabilities.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-200">Machine Learning</span>
                    <span className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">Python</span>
                  </div>
                </div>
              </div>

              {/* Project 6 */}
              <div
                onMouseMove={handleProjectHover}
                onMouseLeave={handleProjectLeave}
                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer shadow-sm"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative z-10">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    Alongside AI - Peer Chat Feature PRD
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Product strategy for an AI-moderated anonymous peer-to-peer chat feature, enabling students to practice interpersonal skills while receiving mental health support from Kiwi AI assistant.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full border border-cyan-200">Product Management</span>
                    <span className="text-xs px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">AI Integration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get In Touch
            </h3>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              I'm always open to new opportunities and interesting projects. Feel free to reach out!
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="mailto:etonyao@gmail.com"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/30 hover:bg-blue-700"
              >
                Email Me
              </a>
              <a
                href="https://www.linkedin.com/in/eton-yao/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300 hover:scale-105"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto text-center text-gray-600">
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

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-spin-reverse {
          animation: spin-reverse 6s linear infinite;
        }
      `}</style>
    </div>
  );
}
