import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { slides } from '../data/slides';

const SLIDE_DURATION = 5500;
const pad = (n) => String(n + 1).padStart(2, '0');

function WordReveal({ text, baseDelay = 0 }) {
  const words = text.split(' ');
  return (
    <span aria-label={text}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="word-clip">
            <motion.span
              className="word-clip-inner"
              initial={{ y: '105%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-30%', opacity: 0 }}
              transition={{ duration: 0.75, delay: baseDelay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  );
}

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);
  const isPausedRef = useRef(false);
  const prevIndexRef = useRef(null);
  isPausedRef.current = isPaused;

  // Mouse parallax
  const mouseX = useSpring(0, { stiffness: 60, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 60, damping: 20 });
  const imgX = useTransform(mouseX, [-0.5, 0.5], ['-2%', '2%']);
  const imgY = useTransform(mouseY, [-0.5, 0.5], ['-2%', '2%']);
  const textX = useTransform(mouseX, [-0.5, 0.5], ['1.5%', '-1.5%']);
  const textY = useTransform(mouseY, [-0.5, 0.5], ['1%', '-1%']);

  // Scroll parallax
  const { scrollY } = useScroll();
  const scrollParallaxY = useTransform(scrollY, [0, 700], ['0%', '25%']);
  const scrollFadeOut = useTransform(scrollY, [0, 400], [1, 0]);

  // Preload all images immediately
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setIndex((i) => {
          prevIndexRef.current = i;
          return (i + 1) % slides.length;
        });
      }
    }, SLIDE_DURATION);
  }, []);

  // Mount: respect initial tab visibility + start auto-advance
  useEffect(() => {
    if (document.hidden) setIsPaused(true);
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, [startInterval]);

  // Pause when tab is hidden, resume when visible
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
        startInterval();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [startInterval]);

  const goTo = (i) => {
    prevIndexRef.current = index;
    setIndex(i);
    startInterval();
  };

  // Mouse handlers
  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsPaused(false);
  };

  const slide = slides[index];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-ink-950"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-roledescription="carousel"
      aria-label="Áreas principais Wonderstatus"
    >
      {/* Slides — Framer Motion cross-fade (more reliable than CSS transition) */}
      {slides.map((s, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: i === 0 ? 1 : 0 }}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{
            // Active slide on top; outgoing slide one level below; rest hidden
            zIndex: i === index ? 2 : i === prevIndexRef.current ? 1 : 0,
          }}
          aria-hidden={i !== index}
        >
          <motion.div className="absolute inset-0" style={{ y: scrollParallaxY }}>
            <motion.div
              className="absolute parallax-img"
              style={{
                inset: '-9%',
                backgroundImage: `url(${s.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                x: imgX,
                y: imgY,
              }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/55 via-ink-950/35 to-ink-950/90 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/75 via-ink-950/20 to-transparent pointer-events-none" />
        </motion.div>
      ))}

      {/* Noise texture */}
      <div className="noise-overlay absolute inset-0 pointer-events-none" style={{ zIndex: 4 }} aria-hidden="true" />

      {/* Content */}
      <motion.div
        className="relative flex h-full w-full items-end sm:items-center pointer-events-none"
        style={{ opacity: scrollFadeOut, zIndex: 10 }}
      >
        <Link
          to={slide.link}
          className="w-full pointer-events-auto group"
          aria-label={`Ir para ${slide.title}`}
        >
          <motion.div className="container-wide pb-20 sm:pb-0 w-full" style={{ x: textX, y: textY }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="max-w-4xl text-white"
              >
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] backdrop-blur-md"
                >
                  Wonderstatus
                </motion.div>

                <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.0]">
                  <WordReveal text={slide.title} baseDelay={0.05} />
                </h1>

                {slide.subtitle && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-5 text-base sm:text-lg md:text-xl text-white/70 max-w-xl leading-relaxed"
                  >
                    {slide.subtitle}
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/35 bg-white/12 backdrop-blur-md px-6 py-3 text-sm font-semibold text-white group-hover:bg-white/20 transition-all">
                Explorar área
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </span>
            </motion.div>

            {/* Controls */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-white">
              {/* Progress bar */}
              <div className="w-full sm:w-64 h-0.5 bg-white/15 overflow-hidden rounded-full">
                <div
                  key={`${index}-${isPaused}`}
                  className={`h-full bg-white origin-left ${isPaused ? '' : 'slideshow-progress'}`}
                  style={{
                    transform: isPaused ? 'scaleX(0)' : undefined,
                    animationDuration: `${SLIDE_DURATION}ms`,
                  }}
                />
              </div>

              {/* Slide counter */}
              <div className="font-display flex items-baseline gap-2 text-sm">
                <strong className="text-3xl font-semibold">{pad(index)}</strong>
                <span className="text-white/40">/ {pad(slides.length - 1)}</span>
              </div>

              {/* Dot navigation */}
              <div className="flex gap-2 pointer-events-auto">
                {slides.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index ? 'w-10 bg-white' : 'w-5 bg-white/25 hover:bg-white/55'
                    }`}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(i); }}
                    aria-label={`Ir para slide ${i + 1}: ${s.title}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-white/60 text-xs uppercase tracking-widest pointer-events-none"
        style={{ opacity: scrollFadeOut, zIndex: 20, animation: 'fadeIn 0.8s 1.5s both' }}
      >
        <span>Scroll</span>
        <div className="mt-2 h-8 w-[1px] bg-white/35 scroll-hint-line" />
      </motion.div>
    </section>
  );
}
