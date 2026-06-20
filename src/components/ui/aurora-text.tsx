"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AuroraTextProps {
  text: string;
  className?: string;
}

export function AuroraText({ text, className }: AuroraTextProps) {
  return (
    <div className={cn("relative inline-block group cursor-pointer transition-transform duration-500 hover:scale-[1.02]", className)}>
      {/* Aura Glow */}
      <div 
        className="absolute inset-[-10px] blur-[30px] opacity-40 group-hover:opacity-70 group-hover:blur-[40px] transition-all duration-700 bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] via-[#06B6D4] to-[#EC4899] bg-[length:300%_300%] animate-aurora group-hover:[animation-duration:20s] rounded-full pointer-events-none" 
        aria-hidden="true"
      />
      
      {/* Base Gradient Text */}
      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] via-[#06B6D4] to-[#EC4899] bg-[length:300%_300%] animate-aurora group-hover:[animation-duration:20s]">
        {text}
      </span>

      {/* Shimmer overlay */}
      <span 
        className="absolute inset-0 z-20 text-transparent bg-clip-text bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.8)] to-transparent bg-[length:200%_100%] animate-text-shimmer pointer-events-none mix-blend-overlay"
        aria-hidden="true"
      >
        {text}
      </span>
    </div>
  );
}
