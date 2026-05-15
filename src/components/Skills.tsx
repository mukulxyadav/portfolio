"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { resumeData } from "../data/resume";
import { useLeetCodeStats } from "../hooks/useLeetCodeStats";

const categoryConfig: Record<string, { color: string; badgeClass: string; icon: string }> = {
  Languages: { color: "#3b82f6", badgeClass: "badge",        icon: "{ }" },
  Frontend:  { color: "#8b5cf6", badgeClass: "badge-purple", icon: "<>" },
  Backend:   { color: "#10b981", badgeClass: "badge-green",  icon: "⚙" },
  Database:  { color: "#f59e0b", badgeClass: "badge",        icon: "🗄" },
  Tools:     { color: "#6b7280", badgeClass: "badge",        icon: "🛠" },
};

export default function Skills() {
  const { skills } = resumeData;
  const { stats: leetcodeStats, loading } = useLeetCodeStats();
  const categories = Object.entries(skills) as [string, string[]][];

  const displayStats = leetcodeStats || resumeData.leetcodeStats;

  return (
    <section id="skills" className="py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-eyebrow">Technical Expertise</div>
          <h2 className="display-2 text-white">Skills & Tools</h2>
          <p className="body-lg max-w-lg mt-4">
            Technologies I work with, organized by category.
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(([category, items], catIdx) => {
            const config = categoryConfig[category] || { color: "#6b7280", badgeClass: "badge", icon: "●" };
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: catIdx * 0.08 }}
                className="card p-6"
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black"
                    style={{ background: config.color + "18", color: config.color }}
                  >
                    {config.icon}
                  </div>
                  <div>
                    <h3 className="heading-2 text-white">{category}</h3>
                    <p className="text-[11px] text-neutral-600">{items.length} item{items.length !== 1 ? "s" : ""}</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <span
                      key={skill}
                      className="skill-tag"
                      style={{
                        borderColor: config.color + "30",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* DSA Progress card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: categories.length * 0.08 }}
            className="card p-6 sm:col-span-2 lg:col-span-1 relative overflow-hidden"
          >
            {/* Shimmer loading */}
            {loading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
            )}

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center text-orange-400 text-sm font-black">
                🏆
              </div>
              <div>
                <h3 className="heading-2 text-white">DSA Progress</h3>
                <p className="text-[11px] text-neutral-600">LeetCode activity</p>
              </div>
            </div>

            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="text-3xl font-black text-white mono">
                  <CountUp end={displayStats.solved} duration={2} />
                  <span className="text-blue-400 text-xl ml-0.5">+</span>
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">Problems Solved</div>
              </div>
              <a href={resumeData.leetcode} target="_blank" rel="noreferrer"
                className="text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-colors interactive">
                View Profile →
              </a>
            </div>

            {/* Mini breakdown */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="bg-white/3 rounded-lg py-2 px-3 border border-white/5">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-0.5">Easy</div>
                <div className="text-sm font-bold text-green-500">{displayStats.easySolved}</div>
              </div>
              <div className="bg-white/3 rounded-lg py-2 px-3 border border-white/5">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-0.5">Med</div>
                <div className="text-sm font-bold text-yellow-500">{displayStats.mediumSolved}</div>
              </div>
              <div className="bg-white/3 rounded-lg py-2 px-3 border border-white/5">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-0.5">Hard</div>
                <div className="text-sm font-bold text-red-500">{displayStats.hardSolved}</div>
              </div>
            </div>

            {/* Topic chips */}
            <div className="flex flex-wrap gap-2">
              {displayStats.topics.map(t => (
                <span key={t} className="skill-tag text-[11px] py-1">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
