import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import CatalogBrowser from '../components/CatalogBrowser';
import PageTransition from '../components/PageTransition';
import { hydroBiosFamilies } from '../data/ocean';
import oceanCatalog from '../data/ocean-catalog-data';

const hydroCatalog = {
  brands: oceanCatalog.brands.filter((b) => b.id === 'hydrobios'),
  sections: oceanCatalog.sections
    ? oceanCatalog.sections.filter((s) => s.brandId === 'hydrobios')
    : [],
};

const TAB_CONFIG = {
  'hydrobios-niskin':         { label: 'Garrafas Niskin',   image: '/assets/fotos/oceanografia/hydrobios/banner-niskin.jpg' },
  'hydrobios-rosette':        { label: 'Sistemas Rosette',  image: '/assets/fotos/oceanografia/hydrobios/banner-rosette.jpg' },
  'hydrobios-plankton':       { label: 'Redes Plâncton',    image: '/assets/fotos/oceanografia/hydrobios/banner-plankton.jpg' },
  'hydrobios-vertical':       { label: 'Redes Vertical',    image: '/assets/fotos/oceanografia/hydrobios/banner-vertical.jpg' },
  'hydrobios-horizontal':     { label: 'Redes Horizontal',  image: '/assets/fotos/oceanografia/hydrobios/banner-horizontal.jpg' },
  'hydrobios-exame':          { label: 'Câmaras de Exame',  image: '/assets/fotos/oceanografia/hydrobios/banner-exame.jpg' },
  'hydrobios-microplasticos': { label: 'Microplásticos',    image: '/assets/fotos/oceanografia/hydrobios/banner-microplasticos.jpg' },
  'hydrobios-sediment':       { label: 'Sediment Traps',    image: '/assets/fotos/oceanografia/hydrobios/banner-sediment.jpg' },
  'hydrobios-dragas':         { label: 'Amostr. Fundo',     image: '/assets/fotos/oceanografia/hydrobios/banner-dragas.jpg' },
  'hydrobios-medicao':        { label: 'Medição e Apoio',   image: '/assets/fotos/oceanografia/hydrobios/banner-medicao.jpg' },
};

export default function OceanografiaHydrobios() {
  const [activeTab, setActiveTab] = useState('hydrobios-niskin');
  const tabRailRef = useRef(null);
  const btnRefs = useRef({});

  const activeFamily = hydroBiosFamilies.find((f) => f.id === activeTab);
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
        title="Amostragem Oceanográfica Hydrobios — Wonderstatus"
        description="Equipamento de amostragem oceanográfica Hydrobios: garrafas Niskin, redes de plâncton, rosette, sediment traps, câmaras de exame e mais."
        path="/oceanografia/hydrobios"
      />

      {/* Dynamic hero banner */}
      <div
        className="relative h-[420px] md:h-[500px] overflow-hidden"
        style={{ backgroundColor: '#072a28' }}
        id="hydrobios-panel"
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
          style={{ background: 'linear-gradient(to right,rgba(7,42,40,.9) 0%,rgba(7,42,40,.6) 40%,rgba(7,42,40,.1) 70%,transparent 100%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 container-wide h-full flex flex-col justify-end pb-12 md:pb-16 pt-24">
          <div className="flex items-center gap-3 mb-3">
            <img
              src="/assets/logos/hydrobios.png"
              alt="Hydrobios"
              className="h-5 w-auto object-contain opacity-90"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-teal-300">
            Oceanografia · Amostragem · Hydrobios
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

      {/* Sticky tab rail */}
      <div className="sticky top-14 md:top-[4.5rem] z-30 bg-white/95 backdrop-blur-md border-b border-ink-100 shadow-sm">
        <div className="container-wide">
          <div ref={tabRailRef} className="overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1 min-w-max py-2.5 px-1">
              <img
                src="/assets/logos/hydrobios.png"
                alt="Hydrobios"
                className="h-4 w-auto object-contain opacity-40 mx-2 shrink-0"
              />
              {hydroBiosFamilies.map((fam) => {
                const cfg = TAB_CONFIG[fam.id];
                return (
                  <button
                    key={fam.id}
                    ref={(el) => { btnRefs.current[fam.id] = el; }}
                    type="button"
                    onClick={() => switchTab(fam.id)}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                      activeTab === fam.id
                        ? 'bg-teal-600 text-white shadow-soft'
                        : 'bg-white border border-ink-200 text-ink-600 hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50'
                    }`}
                  >
                    {cfg.label}
                  </button>
                );
              })}
            </div>
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
          {/* IWS 4 spotlight — only on niskin tab */}
          {activeTab === 'hydrobios-niskin' && (
            <section className="section bg-gradient-to-br from-cyan-950 via-teal-900 to-brand-950">
              <div className="container-wide">
                <ScrollReveal>
                  <div className="inline-flex items-center gap-2 rounded-full bg-teal-400/20 border border-teal-400/30 px-4 py-1.5 mb-6">
                    <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-teal-300">Novidade Hydrobios</span>
                  </div>
                </ScrollReveal>
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  <ScrollReveal>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
                      Amostradores de Água<br />Integradores IWS&nbsp;4
                    </h2>
                    <p className="mt-4 text-lg text-white/70 leading-relaxed">
                      Amostragem integrada em profundidade ou no tempo, numa única descida. A 4.ª geração dos amostradores IWS combina eletrónica de precisão, bateria LiFePO₄ e três modos de recolha num equipamento compacto até 1000 m.
                    </p>
                    <ul className="mt-6 space-y-3">
                      {[
                        { label: 'Amostragem integrada real', desc: 'Toda a coluna de água numa única operação automática.' },
                        { label: 'Três modos num só equipamento', desc: 'Por profundidade, por tempo e pontual (spot).' },
                        { label: 'Sensor de pressão de precisão', desc: '0–100 dbar, exatidão ±0,02 % f.e., resposta 100 ms.' },
                        { label: 'Telemetria a mais de 10 000 m', desc: 'Apenas 3,3 V DC de alimentação; ADC interno de 24 bit.' },
                      ].map((item) => (
                        <li key={item.label} className="flex items-start gap-3">
                          <span className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-teal-400/20 flex items-center justify-center">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                              <path d="M20 6 9 17l-5-5" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                          <div>
                            <span className="text-sm font-semibold text-white">{item.label}</span>
                            <span className="text-sm text-white/60"> — {item.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-3">
                      {[
                        { label: 'IWS 4 · 2,5 l', sub: 'Ref. 436 612 · 72 cm · 9,5 kg', href: 'https://www.hydrobios.de/en/product?product_id=238' },
                        { label: 'IWS 4 · 5 l',   sub: 'Ref. 436 617 · 88 cm · 10 kg',  href: 'https://www.hydrobios.de/en/product?product_id=236' },
                      ].map((model) => (
                        <a key={model.label} href={model.href} target="_blank" rel="noopener noreferrer"
                          className="group flex-1 min-w-[160px] rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 hover:border-teal-400/50 p-4 transition-all">
                          <p className="font-display font-bold text-white text-sm">{model.label}</p>
                          <p className="text-xs text-white/50 mt-0.5">{model.sub}</p>
                          <p className="mt-2 text-xs text-teal-400 font-semibold group-hover:underline">Ver no site oficial →</p>
                        </a>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Link to="/sobre#formulario-contacto"
                        className="inline-flex items-center gap-2 rounded-full bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-2.5 text-sm transition-all">
                        Pedir informação / orçamento
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={0.1}>
                    <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                      <video src="/assets/videos/iws4.mp4" controls playsInline className="w-full aspect-video object-cover">
                        O seu navegador não suporta vídeo HTML5.
                      </video>
                    </div>
                    <p className="mt-3 text-xs text-white/40 text-center">IWS 4 — Integrating Water Sampler 4ª geração · Hydrobios</p>
                  </ScrollReveal>
                </div>
              </div>
            </section>
          )}

          {/* Family products */}
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
                        <div className="flex items-center justify-center p-4 h-44 bg-gradient-to-b from-brand-50/40 to-white">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4 flex flex-col flex-1 border-t border-ink-100">
                          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">
                            Hydrobios
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

      {/* Catálogo Hydrobios */}
      <section className="section bg-ink-50/50 border-t border-ink-100" id="catalogo">
        <div className="container-wide">
          <SectionHead
            kicker="Catálogo Hydrobios"
            title="Catálogo completo Hydrobios"
            description="Produtos organizados por família — pesquise por nome, tipo ou referência."
          />
          <ScrollReveal className="mt-8 md:mt-10">
            <CatalogBrowser
              brands={hydroCatalog.brands}
              sections={hydroCatalog.sections}
              searchPlaceholder="Pesquisar garrafas, redes, sediment traps..."
            />
          </ScrollReveal>
        </div>
      </section>

      <ContactCTA
        title="Preparar uma campanha de amostragem?"
        description="Apoiamos na seleção de garrafas Niskin, redes, rosette, sediment traps e todo o equipamento Hydrobios para a sua campanha."
      />
    </PageTransition>
  );
}
