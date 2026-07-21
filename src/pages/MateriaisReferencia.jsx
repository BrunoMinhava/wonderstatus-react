import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import { crmBrands, crmApplicationAreas } from '../data/materiais-referencia-data';

function BrandLogo({ logo, name }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="w-24 h-16 rounded-xl bg-white border border-ink-100 flex items-center justify-center overflow-hidden flex-shrink-0 p-1.5">
      {failed ? (
        <span className="text-2xl font-bold text-brand-600">{name.charAt(0)}</span>
      ) : (
        <img src={logo} alt={name} className="w-full h-full object-contain" onError={() => setFailed(true)} />
      )}
    </div>
  );
}


const AREA_ICONS = {
  water: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
    </svg>
  ),
  fuel: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22V9l6-7 6 7v13H3z" /><path d="M9 22V12h6v10" /><path d="M19 5l2 2-2 2" /><path d="M21 7h-4" />
    </svg>
  ),
  food: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" /><path d="M12 6v6l4 2" />
    </svg>
  ),
  metal: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  env: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22c0-6 4-10 10-10s10 4 10 10" /><path d="M12 12V2" /><path d="M12 2s-4 3-4 6 4 6 4 6 4-3 4-6-4-6-4-6z" />
    </svg>
  ),
  ocean: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1C7 13 7 11 9.5 11c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1C7 19 7 17 9.5 17c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  ),
  bio: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10" /><path d="M22 2L12 12" /><path d="M16 2h6v6" />
    </svg>
  ),
  organic: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
    </svg>
  ),
};

function PdfModal({ url, title, onClose }) {
  return (
    <AnimatePresence>
      {url && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 flex flex-col m-4 md:m-8 lg:m-12 rounded-2xl overflow-hidden bg-white shadow-2xl flex-1"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-ink-950 text-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <span className="text-sm font-semibold">{title}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={url}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3" />
                  </svg>
                  Abrir
                </a>
                <a
                  href={url}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Fechar"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <iframe
              src={`${url}#toolbar=1&navpanes=0`}
              title={title}
              className="flex-1 w-full border-0"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function MateriaisReferencia() {
  const [pdfModal, setPdfModal] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
  }, [location.hash]);

  return (
    <PageTransition>
      <PageMeta
        title="Materiais de Referência Certificados — ROFA, LGC, NIST, NRC"
        description="Materiais de referência certificados (CRM) para laboratórios de controlo de qualidade e acreditação. Representante exclusivo ROFA France. Distribuição: LGC Standards, NIST, NRC Canada, VKI, JRC-ERM e BAS."
        path="/materiais-referencia"
      />
      <PdfModal
        url={pdfModal?.url}
        title={pdfModal?.title}
        onClose={() => setPdfModal(null)}
      />
      <PageHeader
        kicker="Certified Reference Materials"
        title="Materiais de Referência Certificados"
        subtitle="Distribuímos e representamos os principais produtores mundiais de materiais de referência certificados (CRM) — para águas, solos, combustíveis, alimentos e análise ambiental. Rastreabilidade metrológica e conformidade ISO 17034."
        image="/assets/slide4.JPG"
        actions={[
          { label: 'Ver marcas', href: '#marcas' },
          { label: 'Pedir informação', href: '/sobre#formulario-contacto', ghost: true }
        ]}
      />

      {/* Áreas de aplicação */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Áreas de aplicação"
            title="Para que serve um material de referência certificado?"
            description="Os CRM são utilizados para validação de métodos, calibração de instrumentos, controlo de qualidade interno e ensaios de aptidão (proficiency testing). Cobrimos as principais áreas analíticas."
          />
          <div className="mt-8 md:mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {crmApplicationAreas.map((area, idx) => (
              <ScrollReveal key={area.label} delay={idx * 0.05}>
                <div className="group rounded-2xl bg-white border border-ink-100 shadow-soft p-5 h-full hover:-translate-y-1 hover:shadow-glow transition-all duration-400">
                  <div className="h-10 w-10 rounded-xl bg-brand-50 group-hover:bg-brand-100 flex items-center justify-center text-brand-600 mb-3 transition-colors">
                    {AREA_ICONS[area.icon]}
                  </div>
                  <h3 className="font-display font-bold text-ink-900 text-sm leading-tight">{area.label}</h3>
                  <p className="mt-1 text-xs text-ink-500 leading-relaxed">{area.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Marcas / Fornecedores */}
      <section className="section bg-brand-50/30" id="marcas">
        <div className="container-wide">
          <SectionHead
            kicker="Fornecedores"
            title="Marcas que representamos e distribuímos"
            description="Representação exclusiva, distribuição autorizada e fornecimento direto dos principais produtores de CRM — todos com acreditação ISO 17034 ou equivalente nacional."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crmBrands.map((brand, idx) => {
              const cardContent = (
                <>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <BrandLogo logo={brand.logo} name={brand.name} />
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-700">
                        {brand.badge}
                      </span>
                      <span className="text-xs text-ink-500">{brand.country}</span>
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold text-ink-900 group-hover:text-brand-700 transition-colors">
                    {brand.name}
                  </h3>
                  <p className="mt-2 text-xs font-semibold text-brand-600 uppercase tracking-wider">
                    {brand.accreditation}
                  </p>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed">{brand.tagline}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {brand.categories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-block px-2 py-0.5 rounded-md bg-ink-50 text-ink-600 text-xs"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-ink-400">{brand.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                      {brand.pdfUrl ? (
                        <>
                          Ver catálogo PDF
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                          </svg>
                        </>
                      ) : (
                        <>
                          Ver catálogo
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                            <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                      )}
                    </span>
                  </div>
                </>
              );

              return (
                <ScrollReveal key={brand.id} id={brand.id} delay={idx * 0.06} className="h-full">
                  {brand.pdfUrl ? (
                    <button
                      type="button"
                      onClick={() => setPdfModal({ url: brand.pdfUrl, title: `${brand.name} — Catálogo CRM` })}
                      className="group block w-full h-full text-left rounded-2xl bg-white border border-ink-100 shadow-soft p-6 card-hover"
                    >
                      {cardContent}
                    </button>
                  ) : (
                    <a
                      href={brand.url}
                      target="_blank" rel="noopener noreferrer"
                      className="group block h-full rounded-2xl bg-white border border-ink-100 shadow-soft p-6 card-hover"
                    >
                      {cardContent}
                    </a>
                  )}
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Outros distribuidores — LGC, NIST, ECCC */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Distribuição"
            title="LGC Standards · NIST · ECCC"
            description="Distribuímos materiais de referência de amplo espectro para análise ambiental, alimentar, clínica e industrial — incluindo LGC Standards (UK), NIST Standard Reference Materials (EUA) e Environment Canada (ECCC)."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'LGC Standards',
                country: 'Reino Unido',
                accreditation: 'ISO 17034 / ISO 17025',
                desc: 'Amplo catálogo de CRM para análise ambiental, alimentar, farmacêutica, forense e clínica. Metais, compostos orgânicos e pesticidas.',
                url: 'https://www.lgcstandards.com/',
                catalogUrl: 'https://www.lgcstandards.com/',
                areas: ['Ambiente & águas', 'Alimentar', 'Farmacêutico & clínico', 'Forense', 'Metais & traço', 'Orgânicos']
              },
              {
                name: 'NIST — Standard Reference Materials',
                country: 'EUA',
                accreditation: 'Padrão nacional EUA',
                desc: 'SRMs do National Institute of Standards and Technology — referência primária para rastreabilidade metrológica em metais, materiais, alimentos e ambiente.',
                url: 'https://www.nist.gov/srm',
                catalogUrl: 'https://www.nist.gov/srm/srm-catalog',
                areas: ['Metais & ligas', 'Alimentos & nutrição', 'Ambiente & geologia', 'Clínico & biomédico', 'Polímeros', 'Energia & combustíveis']
              },
              {
                name: 'Environment Canada (ECCC)',
                country: 'Canadá',
                accreditation: 'Padrão nacional Canadá',
                desc: 'Materiais de referência certificados de Environment and Climate Change Canada para análise ambiental — águas, sedimentos, tecidos biológicos e solos contaminados.',
                url: 'https://www.canada.ca/en/environment-climate-change.html',
                catalogUrl: 'https://www.canada.ca/en/environment-climate-change/services/national-environmental-standards.html',
                areas: ['Águas naturais', 'Sedimentos marinhos', 'Tecidos biológicos', 'Solos contaminados', 'Análise ambiental']
              }
            ].map((brand, idx) => (
              <ScrollReveal key={brand.name} delay={idx * 0.07} className="h-full">
                <div className="rounded-2xl bg-white border border-ink-100 shadow-soft p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-display text-lg font-bold text-ink-900">{brand.name}</h3>
                    <span className="text-xs text-ink-400 whitespace-nowrap flex-shrink-0 mt-1">{brand.country}</span>
                  </div>
                  <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-3">{brand.accreditation}</p>
                  <p className="text-sm text-ink-600 leading-relaxed mb-4">{brand.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {brand.areas.map((a) => (
                      <span key={a} className="inline-block px-2 py-0.5 rounded-md bg-ink-50 text-ink-600 text-xs">{a}</span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 border-t border-ink-100">
                    <a
                      href={brand.catalogUrl}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-600 transition-colors"
                    >
                      Ver catálogo
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Salinidade */}
      <section className="section bg-brand-50/30">
        <div className="container-wide">
          <SectionHead
            kicker="Padrões de salinidade oceânica"
            title="OSIL — Ocean Scientific International"
            description="Padrões de salinidade oceânica certificados OSIL, utilizados por oceanógrafos, organismos de monitorização costeira e laboratórios marinhos para calibração de salinómetros e CTDs."
          />
          <ScrollReveal className="mt-8 md:mt-10">
            <a
              href="https://osil.com/product/salinity-bottles-and-crates/"
              target="_blank" rel="noopener noreferrer"
              className="group block rounded-2xl bg-white border border-ink-100 shadow-soft p-6 md:p-8 card-hover max-w-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0 text-2xl">
                  🌊
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink-900 group-hover:text-brand-700 transition-colors">
                    Salinity Bottles & Crates — OSIL
                  </h3>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed">
                    Padrões IAPSO (International Association for the Physical Sciences of the Oceans) — referência internacional para calibração de salinómetros de indução, CTDs e instrumentos oceanográficos.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    osil.com
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* NRC Canada + JRC ERM + BAS */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Outros fornecedores"
            title="NRC Canada · JRC/ERM · Bureau of Analysed Samples"
            description="Distribuição de materiais de referência de amplo espectro de três produtores adicionais — do Canadá, União Europeia e Reino Unido."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-3 gap-6">
            {/* NRC Canada */}
            <ScrollReveal className="h-full">
              <a
                href="https://nrc.canada.ca/en/certifications-evaluations-standards/certified-reference-materials/list"
                target="_blank" rel="noopener noreferrer"
                className="group flex flex-col h-full rounded-2xl bg-white border border-ink-100 shadow-soft p-6 card-hover"
              >
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
                    </svg>
                  </div>
                  <span className="text-xs font-semibold bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full flex-shrink-0">Distribuição</span>
                </div>
                <h3 className="font-display text-base font-bold text-ink-900 group-hover:text-brand-700 transition-colors">National Research Council Canada (NRC)</h3>
                <p className="mt-1 text-xs font-semibold text-brand-600 uppercase tracking-wider">NRC / ISO 17034 — Canadá</p>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed flex-1">CRMs para ambiente, alimentos, clínica, nanomateriais, toxinas de algas, micotoxinas, isótopos e minerais críticos. Inclui padrões de cannabis/canhâmo.</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['Ambiente','Alimentos','Clínico','Nanomateriais','Isótopos','Micotoxinas'].map(c => (
                    <span key={c} className="px-2 py-0.5 rounded-md bg-ink-50 text-ink-600 text-xs">{c}</span>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-ink-100 flex items-center justify-between">
                  <span className="text-xs text-ink-400">nrc.canada.ca</span>
                  <span className="text-sm font-semibold text-brand-700 flex items-center gap-1">
                    Catálogo NRC
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </a>
            </ScrollReveal>

            {/* JRC ERM */}
            <ScrollReveal delay={0.07} className="h-full">
              <a
                href="https://crm.jrc.ec.europa.eu/en/crms/?Keywords=ERM-BF419a"
                target="_blank" rel="noopener noreferrer"
                className="group flex flex-col h-full rounded-2xl bg-white border border-ink-100 shadow-soft p-6 card-hover"
              >
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
                    </svg>
                  </div>
                  <span className="text-xs font-semibold bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full flex-shrink-0">Distribuição</span>
                </div>
                <h3 className="font-display text-base font-bold text-ink-900 group-hover:text-brand-700 transition-colors">JRC — European Reference Materials (ERM)</h3>
                <p className="mt-1 text-xs font-semibold text-brand-600 uppercase tracking-wider">ISO 17034 / JRC — União Europeia</p>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed flex-1">Materiais ERM do Joint Research Centre da Comissão Europeia. Padrão europeu para análise alimentar e OGM/GMO, ambiental, biocombustíveis e análise industrial.</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['Alimentos','OGM / GMO','Ambiente','Biocombustíveis','Industrial'].map(c => (
                    <span key={c} className="px-2 py-0.5 rounded-md bg-ink-50 text-ink-600 text-xs">{c}</span>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-ink-100 flex items-center justify-between">
                  <span className="text-xs text-ink-400">crm.jrc.ec.europa.eu</span>
                  <span className="text-sm font-semibold text-brand-700 flex items-center gap-1">
                    Catálogo ERM
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </a>
            </ScrollReveal>

            {/* BAS */}
            <ScrollReveal delay={0.14} className="h-full">
              <a
                href="https://www.basrid.co.uk/"
                target="_blank" rel="noopener noreferrer"
                className="group flex flex-col h-full rounded-2xl bg-white border border-ink-100 shadow-soft p-6 card-hover"
              >
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-semibold bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full flex-shrink-0">Distribuição</span>
                </div>
                <h3 className="font-display text-base font-bold text-ink-900 group-hover:text-brand-700 transition-colors">Bureau of Analysed Samples (BAS)</h3>
                <p className="mt-1 text-xs font-semibold text-brand-600 uppercase tracking-wider">ISO 17034 — Reino Unido · +85 anos</p>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed flex-1">Produtor britânico com mais de 85 anos de experiência. Catálogo BAS próprio (No. 932, Mar 2025) e ORM de 27 fabricantes mundiais de referência. Análise química e espectroscópica.</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['Análise química','Espectroscopia','Metais e ligas','ORM — 27 fab.'].map(c => (
                    <span key={c} className="px-2 py-0.5 rounded-md bg-ink-50 text-ink-600 text-xs">{c}</span>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-ink-100 flex items-center justify-between">
                  <span className="text-xs text-ink-400">basrid.co.uk</span>
                  <span className="text-sm font-semibold text-brand-700 flex items-center gap-1">
                    Ver catálogos
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ContactCTA
        title="Precisa de um material de referência específico?"
        description="Contacte-nos com o parâmetro, matriz e gama de valores — identificamos o CRM adequado e informamos disponibilidade e prazo."
      />
    </PageTransition>
  );
}
