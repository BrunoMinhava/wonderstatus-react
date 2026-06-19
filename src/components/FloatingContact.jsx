import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { contact } from '../data/contact';

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.65A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ChatIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function FloatingContact() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Desktop floating widget — bottom right */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex fixed bottom-8 right-8 z-50 flex-col items-end gap-3"
          >
            {/* Expanded panel */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white rounded-2xl shadow-glow border border-ink-100 p-5 w-64"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-400 mb-4">
                    Contacto rápido
                  </p>

                  <a
                    href={contact.phoneHref}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-semibold text-ink-800 hover:bg-brand-50 hover:text-brand-700 transition-colors group"
                  >
                    <span className="h-8 w-8 rounded-full bg-brand-50 group-hover:bg-brand-100 flex items-center justify-center text-brand-600 transition-colors shrink-0">
                      <PhoneIcon />
                    </span>
                    <span className="leading-tight">{contact.phone}</span>
                  </a>

                  <a
                    href={contact.emailHref}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-semibold text-ink-800 hover:bg-brand-50 hover:text-brand-700 transition-colors group mt-1"
                  >
                    <span className="h-8 w-8 rounded-full bg-brand-50 group-hover:bg-brand-100 flex items-center justify-center text-brand-600 transition-colors shrink-0">
                      <EmailIcon />
                    </span>
                    <span className="leading-tight truncate">{contact.email}</span>
                  </a>

                  <div className="mt-4 pt-4 border-t border-ink-100">
                    <button
                      type="button"
                      onClick={() => { setExpanded(false); window.dispatchEvent(new CustomEvent('open-contact-modal')); }}
                      className="flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-semibold py-2.5 hover:shadow-glow hover:-translate-y-0.5 transition-all"
                    >
                      Pedir orçamento
                      <ArrowIcon />
                    </button>
                  </div>

                  <p className="mt-3 text-[11px] text-ink-400 text-center leading-tight">
                    {contact.hours.weekdays}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle button */}
            <motion.button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.94 }}
              aria-label={expanded ? 'Fechar contacto' : 'Abrir contacto rápido'}
              className={`h-14 w-14 rounded-full text-white shadow-glow flex items-center justify-center transition-all duration-300 ${
                expanded
                  ? 'bg-ink-800'
                  : 'bg-gradient-to-br from-brand-600 to-brand-500'
              }`}
            >
              <AnimatePresence mode="wait">
                {expanded ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <CloseIcon />
                  </motion.span>
                ) : (
                  <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <ChatIcon />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sticky bottom bar */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/96 backdrop-blur-md border-t border-ink-100 shadow-[0_-6px_28px_rgba(10,44,85,0.12)] px-4 py-3 flex gap-2.5 safe-area-bottom"
          >
            <a
              href={contact.phoneHref}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-ink-50 border border-ink-200 py-2.5 text-sm font-semibold text-ink-700 hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition-colors"
            >
              <PhoneIcon />
              Ligar
            </a>
            <a
              href={contact.emailHref}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-ink-50 border border-ink-200 py-2.5 text-sm font-semibold text-ink-700 hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition-colors"
            >
              <EmailIcon />
              Email
            </a>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white py-2.5 text-sm font-semibold shadow-soft hover:shadow-glow transition-all"
            >
              Orçamento
              <ArrowIcon />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
