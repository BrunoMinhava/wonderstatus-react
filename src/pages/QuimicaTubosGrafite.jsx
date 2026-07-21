import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import QuimicaTabRail from '../components/QuimicaTabRail';
import ZoomableImage from '../components/Lightbox';
import graphiteData from '../data/grafite-catalog-data';

const brandIds = Object.keys(graphiteData.brands);

export default function QuimicaTubosGrafite() {
  const [activeBrand, setActiveBrand] = useState(brandIds[0]);
  const [query, setQuery] = useState('');

  const brand = graphiteData.brands[activeBrand];

  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return brand.entries;
    return brand.entries.filter((e) =>
      Object.values(e).join(' ').toLowerCase().includes(q)
    );
  }, [brand, query]);

  return (
    <PageTransition>
      <PageMeta
        title="Tubos de Grafite para Fornos de Grafite AAS"
        description="Tubos de grafite com ou sem plataforma L'Vov para AAS de forno de grafite (GFAAS/ETAAS). Compatíveis com Agilent/Varian, Hitachi, PerkinElmer, Shimadzu e GBC. Alternativa de qualidade equivalente."
        path="/quimica/tubos-grafite"
      />
      <PageHeader
        kicker="AAS · Tubos de Grafite"
        title="Tubos de Grafite para AAS"
        subtitle="Gama dedicada Thermo Scientific e linhas equivalentes para instrumentos Agilent, GBC, Hitachi, PerkinElmer e Shimadzu, com tabelas técnicas por fabricante."
        image="/assets/fotos/quimica-grafite.png"
        noParallax
        actions={[
          { label: 'Explorar tabelas', href: '#tabela' },
          { label: 'Pedir informação', href: '/sobre#formulario-contacto', ghost: true }
        ]}
      />
      <QuimicaTabRail />

      <section className="section" id="tabela">
        <div className="container-wide">
          <SectionHead
            kicker="Catálogo por fabricante"
            title="Selecione o fabricante"
            description="Cada marca tem a sua tabela de referências e equivalências. Use a pesquisa para encontrar um part number ou descrição específicos."
          />

          {/* Brand cards selector */}
          <ScrollReveal className="mt-8 md:mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {brandIds.map((id) => {
              const b = graphiteData.brands[id];
              const isActive = id === activeBrand;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setActiveBrand(id);
                    setQuery('');
                  }}
                  className={`p-4 rounded-2xl border shadow-soft transition-all card-hover text-center ${
                    isActive
                      ? 'bg-gradient-to-br from-brand-600 to-brand-500 text-white border-brand-500'
                      : 'bg-white border-ink-100 hover:border-brand-300'
                  }`}
                  style={isActive ? { boxShadow: `0 18px 40px ${b.accent}33` } : {}}
                >
                  <div
                    className={`h-14 w-full grid place-items-center rounded-lg mb-3 ${
                      isActive ? 'bg-white/20' : 'bg-brand-50/40'
                    }`}
                  >
                    <img
                      src={b.logoPath}
                      alt={b.name}
                      className={`max-h-10 max-w-[80%] object-contain ${
                        isActive ? 'mix-blend-screen' : ''
                      }`}
                    />
                  </div>
                  <p className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-ink-900'}`}>
                    {b.name}
                  </p>
                  <p className={`text-xs mt-1 ${isActive ? 'text-white/75' : 'text-ink-500'}`}>
                    {b.entries.length} refs.
                  </p>
                </button>
              );
            })}
          </ScrollReveal>

          {/* Brand panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBrand}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-8 rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden"
            >
              <div className="p-6 md:p-8 grid lg:grid-cols-3 gap-6 border-b border-ink-100">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4">
                    <div
                      className="h-14 w-14 rounded-xl grid place-items-center flex-shrink-0"
                      style={{ background: `${brand.accent}18` }}
                    >
                      <img src={brand.logoPath} alt={brand.name} className="max-h-10 max-w-[80%] object-contain" />
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: brand.accent }}
                      >
                        Tabela por fabricante
                      </p>
                      <h3 className="font-display text-2xl font-bold text-ink-900">{brand.name}</h3>
                    </div>
                  </div>

                  <div className="mt-5 relative">
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Pesquisar referência, part number, descrição..."
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
                  <p className="mt-3 text-xs text-ink-500">
                    {filteredEntries.length} {filteredEntries.length === 1 ? 'referência' : 'referências'} · {brand.name}
                  </p>
                </div>

                <div>
                  <ZoomableImage
                    src={brand.overviewImagePath}
                    alt={brand.name}
                    caption={`Imagem representativa · ${brand.name}`}
                    className="rounded-xl bg-gradient-to-b from-brand-50/50 to-white border border-ink-100 overflow-hidden"
                    imgClassName="w-full h-40 md:h-48 object-contain p-3"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-ink-50 text-ink-700 sticky top-0">
                    <tr>
                      {brand.columns.map((col) => (
                        <th
                          key={col.key}
                          className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4 whitespace-nowrap"
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEntries.length === 0 ? (
                      <tr>
                        <td
                          colSpan={brand.columns.length}
                          className="px-6 py-10 text-center text-ink-500"
                        >
                          Nenhuma referência encontrada.
                        </td>
                      </tr>
                    ) : (
                      filteredEntries.map((entry, i) => (
                        <tr
                          key={i}
                          className="border-t border-ink-100 hover:bg-brand-50/40 transition-colors"
                        >
                          {brand.columns.map((col) => (
                            <td
                              key={col.key}
                              className={`px-6 py-3 ${
                                col.key === 'reference' || col.key === 'partNumber'
                                  ? 'font-mono text-brand-700 font-semibold'
                                  : 'text-ink-700'
                              }`}
                            >
                              {entry[col.key] || '—'}
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
      </section>

      {/* Páginas dedicadas por marca */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Páginas dedicadas"
            title="Explore a página completa de cada marca"
            description="Cada marca tem a sua página dedicada com tabela completa de referências, pesquisa e informação técnica."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {brandIds.map((id, idx) => {
              const b = graphiteData.brands[id];
              return (
                <ScrollReveal key={id} delay={idx * 0.05}>
                  <Link
                    to={`/quimica/equivalentes/${id}`}
                    className="group block h-full p-6 rounded-2xl bg-white border border-ink-100 shadow-soft card-hover"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="h-12 w-12 rounded-xl grid place-items-center flex-shrink-0 p-1.5"
                        style={{ background: `${b.accent}18` }}
                      >
                        <img src={b.logoPath} alt={b.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: b.accent }}>
                          {id === 'thermo-scientific' ? 'Gama dedicada' : 'Equivalentes'}
                        </p>
                        <h3 className="font-display text-lg font-bold text-ink-900 group-hover:text-brand-700 transition-colors">
                          {b.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-ink-600">{b.entries.length} referências</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                      Ver página
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                        <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <ContactCTA />
    </PageTransition>
  );
}
