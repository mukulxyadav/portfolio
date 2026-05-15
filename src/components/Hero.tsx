"use client";

import { motion, Variants } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { resumeData } from "../data/resume";
import { useLeetCodeStats } from "../hooks/useLeetCodeStats";

// Framer Motion fade-up variant
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
  }),
};

const stat = (label: string, value: string, sub?: string) => ({ label, value, sub });

export default function Hero() {
  const { stats: leetcodeStats } = useLeetCodeStats();
  
  const stats = [
    stat("CGPA", "9.16", "/ 10.0"),
    stat("LeetCode", `${leetcodeStats?.solved || resumeData.leetcodeStats.solved}+`, "Problems"),
    stat("Certs", "5+", "Completed"),
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-start justify-center"
      >
        <div className="w-[700px] h-[500px] rounded-full bg-blue-600/10 blur-[160px] mt-[-80px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: TEXT ── */}
          <div>
            {/* Availability badge */}
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="show"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/20 bg-green-500/8 mb-8 badge-pulse"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] font-bold text-green-400 uppercase tracking-widest">
                Available for Internships
              </span>
            </motion.div>

            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="show"
              className="display-1 text-white mb-6"
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text">{resumeData.name.split(" ")[0]}</span>
              <span className="gradient-text">{" " + resumeData.name.split(" ").slice(1).join(" ")}</span>
            </motion.h1>

            <motion.div
              custom={2} variants={fadeUp} initial="hidden" animate="show"
              className="flex items-center gap-3 mb-6"
            >
              <div className="accent-line" />
              <span className="text-neutral-400 font-semibold text-lg">
                <TypeAnimation
                  sequence={[
                    "Backend Developer", 2500,
                    "Problem Solver",    2500,
                    "CS Student @ SRM",  2500,
                  ]}
                  repeat={Infinity}
                />
              </span>
            </motion.div>

            <motion.p
              custom={3} variants={fadeUp} initial="hidden" animate="show"
              className="body-lg max-w-xl mb-10"
            >
              {resumeData.summary}
            </motion.p>

            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="show"
              className="flex flex-wrap gap-4"
            >
              <a href="#projects" className="btn-primary interactive">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                View Projects
              </a>
              <a href="#contact" className="btn-secondary interactive">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Me
              </a>
            </motion.div>

            {/* Social row */}
            <motion.div
              custom={5} variants={fadeUp} initial="hidden" animate="show"
              className="flex items-center gap-6 mt-8"
            >
              {[
                { label: "GitHub",   href: resumeData.github },
                { label: "LinkedIn", href: resumeData.linkedin },
                { label: "LeetCode", href: resumeData.leetcode },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors interactive"
                >
                  {s.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: STATS CARD ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div className="glass rounded-2xl p-8 border border-white/6 relative overflow-hidden">
              {/* Card glow */}
              <div
                aria-hidden
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-blue-600/15 blur-[80px] pointer-events-none"
              />

              {/* Identity block */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-black text-white select-none">
                  MK
                </div>
                <div>
                  <p className="font-bold text-white text-lg leading-tight">{resumeData.name}</p>
                  <p className="text-sm text-neutral-400 mt-0.5">Computer Science & Engineering</p>
                  <p className="text-xs text-neutral-600 mt-0.5">SRM Institute • 2024 – Present</p>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {stats.map((s, i) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-black text-white mono">{s.value}</div>
                    <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider mt-1">{s.label}</div>
                    {s.sub && <div className="text-[10px] text-neutral-700">{s.sub}</div>}
                  </div>
                ))}
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {["Java", "C++", "MySQL", "Python", "Git"].map(tag => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>

              {/* Status row */}
              <div className="mt-6 flex items-center justify-between text-[11px] text-neutral-600">
                <span className="font-bold uppercase tracking-widest">Status</span>
                <span className="flex items-center gap-1.5 text-green-500 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Open to opportunities
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-700 pointer-events-none"
        >
          <span className="label text-[9px]">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-blue-600 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
