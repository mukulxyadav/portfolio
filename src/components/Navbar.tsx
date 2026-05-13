"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled ? "w-[min(90%,500px)]" : "w-[min(90%,600px)]"
      }`}
    >
      <nav className="glass rounded-full px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-white interactive">
          MK<span className="text-blue-500">.</span>
        </Link>
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors interactive"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
