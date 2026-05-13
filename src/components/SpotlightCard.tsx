"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function SpotlightCard({ children, className }: SpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group overflow-hidden rounded-[2.5rem] border border-white/5 bg-neutral-950/50 transition-all duration-500 hover:border-white/10 hover:bg-neutral-950/80 framer-shine ${className}`}
    >
      {/* Spotlight Background Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Spotlight Border Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] border border-blue-500/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10"
        style={{
          maskImage: useMotionTemplate`
            radial-gradient(
              120px circle at ${mouseX}px ${mouseY}px,
              black 45%,
              transparent 100%
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              120px circle at ${mouseX}px ${mouseY}px,
              black 45%,
              transparent 100%
            )
          `,
        }}
      />

      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
