import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxSection({
  image,
  speed = 0.3,
  overlay = 'rgba(6, 22, 42, 0.55)',
  className = '',
  minHeight = '60vh',
  children
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}px`, `${speed * 100}px`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.12, 1.16]);

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y, scale }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      </motion.div>
      <div
        className="absolute inset-0 -z-10"
        style={{ background: overlay }}
      />
      {children}
    </section>
  );
}
