import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const MotionLink = motion(Link);
const openContactModal = () => window.dispatchEvent(new CustomEvent('open-contact-modal'));

export default function ContactCTA({
  title = 'Precisa de ajuda para identificar a referência certa?',
  description = 'Apoiamos na seleção de consumíveis, equipamentos e compatibilidades por técnica, equipamento e aplicação.',
  primary = { label: 'Pedir informação' },
  secondary = { label: 'Ver contactos', to: '/sobre#contactos' }
}) {
  return (
    <section className="section">
      <div className="container-wide">
        <ScrollReveal variant="scale-up">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-500 p-7 md:p-14 text-white shadow-glow">
            {/* Decorative orbs */}
            <div aria-hidden="true" className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/8 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-brand-300/15 blur-3xl" />
            <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-brand-400/20 blur-2xl" />

            {/* Grid overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '48px 48px'
              }}
            />

            <div className="relative max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/12 border border-white/20 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em]">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-300 animate-pulse" />
                Fale connosco
              </p>
              <h2 className="mt-5 font-display text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
                {title}
              </h2>
              {description && (
                <p className="mt-4 text-sm md:text-lg text-white/80 leading-relaxed max-w-2xl">
                  {description}
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <motion.button
                  type="button"
                  onClick={primary.onClick ?? openContactModal}
                  whileTap={{ scale: 0.96, transition: { duration: 0.08 } }}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand-700 hover:bg-white/95 hover:-translate-y-0.5 transition-all shadow-soft hover:shadow-glow"
                >
                  {primary.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
                {secondary && (
                  <MotionLink
                    to={secondary.to}
                    whileTap={{ scale: 0.96, transition: { duration: 0.08 } }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 backdrop-blur px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-all hover:-translate-y-0.5"
                  >
                    {secondary.label}
                  </MotionLink>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
