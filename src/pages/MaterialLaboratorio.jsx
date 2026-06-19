import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import labCatalog from '../data/lab-catalog-data';

export default function MaterialLaboratorio() {
  const [activeBrandId, setActiveBrandId] = useState(labCatalog.brands[0]?.id || null);
  const [query, setQuery] = useState('');

  const activeBrand = labCatalog.brands.find((b) => b.id === activeBrandId);
  const brandSections = labCatalog.sections.filter((s) => s.brandId === activeBrandId);

  const allFamilies = useMemo(() => {
    const result = [];
    brandSections.forEach((sec) => {
      (sec.families || []).forEach((fam) => {
        result.push({ ...fam, _section: sec });
      });
    });
    return result;
  }, [brandSections]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allFamilies;
    return allFamilies.filter((f) => {
      const haystack = [
        f.name,
        f.navLabel,
        f.sku,
        f.summary,
        f._section?.title,
        ...(f.items || []).map((i) => i.name || ''),
        ...((f.capacityTable?.rows || []).flat())
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [allFamilies, query]);

  const totalCount = useMemo(() => {
    let total = 0;
    labCatalog.brands.forEach((b) => {
      const secs = labCatalog.sections.filter((s) => s.brandId === b.id);
      secs.forEach((s) => {
        total += s.families?.length || 0;
      });
    });
    return total;
  }, []);

  return (
    <PageTransition>
      <PageHeader
        kicker="Catálogo Completo"
        title="Material de Laboratório"
        subtitle={`Catálogo oficial com ${totalCount} linhas técnicas de 5 fabricantes — Auxilab, CHM Lab Group, Umura, CRUMA, JP SELECTA. Filtração, cromatografia, biologia molecular, volumetria, cabines e muito mais.`}
        image="/assets/slide1.JPG"
        actions={[
          { label: 'Ver catálogo', href: '#catalogo' },
          { label: 'Pedir informação', href: '/sobre#formulario-contacto', ghost: true }
        ]}
      />

      {/* Selector de marca em grid grande */}
      <section className="section" id="catalogo">
        <div className="container-wide">
          <SectionHead
            kicker="Marcas disponíveis"
            title="Selecione uma marca para ver todos os produtos"
            description="Clique no logo de cada fabricante para ver o catálogo completo da marca com imagens, referências, SKUs e link direto ao site oficial."
          />

          <div className="mt-8 md:mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
            {labCatalog.brands.map((brand) => {
              const isActive = brand.id === activeBrandId;
              return (
                <motion.button
                  key={brand.id}
                  type="button"
                  onClick={() => {
                    setActiveBrandId(brand.id);
                    setQuery('');
                    setTimeout(() => {
                      document
                        .getElementById('brand-panel')
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative p-4 md:p-5 rounded-2xl border-2 transition-all ${
                    isActive
                      ? 'bg-gradient-to-br from-brand-600 to-brand-500 text-white border-brand-500 shadow-glow'
                      : 'bg-white border-ink-100 hover:border-brand-300 shadow-soft'
                  }`}
                >
                  <div
                    className={`h-16 md:h-20 w-full grid place-items-center rounded-xl mb-3 ${
                      isActive ? 'bg-white' : 'bg-brand-50/40'
                    }`}
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-14 md:max-h-16 max-w-[85%] object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <p
                    className={`text-sm font-bold ${isActive ? 'text-white' : 'text-ink-900'}`}
                  >
                    {brand.name}
                  </p>
                  {brand.highlight && (
                    <p
                      className={`mt-1 text-xs leading-tight ${
                        isActive ? 'text-white/80' : 'text-brand-600'
                      }`}
                    >
                      {brand.highlight}
                    </p>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Painel da marca ativa */}
      <section className="section" id="brand-panel">
        <div className="container-wide">
          <AnimatePresence mode="wait">
            {activeBrand && (
              <motion.div
                key={activeBrand.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                {/* Header da marca */}
                <div className="rounded-3xl bg-gradient-to-br from-brand-50/60 to-white border border-ink-100 shadow-soft p-6 md:p-8 mb-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-6">
                    <div className="h-20 w-20 md:h-24 md:w-24 rounded-2xl bg-white border border-ink-100 shadow-soft grid place-items-center p-3 flex-shrink-0">
                      <img
                        src={activeBrand.logo}
                        alt={activeBrand.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                        Marca Selecionada
                      </p>
                      <h3 className="mt-1 font-display text-2xl md:text-3xl font-bold text-ink-900">
                        {activeBrand.name}
                      </h3>
                      {activeBrand.summary && (
                        <p className="mt-2 text-sm md:text-base text-ink-600 leading-relaxed max-w-2xl">
                          {activeBrand.summary}
                        </p>
                      )}
                    </div>
                    <a
                      href={activeBrand.categoryUrl || activeBrand.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-brand-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-700 transition-colors flex-shrink-0 self-start md:self-center shadow-soft"
                    >
                      Site oficial
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M7 17 17 7m0 0H9m8 0v8"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>

                  {/* Pesquisa */}
                  <div className="mt-5 relative max-w-md">
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={`Pesquisar em ${activeBrand.name}...`}
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
                      <path
                        d="m20 20-4-4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="mt-3 text-xs text-ink-500">
                    {filtered.length} {filtered.length === 1 ? 'linha' : 'linhas'} disponíveis
                  </p>
                </div>

                {/* Grid de produtos */}
                {brandSections.map((sec) => {
                  const secFiltered = filtered.filter((f) => f._section?.id === sec.id);
                  if (secFiltered.length === 0 && query) return null;
                  return (
                    <div key={sec.id} className="mb-8">
                      {brandSections.length > 1 && (
                        <div className="mb-5">
                          {sec.kicker && (
                            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                              {sec.kicker}
                            </p>
                          )}
                          <h4 className="mt-1 font-display text-xl md:text-2xl font-bold text-ink-900">
                            {sec.title}
                          </h4>
                          {sec.description && (
                            <p className="mt-2 text-sm text-ink-600 max-w-3xl">
                              {sec.description}
                            </p>
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

                      {/* Bloco de vídeos da secção */}
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
                                {/* Thumbnail */}
                                <div className="relative aspect-video overflow-hidden">
                                  <img
                                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                                    alt={v.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/vid:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-ink-950/40 group-hover/vid:bg-ink-950/20 transition-colors flex items-center justify-center">
                                    <div className="w-14 h-14 rounded-full bg-white/90 group-hover/vid:bg-white grid place-items-center shadow-lg transition-all duration-300 group-hover/vid:scale-110">
                                      <svg className="w-6 h-6 text-brand-700 ml-1" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z"/>
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="absolute top-3 right-3 bg-ink-950/70 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white flex items-center gap-1">
                                    <svg className="w-3 h-3 text-red-400" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.1 2.7 12 2.7 12 2.7s-4.1 0-6.8.2c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.2v2c0 2.1.3 4.2.3 4.2s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.3 21.6 12 21.7 12 21.7s4.1 0 6.8-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.2v-2C23.3 9.1 23 7 23 7z"/></svg>
                                    YouTube
                                  </div>
                                </div>
                                {/* Info */}
                                <div className="p-5 flex-1">
                                  <h5 className="font-semibold text-white text-sm md:text-base leading-snug group-hover/vid:text-brand-300 transition-colors">
                                    {v.title}
                                  </h5>
                                  {v.description && (
                                    <p className="mt-2 text-xs text-ink-400 leading-relaxed">
                                      {v.description}
                                    </p>
                                  )}
                                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 group-hover/vid:text-brand-300">
                                    Ver no YouTube
                                    <svg className="w-3 h-3 transition-transform group-hover/vid:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M7 17 17 7m0 0H9m8 0v8"/>
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
              </motion.div>
            )}
          </AnimatePresence>
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
      {/* Imagem grande com fallback */}
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
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
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

        {/* Tabela de referências */}
        {capacityTable && capacityTable.rows && capacityTable.rows.length > 0 && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setTableOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-brand-50 border border-brand-100 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition-colors"
            >
              <span>
                Tabela de referências ({capacityTable.rows.length})
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className={`transition-transform ${tableOpen ? 'rotate-180' : ''}`}
              >
                <path
                  d="m6 9 6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
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
                            <th
                              key={i}
                              className="text-left font-semibold uppercase tracking-wider text-[10px] px-3 py-2 whitespace-nowrap"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {capacityTable.rows.map((row, i) => {
                          const isHighlight =
                            capacityTable.highlightSku && row[0] === capacityTable.highlightSku;
                          return (
                            <tr
                              key={i}
                              className={`border-t border-ink-100 ${
                                isHighlight ? 'bg-brand-50 font-semibold' : ''
                              }`}
                            >
                              {row.map((cell, j) => (
                                <td
                                  key={j}
                                  className={`px-3 py-2 whitespace-nowrap ${
                                    j === 0 ? 'font-mono text-brand-700' : 'text-ink-700'
                                  }`}
                                >
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

        {/* Items lista */}
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
                      <a
                        href={itemUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink-700 hover:text-brand-700 transition-colors text-xs"
                      >
                        {itemName}
                      </a>
                    ) : (
                      <span className="text-ink-700 text-xs">{itemName}</span>
                    )}
                  </li>
                );
              })}
              {items.length > 8 && (
                <li className="text-xs text-ink-500 italic pl-2">
                  + {items.length - 8} mais no site oficial
                </li>
              )}
            </ul>
          </div>
        )}

        {/* CTA fundo */}
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
              <path
                d="M7 17 17 7m0 0H9m8 0v8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
      </div>
    </motion.article>
  );
}
