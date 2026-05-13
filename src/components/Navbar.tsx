"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { resumeData } from "../data/resume";

const links = [
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Projects",     href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active,   setActive]     = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-white font-bold text-lg tracking-tight group interactive">
            MK<span className="text-blue-500 group-hover:text-blue-400 transition-colors">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-neutral-400 hover:text-white transition-colors interactive font-medium"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={resumeData.github}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary !py-2.5 !px-5 !text-sm"
            >
              GitHub
            </a>
            <a
              href="mailto:mukulxyadav@gmail.com"
              className="btn-primary !py-2.5 !px-5 !text-sm"
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden text-white interactive p-1"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
              }
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 px-6 py-6 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {links.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base text-neutral-300 hover:text-white transition-colors font-medium"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="mailto:mukulxyadav@gmail.com"
                className="btn-primary mt-2 self-start"
              >
                Let&apos;s Talk
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
