"use client";

import { useEffect, Children, cloneElement, isValidElement, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;      // stagger base delay in seconds
  from?: "bottom" | "left" | "right" | "scale";
  className?: string;
}

// Uses Intersection Observer + CSS animations for 60fps performance.
// No Framer Motion in the loop — keeps scroll buttery smooth.
export default function Reveal({ children, delay = 0, from = "bottom", className = "" }: RevealProps) {
  return (
    <div
      className={`reveal-root ${className}`}
      data-reveal-from={from}
      style={{ "--reveal-delay": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

// Observer singleton — one observer for all reveals on the page
export function RevealObserver() {
  useEffect(() => {
    const targets = document.querySelectorAll(".reveal-root");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    targets.forEach(t => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return null;
}
