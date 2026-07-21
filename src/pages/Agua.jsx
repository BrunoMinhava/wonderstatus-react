import { useState } from 'react';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import ZoomableImage from '../components/Lightbox';
import { motion, AnimatePresence } from 'framer-motion';
import {
  waterProducts,
  complementarySystems,
  pretreatment,
  waterTypes,
  waterSpecs,
  processSteps,
  waterApplications,
  waterFeatures,
  waterPillars
} from '../data/water';

export default function Agua() {
  const [activeStep, setActiveStep] = useState(0);
  const step = processSteps[activeStep];

  return (
    <PageTransition>
      <PageMeta
        title="Sistemas de Água Ultrapura para Laboratório"
        description="Sistemas de produção de água ultrapura Tipo I (18,2 MΩ·cm) e Tipo II para laboratório. Série WATER 75, WATER 75 XL e WATER 300 — desenvolvidos pela Wonderstatus em Portugal."
        path="/agua"
      />
      <PageHeader
        kicker="Sistemas de Produção de Água"
        title="Sistemas de Produção de Água Tipo I e Tipo II"
        subtitle="Soluções de produção e purificação de água ultrapura (Tipo I) e pura (Tipo II) para aplicações laboratoriais, hospitalares e industriais."
        image="/assets/fotos/h2o-slide.jpg?v=2"
        actions={[
          { label: 'Ver soluções', href: '#tipos-água' },
          { label: 'Pedir informação', href: '/sobre#formulario-contacto', ghost: true }
        ]}
      />

      {/* Aplicações */}
      <section className="section" id="aplicações">
        <div className="container-wide">
          <SectionHead
            kicker="Aplicações"
            title="Aplicações laboratoriais, hospitalares e industriais"
            description="Configurações para diferentes exigências de pureza e consumo."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-3 gap-6">
            {waterApplications.map((app, idx) => (
              <ScrollReveal
                key={app.title}
                delay={idx * 0.1}
                className="rounded-3xl bg-white border border-ink-100 shadow-soft p-8 card-hover"
              >
                <div className="h-12 w-12 rounded-xl bg-brand-50 grid place-items-center text-brand-600 mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2.5c3.5 4 6 7 6 11a6 6 0 0 1-12 0c0-4 2.5-7 6-11Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-ink-900">{app.title}</h3>
                <p className="mt-3 text-ink-600 leading-relaxed">{app.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tipos de Água + Especificações */}
      <section className="section" id="tipos-água">
        <div className="container-wide">
          <SectionHead
            kicker="Tipos de Água"
            title="Tipo I e Tipo II na mesma plataforma"
            description="Produção de água Tipo I e II por filtragem, osmose inversa e desionização."
          />

          <div className="mt-8 md:mt-10 grid md:grid-cols-3 gap-6">
            {waterTypes.map((t, idx) => (
              <ScrollReveal
                key={t.kicker}
                delay={idx * 0.1}
                className="relative rounded-3xl bg-gradient-to-br from-brand-50 to-white border border-brand-100 shadow-soft p-8 card-hover overflow-hidden"
              >
                <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-brand-200/40 blur-2xl" />
                <p className="relative text-xs font-semibold uppercase tracking-widest text-brand-600">
                  {t.kicker}
                </p>
                <h3 className="relative mt-3 font-display text-2xl font-bold text-ink-900">
                  {t.title}
                </h3>
                <p className="relative mt-4 text-ink-600 leading-relaxed">{t.description}</p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-10 md:mt-12 rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
            <div className="p-8 md:p-10">
              <h3 className="font-display text-2xl font-bold text-ink-900">
                Especificações da Água Tipo I e II segundo ASTM
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-ink-50 text-ink-700">
                  <tr>
                    {waterSpecs.header.map((h) => (
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
                  {waterSpecs.rows.map((row) => (
                    <tr
                      key={row[0]}
                      className="border-t border-ink-100 hover:bg-brand-50/40 transition-colors"
                    >
                      {row.map((cell, i) => (
                        <td
                          key={i}
                          className={`px-6 py-4 ${
                            i === 0 ? 'font-semibold text-ink-900' : 'text-ink-700'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-ink-50/50 border-t border-ink-100">
              <p className="text-sm text-ink-600">{waterSpecs.note}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gama Water */}
      <section className="section" id="gama-equipamentos">
        <div className="container-wide">
          <SectionHead
            kicker="Gama Water"
            title="Sistemas de purificação por volume diário"
            description="Três sistemas de produção — Water 75, Water 75 XL e Water 300 — ajustados ao consumo diário do laboratório ou instalação."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {waterProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} to={`/produtos/${product.id}`} />
            ))}
          </div>
          <ScrollReveal className="mt-10 rounded-2xl bg-brand-50 border border-brand-100 p-6 text-center">
            <p className="text-ink-800">
              <strong className="text-brand-700">Reservatórios pressurizados disponíveis:</strong>{' '}
              16 L, 30 L e 80 L. Upgrade disponível.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Sistemas complementares */}
      <section className="section" id="sistemas-complementares">
        <div className="container-wide">
          <SectionHead
            kicker="Sistemas Complementares"
            title="Controlo, dispensa e recirculação"
            description="Módulos para automação, monitorização e utilização diária do sistema."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complementarySystems.map((s, idx) => (
              <ProductCard key={s.id} product={s} index={idx} to={`/produtos/${s.id}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Pré-tratamento */}
      <section className="section" id="pre-tratamento">
        <div className="container-wide">
          <SectionHead
            kicker="Proteção da instalação"
            title="Sistema de Pré-Tratamento de Água"
            description="Pré-tratamento para proteger os equipamentos quando a água de rede exige correção."
          />
          <ScrollReveal className="mt-8 md:mt-10 rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-brand-50 to-white p-8 md:p-12 flex items-center">
                <ZoomableImage
                  src={pretreatment.image}
                  alt={pretreatment.name}
                  caption={pretreatment.name}
                  className="w-full max-w-md mx-auto"
                  imgClassName="w-full"
                />
              </div>
              <div className="p-8 md:p-12">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                  Equipamento
                </p>
                <h3 className="mt-3 font-display text-3xl font-bold text-ink-900">
                  {pretreatment.name}
                </h3>
                <p className="mt-4 text-ink-700 leading-relaxed">{pretreatment.lead}</p>
                <ul className="mt-6 space-y-3">
                  {pretreatment.meta.map((m) => (
                    <li key={m} className="flex items-start gap-2 text-ink-700">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tecnologia e Controlo */}
      <section className="section" id="tecnologia-controlo">
        <div className="container-wide">
          <SectionHead
            kicker="Tecnologia e Controlo"
            title="Controlo contínuo do sistema"
            description="Monitorização, segurança e manutenção preventiva."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {waterFeatures.map((f, idx) => (
              <ScrollReveal
                key={f}
                delay={idx * 0.06}
                className="rounded-2xl bg-white border border-ink-100 shadow-soft p-6 card-hover"
              >
                <div className="h-9 w-9 rounded-lg bg-brand-50 grid place-items-center text-brand-600 mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6 9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="font-semibold text-ink-900">{f}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="section" id="processo">
        <div className="container-wide">
          <SectionHead
            kicker="Processo"
            title="Etapas do processo de purificação"
            description="Selecione a etapa para ver o detalhe técnico."
          />

          <ScrollReveal className="mt-8 md:mt-10 rounded-3xl bg-white border border-ink-100 shadow-soft p-6 md:p-8">
            <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hidden border-b border-ink-100">
              {processSteps.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setActiveStep(i)}
                  className={`group flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    i === activeStep
                      ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-soft'
                      : 'bg-brand-50/50 text-ink-700 hover:bg-brand-50 hover:text-brand-700'
                  }`}
                >
                  <span
                    className={`grid place-items-center h-6 w-6 rounded-full text-xs ${
                      i === activeStep ? 'bg-white/20' : 'bg-brand-100 text-brand-700'
                    }`}
                  >
                    {i + 1}
                  </span>
                  {s.title}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                    {activeStep + 1}ª Etapa
                  </p>
                  {step.optional && (
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                      Opcional
                    </span>
                  )}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-4 text-ink-700 leading-relaxed max-w-3xl">{step.description}</p>
              </motion.div>
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </section>

      {/* Diferenciação */}
      <section className="section" id="diferenciacao">
        <div className="container-wide">
          <SectionHead
            kicker="Wonderstatus"
            title="Desenvolvimento e suporte técnico"
            description="Conceção, produção e adequação do sistema à aplicação."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {waterPillars.map((pillar, idx) => (
              <ScrollReveal
                key={pillar}
                delay={idx * 0.06}
                className="rounded-2xl bg-gradient-to-br from-brand-700 to-brand-500 text-white p-6 shadow-soft"
              >
                <p className="font-display font-bold text-sm leading-snug">{pillar}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Aplicações por setor */}
      <section className="section" id="aplicações-por-setor">
        <div className="container-wide">
          <SectionHead
            kicker="Aplicações por Rotina"
            title="Água para cada técnica analítica"
            description="Cada técnica analítica exige um grau de pureza específico. Aqui está a correspondência entre tipos de água e aplicações típicas."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'HPLC / UHPLC',
                type: 'Tipo I',
                description: 'Cromatografia líquida com alta pureza, baixo TOC e sem interferentes orgânicos.',
                icon: 'chromatography'
              },
              {
                title: 'ICP / ICP-MS',
                type: 'Tipo I',
                description: 'Análise elementar com traço de metais abaixo de ppb, elevada resistividade.',
                icon: 'mass-spec'
              },
              {
                title: 'TOC / Análise Elementar',
                type: 'Tipo I',
                description: 'Carbono orgânico total baixo para ensaios sensíveis e controlo de qualidade.',
                icon: 'toc'
              },
              {
                title: 'Microbiologia',
                type: 'Tipo I / II',
                description: 'Controlo bacteriano < 1 ufc/ml e endotoxinas < 0.03 IU/ml com filtro 0.22 μm.',
                icon: 'microbio'
              },
              {
                title: 'Biologia Molecular',
                type: 'Tipo I',
                description: 'Água DNase/RNase-free para PCR, extração de ácidos nucleicos e preparação de buffers.',
                icon: 'dna'
              },
              {
                title: 'Preparação de Reagentes',
                type: 'Tipo II',
                description: 'Tampões, soluções padrão, calibrantes e reagentes para análise de rotina.',
                icon: 'flask'
              },
              {
                title: 'Análise Clínica',
                type: 'Tipo II',
                description: 'Ambientes hospitalares com rotinas de análise clínica e imunologia.',
                icon: 'clinic'
              },
              {
                title: 'Lavagem de Equipamentos',
                type: 'Tipo II',
                description: 'Água pura para lavagem final de material de vidro e preparação geral.',
                icon: 'rinse'
              }
            ].map((app, idx) => (
              <ScrollReveal
                key={app.title}
                delay={idx * 0.05}
                className="group rounded-2xl bg-white border border-ink-100 shadow-soft p-6 card-hover"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 grid place-items-center text-white shadow-soft">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2.5c3.5 4 6 7 6 11a6 6 0 0 1-12 0c0-4 2.5-7 6-11Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="inline-flex rounded-full bg-brand-50 text-brand-700 px-2.5 py-0.5 text-xs font-semibold border border-brand-100">
                    {app.type}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-ink-900 group-hover:text-brand-700 transition-colors">
                  {app.title}
                </h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{app.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparação visual de tipos */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Comparação"
            title="Qual o tipo de água que preciso?"
            description="Um guia rápido para identificar o tipo de água adequado à rotina do seu laboratório."
          />
          <ScrollReveal className="mt-8 md:mt-10 rounded-3xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 text-white p-8 md:p-12 shadow-glow overflow-hidden relative">
            <div aria-hidden="true" className="absolute -top-20 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {[
                {
                  type: 'Tipo I',
                  subtitle: 'Ultrapura',
                  resistivity: '18,2 MΩ·cm',
                  conductivity: '~0,055 μS/cm',
                  uses: ['HPLC · UHPLC', 'ICP · ICP-MS', 'Biologia molecular', 'TOC · Trace analysis'],
                  highlight: true
                },
                {
                  type: 'Tipo II',
                  subtitle: 'Pura',
                  resistivity: '≥ 10 MΩ·cm',
                  conductivity: '≤ 0,1 μS/cm',
                  uses: ['Preparação de reagentes', 'Tampões e soluções', 'Análise clínica', 'Microbiologia de rotina']
                },
              ].map((t) => (
                <div
                  key={t.type}
                  className={`rounded-2xl p-6 ${
                    t.highlight
                      ? 'bg-white text-ink-900 shadow-glow'
                      : 'bg-white/10 backdrop-blur border border-white/15'
                  }`}
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-widest ${
                      t.highlight ? 'text-brand-600' : 'text-white/70'
                    }`}
                  >
                    {t.type}
                  </p>
                  <h3
                    className={`mt-2 font-display text-2xl font-bold ${
                      t.highlight ? 'text-ink-900' : 'text-white'
                    }`}
                  >
                    {t.subtitle}
                  </h3>
                  <div className="mt-3 space-y-1">
                    <p className={`font-mono text-lg font-bold ${t.highlight ? 'text-brand-700' : 'text-brand-200'}`}>
                      {t.resistivity}
                    </p>
                    <p className={`font-mono text-sm font-medium ${t.highlight ? 'text-brand-500' : 'text-brand-300'}`}>
                      {t.conductivity}
                    </p>
                  </div>
                  <ul className={`mt-5 space-y-2 text-sm ${t.highlight ? 'text-ink-700' : 'text-white/85'}`}>
                    {t.uses.map((u) => (
                      <li key={u} className="flex items-start gap-2">
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                            t.highlight ? 'bg-brand-500' : 'bg-white/60'
                          }`}
                        />
                        <span>{u}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ContactCTA
        title="Precisa de um sistema de água ajustado à sua aplicação?"
        description="Configuramos sistemas standard e personalizados, com consultoria técnica especializada."
      />
    </PageTransition>
  );
}
