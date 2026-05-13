import { useRef } from 'react';
import { motion, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { resumeData } from '../data/resume.js';
import { FiCode, FiDatabase, FiLayout, FiTerminal, FiTool } from 'react-icons/fi';

const CAT_ICONS = {
  Languages: <FiCode />,
  Frontend: <FiLayout />,
  Backend: <FiTerminal />,
  Database: <FiDatabase />,
  Tools: <FiTool />,
};

const CAT_COLORS = {
  Languages: '#7c6dfa',
  Frontend: '#f472b6',
  Backend: '#22d3ee',
  Database: '#fb923c',
  Tools: '#34d399',
};

function TiltCard({ children, catIdx }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: catIdx * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200,
        position: 'relative',
        zIndex: 1
      }}
    >
      <div 
        className="glass"
        style={{ 
          padding: '2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%', 
          transform: "translateZ(40px)",
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          borderRadius: '16px'
        }}
      >
         {children}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" ref={ref} className="section-wrap">
      <div className="container" style={{ perspective: '2000px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '4rem', textAlign: 'center' }}
        >
          <div className="section-label">02 // tech_stack</div>
          <h2 className="section-heading">
            My <span className="gtext-green">Skills</span>
          </h2>
          <div className="section-divider" style={{ margin: '1rem auto' }} />
          <p style={{ color: 'var(--text-3)', maxWidth: 500, margin: '0 auto', fontSize: '0.95rem' }}>
            Technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {Object.entries(resumeData.skills).map(([category, skills], catIdx) => {
            const color = CAT_COLORS[category] || '#7c6dfa';
            return (
              <TiltCard key={category} catIdx={catIdx}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', transform: "translateZ(20px)" }}>
                  <div style={{
                    width: 45, height: 45, borderRadius: 12,
                    background: `${color}20`, border: `1px solid ${color}50`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color, fontSize: '1.4rem',
                    boxShadow: `0 0 15px ${color}30`
                  }}>
                    {CAT_ICONS[category]}
                  </div>
                  <h3 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '1.2rem', fontWeight: 700, color: '#fff',
                    letterSpacing: '0.05em'
                  }}>{category}</h3>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', flex: 1, alignContent: 'flex-start', transform: "translateZ(30px)" }}>
                  {skills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.15, y: -5, boxShadow: `0 10px 20px ${color}40` }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '20px', 
                        padding: '8px 16px',
                        fontSize: '0.85rem', color: '#e4e4e7',
                        fontWeight: 500,
                        transition: 'border-color 0.3s, color 0.3s',
                        cursor: 'pointer',
                        backdropFilter: 'blur(4px)'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = color;
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.background = `linear-gradient(135deg, ${color}30, ${color}10)`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.color = '#e4e4e7';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))';
                      }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
