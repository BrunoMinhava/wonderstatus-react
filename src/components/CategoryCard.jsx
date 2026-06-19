import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useSpring, useTransform } from 'framer-motion';

export default function CategoryCard({ category, index = 0, cardClass = 'h-72 sm:h-80', noEntrance = false }) {
  const num = String(index + 1).padStart(2, '0');
  const cardRef = useRef(null);

  const mouseX = useSpring(0, { stiffness: 150, damping: 22 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 22 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  const shineX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);
  const shineBackground = useTransform(
    [shineX, shineY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.13) 0%, transparent 55%)`
  );

  const boxShadow = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `${x * -28}px ${y * -18}px 50px rgba(0,0,0,0.45), 0 20px 60px rgba(0,0,0,0.25)`
  );

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={noEntrance ? false : { opacity: 0, y: 40 }}
      whileInView={noEntrance ? undefined : { opacity: 1, y: 0 }}
      viewport={noEntrance ? undefined : { once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d', boxShadow }}>
        <Link
          to={`/${category.slug}`}
          data-cursor="view"
          className={`group relative flex flex-col justify-end overflow-hidden rounded-3xl shadow-soft ${cardClass}`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url(${category.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/10" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Mouse-tracked specular highlight */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: shineBackground }}
          />

          <div className="absolute top-5 right-5">
            <span className="font-display text-[11px] font-bold text-white/30 tracking-[0.35em]">{num}</span>
          </div>

          <div className="relative px-6 pb-6 pt-20 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40 mb-1.5">
              {category.shortName}
            </p>
            <div className="flex items-end justify-between gap-3">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight text-balance group-hover:text-brand-300 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-white/60 leading-relaxed line-clamp-2 max-w-[28ch]">
                  {category.description}
                </p>
              </div>
              <div className="shrink-0 h-9 w-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center group-hover:bg-brand-500 group-hover:border-brand-400 transition-all duration-300">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5">
                  <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
