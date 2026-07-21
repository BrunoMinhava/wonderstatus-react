import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import CatalogBrowser from '../components/CatalogBrowser';
import PageTransition from '../components/PageTransition';
import ZoomableImage from '../components/Lightbox';
import {
  wiSensSensors,
  oceanFacts,
  oceanFeatures,
  wiHub,
  wiMo,
  wiSensTechSpecs,
  wiSensPhysicalSpecs,
  wiSensParameterMatrix,
  wiMoSuiteDigital,
} from '../data/ocean';
import oceanCatalog from '../data/ocean-catalog-data';

const nkeCatalog = {
  brands: oceanCatalog.brands.filter((b) => b.id === 'nke-instruments'),
  sections: oceanCatalog.sections
    ? oceanCatalog.sections.filter((s) => s.brandId === 'nke-instruments')
    : [],
};

const brochurePages = {
  wisens: [
    { src: '/assets/importados/brochure-wisens-pages/page-1.png', label: 'Capa' },
    { src: '/assets/importados/brochure-wisens-pages/page-2.png', label: 'Visão Geral' },
    { src: '/assets/importados/brochure-wisens-pages/page-3.png', label: 'Gama completa' },
    { src: '/assets/importados/brochure-wisens-pages/page-4.png', label: 'Especificações' },
    { src: '/assets/importados/brochure-wisens-pages/page-5.png', label: 'WiHub' },
    { src: '/assets/importados/brochure-wisens-pages/page-6.png', label: 'Aplicações' },
  ],
  wimo: [
    { src: '/assets/importados/brochure-wimo-pages-pt/page-2.png', label: 'WiMo PT · p.2' },
    { src: '/assets/importados/brochure-wimo-pages-pt/page-3.png', label: 'WiMo PT · p.3' },
  ],
};

const NKE_TABS = {
  wimo:        { type: 'product', image: '/assets/fotos/oceanografia/nke-wimo-product-site.png',   bgColor: '#47704c', label: 'WiMo',                     subtitle: 'Sonda multiparamétrica com 4 a 7 sensores em simultâneo — temperatura, CTD, oxigénio, clorofila-A e turbidez.' },
  wisens:      { type: 'product', image: '/assets/fotos/oceanografia/nke-wisens-product-site.png', bgColor: '#47704c', label: 'WiSens',                   subtitle: 'Data loggers subaquáticos autónomos até 6000 m — pressão, marés, ondas, CTD, O₂, clorofila-A e turbidez.' },
  boias:       { type: 'photo',   image: '/assets/fotos/nke/boia-100l.jpg',                        label: 'Bóias Instrumentadas',     subtitle: 'Bóias fixas 100 L e bóias à deriva SVP com transmissão satélite Iridium para monitorização oceânica.' },
  flutuadores: { type: 'photo',   image: '/assets/fotos/nke/deep-arvor.jpg',                       label: 'Flutuadores ARVOR / PROVOR', subtitle: 'Flutuadores autónomos para perfis oceânicos com ARGOS/Iridium — da costa a 4000 m de profundidade.' },
};

export default function OceanografiaNKE() {
  const [activeTab, setActiveTab] = useState('wimo');
  const tabBarRef = useRef(null);

  const switchTab = (tabKey) => {
    setActiveTab(tabKey);
  };

  const tabMeta = NKE_TABS[activeTab];

  return (
    <PageTransition>
      <PageMeta
        title="Sondas CTD e Data Loggers NKE Instruments"
        description="Sondas multiparamétricas e data loggers NKE: WiMo, WiSens e sistemas de aquisição de dados para oceanografia, monitorização de CTD, temperatura, salinidade e pressão."
        path="/oceanografia/nke"
      />

      {/* Dynamic hero banner */}
      <div className="relative h-[420px] md:h-[500px] overflow-hidden bg-ink-950">
        <AnimatePresence initial={false}>
          {tabMeta.type === 'photo' ? (
            <motion.img
              key={`nke-banner-${activeTab}`}
              src={tabMeta.image}
              alt=""
              aria-hidden="true"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.65, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <motion.div
              key={`nke-banner-${activeTab}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {/* Dark base */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-ink-900 to-teal-950" />
              {/* Product panel — right 62%, background matches image bg color exactly */}
              <div
                className="absolute right-0 top-0 h-full w-[62%]"
                style={{ backgroundColor: tabMeta.bgColor }}
              >
                <img
                  src={tabMeta.image}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain object-center"
                />
              </div>
              {/* Gradient mask: dark bleeds right over the product */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #07111e 0%, #07111e 36%, rgba(7,17,30,0.82) 50%, rgba(7,17,30,0.08) 68%, transparent 100%)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {tabMeta.type === 'photo' && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/65 to-ink-950/10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent pointer-events-none" />
          </>
        )}

        <div className="relative z-10 container-wide h-full flex flex-col justify-end pb-12 md:pb-16 pt-24">
          <Link
            to="/oceanografia"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-4 w-fit"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Oceanografia
          </Link>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">
            NKE Instruments · Oceanografia
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            {tabMeta.label}
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/75 max-w-2xl leading-relaxed">
            {tabMeta.subtitle}
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {['WiMo', 'WiSens', 'Até 6000 m', 'Wi-Fi magnético', 'IP67'].map((b) => (
              <span key={b} className="inline-flex rounded-full border border-white/25 bg-white/10 backdrop-blur px-3 py-1 text-xs font-medium text-white">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div ref={tabBarRef} className="sticky top-[64px] md:top-[80px] z-30 bg-white border-b border-ink-100 shadow-md">
        <div className="container-wide overflow-x-auto">
          <div className="flex gap-2 py-3 min-w-max">
          {[
            { key: 'wimo',       label: 'WiMo',        desc: 'Sonda Multiparamétrica' },
            { key: 'wisens',     label: 'WiSens',       desc: 'Data Loggers Autónomos' },
            { key: 'boias',      label: 'Bóias',        desc: 'Bóias Oceanográficas' },
            { key: 'flutuadores',label: 'Flutuadores',  desc: 'Flutuadores de Perfilamento' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => switchTab(tab.key)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-ink-100 text-ink-700 hover:bg-ink-200'
              }`}
            >
              <span className="font-bold">{tab.label}</span>
              <span className={`text-xs font-normal hidden md:block ${activeTab === tab.key ? 'text-white/75' : 'text-ink-500'}`}>{tab.desc}</span>
            </button>
          ))}
          </div>
        </div>
      </div>

      <div id="nke-content" className="scroll-mt-32" />

      {activeTab === 'wimo' && (<>
      {/* ═══ DIVISOR — WiMo ═══════════════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-brand-900">
        <div className="container-wide py-10 md:py-14 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">Linha de produto · NKE Instruments</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">WiMo</h2>
            <p className="mt-2 text-lg text-white/70 max-w-xl">Sonda multiparamétrica com 4 a 7 sensores em simultâneo, interface web incorporada e escova de limpeza automática opcional.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href="#wimo-specs" className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-5 py-2.5 text-sm transition-all">Ver especificações</a>
            <a href="/assets/importados/Brochure-WiMo-PT.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-5 py-2.5 text-sm transition-all">Brochura PDF</a>
          </div>
        </div>
      </div>

      {/* WiMo — multiparamétrico */}
      <section className="section" id="wimo">
        <div className="container-wide">
          <SectionHead kicker="WiMo" title={wiMo.title} description={wiMo.description} />

          <div className="mt-8 md:mt-10 grid lg:grid-cols-2 gap-6 items-start">
            <ScrollReveal>
              <ZoomableImage
                src="/assets/fotos/oceanografia/wimo-overview-hd-pt.png"
                alt="WiMo — visão geral"
                caption="WiMo — sonda multiparamétrica"
                className="rounded-3xl overflow-hidden bg-gradient-to-br from-brand-50 to-white border border-ink-100 shadow-soft"
                imgClassName="w-full object-contain p-4"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="rounded-3xl bg-white border border-ink-100 shadow-soft p-8 md:p-10">
              <h3 className="font-display text-xl font-bold text-ink-900">{wiMo.overview.heading}</h3>
              <p className="mt-3 text-ink-700 leading-relaxed">{wiMo.overview.text}</p>
              <div className="mt-5">
                <a href="/assets/importados/Brochure-WiMo-PT.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Abrir brochura WiMo (PT)
                </a>
              </div>
              <ul className="mt-6 space-y-2 text-ink-700">
                {wiMo.overview.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <ScrollReveal className="mt-8 md:mt-10 rounded-3xl overflow-hidden shadow-soft aspect-video">
            <iframe
              src="https://www.youtube.com/embed/dfAj67kBUWE"
              title="WiMo — quick start em 5 passos"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-presentation"
              className="w-full h-full"
            />
          </ScrollReveal>

          <ScrollReveal className="mt-8 md:mt-10 rounded-3xl overflow-hidden grid lg:grid-cols-2 bg-gradient-to-br from-brand-900 to-brand-600 shadow-glow">
            <ZoomableImage
              src="/assets/fotos/oceanografia/wimo-cleaning-brush.png"
              alt="Escova automática de limpeza para proteção do sensor WiMo"
              caption="Escova automática de limpeza — proteção do sensor"
              className="h-full min-h-64"
              imgClassName="w-full h-full object-cover"
            />
            <div className="p-8 md:p-10 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Destaque</p>
              <h3 className="mt-3 font-display text-2xl font-bold">Escova automática de limpeza</h3>
              <p className="mt-4 text-white/85 leading-relaxed">
                A escova merece destaque próprio na solução WiMo e na gama WiSens, surgindo como
                opção para medições de turbidez e clorofila-A e reforçando a proteção do sensor
                em campanhas de campo.
              </p>
              <ul className="mt-6 space-y-2 text-white/90">
                {[
                  'Escova de limpeza externa automática opcional',
                  'Indicada para WiSens TBD e WiSens Cloro-A',
                  'Destaque direto do sistema de proteção do sensor apresentado na brochura WiMo',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal id="wimo-specs" className="mt-8 md:mt-10 rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
            <div className="p-6 md:p-8 border-b border-ink-100">
              <h3 className="font-display text-xl font-bold text-ink-900">Especificações WiMo</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-ink-50 text-ink-700">
                  <tr>
                    <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Grupo</th>
                    <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Parâmetro</th>
                    <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {wiMo.specs.map((spec, idx) => (
                    <tr key={idx} className="border-t border-ink-100 hover:bg-brand-50/40 transition-colors">
                      <td className="px-6 py-3 font-semibold text-ink-900">{spec.group}</td>
                      <td className="px-6 py-3 text-ink-700">{spec.parameter}</td>
                      <td className="px-6 py-3 text-ink-700">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 pb-5 pt-4 border-t border-ink-100 text-xs text-ink-600">
              <p><strong>Nota:</strong> * Valor indicado com ZIP.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-8 md:mt-10 rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
            <div className="p-6 md:p-8 border-b border-ink-100">
              <h3 className="font-display text-xl font-bold text-ink-900">Suite Digital de Data Loggers Inteligentes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-ink-50 text-ink-700">
                  <tr>
                    <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Parâmetro</th>
                    <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Gama</th>
                    <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Acurácia</th>
                    <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Resolução</th>
                  </tr>
                </thead>
                <tbody>
                  {wiMoSuiteDigital.sections.map((section) => (
                    <>
                      <tr key={section.heading} className="bg-brand-50 border-t border-ink-100">
                        <th colSpan={4} className="px-6 py-3 text-left text-sm font-bold text-brand-700 uppercase tracking-wide">
                          {section.heading}
                        </th>
                      </tr>
                      {section.rows.map((row, idx) => (
                        <tr key={idx} className="border-t border-ink-100 hover:bg-brand-50/40 transition-colors">
                          <td className="px-6 py-3 font-semibold text-ink-900">
                            {row.parameter}
                            {row.noteRef && <sup className="ml-0.5 text-brand-600 font-bold">({row.noteRef})</sup>}
                          </td>
                          <td className="px-6 py-3 text-ink-700">{row.range}</td>
                          <td className="px-6 py-3 text-ink-700">{row.accuracy}</td>
                          <td className="px-6 py-3 text-ink-700">{row.resolution}</td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 pb-5 pt-4 border-t border-ink-100 text-xs text-ink-600 space-y-2">
              {wiMoSuiteDigital.notes.map((note, idx) => (
                <p key={idx}><strong>{idx === 0 ? 'Calibração recomendada:' : 'Notas:'}</strong> {note.replace(/^(Calibração recomendada:|Notas:)\s*/, '')}</p>
              ))}
              {wiMoSuiteDigital.technicalNotes && (
                <div className="mt-4 rounded-xl bg-brand-50 border border-brand-100 px-4 py-3 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-700 mb-1">Notas técnicas</p>
                  {wiMoSuiteDigital.technicalNotes.map((note) => (
                    <p key={note.label} className="text-xs text-ink-700 leading-relaxed">
                      <strong className="text-brand-700">({note.label})</strong> {note.text}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          {brochurePages.wimo.length > 0 && (
            <ScrollReveal className="mt-8 md:mt-10">
              <h3 className="font-display text-xl font-bold text-ink-900 mb-5">Páginas da brochura WiMo (PT)</h3>
              <div className="grid grid-cols-2 gap-4">
                {brochurePages.wimo.map((p, idx) => (
                  <ScrollReveal key={p.src} delay={idx * 0.08} className="rounded-2xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover">
                    <ZoomableImage src={p.src} alt={p.label} caption={p.label} imgClassName="w-full h-64 object-contain p-3 bg-ink-50" />
                    <div className="p-3 border-t border-ink-100">
                      <p className="text-xs font-semibold text-ink-900">{p.label}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              <div className="mt-6 text-center">
                <a href="/assets/importados/Brochure-WiMo-PT.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Descarregar brochura WiMo (PT)
                </a>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
      </>)}

      {activeTab === 'wisens' && (<>
      {/* ═══ DIVISOR — WiSens ════════════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-ink-900">
        <div className="container-wide py-10 md:py-14 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-2">Linha de produto · NKE Instruments</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">WiSens</h2>
            <p className="mt-2 text-lg text-white/70 max-w-xl">Data loggers subaquáticos autónomos para temperatura, pressão, marés, ondas, CTD, oxigénio, clorofila-A e turbidez — até 6000 m.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href="#gama" className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-5 py-2.5 text-sm transition-all">Ver gama</a>
            <a href="/assets/importados/Brochure-WiSens-PT.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-500 hover:bg-brand-400 text-white font-semibold px-5 py-2.5 text-sm transition-all">Brochura PDF</a>
          </div>
        </div>
      </div>

      {/* Cover WiSens */}
      <section className="section" id="wisens">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            <ScrollReveal variant="slide-right" className="lg:col-span-5">
              <p className="eyebrow">WiSens Series</p>
              <h2 className="mt-4 section-title">Dataloggers subaquáticos autónomos, configuráveis e compactos</h2>
              <p className="mt-4 section-lead">
                Sensores desenhados para recolha autónoma de dados em oceanografia, monitorização
                ambiental e trabalho costeiro. Baterias de lítio substituíveis, Wi-Fi com ativação
                magnética e interface web incorporada.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/assets/importados/Brochure-WiSens-PT.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Descarregar brochura PT (PDF)
                </a>
                <a href="#gama" className="btn-ghost">Ver gama completa</a>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="slide-left" delay={0.1} className="lg:col-span-7">
              <ZoomableImage
                src="/assets/fotos/oceanografia/wisens-cover.png"
                alt="Gama WiSens"
                caption="Gama WiSens — visão geral"
                className="rounded-3xl overflow-hidden bg-gradient-to-br from-brand-50 to-white border border-ink-100 shadow-soft"
                imgClassName="w-full h-full object-contain p-6"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Visão geral + Facts */}
      <section className="section" id="visao">
        <div className="container-wide">
          <SectionHead
            kicker="Visão Geral"
            title="Plataforma subaquática modular para monitorização, amostragem e campanhas de campo"
            description="A linha WiSens reúne dataloggers de dados subaquáticos pensados para diferentes cenários de oceanografia, ambiente, pesca e medições em profundidade."
          />
          <div className="mt-8 md:mt-10 grid lg:grid-cols-2 gap-6">
            <ScrollReveal className="rounded-3xl bg-white border border-ink-100 shadow-soft p-8 md:p-10">
              <h3 className="font-display text-xl font-bold text-ink-900">O que esta gama reúne</h3>
              <p className="mt-3 text-ink-700 leading-relaxed">
                Dataloggers compactos, configuráveis e orientados para recolha autónoma de dados,
                com modelos dedicados a pressão, ondas, CTD, clorofila-A, oxigénio dissolvido e
                turbidez.
              </p>
              <ul className="mt-5 space-y-2 text-ink-700">
                {oceanFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <div className="grid grid-cols-2 gap-4">
              {oceanFacts.map((f, idx) => (
                <ScrollReveal key={f.value} delay={idx * 0.08} className="rounded-2xl bg-gradient-to-br from-brand-700 to-brand-500 text-white p-6 shadow-soft">
                  <p className="font-display text-2xl md:text-3xl font-bold">{f.value}</p>
                  <p className="mt-2 text-sm text-white/85 leading-snug">{f.label}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gama WiSens */}
      <section className="section" id="gama">
        <div className="container-wide">
          <SectionHead
            kicker="Gama WiSens"
            title="Data Loggers organizados por parâmetro e profundidade"
            description="A linha WiSens cobre medições de maré, onda, temperatura, pressão, condutividade, salinidade, velocidade do som, oxigénio dissolvido, saturação de oxigénio, clorofila-A e turbidez."
          />
          <ScrollReveal className="mt-8 md:mt-10 rounded-3xl bg-gradient-to-br from-brand-50 to-white border border-ink-100 shadow-soft overflow-hidden">
            <ZoomableImage
              src="/assets/fotos/oceanografia/wisens-range.png"
              alt="Gama WiSens por profundidade"
              caption="Gama WiSens por profundidade — resumo visual"
              imgClassName="w-full object-contain p-6"
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wiSensSensors.map((s, idx) => (
              <ScrollReveal key={s.name} delay={idx * 0.06} className="group rounded-3xl bg-white border border-ink-100 shadow-soft p-7 card-hover">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">{s.tag}</p>
                <h3 className="mt-3 font-display text-xl font-bold text-ink-900 group-hover:text-brand-700 transition-colors">{s.name}</h3>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">{s.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-ink-700">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Especificações técnicas */}
      <section className="section" id="especificacoes">
        <div className="container-wide">
          <SectionHead
            kicker="Especificações Técnicas"
            title="Ficha completa dos parâmetros medidos"
            description="Consulte as tabelas técnicas com gamas, acurácia e resolução de cada sensor — clique para ampliar."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 gap-5">
            {[
              { src: '/assets/fotos/oceanografia/wisens-specs-overview-hd.png', label: 'Características técnicas e físicas' },
              { src: '/assets/fotos/oceanografia/wisens-specs-parameters-hd.png', label: 'Parâmetros medidos por modelo' },
            ].map((img, idx) => (
              <ScrollReveal key={img.src} delay={idx * 0.1} className="rounded-2xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover">
                <ZoomableImage src={img.src} alt={img.label} caption={img.label} imgClassName="w-full object-contain p-4 bg-gradient-to-b from-brand-50/40 to-white" />
                <div className="p-4 border-t border-ink-100">
                  <p className="text-sm font-semibold text-ink-900">{img.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Resumo Técnico */}
      <section className="section" id="tecnico">
        <div className="container-wide">
          <SectionHead
            kicker="Resumo Técnico"
            title="Características gerais, dimensões físicas e parâmetros medidos"
            description="Os dados abaixo reúnem os modelos, gamas e dimensões principais para consulta rápida."
          />
          <div className="mt-8 md:mt-10 space-y-6">
            <ScrollReveal className="rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
              <div className="p-6 md:p-8 border-b border-ink-100">
                <h3 className="font-display text-xl font-bold text-ink-900">Características Técnicas</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-ink-50 text-ink-700">
                    <tr>
                      <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Característica</th>
                      <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Configuração</th>
                      <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wiSensTechSpecs.map((row, idx) => (
                      <tr key={idx} className="border-t border-ink-100 hover:bg-brand-50/40 transition-colors">
                        <td className="px-6 py-3 font-semibold text-ink-900">{row.characteristic}</td>
                        <td className="px-6 py-3 text-ink-700">{row.config}</td>
                        <td className="px-6 py-3 text-ink-700">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>

            <ScrollReveal className="rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
              <div className="p-6 md:p-8 border-b border-ink-100">
                <h3 className="font-display text-xl font-bold text-ink-900">Características Físicas</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-ink-50 text-ink-700">
                    <tr>
                      <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Modelo</th>
                      <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Dimensões</th>
                      <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Peso no ar</th>
                      <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Peso aprox. dentro de água</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wiSensPhysicalSpecs.map((row, idx) => (
                      <tr key={idx} className="border-t border-ink-100 hover:bg-brand-50/40 transition-colors">
                        <td className="px-6 py-3 font-semibold text-ink-900">{row.model}</td>
                        <td className="px-6 py-3 text-ink-700">{row.dimensions}</td>
                        <td className="px-6 py-3 text-ink-700">{row.weightAir}</td>
                        <td className="px-6 py-3 text-ink-700">{row.weightWater}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>

            <ScrollReveal className="rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
              <div className="p-6 md:p-8 border-b border-ink-100">
                <h3 className="font-display text-xl font-bold text-ink-900">Parâmetros Medidos</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead className="bg-ink-50 text-ink-700">
                    <tr>
                      {['Modelo', 'Profundidade', 'Temperatura¹', 'Turbidez', 'Condutividade', 'Salinidade', 'Vel. som²', 'Conc. O₂', 'Sat. O₂', 'Clorofila-A'].map((h) => (
                        <th key={h} className="text-left font-semibold uppercase tracking-wider px-4 py-4 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {wiSensParameterMatrix.map((row, idx) => (
                      <tr key={idx} className="border-t border-ink-100 hover:bg-brand-50/40 transition-colors align-top">
                        <td className="px-4 py-3 font-semibold text-ink-900 whitespace-nowrap">{row.model}</td>
                        {[row.depth, row.temperature, row.turbidity, row.conductivity, row.salinity, row.soundSpeed, row.o2Conc, row.o2Sat, row.chloroA].map((cell, ci) => (
                          <td key={ci} className="px-4 py-3 text-ink-700">
                            {cell ? (
                              <div className="space-y-0.5">
                                {cell.map(([k, v]) => (
                                  <div key={k}><span className="font-semibold">{k}:</span> {v}</div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-ink-400">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 pb-5 pt-4 border-t border-ink-100 text-xs text-ink-600 space-y-1">
                <p><strong>Notas:</strong> 1. Tempo de resposta T63 &lt; 1 s, excepto para o TD6000. 2. Cálculo baseado em UNESCO Technical Papers in Marine Science 44, 55 pp. 3. Equivalente µg/L.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Interface + acessórios */}
      <section className="section" id="interface">
        <div className="container-wide">
          <SectionHead
            kicker="Interface e Acessórios"
            title="Interface web incorporada e acessórios dedicados"
            description="A plataforma WiSens foi pensada para visualização em computador, tablet e smartphone, com Wi-Fi e ativação magnética."
          />
          <div className="mt-8 md:mt-10 grid lg:grid-cols-2 gap-6 items-center">
            <ScrollReveal>
              <ZoomableImage
                src="/assets/fotos/oceanografia/wisens-interface.png"
                alt="Interface web WiSens"
                caption="Interface web incorporada"
                className="rounded-3xl overflow-hidden bg-gradient-to-br from-brand-50 to-white border border-ink-100 shadow-soft"
                imgClassName="w-full object-contain p-4"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="grid gap-4">
                {[
                  { title: 'Grampo de amarração', text: 'Acessório para instalação e fixação em campanhas ou estruturas submersas.' },
                  { title: 'Proteção de equipamento', text: 'Corpo adicional de proteção para operação mais robusta no terreno.' },
                  { title: 'Íman Wi-Fi', text: 'Elemento de ativação magnética para acesso rápido à comunicação do sistema.' },
                ].map((m) => (
                  <div key={m.title} className="rounded-2xl bg-white border border-ink-100 shadow-soft p-6">
                    <h4 className="font-display text-lg font-bold text-ink-900">{m.title}</h4>
                    <p className="mt-2 text-sm text-ink-600 leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* WiHub */}
      <section className="section" id="wihub">
        <div className="container-wide">
          <SectionHead kicker="Solução WiHub" title={wiHub.title} description={wiHub.description} />
          <div className="mt-8 md:mt-10 grid lg:grid-cols-2 gap-8">
            <ScrollReveal>
              <ZoomableImage
                src="/assets/fotos/oceanografia/wisens-wihub.png"
                alt="WiHub"
                caption="WiHub — recolha e envio remoto de dados"
                className="rounded-3xl overflow-hidden bg-gradient-to-br from-brand-50 to-white border border-ink-100 shadow-soft"
                imgClassName="w-full object-contain p-4"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="rounded-3xl bg-white border border-ink-100 shadow-soft p-8 md:p-10">
              <h3 className="font-display text-xl font-bold text-ink-900">Como funciona</h3>
              <p className="mt-3 text-ink-700 leading-relaxed">
                Quando os dataloggers WiSens estão fora de água, transferem automaticamente os
                seus dados para o WiHub. O utilizador pode depois recuperar essa informação
                através da conectividade integrada do sistema.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {wiHub.facts.map((f) => (
                  <div key={f.value} className="rounded-2xl bg-brand-50 border border-brand-100 p-4">
                    <p className="font-display text-lg font-bold text-brand-700">{f.value}</p>
                    <p className="mt-1 text-xs text-ink-600 leading-snug">{f.label}</p>
                  </div>
                ))}
              </div>
              <ul className="mt-6 space-y-2 text-sm text-ink-700">
                {wiHub.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Brochura WiSens */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Brochura"
            title="Páginas da brochura oficial WiSens"
            description="Clique para ampliar cada página. Brochura PDF completa disponível para download."
          />
          <div className="mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brochurePages.wisens.map((p, idx) => (
              <ScrollReveal key={p.src} delay={idx * 0.05} className="rounded-2xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover">
                <ZoomableImage src={p.src} alt={p.label} caption={p.label} imgClassName="w-full h-48 object-contain p-2 bg-ink-50" />
                <div className="p-3 border-t border-ink-100">
                  <p className="text-xs font-semibold text-ink-900">{p.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="/assets/importados/Brochure-WiSens-PT.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Descarregar PDF completo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      </>)}

      {activeTab === 'boias' && (<>
      {/* ═══ DIVISOR — Bóias ═════════════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-cyan-950 via-sky-900 to-brand-900">
        <div className="container-wide py-10 md:py-14 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">Linha de produto · NKE Instruments</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Bóias Instrumentadas</h2>
            <p className="mt-2 text-lg text-white/70 max-w-xl">Bóias fixas instrumentadas (100 L) e bóias à deriva SVP para monitorização de temperatura superficial, pressão e salinidade com transmissão por satélite Iridium.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href="https://nke-instrumentation.com/products/buoys/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-5 py-2.5 text-sm transition-all">Ver no site NKE</a>
          </div>
        </div>
      </div>

      <section className="section" id="boias">
        <div className="container-wide">
          <SectionHead
            kicker="Bóias Instrumentadas e Deriva"
            title="Bóias fixas e bóias à deriva SVP para monitorização oceânica"
            description="Bóias NKE para redes de medição automáticas em água doce ou salgada — Bóia 100 L para instalações fixas e série SC40 SVP para monitorização em deriva com satélite Iridium."
          />
          <div className="mt-8 md:mt-10 grid lg:grid-cols-2 gap-6 items-start">
            {/* Bóia 100 L */}
            <ScrollReveal>
              <div className="rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img src="/assets/fotos/nke/boia-100l.jpg" alt="Bóia 100 L NKE" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 mb-1">Bóia Instrumentada Fixa</p>
                  <h3 className="font-display text-xl font-bold text-ink-900">Bóia 100 L</h3>
                  <p className="mt-3 text-sm text-ink-600 leading-relaxed">Bóia fixa instrumentada para redes de monitorização em oceano aberto e estuários. Suporta ventos até 100 km/h e 2 nós de corrente, com proteção anti-incrustação e instalação sem ferramentas especiais.</p>
                  <a href="https://nke-instrumentation.com/products/buoys/" target="_blank" rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                    Ver no site NKE
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 0 2-2h6M15 3h6v6m-11 5L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* SC40 Drifters */}
            <ScrollReveal delay={0.1}>
              <div className="rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img src="/assets/fotos/nke/boias-instrumentadas.jpg" alt="SC40 SVP Drifters NKE" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 mb-1">Bóias à Deriva · Série SC40</p>
                  <h3 className="font-display text-xl font-bold text-ink-900">SC40 SVP — Bóias à Deriva</h3>
                  <p className="mt-3 text-sm text-ink-600 leading-relaxed">Bóias à deriva SVP para monitorização em deriva oceânica com transmissão por satélite Iridium. Três variantes para diferentes configurações de medição.</p>
                  <div className="mt-4 space-y-2">
                    {[
                      { name: 'SC40 SVP-B', desc: 'SST, pressão barométrica, deteção de drogue e GPS' },
                      { name: 'SC40 SVP BRST', desc: 'Temperatura de alta resolução, pressão e deteção de drogue' },
                      { name: 'SC40 SVP-BSC', desc: 'Condutividade/temperatura em deriva com satélite' },
                    ].map((p) => (
                      <div key={p.name} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                        <span><strong className="text-ink-900">{p.name}</strong> — <span className="text-ink-600">{p.desc}</span></span>
                      </div>
                    ))}
                  </div>
                  <a href="https://nke-instrumentation.com/products/buoys/" target="_blank" rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                    Ver no site NKE
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 0 2-2h6M15 3h6v6m-11 5L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal className="mt-10 text-center">
            <a href="https://nke-instrumentation.com/products/buoys/" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Ver gama completa de bóias NKE
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 0 2-2h6M15 3h6v6m-11 5L21 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </ScrollReveal>
        </div>
      </section>
      </>)}

      {activeTab === 'flutuadores' && (<>
      {/* ═══ DIVISOR — Flutuadores ══════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-brand-900">
        <div className="container-wide py-10 md:py-14 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">Linha de produto · NKE Instruments</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Flutuadores ARVOR / PROVOR</h2>
            <p className="mt-2 text-lg text-white/70 max-w-xl">Flutuadores autónomos para perfis oceânicos com transmissão ARGOS/Iridium — gama ARVOR (padrão e costeiro), Deep ARVOR até 4000 m, BGC-ARGO e regiões polares.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href="https://nke-instrumentation.com/products/profiling-floats/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-semibold px-5 py-2.5 text-sm transition-all">Ver no site NKE</a>
          </div>
        </div>
      </div>

      <section className="section" id="flutuadores">
        <div className="container-wide">
          <SectionHead
            kicker="Flutuadores de Perfilamento"
            title="Gama ARVOR e PROVOR — Argo floats para monitorização oceânica"
            description="Flutuadores de perfilamento compatíveis com a rede Argo global — derivam passivamente e emergem periodicamente para transmitir perfis de temperatura, salinidade e pressão via satélite."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'ARVOR',
                sub: 'Flutuador Standard / Costeiro',
                img: '/assets/fotos/nke/arvor-standard.jpg',
                desc: 'Flutuador padrão com CTD Sea-Bird para a rede Argo, transmissão ARGOS ou Iridium. Versão ARVOR C Costeiro até 400 m, até 300 ciclos e controlo remoto Iridium.',
                url: 'https://nke-instrumentation.com/products/profiling-floats/',
              },
              {
                name: 'Deep ARVOR',
                sub: 'Grandes Profundidades',
                img: '/assets/fotos/nke/deep-arvor.jpg',
                desc: 'Até 4000 m de profundidade, ~150 ciclos, CTD Sea-Bird, comunicação Bluetooth RF + Iridium. Ideal para campanhas de investigação oceânica profunda.',
                url: 'https://nke-instrumentation.com/products/profiling-floats/',
              },
              {
                name: 'PROVOR CTS5',
                sub: 'BGC-ARGO Biogeoquímico',
                img: '/assets/fotos/nke/provor-bio.jpg',
                desc: 'Flutuador biogeoquímico até 2000 m — mede O₂, nitratos, pH, clorofila, irradiância e partículas com UVP6-LP. Versão Polar Float para operação sob gelo ártico e antártico.',
                url: 'https://nke-instrumentation.com/products/profiling-floats/',
              },
            ].map((f, idx) => (
              <ScrollReveal key={f.name} delay={idx * 0.08}>
                <div className="rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden h-full flex flex-col">
                  <div className="h-52 overflow-hidden bg-ink-50">
                    <img src={f.img} alt={f.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">{f.sub}</p>
                    <h3 className="font-display text-lg font-bold text-ink-900">{f.name}</h3>
                    <p className="mt-2 text-sm text-ink-600 leading-relaxed flex-1">{f.desc}</p>
                    <a href={f.url} target="_blank" rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                      Ver no site NKE
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 0 2-2h6M15 3h6v6m-11 5L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="mt-10 text-center">
            <a href="https://nke-instrumentation.com/products/profiling-floats/" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Ver gama completa de flutuadores NKE
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 0 2-2h6M15 3h6v6m-11 5L21 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </ScrollReveal>
        </div>
      </section>
      </>)}

      {nkeCatalog.brands.length > 0 && (
        <section className="section" id="catalogo">
          <div className="container-wide">
            <SectionHead
              kicker="Catálogo NKE"
              title="Produtos NKE Instruments"
              description="Catálogo completo com os produtos NKE organizados por família."
            />
            <ScrollReveal className="mt-8 md:mt-10">
              <CatalogBrowser
                brands={nkeCatalog.brands}
                sections={nkeCatalog.sections}
                searchPlaceholder="Pesquisar sensor, família..."
              />
            </ScrollReveal>
          </div>
        </section>
      )}

      <ContactCTA
        title="Preparar uma campanha com NKE?"
        description="Apoiamos na seleção e configuração de equipamento WiSens, WiMo e WiHub para campanhas oceanográficas."
      />
    </PageTransition>
  );
}
