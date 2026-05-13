import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiFileText, FiGithub, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';
import MagneticButton from './MagneticButton.jsx';
import { resumeData } from '../data/resume.js';

const socialLinks = [
  { href: resumeData.github, icon: FiGithub, label: 'GitHub' },
  { href: resumeData.linkedin, icon: FiLinkedin, label: 'LinkedIn' },
  { href: resumeData.twitter, icon: FiTwitter, label: 'Twitter' },
  { href: resumeData.instagram, icon: FiInstagram, label: 'Instagram' },
];

export default function Hero() {
  return (
    <section id="hero" className="hero-shell">
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />

      <div className="hero-overlay">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hero-content"
        >
          <div className="hero-parallax">
            <p className="hero-kicker">Open To Internship Opportunities</p>

            <h1 className="hero-title">
              <span className="hero-name-gradient">Mukul Kumar</span>
              <span className="hero-title-sub">Building reliable backend systems with clean engineering fundamentals.</span>
            </h1>

            <div className="hero-type-line" aria-live="polite">
              <TypeAnimation
                sequence={['Backend Developer', 1800, 'Java + MySQL Builder', 1800, 'Problem Solver', 1800]}
                repeat={Infinity}
                wrapper="span"
                cursor
              />
            </div>

            <div className="hero-cta-row">
              <MagneticButton className="btn-primary hero-btn">
                <a href="#projects">View Projects</a>
              </MagneticButton>

              <MagneticButton className="btn-ghost hero-btn">
                <a href="#contact">Let&apos;s Connect</a>
              </MagneticButton>
            </div>

            <div className="hero-meta-row">
              <div className="hero-socials">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="social-icon interactive-target" aria-label={label}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>

              <a href={resumeData.github} target="_blank" rel="noreferrer" className="hero-resume-link interactive-target">
                <FiFileText size={15} />
                <span>Resume / Profiles</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
