"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiCode, FiUser, FiAward, FiLayers } from "react-icons/fi";
import { resumeData } from "../data/resume";
import SpotlightCard from "./SpotlightCard";
import SectionWrapper from "./SectionWrapper";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function BentoGrid() {
  return (
    <SectionWrapper id="work" className="py-32 px-6 bg-black">
      <div className="container mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-32"
        >
          {/* Education & Experience Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <motion.div variants={cardVariants} id="about" className="md:col-span-12">
               <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.5em] mb-4">01 // Background</h2>
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2">
                   <h3 className="text-4xl font-bold text-white mb-6">Education</h3>
                   <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                          <h4 className="text-2xl font-bold text-white">{resumeData.education[0].institution}</h4>
                          <p className="text-blue-400 font-mono text-sm">{resumeData.education[0].degree}</p>
                        </div>
                        <span className="text-neutral-500 font-mono text-xs uppercase tracking-widest">{resumeData.education[0].period}</span>
                     </div>
                     <p className="text-neutral-400 leading-relaxed">
                        Currently focusing on data structures, algorithms, and system design. 
                        Maintaining a high academic standard while actively building real-world projects.
                     </p>
                   </div>
                 </div>
                 
                 <div className="lg:col-span-1">
                   <h3 className="text-4xl font-bold text-white mb-6">Core Stats</h3>
                   <div className="grid grid-cols-1 gap-4">
                     <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-between">
                        <span className="text-neutral-500 font-mono text-xs uppercase tracking-widest">CGPA</span>
                        <span className="text-2xl font-bold text-white">9.16</span>
                     </div>
                     <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-between">
                        <span className="text-neutral-500 font-mono text-xs uppercase tracking-widest">DSA Solved</span>
                        <span className="text-2xl font-bold text-white">74+</span>
                     </div>
                   </div>
                 </div>
               </div>
            </motion.div>
          </div>

          {/* Projects Section */}
          <div className="space-y-12">
            <motion.div variants={cardVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-12">
              <div>
                <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.5em] mb-4">02 // Portfolio</h2>
                <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">Featured Projects</h3>
              </div>
              <p className="text-neutral-500 max-w-xs text-sm leading-relaxed">
                A selection of my recent engineering work, focusing on performance and scalability.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resumeData.projects.map((project, index) => (
                <motion.div key={project.name} variants={cardVariants} className="group">
                  <SpotlightCard className="h-full">
                    <div className="p-8 md:p-12 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map(s => (
                            <span key={s} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-bold text-neutral-500 uppercase tracking-tighter">
                              {s}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-neutral-500">
                          <a href={project.github} target="_blank" className="hover:text-white transition-colors interactive"><FiGithub size={18} /></a>
                          <a href="#" className="hover:text-white transition-colors interactive"><FiExternalLink size={18} /></a>
                        </div>
                      </div>

                      <h4 className="text-3xl font-bold text-white mb-6 group-hover:text-blue-500 transition-colors">{project.name}</h4>
                      <p className="text-neutral-400 leading-relaxed mb-8 flex-1">
                        {project.description}
                      </p>

                      <ul className="space-y-3 mb-10">
                        {project.bullets.slice(0, 2).map((bullet, i) => (
                          <li key={i} className="flex gap-3 text-sm text-neutral-500 leading-snug">
                            <span className="text-blue-500 mt-1">▹</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      <div className="pt-8 border-t border-white/5 mt-auto">
                        <a href={project.github} target="_blank" className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest group/btn interactive">
                          View Technical Specs <FiExternalLink className="group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills Section (Practical Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12" id="skills">
            <motion.div variants={cardVariants} className="md:col-span-12">
               <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.5em] mb-4">03 // Expertise</h2>
               <h3 className="text-4xl font-bold text-white mb-12">Technical Skills</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {/* This would ideally map over grouped skills in resumeData */}
                 <div className="space-y-6">
                    <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest border-b border-white/5 pb-4">Languages</h4>
                    <div className="flex flex-wrap gap-3">
                      {['Java', 'JavaScript', 'TypeScript', 'C++', 'SQL'].map(s => (
                        <span key={s} className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white">{s}</span>
                      ))}
                    </div>
                 </div>
                 <div className="space-y-6">
                    <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest border-b border-white/5 pb-4">Backend</h4>
                    <div className="flex flex-wrap gap-3">
                      {['Spring Boot', 'Node.js', 'Express', 'MySQL', 'MongoDB'].map(s => (
                        <span key={s} className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white">{s}</span>
                      ))}
                    </div>
                 </div>
                 <div className="space-y-6">
                    <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest border-b border-white/5 pb-4">Engineering</h4>
                    <div className="flex flex-wrap gap-3">
                      {['DSA', 'OOP', 'System Design', 'Git', 'REST APIs'].map(s => (
                        <span key={s} className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white">{s}</span>
                      ))}
                    </div>
                 </div>
               </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
