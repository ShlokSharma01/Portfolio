import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const x = useMotionValue(-120);
  const y = useMotionValue(-120);
  const scale = useMotionValue(1);

  // Spring follow — tight enough to feel precise, loose enough to feel alive
  const sx = useSpring(x, { stiffness: 550, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 550, damping: 28, mass: 0.4 });
  const ss = useSpring(scale, { stiffness: 380, damping: 22 });

  useEffect(() => {
    // Only fine-pointer (mouse) devices — not tablets/phones
    const isMouse = window.matchMedia('(pointer: fine)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isMouse || isReduced) return;

    // Hide the OS cursor globally
    document.documentElement.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as Element).closest(
        'a, button, [role="button"], input, select, textarea, label',
      );
      scale.set(interactive ? 2.8 : 1);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, [x, y, scale]);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 9,
        height: 9,
        borderRadius: '50%',
        background: 'var(--crimson)',
        pointerEvents: 'none',
        zIndex: 99999,
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
        scale: ss,
        mixBlendMode: 'screen',
      }}
    />
  );
}
