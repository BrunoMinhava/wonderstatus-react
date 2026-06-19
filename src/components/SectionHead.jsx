import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import SplitReveal from './SplitReveal';

const EASE = [0.22, 1, 0.36, 1];

export default function SectionHead({ kicker, title, description, align = 'left', className = '' }) {
  const alignCls = align === 'center' ? 'text-center mx-auto items-center' : 'items-start';
  return (
    <ScrollReveal className={`max-w-3xl flex flex-col ${alignCls} ${className}`}>
      {kicker && <span className="eyebrow">{kicker}</span>}
      <SplitReveal
        text={title}
        as="h2"
        className={`mt-3 section-title ${align === 'center' ? 'text-balance' : ''}`}
        delay={0.1}
      />
      {/* Animated accent line */}
      <motion.div
        className="mt-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-brand-500 to-brand-300 origin-left"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.32, ease: EASE }}
      />
      {description && (
        <p className={`mt-4 section-lead ${align === 'center' ? 'mx-auto' : ''}`}>{description}</p>
      )}
    </ScrollReveal>
  );
}
