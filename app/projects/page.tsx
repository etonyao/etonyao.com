'use client';

import { useState } from 'react';
import Link from 'next/link';
import Bubbles from '@/components/Bubbles';
import CaseDrawer from '@/components/CaseDrawer';
import { projects } from '@/app/data/projects';

const ACCENT = '#1E9E5A';

export default function ProjectsPage() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
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
        @keyframes bub1{0%{transform:translate(0,0) scale(1) rotate(0deg);}100%{transform:translate(7vw,9vh) scale(1.12) rotate(8deg);}}
        @keyframes bub2{0%{transform:translate(0,0) scale(1.05) rotate(0deg);}100%{transform:translate(-8vw,-7vh) scale(0.9) rotate(-10deg);}}
        @keyframes bub3{0%{transform:translate(0,0) scale(0.95) rotate(0deg);}100%{transform:translate(6vw,-10vh) scale(1.1) rotate(6deg);}}
        @keyframes bub4{0%{transform:translate(0,0) scale(1) rotate(0deg);}100%{transform:translate(-6vw,8vh) scale(1.1) rotate(-7deg);}}
        @keyframes bub5{0%{transform:translate(0,0) scale(1.1) rotate(0deg);}100%{transform:translate(9vw,-5vh) scale(0.92) rotate(12deg);}}
        @keyframes bub6{0%{transform:translate(0,0) scale(0.9) rotate(0deg);}100%{transform:translate(-5vw,-9vh) scale(1.15) rotate(-6deg);}}
        @keyframes bob{0%,100%{transform:translateY(0);}50%{transform:translateY(-14px);}}
        .project-card{transition:transform 0.3s cubic-bezier(0.22,1,0.36,1),border-color 0.3s,box-shadow 0.3s;}
      `}</style>

      <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
        <Bubbles />
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(22,36,27,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(22,36,27,0.045) 1px,transparent 1px)', backgroundSize: '72px 72px', maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%,#000 30%,transparent 78%)', WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%,#000 30%,transparent 78%)' }} />

        <div style={{ position: 'relative', zIndex: 2 }}>

          {/* Nav */}
          <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center', background: 'rgba(239,243,236,0.72)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(22,36,27,0.08)' }}>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 5vw' }}>
              <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 600, fontSize: 17, letterSpacing: '-0.3px' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: ACCENT, boxShadow: `0 0 12px ${ACCENT}`, display: 'inline-block' }} />
                Eton Yao
              </Link>
              <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#5E6E63' }}>
                <span>←</span> Back to home
              </Link>
            </div>
          </header>

          {/* Hero */}
          <section style={{ padding: '18vh 5vw 5vh', animation: 'fadeUp 0.6s ease both' }}>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A988D', margin: '0 0 16px' }}>
              Archive · {String(projects.length).padStart(2, '0')} projects
            </p>
            <h1 style={{ fontWeight: 600, fontSize: 'clamp(46px,8vw,104px)', lineHeight: 0.94, letterSpacing: '-0.04em', margin: 0 }}>
              All projects.
            </h1>
            <p style={{ maxWidth: 540, fontSize: 18, lineHeight: 1.65, color: '#5E6E63', margin: '26px 0 0' }}>
              Everything I've built and shipped — internships, concept work, and side projects across product and marketing. Click any one for the full story.
            </p>
          </section>

          {/* Grid */}
          <section style={{ padding: '2vh 5vw 12vh' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(330px,1fr))', gap: 18 }}>
              {projects.map((p, i) => (
                <button
                  key={p.slug}
                  onClick={() => setOpenSlug(p.slug)}
                  className="project-card"
                  style={{
                    all: 'unset', cursor: 'pointer', display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-between', minHeight: 300, padding: 26, borderRadius: 18,
                    background: 'rgba(255,255,255,0.62)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                    border: '1px solid rgba(22,36,27,0.1)', boxShadow: '0 14px 34px -26px rgba(22,36,27,0.5)',
                    position: 'relative', overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                    (e.currentTarget as HTMLElement).style.borderColor = p.color;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 24px 46px -24px ${p.color}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = '';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(22,36,27,0.1)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 34px -26px rgba(22,36,27,0.5)';
                  }}
                >
                  <div style={{ position: 'absolute', top: '-40%', right: '-30%', width: '70%', height: '80%', borderRadius: '50%', background: `radial-gradient(circle,${p.color},transparent 65%)`, opacity: 0.16, filter: 'blur(20px)', pointerEvents: 'none' }} />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: p.color }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', color: '#5E6E63', border: '1px solid rgba(22,36,27,0.16)', borderRadius: 999, padding: '5px 11px' }}>{p.type}</span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <h3 style={{ fontWeight: 600, fontSize: 28, lineHeight: 1.04, letterSpacing: '-0.02em', margin: '0 0 8px' }}>{p.title}</h3>
                    <p style={{ fontSize: 14, color: '#8A988D', margin: '0 0 14px', fontFamily: "'JetBrains Mono',monospace" }}>{p.kicker}</p>
                    <p style={{ fontSize: 15, lineHeight: 1.55, color: '#5E6E63', margin: '0 0 20px' }}>{p.tagline}</p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500, color: '#16241B' }}>
                      Read case study <span style={{ color: p.color }}>→</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

        </div>
      </div>

      {openProject && <CaseDrawer project={openProject} onClose={() => setOpenSlug(null)} />}
    </>
  );
}
