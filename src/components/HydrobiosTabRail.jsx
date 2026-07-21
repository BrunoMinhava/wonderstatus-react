import { useEffect, useRef, useState } from 'react';

const TABS = [
  { id: 'hydrobios-niskin',        label: 'Garrafas Niskin' },
  { id: 'hydrobios-rosette',       label: 'Sistemas Rosette' },
  { id: 'hydrobios-plankton',      label: 'Redes Plâncton' },
  { id: 'hydrobios-vertical',      label: 'Redes Vertical' },
  { id: 'hydrobios-horizontal',    label: 'Redes Horizontal' },
  { id: 'hydrobios-exame',         label: 'Câmaras de Exame' },
  { id: 'hydrobios-microplasticos',label: 'Microplásticos' },
  { id: 'hydrobios-sediment',      label: 'Sediment Traps' },
  { id: 'hydrobios-dragas',        label: 'Amostradores Fundo' },
  { id: 'hydrobios-medicao',       label: 'Medição e Apoio' },
];

export default function HydrobiosTabRail() {
  const [active, setActive] = useState(null);
  const railRef = useRef(null);
  const btnRefs = useRef({});

  useEffect(() => {
    const observers = [];
    TABS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
            const btn = btnRefs.current[id];
            if (btn && railRef.current) {
              const rail = railRef.current;
              rail.scrollTo({ left: btn.offsetLeft - rail.offsetWidth / 2 + btn.offsetWidth / 2, behavior: 'smooth' });
            }
          }
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="sticky top-14 md:top-[4.5rem] z-30 bg-white/95 backdrop-blur-md border-b border-ink-100 shadow-sm">
      <div className="container-wide">
        <div ref={railRef} className="overflow-x-auto scrollbar-none">
          <div className="flex gap-2 min-w-max py-3 px-1">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                ref={(el) => { btnRefs.current[id] = el; }}
                type="button"
                onClick={() => scrollTo(id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  active === id
                    ? 'bg-teal-600 text-white shadow-soft'
                    : 'bg-white border border-ink-200 text-ink-600 hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
