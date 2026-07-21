import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import CatalogBrowser from '../components/CatalogBrowser';
import PageTransition from '../components/PageTransition';
import { wildcoFamilies } from '../data/ocean';
import oceanCatalog from '../data/ocean-catalog-data';

const wildcoCatalog = {
  brands: oceanCatalog.brands.filter((b) => b.id === 'wildco'),
  sections: oceanCatalog.sections
    ? oceanCatalog.sections.filter((s) => s.brandId === 'wildco')
    : [],
};

const TAB_CONFIG = {
  'wildco-fish':              { label: 'Recolha de Peixes',   image: '/assets/fotos/oceanografia/hydrobios/banner-wildco-fish.jpg' },
  'wildco-macroinvertebrates':{ label: 'Macroinvertebrados',  image: '/assets/fotos/oceanografia/hydrobios/banner-wildco-macroinvertebrates.jpg' },
  'wildco-plankton':          { label: 'Plâncton',            image: '/assets/fotos/oceanografia/hydrobios/banner-wildco-plankton.jpg' },
  'wildco-sieves':            { label: 'Crivos e Peneiras',   image: '/assets/fotos/oceanografia/hydrobios/banner-wildco-sieves.jpg' },
};

export default function OceanografiaWildco() {
  const [activeTab, setActiveTab] = useState('wildco-fish');
  const tabRailRef = useRef(null);
  const btnRefs = useRef({});

  const activeFamily = wildcoFamilies.find((f) => f.id === activeTab);
  const tabCfg = TAB_CONFIG[activeTab];

  function switchTab(id) {
    setActiveTab(id);
    const btn = btnRefs.current[id];
    if (btn && tabRailRef.current) {
      const rail = tabRailRef.current;
      rail.scrollTo({ left: btn.offsetLeft - rail.offsetWidth / 2 + btn.offsetWidth / 2, behavior: 'smooth' });
    }
  }

  return (
    <PageTransition>
      <PageMeta
        title="Amostragem Ambiental WildCo — Wonderstatus"
        description="Equipamento WildCo para amostragem ambiental: recolha de peixes, macroinvertebrados, plâncton, crivos e peneiras de campo."
        path="/oceanografia/wildco"
      />

      {/* Dynamic hero banner */}
      <div
        className="relative h-[420px] md:h-[500px] overflow-hidden"
        style={{ backgroundColor: '#0a1c3c' }}
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={`hero-${activeTab}`}
            src={tabCfg.image}
            alt="" aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right,rgba(10,28,60,.9) 0%,rgba(10,28,60,.6) 40%,rgba(10,28,60,.1) 70%,transparent 100%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 container-wide h-full flex flex-col justify-end pb-12 md:pb-16 pt-24">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="/assets/logos/wildco.png"
              alt="WildCo"
              className="h-5 w-auto object-contain opacity-90"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-blue-300">
            Oceanografia · Amostragem Ambiental · WildCo
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-3xl">
            {activeFamily?.title}
          </h1>
          <p className="mt-3 text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
            {activeFamily?.description}
          </p>
          <div className="mt-5">
            <Link
              to="/oceanografia"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Oceanografia
            </Link>
          </div>
        </div>
      </div>

      {/* Tab rail */}
      <div className="sticky top-14 md:top-[4.5rem] z-30 bg-white/95 backdrop-blur-md border-b border-ink-100 shadow-sm">
        <div className="container-wide">
          <div className="flex items-center gap-2">
            <div ref={tabRailRef} className="flex-1 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-1 min-w-max py-2.5 px-1">
                <img
                  src="/assets/logos/wildco.png"
                  alt="WildCo"
                  className="h-4 w-auto object-contain opacity-40 mx-2 shrink-0"
                />
                {wildcoFamilies.map((fam) => {
                  const cfg = TAB_CONFIG[fam.id];
                  return (
                    <button
                      key={fam.id}
                      ref={(el) => { btnRefs.current[fam.id] = el; }}
                      type="button"
                      onClick={() => switchTab(fam.id)}
                      className={`px-3.5 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                        activeTab === fam.id
                          ? 'bg-blue-700 text-white shadow-soft'
                          : 'bg-white border border-ink-200 text-ink-600 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50'
                      }`}
                    >
                      {cfg.label}
                    </button>
                  );
                })}
                {/* Separador + botão catálogo Van Dorn */}
                <span className="mx-1 h-5 w-px bg-ink-200 shrink-0" />
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-3.5 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 bg-white border border-ink-200 text-ink-600 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 flex items-center gap-1.5"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><rect x="3" y="3" width="18" height="12" rx="2"/>
                  </svg>
                  Garrafas Van Dorn
                </button>
              </div>
            </div>
            {/* Catalog download button */}
            <a
              href="/assets/importados/catalogo-wildco.pdf"
              download="Catalogo-WildCo.pdf"
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 hover:border-blue-300 transition-all whitespace-nowrap mr-1"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Catálogo PDF
            </a>
          </div>
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {activeFamily && (
            <section className="section">
              <div className="container-wide">
                <SectionHead
                  kicker={activeFamily.kicker}
                  title={activeFamily.title}
                  description={activeFamily.description}
                />
                <div className="mt-8 md:mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {activeFamily.products.map((p, idx) => (
                    <ScrollReveal key={p.url + idx} delay={idx * 0.04}>
                      <a
                        href={p.url}
                        target="_blank" rel="noopener noreferrer"
                        className="group flex flex-col rounded-2xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover h-full"
                      >
                        <div className="flex items-center justify-center p-4 h-44 bg-gradient-to-b from-blue-50/50 to-white">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4 flex flex-col flex-1 border-t border-ink-100">
                          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                            WildCo
                          </p>
                          <h3 className="mt-1.5 font-display text-sm font-bold text-ink-900 group-hover:text-brand-700 transition-colors leading-snug">
                            {p.name}
                          </h3>
                          <div className="mt-auto pt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:gap-2 transition-all">
                            Ver produto
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                              <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                      </a>
                    </ScrollReveal>
                  ))}
                </div>
                <ScrollReveal className="mt-8 text-center">
                  <a href={activeFamily.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    {activeFamily.sourceLabel}
                  </a>
                </ScrollReveal>
              </div>
            </section>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Catálogo WildCo — Van Dorn e amostradores */}
      {wildcoCatalog.sections.length > 0 && (
        <section className="section bg-ink-50/50 border-t border-ink-100" id="catalogo">
          <div className="container-wide">
            <SectionHead
              kicker="Catálogo WildCo"
              title="Catálogo completo WildCo"
              description="Garrafas Van Dorn, kits e componentes — pesquise por nome, tipo ou referência."
            />
            <div className="mt-8 md:mt-10">
              <CatalogBrowser
                brands={wildcoCatalog.brands}
                sections={wildcoCatalog.sections}
                searchPlaceholder="Pesquisar Van Dorn, Beta Plus, Alpha..."
              />
            </div>
          </div>
        </section>
      )}

      <ContactCTA
        title="Equipamento WildCo para a sua campanha?"
        description="Apoiamos na seleção de redes, crivos, armadilhas e amostradores WildCo para amostragem ambiental em campo."
      />
    </PageTransition>
  );
}
