import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, onClick, style, className }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isButton = typeof onClick === 'function';
  const MotionComponent = isButton ? motion.button : motion.div;

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Pull the button towards the cursor by a fraction of the distance
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <MotionComponent
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      type={isButton ? 'button' : undefined}
      style={{
        ...style,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform',
      }}
      onFocus={reset}
    >
      {children}
    </MotionComponent>
  );
}
