"use client";

/**
 * CodeBackground — Live "developer environment" canvas animation
 *
 * Layer 1 — Ambient color blobs (deep blue/purple, screen blend)
 *           Keeps the background from being pure flat black.
 *
 * Layer 2 — Code Rain columns (Matrix-inspired but modern)
 *           Each column holds a stream of random chars drawn top-down.
 *           Characters are pulled from: symbols, numbers, code keywords,
 *           and operator glyphs.  The leading character glows white;
 *           the trail fades through green → dark green.
 *
 * Layer 3 — Floating code snippets
 *           Short lines of real-looking code (e.g. "function init()")
 *           drift diagonally, appear with a fade-in, hold briefly,
 *           then fade out.  They have a soft green text-shadow glow.
 *
 * Layer 4 — Cursor spotlight + repulsion
 *           A faint blue glow follows the mouse.  Nearby rain columns
 *           temporarily speed up and brighten.
 *
 * Performance budget
 *   • Single <canvas>, single rAF loop, delta-time capped at 32 ms
 *   • Mobile: column count and snippet count halved, blobs removed
 *   • No React state updates after mount — pure ref/canvas mutation
 */

import { useEffect, useRef, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Character pool
// ─────────────────────────────────────────────────────────────────────────────
const CHARS_SYMBOLS   = "!@#$%^&*()_+-=[]{}|;:,./<>?~`\\\"'";
const CHARS_NUMBERS   = "0123456789";
const CHARS_KEYWORDS  = [
  "if", "for", "fn", "let", "var", "=>", "{}",
  "[]", "&&", "||", "==", "!=", "++", "--", "/*",
  "*/", "//", "()", "<<", ">>", "::", "->", "??",
];
// Flat string for fast random-index lookup
const CHARS_FLAT      = CHARS_SYMBOLS + CHARS_NUMBERS;

function randChar(): string {
  if (Math.random() < 0.08) {
    return CHARS_KEYWORDS[Math.floor(Math.random() * CHARS_KEYWORDS.length)];
  }
  return CHARS_FLAT[Math.floor(Math.random() * CHARS_FLAT.length)];
}

// ─────────────────────────────────────────────────────────────────────────────
// Floating snippet pool
// ─────────────────────────────────────────────────────────────────────────────
const CODE_SNIPPETS = [
  "const data = fetch(api);",
  "function init() { }",
  "if (x > 0) return true;",
  "class Node { next: Node }",
  "SELECT * FROM users;",
  "git commit -m 'fix'",
  "npm run build",
  "O(n log n)",
  "while (true) { ... }",
  "throw new Error(404)",
  "int[] arr = new int[n];",
  "HashMap<K,V> map = new",
  "System.out.println(x);",
  "return left + right;",
  "mid = (lo + hi) >> 1;",
  "for (int i=0; i<n; i++)",
  "interface Comparable<T>",
  "docker run -p 3000:3000",
  "ALTER TABLE ADD COLUMN",
  "async fn handle() -> {}",
];

// ─────────────────────────────────────────────────────────────────────────────
// Ambient blob config (background depth layer)
// ─────────────────────────────────────────────────────────────────────────────
const BLOB_CFG = [
  { c: "30,58,138",  r: 520, sp: 0.0003 }, // deep blue  — very large
  { c: "88,28,135",  r: 440, sp: 0.0005 }, // deep purple
  { c: "21,94,117",  r: 380, sp: 0.0004 }, // teal
];

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface Column {
  x: number;
  y: number;          // current head position
  speed: number;      // px/frame
  chars: string[];    // ring buffer of visible chars
  len: number;        // trail length in chars
  glowing: boolean;   // near cursor?
}

interface Snippet {
  text: string;
  x: number; y: number;
  vx: number; vy: number;
  alpha: number;
  life: number;       // 0 → maxLife
  maxLife: number;
  phase: "in" | "hold" | "out";
  fontSize: number;
}

interface Blob {
  x: number; y: number;
  radius: number;
  color: string;
  opacity: number;
  phase: number;
  speed: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
const R = (min: number, max: number) => min + Math.random() * (max - min);

function buildColumns(W: number, H: number, colW: number): Column[] {
  const count = Math.floor(W / colW);
  return Array.from({ length: count }, (_, i) => ({
    x:       i * colW + colW / 2,
    y:       R(-H, 0),
    speed:   R(1.2, 3.5),
    chars:   Array.from({ length: 30 }, randChar),
    len:     Math.floor(R(8, 28)),
    glowing: false,
  }));
}

function buildBlobs(W: number, H: number): Blob[] {
  return BLOB_CFG.map((cfg, i) => ({
    x:       R(0, W),
    y:       R(0, H),
    radius:  cfg.r,
    color:   cfg.c,
    opacity: R(0.22, 0.35),   // was 0.12–0.22, now much more visible
    phase:   (i / BLOB_CFG.length) * Math.PI * 2,
    speed:   cfg.sp,
  }));
}

function spawnSnippet(W: number, H: number): Snippet {
  const maxLife = R(180, 340);
  return {
    text:     CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
    x:        R(80, W - 220),
    y:        R(80, H - 80),
    vx:       R(-0.10, 0.10),
    vy:       R(-0.06, 0.06),
    alpha:    0,
    life:     0,
    maxLife,
    phase:    "in",
    fontSize: Math.floor(R(11, 15)),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function CodeBackground() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const colsRef    = useRef<Column[]>([]);
  const snipsRef   = useRef<Snippet[]>([]);
  const blobsRef   = useRef<Blob[]>([]);
  const mouseRef   = useRef({ x: -999, y: -999 });
  const rafRef     = useRef(0);
  const prevTsRef  = useRef(0);

  const COL_W = 22; // px between rain columns

  const init = useCallback((W: number, H: number, mobile: boolean) => {
    const colW = mobile ? COL_W * 1.6 : COL_W;
    colsRef.current  = buildColumns(W, H, colW);
    blobsRef.current = mobile ? [] : buildBlobs(W, H);
    // More snippets visible at once
    snipsRef.current = Array.from({ length: mobile ? 4 : 10 }, () => spawnSnippet(W, H));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    // ── Resize ──────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      init(canvas.width, canvas.height, window.innerWidth < 768);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.body);

    // ── Mouse ───────────────────────────────────────────────────────────────
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // ── Render loop ─────────────────────────────────────────────────────────
    const render = (ts: number) => {
      const dt = Math.min(ts - prevTsRef.current, 32);
      prevTsRef.current = ts;
      const W = canvas.width, H = canvas.height;
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      // ── Clear ──────────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, W, H);

      // ── LAYER 1: Ambient blobs ─────────────────────────────────────────────
      if (blobsRef.current.length) {
        ctx.globalCompositeOperation = "screen";
        for (const b of blobsRef.current) {
          b.phase += b.speed * dt;
          const tx = 0.5 * W + Math.cos(b.phase * 0.7) * W * 0.30;
          const ty = 0.5 * H + Math.sin(b.phase * 0.5) * H * 0.25;
          b.x += (tx - b.x) * 0.0008 * dt;
          b.y += (ty - b.y) * 0.0008 * dt;

          const pulse = Math.sin(b.phase * 2) * 0.04;
          const g2 = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
          g2.addColorStop(0,    `rgba(${b.color},${b.opacity + pulse})`);
          g2.addColorStop(0.4,  `rgba(${b.color},${(b.opacity + pulse) * 0.5})`);
          g2.addColorStop(1,    `rgba(${b.color},0)`);
          ctx.fillStyle = g2;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalCompositeOperation = "source-over";
      }

      // ── LAYER 2: Code Rain ─────────────────────────────────────────────────
      const FONT_SIZE  = 13;
      const GLOW_RANGE = 110;     // px — cursor glow radius for columns

      ctx.font = `bold ${FONT_SIZE}px "Fira Code", "JetBrains Mono", monospace`;

      for (const col of colsRef.current) {
        // Mark column as glowing if near cursor
        const dx = col.x - mx, dy = col.y - my;
        col.glowing = Math.sqrt(dx * dx + dy * dy) < GLOW_RANGE;

        // Advance
        const spd = col.glowing ? col.speed * 1.7 : col.speed;
        col.y += spd * (dt / 16);

        // Refresh random char occasionally
        if (Math.random() < 0.04) {
          col.chars[Math.floor(Math.random() * col.chars.length)] = randChar();
        }

        // Draw trail  (head at index 0 = brightest)
        for (let row = 0; row < col.len; row++) {
          const cy = col.y - row * FONT_SIZE;
          if (cy < -FONT_SIZE || cy > H + FONT_SIZE) continue;

          const charIdx = (row + Math.floor(col.y / FONT_SIZE)) % col.chars.length;
          const ch      = col.chars[(charIdx + col.chars.length) % col.chars.length];

          const t = row / col.len;   // 0 = head, 1 = tail

          if (row === 0) {
            // Bright white/green leading char — always glowing
            ctx.fillStyle   = col.glowing ? "#ffffff" : "#aaffcc";
            ctx.shadowBlur  = col.glowing ? 22 : 14;
            ctx.shadowColor = "#00ff88";
          } else {
            // Trail fades: bright green → medium green → dark
            const brightness = Math.pow(1 - t, 0.7); // non-linear — stays bright longer
            const gv = Math.floor(255 * brightness * (col.glowing ? 1 : 0.85));
            const bv = Math.floor(gv * 0.3);
            const av = Math.max(0.04, 1 - t * 0.75);
            ctx.fillStyle   = `rgba(0,${gv},${bv},${av})`;
            ctx.shadowBlur  = t < 0.4 ? 8 : 0;
            ctx.shadowColor = "#00dd66";
          }

          ctx.fillText(ch, col.x, cy);
          ctx.shadowBlur = 0;
        }

        // Reset when column scrolls below screen
        if (col.y > H + col.len * FONT_SIZE) {
          col.y     = R(-H * 0.5, 0);
          col.speed = R(1.2, 3.5);
          col.len   = Math.floor(R(8, 28));
        }
      }

      // ── LAYER 3: Floating code snippets ────────────────────────────────────
      const IN_SPEED   = 0.012;
      const OUT_SPEED  = 0.018;
      const HOLD_TICKS = 120;

      for (let i = snipsRef.current.length - 1; i >= 0; i--) {
        const s = snipsRef.current[i];
        s.life += 1;
        s.x    += s.vx;
        s.y    += s.vy;

        if (s.phase === "in") {
          s.alpha += IN_SPEED;
          if (s.alpha >= 0.62) { s.alpha = 0.62; s.phase = "hold"; s.life = 0; }
        } else if (s.phase === "hold") {
          if (s.life > HOLD_TICKS) s.phase = "out";
        } else {
          s.alpha -= OUT_SPEED;
          if (s.alpha <= 0) {
            // Replace with a new snippet
            snipsRef.current[i] = spawnSnippet(W, H);
            continue;
          }
        }

        ctx.globalAlpha = s.alpha;
        ctx.font        = `${s.fontSize}px "Fira Code", "JetBrains Mono", monospace`;
        ctx.shadowBlur  = 12;
        ctx.shadowColor = "#00ff8899";
        ctx.fillStyle   = "#86efac";   // green-300 — more visible
        ctx.fillText(s.text, s.x, s.y);
        ctx.shadowBlur  = 0;
        ctx.globalAlpha = 1;
      }

      // ── LAYER 4: Cursor spotlight ──────────────────────────────────────────
      if (mx > -900) {
        const spotR = 180;
        const spot  = ctx.createRadialGradient(mx, my, 0, mx, my, spotR);
        spot.addColorStop(0,   "rgba(0,255,136,0.07)");
        spot.addColorStop(0.5, "rgba(59,130,246,0.035)");
        spot.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = spot;
        ctx.beginPath();
        ctx.arc(mx, my, spotR, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Vignette — only at the very edges, not the center ──────────────────
      const vig = ctx.createRadialGradient(W/2, H/2, H * 0.5, W/2, H/2, H * 1.1);
      vig.addColorStop(0, "rgba(5,5,5,0)");
      vig.addColorStop(1, "rgba(5,5,5,0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouse);
      ro.disconnect();
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
