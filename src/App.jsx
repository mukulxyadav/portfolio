import { useEffect, useRef, useState, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './components/Loader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Achievements from './components/Achievements.jsx';
import CodingProfiles from './components/CodingProfiles.jsx';
import Contact from './components/Contact.jsx';
import Chatbot from './components/Chatbot.jsx';
import './index.css';

export default function App() {
  const [loading, setLoading] = useState(true);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const spotlightRef = useRef(null);
  const mainRef = useRef(null);


  useEffect(() => {
    const onMove = (event) => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${event.clientX}px`;
        cursorDotRef.current.style.top = `${event.clientY}px`;
      }

      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${event.clientX}px`;
        cursorRingRef.current.style.top = `${event.clientY}px`;
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${event.clientX}px`;
        spotlightRef.current.style.top = `${event.clientY}px`;
      }
    };

    const onHoverStart = (event) => {
      if (!cursorRingRef.current) return;
      const target = event.target;

      if (target instanceof Element && target.closest('a, button, .interactive-target')) {
        cursorRingRef.current.classList.add('hovered');
      }
    };

    const onHoverEnd = () => {
      if (!cursorRingRef.current) return;
      cursorRingRef.current.classList.remove('hovered');
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onHoverStart);
    window.addEventListener('mouseout', onHoverEnd);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onHoverStart);
      window.removeEventListener('mouseout', onHoverEnd);
    };
  }, []);

  useEffect(() => {
    if (loading) return undefined;

    const sections = Array.from(document.querySelectorAll('.section-wrap'));
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '-8% 0px -10% 0px', threshold: 0.12 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    if (loading) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.section-label').forEach((node) => {
        gsap.fromTo(
          node,
          { y: 16, opacity: 0, filter: 'blur(4px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray('.section-heading').forEach((node) => {
        gsap.fromTo(
          node,
          { y: 24, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 86%',
              toggleActions: 'play none none none',
              once: true,
            },
          },
        );
      });

      gsap.to('.ambient-orb-a', {
        yPercent: -18,
        scrollTrigger: {
          trigger: 'main',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      });

      gsap.to('.ambient-orb-b', {
        yPercent: 14,
        xPercent: -8,
        scrollTrigger: {
          trigger: 'main',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
        },
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loading]);

  if (loading) return <Loader onComplete={() => setLoading(false)} />;

  return (
    <div className="app-shell">
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />
      <div className="ambient-orb ambient-orb-c" />
      <div className="noise-overlay" />
      <div ref={spotlightRef} className="spotlight" />
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" />

      <Navbar />
      <main ref={mainRef} className="main-layer">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <CodingProfiles />
        <Contact />
      </main>


      <Chatbot />
    </div>
  );
}
