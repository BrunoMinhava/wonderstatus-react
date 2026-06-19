import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Catálogo de marcas reescrito.
 *
 * Comportamento:
 *  - Topo: grid de logos das marcas
 *  - Clicar numa marca → mostra todos os produtos/famílias dessa marca em cards grandes
 *  - Cada card tem: imagem grande + nome + SKU + summary + link oficial + (se existir) capacityTable com referências
 *
 * Props:
 *  - brands: [{id,name,logo,...}]
 *  - sections: [{id,brandId,navLabel,title,description,sourceUrl,families:[...]}]
 */
export default function CatalogBrowser({ brands = [], sections = [], searchPlaceholder = 'Pesquisar produto...' }) {
  const [activeBrandId, setActiveBrandId] = useState(brands[0]?.id || null);
  const [query, setQuery] = useState('');

  const activeBrand = brands.find((b) => b.id === activeBrandId);
  const brandSections = useMemo(
    () => sections.filter((s) => s.brandId === activeBrandId),
    [sections, activeBrandId]
  );

  // Flattened: todas as famílias desta marca, juntas, com referência à secção
  const allFamilies = useMemo(() => {
    const result = [];
    brandSections.forEach((sec) => {
      (sec.families || []).forEach((fam) => {
        result.push({ ...fam, _section: sec });
      });
    });
    return result;
  }, [brandSections]);

  // Filtro por pesquisa
  const filteredFamilies = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allFamilies;
    return allFamilies.filter((fam) => {
      const haystack = [
        fam.name,
        fam.navLabel,
        fam.sku,
        fam.summary,
        fam._section?.title,
        fam._section?.navLabel,
        ...(fam.items || []).map((i) => i.name || ''),
        ...((fam.capacityTable?.rows || []).flat())
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [allFamilies, query]);

  return (
    <div>
      {/* Grid de marcas no topo */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mb-6">
        {brands.map((brand) => {
          const isActive = brand.id === activeBrandId;
          return (
            <motion.button
              key={brand.id}
              type="button"
              onClick={() => {
                setActiveBrandId(brand.id);
                setQuery('');
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`relative p-4 rounded-2xl border transition-all ${
                isActive
                  ? 'bg-gradient-to-br from-brand-600 to-brand-500 text-white border-brand-500 shadow-glow'
                  : 'bg-white border-ink-100 hover:border-brand-300 shadow-soft'
              }`}
            >
              <div
                className={`h-14 md:h-16 w-full grid place-items-center rounded-lg mb-2 ${
                  isActive ? 'bg-white' : 'bg-brand-50/40'
                }`}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-10 md:max-h-12 max-w-[80%] object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <p
                className={`text-xs md:text-sm font-semibold ${
                  isActive ? 'text-white' : 'text-ink-900'
                }`}
              >
                {brand.name}
              </p>
              {brand.highlight && (
                <p
                  className={`mt-0.5 text-[10px] md:text-xs leading-tight ${
                    isActive ? 'text-white/75' : 'text-ink-500'
                  }`}
                >
                  {brand.highlight}
                </p>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Painel principal da marca ativa */}
      <AnimatePresence mode="wait">
        {activeBrand && (
          <motion.div
            key={activeBrand.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden"
          >
            {/* Header da marca */}
            <div className="p-6 md:p-8 border-b border-ink-100 bg-gradient-to-br from-brand-50/40 to-white">
              <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-6">
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-white border border-ink-100 shadow-soft grid place-items-center p-3 flex-shrink-0">
                  <img
                    src={activeBrand.logo}
                    alt={activeBrand.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                    Marca
                  </p>
                  <h3 className="mt-1 font-display text-2xl md:text-3xl font-bold text-ink-900">
                    {activeBrand.name}
                  </h3>
                  {activeBrand.summary && (
                    <p className="mt-2 text-sm md:text-base text-ink-600 leading-relaxed">
                      {activeBrand.summary}
                    </p>
                  )}
                </div>
                {(activeBrand.siteUrl || activeBrand.categoryUrl) && (
                  <a
                    href={activeBrand.categoryUrl || activeBrand.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors flex-shrink-0 self-start md:self-center"
                  >
                    Site oficial
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17 17 7m0 0H9m8 0v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </div>

              {/* Pesquisa */}
              {allFamilies.length > 5 && (
                <div className="mt-5 relative max-w-md">
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                    <path d="m20 20-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              )}

              <p className="mt-4 text-xs text-ink-500">
                {filteredFamilies.length}{' '}
                {filteredFamilies.length === 1 ? 'linha/produto' : 'linhas/produtos'} mostrados
              </p>
            </div>

            {/* Secções */}
            <div className="p-5 md:p-8 space-y-8">
              {brandSections.map((sec) => {
                const secFamilies = filteredFamilies.filter((f) => f._section?.id === sec.id);
                if (secFamilies.length === 0 && query) return null;
                return (
                  <div key={sec.id}>
                    {/* Header da secção */}
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
                          <p className="mt-2 text-sm text-ink-600 leading-relaxed max-w-3xl">
                            {sec.description}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Grid de produtos */}
                    {secFamilies.length === 0 ? (
                      <div className="text-center py-8 text-ink-500">
                        Nenhum produto encontrado para esta pesquisa.
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                        {secFamilies.map((fam, idx) => (
                          <ProductCard key={fam.id || idx} family={fam} index={idx} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Fallback: marca sem famílias (só link oficial) */}
              {brandSections.every((s) => !s.families || s.families.length === 0) && (
                <div className="text-center py-12">
                  <p className="text-ink-600 mb-4">
                    Catálogo completo disponível no site oficial do fabricante.
                  </p>
                  <a
                    href={activeBrand.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex"
                  >
                    Abrir site oficial {activeBrand.name}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17 17 7m0 0H9m8 0v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Card de produto/família com imagem grande, tabela de referências e link direto.
 */
function ProductCard({ family, index }) {
  const [tableOpen, setTableOpen] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const name = family.name || family.navLabel || family.title || '';
  // Fallback: se a família não tiver imagem, usa a do primeiro produto/item
  const rawImage =
    family.image ||
    family.photo ||
    family.products?.[0]?.image ||
    family.items?.[0]?.image;
  const image = imgFailed ? null : rawImage;
  // Suporta tanto items (estrutura lab) como products (estrutura ocean)
  const items = family.items || family.products || [];
  const url = family.url || family._section?.sourceUrl;
  const summary = family.summary || family.description;
  const capacityTable = family.capacityTable;
  const sku = family.sku;

  return (
    <article
      className="group rounded-2xl bg-white border border-ink-100 shadow-soft overflow-hidden hover:shadow-glow hover:-translate-y-1 active:scale-[0.985] transition-[transform,box-shadow] duration-300 will-change-transform flex flex-col"
    >
      {/* Imagem grande */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-50/60 to-white border-b border-ink-100 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-contain p-5"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-ink-300">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="9" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="m4 18 4-4 3 3 5-5 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
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

        {/* Tabela de referências (capacityTable) */}
        {capacityTable && capacityTable.rows && capacityTable.rows.length > 0 && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setTableOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-brand-50/60 border border-brand-100 text-xs font-semibold text-brand-700 hover:bg-brand-50 transition-colors"
            >
              <span>
                Tabela de referências ({capacityTable.rows.length}{' '}
                {capacityTable.rows.length === 1 ? 'referência' : 'referências'})
              </span>
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
                                isHighlight ? 'bg-brand-50/60 font-semibold' : 'hover:bg-brand-50/30'
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

        {/* Items/Products lista (para ocean e outras) */}
        {items.length > 0 && !capacityTable && (
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500 mb-2">
              {items.length} {items.length === 1 ? 'produto' : 'produtos'} na linha
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

        {/* CTA link oficial — sempre visível no fundo */}
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
    </article>
  );
}
