import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function PageHeader({
  kicker,
  title,
  subtitle,
  image,
  actions,
  children,
  overlay = 'linear-gradient(180deg, rgba(5,20,40,0.72) 0%, rgba(5,20,40,0.45) 40%, rgba(5,20,40,0.78) 100%)',
  minHeight = 'min-h-[520px] md:min-h-[60vh]',
  noParallax = false,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className={`relative ${minHeight} flex items-center overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20`}
    >
      {image && (
        <motion.div
          className="absolute inset-0 -z-20"
          style={noParallax ? {} : { y, scale }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        </motion.div>
      )}
      <div className="absolute inset-0 -z-10" style={{ background: overlay }} />
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 25%, rgba(54,162,245,0.25), transparent 35%), radial-gradient(circle at 85% 75%, rgba(3,102,191,0.3), transparent 40%)'
        }}
      />
      <div className="noise-overlay" aria-hidden="true" />

      <motion.div
        className="relative container-wide text-white w-full"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {kicker && (
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] backdrop-blur-md">
              {kicker}
            </p>
          )}
          <h1 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] max-w-4xl text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-base sm:text-lg md:text-xl text-white/85 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-5 max-w-3xl">{children}</div>}
          {actions && (
            <div className="mt-7 flex flex-wrap gap-3">
              {actions.map((a) => {
                const isContactLink = a.href === '/sobre#formulario-contacto' || a.href === '#formulario-contacto';
                if (isContactLink) {
                  return (
                    <button
                      key={a.label}
                      type="button"
                      onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                      className={a.ghost ? 'btn-outline-light' : 'btn-primary'}
                    >
                      {a.label}
                    </button>
                  );
                }
                if (typeof a.onClick === 'function') {
                  return (
                    <button
                      key={a.label}
                      type="button"
                      onClick={a.onClick}
                      className={a.ghost ? 'btn-outline-light' : 'btn-primary'}
                    >
                      {a.label}
                    </button>
                  );
                }
                return a.external ? (
                  <a
                    key={a.label}
                    href={a.href}
                    target="_blank" rel="noopener noreferrer"
                    className={a.ghost ? 'btn-outline-light' : 'btn-primary'}
                  >
                    {a.label}
                  </a>
                ) : (
                  <Link
                    key={a.label}
                    to={a.href}
                    className={a.ghost ? 'btn-outline-light' : 'btn-primary'}
                  >
                    {a.label}
                  </Link>
                );
              })}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 -z-10"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(247,251,255,1))'
        }}
      />
    </section>
  );
}
