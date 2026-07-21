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
import icpData from '../data/icp-catalog-data';

// Agrupar dados por fabricante
const byManufacturer = icpData.reduce((acc, item) => {
  (acc[item.manufacturer] = acc[item.manufacturer] || []).push(item);
  return acc;
}, {});
const manufacturers = Object.keys(byManufacturer).sort();

export default function QuimicaICP() {
  const [activeManufacturer, setActiveManufacturer] = useState('Todos');
  const [query, setQuery] = useState('');

  const filteredData = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = activeManufacturer === 'Todos' ? icpData : byManufacturer[activeManufacturer] || [];
    if (q) {
      list = list.filter((item) => {
        return (
          item.manufacturer.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q) ||
          item.models.some((m) => m.name.toLowerCase().includes(q))
        );
      });
    }
    return list;
  }, [activeManufacturer, query]);

  return (
    <PageTransition>
      <PageMeta
        title="Consumíveis ICP e ICP-MS — Cones, Nebulizadores e Câmaras"
        description="Consumíveis para ICP e ICP-MS: cones de amostrador e skimmer, nebulizadores, câmaras de spray, sprays, tubos peristálticos e distribuidores. Compatíveis com PerkinElmer, Agilent, Shimadzu e Thermo."
        path="/quimica/icp-icpms"
      />
      <PageHeader
        kicker="Química · ICP / ICP-MS"
        title="Consumíveis para ICP e ICP-MS"
        subtitle="Catálogo técnico completo por fabricante e modelo — Agilent, PerkinElmer, Thermo Scientific, Shimadzu, Hitachi, Analytik Jena, Horiba, Spectro, Nu Instruments, Radom e Standard BioTools."
        image="/assets/fotos/quimica-icp.png"
        noParallax
        actions={[
          { label: 'Ver catálogo', href: '#catalogo' },
          { label: 'Pedir informação', href: '/sobre#formulario-contacto', ghost: true }
        ]}
      />
      <QuimicaTabRail />

      {/* Categorias de consumíveis */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Categorias de Consumíveis"
            title="Famílias técnicas ICP / ICP-MS"
            description="Gama completa de consumíveis e componentes para diferentes fabricantes e modelos de instrumentos."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Nebulizadores', desc: 'Gama completa de nebulizadores concêntricos, cross-flow e ultrassónicos.', items: ['Concentric glass', 'Cross-flow', 'Ultrasonic', 'Micro-flow', 'PFA', 'V-groove'] },
              { title: 'Tochas e injectores', desc: 'Torches demountable e one-piece, injectores em quartzo, cerâmica e sapphire.', items: ['One-piece torch', 'Demountable torch', 'Sapphire injectors', 'Alumina injectors', 'Quartz injectors'] },
              { title: 'Câmaras de nebulização', desc: 'Spray chambers cyclonic, Scott double-pass e cooled, em borosilicato e PFA.', items: ['Cyclonic', 'Scott double-pass', 'Cooled chambers', 'PFA chambers', 'Glass chambers'] },
              { title: 'Cones ICP-MS', desc: 'Sampler, skimmer e hyper-skimmer cones em Ni e Pt para alta sensibilidade.', items: ['Sampler cones Ni', 'Sampler cones Pt', 'Skimmer cones', 'Hyper-skimmer'] },
              { title: 'Tubing e acessórios', desc: 'Peristaltic tubing em PVC, Viton, Solva-Flex e kits de manutenção.', items: ['PVC tubing', 'Viton tubing', 'Solva-Flex', 'Tygon', 'Maintenance kits'] },
              { title: 'Autosampler parts', desc: 'Racks, vials, probes, caps e acessórios para autosamplers ASX e similares.', items: ['Vials & caps', 'Autosampler probes', 'Racks', 'Rinse stations', 'Carousel'] }
            ].map((cat, idx) => (
              <ScrollReveal
                key={cat.title}
                delay={idx * 0.05}
                className="rounded-3xl bg-white border border-ink-100 shadow-soft p-7 card-hover"
              >
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 grid place-items-center text-white mb-4 shadow-soft">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-ink-900">{cat.title}</h3>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">{cat.desc}</p>
                <ul className="mt-4 grid grid-cols-2 gap-x-2 gap-y-1 text-sm text-ink-700">
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

      {/* Catálogo por fabricante */}
      <section className="section" id="catalogo">
        <div className="container-wide">
          <SectionHead
            kicker="Catálogo por Fabricante"
            title="Selecione o fabricante e modelo"
            description={`${icpData.length} modelos de instrumentos ICP/ICP-MS com acesso direto à página oficial de consumíveis.`}
          />

          <ScrollReveal className="mt-8 md:mt-10 rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
            <div className="p-6 border-b border-ink-100">
              {/* Pesquisa */}
              <div className="relative max-w-md">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Pesquisar fabricante, modelo, tipo..."
                  className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="m20 20-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Filtros por fabricante */}
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-500 mb-2">Filtrar por fabricante</p>
                <div className="flex flex-wrap gap-2">
                  {['Todos', ...manufacturers].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setActiveManufacturer(m)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        activeManufacturer === m
                          ? 'bg-brand-600 text-white shadow-soft'
                          : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                      }`}
                    >
                      {m}
                      {m !== 'Todos' && byManufacturer[m] && (
                        <span className="ml-1.5 opacity-70">
                          ({byManufacturer[m].length})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-xs text-ink-500">
                {filteredData.length} {filteredData.length === 1 ? 'modelo' : 'modelos'} mostrados
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeManufacturer + query}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="overflow-x-auto"
              >
                <table className="min-w-full text-sm">
                  <thead className="bg-ink-50 text-ink-700 sticky top-0">
                    <tr>
                      <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Fabricante</th>
                      <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Tipo</th>
                      <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Modelos (acesso externo)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="px-6 py-10 text-center text-ink-500">
                          Nenhum modelo encontrado.
                        </td>
                      </tr>
                    ) : (
                      filteredData.map((item, i) => (
                        <tr key={i} className="border-t border-ink-100 hover:bg-brand-50/30 transition-colors">
                          <td className="px-6 py-3 font-semibold text-ink-900">{item.manufacturer}</td>
                          <td className="px-6 py-3">
                            <span className="inline-flex rounded-full bg-brand-50 text-brand-700 px-2.5 py-0.5 text-xs font-semibold border border-brand-100">
                              {item.type}
                            </span>
                          </td>
                          <td className="px-6 py-3">
                            <div className="flex flex-wrap gap-2">
                              {item.models.map((m, j) => (
                                m.url ? (
                                  <a
                                    key={j}
                                    href={m.url}
                                    target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-brand-200 px-3 py-1 text-xs font-medium text-brand-700 hover:bg-brand-50 hover:border-brand-400 transition-all"
                                  >
                                    {m.name}
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                                      <path d="M7 17 17 7m0 0H9m8 0v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </a>
                                ) : (
                                  <span key={j} className="inline-flex rounded-lg bg-ink-50 px-3 py-1 text-xs text-ink-700">
                                    {m.name}
                                  </span>
                                )
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </motion.div>
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <ScrollReveal>
            <BrandGrid
              brands={brandsByArea.quimica.icpExclusive}
              kicker="Marcas"
              title="Marcas Exclusivas para ICP / ICP-MS"
            />
          </ScrollReveal>
        </div>
      </section>

      <ContactCTA
        title="Precisa de identificar um consumível ICP específico?"
        description="Indique o equipamento, o part number ou a aplicação e propomos a referência compatível correta."
      />
    </PageTransition>
  );
}
