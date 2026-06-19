import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLightbox } from './Lightbox';

/**
 * Galeria de imagens de produto estilo e-commerce premium.
 * - Imagem principal grande com zoom suave ao hover
 * - Miniaturas clicáveis em baixo (ou lateral no desktop)
 * - Clique amplia via Lightbox global
 */
export default function ProductGallery({ images, alt = '', badges = [] }) {
  const [active, setActive] = useState(0);
  const { open } = useLightbox();

  if (!images || images.length === 0) return null;
  const current = images[active];

  return (
    <div className={`flex flex-col-reverse gap-4 ${images.length > 1 ? 'md:grid md:grid-cols-[96px_1fr]' : ''}`}>
      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto scrollbar-hidden md:max-h-[520px] mask-fade-sides md:mask-none">
          {images.map((img, i) => {
            const src = typeof img === 'string' ? img : img.src;
            const label = typeof img === 'string' ? '' : img.label;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`relative flex-shrink-0 h-20 w-20 md:h-24 md:w-24 rounded-xl overflow-hidden border-2 bg-white transition-all ${
                  i === active
                    ? 'border-brand-500 shadow-soft scale-100'
                    : 'border-ink-100 hover:border-brand-300 opacity-70 hover:opacity-100'
                }`}
                aria-label={`Ver imagem ${i + 1}${label ? `: ${label}` : ''}`}
              >
                <img src={src} alt={label || alt} className="h-full w-full object-contain p-2" loading="lazy" />
              </button>
            );
          })}
        </div>
      )}

      {/* Imagem principal */}
      <div className="relative group">
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-50/60 border border-ink-100 shadow-soft">
          <AnimatePresence mode="wait">
            <motion.button
              key={active}
              type="button"
              onClick={() => open(typeof current === 'string' ? current : current.src, alt, typeof current === 'string' ? alt : current.label || alt)}
              className="absolute inset-0 w-full h-full cursor-zoom-in"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={typeof current === 'string' ? current : current.src}
                alt={alt}
                className="h-full w-full object-contain p-8 md:p-12 transition-transform duration-700 group-hover:scale-105"
              />
            </motion.button>
          </AnimatePresence>

          {/* Badges sobre a imagem */}
          {badges.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
              {badges.map((b) => (
                <span
                  key={b}
                  className="inline-flex rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-brand-700 shadow-soft"
                >
                  {b}
                </span>
              ))}
            </div>
          )}

          {/* Ícone de zoom */}
          <span className="pointer-events-none absolute bottom-4 right-4 opacity-70 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur rounded-full h-10 w-10 grid place-items-center shadow-soft">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-ink-900">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-4-4M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
