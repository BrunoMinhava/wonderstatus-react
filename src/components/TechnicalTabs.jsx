import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TechnicalTabs({ tabs, initial = 0 }) {
  const [active, setActive] = useState(initial);
  const current = tabs[active];

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hidden border-b border-ink-100">
        {tabs.map((t, i) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActive(i)}
            className={`relative whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              i === active
                ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-soft'
                : 'text-ink-700 hover:bg-brand-50 hover:text-brand-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
        >
          {current.content ? (
            current.content
          ) : (
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-ink-900">
                {current.label}
              </h3>
              {current.description && (
                <p className="mt-3 text-ink-600 leading-relaxed">{current.description}</p>
              )}
              {current.items && (
                <ul className="mt-5 space-y-2 text-ink-700">
                  {current.items.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
