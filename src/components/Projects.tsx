"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resumeData } from "../data/resume";
import TiltCard from "./TiltCard";

const stackColors: Record<string, string> = {
  Java:    "#f59e0b",
  MySQL:   "#3b82f6",
  JDBC:    "#8b5cf6",
  Backend: "#10b981",
};

function StackTag({ name }: { name: string }) {
  const color = stackColors[name] || "#6b7280";
  return (
    <span
      className="px-2.5 py-1 rounded-lg text-[11px] font-bold"
      style={{ background: color + "18", color, border: `1px solid ${color}30` }}
    >
      {name}
    </span>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

interface ModalProps {
  project: typeof resumeData.projects[0];
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="card max-w-xl w-full p-8 relative overflow-hidden"
      >
        {/* Accent glow */}
        <div
          aria-hidden
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-[80px] pointer-events-none opacity-30"
          style={{ background: project.color }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-6 relative z-10">
          <div>
            <h3 className="heading-1 text-white mb-1">{project.name}</h3>
            <p className="text-sm text-neutral-400">{project.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors interactive"
          >
            ✕
          </button>
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map(s => <StackTag key={s} name={s} />)}
        </div>

        <p className="body-md mb-6">{project.description}</p>

        {/* Bullets */}
        <ul className="space-y-3 mb-8">
          {project.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm text-neutral-400 leading-relaxed">
              <span className="text-blue-500 mt-0.5 flex-shrink-0">▹</span>
              {b}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="btn-primary flex-1 justify-center interactive"
          >
            <GitHubIcon />
            View on GitHub
          </a>
          <button
            onClick={onClose}
            className="btn-secondary interactive"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { projects } = resumeData;
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  return (
    <>
      <section id="projects" className="py-28 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-8"
          >
            <div>
              <div className="section-eyebrow">What I&apos;ve Built</div>
              <h2 className="display-2 text-white">Featured Projects</h2>
            </div>
            <p className="body-md max-w-xs">
              End-to-end backend applications built with Java &amp; MySQL.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.15, ease: [0.22,1,0.36,1] }}
              >
              <TiltCard
                glowColor={project.color.replace("#","").match(/.{2}/g)?.map(h=>parseInt(h,16)).join(",") || "59,130,246"}
                className="card p-7 group cursor-pointer w-full"
              >
              <div
                className="relative overflow-hidden rounded-2xl"
                onClick={() => setSelected(project)}
              >
                {/* Hover glow */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}12, transparent 70%)` }}
                />

                {/* Number + links */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <span className="mono text-sm font-bold text-neutral-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-neutral-500 hover:text-white transition-colors interactive"
                    >
                      <GitHubIcon />
                    </a>
                    <button
                      onClick={() => setSelected(project)}
                      className="text-neutral-500 hover:text-white transition-colors interactive"
                    >
                      <ExternalIcon />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="heading-1 text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-neutral-500 mb-5">{project.subtitle}</p>
                  <p className="body-md text-sm mb-6 line-clamp-3">{project.description}</p>

                  {/* Bullets preview */}
                  <ul className="space-y-2 mb-6">
                    {project.bullets.slice(0, 2).map((b, bi) => (
                      <li key={bi} className="flex gap-2 text-[13px] text-neutral-500 leading-snug">
                        <span className="text-blue-500 flex-shrink-0">▹</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5 pt-5 border-t border-white/5">
                    {project.stack.map(s => <StackTag key={s} name={s} />)}
                  </div>
                </div>

                {/* "See more" prompt */}
                <div className="mt-5 flex items-center gap-1.5 text-[12px] text-neutral-600 group-hover:text-blue-400 transition-colors relative z-10">
                  <span>Click to see full details</span>
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </div>
              </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <a
              href={resumeData.github}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary interactive"
            >
              <GitHubIcon />
              View All on GitHub
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
