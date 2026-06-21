"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring follows with lag (spring)
  const ringX = useSpring(mouseX, { stiffness: 140, damping: 18, mass: 0.8 });
  const ringY = useSpring(mouseY, { stiffness: 140, damping: 18, mass: 0.8 });

  // Dot follows instantly
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 40 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 40 });

  const isHovering = useRef(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);

    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onEnter = () => {
      isHovering.current = true;
      ringRef.current?.classList.add("cursor-hover");
    };
    const onLeave = () => {
      isHovering.current = false;
      ringRef.current?.classList.remove("cursor-hover");
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    // Add hover effect to all interactive elements
    const interactives = document.querySelectorAll(
      "a, button, [data-cursor-hover], .interactive, input, textarea"
    );
    interactives.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("resize", checkTouch);
      if (isTouchDevice) return;
      window.removeEventListener("mousemove", onMove);
      interactives.forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [mouseX, mouseY, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer glowing ring */}
      <motion.div
        ref={ringRef}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="cursor-ring"
      />
      {/* Inner dot */}
      <motion.div
        ref={dotRef}
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="cursor-dot"
      />
    </>
  );
}
