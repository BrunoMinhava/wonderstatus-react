import { useMemo, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import ZoomableImage from '../components/Lightbox';
import graphiteData from '../data/grafite-catalog-data';

// Map de slug para brand id
const SLUG_TO_BRAND = {
  'thermo-scientific': 'thermo-scientific',
  thermo: 'thermo-scientific',
  perkinelmer: 'perkinelmer',
  agilent: 'agilent',
  gbc: 'gbc',
  hitachi: 'hitachi',
  shimadzu: 'shimadzu'
};

const BRAND_DESCRIPTIONS = {
  'thermo-scientific': {
    subtitle: 'Gama dedicada de tubos de grafite Thermo Scientific — standard, Partridge(d), Omega e electrical contactsets.',
    intro:
      'Tabela completa das referências Thermo Scientific para equipamentos AAS com câmara de grafite. Part numbers oficiais e descrições por tipo de tubo.'
  },
  perkinelmer: {
    subtitle: 'Tubos de grafite equivalentes PerkinElmer — HGA standard, L\'vov platform e configurações coated/uncoated.',
    intro:
      'Tabela de equivalências Thermo para equipamentos PerkinElmer. Contém a referência PerkinElmer oficial, o nosso equivalente e os part numbers alternativos conhecidos no mercado.'
  },
  agilent: {
    subtitle: 'Equivalências para AAS Agilent / Varian — tubos de grafite coated, uncoated e Zeeman.',
    intro:
      'Tabela de tubos de grafite equivalentes para espectrómetros Agilent (Varian). Cobre as principais plataformas de câmara de grafite e configurações Zeeman.'
  },
  gbc: {
    subtitle: 'Tubos de grafite equivalentes para AAS GBC — rotinas AAS de bancada com câmara de grafite.',
    intro:
      'Equivalências Thermo para equipamentos GBC. A validação por configuração ótica do sistema é recomendada antes da substituição.'
  },
  hitachi: {
    subtitle: 'Tubos de grafite equivalentes para AAS Hitachi — séries Z e ZA.',
    intro:
      'Tabela de equivalentes para espectrómetros Hitachi. Contém a referência Thermo e o part number Hitachi (SII) associado, para facilitar a seleção em reposição.'
  },
  shimadzu: {
    subtitle: 'Tubos de grafite equivalentes Shimadzu — aplicação orientada a sistemas AA de bancada.',
    intro:
      'Equivalências Thermo para espectrómetros Shimadzu. Permitem reposição direta mantendo qualidade analítica e rotina validada.'
  }
};

export default function QuimicaEquivalentes() {
  const { brand: brandSlug } = useParams();
  const [query, setQuery] = useState('');

  const brandId = SLUG_TO_BRAND[brandSlug];
  if (!brandId) return <Navigate to="/quimica/tubos-grafite" replace />;

  const brand = graphiteData.brands[brandId];
  const brandMeta = BRAND_DESCRIPTIONS[brandId] || BRAND_DESCRIPTIONS.perkinelmer;

  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return brand.entries;
    return brand.entries.filter((e) =>
      Object.values(e).join(' ').toLowerCase().includes(q)
    );
  }, [brand, query]);

  const isThermoMain = brandId === 'thermo-scientific';
  const titlePrefix = isThermoMain ? '' : 'Equivalentes para ';

  return (
    <PageTransition>
      <PageMeta
        title={`Tubos de Grafite ${brand.name} — Equivalentes e Compatíveis`}
        description={brandMeta.subtitle}
        path={`/quimica/equivalentes/${brandSlug}`}
      />
      <PageHeader
        kicker={isThermoMain ? 'AAS · Tubos de Grafite' : 'AAS · Equivalências Thermo'}
        title={`${titlePrefix}${brand.name}`}
        subtitle={brandMeta.subtitle}
        image="/assets/slide4.JPG"
        actions={[
          { label: 'Ver tabela', href: '#tabela' },
          { label: 'Pedir informação', href: '/sobre#formulario-contacto', ghost: true }
        ]}
      />

      {/* Breadcrumb */}
      <section className="py-6 border-b border-ink-100 bg-white/60">
        <div className="container-wide flex items-center gap-2 text-sm text-ink-500 flex-wrap">
          <Link to="/" className="hover:text-brand-700">Home</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-ink-300"><path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          <Link to="/quimica" className="hover:text-brand-700">Química</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-ink-300"><path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          <Link to="/quimica/tubos-grafite" className="hover:text-brand-700">Tubos de Grafite</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-ink-300"><path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          <span className="text-ink-700 font-medium">{brand.name}</span>
        </div>
      </section>

      {/* Hero split */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="h-16 w-16 rounded-2xl grid place-items-center flex-shrink-0 p-2"
                  style={{ background: `${brand.accent}18` }}
                >
                  <img src={brand.logoPath} alt={brand.name} className="max-h-12 max-w-full object-contain" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: brand.accent }}>
                    Fabricante
                  </p>
                  <h2 className="font-display text-3xl font-bold text-ink-900">{brand.name}</h2>
                </div>
              </div>
              <p className="section-lead">{brandMeta.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-100 px-4 py-2 text-sm text-brand-700 font-medium">
                  <span className="h-2 w-2 rounded-full bg-brand-500" />
                  {brand.entries.length} referências disponíveis
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-ink-50 border border-ink-100 px-4 py-2 text-sm text-ink-700 font-medium">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Compatibilidade validada
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <ZoomableImage
                src={brand.overviewImagePath}
                alt={brand.name}
                caption={`Imagem representativa · ${brand.name}`}
                className="rounded-3xl overflow-hidden bg-gradient-to-br from-brand-50 to-white border border-ink-100 shadow-soft"
                imgClassName="w-full h-80 object-contain p-6"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Tabela */}
      <section className="section" id="tabela">
        <div className="container-wide">
          <SectionHead
            kicker="Tabela técnica"
            title={`Referências ${brand.name}`}
            description="Pesquise por part number, referência ou descrição para encontrar rapidamente o tubo correto."
          />

          <div className="mt-8 md:mt-10 rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
            <div className="p-6 border-b border-ink-100">
              <div className="relative max-w-md">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Pesquisar referência, part number..."
                  className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="m20 20-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className="mt-3 text-xs text-ink-500">
                {filteredEntries.length} {filteredEntries.length === 1 ? 'referência' : 'referências'}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-ink-50 text-ink-700">
                  <tr>
                    {brand.columns.map((col) => (
                      <th key={col.key} className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4 whitespace-nowrap">
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.length === 0 ? (
                    <tr>
                      <td colSpan={brand.columns.length} className="px-6 py-10 text-center text-ink-500">
                        Nenhuma referência encontrada.
                      </td>
                    </tr>
                  ) : (
                    filteredEntries.map((entry, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.3) }}
                        className="border-t border-ink-100 hover:bg-brand-50/40 transition-colors"
                      >
                        {brand.columns.map((col) => (
                          <td
                            key={col.key}
                            className={`px-6 py-3 ${
                              col.key === 'reference' || col.key === 'partNumber' || col.key === 'perkinPartNo' || col.key === 'referencePartNo'
                                ? 'font-mono text-brand-700 font-semibold'
                                : 'text-ink-700'
                            }`}
                          >
                            {entry[col.key] || '—'}
                          </td>
                        ))}
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Outras marcas */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Outras marcas"
            title="Veja também equivalentes para outros fabricantes"
          />
          <div className="mt-8 md:mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.entries(graphiteData.brands).map(([id, b]) => (
              <Link
                key={id}
                to={`/quimica/equivalentes/${id === 'thermo-scientific' ? 'thermo-scientific' : id}`}
                className={`p-4 rounded-2xl border shadow-soft card-hover text-center ${
                  id === brandId
                    ? 'bg-brand-600 text-white border-brand-500'
                    : 'bg-white border-ink-100 hover:border-brand-300'
                }`}
              >
                <div className={`h-12 grid place-items-center rounded-lg mb-2 ${id === brandId ? 'bg-white/20' : 'bg-brand-50/40'}`}>
                  <img src={b.logoPath} alt={b.name} className="max-h-8 max-w-[80%] object-contain" />
                </div>
                <p className={`text-xs font-semibold ${id === brandId ? 'text-white' : 'text-ink-900'}`}>
                  {b.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA
        title={`Precisa de apoio para referências ${brand.name}?`}
        description="Apoiamos na identificação, validação e reposição de tubos de grafite para todos os principais fabricantes."
      />
    </PageTransition>
  );
}
