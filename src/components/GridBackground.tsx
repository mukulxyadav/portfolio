"use client";

import { motion } from "framer-motion";

export default function GridBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base Grid */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      
      {/* Radial Mask for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,black_100%)]" />

      {/* Animated Glows */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, 150, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-purple-600/5 rounded-full blur-[140px]"
      />
    </div>
  );
}
