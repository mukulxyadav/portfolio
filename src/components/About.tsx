"use client";

import { motion, Variants } from "framer-motion";
import { resumeData } from "../data/resume";
import { useLeetCodeStats } from "../hooks/useLeetCodeStats";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const skillColors: Record<string, string> = {
  Languages: "#3b82f6",
  Frontend:  "#8b5cf6",
  Backend:   "#10b981",
  Database:  "#f59e0b",
  Tools:     "#6b7280",
};

export default function About() {
  const { education, skills } = resumeData;
  const { stats: leetcodeStats } = useLeetCodeStats();
  const edu = education[0];

  const facts = [
    { icon: "📍", label: "Location",    value: "India" },
    { icon: "🎓", label: "University",  value: "SRM Institute" },
    { icon: "📊", label: "CGPA",        value: edu.cgpa },
    { icon: "💻", label: "LeetCode",    value: `${leetcodeStats?.solved || resumeData.leetcodeStats.solved}+ Problems Solved` },
    { icon: "📧", label: "Email",       value: resumeData.email },
    { icon: "🚀", label: "Status",      value: "Open to Internships" },
  ];

  return (
    <section id="about" className="py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-eyebrow">About Me</div>
          <h2 className="display-2 text-white">Who I Am</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* BIO */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 space-y-8"
          >
            <p className="body-lg leading-[1.85]">
              I&apos;m <span className="text-white font-semibold">Mukul Kumar</span>, a second-year 
              <span className="text-blue-400"> B.Tech Computer Science </span> student at{" "}
              <span className="text-white font-semibold">SRM Institute of Science and Technology</span>, 
              maintaining a strong academic record with a{" "}
              <span className="text-white font-semibold">9.16 CGPA</span>.
            </p>
            <p className="body-lg leading-[1.85]">
              I have strong foundations in <span className="text-white">C, C++, Java, and Python</span>, 
              with a focus on backend development and database-driven applications. I actively practice 
              data structures and algorithms on LeetCode and have completed multiple certification 
              programs to deepen my engineering knowledge.
            </p>

            {/* Education card */}
            <div className="card p-6 lg:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-xl flex-shrink-0">
                  🎓
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="heading-2 text-white">{edu.institution}</h3>
                      <p className="text-sm text-neutral-400 mt-0.5">{edu.degree}</p>
                    </div>
                    <span className="badge">CGPA: {edu.cgpa}</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-3 font-mono">{edu.period}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {edu.courses.map(c => (
                      <span key={c} className="skill-tag text-xs">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick facts */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {facts.map((f, i) => (
              <motion.div
                key={f.label}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="card px-5 py-4 flex items-center gap-4"
              >
                <span className="text-xl">{f.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="label text-neutral-600">{f.label}</div>
                  <div className="text-sm font-medium text-white mt-0.5 truncate">{f.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
