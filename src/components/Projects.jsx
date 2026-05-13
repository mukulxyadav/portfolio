import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { FiExternalLink, FiFolder, FiGithub, FiLayers, FiX } from 'react-icons/fi';
import MagneticButton from './MagneticButton.jsx';
import { resumeData } from '../data/resume.js';

function ArchitectureModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="project-modal-backdrop"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 18, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 18, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        className="project-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="project-modal-close" onClick={onClose} aria-label="Close architecture view">
          <FiX />
        </button>

        <h3>{project.name} Architecture</h3>
        <p>High-level overview of the system architecture and data flow.</p>

        <div className="project-arch-grid">
          <div className="project-arch-node">
            <strong>Frontend / Client</strong>
            <span>React / Web3</span>
          </div>
          <div className="project-arch-node">
            <strong>API Gateway</strong>
            <span>Express / Java</span>
          </div>
          <div className="project-arch-node">
            <strong>Database</strong>
            <span>MySQL / IPFS</span>
          </div>
        </div>

        <div className="project-arch-note">
          <strong>Data Flow:</strong> The client authenticates via JWT and requests token transfers. The API validates
          transaction rules and persists ledger updates before emitting real-time events to clients.
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onOpenModal }) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef(null);

  const span = useMemo(() => {
    if (index === 0) return { desktop: 'span 7', mobile: 'span 12' };
    if (index === 1) return { desktop: 'span 5', mobile: 'span 12' };
    return { desktop: 'span 6', mobile: 'span 12' };
  }, [index]);

  const onMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    cardRef.current.style.setProperty('--rx', `${(0.5 - py) * 8}deg`);
    cardRef.current.style.setProperty('--ry', `${(px - 0.5) * 10}deg`);
  };

  const onLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--rx', '0deg');
    cardRef.current.style.setProperty('--ry', '0deg');
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 34, scale: 0.98, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.65, delay: index * 0.08 }}
      className="bento-project-item"
      style={{ gridColumn: span.desktop }}
    >
      <div
        ref={cardRef}
        className={`project-card premium-card interactive-target ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped((prev) => !prev)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div className="card-face glass project-front">
          <div className="project-visual">
            <div className="project-visual-gradient" style={{ '--project-color': project.color || '#6aa6ff' }} />
            <FiFolder size={28} />
            <span className="project-subtitle">{project.subtitle}</span>
          </div>

          <div className="project-content">
            <h3>{project.name}</h3>
            <p>{project.description}</p>

            <div className="project-badge-row">
              {project.stack.map((stackItem) => (
                <span key={stackItem} className="project-badge">
                  {stackItem}
                </span>
              ))}
            </div>

            <span className="project-tip">
              <FiExternalLink size={14} /> Click to reveal highlights
            </span>
          </div>
        </div>

        <div className="card-face card-back project-back">
          <h4>Highlights</h4>
          <div className="project-bullet-list">
            {project.bullets.map((bullet) => (
              <p key={bullet}>{bullet}</p>
            ))}
          </div>

          <div className="project-actions">
            <MagneticButton
              onClick={(event) => {
                event.stopPropagation();
                window.open(project.github, '_blank');
              }}
              className="project-action-btn"
            >
              <FiGithub size={15} />
              <span>Source</span>
            </MagneticButton>

            {project.name.includes('ShiftTokens') && (
              <MagneticButton
                onClick={(event) => {
                  event.stopPropagation();
                  onOpenModal(project);
                }}
                className="project-action-btn project-action-btn-accent"
              >
                <FiLayers size={15} />
                <span>Architecture</span>
              </MagneticButton>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [modalProject, setModalProject] = useState(null);

  return (
    <>
      <section id="projects" ref={ref} className="section-wrap">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.68 }}
            style={{ marginBottom: '3rem' }}
          >
            <div className="section-label">03 // projects</div>
            <h2 className="section-heading">
              What I&apos;ve <span className="gtext-warm">Built</span>
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="bento-project-grid">
            {resumeData.projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} onOpenModal={setModalProject} />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="bento-project-item premium-card glass coming-soon"
              style={{ gridColumn: 'span 12' }}
            >
              <h3>More projects loading</h3>
              <p>Currently iterating on production-grade backend systems and ML-powered mini tools.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {modalProject && <ArchitectureModal project={modalProject} onClose={() => setModalProject(null)} />}
      </AnimatePresence>
    </>
  );
}
