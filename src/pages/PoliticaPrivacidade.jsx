import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import PageTransition from '../components/PageTransition';
import privacyData from '../data/privacy-data';

export default function PoliticaPrivacidade() {
  const [lang, setLang] = useState('pt');
  const data = privacyData[lang];

  return (
    <PageTransition>

      {/* Language switch */}
      <section className="py-6 border-b border-ink-100 bg-white/60 sticky top-20 z-30 backdrop-blur">
        <div className="container-wide flex items-center justify-between gap-4">
          <p className="text-sm text-ink-500">
            {lang === 'pt' ? 'Idioma:' : 'Language:'}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setLang('pt')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                lang === 'pt'
                  ? 'bg-brand-600 text-white shadow-soft'
                  : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
              }`}
            >
              🇵🇹 Português
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                lang === 'en'
                  ? 'bg-brand-600 text-white shadow-soft'
                  : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={lang}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {data.sections.map((sec, idx) => (
                <ScrollReveal
                  key={idx}
                  delay={idx * 0.04}
                  className="rounded-3xl bg-white border border-ink-100 shadow-soft p-8 md:p-10"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-white grid place-items-center font-display font-bold text-sm shadow-soft">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1">
                      <h2 className="font-display text-xl md:text-2xl font-bold text-ink-900">
                        {sec.title}
                      </h2>
                      <div className="mt-4 space-y-4 text-ink-700 leading-relaxed">
                        {sec.paragraphs.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                        {sec.lists &&
                          sec.lists.map((list, i) => (
                            <ul key={i} className="space-y-2 mt-4">
                              {list.map((item, j) => (
                                <li key={j} className="flex items-start gap-2">
                                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ))}
                        {sec.subsections && sec.subsections.length > 0 && (
                          <div className="mt-6 space-y-4 pl-4 border-l-2 border-brand-100">
                            {sec.subsections.map((sub, i) => (
                              <div key={i}>
                                <h3 className="font-display text-base font-bold text-ink-900">
                                  {sub.title}
                                </h3>
                                <div className="mt-2 space-y-2 text-sm">
                                  {sub.paragraphs.map((p, j) => (
                                    <p key={j}>{p}</p>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
}
