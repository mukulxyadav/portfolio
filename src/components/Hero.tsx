"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import SectionWrapper from "./SectionWrapper";

export default function Hero() {
  return (
    <SectionWrapper className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[160px]" />
      </div>

      <div className="container relative z-10 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Open to new opportunities
        </motion.div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 max-w-4xl mx-auto leading-[0.9]">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="block text-neutral-400 overflow-hidden"
          >
            {"Engineering".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + i * 0.03,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="block text-gradient-blue overflow-hidden"
          >
            {"Digital Experiences".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6 + i * 0.03,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
                style={{ whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-xl text-neutral-500 max-w-xl mx-auto mb-12 font-medium"
        >
          Mukul Kumar — A backend developer building reliable systems with clean engineering fundamentals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton>
            <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition-colors interactive framer-shine">
              View My Work
            </button>
          </MagneticButton>
          <MagneticButton>
            <button className="px-8 py-4 rounded-full glass font-bold text-white transition-all interactive framer-shine">
              Get in Touch
            </button>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
      </motion.div>
    </SectionWrapper>
  );
}
