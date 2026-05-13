import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiBriefcase, FiHome, FiMail, FiMenu, FiUser, FiX } from 'react-icons/fi';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home', icon: FiHome },
  { id: 'about', label: 'About', icon: FiUser },
  { id: 'projects', label: 'Projects', icon: FiBriefcase },
  { id: 'contact', label: 'Contact', icon: FiMail },
];

export default function Navbar() {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const observerOptions = useMemo(
    () => ({
      root: null,
      rootMargin: '-40% 0px -45% 0px',
      threshold: 0,
    }),
    [],
  );

  useEffect(() => {
    setScrolled(active !== 'hero');
  }, [active]);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [observerOptions]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) setMenuOpen(false);
    };

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -36, opacity: 0, x: '-50%' }}
        animate={{ y: 0, opacity: 1, x: '-50%' }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`floating-navbar ${scrolled ? 'scrolled' : ''}`}
      >
        <a href="#hero" className="brand-mark" aria-label="Go to home">
          MK
        </a>

        <nav className="navbar-links" aria-label="Primary">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link ${active === id ? 'active' : ''}`}
              aria-current={active === id ? 'page' : undefined}
            >
              {active === id && <motion.span layoutId="activeNavPill" className="nav-active-pill" />}
              <Icon size={16} />
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="mobile-menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="mobile-menu-panel"
            aria-label="Mobile navigation"
          >
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`mobile-menu-link ${active === id ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <Icon size={16} />
                <span>{label}</span>
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
