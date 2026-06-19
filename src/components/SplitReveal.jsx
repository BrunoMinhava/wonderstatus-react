import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function SplitReveal({
  text,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  stagger = 0.055,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span className="flex flex-wrap" aria-hidden="true" style={{ gap: '0.28em 0' }}>
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block" style={{ marginRight: '0.28em' }}>
            <motion.span
              className="inline-block"
              initial={{ y: '115%', opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.75,
                delay: delay + i * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
