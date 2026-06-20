"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "./LoadingProvider";
import { ProgressiveFluxLoader } from "./ui/progressive-flux-loader";

export default function LoadingScreen() {
  const { loading, progress } = useLoading();

  const PHASES = [
    { at: 0, label: "starting up" },
    { at: 25, label: "loading assets" },
    { at: 55, label: "preparing magic" },
    { at: 80, label: "almost there" },
    { at: 100, label: "all done" },
  ];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050505] to-[#050505] pointer-events-none" />

          {/* Logo or Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 relative z-10"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-widest uppercase">
              Mukul <span className="text-blue-500">Kumar</span>
            </h1>
          </motion.div>

          <div className="relative z-10 w-full px-6 flex justify-center">
            <ProgressiveFluxLoader value={progress} phases={PHASES} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
