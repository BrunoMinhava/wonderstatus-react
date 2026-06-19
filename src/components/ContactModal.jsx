import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contact } from '../data/contact';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { Nome: 100, Empresa: 150, Email: 254, Telefone: 30, Mensagem: 3000 };

function Field({ label, name, type = 'text', required, autoComplete }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink-800 mb-1.5">
        {label}{required && <span className="text-brand-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        maxLength={LIMITS[name]}
        className="w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition text-sm"
      />
    </div>
  );
}

export default function ContactModal({ open, onClose }) {
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const lastSubmit = useRef(0);
  const formRef = useRef(null);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setStatus({ state: 'idle', message: '' });
      setSubmitting(false);
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastSubmit.current < 30_000) {
      setStatus({ state: 'error', message: 'Aguarde 30 segundos antes de enviar novamente.' });
      return;
    }
    setSubmitting(true);
    setStatus({ state: 'idle', message: '' });

    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('_honey')) { setSubmitting(false); return; }

    const nome     = data.get('Nome')?.trim().slice(0, LIMITS.Nome) ?? '';
    const empresa  = data.get('Empresa')?.trim().slice(0, LIMITS.Empresa) ?? '';
    const email    = data.get('Email')?.trim().slice(0, LIMITS.Email) ?? '';
    const telefone = data.get('Telefone')?.trim().slice(0, LIMITS.Telefone) ?? '';
    const mensagem = data.get('Mensagem')?.trim().slice(0, LIMITS.Mensagem) ?? '';

    if (!nome) { setStatus({ state: 'error', message: 'Por favor indique o seu nome.' }); setSubmitting(false); return; }
    if (!EMAIL_RE.test(email)) { setStatus({ state: 'error', message: 'Por favor indique um email válido.' }); setSubmitting(false); return; }
    if (!mensagem) { setStatus({ state: 'error', message: 'Por favor escreva uma mensagem.' }); setSubmitting(false); return; }

    const payload = {
      Nome: nome, Empresa: empresa || '—', Email: email, Telefone: telefone || '—',
      Mensagem: mensagem, _subject: contact.subject, _template: 'table',
      _replyto: email, _captcha: 'false', Origem: window.location.pathname
    };

    try {
      const res = await fetch(contact.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('network');
      lastSubmit.current = Date.now();
      setStatus({ state: 'success', message: contact.successMessage });
      form.reset();
    } catch {
      setStatus({ state: 'error', message: 'Não foi possível enviar. Tente novamente ou envie email para ' + contact.email + '.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-ink-950/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-[5vh] bottom-[5vh] z-[201] mx-auto max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 pt-7 pb-4 border-b border-ink-100">
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-600 font-semibold">Wonderstatus</p>
                <h2 className="mt-1 font-display text-xl font-bold text-ink-900">Pedir Informação</h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-100 text-ink-500 hover:bg-ink-200 transition-colors"
                aria-label="Fechar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex-1 px-7 py-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nome" name="Nome" required autoComplete="name" />
                <Field label="Empresa (opcional)" name="Empresa" autoComplete="organization" />
                <Field label="Email" name="Email" type="email" required autoComplete="email" />
                <Field label="Telefone (opcional)" name="Telefone" type="tel" autoComplete="tel" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-800 mb-1.5">
                  Mensagem<span className="text-brand-500 ml-0.5">*</span>
                </label>
                <textarea
                  name="Mensagem"
                  required
                  rows={5}
                  maxLength={3000}
                  className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition resize-none"
                />
              </div>
              {/* honeypot */}
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

              {status.state !== 'idle' && (
                <div
                  className={`rounded-xl p-4 text-sm font-medium ${
                    status.state === 'success'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}
                  role="status"
                >
                  {status.message}
                </div>
              )}

              <div className="flex items-center justify-between gap-4 pt-1">
                <p className="text-xs text-ink-400">* Campos obrigatórios</p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'A enviar…' : 'Enviar'}
                </button>
              </div>
            </form>

            {/* Footer contact */}
            <div className="px-7 py-4 border-t border-ink-100 bg-ink-50 rounded-b-3xl flex flex-wrap gap-4 text-sm text-ink-600">
              <a href={contact.emailHref} className="hover:text-brand-600 transition-colors">{contact.email}</a>
              <a href={contact.phoneHref} className="hover:text-brand-600 transition-colors">{contact.phone}</a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
