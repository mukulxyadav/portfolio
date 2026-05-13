import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { resumeData } from '../data/resume.js';

const ICON_COLORS = {
  '🎓': '#7c6dfa',
  '💻': '#22d3ee',
  '🏆': '#f472b6',
};

function AchievementItem({ cert, index }) {
  const isLeft = index % 2 === 0;
  const color = ICON_COLORS[cert.icon] || cert.color || '#7c6dfa';

  const card = (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="glass premium-card"
      style={{ padding: '1.3rem', maxWidth: 400, width: '100%', position: 'relative' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            flexShrink: 0,
            background: `${color}1f`,
            border: `1px solid ${color}58`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem',
          }}
        >
          {cert.icon}
        </div>

        <div>
          <h4 style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.22rem', lineHeight: 1.4 }}>{cert.title}</h4>
          <p style={{ color, fontSize: '0.8rem', fontFamily: 'Fira Code, monospace', marginBottom: cert.description ? '0.5rem' : 0 }}>
            {cert.issuer} {cert.period ? ` // ${cert.period}` : ''}
          </p>
          {cert.description && <p style={{ color: 'var(--text-3)', fontSize: '0.84rem', lineHeight: 1.55 }}>{cert.description}</p>}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="achievement-row">
      <div className="achievement-column left">{isLeft ? card : null}</div>

      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.07 + 0.2, type: 'spring' }}
        className="tl-dot"
        style={{ background: color, boxShadow: `0 0 12px ${color}85` }}
      />

      <div className="achievement-column right">{isLeft ? null : card}</div>
    </div>
  );
}

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="achievements" ref={ref} className="section-wrap">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          style={{ marginBottom: '4rem', textAlign: 'center' }}
        >
          <div className="section-label">04 // achievements</div>
          <h2 className="section-heading">
            Certs & <span className="gtext-warm">Wins</span>
          </h2>
          <div className="section-divider" style={{ margin: '1rem auto' }} />
        </motion.div>

        <div style={{ position: 'relative', maxWidth: 940, margin: '0 auto' }}>
          <motion.div
            className="tl-line"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            {resumeData.certifications.map((cert, index) => (
              <AchievementItem key={`${cert.title}-${index}`} cert={cert} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
