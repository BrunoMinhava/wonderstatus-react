import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import ProductCarousel, { InfiniteCarousel } from '../components/ProductCarousel';
import { waterProducts, complementarySystems, pretreatment } from '../data/water';
import labCatalog from '../data/lab-catalog-data';
import oceanCatalog from '../data/ocean-catalog-data';
import mycoStandards from '../data/myco-standards-data';
import grafiteCatalog from '../data/grafite-catalog-data';
import icpCatalog from '../data/icp-catalog-data';
import chnsTocCatalog from '../data/chns-toc-catalog-data';

const normalize = (str) =>
  str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

const PT_EN = {
  tubos: ['tubes', 'tubing', 'tube'],
  tubo: ['tube', 'tubes', 'tubing'],
  filtros: ['filters', 'filter', 'filtration'],
  filtro: ['filter', 'filters', 'filtration'],
  filtração: ['filtration', 'filter', 'filters'],
  redes: ['nets', 'net'],
  rede: ['net', 'nets'],
  garrafas: ['bottles', 'bottle', 'samplers', 'sampler'],
  garrafa: ['bottle', 'bottles', 'sampler', 'samplers'],
  sondas: ['probes', 'probe', 'sensors', 'sonde'],
  sonda: ['probe', 'probes', 'sensor', 'sonde'],
  amostradores: ['samplers', 'sampler', 'sampling'],
  amostrador: ['sampler', 'samplers', 'sampling'],
  amostragem: ['sampling', 'sampler'],
  guinchos: ['haulers', 'hauler', 'winches', 'winch'],
  guincho: ['hauler', 'haulers', 'winch', 'winches'],
  sedimento: ['sediment', 'sediments'],
  sedimentos: ['sediments', 'sediment'],
  plancton: ['plankton'],
  flutuadores: ['floats', 'float', 'profiling'],
  flutuador: ['float', 'floats', 'profiling'],
  boias: ['buoys', 'buoy'],
  boia: ['buoy', 'buoys'],
  padroes: ['standards', 'standard'],
  padrao: ['standard', 'standards'],
  consumíveis: ['consumables', 'consumable'],
  lampadas: ['lamps', 'lamp'],
  lampada: ['lamp', 'lamps'],
  grafite: ['graphite', 'graphite tube'],
  seringas: ['syringes', 'syringe'],
  seringa: ['syringe', 'syringes'],
  pipetas: ['pipettes', 'pipette'],
  pipeta: ['pipette', 'pipettes'],
  membranas: ['membranes', 'membrane'],
  membrana: ['membrane', 'membranes'],
  papel: ['paper', 'papers'],
  papeis: ['papers', 'paper'],
  luvas: ['gloves', 'glove'],
  luva: ['glove', 'gloves'],
  água: ['water'],
  calice: ['flask', 'beaker'],
  calix: ['flask', 'beaker'],
  balao: ['flask', 'balloon'],
  baloes: ['flasks'],
  frasco: ['bottle', 'flask', 'vial'],
  frascos: ['bottles', 'flasks', 'vials'],
  draga: ['grab', 'dredge'],
  dragas: ['grabs', 'dredges'],
  pesos: ['weights', 'ballast'],
  inox: ['stainless', 'steel'],
  registadores: ['dataloggers', 'datalogger', 'loggers', 'data loggers'],
  registador: ['datalogger', 'dataloggers', 'logger', 'data logger'],
  datalogger: ['registador', 'logger', 'data logger'],
  dataloggers: ['registadores', 'loggers', 'data loggers'],
  temperatura: ['temperature'],
  pressao: ['pressure'],
  condutividade: ['conductivity'],
  salinidade: ['salinity'],
  oxigenio: ['oxygen', 'dissolved oxygen'],
  clorofila: ['chlorophyll', 'chloro'],
  turbidez: ['turbidity'],
  profundidade: ['depth'],
  perfis: ['profiles', 'profiling'],
  micotoxinas: ['mycotoxins', 'mycotoxin'],
  cromatografia: ['chromatography', 'chromatographic'],
  espectroscopia: ['spectroscopy', 'spectroscopic'],
  digestao: ['digestion', 'digest', 'digestion block'],
};

function expandQuery(q) {
  const n = normalize(q);
  const terms = new Set([n]);
  Object.entries(PT_EN).forEach(([pt, ens]) => {
    const npt = normalize(pt);
    if (n.includes(npt)) ens.forEach((e) => terms.add(normalize(e)));
    ens.forEach((en) => { if (n.includes(normalize(en))) terms.add(npt); });
  });
  return [...terms];
}

const buildÁreas = () => {
  const áreas = [];

  // ÁREA 1 — Água (sem WaterControl, Dispensador e Pré-tratamento)
  const AGUA_EXCLUIR = new Set(['watercontrol', 'dispenser', 'pre-tratamento']);
  const waterLinhas = [...waterProducts, ...complementarySystems]
    .filter((p) => !AGUA_EXCLUIR.has(p.id))
    .map((p) => ({
      id: p.id,
      name: p.name,
      image: p.image,
      summary: p.lead || p.summary,
      meta: p.meta,
      link: `/produtos/${p.id}`
    }));

  áreas.push({
    id: 'agua',
    name: 'Sistemas de Produção de Água',
    slug: '/agua',
    kicker: 'Equipamentos próprios',
    marks: [
      {
        id: 'wonderstatus',
        name: 'Wonderstatus',
        logo: '/assets/logos/wonderstatus-logo.png',
        linhas: waterLinhas,
        siteUrl: 'https://wonderstatus.pt/'
      }
    ]
  });

  // ÁREA 2 — Laboratório
  áreas.push({
    id: 'laboratorio',
    name: 'Material de Laboratório',
    slug: '/material-laboratorio',
    kicker: 'Catálogo por fabricante',
    marks: labCatalog.brands.map((brand) => {
      const secs = labCatalog.sections.filter((s) => s.brandId === brand.id);
      const linhas = [];
      secs.forEach((sec) => {
        (sec.families || []).forEach((fam) => {
          linhas.push({
            id: fam.id,
            name: fam.name || fam.navLabel,
            image: fam.image,
            summary: fam.summary,
            sku: fam.sku,
            url: fam.url,
            capacityTable: fam.capacityTable,
            items: fam.items || [],
            section: sec.title
          });
        });
      });
      return { id: brand.id, name: brand.name, logo: brand.logo, siteUrl: brand.siteUrl, categoryUrl: brand.categoryUrl, summary: brand.summary, linhas };
    })
  });

  // ÁREA 3 — Oceanografia
  áreas.push({
    id: 'oceanografia',
    name: 'Oceanografia',
    slug: '/oceanografia',
    kicker: 'Catálogo por fabricante',
    marks: oceanCatalog.brands.map((brand) => {
      const secs = oceanCatalog.sections.filter((s) => s.brandId === brand.id);
      const linhas = [];
      secs.forEach((sec) => {
        (sec.families || []).forEach((fam) => {
          const prods = fam.products || [];
          if (prods.length > 0) {
            prods.forEach((prod, pidx) => {
              linhas.push({
                id: `${fam.id}-${prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 32)}-${pidx}`,
                name: prod.name,
                image: prod.image || fam.image,
                summary: prod.summary,
                url: prod.url || fam.sourceUrl || sec.sourceUrl,
                section: fam.wonderLabel || fam.navLabel || fam.title
              });
            });
          } else {
            linhas.push({
              id: fam.id,
              name: fam.name || fam.navLabel || fam.title,
              image: fam.image,
              summary: fam.summary,
              url: fam.url || fam.sourceUrl,
              section: sec.title
            });
          }
        });
      });
      if (linhas.length === 0) {
        linhas.push({
          id: `${brand.id}-catalog`,
          name: brand.name,
          image: brand.logo,
          summary: brand.summary,
          url: brand.siteUrl || brand.sourceUrl
        });
      }
      return { id: brand.id, name: brand.name, logo: brand.logo, siteUrl: brand.siteUrl || brand.sourceUrl, summary: brand.summary, linhas };
    })
  });

  // ÁREA 4 — Química
  const icpByMfg = {};
  icpCatalog.forEach((row) => {
    if (!icpByMfg[row.manufacturer]) icpByMfg[row.manufacturer] = { types: new Set(), count: 0 };
    icpByMfg[row.manufacturer].types.add(row.type);
    icpByMfg[row.manufacturer].count += row.models.length;
  });
  const grafite = grafiteCatalog.brands;

  áreas.push({
    id: 'quimica',
    name: 'Química Analítica',
    slug: '/quimica',
    kicker: 'Consumíveis e padrões técnicos',
    marks: [
      {
        id: 'thermo-scientific', name: 'Thermo Scientific', logo: '/assets/logos/thermo-scientific.png',
        siteUrl: 'https://www.thermofisher.com',
        summary: 'Tubos de grafite e componentes para fornos AAS Thermo Scientific.',
        linhas: [{ id: 'tubos-grafite-thermo', name: 'Tubos de Grafite AAS', image: '/assets/fotos/thermo-scientific.jpeg', summary: `${grafite['thermo-scientific'].entries.length} referências — tubos standard, Partridge, Omega e contactos.`, link: '/quimica/tubos-grafite' }]
      },
      {
        id: 'maassen-gmbh', name: 'Maassen Spektroskopie', logo: '/assets/logos/maassen-gmbh.png',
        siteUrl: 'https://maassen-gmbh.de/en/',
        summary: 'Equivalentes de tubos de grafite AAS para PerkinElmer, Agilent, Hitachi, Shimadzu e GBC.',
        linhas: [
          { id: 'equiv-perkinelmer', name: 'Equivalentes PerkinElmer', image: '/assets/fotos/perkinelmer.png', summary: `${grafite['perkinelmer'].entries.length} referências para fornos HGA.`, link: '/quimica/tubos-grafite' },
          { id: 'equiv-agilent', name: 'Equivalentes Agilent', image: '/assets/fotos/agilent.png', summary: `${grafite['agilent'].entries.length} referências para fornos GTA.`, link: '/quimica/tubos-grafite' },
          { id: 'equiv-hitachi', name: 'Equivalentes Hitachi', image: '/assets/fotos/hitachi.png', summary: `${grafite['hitachi'].entries.length} referências para fornos Z/ZA.`, link: '/quimica/tubos-grafite' },
          { id: 'equiv-shimadzu', name: 'Equivalentes Shimadzu', image: '/assets/fotos/shimadzu.png', summary: `${grafite['shimadzu'].entries.length} referências para fornos Shimadzu.`, link: '/quimica/tubos-grafite' },
          { id: 'equiv-gbc', name: 'Equivalentes GBC', image: '/assets/fotos/gbc.png', summary: `${grafite['gbc'].entries.length} referências para fornos GBC Avanta/SensAA.`, link: '/quimica/tubos-grafite' }
        ]
      },
      {
        id: 'photron', name: 'Photron', logo: '/assets/logos/photron.png',
        siteUrl: 'https://www.photronlamp.com/',
        summary: 'Lâmpadas cátodo oco mono e multi-elementares (37 mm e 51 mm) e D2 para AAS multimarca.',
        linhas: [
          { id: 'lampadas-mono-37', name: 'Mono-elementares 37 mm / 1.5"', image: '/assets/fotos/lampadas/mono-37mm-p801.jpg', summary: 'Uncoded, codificadas Agilent e Thermo. Série P8xx.', link: '/quimica/lampadas' },
          { id: 'lampadas-mono-51', name: 'Mono-elementares 51 mm / 2.0"', image: '/assets/fotos/lampadas/mono-51mm-p900.jpg', summary: 'HCL PerkinElmer coded 2.0" com cátodo ampliado. Série P9xx.', link: '/quimica/lampadas' },
          { id: 'lampadas-multi-37', name: 'Multi-elementares 37 mm', image: '/assets/fotos/lampadas/multi-37mm-p570.jpg', summary: 'Lâmpadas 1.5" para análise simultânea de vários elementos.', link: '/quimica/lampadas' },
          { id: 'lampadas-multi-51', name: 'Multi-elementares 51 mm', image: '/assets/fotos/lampadas/multi-51mm-p605.jpg', summary: 'Multi-elementares 2.0" para PerkinElmer.', link: '/quimica/lampadas' },
          { id: 'lampadas-d2', name: 'D2 Lamps (Deutério)', image: '/assets/fotos/lampadas/d2-p736.jpg', summary: 'Lâmpadas UV para correção de fundo — Agilent, Hitachi, GBC, PerkinElmer.', link: '/quimica/lampadas' }
        ]
      },
      {
        id: 'saentis-analytical', name: 'Saentis Analytical', logo: '/assets/logos/saentis-analytical.png',
        summary: 'Lâmpadas HCL alternativas e reagentes analíticos de alta pureza.',
        linhas: [{ id: 'saentis-lampadas', name: 'Lâmpadas HCL Alternativas', summary: 'Alternativas às referências Photron para diversas aplicações AAS.', link: '/quimica/lampadas' }]
      },
      {
        id: 'courtage-quimica', name: 'Courtage Analyses Services', logo: '/assets/logos/courtage-analyses-services.png',
        siteUrl: 'https://www.onlinecas.com/',
        summary: 'Standards analíticos e lâmpadas alternativas para espectroscopia.',
        linhas: [{ id: 'courtage-lampadas', name: 'Lâmpadas HCL Alternativas', summary: 'Lâmpadas de cátodo oco complementares para AAS.', link: '/quimica/lampadas' }]
      },
      {
        id: 'glass-expansion', name: 'Glass Expansion', logo: '/assets/logos/glass-expansion.png',
        siteUrl: 'https://www.geicp.com/',
        summary: 'Consumíveis de precisão para ICP e ICP-MS: nebulizadores, tochas, câmaras e cones.',
        linhas: Object.entries(icpByMfg).map(([mfg, data]) => ({
          id: `icp-${mfg.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          name: `Consumíveis ${mfg}`,
          summary: `${Array.from(data.types).join(', ')} — ${data.count} modelos disponíveis.`,
          link: '/quimica/icp-icpms'
        }))
      },
      {
        id: 'elemental-microanalysis', name: 'Elemental Microanalysis', logo: '/assets/logos/elemental-microanalysis.png',
        siteUrl: 'https://www.elementalmicroanalysis.com/',
        summary: 'Consumíveis para CHN/O/S, TOC, análise inorgânica, carbono/enxofre e N-proteína.',
        linhas: chnsTocCatalog.map((cat) => ({
          id: `chns-${cat.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          name: cat.category,
          summary: `${cat.items.length} subcategorias de consumíveis, materiais de referência e acessórios.`,
          link: '/quimica/chns-toc'
        }))
      },
    ]
  });

  // ÁREA 5 — Drones
  áreas.push({
    id: 'drones',
    name: 'Drones',
    slug: '/drones',
    kicker: 'Plataformas aéreas',
    marks: [
      {
        id: 'wonderstatus-drones', name: 'Wonderstatus', logo: '/assets/logos/wonderstatus-logo.png',
        siteUrl: 'https://wonderstatus.pt/',
        linhas: [{ id: 'hydra-7', name: 'Hydra 7', image: '/assets/slide5.JPG', summary: 'Plataforma 7" modular com DJI O4 Pro — cinematografia, inspeção e vigilância.', link: '/drones' }]
      }
    ]
  });

  // ÁREA 6 — Micotoxinas
  áreas.push({
    id: 'micotoxinas',
    name: 'Micotoxinas',
    slug: '/micotoxinas',
    kicker: 'Standards analíticos',
    marks: [
      {
        id: 'neofroxx', name: 'Neofroxx', logo: '/assets/logos/neofroxx.png',
        siteUrl: 'https://www.neofroxx.com/',
        summary: 'Standards nativos e marcados com 13C para análise de micotoxinas por LC-MS/MS e HPLC.',
        linhas: mycoStandards.map((group) => ({
          id: group.id,
          name: group.label,
          summary: group.description,
          link: '/micotoxinas'
        }))
      }
    ]
  });

  return áreas;
};

export default function Produtos() {
  const áreas = useMemo(() => buildÁreas(), []);
  const [activeÁreaId, setActiveÁreaId] = useState(áreas[0]?.id);
  const [activeMarkId, setActiveMarkId] = useState(áreas[0]?.marks[0]?.id);
  const [globalQuery, setGlobalQuery] = useState('');

  const activeÁrea = áreas.find((a) => a.id === activeÁreaId) || áreas[0];
  const activeMark = activeÁrea.marks.find((m) => m.id === activeMarkId) || activeÁrea.marks[0];

  const totalLinhas = useMemo(
    () => áreas.reduce((sum, a) => sum + a.marks.reduce((s2, m) => s2 + m.linhas.length, 0), 0),
    [áreas]
  );

  // Lista plana com info de área e marca injectada
  const allLinhas = useMemo(() => {
    const result = [];
    áreas.forEach((área) => {
      área.marks.forEach((mark) => {
        mark.linhas.forEach((linha) => {
          result.push({
            ...linha,
            brandLogo: mark.logo,
            brandName: mark.name,
            áreaName: área.name,
            áreaId: área.id,
          });
        });
      });
    });
    return result;
  }, [áreas]);

  // Resultados de pesquisa global (com suporte PT↔EN)
  const globalResults = useMemo(() => {
    if (!globalQuery.trim()) return [];
    const terms = expandQuery(globalQuery.trim());
    return allLinhas.filter((l) => {
      const text = normalize(
        [l.name, l.summary, l.sku, l.section, l.brandName, l.áreaName].filter(Boolean).join(' ')
      );
      return terms.some((t) => text.includes(t));
    });
  }, [allLinhas, globalQuery]);

  // Produtos da marca activa (com brand info)
  const linhasDaMarca = useMemo(() => {
    return (activeMark?.linhas || []).map((l) => ({
      ...l,
      brandLogo: activeMark.logo,
      brandName: activeMark.name,
      áreaName: activeÁrea.name,
    }));
  }, [activeMark, activeÁrea]);

  const isSearching = globalQuery.trim().length > 0;

  return (
    <PageTransition>
      <PageHeader
        kicker="Catálogo Global"
        title="Todos os Produtos"
        subtitle={`Catálogo completo dos ${totalLinhas}+ produtos e linhas Wonderstatus — sistemas de água, laboratório, oceanografia, química analítica, drones e micotoxinas.`}
        image="/assets/slide3.JPG"
        actions={[
          { label: 'Explorar catálogo', href: '#catalogo' },
          { label: 'Pedir informação', href: '/sobre#formulario-contacto', ghost: true }
        ]}
      />

      {/* ── Barra de pesquisa global ── */}
      <section className="py-8 bg-gradient-to-b from-brand-50/40 to-white border-b border-ink-100" id="catalogo">
        <div className="container-wide">
          <div className="relative max-w-2xl mx-auto">
            <svg
              width="20" height="20" viewBox="0 0 24 24" fill="none"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={globalQuery}
              onChange={(e) => setGlobalQuery(e.target.value)}
              placeholder={`Pesquisar entre ${totalLinhas}+ produtos — beakers, tubos, sensores, lâmpadas…`}
              className="w-full rounded-2xl border border-ink-200 bg-white pl-12 pr-5 py-4 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent placeholder:text-ink-400"
            />
            {isSearching && (
              <button
                type="button"
                onClick={() => setGlobalQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                aria-label="Limpar pesquisa"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
          {isSearching && (
            <p className="mt-3 text-center text-sm text-ink-500">
              {globalResults.length === 0
                ? 'Nenhum resultado para essa pesquisa.'
                : `${globalResults.length} resultado${globalResults.length !== 1 ? 's' : ''} encontrado${globalResults.length !== 1 ? 's' : ''}`}
            </p>
          )}
        </div>
      </section>

      {/* ── Resultados de pesquisa global ── */}
      <AnimatePresence mode="wait">
        {isSearching && (
          <motion.section
            key="search-results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="section"
          >
            <div className="container-wide">
              <SectionHead
                kicker="Resultados"
                title={`"${globalQuery}"`}
                description="Resultados em todas as áreas e marcas do catálogo."
              />
              <div className="mt-8">
                {globalResults.length === 0 ? (
                  <p className="text-center py-16 text-ink-500">
                    Nenhum produto encontrado. Tente outro termo.
                  </p>
                ) : (
                  <ProductCarousel items={globalResults} viewAllLink="/produtos" />
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Navegação por área / marca (visível quando não há pesquisa) ── */}
      <AnimatePresence mode="wait">
        {!isSearching && (
          <motion.div
            key="browse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Selector de área */}
            <section className="section">
              <div className="container-wide">
                <SectionHead
                  kicker="Catálogo Organizado"
                  title="Navegue por área técnica e fabricante"
                  description="Selecione uma área técnica e depois o fabricante."
                />
                <div className="mt-8 md:mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {áreas.map((área) => {
                    const isActive = área.id === activeÁreaId;
                    const count = área.marks.reduce((s, m) => s + m.linhas.length, 0);
                    return (
                      <motion.button
                        key={área.id}
                        type="button"
                        onClick={() => {
                          setActiveÁreaId(área.id);
                          setActiveMarkId(área.marks[0]?.id);
                        }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`text-left p-5 md:p-6 rounded-2xl border-2 transition-all ${
                          isActive
                            ? 'bg-gradient-to-br from-brand-600 to-brand-500 text-white border-brand-500 shadow-glow'
                            : 'bg-white border-ink-100 hover:border-brand-300 shadow-soft'
                        }`}
                      >
                        <p className={`text-xs font-semibold uppercase tracking-widest ${isActive ? 'text-white/80' : 'text-brand-600'}`}>
                          {área.kicker}
                        </p>
                        <h3 className={`mt-2 font-display text-lg md:text-xl font-bold ${isActive ? 'text-white' : 'text-ink-900'}`}>
                          {área.name}
                        </h3>
                        <p className={`mt-2 text-sm ${isActive ? 'text-white/75' : 'text-ink-500'}`}>
                          {área.marks.length} {área.marks.length === 1 ? 'marca' : 'marcas'} · {count} {count === 1 ? 'linha' : 'linhas'}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Selector de marca */}
            <section className="section-compact">
              <div className="container-wide">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeÁreaId}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
                      {activeÁrea.name} · Marcas disponíveis
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {activeÁrea.marks.map((mark) => {
                        const isActive = mark.id === activeMarkId;
                        return (
                          <motion.button
                            key={mark.id}
                            type="button"
                            onClick={() => setActiveMarkId(mark.id)}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            className={`p-3 md:p-4 rounded-2xl border transition-all ${
                              isActive
                                ? 'bg-brand-600 text-white border-brand-500 shadow-soft'
                                : 'bg-white border-ink-100 hover:border-brand-300 shadow-soft'
                            }`}
                          >
                            <div className={`h-12 md:h-14 w-full grid place-items-center rounded-lg mb-2 ${isActive ? 'bg-white' : 'bg-brand-50/40'}`}>
                              <img
                                src={mark.logo}
                                alt={mark.name}
                                className="max-h-10 max-w-[85%] object-contain"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                            </div>
                            <p className={`text-xs font-semibold text-center ${isActive ? 'text-white' : 'text-ink-900'}`}>
                              {mark.name}
                            </p>
                            <p className={`text-[10px] text-center mt-0.5 ${isActive ? 'text-white/80' : 'text-ink-500'}`}>
                              {mark.linhas.length} {mark.linhas.length === 1 ? 'linha' : 'linhas'}
                            </p>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>

            {/* Carousel de produtos da marca */}
            <section className="section">
              <div className="container-wide">
                <AnimatePresence mode="wait">
                  {activeMark && (
                    <motion.div
                      key={activeMark.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Cabeçalho da marca */}
                      <div className="rounded-3xl bg-gradient-to-br from-brand-50/60 to-white border border-ink-100 shadow-soft p-6 md:p-8 mb-8">
                        <div className="flex flex-col md:flex-row md:items-center gap-5">
                          <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-white border border-ink-100 shadow-soft grid place-items-center p-3 flex-shrink-0">
                            <img
                              src={activeMark.logo}
                              alt={activeMark.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                              {activeÁrea.name}
                            </p>
                            <h3 className="mt-1 font-display text-2xl md:text-3xl font-bold text-ink-900">
                              {activeMark.name}
                            </h3>
                            {activeMark.summary && (
                              <p className="mt-2 text-sm text-ink-600 leading-relaxed max-w-2xl">
                                {activeMark.summary}
                              </p>
                            )}
                          </div>
                          {(activeMark.siteUrl || activeMark.categoryUrl) && (
                            <a
                              href={activeMark.categoryUrl || activeMark.siteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full bg-brand-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-700 transition-colors flex-shrink-0 self-start md:self-center shadow-soft"
                            >
                              Site oficial
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                <path d="M7 17 17 7m0 0H9m8 0v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </a>
                          )}
                        </div>
                        <p className="mt-4 text-xs text-ink-500">
                          {linhasDaMarca.length} {linhasDaMarca.length === 1 ? 'linha' : 'linhas'} disponíveis — arraste ou use as setas para navegar
                        </p>
                      </div>

                      <InfiniteCarousel items={linhasDaMarca} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactCTA
        title="Precisa de ajuda para selecionar uma referência?"
        description="Apoiamos na identificação, validação e orçamento de qualquer linha ou referência do catálogo."
      />
    </PageTransition>
  );
}
