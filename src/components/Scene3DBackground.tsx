"use client";

/**
 * Scene3DBackground — Premium sci-fi 3D background
 *
 * Visibility: HIGH — scene elements are bright and clearly visible.
 * Content protection: scroll-driven backdrop-filter blur overlay.
 *   • At scroll 0 (hero)     → blur = 0px, dark tint = 0%
 *   • At scroll 300px        → blur = 6px,  dark tint = 30%
 *   • At scroll 600px+       → blur = 10px, dark tint = 50%
 *
 * Scene layers:
 *  1. STARFIELD     — 1800 twinkling stars
 *  2. NEBULA CLOUDS — 5 glowing colour blobs
 *  3. HOLO GRID     — animated GLSL grid floor
 *  4. GLOW RINGS    — 6 torus rings, some central (dramatic), some side
 *  5. ENERGY NODES  — 24 floating wireframe icosahedra
 *  6. CAMERA RIG    — spring-physics mouse parallax + scroll zoom
 */

import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Site palette ─────────────────────────────────────────────────────────────
const C_BLUE   = new THREE.Color("#3b82f6");
const C_PURPLE = new THREE.Color("#8b5cf6");
const C_PINK   = new THREE.Color("#ec4899");
const C_TEAL   = new THREE.Color("#06b6d4");

// ─── 1. Starfield ─────────────────────────────────────────────────────────────
function Starfield({ count = 1800 }: { count?: number }) {
  const geoRef = useRef<THREE.BufferGeometry>(null!);

  const { pos, sizes, phases } = useMemo(() => {
    const pos    = new Float32Array(count * 3);
    const sizes  = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 24 + Math.random() * 18;
      pos[i*3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i*3 + 1] = r * Math.cos(phi);
      pos[i*3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      sizes[i]  = 0.015 + Math.random() * 0.055;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { pos, sizes, phases };
  }, [count]);

  useEffect(() => {
    if (!geoRef.current) return;
    geoRef.current.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geoRef.current.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));
  }, [pos, sizes]);

  useFrame(({ clock }) => {
    if (!geoRef.current?.attributes.size) return;
    const t    = clock.getElapsedTime();
    const sArr = geoRef.current.attributes.size as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      sArr.setX(i, sizes[i] * (0.75 + 0.25 * Math.sin(t * 1.8 + phases[i])));
    }
    sArr.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geoRef} />
      <pointsMaterial
        color="#d0e4ff"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
}

// ─── 2. Nebula clouds ─────────────────────────────────────────────────────────
const NEBULA_CFGS = [
  { pos: [ 7,  2, -16] as [number,number,number], color: C_BLUE,   r: 10, op: 0.08  },
  { pos: [-8,  1, -18] as [number,number,number], color: C_PURPLE, r: 12, op: 0.07  },
  { pos: [ 2, -3, -14] as [number,number,number], color: C_TEAL,   r: 8,  op: 0.06  },
  { pos: [-4,  4, -20] as [number,number,number], color: C_PINK,   r: 9,  op: 0.05  },
  { pos: [10, -2, -12] as [number,number,number], color: C_BLUE,   r: 7,  op: 0.07  },
];

function NebulaClouds() {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.018;
  });
  return (
    <group ref={groupRef}>
      {NEBULA_CFGS.map((cfg, i) => (
        <mesh key={i} position={cfg.pos}>
          <sphereGeometry args={[cfg.r, 12, 12]} />
          <meshBasicMaterial color={cfg.color} transparent opacity={cfg.op} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

// ─── 3. Holographic grid ──────────────────────────────────────────────────────
const GRID_VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const GRID_FRAG = `
  uniform float uTime;
  varying vec2 vUv;
  float line(float coord, float w) {
    float g = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
    return 1.0 - min(g / w, 1.0);
  }
  void main() {
    float spacing = 0.06;
    float gx = line(vUv.x / spacing, 1.0);
    float gz = line(vUv.y / spacing, 1.0);
    float grid = max(gx, gz);
    float fade  = 1.0 - smoothstep(0.25, 1.0, vUv.y);
    float pulse = 0.8 + 0.2 * sin(uTime * 0.9 + vUv.y * 8.0);
    vec3  color = mix(vec3(0.06, 0.40, 0.90), vec3(0.50, 0.25, 0.95), vUv.y);
    gl_FragColor = vec4(color, grid * fade * pulse * 0.7);
  }
`;

function HolographicGrid() {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.2, -2]}>
      <planeGeometry args={[50, 50, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={GRID_VERT}
        fragmentShader={GRID_FRAG}
        uniforms={{ uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

// ─── 4. Glow rings ────────────────────────────────────────────────────────────
interface RingCfg {
  pos: [number,number,number];
  color: THREE.Color;
  r: number; tube: number;
  rotAxis: [number,number,number];
  speed: number; phase: number; opacity: number;
}
const RING_CFGS: RingCfg[] = [
  // Two rings centred in scene — dramatic but thin
  { pos:[  0,  0,  -6], color:C_BLUE,   r:3.0, tube:0.014, rotAxis:[0.3,1,0.2],   speed:0.14, phase:0,   opacity:0.65 },
  { pos:[  0,  0, -10], color:C_PURPLE, r:4.2, tube:0.012, rotAxis:[0.8,0.3,0.5], speed:0.10, phase:1.8, opacity:0.55 },
  // Side rings — flank the content
  { pos:[ 10,  0,  -6], color:C_TEAL,   r:1.8, tube:0.009, rotAxis:[0.5,0.8,0.3], speed:0.22, phase:2.4, opacity:0.70 },
  { pos:[-10,  0,  -6], color:C_PURPLE, r:1.6, tube:0.009, rotAxis:[0.2,0.6,1],   speed:0.26, phase:0.6, opacity:0.65 },
  { pos:[  8, -2,  -9], color:C_BLUE,   r:2.2, tube:0.010, rotAxis:[0.7,0.4,0.8], speed:0.18, phase:3.0, opacity:0.60 },
  { pos:[ -8,  2,  -9], color:C_TEAL,   r:2.0, tube:0.010, rotAxis:[0.1,1,0.3],   speed:0.16, phase:1.2, opacity:0.60 },
];

function GlowRing({ cfg }: { cfg: RingCfg }) {
  const ref  = useRef<THREE.Mesh>(null!);
  const axis = useMemo(() => new THREE.Vector3(...cfg.rotAxis).normalize(), [cfg.rotAxis]);
  useFrame(({ clock }) => {
    ref.current.setRotationFromAxisAngle(axis, clock.getElapsedTime() * cfg.speed + cfg.phase);
    ref.current.position.y = cfg.pos[1] + Math.sin(clock.getElapsedTime() * 0.35 + cfg.phase) * 0.4;
  });
  return (
    <mesh ref={ref} position={cfg.pos}>
      <torusGeometry args={[cfg.r, cfg.tube, 8, 100]} />
      <meshBasicMaterial color={cfg.color} transparent opacity={cfg.opacity} depthWrite={false} />
    </mesh>
  );
}

function GlowRings() {
  return (
    <>
      {RING_CFGS.map((cfg, i) => (
        <GlowRing key={i} cfg={cfg} />
      ))}
    </>
  );
}

// ─── 5. Energy nodes ──────────────────────────────────────────────────────────
function EnergyNodes({ count = 24 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const nodes = useMemo(() => {
    const palette = [C_BLUE, C_PURPLE, C_TEAL, C_PINK];
    return Array.from({ length: count }, (_, i) => ({
      pos: [
        (Math.random() < 0.5 ? -1 : 1) * (4 + Math.random() * 9),
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 12 - 4,
      ] as [number,number,number],
      color: palette[i % palette.length],
      scale: 0.04 + Math.random() * 0.09,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.5,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const n = nodes[i];
      child.scale.setScalar(n.scale * (0.8 + 0.2 * Math.sin(t * n.speed + n.phase)));
      (child as THREE.Mesh).position.y = n.pos[1] + Math.sin(t * n.speed * 0.5 + n.phase) * 0.45;
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos} scale={n.scale}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={n.color} wireframe transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

// ─── 6. Camera rig ────────────────────────────────────────────────────────────
function CameraRig({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const current = useRef(new THREE.Vector3(0, 0, 9));
  const target  = useRef(new THREE.Vector3(0, 0, 9));
  const mouse   = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouse  = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  useFrame(() => {
    target.current.x = mouse.current.x * 1.4;
    target.current.y = -mouse.current.y * 0.9;
    target.current.z = 9 + scrollY.current * 0.0015;
    current.current.lerp(target.current, 0.045);
    camera.position.copy(current.current);
    camera.lookAt(0, -0.5, 0);
  });

  return null;
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ mobile, scrollY }: { mobile: boolean; scrollY: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight position={[8,  6,  4]} color="#3b82f6" intensity={5} />
      <pointLight position={[-6,-4,  2]} color="#8b5cf6" intensity={4} />
      <pointLight position={[0,  2, -8]} color="#06b6d4" intensity={2} />

      <CameraRig scrollY={scrollY} />
      <NebulaClouds />
      <Starfield count={mobile ? 900 : 1800} />
      {!mobile && <HolographicGrid />}
      <GlowRings />
      <EnergyNodes count={mobile ? 12 : 24} />
    </>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Scene3DBackground() {
  const isBrowser = typeof window !== "undefined";
  const mobile    = isBrowser && window.innerWidth < 768;
  const dpr       = isBrowser ? Math.min(window.devicePixelRatio ?? 1, 2) : 1;
  const scrollY   = useRef(0);
  const blurRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      scrollY.current = y;

      if (!blurRef.current) return;
      // 0px at top → 10px blur at 600px scroll
      const blur = Math.min(y / 60, 10);
      // 0% tint at top → 50% tint at 600px scroll
      const tint = Math.min(y / 1200, 0.5);

      blurRef.current.style.backdropFilter  = `blur(${blur}px)`;
      blurRef.current.style.webkitBackdropFilter = `blur(${blur}px)`;
      blurRef.current.style.background      = `rgba(5,5,5,${tint})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "#050505" }}
    >
      {/* The Three.js canvas — full brightness, no overlay inside */}
      <Canvas
        camera={{ position: [0, 0, 9], fov: 52, near: 0.1, far: 120 }}
        gl={{
          antialias: !mobile,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={mobile ? 1 : dpr}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene mobile={mobile} scrollY={scrollY} />
        </Suspense>
      </Canvas>

      {/* Scroll-driven blur + tint overlay — starts transparent at top */}
      <div
        ref={blurRef}
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(0px)",
          WebkitBackdropFilter: "blur(0px)",
          background: "rgba(5,5,5,0)",
          transition: "none", // instant on scroll, smooth enough with rAF
          pointerEvents: "none",
        }}
      />

      {/* Static edge vignette — always on, lightweight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 85% 75% at 50% 50%, rgba(5,5,5,0) 40%, rgba(5,5,5,0.72) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
