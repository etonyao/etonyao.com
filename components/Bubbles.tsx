'use client';

export default function Bubbles() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Large top-left */}
      <div style={{ position: 'absolute', top: '-8%', left: '-5%', width: '30vw', height: '30vw', animation: 'bub1 18s ease-in-out infinite alternate', animationDelay: '-2s' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.22)', background: 'radial-gradient(circle at 30% 26%,rgba(255,255,255,0.95),rgba(255,255,255,0) 16%),radial-gradient(circle at 72% 74%,rgba(255,255,255,0.22),rgba(255,255,255,0) 20%),radial-gradient(circle at 50% 52%,rgba(30,158,90,0.05) 40%,rgba(30,158,90,0.20) 72%,rgba(30,158,90,0.30) 88%,rgba(30,158,90,0.07) 100%)', boxShadow: 'inset 12px 14px 34px rgba(255,255,255,0.32),inset -12px -14px 34px rgba(30,158,90,0.22),0 28px 54px -24px rgba(30,158,90,0.4)', filter: 'blur(0.4px)', animation: 'bob 7s ease-in-out infinite' }} />
      </div>
      {/* Mid right */}
      <div style={{ position: 'absolute', top: '26%', right: '-7%', width: '23vw', height: '23vw', animation: 'bub2 22s ease-in-out infinite alternate', animationDelay: '-5s' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.22)', background: 'radial-gradient(circle at 30% 26%,rgba(255,255,255,0.95),rgba(255,255,255,0) 16%),radial-gradient(circle at 72% 74%,rgba(255,255,255,0.22),rgba(255,255,255,0) 20%),radial-gradient(circle at 50% 52%,rgba(14,148,136,0.05) 40%,rgba(14,148,136,0.20) 72%,rgba(14,148,136,0.30) 88%,rgba(14,148,136,0.07) 100%)', boxShadow: 'inset 12px 14px 34px rgba(255,255,255,0.32),inset -12px -14px 34px rgba(14,148,136,0.22),0 28px 54px -24px rgba(14,148,136,0.4)', filter: 'blur(0.4px)', animation: 'bob 8s ease-in-out infinite' }} />
      </div>
      {/* Bottom left */}
      <div style={{ position: 'absolute', bottom: '-12%', left: '6%', width: '27vw', height: '27vw', animation: 'bub3 26s ease-in-out infinite alternate', animationDelay: '-8s' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.22)', background: 'radial-gradient(circle at 30% 26%,rgba(255,255,255,0.95),rgba(255,255,255,0) 16%),radial-gradient(circle at 72% 74%,rgba(255,255,255,0.22),rgba(255,255,255,0) 20%),radial-gradient(circle at 50% 52%,rgba(91,154,46,0.05) 40%,rgba(91,154,46,0.20) 72%,rgba(91,154,46,0.30) 88%,rgba(91,154,46,0.07) 100%)', boxShadow: 'inset 12px 14px 34px rgba(255,255,255,0.32),inset -12px -14px 34px rgba(91,154,46,0.22),0 28px 54px -24px rgba(91,154,46,0.4)', filter: 'blur(0.4px)', animation: 'bob 9s ease-in-out infinite' }} />
      </div>
      {/* Center */}
      <div style={{ position: 'absolute', top: '52%', left: '32%', width: '15vw', height: '15vw', animation: 'bub4 19s ease-in-out infinite alternate', animationDelay: '-3s' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', background: 'radial-gradient(circle at 30% 26%,rgba(255,255,255,0.97),rgba(255,255,255,0) 17%),radial-gradient(circle at 72% 74%,rgba(255,255,255,0.24),rgba(255,255,255,0) 20%),radial-gradient(circle at 50% 52%,rgba(43,174,102,0.05) 40%,rgba(43,174,102,0.22) 72%,rgba(43,174,102,0.32) 88%,rgba(43,174,102,0.08) 100%)', boxShadow: 'inset 10px 12px 28px rgba(255,255,255,0.34),inset -10px -12px 28px rgba(43,174,102,0.24),0 22px 44px -20px rgba(43,174,102,0.42)', filter: 'blur(0.3px)', animation: 'bob 6s ease-in-out infinite' }} />
      </div>
      {/* Top right small */}
      <div style={{ position: 'absolute', top: '6%', right: '22%', width: '12vw', height: '12vw', animation: 'bub5 23s ease-in-out infinite alternate', animationDelay: '-10s' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', background: 'radial-gradient(circle at 30% 26%,rgba(255,255,255,0.97),rgba(255,255,255,0) 17%),radial-gradient(circle at 72% 74%,rgba(255,255,255,0.24),rgba(255,255,255,0) 20%),radial-gradient(circle at 50% 52%,rgba(24,160,107,0.05) 40%,rgba(24,160,107,0.22) 72%,rgba(24,160,107,0.32) 88%,rgba(24,160,107,0.08) 100%)', boxShadow: 'inset 9px 11px 24px rgba(255,255,255,0.34),inset -9px -11px 24px rgba(24,160,107,0.24),0 18px 38px -18px rgba(24,160,107,0.42)', filter: 'blur(0.3px)', animation: 'bob 7.5s ease-in-out infinite' }} />
      </div>
      {/* Bottom right */}
      <div style={{ position: 'absolute', bottom: '12%', right: '24%', width: '19vw', height: '19vw', animation: 'bub6 27s ease-in-out infinite alternate', animationDelay: '-4s' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.22)', background: 'radial-gradient(circle at 30% 26%,rgba(255,255,255,0.95),rgba(255,255,255,0) 16%),radial-gradient(circle at 72% 74%,rgba(255,255,255,0.22),rgba(255,255,255,0) 20%),radial-gradient(circle at 50% 52%,rgba(62,142,65,0.05) 40%,rgba(62,142,65,0.20) 72%,rgba(62,142,65,0.30) 88%,rgba(62,142,65,0.07) 100%)', boxShadow: 'inset 11px 13px 30px rgba(255,255,255,0.32),inset -11px -13px 30px rgba(62,142,65,0.22),0 24px 48px -22px rgba(62,142,65,0.4)', filter: 'blur(0.4px)', animation: 'bob 8.5s ease-in-out infinite' }} />
      </div>
    </div>
  );
}
