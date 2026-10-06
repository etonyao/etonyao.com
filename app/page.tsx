'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Bubbles from '@/components/Bubbles';
import CaseDrawer from '@/components/CaseDrawer';
import { projects } from '@/app/data/projects';

const ACCENT = '#1E9E5A';
const WORDS = ['products', 'campaigns', 'brands', 'stories', 'experiences', 'communities'];
const FEATURED_SLUGS = ['headliners', 'pokemon-team-builder', 'potion-problems'];
const featured = projects.filter((p) => FEATURED_SLUGS.includes(p.slug));

const SKILLS = ['Product Management', 'Figma', 'Python', 'AI', 'Data Analysis', 'Airtable', 'Linear', 'Marketing', 'Agile / Scrum'];
const INTERESTS = ['Video Games', 'Sustainability', 'Vibe Coding', 'Cooking', 'Travel', 'Kung Fu', 'Pickleball', 'Karaoke', 'Museums'];

export default function Home() {
  const [wordIdx, setWordIdx] = useState(0);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % WORDS.length), 2100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = glowRef.current;
      if (!el) return;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        if (el) el.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
        rafRef.current = null;
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const openProject = projects.find((p) => p.slug === openSlug) ?? null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        *{box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{margin:0;background:#EFF3EC;color:#16241B;font-family:'Geist','Geist Fallback',system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
        ::selection{background:#1E9E5A;color:#fff;}
        a{color:inherit;text-decoration:none;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}
        @keyframes ovIn{from{opacity:0;}to{opacity:1;}}
        @keyframes drawerIn{from{transform:translateX(50px);opacity:0;}to{transform:translateX(0);opacity:1;}}
        @keyframes blink{0%,49%{opacity:1;}50%,100%{opacity:0;}}
        @keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(30,158,90,0.5);}50%{opacity:0.7;box-shadow:0 0 0 5px rgba(30,158,90,0);}}
        @keyframes bub1{0%{transform:translate(0,0) scale(1) rotate(0deg);}100%{transform:translate(7vw,9vh) scale(1.12) rotate(8deg);}}
        @keyframes bub2{0%{transform:translate(0,0) scale(1.05) rotate(0deg);}100%{transform:translate(-8vw,-7vh) scale(0.9) rotate(-10deg);}}
        @keyframes bub3{0%{transform:translate(0,0) scale(0.95) rotate(0deg);}100%{transform:translate(6vw,-10vh) scale(1.1) rotate(6deg);}}
        @keyframes bub4{0%{transform:translate(0,0) scale(1) rotate(0deg);}100%{transform:translate(-6vw,8vh) scale(1.1) rotate(-7deg);}}
        @keyframes bub5{0%{transform:translate(0,0) scale(1.1) rotate(0deg);}100%{transform:translate(9vw,-5vh) scale(0.92) rotate(12deg);}}
        @keyframes bub6{0%{transform:translate(0,0) scale(0.9) rotate(0deg);}100%{transform:translate(-5vw,-9vh) scale(1.15) rotate(-6deg);}}
        @keyframes bob{0%,100%{transform:translateY(0);}50%{transform:translateY(-14px);}}
        @keyframes ticker{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .project-card{transition:transform 0.3s cubic-bezier(0.22,1,0.36,1),border-color 0.3s,box-shadow 0.3s;}
        .skill-pill{transition:border-color 0.2s,color 0.2s;}
        .skill-pill:hover{border-color:rgba(30,158,90,0.55);color:#16241B;}
      `}</style>

      <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
        <Bubbles />

        {/* Grid overlay */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(22,36,27,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(22,36,27,0.045) 1px,transparent 1px)', backgroundSize: '72px 72px', maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%,#000 30%,transparent 78%)', WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%,#000 30%,transparent 78%)' }} />

        {/* Mouse glow */}
        <div ref={glowRef} style={{ position: 'fixed', top: 0, left: 0, width: 480, height: 480, margin: '-240px 0 0 -240px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(30,158,90,0.13),transparent 60%)', pointerEvents: 'none', zIndex: 1, willChange: 'transform' }} />

        <div style={{ position: 'relative', zIndex: 2 }}>

          {/* Nav */}
          <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center', background: 'rgba(239,243,236,0.72)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(22,36,27,0.08)' }}>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 5vw' }}>
              <a href="#top" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 600, fontSize: 17, letterSpacing: '-0.3px' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: ACCENT, boxShadow: `0 0 12px ${ACCENT}`, display: 'inline-block' }} />
                Eton Yao
              </a>
              <nav style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
                <a href="#about" style={{ fontSize: 14, color: '#5E6E63' }}>About</a>
                <a href="#work" style={{ fontSize: 14, color: '#5E6E63' }}>Work</a>
                <Link href="/projects" style={{ fontSize: 14, color: '#5E6E63' }}>Projects</Link>
                <a href="#contact" style={{ fontSize: 14, color: '#5E6E63' }}>Contact</a>
              </nav>
            </div>
          </header>

          {/* Hero */}
          <section id="top" style={{ padding: '20vh 5vw 13vh', animation: 'fadeUp 0.6s ease both' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(36px,6vw,80px)', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div style={{ flex: '1 1 460px', minWidth: 300 }}>
                <h1 style={{ fontWeight: 600, fontSize: 'clamp(56px,9.5vw,138px)', lineHeight: 0.92, letterSpacing: '-0.04em', margin: 0 }}>
                  Eton Yao
                </h1>
                <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 14, marginTop: 24, fontSize: 'clamp(22px,3.4vw,38px)', fontWeight: 500 }}>
                  <span style={{ color: '#5E6E63' }}>I build</span>
                  <span style={{ fontWeight: 600, background: 'linear-gradient(100deg,#1E9E5A,#0E9488 55%,#5B9A2E)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                    {WORDS[wordIdx]}
                  </span>
                  <span style={{ display: 'inline-block', width: 3, height: '0.95em', background: ACCENT, transform: 'translateY(3px)', animation: 'blink 1.1s step-end infinite' }} />
                </div>
                <p style={{ maxWidth: 540, fontSize: 18, lineHeight: 1.65, color: '#5E6E63', margin: '30px 0 0' }}>
                  A dual-degree student at USC — <strong style={{ color: '#16241B', fontWeight: 500 }}>Business Administration</strong> and a <strong style={{ color: '#16241B', fontWeight: 500 }}>Master of International Trade Law &amp; Economics</strong> — working where product meets marketing.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 38 }}>
                  <a href="#work" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: ACCENT, color: '#fff', fontWeight: 600, fontSize: 15, padding: '15px 26px', borderRadius: 10, boxShadow: `0 10px 28px -10px ${ACCENT}` }}>
                    View work <span>→</span>
                  </a>
                  <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontWeight: 500, fontSize: 15, padding: '15px 26px', borderRadius: 10, border: '1px solid rgba(22,36,27,0.16)', background: 'rgba(255,255,255,0.5)' }}>
                    Get in touch
                  </a>
                </div>
              </div>

              {/* Status card */}
              <div style={{ flex: '0 1 320px', minWidth: 260, background: 'rgba(255,255,255,0.62)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(22,36,27,0.1)', borderRadius: 18, padding: 24, boxShadow: '0 18px 40px -28px rgba(22,36,27,0.5)' }}>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A988D', margin: '0 0 18px' }}>// Currently</p>
                {[['Location', 'Los Angeles, CA'], ['Focus', 'Product · Marketing'], ['Graduating', 'USC \'27']].map(([label, value], i, arr) => (
                  <div key={label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', padding: '8px 0' }}>
                      <span style={{ fontSize: 14, color: '#5E6E63' }}>{label}</span>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{value}</span>
                    </div>
                    {i < arr.length - 1 && <div style={{ height: 1, background: 'rgba(22,36,27,0.08)' }} />}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About */}
          <section id="about" style={{ padding: '7vh 5vw', borderTop: '1px solid rgba(22,36,27,0.09)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.85fr) minmax(0,1.4fr)', gap: 'clamp(32px,6vw,90px)', alignItems: 'start' }}>
              <div style={{ position: 'sticky', top: 96 }}>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A988D', margin: '0 0 18px' }}>(01) — About</p>
                <h2 style={{ fontWeight: 600, fontSize: 'clamp(30px,4vw,48px)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: 0 }}>So, what's my deal?</h2>
              </div>
              <div>
                <p style={{ fontSize: 20, lineHeight: 1.6, color: '#3C4A41', margin: '0 0 18px' }}>
                  I'm pursuing <strong style={{ color: '#16241B', fontWeight: 500 }}>two degrees at once</strong> at USC — a B.S. in Business Administration and a Master of International Trade Law &amp; Economics (MITLE), class of '27 — living at the intersection of product, marketing and technology.
                </p>
                <p style={{ fontSize: 18, lineHeight: 1.65, color: '#5E6E63', margin: '0 0 40px' }}>
                  I like making things that matter: reaching 5M+ monthly views at Clouted, shaping sustainability roadmaps in London, and leading community programs for thousands of students across LA. Otherwise, I am probably watching youtube videos, playing video games, or pickleballing.
                </p>

                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A988D', margin: '0 0 16px' }}>Skills &amp; tools</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
                  {SKILLS.map((s) => (
                    <span key={s} className="skill-pill" style={{ fontSize: 14, padding: '9px 15px', border: '1px solid rgba(22,36,27,0.12)', borderRadius: 999, background: 'rgba(255,255,255,0.5)', color: '#3C4A41', cursor: 'default' }}>{s}</span>
                  ))}
                </div>

                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A988D', margin: '0 0 16px' }}>Off the clock</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {INTERESTS.map((h) => (
                    <span key={h} style={{ fontSize: 14, padding: '9px 15px', borderRadius: 999, background: 'rgba(22,36,27,0.05)', color: '#5E6E63' }}>{h}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Work */}
          <section id="work" style={{ padding: '7vh 5vw 9vh', borderTop: '1px solid rgba(22,36,27,0.09)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 44 }}>
              <div>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A988D', margin: '0 0 16px' }}>(02) — Selected work</p>
                <h2 style={{ fontWeight: 600, fontSize: 'clamp(30px,4vw,48px)', lineHeight: 1.02, letterSpacing: '-0.03em', margin: 0 }}>Highlighted work.</h2>
              </div>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: '#8A988D', margin: 0 }}>A FEW FAVORITES →</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {featured.map((p, i) => (
                <div
                  key={p.slug}
                  className="project-card"
                  style={{
                    display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 24,
                    padding: '28px 32px', borderRadius: 18,
                    background: 'rgba(255,255,255,0.62)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                    border: '1px solid rgba(22,36,27,0.1)', boxShadow: '0 14px 34px -26px rgba(22,36,27,0.5)',
                    position: 'relative', overflow: 'hidden',
                    transition: 'border-color 0.22s, box-shadow 0.22s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = p.color;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 18px 42px -22px ${p.color}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(22,36,27,0.1)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 34px -26px rgba(22,36,27,0.5)';
                  }}
                >
                  <div style={{ position: 'absolute', top: '-60%', right: '-10%', width: '40%', height: '200%', borderRadius: '50%', background: `radial-gradient(circle,${p.color},transparent 65%)`, opacity: 0.1, filter: 'blur(24px)', pointerEvents: 'none' }} />

                  {/* Left: description */}
                  <div style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: p.color }}>{String(i + 1).padStart(2, '0')}</span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', color: '#5E6E63', border: '1px solid rgba(22,36,27,0.16)', borderRadius: 999, padding: '4px 10px' }}>{p.type}</span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', color: '#8A988D' }}>{p.role}</span>
                    </div>
                    <h3 style={{ fontWeight: 600, fontSize: 'clamp(20px,2.2vw,26px)', lineHeight: 1.06, letterSpacing: '-0.02em', margin: '0 0 8px', color: '#16241B' }}>{p.title}</h3>
                    <p style={{ fontSize: 15, lineHeight: 1.55, color: '#5E6E63', margin: 0, maxWidth: 640 }}>{p.overview}</p>
                  </div>

                  {/* Right: buttons */}
                  <div style={{ position: 'relative', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'stretch' }}>
                    {p.link && (
                      <a
                        href={p.link}
                        target={p.link.startsWith('http') ? '_blank' : undefined}
                        rel={p.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                          background: p.color, color: '#fff',
                          fontWeight: 600, fontSize: 14, padding: '13px 22px',
                          borderRadius: 10, boxShadow: `0 8px 22px -8px ${p.color}`,
                          whiteSpace: 'nowrap', textDecoration: 'none',
                        }}
                      >
                        View project <span>↗</span>
                      </a>
                    )}
                    <Link
                      href={`/projects/${p.slug}`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                        background: 'rgba(255,255,255,0.7)', color: '#3C4A41',
                        fontWeight: 500, fontSize: 14, padding: '13px 22px',
                        borderRadius: 10, border: '1px solid rgba(22,36,27,0.14)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Case study
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/projects"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 11, marginTop: 38,
                background: 'rgba(255,255,255,0.62)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(22,36,27,0.12)', boxShadow: '0 14px 34px -26px rgba(22,36,27,0.5)',
                color: '#16241B', fontWeight: 600, fontSize: 16, padding: '17px 30px', borderRadius: 12,
                transition: 'transform 0.25s,border-color 0.25s,box-shadow 0.25s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLElement).style.borderColor = ACCENT;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 22px 46px -22px ${ACCENT}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = '';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(22,36,27,0.12)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 34px -26px rgba(22,36,27,0.5)';
              }}
            >
              Explore all projects <span style={{ color: ACCENT, fontSize: 18 }}>→</span>
            </Link>
          </section>

          {/* Contact / Footer */}
          <footer id="contact" style={{ padding: '9vh 5vw 7vh', borderTop: '1px solid rgba(22,36,27,0.09)' }}>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A988D', margin: '0 0 22px' }}>(03) — Contact</p>
            <h2 style={{ fontWeight: 600, fontSize: 'clamp(44px,9vw,128px)', lineHeight: 0.92, letterSpacing: '-0.04em', margin: '0 0 34px' }}>Let's talk.</h2>
            <p style={{ maxWidth: 520, fontSize: 18, lineHeight: 1.6, color: '#5E6E63', margin: '0 0 36px' }}>
              Always open to new opportunities and interesting problems — especially in product and marketing. Reach out.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <a href="mailto:eayao@usc.edu" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: ACCENT, color: '#fff', fontWeight: 600, fontSize: 16, padding: '16px 28px', borderRadius: 10, boxShadow: `0 10px 28px -10px ${ACCENT}` }}>
                Email me <span>↗</span>
              </a>
              <a href="https://www.linkedin.com/in/eton-yao/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid rgba(22,36,27,0.16)', background: 'rgba(255,255,255,0.5)', color: '#16241B', fontWeight: 500, fontSize: 16, padding: '16px 28px', borderRadius: 10 }}>
                LinkedIn <span>↗</span>
              </a>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 14, marginTop: '9vh', paddingTop: 26, borderTop: '1px solid rgba(22,36,27,0.09)', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: '#8A988D' }}>
              <span>© 2026 Eton Yao</span>
              <span>USC '27 · Los Angeles</span>
            </div>
          </footer>

        </div>
      </div>

      {openProject && <CaseDrawer project={openProject} onClose={() => setOpenSlug(null)} />}
    </>
  );
}
