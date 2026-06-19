import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, index = 0, onClick, href, to }) {
  const cardRef = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 300, damping: 30, mass: 0.5 });
  const rotateY = useSpring(rawY, { stiffness: 300, damping: 30, mass: 0.5 });
  const glareXPct = useMotionValue(50);
  const glareYPct = useMotionValue(50);
  const glareOpacity = useMotionValue(0);
  const glareBackground = useTransform(
    [glareXPct, glareYPct],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.18), transparent 60%)`
  );

  const onMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set(((e.clientY - cy) / (rect.height / 2)) * -7);
    rawY.set(((e.clientX - cx) / (rect.width / 2)) * 7);
    glareXPct.set(((e.clientX - rect.left) / rect.width) * 100);
    glareYPct.set(((e.clientY - rect.top) / rect.height) * 100);
    glareOpacity.set(1);
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    glareOpacity.set(0);
  };

  const glare = (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        pointerEvents: 'none',
        zIndex: 10,
        opacity: glareOpacity,
        background: glareBackground,
      }}
    />
  );

  const content = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-brand-50 to-white border-b border-ink-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-ink-300">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4 14l4-4 4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
            {product.badges.map((b) => (
              <span
                key={b}
                className="rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm"
              >
                {b}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-6">
        {product.kicker && (
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            {product.kicker}
          </p>
        )}
        <h3 className="mt-2 font-display text-xl font-bold text-ink-900">{product.name}</h3>
        {product.lead && (
          <p className="mt-2 text-sm text-ink-600 leading-relaxed">{product.lead}</p>
        )}
        {product.meta && product.meta.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-ink-700">
            {product.meta.slice(0, 4).map((m) => (
              <li key={m} className="flex items-start gap-2">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                <span className="leading-relaxed">{m}</span>
              </li>
            ))}
          </ul>
        )}
        {(to || href) && (
          <div className="mt-5 pt-5 border-t border-ink-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-brand-700 group-hover:text-brand-800 transition-colors">
              Ver ficha técnica
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="text-brand-600 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
    </>
  );

  const cardClass =
    'group h-full overflow-hidden rounded-3xl bg-white border border-ink-100 shadow-soft card-hover text-left flex flex-col relative';

  return (
    <div style={{ perspective: '800px' }} className="h-full">
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.975, transition: { duration: 0.08 } }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.7,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="h-full"
      >
        {to ? (
          <Link to={to} className={cardClass}>
            {glare}
            {content}
          </Link>
        ) : href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={cardClass}>
            {glare}
            {content}
          </a>
        ) : onClick ? (
          <button type="button" onClick={onClick} className={cardClass}>
            {glare}
            {content}
          </button>
        ) : (
          <article className={cardClass}>
            {glare}
            {content}
          </article>
        )}
      </motion.div>
    </div>
  );
}
