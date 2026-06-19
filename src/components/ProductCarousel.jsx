import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CARD_W = 272 + 20; // w-[272px] + gap-5

// ─── Modo infinite: marquee contínuo ─────────────────────────────────────────
export function InfiniteCarousel({ items = [], speed = 35 }) {
  if (!items.length) return null;

  // Triplicamos para garantir loop sempre visível em qualquer viewport
  const track = [...items, ...items, ...items];
  const duration = (items.length * CARD_W) / speed; // segundos

  return (
    <div className="relative overflow-hidden">
      {/* fade nas extremidades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white to-transparent" />

      <div
        className="marquee-track flex gap-5"
        style={{ animationDuration: `${duration}s`, width: 'max-content' }}
      >
        {track.map((item, idx) => (
          <div key={`${item.id ?? ''}-${idx}`} className="flex-shrink-0 w-[272px]">
            <CarouselCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Modo normal: scroll com botões ──────────────────────────────────────────
export default function ProductCarousel({
  items = [],
  title,
  kicker,
  viewAllLink,
  autoScroll = false
}) {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const pausedRef = useRef(false);

  const sync = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    sync();
    return () => { el.removeEventListener('scroll', sync); ro.disconnect(); };
  }, [items]);

  useEffect(() => {
    if (!autoScroll) return;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      const el = scrollRef.current;
      if (!el) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: CARD_W, behavior: 'smooth' });
      }
    }, 3000);
    return () => clearInterval(id);
  }, [autoScroll, items]);

  const scroll = (dir) =>
    scrollRef.current?.scrollBy({ left: dir * CARD_W * 3, behavior: 'smooth' });

  if (!items.length) return null;

  return (
    <div
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {(title || kicker || viewAllLink) && (
        <div className="flex items-end justify-between mb-6">
          <div>
            {kicker && <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">{kicker}</p>}
            {title && <h3 className="mt-2 font-display text-2xl font-bold text-ink-900">{title}</h3>}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-4">
            {viewAllLink && (
              <Link to={viewAllLink} className="text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors mr-3">
                Ver todos
              </Link>
            )}
            <NavBtn dir={-1} disabled={!canLeft} onClick={() => scroll(-1)} />
            <NavBtn dir={1} disabled={!canRight} onClick={() => scroll(1)} />
          </div>
        </div>
      )}

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 carousel-scroll"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {items.map((item, idx) => (
            <motion.div
              key={item.id ? `${item.id}-${idx}` : idx}
              className="flex-shrink-0 w-[272px]"
              style={{ scrollSnapAlign: 'start' }}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px -80px 0px 0px' }}
              transition={{ delay: Math.min(idx * 0.05, 0.4), duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <CarouselCard item={item} />
            </motion.div>
          ))}
        </div>
        {canLeft && <div className="pointer-events-none absolute left-0 top-0 bottom-4 w-10 bg-gradient-to-r from-white to-transparent" />}
        {canRight && <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-10 bg-gradient-to-l from-white to-transparent" />}
      </div>
    </div>
  );
}

function NavBtn({ dir, disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === -1 ? 'Anterior' : 'Próximo'}
      className="h-9 w-9 rounded-full border border-ink-200 bg-white shadow-soft flex items-center justify-center text-ink-600 hover:text-brand-700 hover:border-brand-300 disabled:opacity-25 disabled:cursor-default transition-all"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        {dir === -1
          ? <path d="M15 18 9 12l6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          : <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
    </button>
  );
}

// ─── Card partilhado ──────────────────────────────────────────────────────────
export function CarouselCard({ item }) {
  const [imgErr, setImgErr] = useState(false);

  const inner = (
    <>
      <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-50/60 to-white overflow-hidden rounded-t-2xl border-b border-ink-100">
        {item.image && !imgErr ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgErr(true)}
            className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full grid place-items-center">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" className="text-brand-200">
              <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="9" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="m4 18 4-4 3 3 5-5 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        {item.tag && (
          <span className="absolute top-3 left-3 rounded-full bg-brand-600 text-white px-2.5 py-0.5 text-[10px] font-semibold shadow-soft">
            {item.tag}
          </span>
        )}
        {item.sku && (
          <span className="absolute top-3 left-3 rounded-full bg-brand-600 text-white px-2.5 py-0.5 text-[10px] font-mono font-semibold shadow-soft">
            {item.sku}
          </span>
        )}
        {item.brandLogo && (
          <div className="absolute bottom-2 right-2 h-7 w-[68px] bg-white/95 rounded-lg grid place-items-center shadow-soft px-1.5 py-1">
            <img
              src={item.brandLogo}
              alt={item.brandName || ''}
              className="max-h-5 max-w-full object-contain"
              onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
            />
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        {item.areaName && (
          <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-500 mb-1">
            {item.areaName}
          </p>
        )}
        <p className="font-display text-sm font-bold text-ink-900 leading-tight line-clamp-2 group-hover:text-brand-700 transition-colors">
          {item.name}
        </p>
        {item.summary && (
          <p className="mt-1.5 text-xs text-ink-500 line-clamp-2 leading-relaxed">{item.summary}</p>
        )}
        {(item.link || item.url) && (
          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-700">
            <span>Ver mais</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
    </>
  );

  const cls = 'group flex flex-col rounded-2xl bg-white border border-ink-100 shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all duration-500 overflow-hidden h-full';

  if (item.link) return <Link to={item.link} className={cls}>{inner}</Link>;
  if (item.url) return <a href={item.url} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
  return <div className={cls}>{inner}</div>;
}
