import { useEffect, useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LightboxContext = createContext(null);

export function LightboxProvider({ children }) {
  const [state, setState] = useState({ open: false, src: null, alt: '', caption: '' });
  const open = (src, alt = '', caption = '') => setState({ open: true, src, alt, caption });
  const close = () => setState((s) => ({ ...s, open: false }));

  useEffect(() => {
    if (!state.open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [state.open]);

  return (
    <LightboxContext.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {state.open && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center p-4 md:p-10 bg-ink-950/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur grid place-items-center text-white transition-all"
              aria-label="Fechar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <motion.div
              className="relative max-w-5xl max-h-full"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={state.src}
                alt={state.alt}
                className="max-w-full max-h-[80vh] rounded-2xl shadow-glow bg-white"
              />
              {state.caption && (
                <p className="mt-4 text-center text-white/85 text-sm max-w-2xl mx-auto">
                  {state.caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) return { open: () => {}, close: () => {} };
  return ctx;
}

export default function ZoomableImage({
  src,
  alt,
  caption,
  className = '',
  imgClassName = '',
  onImgError
}) {
  const { open } = useLightbox();
  return (
    <button
      type="button"
      onClick={() => open(src, alt, caption || alt)}
      className={`group relative block overflow-hidden cursor-zoom-in ${className}`}
      aria-label={`Ampliar ${alt || 'imagem'}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`transition-transform duration-700 group-hover:scale-105 ${imgClassName}`}
        onError={onImgError}
      />
      <span className="pointer-events-none absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur rounded-full h-8 w-8 grid place-items-center shadow-soft">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-ink-900">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="m20 20-4-4M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
    </button>
  );
}
