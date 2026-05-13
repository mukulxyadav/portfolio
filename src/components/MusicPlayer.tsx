"use client";

import { motion } from "framer-motion";
import { FiPlay, FiPause, FiMusic } from "react-icons/fi";
import { useState } from "react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed top-8 right-8 z-[100] group interactive">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-500 ${isPlaying ? 'animate-spin-slow' : ''}`}>
            <FiMusic size={14} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-white uppercase tracking-tighter leading-tight">Now Playing</span>
            <span className="text-[10px] text-neutral-500 uppercase tracking-tighter leading-tight truncate max-w-[80px]">Euphoria - Mix</span>
          </div>
        </div>

        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
        >
          {isPlaying ? <FiPause size={14} /> : <FiPlay size={14} className="ml-0.5" />}
        </button>

        {/* Audio Visualizer (Fake) */}
        <div className="flex items-end gap-0.5 h-3">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: isPlaying ? [4, 12, 6, 10, 4] : 4 }}
              transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
              className="w-0.5 bg-blue-500/50"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
