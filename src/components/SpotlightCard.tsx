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
      className={`relative group overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900/50 transition-colors hover:bg-neutral-900/80 framer-shine ${className}`}
    >
      {/* Spotlight Background Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Spotlight Border Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] border border-blue-500/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10"
        style={{
          maskImage: useMotionTemplate`
            radial-gradient(
              150px circle at ${mouseX}px ${mouseY}px,
              black 45%,
              transparent 100%
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              150px circle at ${mouseX}px ${mouseY}px,
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
