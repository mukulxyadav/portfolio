import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

export default function ScrollSignals() {
  const scroll = useScroll();

  useFrame(() => {
    const offset = Math.min(Math.max(scroll.offset, 0), 1);
    document.documentElement.style.setProperty('--scroll-progress', offset.toFixed(4));
    document.documentElement.style.setProperty('--scroll-progress-pct', `${(offset * 100).toFixed(2)}%`);
  });

  return null;
}
