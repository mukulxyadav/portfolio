"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from "react-icons/fi";
import { resumeData } from "../data/resume";

export default function SocialSidebar() {
  const socials = [
    { icon: <FiGithub />, href: resumeData.github },
    { icon: <FiLinkedin />, href: resumeData.linkedin },
    { icon: <FiTwitter />, href: resumeData.twitter },
  ];

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-8">
      <div className="w-px h-24 bg-white/10 mx-auto" />
      {socials.map((social, i) => (
        <motion.a
          key={i}
          href={social.href}
          target="_blank"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          whileHover={{ scale: 1.2, color: "#fff" }}
          className="text-neutral-500 transition-colors interactive"
        >
          {social.icon}
        </motion.a>
      ))}
      <div className="w-px h-24 bg-white/10 mx-auto" />
      <span className="font-mono text-[10px] text-neutral-700 uppercase tracking-[0.5em] rotate-180 [writing-mode:vertical-lr]">Socials</span>
    </div>
  );
}
