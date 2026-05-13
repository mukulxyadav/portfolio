import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiGithub, FiExternalLink } from 'react-icons/fi';
import { resumeData } from '../data/resume.js';

export default function CodingProfiles() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoverLc, setHoverLc] = useState(false);
  const [hoverGh, setHoverGh] = useState(false);

  // Stats State
  const [stats, setStats] = useState({
    leetcode: { solved: resumeData.leetcodeStats.solved, ranking: '1.9M+', loading: true, error: false },
    github: { repos: 12, loading: true, error: false }
  });

  useEffect(() => {
    // Fetch LeetCode Data
    const fetchLeetCode = async () => {
      try {
        const response = await fetch('https://alfa-leetcode-api.onrender.com/mukulxyadav/profile');
        const data = await response.json();
        if (data.totalSolved !== undefined) {
          setStats(prev => ({
            ...prev,
            leetcode: { 
              solved: data.totalSolved, 
              ranking: data.ranking > 1000000 ? `${(data.ranking / 1000000).toFixed(1)}M` : data.ranking.toLocaleString(),
              loading: false, 
              error: false 
            }
          }));
        } else {
          throw new Error('Failed to fetch');
        }
      } catch (err) {
        setStats(prev => ({
          ...prev,
          leetcode: { ...prev.leetcode, loading: false, error: true }
        }));
      }
    };

    // Fetch GitHub Data
    const fetchGitHub = async () => {
      try {
        const response = await fetch('https://api.github.com/users/mukulxyadav');
        const data = await response.json();
        if (data.public_repos !== undefined) {
          setStats(prev => ({
            ...prev,
            github: { repos: data.public_repos, loading: false, error: false }
          }));
        } else {
          throw new Error('Failed to fetch');
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
    <section id="profiles" ref={ref} className="section-wrap">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '4rem', textAlign: 'center' }}
        >
          <div className="section-label">05 // code_stats</div>
          <h2 className="section-heading">
            Developer <span className="gtext">Profiles</span>
          </h2>
          <div className="section-divider" style={{ margin: '1rem auto' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* LeetCode Card */}
          <motion.a
            href={resumeData.leetcode} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            onMouseEnter={() => setHoverLc(true)} onMouseLeave={() => setHoverLc(false)}
            className="glass"
            style={{ padding: '2.5rem', display: 'block', textDecoration: 'none', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, background: 'rgba(255,161,22,0.05)', borderRadius: '50%', filter: 'blur(30px)' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 12,
                  background: 'rgba(255,161,22,0.1)', border: '1px solid rgba(255,161,22,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', color: '#ffa116',
                }}><FiCode /></div>
                <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600 }}>LeetCode</h3>
              </div>
              <motion.div animate={{ x: hoverLc ? 5 : 0, y: hoverLc ? -5 : 0, color: hoverLc ? '#ffa116' : 'rgba(255,255,255,0.3)' }}>
                <FiExternalLink size={20} />
              </motion.div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1 }}>
                {stats.leetcode.loading ? '...' : stats.leetcode.solved}
              </span>
              <span style={{ color: '#ffa116', fontSize: '1.25rem', fontWeight: 700 }}>+</span>
            </div>
            <p style={{ color: 'var(--text-3)', fontSize: '0.9rem', fontFamily: 'Fira Code, monospace' }}>
              {stats.leetcode.error ? 'Stats Unavailable' : 'Problems Solved'}
            </p>

            <div style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-2)' }}>
                <span>Global Rank</span>
                <span>{stats.leetcode.loading ? '...' : stats.leetcode.ranking}</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }} animate={isInView ? { width: stats.leetcode.loading ? '0%' : '65%' } : {}}
                  transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                  style={{ height: '100%', background: '#ffa116' }}
                />
              </div>
            </div>
          </motion.a>

          {/* GitHub Card */}
          <motion.a
            href={resumeData.github} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onMouseEnter={() => setHoverGh(true)} onMouseLeave={() => setHoverGh(false)}
            className="glass"
            style={{ padding: '2.5rem', display: 'block', textDecoration: 'none', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, background: 'rgba(124,109,250,0.05)', borderRadius: '50%', filter: 'blur(30px)' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 12,
                  background: 'rgba(124,109,250,0.1)', border: '1px solid rgba(124,109,250,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', color: '#7c6dfa',
                }}><FiGithub /></div>
                <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600 }}>GitHub</h3>
              </div>
              <motion.div animate={{ x: hoverGh ? 5 : 0, y: hoverGh ? -5 : 0, color: hoverGh ? '#7c6dfa' : 'rgba(255,255,255,0.3)' }}>
                <FiExternalLink size={20} />
              </motion.div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1 }}>
                {stats.github.loading ? '...' : stats.github.repos}
              </span>
            </div>
            <p style={{ color: 'var(--text-3)', fontSize: '0.9rem', fontFamily: 'Fira Code, monospace' }}>
              {stats.github.error ? 'Stats Unavailable' : 'Repositories'}
            </p>

            <div style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-2)' }}>
                <span>Contributions</span>
                <span>Active</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }} animate={isInView ? { width: '80%' } : {}}
                  transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
                  style={{ height: '100%', background: '#7c6dfa' }}
                />
              </div>
            </div>
          </motion.a>

        </div>
      </div>
    </section>
  );
}
