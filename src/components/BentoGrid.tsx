"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiCode, FiUser, FiAward } from "react-icons/fi";
import { resumeData } from "../data/resume";
import SpotlightCard from "./SpotlightCard";
import SectionWrapper from "./SectionWrapper";

export default function BentoGrid() {
  const [stats, setStats] = useState({
    leetcode: { solved: 74, loading: true },
    github: { repos: 1, loading: true }
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [lcRes, ghRes] = await Promise.all([
          fetch('https://alfa-leetcode-api.onrender.com/mukulxyadav/solved'),
          fetch('https://api.github.com/users/mukulxyadav')
        ]);
        const lcData = await lcRes.json();
        const ghData = await ghRes.json();
        
        setStats({
          leetcode: { solved: lcData.solvedProblem || 74, loading: false },
          github: { repos: ghData.public_repos || 1, loading: false }
        });
      } catch (e) {
        setStats(prev => ({ ...prev, leetcode: { ...prev.leetcode, loading: false }, github: { ...prev.github, loading: false } }));
      }
    };
    fetchStats();
  }, []);

  return (
    <SectionWrapper id="work" className="py-24 px-6 bg-neutral-950">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Main About Card */}
          <SpotlightCard className="md:col-span-8 flex interactive">
            <div className="p-10 flex flex-col justify-between overflow-hidden relative group w-full h-full">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-6">
                  <FiUser /> About Me
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6 leading-tight">
                  Crafting robust <br/> <span className="text-neutral-500">backend architectures.</span>
                </h2>
                <p className="text-neutral-400 max-w-xl text-lg leading-relaxed">
                  {resumeData.summary}
                </p>
              </div>
              
              <div className="mt-12 flex gap-4">
                <div className="glass px-6 py-3 rounded-2xl">
                  <div className="text-2xl font-bold text-white">9.16</div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">CGPA</div>
                </div>
                <div className="glass px-6 py-3 rounded-2xl">
                  <div className="text-2xl font-bold text-white">{stats.leetcode.loading ? '...' : stats.leetcode.solved}+</div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">LeetCode</div>
                </div>
                <div className="glass px-6 py-3 rounded-2xl">
                  <div className="text-2xl font-bold text-white">{stats.github.loading ? '...' : stats.github.repos}</div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Public Repos</div>
                </div>
              </div>

              {/* Decorative Background Element */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-150" />
            </div>
          </SpotlightCard>

          {/* Education Card */}
          <SpotlightCard className="md:col-span-4 flex interactive">
            <div className="p-10 flex flex-col justify-between w-full h-full">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-6">
                  <FiAward /> Education
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{resumeData.education[0].institution}</h3>
                <p className="text-sm text-neutral-500 mb-4">{resumeData.education[0].degree}</p>
              </div>
              <div className="text-neutral-400 text-sm italic">
                {resumeData.education[0].period}
              </div>
            </div>
          </SpotlightCard>

          {/* Projects Loop */}
          {resumeData.projects.map((project, index) => (
            <SpotlightCard key={project.name} className="md:col-span-6 flex interactive">
              <div className={`p-10 flex flex-col justify-between group overflow-hidden relative w-full h-full`}>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-2">
                      {project.stack.map(s => (
                        <span key={s} className="text-[10px] font-bold text-neutral-500 border border-white/5 bg-white/5 px-2 py-1 rounded-md uppercase tracking-tighter">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a href={project.github} className="text-neutral-500 hover:text-white transition-colors interactive"><FiGithub size={20}/></a>
                      <a href="#" className="text-neutral-500 hover:text-white transition-colors interactive"><FiExternalLink size={20}/></a>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{project.name}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          ))}

          {/* Skills Mini Card */}
          <SpotlightCard className="md:col-span-12 flex interactive">
            <div className="p-10 flex flex-col md:flex-row items-center justify-between gap-8 w-full h-full">
              <div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-bold text-green-400 uppercase tracking-widest mb-6">
                  <FiCode /> Stack
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tighter">Modern Tech Stack</h2>
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-w-xl">
                {Object.values(resumeData.skills).flat().map(skill => (
                  <span key={skill} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 text-sm font-medium hover:border-white/20 hover:text-white transition-all cursor-default interactive">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>

        </div>
      </div>
    </SectionWrapper>
  );
}
