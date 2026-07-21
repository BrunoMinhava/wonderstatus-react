import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import SectionHead from '../components/SectionHead';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import labCatalog from '../data/lab-catalog-data';

const CATEGORY_TABS = [
  {
    id: 'vidro',
    label: 'Vidro & Recipientes',
    kicker: 'Auxilab',
    sectionIds: ['aux-containers'],
    description: 'Beakers, frascos, viais, jarras, bidons, cápsulas de evaporação e recipientes em vidro, plástico, PTFE e porcelana para rotina laboratorial.',
    brandId: 'auxilab',
    color: 'from-sky-950 via-sky-900 to-brand-900',
    accent: 'text-sky-400',
    image: '/assets/fotos/lab-vidro.png',
  },
  {
    id: 'volumetria',
    label: 'Volumetria',
    kicker: 'Auxilab',
    sectionIds: ['aux-volumetry'],
    description: 'Buretas, pipetas graduadas, cilindros graduados, matraces volumétricos, cones Imhoff e pipetas de transferência para medições rigorosas.',
    brandId: 'auxilab',
    color: 'from-teal-950 via-teal-900 to-brand-900',
    accent: 'text-teal-400',
    image: '/assets/fotos/lab-volumetria.png',
  },
  {
    id: 'liquidos',
    label: 'Líquidos & Seringas',
    kicker: 'Auxilab',
    sectionIds: ['aux-liquid-handling'],
    description: 'Dispensadores de topo de frasco, micropipetas, controladores de pipeta, bombas peristálticas e seringas de laboratório.',
    brandId: 'auxilab',
    color: 'from-cyan-950 via-cyan-900 to-brand-900',
    accent: 'text-cyan-400',
    image: '/assets/fotos/lab-liquidos.png',
  },
  {
    id: 'filtracao',
    label: 'Filtração',
    kicker: 'CHM Lab Group',
    sectionIds: ['chm-filtration'],
    description: 'Papéis de filtro quantitativos e qualitativos, filtros de fibra de vidro, filtros de quartzo, dedais de extracção e papéis de separação de fases.',
    brandId: 'chm',
    color: 'from-emerald-950 via-emerald-900 to-brand-900',
    accent: 'text-emerald-400',
    image: '/assets/fotos/chmlab-filtracao.jpg',
  },
  {
    id: 'cromatografia',
    label: 'Cromatografia',
    kicker: 'CHM Lab Group',
    sectionIds: ['chm-chromatography'],
    description: 'Colunas HPLC, cromatografia em camada fina (TLC), viais e tampas, micro-inserts, miniviais, colunas SPE e QuEChERS.',
    brandId: 'chm',
    color: 'from-green-950 via-green-900 to-brand-900',
    accent: 'text-green-400',
    image: '/assets/fotos/lab-cromatografia.png',
  },
  {
    id: 'pcr',
    label: 'PCR & Biologia Molecular',
    kicker: 'Umura',
    sectionIds: ['umura-consumables'],
    description: 'Ponteiras de pipeta com e sem filtro (200 µL, 1000 µL), strips PCR 0,2 mL e tubos de centrífuga 15 mL — todos estéreis e com recargas eco.',
    brandId: 'umura',
    color: 'from-violet-950 via-violet-900 to-brand-900',
    accent: 'text-violet-400',
    image: '/assets/fotos/lab-pcr.png',
  },
  {
    id: 'pipetagem',
    label: 'Micropipetas & Dispensadores',
    kicker: 'Socorex',
    sectionIds: [
      'socorex-micropipetas',
      'socorex-dispensadores',
      'socorex-controladores-pipeta',
      'socorex-consumiveis-acessorios',
    ],
    description: 'Micropipetas acura manuais e electrónicas, dispensadores calibrex e dosys, controladores de pipeta profiller e consumíveis de alta precisão suíços.',
    brandId: 'socorex',
    color: 'from-blue-950 via-blue-900 to-brand-900',
    accent: 'text-blue-300',
    image: '/assets/fotos/lab-pipetagem.png',
  },
  {
    id: 'cabinas',
    label: 'Cabinas & Incubação',
    kicker: 'CRUMA',
    sectionIds: ['cruma-laboratorio'],
    description: 'Cabinas de extracção sem dutos, armários ventilados, fluxo laminar vertical e horizontal, cabinas PCR, biosegurança e incubadoras de CO₂.',
    brandId: 'cruma',
    color: 'from-orange-950 via-orange-900 to-brand-900',
    accent: 'text-orange-400',
    image: '/assets/fotos/lab-cabinas.png',
  },
  {
    id: 'bancada',
    label: 'Equipamento de Bancada',
    kicker: 'JP Selecta',
    sectionIds: ['jp-selecta-laboratorio'],
    description: 'Estufas, autoclaves, banhos de água, centrífugas, agitadores, espectrofotómetros, refractómetros e instrumentação analítica de bancada.',
    brandId: 'jp-selecta',
    color: 'from-red-950 via-red-900 to-brand-900',
    accent: 'text-red-400',
    image: '/assets/fotos/lab-bancada.png',
  },
  {
    id: 'medicao',
    label: 'Medição (pH, CE…)',
    kicker: 'Milwaukee Instruments',
    sectionIds: [
      'milwaukee-pens-testers',
      'milwaukee-portable-meters',
      'milwaukee-bench-meters',
      'milwaukee-photometers',
      'milwaukee-monitors-controllers',
      'milwaukee-refractometers',
      'milwaukee-probes-solutions',
    ],
    description: 'Pens e testers, medidores portáteis e de bancada para pH, CE, ORP, OD, turbidez, fotómetros, monitores, controladores, refractómetros e reagentes.',
    brandId: 'milwaukee',
    color: 'from-yellow-950 via-yellow-900 to-brand-900',
    accent: 'text-yellow-400',
    image: '/assets/fotos/lab-medicao.png',
  },
  {
    id: 'acessorios',
    label: 'Acessórios 3D',
    kicker: 'Wonderstatus',
    sectionIds: ['wonderstatus-acessorios'],
    description: 'Suportes 3D impressos para micropipetas e instrumentação laboratorial, desenvolvidos e fabricados pela Wonderstatus com design hexagonal exclusivo.',
    brandId: 'wonderstatus',
    color: 'from-brand-950 via-brand-900 to-brand-800',
    accent: 'text-brand-300',
    image: '/assets/products/suporte-3d-micropipetas-1.jpg',
  },
  {
    id: 'gelo',
    label: 'Máquinas de Gelo',
    kicker: 'ITV Ice Makers',
    sectionIds: ['itv-gelo'],
    description: 'Máquinas de gelo Diamond Ice compactas para laboratório e conservação de amostras — IQ 50C (55 kg/24h) e IQ 90C (94 kg/24h) com refrigerante R290 ecológico.',
    brandId: 'itv',
    color: 'from-sky-950 via-cyan-900 to-brand-900',
    accent: 'text-cyan-300',
    image: '/assets/fotos/itv-icemaker.png',
  },
];

export default function MaterialLaboratorio() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(CATEGORY_TABS[0].id);
  const [query, setQuery] = useState('');
  const tabRailRef = useRef(null);
  const tabRefs = useRef({});

  // Activate tab from URL hash on mount or navigation
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && CATEGORY_TABS.some((t) => t.id === hash)) {
      setActiveTab(hash);
      setQuery('');
      // Scroll tab chip into view in rail
      setTimeout(() => {
        const el = tabRefs.current[hash];
        if (el && tabRailRef.current) {
          const rail = tabRailRef.current;
          rail.scrollTo({ left: el.offsetLeft - rail.offsetWidth / 2 + el.offsetWidth / 2, behavior: 'smooth' });
        }
        document.getElementById('lab-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 350);
    }
  }, [location.hash]);

  function switchTab(id) {
    setActiveTab(id);
    setQuery('');
    // Scroll active chip into view in rail only
    const el = tabRefs.current[id];
    if (el && tabRailRef.current) {
      const rail = tabRailRef.current;
      rail.scrollTo({ left: el.offsetLeft - rail.offsetWidth / 2 + el.offsetWidth / 2, behavior: 'smooth' });
    }
  }

  const tabConfig = CATEGORY_TABS.find((t) => t.id === activeTab);

  const currentSections = useMemo(
    () => labCatalog.sections.filter((s) => tabConfig?.sectionIds.includes(s.id)),
    [tabConfig]
  );

  const allFamilies = useMemo(
    () => currentSections.flatMap((sec) => (sec.families || []).map((f) => ({ ...f, _section: sec }))),
    [currentSections]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allFamilies;
    return allFamilies.filter((f) => {
      const haystack = [
        f.name, f.navLabel, f.sku, f.summary, f._section?.title,
        ...(f.items || []).map((i) => i.name || ''),
        ...((f.capacityTable?.rows || []).flat()),
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [allFamilies, query]);

  const activeBrand = labCatalog.brands.find((b) => b.id === tabConfig?.brandId);

  const totalCount = useMemo(() => {
    let total = 0;
    labCatalog.sections.forEach((s) => { total += s.families?.length || 0; });
    return total;
  }, []);

  return (
    <PageTransition>
      <PageMeta
        title="Material de Laboratório — JP Selecta, Auxilab, CRUMA, Socorex"
        description="Equipamentos e consumíveis de laboratório: estufas, autoclaves, centrífugas, vidros, micropipetas, cabines de fluxo laminar, medidores pH e condutividade. Marcas JP SELECTA, Auxilab, CRUMA, Socorex e Milwaukee."
        path="/material-laboratorio"
      />

      {/* Dynamic hero banner — image crossfades on tab switch */}
      <div className="relative h-[420px] md:h-[500px] overflow-hidden bg-ink-950" id="catalogo">
        {/* Crossfading background images */}
        <AnimatePresence initial={false}>
          <motion.img
            key={`hero-img-${activeTab}`}
            src={tabConfig.image}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/60 to-ink-950/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent pointer-events-none" />

        {/* Text content stays stable */}
        <div className="relative z-10 container-wide h-full flex flex-col justify-end pb-12 md:pb-16 pt-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-300 mb-3">
            Catálogo Completo · Material de Laboratório
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Material de<br />Laboratório
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/75 max-w-2xl leading-relaxed">
            {`Catálogo com ${totalCount} linhas técnicas de 8 fabricantes — vidro, filtração, cromatografia, biologia molecular, cabinas, pipetagem e medição.`}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#lab-panel"
              onClick={(e) => { e.preventDefault(); document.getElementById('lab-panel')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 text-sm font-semibold shadow-soft transition-colors"
            >
              Ver catálogo
            </a>
            <a
              href="/sobre#formulario-contacto"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 hover:border-white/70 text-white px-6 py-3 text-sm font-semibold backdrop-blur-sm transition-colors"
            >
              Pedir informação
            </a>
          </div>
        </div>
      </div>

      {/* Sticky category tab rail */}
      <div className="sticky top-14 md:top-[4.5rem] z-30 bg-white/95 backdrop-blur-md border-b border-ink-100 shadow-sm" id="lab-panel">
        <div className="container-wide">
          <div ref={tabRailRef} className="overflow-x-auto scrollbar-none">
            <div className="flex gap-2 min-w-max py-3 px-1">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  ref={(el) => { tabRefs.current[tab.id] = el; }}
                  type="button"
                  onClick={() => switchTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-brand-600 text-white shadow-soft'
                      : 'bg-white border border-ink-200 text-ink-600 hover:border-brand-400 hover:text-brand-700 hover:bg-brand-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tab content — scroll target with offset for navbar + tab rail */}
      <div id="lab-content" className="scroll-mt-32">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Category hero bar */}
          <div className={`bg-gradient-to-r ${tabConfig.color}`}>
            <div className="container-wide py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-6">
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold uppercase tracking-widest mb-1.5 ${tabConfig.accent}`}>
                  {tabConfig.kicker} · Material de Laboratório
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
                  {tabConfig.label}
                </h2>
                <p className="mt-2 text-base text-white/70 max-w-2xl leading-relaxed">
                  {tabConfig.description}
                </p>
              </div>
              {activeBrand && (
                <a
                  href={activeBrand.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 transition-colors flex-shrink-0"
                >
                  <img
                    src={activeBrand.logo}
                    alt={activeBrand.name}
                    className="h-8 max-w-[110px] object-contain brightness-0 invert"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17 17 7m0 0H9m8 0v8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Products panel */}
          <section className="section">
            <div className="container-wide">
              {/* Search + count */}
              <div className="mb-7 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="relative max-w-sm w-full">
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Pesquisar em ${tabConfig.label}...`}
                    className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent shadow-sm"
                  />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                    <path d="m20 20-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-sm text-ink-500">
                  <span className="font-semibold text-ink-800">{filtered.length}</span>{' '}
                  {filtered.length === 1 ? 'linha disponível' : 'linhas disponíveis'}
                </p>
              </div>

              {/* Sections */}
              {currentSections.map((sec) => {
                const secFiltered = filtered.filter((f) => f._section?.id === sec.id);
                if (secFiltered.length === 0 && query) return null;
                return (
                  <div key={sec.id} className="mb-10">
                    {currentSections.length > 1 && (
                      <div className="mb-5 pb-4 border-b border-ink-100">
                        {sec.kicker && (
                          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                            {sec.kicker}
                          </p>
                        )}
                        <h4 className="mt-1 font-display text-xl md:text-2xl font-bold text-ink-900">
                          {sec.title}
                        </h4>
                        {sec.description && (
                          <p className="mt-2 text-sm text-ink-600 max-w-3xl">{sec.description}</p>
                        )}
                      </div>
                    )}

                    {secFiltered.length === 0 ? (
                      <p className="text-center py-8 text-ink-500">
                        Nenhum produto encontrado para a pesquisa.
                      </p>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {secFiltered.map((fam, idx) => (
                          <ProductCard key={fam.id || idx} family={fam} index={idx} />
                        ))}
                      </div>
                    )}

                    {/* Section videos */}
                    {sec.videos?.length > 0 && !query && (
                      <div className="mt-10 rounded-3xl bg-gradient-to-br from-ink-900 to-brand-950 p-8 md:p-10">
                        <p className="text-xs font-semibold uppercase tracking-widest text-brand-300 mb-1">
                          Em destaque
                        </p>
                        <h4 className="font-display text-xl md:text-2xl font-bold text-white mb-2">
                          As Principais Vantagens deste Produto — em Vídeo
                        </h4>
                        <p className="text-sm text-ink-300 mb-7 max-w-2xl">
                          Descubra o que distingue esta gama na prática: demonstrações reais, técnicas de calibração e funcionalidades exclusivas.
                        </p>
                        <div className="grid md:grid-cols-2 gap-5">
                          {sec.videos.map((v) => (
                            <a
                              key={v.id}
                              href={`https://www.youtube.com/watch?v=${v.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/vid flex flex-col rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-400/50 transition-all duration-300"
                            >
                              <div className="relative aspect-video overflow-hidden">
                                <img
                                  src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                                  alt={v.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover/vid:scale-105"
                                />
                                <div className="absolute inset-0 bg-ink-950/40 group-hover/vid:bg-ink-950/20 transition-colors flex items-center justify-center">
                                  <div className="w-14 h-14 rounded-full bg-white/90 group-hover/vid:bg-white grid place-items-center shadow-lg transition-all duration-300 group-hover/vid:scale-110">
                                    <svg className="w-6 h-6 text-brand-700 ml-1" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M8 5v14l11-7z" />
                                    </svg>
                                  </div>
                                </div>
                                <div className="absolute top-3 right-3 bg-ink-950/70 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white flex items-center gap-1">
                                  <svg className="w-3 h-3 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.1 2.7 12 2.7 12 2.7s-4.1 0-6.8.2c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.2v2c0 2.1.3 4.2.3 4.2s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.3 21.6 12 21.7 12 21.7s4.1 0 6.8-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.2v-2C23.3 9.1 23 7 23 7z" />
                                  </svg>
                                  YouTube
                                </div>
                              </div>
                              <div className="p-5 flex-1">
                                <h5 className="font-semibold text-white text-sm md:text-base leading-snug group-hover/vid:text-brand-300 transition-colors">
                                  {v.title}
                                </h5>
                                {v.description && (
                                  <p className="mt-2 text-xs text-ink-400 leading-relaxed">{v.description}</p>
                                )}
                                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 group-hover/vid:text-brand-300">
                                  Ver no YouTube
                                  <svg className="w-3 h-3 transition-transform group-hover/vid:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 17 17 7m0 0H9m8 0v8" />
                                  </svg>
                                </span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Featured video embed */}
          </section>
        </motion.div>
      </AnimatePresence>

      </div>{/* /lab-content */}

      {/* Brand grid at bottom */}
      <section className="section bg-ink-50/50 border-t border-ink-100">
        <div className="container-wide">
          <SectionHead
            kicker="Todas as marcas"
            title="Ver catálogo por fabricante"
            description="Aceda diretamente ao site oficial de cada marca para o catálogo completo, fichas técnicas e informações de produto."
          />
          <div className="mt-8 md:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {labCatalog.brands.map((brand) => (
              <a
                key={brand.id}
                href={brand.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-ink-100 hover:border-brand-300 hover:shadow-soft transition-all duration-300"
              >
                <div className="h-14 w-full flex items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-12 max-w-[80%] object-contain"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-ink-900 group-hover:text-brand-700 transition-colors">
                    {brand.name}
                  </p>
                  {brand.highlight && (
                    <p className="mt-0.5 text-xs text-ink-500 leading-tight">{brand.highlight}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA
        title="Precisa de apoio para selecionar referências?"
        description="A Wonderstatus apoia a escolha de linhas, compatibilidades e configurações para cada contexto de laboratório."
      />
    </PageTransition>
  );
}

function ProductCard({ family, index }) {
  const [tableOpen, setTableOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const name = family.name || family.navLabel || family.title || '';
  const image = family.image || family.photo;
  const items = family.items || family.products || [];
  const url = family.url || family._section?.sourceUrl;
  const summary = family.summary || family.description;
  const capacityTable = family.capacityTable;
  const sku = family.sku;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
      className="group rounded-2xl bg-white border border-ink-100 shadow-soft overflow-hidden hover:shadow-glow hover:-translate-y-1 transition-all duration-500 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-50/70 via-white to-brand-50/40 border-b border-ink-100 overflow-hidden">
        {image && !imgError ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-contain p-5 transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center gap-3 p-6 bg-gradient-to-br from-brand-50 via-white to-ink-50">
            <div className="w-16 h-16 rounded-2xl bg-brand-100/60 border border-brand-200/50 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B7DD8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider text-center">
              {family._section?.kicker || name.split(' ').slice(0, 3).join(' ')}
            </p>
          </div>
        )}
        {sku && (
          <span className="absolute top-3 left-3 inline-flex rounded-full bg-brand-600 text-white px-3 py-1 text-[11px] font-mono font-semibold shadow-soft">
            {sku}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display text-base md:text-lg font-bold text-ink-900 leading-tight">
          {name}
        </h3>
        {summary && (
          <p className="mt-2 text-sm text-ink-600 leading-relaxed line-clamp-3">{summary}</p>
        )}

        {/* Capacity table */}
        {capacityTable && capacityTable.rows && capacityTable.rows.length > 0 && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setTableOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-brand-50 border border-brand-100 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition-colors"
            >
              <span>Tabela de referências ({capacityTable.rows.length})</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className={`transition-transform ${tableOpen ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <AnimatePresence initial={false}>
              {tableOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 overflow-x-auto rounded-lg border border-ink-100">
                    <table className="w-full text-xs">
                      <thead className="bg-ink-50 text-ink-700">
                        <tr>
                          {capacityTable.columns.map((col, i) => (
                            <th key={i} className="text-left font-semibold uppercase tracking-wider text-[10px] px-3 py-2 whitespace-nowrap">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {capacityTable.rows.map((row, i) => {
                          const isHighlight = capacityTable.highlightSku && row[0] === capacityTable.highlightSku;
                          return (
                            <tr key={i} className={`border-t border-ink-100 ${isHighlight ? 'bg-brand-50 font-semibold' : ''}`}>
                              {row.map((cell, j) => (
                                <td key={j} className={`px-3 py-2 whitespace-nowrap ${j === 0 ? 'font-mono text-brand-700' : 'text-ink-700'}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Items list */}
        {items.length > 0 && !capacityTable && (
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500 mb-2">
              {items.length} {items.length === 1 ? 'sub-linha' : 'sub-linhas'}
            </p>
            <ul className="space-y-1 max-h-32 overflow-y-auto pr-2 text-sm">
              {items.slice(0, 8).map((item, i) => {
                const itemName = item.name || item.title || '';
                const itemUrl = item.url || item.sourceUrl;
                return (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-brand-400 flex-shrink-0" />
                    {itemUrl ? (
                      <a href={itemUrl} target="_blank" rel="noopener noreferrer" className="text-ink-700 hover:text-brand-700 transition-colors text-xs">
                        {itemName}
                      </a>
                    ) : (
                      <span className="text-ink-700 text-xs">{itemName}</span>
                    )}
                  </li>
                );
              })}
              {items.length > 8 && (
                <li className="text-xs text-ink-500 italic pl-2">+ {items.length - 8} mais no site oficial</li>
              )}
            </ul>
          </div>
        )}

        {/* CTA */}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto pt-4 inline-flex items-center justify-between gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800 group/link"
          >
            <span>Ver no site oficial</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            >
              <path d="M7 17 17 7m0 0H9m8 0v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </motion.article>
  );
}
