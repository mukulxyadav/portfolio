import { useEffect, useRef, useState } from 'react';

// Maps a value from one range to another
const mapRange = (val, inMin, inMax, outMin, outMax) =>
  outMin + ((val - inMin) * (outMax - outMin)) / (inMax - inMin);

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

export default function Avatar({ interactiveMode = true }) {
  const svgRef = useRef(null);
  const [eyes, setEyes] = useState({ lx: 0, ly: 0, rx: 0, ry: 0 });
  const [headTilt, setHeadTilt] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [nod, setNod] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const targetRef = useRef({ lx: 0, ly: 0, rx: 0, ry: 0, hx: 0, hy: 0 });
  const currentRef = useRef({ lx: 0, ly: 0, rx: 0, ry: 0, hx: 0, hy: 0 });

  // Idle blink interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Click → nod
  const handleClick = () => {
    setNod(true);
    setBlink(true);
    setTimeout(() => { setBlink(false); setNod(false); }, 600);
  };

  // Mouse tracking
  useEffect(() => {
    if (!interactiveMode) return;

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    const EYE_RANGE = 5.5; // max pupil offset in SVG units
    const HEAD_RANGE = 6;  // max head tilt in degrees

    // Left eye center (SVG coords), Right eye center
    const L_EYE = { cx: 148, cy: 200 };
    const R_EYE = { cx: 212, cy: 200 };

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Normalized -1..1
      const nx = (mx / vw - 0.5) * 2;
      const ny = (my / vh - 0.5) * 2;

      targetRef.current.lx = clamp(nx * EYE_RANGE, -EYE_RANGE, EYE_RANGE);
      targetRef.current.ly = clamp(ny * EYE_RANGE, -EYE_RANGE, EYE_RANGE);
      targetRef.current.rx = clamp(nx * EYE_RANGE, -EYE_RANGE, EYE_RANGE);
      targetRef.current.ry = clamp(ny * EYE_RANGE, -EYE_RANGE, EYE_RANGE);
      targetRef.current.hx = clamp(ny * HEAD_RANGE, -HEAD_RANGE, HEAD_RANGE);
      targetRef.current.hy = clamp(nx * HEAD_RANGE * 0.6, -HEAD_RANGE * 0.6, HEAD_RANGE * 0.6);

      // Lerp current toward target
      const LERP = 0.07;
      const c = currentRef.current;
      const t = targetRef.current;
      c.lx += (t.lx - c.lx) * LERP;
      c.ly += (t.ly - c.ly) * LERP;
      c.rx += (t.rx - c.rx) * LERP;
      c.ry += (t.ry - c.ry) * LERP;
      c.hx += (t.hx - c.hx) * LERP;
      c.hy += (t.hy - c.hy) * LERP;

      setEyes({ lx: c.lx, ly: c.ly, rx: c.rx, ry: c.ry });
      setHeadTilt({ x: c.hx, y: c.hy });
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [interactiveMode]);

  const headStyle = {
    transform: `rotateX(${headTilt.x * 0.5}deg) rotateY(${headTilt.y}deg)`,
    transition: 'transform 0.05s',
    transformOrigin: 'center center',
    transformBox: 'fill-box',
    display: 'block',
  };

  const blinkScaleY = blink ? 0.05 : 1;

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 380,
        margin: '0 auto',
        cursor: 'none',
        userSelect: 'none',
        animation: nod ? 'nod 0.5s ease' : 'float-y 6s ease-in-out infinite',
      }}
    >
      {/* Glow rings behind avatar */}
      <div className="avatar-glow" />
      <div style={{
        position: 'absolute', inset: -10,
        background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 65%)',
        borderRadius: '50%', pointerEvents: 'none',
        animation: 'avatar-pulse 4s ease-in-out infinite reverse',
      }} />

      {/* SVG Avatar */}
      <svg
        ref={svgRef}
        viewBox="0 0 360 460"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', filter: 'drop-shadow(0 0 30px rgba(124,109,250,0.25))' }}
      >
        <defs>
          {/* Skin gradient */}
          <radialGradient id="skin" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#f0c5a0" />
            <stop offset="100%" stopColor="#c9915c" />
          </radialGradient>
          {/* Hair gradient */}
          <linearGradient id="hair" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
          {/* Shirt gradient */}
          <linearGradient id="shirt" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c6dfa" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          {/* Eye white */}
          <radialGradient id="eyeWhite" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#e8e8f0" />
          </radialGradient>
          {/* Iris */}
          <radialGradient id="iris" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#7c6dfa" />
            <stop offset="60%" stopColor="#5148c5" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </radialGradient>
          {/* Glare clip */}
          <clipPath id="leftEyeClip">
            <ellipse cx="148" cy="200" rx="20" ry="18" />
          </clipPath>
          <clipPath id="rightEyeClip">
            <ellipse cx="212" cy="200" rx="20" ry="18" />
          </clipPath>
          {/* Body clip */}
          <clipPath id="bodyClip">
            <rect x="0" y="360" width="360" height="100" />
          </clipPath>
        </defs>

        {/* ── BODY / SHIRT ── */}
        <g>
          {/* Shoulders */}
          <ellipse cx="180" cy="430" rx="110" ry="55" fill="url(#shirt)" opacity="0.95" />
          {/* Shirt collar detail */}
          <path d="M155 390 L180 415 L205 390" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
          {/* Neck */}
          <rect x="162" y="355" width="36" height="45" rx="10" fill="url(#skin)" />
        </g>

        {/* ── HEAD GROUP (animated) ── */}
        <g style={headStyle}>
          {/* Head shape */}
          <ellipse cx="180" cy="210" rx="100" ry="115" fill="url(#skin)" />

          {/* ── HAIR ── */}
          {/* Main hair mass */}
          <ellipse cx="180" cy="118" rx="102" ry="60" fill="url(#hair)" />
          {/* Hair sides */}
          <ellipse cx="90" cy="170" rx="28" ry="55" fill="url(#hair)" />
          <ellipse cx="270" cy="170" rx="28" ry="55" fill="url(#hair)" />
          {/* Hair front fringe */}
          <path d="M100 125 Q130 95 180 100 Q230 95 260 125 Q240 110 210 115 Q180 108 150 115 Q120 110 100 125Z" fill="#111" />

          {/* ── EARS ── */}
          <ellipse cx="82" cy="210" rx="16" ry="22" fill="url(#skin)" />
          <ellipse cx="82" cy="210" rx="10" ry="14" fill="#d4906a" opacity="0.5" />
          <ellipse cx="278" cy="210" rx="16" ry="22" fill="url(#skin)" />
          <ellipse cx="278" cy="210" rx="10" ry="14" fill="#d4906a" opacity="0.5" />

          {/* ── EYEBROWS ── */}
          <path d="M122 177 Q138 169 158 174" stroke="#3d2b1f" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M202 174 Q222 169 238 177" stroke="#3d2b1f" strokeWidth="3.5" fill="none" strokeLinecap="round" />

          {/* ── LEFT EYE ── */}
          <g clipPath="url(#leftEyeClip)">
            {/* Eye white */}
            <ellipse cx="148" cy="200" rx="20" ry="18" fill="url(#eyeWhite)" />
            {/* Iris */}
            <ellipse
              cx={148 + eyes.lx}
              cy={200 + eyes.ly}
              rx="12" ry="12"
              fill="url(#iris)"
              style={{ transform: `scaleY(${blinkScaleY})`, transformOrigin: '148px 200px', transformBox: 'fill-box', transition: 'transform 0.08s' }}
            />
            {/* Pupil */}
            <ellipse
              cx={148 + eyes.lx}
              cy={200 + eyes.ly}
              rx="6" ry="6"
              fill="#0a0a0a"
              style={{ transform: `scaleY(${blinkScaleY})`, transformOrigin: '148px 200px', transformBox: 'fill-box', transition: 'transform 0.08s' }}
            />
            {/* Glare */}
            <ellipse cx={143 + eyes.lx * 0.3} cy={194 + eyes.ly * 0.3} rx="3" ry="3" fill="white" opacity="0.8" />
            <ellipse cx={149 + eyes.lx * 0.3} cy={196 + eyes.ly * 0.3} rx="1.5" ry="1.5" fill="white" opacity="0.5" />
          </g>
          {/* Eyelid (blink) */}
          {blink && <ellipse cx="148" cy="200" rx="21" ry="18" fill="url(#skin)" opacity="0.98" />}
          {/* Eye outline */}
          <ellipse cx="148" cy="200" rx="20" ry="18" fill="none" stroke="#2d1a0e" strokeWidth="1.5" />
          {/* Eyelashes top */}
          <path d="M128 197 Q138 182 148 181 Q158 182 168 197" fill="none" stroke="#1a0e07" strokeWidth="2.5" strokeLinecap="round" />

          {/* ── RIGHT EYE ── */}
          <g clipPath="url(#rightEyeClip)">
            <ellipse cx="212" cy="200" rx="20" ry="18" fill="url(#eyeWhite)" />
            <ellipse
              cx={212 + eyes.rx}
              cy={200 + eyes.ry}
              rx="12" ry="12"
              fill="url(#iris)"
              style={{ transform: `scaleY(${blinkScaleY})`, transformOrigin: '212px 200px', transformBox: 'fill-box', transition: 'transform 0.08s' }}
            />
            <ellipse
              cx={212 + eyes.rx}
              cy={200 + eyes.ry}
              rx="6" ry="6"
              fill="#0a0a0a"
              style={{ transform: `scaleY(${blinkScaleY})`, transformOrigin: '212px 200px', transformBox: 'fill-box', transition: 'transform 0.08s' }}
            />
            <ellipse cx={207 + eyes.rx * 0.3} cy={194 + eyes.ry * 0.3} rx="3" ry="3" fill="white" opacity="0.8" />
            <ellipse cx={213 + eyes.rx * 0.3} cy={196 + eyes.ry * 0.3} rx="1.5" ry="1.5" fill="white" opacity="0.5" />
          </g>
          {blink && <ellipse cx="212" cy="200" rx="21" ry="18" fill="url(#skin)" opacity="0.98" />}
          <ellipse cx="212" cy="200" rx="20" ry="18" fill="none" stroke="#2d1a0e" strokeWidth="1.5" />
          <path d="M192 197 Q202 182 212 181 Q222 182 232 197" fill="none" stroke="#1a0e07" strokeWidth="2.5" strokeLinecap="round" />

          {/* ── NOSE ── */}
          <path d="M176 220 Q180 250 168 260 Q180 265 192 260 Q180 250 184 220" fill="none" stroke="#c0805a" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />

          {/* ── MOUTH ── */}
          <path d="M158 285 Q180 300 202 285" fill="none" stroke="#b57050" strokeWidth="2.5" strokeLinecap="round" />
          {/* Teeth hint */}
          <path d="M163 288 Q180 298 197 288" fill="rgba(255,255,255,0.15)" />

          {/* ── CHEEK BLUSH ── */}
          <ellipse cx="112" cy="235" rx="22" ry="14" fill="#f0a0a0" opacity="0.15" />
          <ellipse cx="248" cy="235" rx="22" ry="14" fill="#f0a0a0" opacity="0.15" />

          {/* ── CHIN SHADOW ── */}
          <ellipse cx="180" cy="318" rx="45" ry="10" fill="#b07040" opacity="0.15" />
        </g>

        {/* ── NAME BADGE (below avatar) ── */}
        <rect x="105" y="395" width="150" height="28" rx="14" fill="rgba(124,109,250,0.15)" stroke="rgba(124,109,250,0.3)" strokeWidth="1" />
        <text x="180" y="413" textAnchor="middle" fill="#a78bfa" fontSize="12" fontFamily="Fira Code, monospace" fontWeight="600">@mukulkumar</text>
      </svg>

      <style>{`
        @keyframes nod {
          0% { transform: translateY(0) rotateX(0deg); }
          30% { transform: translateY(-8px) rotateX(-8deg); }
          60% { transform: translateY(4px) rotateX(4deg); }
          100% { transform: translateY(0) rotateX(0deg); }
        }
        @keyframes float-y {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
      `}</style>
    </div>
  );
}
