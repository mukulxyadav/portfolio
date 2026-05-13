import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiAward, FiBook, FiCode } from 'react-icons/fi';
import { resumeData } from '../data/resume.js';

const fadeUp = {
  hidden: { opacity: 0, y: 34, scale: 0.98 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: index * 0.12, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function StatCard({ icon, value, label, color }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="glass premium-card"
      style={{ padding: '1.2rem', textAlign: 'center' }}
    >
      <div style={{ fontSize: '1.65rem', marginBottom: '0.65rem', color, display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1.1 }}>{value}</div>
      <div style={{ color: 'var(--text-3)', fontSize: '0.76rem', marginTop: '0.2rem', fontFamily: 'Fira Code, monospace' }}>{label}</div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const edu = resumeData.education[0];

  return (
    <section id="about" ref={ref} className="section-wrap">
      <div className="container">
        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0} style={{ marginBottom: '3rem' }}>
          <div className="section-label">01 // about_me</div>
          <h2 className="section-heading">
            Who I <span className="gtext">Am</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="about-grid">
          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} custom={1}>
            <div className="glass premium-card" style={{ padding: '2.1rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 14,
                    background: 'var(--bg-2)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: '#fff',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  MK
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>Mukul Kumar</h3>
                  <p style={{ color: 'var(--primary)', fontSize: '0.82rem', fontFamily: 'Fira Code, monospace' }}>@mukulkumar</p>
                </div>
              </div>

              <p style={{ color: 'var(--text-2)', lineHeight: 1.75, fontSize: '0.94rem', flex: 1, marginBottom: '1.6rem' }}>{resumeData.summary}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {['Backend Dev', 'Java', 'MySQL', 'LeetCode'].map((tag) => (
                  <span
                    key={tag}
                    className="interactive-target"
                    style={{
                      background: 'var(--primary-dim)',
                      border: '1px solid var(--border)',
                      borderRadius: 100,
                      padding: '6px 13px',
                      fontSize: '0.74rem',
                      color: '#b8b6ff',
                      fontWeight: 500,
                      fontFamily: 'Fira Code, monospace',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} custom={2}>
              <div className="glass premium-card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
                  <div style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>
                    <FiBook />
                  </div>
                  <h3 style={{ color: '#fff', fontWeight: 600, fontSize: '1.05rem' }}>Education</h3>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.38)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.35rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '0.4rem' }}>
                    <h4 style={{ color: '#fff', fontWeight: 600, fontSize: '0.93rem', lineHeight: 1.35 }}>{edu.degree}</h4>
                    <span
                      style={{
                        background: 'rgba(89,227,200,0.12)',
                        color: '#59e3c8',
                        fontSize: '0.68rem',
                        padding: '4px 10px',
                        borderRadius: 999,
                        fontWeight: 600,
                        border: '1px solid rgba(89,227,200,0.28)',
                        flexShrink: 0,
                      }}
                    >
                      {edu.period}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-3)', fontSize: '0.84rem', marginBottom: '0.95rem' }}>{edu.institution}</p>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.78rem' }}>
                      <span style={{ color: 'var(--text-3)' }}>CGPA</span>
                      <span style={{ fontWeight: 700, color: '#59e3c8' }}>{edu.cgpa}</span>
                    </div>
                    <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: '91.6%' } : {}}
                        transition={{ duration: 1.3, delay: 0.4, ease: 'easeOut' }}
                        style={{ height: '100%', background: 'linear-gradient(90deg, #5b88ff, #59e3c8)', borderRadius: 2 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="about-stats-grid">
              <StatCard icon={<FiAward />} value="9.16" label="CGPA" color="#5b88ff" />
              <StatCard icon={<FiCode />} value="46+" label="LeetCode" color="#59e3c8" />
              <StatCard icon={<span style={{ fontSize: '1.3rem' }}>📜</span>} value="4+" label="NPTEL" color="#f7b86e" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
