import { motion, useScroll, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom';

/**
 * Barra fina no topo da página que enche conforme o scroll.
 * Em páginas do tipo home com slideshow fullscreen, esconde-se no topo.
 */
export default function ScrollProgress() {
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  // Esconder na homepage (tem slideshow)
  if (pathname === '/') return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 z-[60] origin-left"
      style={{ scaleX }}
    />
  );
}
