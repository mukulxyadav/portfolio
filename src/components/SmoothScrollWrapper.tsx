"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { RevealObserver } from "./Reveal";

export default function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Lenis smooth scroll — tight easing, feels native
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Mounts the IntersectionObserver for CSS-class scroll reveals */}
      <RevealObserver />
      {children}
    </>
  );
}
