"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function SectionWrapper({ children, id, className }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        scale: { type: "spring", damping: 20, stiffness: 100 }
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
