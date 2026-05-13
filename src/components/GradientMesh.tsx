"use client";

import { motion } from "framer-motion";

export default function GradientMesh() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-neutral-950">
      {/* Primary Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/20 blur-[140px]"
      />

      {/* Secondary Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05],
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[140px]"
      />

      {/* Accent Glow */}
      <motion.div
        animate={{
          opacity: [0.02, 0.05, 0.02],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-cyan-500/10 blur-[120px]"
      />
    </div>
  );
}
