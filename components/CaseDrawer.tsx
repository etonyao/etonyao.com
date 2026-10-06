'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import type { Project } from '@/app/data/projects';

interface Props {
  project: Project;
  onClose: () => void;
}

export default function CaseDrawer({ project, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 90,
        background: 'rgba(22,32,25,0.4)',
        backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)',
        animation: 'ovIn 0.25s ease both',
        display: 'flex', justifyContent: 'flex-end',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(640px, 96vw)', height: '100%', overflowY: 'auto',
          background: '#FBFCFA',
          borderLeft: '1px solid rgba(22,36,27,0.12)',
          animation: 'drawerIn 0.34s cubic-bezier(0.22,1,0.36,1) both',
        }}
      >
        {/* Sticky header */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 2,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px 32px',
          background: 'rgba(251,252,250,0.85)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(22,36,27,0.1)',
        }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', color: project.color }}>
            {project.type} / Case study
          </span>
          <button
            onClick={onClose}
            style={{
              all: 'unset', cursor: 'pointer', width: 38, height: 38,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(22,36,27,0.18)', borderRadius: '50%',
              fontSize: 17, color: '#3C4A41',
            }}
          >✕</button>
        </div>

        {/* Color banner */}
        <div style={{
          position: 'relative', height: 220,
          backgroundColor: project.color,
          backgroundImage: 'repeating-linear-gradient(135deg,rgba(0,0,0,0.14) 0 2px,transparent 2px 16px)',
          display: 'flex', alignItems: 'flex-end', padding: '24px 32px',
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '0.5px',
            color: 'rgba(255,255,255,0.95)', background: 'rgba(0,0,0,0.28)',
            borderRadius: 6, padding: '6px 11px',
          }}>{project.imgLabel}</span>
        </div>

        {/* Body */}
        <div style={{ padding: '34px 32px 64px' }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', color: '#8A988D', margin: '0 0 12px' }}>
            {project.role}
          </p>
          <h2 style={{ fontWeight: 600, fontSize: 'clamp(38px,7vw,58px)', lineHeight: 0.98, letterSpacing: '-0.03em', margin: '0 0 8px', color: '#16241B' }}>
            {project.title}
          </h2>
          <p style={{ fontSize: 17, color: '#5E6E63', margin: '0 0 28px' }}>{project.kicker}</p>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: '#3C4A41', margin: '0 0 36px' }}>{project.overview}</p>

          {/* Outcomes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 40 }}>
            {project.outcomes.map((o) => (
              <div key={o.label} style={{ background: 'rgba(22,36,27,0.04)', border: '1px solid rgba(22,36,27,0.08)', borderRadius: 14, padding: '18px 16px' }}>
                <div style={{ fontWeight: 600, fontSize: 28, lineHeight: 1, color: project.color, marginBottom: 7, letterSpacing: '-0.02em' }}>{o.n}</div>
                <div style={{ fontSize: 12, lineHeight: 1.35, color: '#5E6E63' }}>{o.label}</div>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A988D', margin: '0 0 12px' }}>The problem</p>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#3C4A41', margin: '0 0 34px' }}>{project.problem}</p>

          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#8A988D', margin: '0 0 18px' }}>What I did</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 38 }}>
            {project.approach.map((step, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14, alignItems: 'start' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: project.color, marginTop: 9, boxShadow: `0 0 10px ${project.color}`, display: 'block' }} />
                <span style={{ fontSize: 16, lineHeight: 1.55, color: '#3C4A41' }}>{step}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
            {project.tags.map((t) => (
              <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, padding: '7px 13px', border: '1px solid rgba(22,36,27,0.14)', borderRadius: 999, color: '#5E6E63' }}>{t}</span>
            ))}
          </div>

          {/* Full case study link */}
          <Link
            href={`/projects/${project.slug}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: project.color, color: '#fff',
              fontWeight: 600, fontSize: 15, padding: '14px 24px',
              borderRadius: 10, boxShadow: `0 10px 28px -10px ${project.color}`,
              textDecoration: 'none',
            }}
          >
            View full case study <span>↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
