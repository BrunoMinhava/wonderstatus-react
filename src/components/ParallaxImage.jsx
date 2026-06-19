import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Imagem com parallax suave ao scroll.
 * A imagem move-se a uma velocidade diferente do scroll, criando profundidade.
 *
 * Props:
 *   src: URL da imagem
 *   alt: alt text
 *   intensity: 0-1 (default 0.3) — quanto maior, mais movimento
 *   className: classes extra no wrapper
 *   overlay: componente de overlay por cima (gradients, texto, etc.)
 *   scale: fator de escala da imagem (default 1.15 — evita bordas brancas)
 */
export default function ParallaxImage({
  src,
  alt = '',
  intensity = 0.3,
  className = '',
  imgClassName = '',
  overlay,
  scale = 1.15
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Move imagem em Y — de -intensity*100 (início) a +intensity*100 (fim)
  const y = useTransform(scrollYProgress, [0, 1], [`-${intensity * 50}%`, `${intensity * 50}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover ${imgClassName}`}
          loading="lazy"
          decoding="async"
        />
      </motion.div>
      {overlay && <div className="relative z-10">{overlay}</div>}
    </div>
  );
}
