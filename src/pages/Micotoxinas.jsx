import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import { mycoAbout, mycoReasons, mycoCustomSteps, mycoISO } from '../data/mycotoxins';
import standardsCatalog from '../data/myco-standards-data';

export default function Micotoxinas() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [query, setQuery] = useState('');
  const [expandedFamily, setExpandedFamily] = useState(null);

  const group = standardsCatalog[activeGroup];

  const allFamilyNames = useMemo(() => {
    const set = new Set();
    group.families.forEach((f) => set.add(f.family));
    return ['Todas', ...Array.from(set)];
  }, [group]);

  const [familyFilter, setFamilyFilter] = useState('Todas');

  const filteredFamilies = useMemo(() => {
    const q = query.trim().toLowerCase();
    let fams = group.families;
    if (familyFilter !== 'Todas') {
      fams = fams.filter((f) => f.family === familyFilter);
    }
    if (!q) return fams;
    return fams
      .map((fam) => {
        if (fam.family.toLowerCase().includes(q)) return fam;
        const entries = (fam.entries || []).filter((e) =>
          Object.values(e).join(' ').toLowerCase().includes(q)
        );
        if (entries.length === 0) return null;
        return { ...fam, entries };
      })
      .filter(Boolean);
  }, [group, query, familyFilter]);

  const totalEntries = useMemo(
    () =>
      group.families.reduce((sum, f) => sum + (f.entries ? f.entries.length : 0), 0),
    [group]
  );

  return (
    <PageTransition>
      <PageMeta
        title="Detecção de Micotoxinas — Kits Rápidos e ELISA"
        description="Kits de detecção rápida (lateral flow) e ELISA para micotoxinas em cereais, alimentos e rações: aflatoxinas, DON, fumonisinas, OTA, zearalenona e T-2/HT-2."
        path="/micotoxinas"
      />
      <PageHeader
        kicker="Referência Analítica Avançada"
        title="Padrões e Soluções para Análise de Micotoxinas"
        subtitle="Materiais de referência para análise de micotoxinas em LC-MS/MS e HPLC, com produção personalizada, documentação técnica e acreditação ISO 17034."
        image="/assets/slide6.JPG"
        actions={[
          { label: 'Ver standards', href: '#standards' },
          { label: 'Pedir informação', href: '/sobre#formulario-contacto', ghost: true }
        ]}
      />

      {/* About */}
      <section className="section" id="about">
        <div className="container-wide">
          <SectionHead
            kicker="About / Expertise"
            title="Especialização científica para análise de micotoxinas"
            description="Área orientada para laboratórios que exigem reprodutibilidade, controlo de método e documentação."
          />

          <div className="mt-8 md:mt-10 grid lg:grid-cols-2 gap-6">
            <ScrollReveal className="rounded-3xl bg-white border border-ink-100 shadow-soft p-8 md:p-10">
              <h3 className="font-display text-xl font-bold text-ink-900">{mycoAbout.positioningTitle}</h3>
              <p className="mt-3 text-ink-700 leading-relaxed">{mycoAbout.positioning}</p>
              <ul className="mt-5 space-y-2 text-ink-700">
                {mycoAbout.positioningList.map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.15} className="rounded-3xl bg-gradient-to-br from-brand-700 to-brand-500 text-white p-8 md:p-10 shadow-glow">
              <h3 className="font-display text-xl font-bold">{mycoAbout.valueTitle}</h3>
              <p className="mt-3 text-white/85 leading-relaxed">{mycoAbout.valueIntro}</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {mycoAbout.valueGrid.map((v) => (
                  <div key={v.label} className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 p-5">
                    <p className="font-display text-base font-bold">{v.label}</p>
                    <p className="mt-1 text-xs text-white/75">{v.detail}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Razões */}
      <section className="section">
        <div className="container-wide">
          <SectionHead kicker="Razões para escolher" title="Vantagens para controlo e rastreabilidade" />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mycoReasons.map((r, idx) => (
              <ScrollReveal key={r.title} delay={idx * 0.05} className="rounded-3xl bg-white border border-ink-100 shadow-soft p-7 card-hover">
                <div className="h-10 w-10 rounded-xl bg-brand-50 grid place-items-center text-brand-600 mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7l-9-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="m8.5 12.5 2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-bold text-ink-900">{r.title}</h3>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">{r.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Standards catálogo completo */}
      <section className="section" id="standards">
        <div className="container-wide">
          <SectionHead
            kicker="Mycotoxin Standards"
            title="Catálogo técnico completo por grupo"
            description="Calibrantes nativos, C13 fully labeled e misturas multi-componentes. Soluções alinhadas com ISO 31, ISO 34, ISO 35 e guias Eurachem/CITAC."
          />

          <ScrollReveal className="mt-8 md:mt-10 rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
            <div className="flex gap-2 p-4 md:p-6 overflow-x-auto scrollbar-hidden border-b border-ink-100">
              {standardsCatalog.map((g, i) => (
                <button
                  key={g.key}
                  type="button"
                  onClick={() => {
                    setActiveGroup(i);
                    setQuery('');
                    setExpandedFamily(null);
                    setFamilyFilter('Todas');
                  }}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    i === activeGroup
                      ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-soft'
                      : 'bg-brand-50/50 text-ink-700 hover:bg-brand-50 hover:text-brand-700'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-8 border-b border-ink-100">
              <h3 className="font-display text-2xl font-bold text-ink-900">{group.label}</h3>
              <p className="mt-3 text-ink-600 leading-relaxed max-w-3xl">{group.description}</p>

              <div className="mt-5 relative max-w-md">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Pesquisar toxina, referência, família..."
                  className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="m20 20-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Filtros por categoria de toxina */}
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-500 mb-2">
                  Filtrar por categoria
                </p>
                <div className="flex flex-wrap gap-2">
                  {allFamilyNames.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFamilyFilter(f)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        familyFilter === f
                          ? 'bg-brand-600 text-white shadow-soft'
                          : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-xs text-ink-500">
                {filteredFamilies.length} {filteredFamilies.length === 1 ? 'família' : 'famílias'} ·{' '}
                {totalEntries} standards no total
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup + query + familyFilter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-5 md:p-6 space-y-4"
              >
                {filteredFamilies.length === 0 ? (
                  <p className="text-center py-10 text-ink-500">Nenhum resultado para a sua pesquisa.</p>
                ) : (
                  filteredFamilies.map((fam, idx) => {
                    const key = `${activeGroup}-${idx}-${fam.family}`;
                    const open = expandedFamily === key;
                    return (
                      <article key={key} className="rounded-2xl border border-ink-100 bg-white overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setExpandedFamily(open ? null : key)}
                          className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-brand-50/40 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="font-display text-lg font-bold text-ink-900">{fam.family}</h4>
                            {fam.solvent && (
                              <p className="mt-1 text-xs font-semibold text-brand-600 uppercase tracking-wider">
                                Solvente: {fam.solvent}
                              </p>
                            )}
                            {fam.summary && <p className="mt-1 text-sm text-ink-600">{fam.summary}</p>}
                            {fam.entries && (
                              <p className="mt-2 text-xs text-ink-500">
                                {fam.entries.length} {fam.entries.length === 1 ? 'standard' : 'standards'}
                              </p>
                            )}
                          </div>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            className={`text-ink-400 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`}
                          >
                            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </button>
                        <AnimatePresence initial={false}>
                          {open && fam.entries && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden border-t border-ink-100 bg-ink-50/30"
                            >
                              <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                  <thead className="bg-ink-50 text-ink-700">
                                    <tr>
                                      <th className="text-left font-semibold uppercase tracking-wider text-xs px-5 py-3">
                                        Standard
                                      </th>
                                      <th className="text-left font-semibold uppercase tracking-wider text-xs px-5 py-3">
                                        Concentração
                                      </th>
                                      <th className="text-left font-semibold uppercase tracking-wider text-xs px-5 py-3">
                                        Acondicionamento
                                      </th>
                                      <th className="text-left font-semibold uppercase tracking-wider text-xs px-5 py-3">
                                        Referências
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {fam.entries.map((e, i) => (
                                      <tr key={i} className="border-t border-ink-100 hover:bg-white transition-colors">
                                        <td className="px-5 py-3 font-semibold text-ink-900">{e.name}</td>
                                        <td className="px-5 py-3 text-ink-700">{e.concentration || '—'}</td>
                                        <td className="px-5 py-3 text-ink-700">{e.conditioning || '—'}</td>
                                        <td className="px-5 py-3 font-mono text-xs text-brand-700">
                                          {e.references || e.reference || '—'}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </article>
                    );
                  })
                )}
              </motion.div>
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </section>

      {/* Produção personalizada */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Custom Production"
            title="Produção personalizada para necessidades analíticas específicas"
            description="Misturas customizadas e suporte à validação para necessidades analíticas específicas."
          />
          <div className="mt-8 md:mt-10 grid lg:grid-cols-5 gap-6">
            <ScrollReveal className="lg:col-span-2 rounded-3xl bg-white border border-ink-100 shadow-soft p-8">
              <p className="text-ink-700 leading-relaxed">
                Desenvolvimento de padrões ajustados a concentração, mistura e acondicionamento.
              </p>
              <ul className="mt-6 space-y-2 text-ink-700">
                {[
                  'Validação de método.',
                  'Redução de risco analítico.',
                  'Otimização de tempo e inventário.',
                  'Suporte a I&D e expansão laboratorial.'
                ].map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.15} className="lg:col-span-3">
              <ol className="space-y-4">
                {mycoCustomSteps.map((s, idx) => (
                  <motion.li
                    key={s.step}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-start gap-5 rounded-2xl bg-white border border-ink-100 shadow-soft p-6"
                  >
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 text-white font-display font-bold text-lg grid place-items-center flex-shrink-0 shadow-soft">
                      {s.step}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink-900">{s.title}</h3>
                      <p className="mt-1 text-sm text-ink-600 leading-relaxed">{s.detail}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ISO 17034 */}
      <section className="section" id="iso">
        <div className="container-wide">
          <ScrollReveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 via-brand-900 to-brand-700 text-white p-10 md:p-16 shadow-glow">
            <div aria-hidden="true" className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-brand-300/20 blur-3xl" />
            <div className="relative flex flex-col lg:flex-row gap-10 lg:items-center">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center h-32 w-32 rounded-3xl bg-white text-brand-700 font-display font-bold text-2xl tracking-tight shadow-glow">
                  {mycoISO.badge}
                </div>
              </div>
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Acreditação</p>
                <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-balance leading-tight">
                  {mycoISO.title}
                </h2>
                <p className="mt-5 text-white/85 leading-relaxed">{mycoISO.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-white/85">
                  {mycoISO.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-300 flex-shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ContactCTA
        title="Precisa de documentação ou de uma mistura customizada?"
        description="Apoiamos na consulta de certificados, fichas técnicas e informação por lote. Também produzimos misturas multi-componentes sob pedido."
      />
    </PageTransition>
  );
}
