import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contact } from '../data/contact';

const DONE_KEY = 'ws_rating_done';
const DELAY_MS = 18000; // aparece 18 s após o load, só na primeira visita

const LABELS = ['', 'Fraco', 'Razoável', 'Bom', 'Muito bom', 'Excelente'];

export default function RatingPopup() {
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [phase, setPhase] = useState('rate'); // 'rate' | 'thanks'
  const [sending, setSending] = useState(false);
  const timerRef = useRef(null);
  const lastSubmit = useRef(0);

  useEffect(() => {
    if (localStorage.getItem(DONE_KEY)) return;
    timerRef.current = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(timerRef.current);
  }, []);

  const close = () => {
    localStorage.setItem(DONE_KEY, '1');
    setVisible(false);
  };

  const snooze = () => setVisible(false); // fecha sem marcar como feito

  const submit = async () => {
    if (rating === 0) return;
    if (Date.now() - lastSubmit.current < 60_000) { close(); return; }
    setSending(true);
    try {
      await fetch(contact.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Avaliação do site Wonderstatus — ${LABELS[rating]} (${rating}/5)`,
          _template: 'table',
          Avaliação: `${rating}/5 — ${LABELS[rating]}`,
          Comentário: comment.trim().slice(0, 500) || '(sem comentário)',
          Origem: window.location.pathname
        })
      });
      lastSubmit.current = Date.now();
    } catch (_) {
      // silencioso — não bloquear a UX
    } finally {
      setSending(false);
      localStorage.setItem(DONE_KEY, '1');
      setPhase('thanks');
      setTimeout(() => setVisible(false), 2800);
    }
  };

  const active = hovered || rating;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[420px] z-[9999]"
          role="dialog"
          aria-modal="true"
          aria-label="Avaliação do site"
        >
          <div className="rounded-3xl bg-ink-950 border border-white/10 shadow-2xl overflow-hidden">
            {phase === 'thanks' ? (
              <div className="p-7 text-center text-white">
                <div className="text-4xl mb-3">🙏</div>
                <p className="font-display text-xl font-bold">Obrigado pelo feedback!</p>
                <p className="mt-1 text-white/60 text-sm">A sua opinião ajuda-nos a melhorar.</p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 px-6 pt-6 pb-4">
                  <div>
                    <p className="font-display text-base font-bold text-white">Como avalia o nosso site?</p>
                    <p className="mt-0.5 text-sm text-white/55">Demora apenas 10 segundos.</p>
                  </div>
                  <button
                    type="button"
                    onClick={snooze}
                    className="text-white/35 hover:text-white/80 transition-colors mt-0.5 flex-shrink-0"
                    aria-label="Fechar"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-2 px-6 pb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHovered(s)}
                      onMouseLeave={() => setHovered(0)}
                      className="text-4xl leading-none transition-transform duration-150 hover:scale-110 focus:outline-none"
                      aria-label={`${s} estrelas — ${LABELS[s]}`}
                    >
                      <span className={s <= active ? 'text-amber-400' : 'text-white/20'}>★</span>
                    </button>
                  ))}
                </div>

                {/* Label */}
                <div className="h-5 text-center mb-3">
                  <p className="text-sm font-semibold text-amber-400 transition-all">
                    {active > 0 ? LABELS[active] : ''}
                  </p>
                </div>

                {/* Comentário — só aparece depois de escolher estrelas */}
                <AnimatePresence>
                  {rating > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden px-6"
                    >
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Sugestões ou comentários (opcional)…"
                        rows={3}
                        maxLength={500}
                        className="w-full rounded-2xl bg-white/8 border border-white/15 text-white placeholder:text-white/35 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Botões */}
                <div className="flex gap-3 px-6 py-5">
                  <button
                    type="button"
                    onClick={close}
                    className="flex-1 rounded-full border border-white/15 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:border-white/35 transition-all"
                  >
                    Não obrigado
                  </button>
                  <button
                    type="button"
                    onClick={submit}
                    disabled={rating === 0 || sending}
                    className="flex-1 rounded-full bg-brand-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-brand-500 disabled:opacity-35 disabled:cursor-default transition-all"
                  >
                    {sending ? 'A enviar…' : 'Enviar avaliação'}
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
