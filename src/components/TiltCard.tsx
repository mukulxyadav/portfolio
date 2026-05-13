"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // 1-20, default 8
  glowColor?: string;
}

export default function TiltCard({
  children,
  className = "",
  intensity = 8,
  glowColor = "59,130,246",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX  = useMotionValue(0);
  const rawY  = useMotionValue(0);
  const glow  = useMotionValue(0);

  const rotateX  = useSpring(rawX,  { stiffness: 200, damping: 20 });
  const rotateY  = useSpring(rawY,  { stiffness: 200, damping: 20 });
  const glowSpring = useSpring(glow, { stiffness: 200, damping: 30 });

  const glowOpacity = useTransform(glowSpring, [0, 1], [0, 0.15]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    rawX.set(-dy / (rect.height / 2) * intensity);
    rawY.set( dx / (rect.width  / 2) * intensity);
    glow.set(1);
  }, [rawX, rawY, glow, intensity]);

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    glow.set(0);
  }, [rawX, rawY, glow]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 800,
      }}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`relative ${className}`}
    >
      {/* Glow overlay */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          opacity: glowOpacity,
          background: `radial-gradient(circle at 50% 0%, rgba(${glowColor},0.3), transparent 70%)`,
          borderRadius: "inherit",
        }}
      />
      {children}
    </motion.div>
  );
}
