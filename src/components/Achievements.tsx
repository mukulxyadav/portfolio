"use client";

import { motion } from "framer-motion";
import { resumeData } from "../data/resume";
import { useLeetCodeStats } from "../hooks/useLeetCodeStats";

const badgeColors: Record<string, string> = {
  NPTEL:          "badge",
  GeeksforGeeks:  "badge-green",
  "Competitive Ideathon": "badge-purple",
};

export default function Achievements() {
  const { certifications, leetcodeStats: defaultStats } = resumeData;
  const { stats: liveStats, loading, error, lastUpdated } = useLeetCodeStats();

  // Use live stats if available, otherwise fall back to default
  const displayStats = liveStats || defaultStats;

  return (
    <section id="achievements" className="py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-eyebrow">Credentials & Wins</div>
          <h2 className="display-2 text-white">Achievements</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Certs list */}
          <div className="lg:col-span-2">
            <h3 className="heading-2 text-white mb-6">Certifications</h3>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="card px-6 py-5 flex items-center gap-4"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: cert.color + "18" }}
                  >
                    {cert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{cert.title}</p>
                    {cert.description && (
                      <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">{cert.description}</p>
                    )}
                  </div>
                  <span className={badgeColors[cert.issuer] || "badge"}>
                    {cert.issuer}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right sidebar: LeetCode + stats */}
          <div className="space-y-6">
            {/* LeetCode Card with real-time stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card p-6 relative overflow-hidden"
            >
              {/* Loading shimmer effect */}
              {loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center text-orange-400 text-lg flex-shrink-0">
                  🏆
                </div>
                <div className="flex-1">
                  <h3 className="heading-2 text-white">LeetCode</h3>
                  <p className="text-xs text-neutral-600">
                    {loading ? "Updating..." : "Algorithmic Practice"}
                  </p>
                </div>
                {!loading && liveStats && (
                  <div 
                    className="w-2 h-2 rounded-full bg-green-500 animate-pulse"
                    title={`Live • Last updated: ${lastUpdated?.toLocaleTimeString()}`}
                  />
                )}
              </div>

              <div className="text-5xl font-black text-white mono mb-1">
                {displayStats.solved}
                <span className="text-blue-400 text-2xl">+</span>
              </div>
              <p className="text-sm text-neutral-500 mb-5">Problems Solved</p>

              {/* Show breakdown if live stats available */}
              {liveStats && (
                <div className="space-y-2 mb-5 pb-5 border-b border-neutral-700">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-400">Easy</span>
                    <span className="text-green-400 font-semibold">{liveStats.easy}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-400">Medium</span>
                    <span className="text-yellow-400 font-semibold">{liveStats.medium}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-400">Hard</span>
                    <span className="text-red-400 font-semibold">{liveStats.hard}</span>
                  </div>
                </div>
              )}

              {/* Topics/Skills */}
              <div className="space-y-2">
                {displayStats.topics?.map((t: string) => (
                  <div key={t} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span className="text-sm text-neutral-400">{t}</span>
                  </div>
                ))}
              </div>

              <a
                href={resumeData.leetcode}
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-full justify-center mt-6 interactive"
              >
                View LeetCode Profile
              </a>

              {/* Error indicator */}
              {error && !liveStats && (
                <p className="text-xs text-neutral-500 mt-3 text-center">
                  ⚠️ Using default data
                </p>
              )}
            </motion.div>

            {/* Quick numbers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card p-6 grid grid-cols-2 gap-4"
            >
              {[
                { value: "4",   label: "NPTEL Certs" },
                { value: "81h", label: "GFG DSA Course" },
                { value: "9.16", label: "CGPA" },
                { value: "2+",  label: "Projects Built" },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black text-white mono">{s.value}</div>
                  <div className="text-[10px] text-neutral-600 mt-0.5 font-bold uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
