"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import { AnimatedLayerButton } from "@/components/ui/animated-layer-button";
import { resumeData } from "../data/resume";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="home"
      className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Premium Animated Background */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050505]/80 to-[#050505] z-0 pointer-events-none" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center h-full">
        
        {/* LEFT: Content & Typography */}
        <motion.div 
          style={{ y, opacity }}
          className="flex-1 flex flex-col justify-center mt-10 lg:mt-0 z-20"
        >
          {/* Status Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-6 w-fit shadow-[0_0_15px_rgba(59,130,246,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-widest">
              Available for Hire
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight leading-[1.1]"
          >
            Mukul <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Kumar</span>
          </motion.h1>

          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex items-center gap-3 mb-6 h-8"
          >
            <div className="w-8 h-[2px] bg-blue-500" />
            <span className="text-xl md:text-2xl text-neutral-300 font-medium">
              <TypeAnimation
                sequence={[
                  "Backend Developer", 2000,
                  "Problem Solver", 2000,
                  "Computer Science Student", 2000,
                ]}
                repeat={Infinity}
                wrapper="span"
              />
            </span>
          </motion.div>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-base md:text-lg text-neutral-400 max-w-xl mb-10 leading-relaxed"
          >
            Second-year Computer Science student at SRM Institute of Science and Technology with strong foundations in Java, C++, Python, DSA, and backend development. Passionate about building scalable applications and solving real-world problems.
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-4 items-center"
          >
            <a href="#projects" className="group relative px-6 py-3 rounded-lg bg-white text-black font-semibold overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </span>
              <div className="absolute inset-0 bg-neutral-200 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100 z-0" />
            </a>
            
            <a href="#" className="px-6 py-3 rounded-lg border border-white/20 bg-white/5 text-white font-semibold backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/40 active:scale-95">
              Download Resume
            </a>

            <AnimatedLayerButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact Me
            </AnimatedLayerButton>
          </motion.div>
        </motion.div>

        {/* RIGHT: 3D Avatar & Floating Cards */}
        <div className="flex-1 relative w-full h-[50vh] lg:h-full flex items-center justify-center">
          
          {/* Floating Glass Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute top-[20%] right-[10%] lg:right-[20%] z-30 glass-card px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl flex items-center gap-3 animate-float-slow"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
               🎓
            </div>
            <div>
              <p className="text-white font-bold text-sm">CGPA: 9.16</p>
              <p className="text-neutral-400 text-xs">SRM Institute</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-[25%] left-[5%] lg:left-[10%] z-30 glass-card px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl flex items-center gap-3 animate-float-delayed"
          >
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
              💻
            </div>
            <div>
              <p className="text-white font-bold text-sm">Backend Dev</p>
              <p className="text-neutral-400 text-xs">Java, MySQL</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-[10%] right-[15%] z-30 glass-card px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl flex items-center gap-3 animate-float"
          >
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
              🧠
            </div>
            <div>
              <p className="text-white font-bold text-sm">76+ Solved</p>
              <p className="text-neutral-400 text-xs">LeetCode DSA</p>
            </div>
          </motion.div>

          {/* Spline 3D Scene */}
          <div className="absolute inset-0 scale-[0.8] lg:scale-100 transition-transform duration-1000 ease-out origin-center">
             <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full object-contain"
              />
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-blue-500"
            animate={{ top: ['-50%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
        </div>
      </motion.div>

    </section>
  );
}
