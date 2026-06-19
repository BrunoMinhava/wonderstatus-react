import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) {
      const t = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem('cookie_consent', 'declined');
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Consentimento de cookies"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed z-[9999] p-4
            bottom-[72px] left-0 right-0
            md:bottom-6 md:left-6 md:right-auto"
        >
          <div className="md:max-w-sm rounded-2xl bg-ink-950 text-white shadow-2xl border border-white/10 p-5 flex flex-col gap-4">
            <div>
              <p className="font-display font-semibold text-sm text-white mb-1">Cookies</p>
              <p className="text-xs text-white/70 leading-relaxed">
                Usamos cookies para melhorar a experiência. Consulte a nossa{' '}
                <Link
                  to="/politica-privacidade"
                  className="text-brand-300 hover:text-brand-200 transition-colors underline underline-offset-2"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={decline}
                className="flex-1 rounded-xl border border-white/15 px-3 py-2 text-xs font-medium text-white/60 hover:text-white hover:border-white/35 transition-all"
              >
                Recusar
              </button>
              <button
                onClick={accept}
                className="flex-1 rounded-xl bg-brand-600 hover:bg-brand-500 px-3 py-2 text-xs font-semibold text-white transition-colors"
              >
                Aceitar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
