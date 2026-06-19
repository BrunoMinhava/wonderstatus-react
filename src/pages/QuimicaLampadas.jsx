import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import ZoomableImage from '../components/Lightbox';
import { lampadasData, lampadasHeaders } from '../data/lampadas-data';

const TABS = [
  {
    key: 'hcl-37',
    label: '37 mm / 1.5"',
    title: 'HCL Multimarca 37 mm',
    description:
      'Lâmpadas de cátodo oco Photron formato 37 mm (1.5"), disponíveis em versões Não Codificada, Agilent (Varian) e Thermo.',
    image: '/assets/fotos/lampadas/mono-37mm-p801.jpg',
    brandFilters: [
      { id: 'all', label: 'Todas' },
      { id: 'nao-codificado', label: 'Não Codificado' },
      { id: 'agilent', label: 'Agilent (Varian)' },
      { id: 'thermo', label: 'Thermo (Unicam)' }
    ]
  },
  {
    key: 'hcl-50',
    label: '50 mm / 2.0"',
    title: 'HCL PerkinElmer 50 mm',
    description:
      'Lâmpadas de cátodo oco Photron formato 50 mm (2.0") equivalentes PerkinElmer para séries M5000 e similares.',
    image: '/assets/fotos/lampadas/mono-51mm-p900.jpg',
    brandFilters: []
  },
  {
    key: 'hcl-d2',
    label: 'Deutério (D2)',
    title: 'Lâmpadas de Deutério',
    description:
      'Lâmpadas de deutério (D2) Photron para correção de background em AAS, com diferentes filamentos e compatibilidades.',
    image: '/assets/fotos/lampadas/d2-p736.jpg',
    brandFilters: []
  },
  {
    key: 'hcl-multi-37',
    label: 'Multi 37 mm',
    title: 'Multi-Elementares 37 mm (P500 / P5-0000)',
    description:
      'Lâmpadas multi-elementares Photron 37 mm (1.5") série P500/P5-0000 — não codificadas, compatíveis com GBC, Varian, Analytik Jena, Shimadzu, Hitachi e Thermo.',
    image: '/assets/fotos/lampadas/mono-37mm-p801.jpg',
    brandFilters: []
  },
  {
    key: 'hcl-multi-51',
    label: 'Multi 51 mm',
    title: 'Multi-Elementares 51 mm PE (P600 / P6-0000)',
    description:
      'Lâmpadas multi-elementares Photron 51 mm (2.0") série P600/P6-0000 — 9-pin, para instrumentos PerkinElmer AAS.',
    image: '/assets/fotos/lampadas/mono-51mm-p900.jpg',
    brandFilters: []
  }
];

export default function QuimicaLampadas() {
  const [activeTab, setActiveTab] = useState(0);
  const [brandFilter, setBrandFilter] = useState('all');
  const [query, setQuery] = useState('');

  const tab = TABS[activeTab];
  const rows = useMemo(() => {
    const all = lampadasData[tab.key] || [];
    let filtered = all;
    if (brandFilter !== 'all' && tab.brandFilters.length > 0) {
      filtered = filtered.filter((r) => r.brand === brandFilter);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      filtered = filtered.filter((r) =>
        r.cells.some((c) => c.toLowerCase().includes(q))
      );
    }
    return filtered;
  }, [tab, brandFilter, query]);

  const headers = lampadasHeaders[tab.key] || [];

  return (
    <PageTransition>
      <PageHeader
        kicker="AAS Technical Catalog"
        title="Lâmpadas de Cátodo Oco e D2"
        subtitle="37 mm / 1.5&quot;, 50 mm / 2.0&quot; e Deutério em navegação segmentada. Compatibilidade multimarca para AAS com equivalências Agilent, Thermo, PerkinElmer e mais."
        image="/assets/slide4.JPG"
        actions={[
          { label: 'Ver tabelas', href: '#tabela' },
          { label: 'Pedir informação', href: '/sobre#formulario-contacto', ghost: true }
        ]}
      />

      {/* Galeria de imagens das lâmpadas */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Imagens da gama"
            title="Fotografias oficiais Photron"
            description="Lâmpadas mono-elementares e multi-elementares para os formatos 37 mm e 50 mm, mais a série de deutério."
          />
          <div className="mt-8 md:mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { src: '/assets/fotos/lampadas/mono-37mm-p801.jpg', label: 'Mono 37 mm · P801' },
              { src: '/assets/fotos/lampadas/mono-51mm-p900.jpg', label: 'Mono 50 mm · P900LL' },
              { src: '/assets/fotos/lampadas/multi-37mm-p570.jpg', label: 'Multi 37 mm · P570' },
              { src: '/assets/fotos/lampadas/multi-51mm-p605.jpg', label: 'Multi 50 mm · P605' },
              { src: '/assets/fotos/lampadas/d2-p736.jpg', label: 'Deutério · P736' }
            ].map((img, idx) => (
              <ScrollReveal
                key={img.src}
                delay={idx * 0.06}
                className="rounded-2xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover"
              >
                <ZoomableImage
                  src={img.src}
                  alt={img.label}
                  caption={img.label}
                  imgClassName="w-full h-44 object-contain p-4 bg-gradient-to-b from-brand-50/40 to-white"
                />
                <div className="px-4 py-3 border-t border-ink-100">
                  <p className="text-sm font-semibold text-ink-900">{img.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="section" id="tabela">
        <div className="container-wide">
          <SectionHead
            kicker="Catálogo técnico"
            title="Tabelas de referências Photron"
            description="Selecione o formato para ver a tabela completa. Pesquise por elemento ou referência, filtre por marca quando aplicável."
          />

          <div className="mt-8 md:mt-10 rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
            <div className="flex gap-2 p-4 md:p-6 overflow-x-auto scrollbar-hidden border-b border-ink-100">
              {TABS.map((t, i) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => {
                    setActiveTab(i);
                    setBrandFilter('all');
                    setQuery('');
                  }}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    i === activeTab
                      ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-soft'
                      : 'bg-brand-50/50 text-ink-700 hover:bg-brand-50 hover:text-brand-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 md:p-8 grid lg:grid-cols-3 gap-6 border-b border-ink-100">
                  <div className="lg:col-span-2">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-ink-900">
                      {tab.title}
                    </h3>
                    <p className="mt-3 text-ink-600 leading-relaxed">{tab.description}</p>

                    {/* Filtros */}
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <div className="flex-1 min-w-[200px] relative">
                        <input
                          type="search"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Pesquisar elemento, referência..."
                          className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                        />
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
                        >
                          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                          <path d="m20 20-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>

                    {tab.brandFilters.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {tab.brandFilters.map((bf) => (
                          <button
                            key={bf.id}
                            type="button"
                            onClick={() => setBrandFilter(bf.id)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                              brandFilter === bf.id
                                ? 'bg-brand-600 text-white'
                                : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                            }`}
                          >
                            {bf.label}
                          </button>
                        ))}
                      </div>
                    )}

                    <p className="mt-4 text-xs text-ink-500">
                      {rows.length} {rows.length === 1 ? 'linha' : 'linhas'} · Photron
                    </p>
                  </div>

                  <div>
                    <ZoomableImage
                      src={tab.image}
                      alt={tab.title}
                      caption={tab.title}
                      className="rounded-xl bg-gradient-to-b from-brand-50 to-white border border-ink-100"
                      imgClassName="w-full h-40 md:h-48 object-contain p-4"
                    />
                  </div>
                </div>

                {/* Tabela */}
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-ink-50 text-ink-700 sticky top-0">
                      <tr>
                        {headers.map((h) => (
                          <th
                            key={h}
                            className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.length === 0 ? (
                        <tr>
                          <td colSpan={headers.length} className="px-6 py-10 text-center text-ink-500">
                            Nenhuma linha corresponde aos filtros.
                          </td>
                        </tr>
                      ) : (
                        rows.map((row, i) => (
                          <tr
                            key={i}
                            className="border-t border-ink-100 hover:bg-brand-50/40 transition-colors"
                          >
                            {row.cells.map((cell, j) => (
                              <td
                                key={j}
                                className={`px-6 py-3 ${
                                  j === 0
                                    ? 'font-semibold text-ink-900'
                                    : j === 1
                                    ? 'font-mono text-brand-700'
                                    : 'text-ink-700'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Sub-grupos dedicados */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Sub-grupos dedicados"
            title="Páginas técnicas aprofundadas"
            description="Sub-páginas com informação específica para mono-elementares, multi-elementares, deutério e compatibilidade transversal com todos os fabricantes AA."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                to: '/quimica/lampadas-mono',
                title: 'Mono-elementares',
                desc: 'Lâmpadas para métodos dedicados por elemento.',
                kicker: 'Subgrupo'
              },
              {
                to: '/quimica/lampadas-multi',
                title: 'Multi-elementares',
                desc: 'Combinações multianalito para rotinas mais eficientes.',
                kicker: 'Subgrupo'
              },
              {
                to: '/quimica/lampadas-d2',
                title: 'Deutério D2',
                desc: 'Correção de fundo UV para AA e UV-Vis — 12 fabricantes.',
                kicker: 'Deutério'
              },
              {
                to: '/quimica/lampadas-todos-aa',
                title: 'Todos instrumentos AA',
                desc: 'Orientação por fabricante com 6 marcas cobertas.',
                kicker: 'Compatibilidade'
              }
            ].map((item, idx) => (
              <ScrollReveal key={item.to} delay={idx * 0.06} className="h-full">
                <Link
                  to={item.to}
                  className="group block h-full rounded-2xl bg-white border border-ink-100 shadow-soft p-6 card-hover"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                    {item.kicker}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-bold text-ink-900 group-hover:text-brand-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed">{item.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Abrir página
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA
        title="Precisa de apoio para escolher a lâmpada certa?"
        description="Apoiamos na seleção de referências e compatibilidades por equipamento AAS."
      />
    </PageTransition>
  );
}
