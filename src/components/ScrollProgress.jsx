import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

export default function ScrollProgress() {
  const barRef = useRef(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!barRef.current) return;

    const progress = Math.min(Math.max(scroll.offset, 0), 1);
    barRef.current.style.transform = `scaleX(${progress})`;
  });

  return (
    <div className="scroll-progress-wrap" aria-hidden="true">
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  );
}
