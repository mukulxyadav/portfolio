"use client";

import { resumeData } from "../data/resume";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold">MK<span className="text-blue-500">.</span></span>
          <span>© {year} Mukul Kumar. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href={resumeData.github}   target="_blank" rel="noreferrer" className="hover:text-white transition-colors interactive">GitHub</a>
          <a href={resumeData.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors interactive">LinkedIn</a>
          <span>Built with Next.js & Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
