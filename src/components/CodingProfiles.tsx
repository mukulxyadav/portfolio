"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiGithub, FiExternalLink, FiBarChart2 } from 'react-icons/fi';
import { resumeData } from '../data/resume.js';
import SpotlightCard from './SpotlightCard';

export default function CodingProfiles() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoverLc, setHoverLc] = useState(false);
  const [hoverGh, setHoverGh] = useState(false);

  const [stats, setStats] = useState({
    leetcode: { solved: resumeData.leetcodeStats.solved, ranking: '1.9M+', loading: true, error: false },
    github: { repos: 12, loading: true, error: false }
  });

  useEffect(() => {
    const fetchLeetCode = async () => {
      try {
        const response = await fetch('https://alfa-leetcode-api.onrender.com/mukulxyadav/solved');
        const data = await response.json();
        if (data.solvedProblem !== undefined) {
          setStats(prev => ({
            ...prev,
            leetcode: { 
              solved: data.solvedProblem, 
              ranking: 'Top 5%', // Example or fetch actual if available
              loading: false, 
              error: false 
            }
          }));
        }
      } catch (err) {
        setStats(prev => ({
          ...prev,
          leetcode: { ...prev.leetcode, loading: false, error: true }
        }));
      }
    };

    const fetchGitHub = async () => {
      try {
        const response = await fetch('https://api.github.com/users/mukulxyadav');
        const data = await response.json();
        if (data.public_repos !== undefined) {
          setStats(prev => ({
            ...prev,
            github: { repos: data.public_repos, loading: false, error: false }
          }));
        }
      } catch (err) {
        setStats(prev => ({
          ...prev,
          github: { ...prev.github, loading: false, error: true }
        }));
      }
    };

    fetchLeetCode();
    fetchGitHub();
  }, []);

  return (
    <section id="profiles" ref={ref} className="py-24 px-6 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-label">02 // coding_profiles</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Technical <span className="text-gradient-blue">Impact.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LeetCode Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SpotlightCard className="h-full">
              <a 
                href={resumeData.leetcode} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-10 block"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 text-2xl">
                      <FiCode />
                    </div>
                    <h3 className="text-xl font-bold text-white">LeetCode</h3>
                  </div>
                  <FiExternalLink className="text-neutral-500" />
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl font-bold text-white tracking-tighter">
                    {stats.leetcode.loading ? '...' : stats.leetcode.solved}
                  </span>
                  <span className="text-orange-500 font-bold text-xl">+</span>
                </div>
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-8">
                  Problems Solved
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-500">Ranking</span>
                    <span className="text-white">{stats.leetcode.ranking}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '85%' } : {}}
                      transition={{ duration: 1.5, delay: 0.8 }}
                      className="h-full bg-orange-500"
                    />
                  </div>
                </div>
              </a>
            </SpotlightCard>
          </motion.div>

          {/* GitHub Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SpotlightCard className="h-full">
              <a 
                href={resumeData.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-10 block"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 text-2xl">
                      <FiGithub />
                    </div>
                    <h3 className="text-xl font-bold text-white">GitHub</h3>
                  </div>
                  <FiExternalLink className="text-neutral-500" />
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl font-bold text-white tracking-tighter">
                    {stats.github.loading ? '...' : stats.github.repos}
                  </span>
                </div>
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-8">
                  Repositories
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-500">Activity Level</span>
                    <span className="text-white">Very Active</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '92%' } : {}}
                      transition={{ duration: 1.5, delay: 0.9 }}
                      className="h-full bg-purple-500"
                    />
                  </div>
                </div>
              </a>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
