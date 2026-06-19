import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Conta de 0 até ao value quando entra no viewport.
 * Suporta sufixos como "+", "%", "/7" — detecta automaticamente a parte numérica.
 *
 * Props:
 *   value: string como "25+", "100%", "24/7", "6" ou número
 *   duration: segundos (default 1.8)
 *   className: classes extra
 */
export default function AnimatedCounter({ value, duration = 1.8, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [current, setCurrent] = useState(0);

  // Separa número de sufixo
  const str = String(value);
  const match = str.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : str;
  const isInteger = Number.isInteger(target);

  useEffect(() => {
    if (!inView) return undefined;
    let start = null;
    const animate = (ts) => {
      if (start === null) start = ts;
      const elapsed = (ts - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Easing ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      setCurrent(isInteger ? Math.floor(value) : parseFloat(value.toFixed(1)));
      if (progress < 1) requestAnimationFrame(animate);
      else setCurrent(target);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration, isInteger]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {isInteger ? Math.floor(current) : current}
      {suffix}
    </motion.span>
  );
}
