import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AnnouncementBar({ visible, onDismiss }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 40, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
        >
          <div className="h-10 flex items-center justify-center bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white text-xs font-medium px-10 relative">
            {/* Subtle animated shimmer */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 4s linear infinite',
              }}
            />

            <span className="relative flex items-center gap-2 text-center">
              <span className="hidden sm:inline text-white/60">Novidade —</span>
              <a
                href="https://sibic2026.utad.pt/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline underline-offset-2 text-white"
              >
                Presença no SIBIC 2026
              </a>
              <span className="text-white/40 hidden sm:inline">·</span>
              <Link
                to="/agua"
                className="font-semibold hover:underline underline-offset-2 text-white hidden sm:inline"
              >
                Sistemas de Água WATER
              </Link>
              <span className="text-white/40 mx-1 hidden sm:inline">·</span>
              <a
                href="https://sibic2026.utad.pt/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 px-3 py-0.5 transition-colors whitespace-nowrap"
              >
                Saber mais
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </a>
            </span>

            <button
              type="button"
              onClick={onDismiss}
              aria-label="Fechar anúncio"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
