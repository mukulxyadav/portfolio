import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiSend } from 'react-icons/fi';
import { resumeData } from '../data/resume.js';

const social = [
  { href: resumeData.github, icon: FiGithub, label: 'GitHub', bg: '#ffffff', color: '#111111' },
  { href: resumeData.linkedin, icon: FiLinkedin, label: 'LinkedIn', bg: '#0a66c2', color: '#ffffff' },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState('idle');

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormState('sending');

    setTimeout(() => {
      setFormState('sent');
      event.target.reset();
      setTimeout(() => setFormState('idle'), 3000);
    }, 1200);
  };

  return (
    <section id="contact" ref={ref} className="section-wrap" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          style={{ marginBottom: '3rem', textAlign: 'center' }}
        >
          <div className="section-label">06 // contact</div>
          <h2 className="section-heading">
            Let&apos;s <span className="gtext">Connect</span>
          </h2>
          <div className="section-divider" style={{ margin: '1rem auto' }} />
        </motion.div>

        <div className="contact-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact-title">Ready to collaborate?</h3>
            <p className="contact-copy">
              I&apos;m currently seeking internship opportunities where I can contribute to meaningful product and platform work.
            </p>

            <div className="contact-list">
              <div className="contact-item">
                <div className="contact-icon-box">
                  <FiMail />
                </div>
                <div>
                  <span className="contact-label">EMAIL</span>
                  <a href={`mailto:${resumeData.email}`} className="contact-link interactive-target">
                    {resumeData.email}
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <FiPhone />
                </div>
                <div>
                  <span className="contact-label">PHONE</span>
                  <a href={`tel:${resumeData.phone}`} className="contact-link interactive-target">
                    {resumeData.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-social-row">
              {social.map(({ href, icon: Icon, label, bg, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="contact-social interactive-target"
                  style={{ background: bg, color }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="glass premium-card"
            style={{ padding: '2rem' }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <input required type="text" placeholder="Your Name" className="input-field" />
              <input required type="email" placeholder="Email Address" className="input-field" />
              <textarea required rows={4} placeholder="Tell me about your project" className="input-field" style={{ resize: 'vertical' }} />

              <button
                type="submit"
                disabled={formState !== 'idle'}
                className="btn-primary interactive-target"
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.35rem', opacity: formState !== 'idle' ? 0.75 : 1 }}
              >
                {formState === 'idle' && (
                  <>
                    <FiSend /> Send Message
                  </>
                )}
                {formState === 'sending' && 'Sending...'}
                {formState === 'sent' && 'Message Sent!'}
              </button>
            </form>
          </motion.div>
        </div>

        <footer className="footer-strip">
          <div className="footer-divider" />
          <p>
            © {new Date().getFullYear()} Mukul Kumar. Built with care for internships, placements, and recruiter reviews.
          </p>
        </footer>
      </div>
    </section>
  );
}
