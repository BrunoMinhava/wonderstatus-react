import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import BrandGrid from '../components/BrandGrid';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import QuimicaTabRail from '../components/QuimicaTabRail';
import { brandsByArea } from '../data/brands';
import chnsData from '../data/chns-toc-catalog-data';

export default function QuimicaCHNS() {
  const [activeCategory, setActiveCategory] = useState(chnsData[0].category);
  const [query, setQuery] = useState('');

  const currentItems = useMemo(() => {
    const cat = chnsData.find((c) => c.category === activeCategory);
    if (!cat) return [];
    const q = query.trim().toLowerCase();
    if (!q) return cat.items;
    return cat.items.filter((i) => i.name.toLowerCase().includes(q));
  }, [activeCategory, query]);

  return (
    <PageTransition>
      <PageMeta
        title="Consumíveis para Análise CHNS, TOC e Elementar"
        description="Consumíveis para analisadores CHNS-O e TOC: cápsulas de estanho e prata, barcos de combustão, reagentes e catalisadores. Compatíveis com Elementar, Thermo, Leco, Costech e EuroVector."
        path="/quimica/chns-toc"
      />
      <PageHeader
        kicker="Química · CHN/O/S · TOC"
        title="Consumíveis para CHN/O/S, TOC e Análise Elementar"
        subtitle="Acesso direto por aplicação e fabricante — Micro (CHN/O/S), Inorgânicos (C/S, N/O, H), Carbon/Sulphur, N Protein, Trace/TOC e Macro CHN/NC/NCS."
        image="/assets/fotos/quimica-consumiveis.png"
        noParallax
        actions={[
          { label: 'Ver aplicações', href: '#aplicações' },
          { label: 'Pedir informação', href: '/sobre#formulario-contacto', ghost: true }
        ]}
      />
      <QuimicaTabRail />

      {/* Categorias principais */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Categorias de consumíveis"
            title="Famílias técnicas disponíveis"
            description="Consumíveis organizados por tipo — cápsulas, reagentes, tubos de quartzo, padrões e acessórios."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Cápsulas', desc: 'Tin capsules, silver capsules e pressed tin para CHN/S/O.', items: ['Tin 4x6, 5x9, 8x5 mm', 'Silver capsules', 'Pressed tin cones', 'Sample holders'] },
              { title: 'Reagentes', desc: 'Copper wires, tungsten oxide, chromium oxide, silica wool.', items: ['Copper wires (reduced)', 'Tungsten oxide', 'Chromium oxide', 'Silica wool'] },
              { title: 'Tubos de quartzo', desc: 'Combustion e reduction tubes para analisadores elementares.', items: ['Combustion tubes', 'Reduction tubes', 'Ash crucibles', 'Water traps'] },
              { title: 'Consumíveis TOC', desc: 'Catalyst tubes, frits e reagentes para TOC.', items: ['Catalyst tubes', 'Frits e filtros', 'IC reagents', 'Standards TOC'] },
              { title: 'Padrões de calibração', desc: 'CRM para CHNS e TOC — sulfanilamide, BBOT e outras.', items: ['Sulfanilamide', 'Acetanilide', 'BBOT', 'Misturas CRM'] },
              { title: 'Acessórios', desc: 'Capsule presses, tweezers, micro spatulas e ferramentas.', items: ['Capsule presses', 'Tweezers', 'Micro spatulas', 'Balance tools'] }
            ].map((cat, idx) => (
              <ScrollReveal
                key={cat.title}
                delay={idx * 0.05}
                className="rounded-3xl bg-white border border-ink-100 shadow-soft p-7 card-hover"
              >
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 grid place-items-center text-white mb-4 shadow-soft">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M9 2v4M15 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8 6h8a2 2 0 0 1 2 2v11a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-ink-900">{cat.title}</h3>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">{cat.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-ink-700">
                  {cat.items.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Catálogo por aplicação — dados reais do site antigo */}
      <section className="section" id="aplicações">
        <div className="container-wide">
          <SectionHead
            kicker="Acesso rápido por aplicação"
            title="Categorias Elemental Microanalysis"
            description={`${chnsData.reduce((sum, c) => sum + c.items.length, 0)} subcategorias com acesso direto à página oficial Elemental Microanalysis.`}
          />

          <ScrollReveal className="mt-8 md:mt-10 rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
            {/* Tabs */}
            <div className="flex gap-2 p-4 md:p-6 overflow-x-auto scrollbar-hidden border-b border-ink-100">
              {chnsData.map((cat) => (
                <button
                  key={cat.category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.category);
                    setQuery('');
                  }}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat.category
                      ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-soft'
                      : 'bg-brand-50/50 text-ink-700 hover:bg-brand-50 hover:text-brand-700'
                  }`}
                >
                  {cat.category}
                  <span className="ml-2 opacity-70 text-xs">({cat.items.length})</span>
                </button>
              ))}
            </div>

            <div className="p-6 border-b border-ink-100">
              <div className="relative max-w-md">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Pesquisar subcategoria, fabricante..."
                  className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="m20 20-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + query}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-6 md:p-8"
              >
                {currentItems.length === 0 ? (
                  <p className="text-center py-10 text-ink-500">Sem resultados para a pesquisa.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {currentItems.map((item, i) => (
                      <motion.a
                        key={i}
                        href={item.url}
                        target="_blank" rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.03 }}
                        className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-ink-100 hover:border-brand-300 hover:shadow-soft transition-all"
                      >
                        <span className="text-sm font-medium text-ink-900 group-hover:text-brand-700 transition-colors flex-1 min-w-0">
                          {item.name}
                        </span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-brand-600 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        >
                          <path d="M7 17 17 7m0 0H9m8 0v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.a>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <ScrollReveal>
            <BrandGrid
              brands={brandsByArea.quimica.exclusive}
              kicker="Marcas"
              title="Marcas Exclusivas para CHN/O/S e TOC"
            />
          </ScrollReveal>
        </div>
      </section>

      <ContactCTA
        title="Precisa de identificar o consumível correto?"
        description="Indique o equipamento ou o método analítico e apoiamos na seleção da referência correta para a sua rotina."
      />
    </PageTransition>
  );
}
