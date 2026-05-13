import { motion, useScroll, useTransform } from 'framer-motion';

export default function AvatarFlow({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // When scroll is 0 (Hero): Centered at the bottom, scale 1.
  // When scroll is 1 (end of About): Moves to the right side of the About section, scale shrinks.
  
  const y = useTransform(scrollYProgress, [0, 1], ['50vh', '150vh']);
  const x = useTransform(scrollYProgress, [0, 1], ['-50%', '10%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]); // Fades out if scrolled past About

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        x, y, scale,
        opacity,
        zIndex: 5,
        width: '600px',
        height: '600px',
        pointerEvents: 'none',
        transformOrigin: 'center center',
      }}
    >
      <motion.img
        src="/avatar.png"
        alt="Human Avatar"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
          maskImage: 'radial-gradient(circle at center, black 50%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}
