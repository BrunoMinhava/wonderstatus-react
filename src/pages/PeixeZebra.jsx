import { motion } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';

const LOCAL = '/assets/fotos/viewpoint';

const STAGE_COLORS = {
  Embrião: 'bg-violet-100 text-violet-700',
  Larva:   'bg-sky-100 text-sky-700',
  Adulto:  'bg-teal-100 text-teal-700',
};

const APPLICATIONS = [
  { id: 'behavior', label: 'Fish Behavior Monitoring', icon: '🐟', color: 'from-sky-500 to-cyan-400',       desc: 'Locomoção, distância percorrida e padrões comportamentais em tempo real.' },
  { id: 'cardio',   label: 'Cardiologia',               icon: '❤️', color: 'from-rose-500 to-pink-400',      desc: 'Frequência cardíaca, débito cardíaco e fluxo sanguíneo em larvas.' },
  { id: 'visual',   label: 'Função Visual',              icon: '👁️', color: 'from-indigo-500 to-violet-400',  desc: 'Reflexos visuais, OKR e preferência de cor em larvas e adultos.' },
  { id: 'operant',  label: 'Condicionamento Operante',   icon: '🧠', color: 'from-emerald-500 to-teal-400',   desc: 'Aprendizagem, memória e tomada de decisão em adultos.' },
  { id: 'auditory', label: 'Função Auditiva',            icon: '🔊', color: 'from-amber-500 to-orange-400',   desc: 'Respostas de sobressalto e inibição PPI — sobressalto pré-pulso.' },
];

const PRODUCTS = [
  {
    name: 'ZebraBox',
    type: 'Hardware',
    stages: ['Embrião', 'Larva'],
    applications: ['Fish Behavior Monitoring', 'Função Visual', 'Condicionamento Operante', 'Função Auditiva'],
    description: 'Sistema de rastreamento de locomoção com módulo de estimulação integrado. Ideal para ensaios com embriões e larvas em placas multipoço.',
    image: `${LOCAL}/zebrabox.png`,
    url: 'https://www.viewpoint.fr/product/zebrafish/fish-behavior-monitoring/zebrabox',
    featured: true,
  },
  {
    name: 'ZebraBox PPI Hybrid',
    type: 'Hardware',
    stages: ['Embrião', 'Larva'],
    applications: ['Fish Behavior Monitoring', 'Condicionamento Operante'],
    description: 'Monitoriza locomoção e distância percorrida em larvas, com capacidade de estímulo acústico para ensaios PPI (Pre-Pulse Inhibition).',
    image: `${LOCAL}/zebrabox-ppi.png`,
    url: 'https://www.viewpoint.fr/product/zebrafish/fish-behavior-monitoring/zebrabox-ppi-hybrid',
  },
  {
    name: 'ZebraTower',
    type: 'Hardware',
    stages: ['Larva', 'Adulto'],
    applications: ['Fish Behavior Monitoring', 'Condicionamento Operante'],
    description: 'Monitorização de locomoção em ambiente aberto. Concebido para adultos em tanques de observação verticais, sem perturbação do animal.',
    image: `${LOCAL}/zebratower.png`,
    url: 'https://www.viewpoint.fr/product/zebrafish/fish-behavior-monitoring/zebratower',
  },
  {
    name: 'ZebraCube',
    type: 'Hardware',
    stages: ['Adulto'],
    applications: ['Condicionamento Operante', 'Fish Behavior Monitoring'],
    description: 'Rastreamento de locomoção em ambiente controlado. Sistema fechado com câmara de alta resolução para adultos — minimiza fatores externos.',
    image: `${LOCAL}/zebracube.png`,
    url: 'https://www.viewpoint.fr/product/zebrafish/fish-behavior-monitoring/zebracube',
  },
  {
    name: 'VisioBox',
    type: 'Hardware',
    stages: ['Larva', 'Adulto'],
    applications: ['Função Visual'],
    description: 'Avaliação de comportamento reflexo visual (OKR — Optokinetic Response). Mede a resposta optomotora em larvas e adultos com precisão.',
    image: `${LOCAL}/visiobox.png`,
    url: 'https://www.viewpoint.fr/product/zebrafish/visual-function/visiobox',
  },
  {
    name: 'Aggression Box',
    type: 'Hardware',
    stages: ['Adulto'],
    applications: ['Fish Behavior Monitoring'],
    description: 'Quantifica o nível de agressividade em peixe zebra juvenil e adulto. Análise automática de comportamentos agonísticos frente a espelho.',
    image: `${LOCAL}/zebrafish-hero.png`,
    url: 'https://www.viewpoint.fr/product/zebrafish/fish-behavior-monitoring/aggression-box',
  },
  {
    name: 'ZebraLab',
    type: 'Software',
    stages: ['Embrião', 'Larva', 'Adulto'],
    applications: ['Fish Behavior Monitoring', 'Função Visual', 'Condicionamento Operante'],
    description: 'Software central para controlo e análise de dados de adultos, larvas e embriões — compatível com ZebraBox, ZebraTower e ZebraCube.',
    image: `${LOCAL}/zebralab.png`,
    url: 'https://www.viewpoint.fr/product/zebrafish/fish-behavior-monitoring/zebralab',
    featured: true,
  },
  {
    name: 'Zebrafish Cardiac Performance',
    type: 'Software',
    stages: ['Larva'],
    applications: ['Cardiologia'],
    description: 'Analisa múltiplos factores que afectam o débito cardíaco: frequência, ritmo e contratilidade. Dados quantitativos de forma não invasiva em larvas.',
    image: `${LOCAL}/zebrafish-cardiac.png`,
    url: 'https://www.viewpoint.fr/product/zebrafish/cardiology/zebrafish-cardiac-performance',
  },
  {
    name: 'MicroZebraLab',
    type: 'Software',
    stages: ['Larva'],
    applications: ['Cardiologia'],
    description: 'Mede frequência cardíaca e fluxo sanguíneo em larvas de peixe zebra com resolução de microimagem. Solução não invasiva para estudos cardiovasculares.',
    image: `${LOCAL}/microzebralab.png`,
    url: 'https://www.viewpoint.fr/product/zebrafish/cardiology/microzebralab',
  },
];

const HARDWARE = PRODUCTS.filter((p) => p.type === 'Hardware');
const SOFTWARE = PRODUCTS.filter((p) => p.type === 'Software');

function ProductCard({ product }) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover h-full">
      {/* Image area */}
      <div className="relative bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6 h-48 shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <span className="absolute top-3 right-3 inline-flex rounded-full bg-indigo-600 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wide">
            Destaque
          </span>
        )}
        <span className={`absolute top-3 left-3 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
          product.type === 'Hardware' ? 'bg-sky-100 text-sky-700' : 'bg-violet-100 text-violet-700'
        }`}>
          {product.type}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 border-t border-ink-100">
        {/* Life stages */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.stages.map((s) => (
            <span key={s} className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${STAGE_COLORS[s]}`}>
              {s}
            </span>
          ))}
        </div>

        <h3 className="font-display text-base font-bold text-ink-900 group-hover:text-indigo-700 transition-colors leading-snug">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-ink-500 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Application tags */}
        <div className="mt-3 flex flex-wrap gap-1">
          {product.applications.map((a) => (
            <span key={a} className="inline-flex rounded-full bg-ink-50 border border-ink-100 px-2 py-0.5 text-[10px] text-ink-400 font-medium">
              {a}
            </span>
          ))}
        </div>

        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-indigo-600 group-hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 transition-all self-start">
          Ver produto
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </a>
  );
}

export default function PeixeZebra() {
  return (
    <PageTransition>
      <PageMeta
        title="Peixe Zebra — Equipamentos de Análise Comportamental"
        description="Equipamentos de rastreamento comportamental para peixe zebra — de embrião a adulto. ZebraBox, ZebraLab, VisioBox, ZebraTower e muito mais."
        path="/peixe-zebra"
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20">
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-[1.03]"
          style={{ backgroundImage: `url(${LOCAL}/zebrafish-banner.jpg)` }}
        />
        {/* Dark overlay — same as Viewpoint's own page */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />

        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-white"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-md">
              Peixe Zebra · Investigação
            </p>
            <h1 className="mt-5 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-balance">
              Análise comportamental para Peixe Zebra
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
              Do embrião ao adulto — rastreamento de locomoção, análise cardíaca e função visual para peixe zebra, medaka e danionella.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {['Embrião', 'Larva', 'Adulto', 'Medaka', 'Danionella'].map((tag) => (
                <span key={tag} className="inline-flex rounded-full border border-white/25 bg-white/10 backdrop-blur px-3 py-1 text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#hardware" className="btn-primary">Ver equipamentos</a>
              <a href="#software" className="btn-outline-light">Ver software</a>
            </div>
          </motion.div>
        </div>

        {/* Bottom fade to page bg */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#f7fbff]" />
      </section>

      {/* Hardware */}
      <section className="section bg-ink-50" id="hardware">
        <div className="container-wide">
          <SectionHead
            kicker="Hardware"
            title="Sistemas de rastreamento e análise comportamental"
            description="Equipamentos de precisão para monitorização automática de peixe zebra — câmara de alta resolução, módulos de estimulação e ambientes controlados."
          />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HARDWARE.map((p, idx) => (
              <ScrollReveal key={p.name} delay={idx * 0.05} className="h-full">
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Software */}
      <section className="section" id="software">
        <div className="container-wide">
          <SectionHead
            kicker="Software"
            title="Plataformas de análise e controlo"
            description="Software especializado para controlo dos sistemas de hardware, aquisição de dados e análise quantitativa de comportamento."
          />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SOFTWARE.map((p, idx) => (
              <ScrollReveal key={p.name} delay={idx * 0.05} className="h-full">
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Módulos adicionais */}
      <section className="section bg-gradient-to-br from-indigo-950 to-slate-900">
        <div className="container-wide">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-300 bg-white/10 rounded-full border border-white/15">
                Módulos adicionais
              </span>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                Expanda o seu sistema
              </h2>
              <div className="mt-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-indigo-400 to-violet-300" />
              <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed max-w-2xl">
                Módulos de estimulação, acessórios e periféricos para ampliar as capacidades dos sistemas base.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              'Optogenetics TopLight',
              'Estimulação por ecrã (preferência cromática / OMR)',
              'Unidade de controlo de temperatura',
              'Módulo de estimulação sonora',
              'Câmara de isolamento para ZebraBox',
              'Aparelho de shoaling',
              'Módulo de preferência de local',
              'Contacto Social — espécies aquáticas',
              'Mazes aquáticos',
            ].map((addon, idx) => (
              <ScrollReveal key={addon} delay={idx * 0.03}>
                <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                  <span className="text-sm text-white leading-snug">{addon}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Áreas de aplicação */}
      <section className="section bg-ink-50">
        <div className="container-wide">
          <SectionHead
            kicker="Áreas de investigação"
            title="Cinco domínios, uma plataforma integrada"
            description="Cobertura completa das principais linhas de investigação com peixe zebra — do comportamento motor à cardiologia, passando pela função sensorial e condicionamento cognitivo."
          />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {APPLICATIONS.map((app, idx) => (
              <ScrollReveal key={app.id} delay={idx * 0.06}>
                <div className="w-full rounded-2xl p-5 bg-white shadow-soft border border-ink-100">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${app.color} text-xl mb-3`}>
                    {app.icon}
                  </div>
                  <p className="font-display text-sm font-bold text-ink-900 leading-snug">{app.label}</p>
                  <p className="mt-1.5 text-xs text-ink-500 leading-relaxed">{app.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fases de ciclo de vida */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Cobertura total do ciclo de vida"
            title="Do embrião ao adulto — sem lacunas"
            description="Equipamentos para todas as fases de desenvolvimento: embrião e larva em placas multipoço, larva e adulto em tanques de observação, adulto em ambientes abertos e controlados."
          />
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {[
              {
                stage: 'Embrião',
                color: 'from-violet-500 to-violet-400',
                bg: 'bg-violet-50',
                border: 'border-violet-100',
                products: ['ZebraBox', 'ZebraBox PPI Hybrid', 'ZebraLab', 'MicroZebraLab', 'Zebrafish Cardiac Performance'],
                desc: 'Rastreamento locomotor em placas de 24/48/96 poços. Ensaios de toxicologia e farmacologia em larga escala.',
              },
              {
                stage: 'Larva',
                color: 'from-sky-500 to-cyan-400',
                bg: 'bg-sky-50',
                border: 'border-sky-100',
                products: ['ZebraBox', 'ZebraBox PPI Hybrid', 'ZebraTower', 'VisioBox', 'ZebraLab', 'MicroZebraLab', 'Zebrafish Cardiac Performance'],
                desc: 'Análise comportamental, cardíaca e visual em larvas. Plataforma multimodal com hardware e software integrados.',
              },
              {
                stage: 'Adulto',
                color: 'from-teal-500 to-emerald-400',
                bg: 'bg-teal-50',
                border: 'border-teal-100',
                products: ['ZebraTower', 'ZebraCube', 'VisioBox', 'Aggression Box', 'ZebraLab'],
                desc: 'Cognição, agressividade, condicionamento e resposta visual. Ambiente aberto e controlado.',
              },
            ].map((s, idx) => (
              <ScrollReveal key={s.stage} delay={idx * 0.08}>
                <div className={`rounded-2xl ${s.bg} border ${s.border} p-6 h-full`}>
                  <div className={`inline-flex h-9 items-center rounded-full bg-gradient-to-r ${s.color} px-4 text-xs font-bold text-white uppercase tracking-wide mb-4`}>
                    {s.stage}
                  </div>
                  <p className="text-sm text-ink-600 leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.products.map((p) => (
                      <span key={p} className="inline-flex rounded-full bg-white border border-ink-100 px-2.5 py-1 text-[11px] font-semibold text-ink-700">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA
        title="Quer saber mais sobre equipamentos para peixe zebra?"
        description="Contacte-nos para aconselhamento técnico, demonstrações ou orçamentos."
      />
    </PageTransition>
  );
}
