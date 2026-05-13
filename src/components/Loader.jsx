import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const PHASES = [
  { threshold: 16, label: 'Booting interface' },
  { threshold: 38, label: 'Loading scene assets' },
  { threshold: 66, label: 'Calibrating interactions' },
  { threshold: 86, label: 'Final polish' },
  { threshold: 100, label: 'Welcome' },
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  const label = useMemo(() => {
    const phase = PHASES.find((item) => progress <= item.threshold) || PHASES[PHASES.length - 1];
    return phase.label;
  }, [progress]);

  useEffect(() => {
    let frameId = 0;
    let completeId = 0;
    const start = performance.now();
    const duration = 2300;

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      const value = Math.min(100, Math.round(eased * 100));

      setProgress((prev) => (value > prev ? value : prev));

      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        completeId = window.setTimeout(onComplete, 430);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(completeId);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="loader-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="loader-grid" />
      <div className="loader-noise" />
      <div className="loader-orb loader-orb-a" />
      <div className="loader-orb loader-orb-b" />

      <div className="loader-core">
        <motion.div
          className="loader-logo-wrap"
          animate={{ y: [0, -4, 0], scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2.3, ease: 'easeInOut' }}
        >
          <div className="loader-ring" />
          <div className="loader-logo-text">MK</div>
          <div className="loader-logo-glow" />
        </motion.div>

        <p className="loader-label">{label}</p>

        <div className="loader-track" role="progressbar" aria-label="Loading website" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
          <motion.div className="loader-fill" animate={{ width: `${progress}%` }} transition={{ duration: 0.2, ease: 'easeOut' }} />
        </div>

        <p className="loader-percent">{`${progress.toString().padStart(2, '0')}%`}</p>
      </div>
    </motion.div>
  );
}
