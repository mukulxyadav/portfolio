"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "./LoadingProvider";

export default function LoadingScreen() {
  const { loading, progress } = useLoading();

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
            className="mb-8 relative z-10"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-widest uppercase">
              Mukul <span className="text-blue-500">Kumar</span>
            </h1>
          </motion.div>

          {/* Progress Bar Container */}
          <div className="w-64 md:w-80 h-1 bg-white/10 rounded-full overflow-hidden relative z-10">
            {/* Animated Progress Bar */}
            <motion.div
              className="h-full bg-blue-500 relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.2 }}
            >
              {/* Glow effect on the tip of the progress bar */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full blur-[4px]" />
            </motion.div>
          </div>

          {/* Progress Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-neutral-500 text-sm font-mono z-10"
          >
            {Math.round(progress)}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
