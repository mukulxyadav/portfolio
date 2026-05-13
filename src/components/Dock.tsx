"use client";

import { motion } from "framer-motion";
import { FiHome, FiUser, FiCode, FiMail, FiLayers } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";

const dockItems = [
  { name: "Home", icon: <FiHome />, href: "#home" },
  { name: "About", icon: <FiUser />, href: "#about" },
  { name: "Skills", icon: <FiLayers />, href: "#skills" },
  { name: "Work", icon: <FiCode />, href: "#work" },
  { name: "Contact", icon: <FiMail />, href: "#contact" },
];

export default function Dock() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl flex items-center gap-2">
      {dockItems.map((item, i) => (
        <Link
          key={item.name}
          href={item.href}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          className="relative group p-3 rounded-xl transition-all duration-300 hover:bg-white/10 interactive"
        >
          <motion.div
            animate={{
              scale: hovered === i ? 1.4 : hovered !== null && Math.abs(hovered - i) === 1 ? 1.2 : 1,
              y: hovered === i ? -10 : 0
            }}
            className="text-xl text-white/60 group-hover:text-white transition-colors"
          >
            {item.icon}
          </motion.div>
          
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={hovered === i ? { opacity: 1, y: -45 } : { opacity: 0, y: 10 }}
            className="absolute left-1/2 px-2 py-1 rounded bg-white text-black text-[10px] font-bold uppercase tracking-widest pointer-events-none"
          >
            {item.name}
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
