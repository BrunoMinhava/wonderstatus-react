import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import BrandGrid from '../components/BrandGrid';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import { brandsByArea, padroesBrands } from '../data/brands';

const quimicaCategorias = [
  {
    to: '/quimica/tubos-grafite',
    title: 'Tubos de Grafite AAS',
    description: 'Gama Thermo e equivalentes Hitachi, Agilent, PerkinElmer, Shimadzu e GBC com tabelas completas por fabricante.',
    tag: 'AAS',
    items: ['Thermo Scientific', 'Equivalentes Hitachi, Agilent e PerkinElmer', 'Equivalentes Shimadzu e GBC']
  },
  {
    to: '/quimica/lampadas',
    title: 'Lâmpadas de Cátodo Oco e D2',
    description: 'Tabelas de referências Photron por elemento e marca. 37 mm, 50 mm e Deutério num só local.',
    tag: 'AA',
    items: ['Tab 1: 37 mm / 1.5" (HCL multimarca)', 'Tab 2: 50 mm / 2.0" (HCL PerkinElmer)', 'Tab 3: D2 Lamps com filamento e compatibilidades']
  },
  {
    to: '/quimica/icp-icpms',
    title: 'Consumíveis para ICP / ICP-MS',
    description: 'Nebulizadores, tochas, câmaras, cones e consumíveis MS com navegação por fabricante e modelo.',
    tag: 'ICP'
  },
  {
    to: '/quimica/chns-toc',
    title: 'Consumíveis para CHN/O/S, TOC e Análise Elementar',
    description: 'Cápsulas, reagentes, tubos de quartzo, padrões de calibração e acessórios para análise elementar.',
    tag: 'CHNS · TOC'
  },
  {
    to: '/quimica/digestao',
    title: 'Digestor de Metais e Ácidos',
    description: 'Tubos, FilterMate/FlipMate, HotBlock, AutoBlock e FAQ técnico para digestão de metais e preparação de amostras.',
    tag: 'Preparação'
  }
];

const padroesCategories = [
  {
    tag: 'Inorgânicos',
    title: 'Padrões Inorgânicos',
    description: 'Soluções padrão de metais, aniões e catiões para AAS, ICP-OES e ICP-MS. Certificados com rastreabilidade NIST.',
    color: 'from-sky-600 to-brand-500',
    brands: [
      { name: 'CPAChem', logo: '/assets/logos/cpachem.svg', note: 'Metais, aniões, catiões — ISO 17034', href: 'https://www.cpachem.com/catalog/products' },
      { name: 'Techlab', logo: '/assets/logos/techlab.png', note: 'Padrões inorgânicos certificados', href: 'https://www.techlab.fr/' }
    ]
  },
  {
    tag: 'Orgânicos',
    title: 'Padrões Orgânicos',
    description: 'Padrões para pesticidas, PAHs, PCBs, solventes e compostos orgânicos voláteis. Múltiplos fornecedores e concentrações.',
    color: 'from-emerald-600 to-teal-500',
    brands: [
      { name: 'CPAChem', logo: '/assets/logos/cpachem.svg', note: 'Pesticidas, PAHs, PCBs, VOCs', href: 'https://www.cpachem.com/catalog/products' },
      { name: 'HPC Standards', logo: '/assets/logos/hpc-standards.png', note: 'Padrões orgânicos certificados', href: 'https://www.hpc-standards.com/' },
      { name: 'AccuStandard', logo: '/assets/logos/accustandard.svg', note: 'Referências para compostos orgânicos', href: 'https://www.accustandard.com/' }
    ]
  },
  {
    tag: 'Petroquímicos',
    title: 'Padrões Petroquímicos',
    description: 'Referências certificadas para análise de combustíveis, óleos, lubrificantes e produtos petroquímicos.',
    color: 'from-amber-600 to-orange-500',
    brands: [
      { name: 'CPAChem', logo: '/assets/logos/cpachem.svg', note: 'CFPP · Névoa · Destilação · Viscosidade', href: 'https://www.cpachem.com/catalog/products?category=6' },
      { name: 'Cannon Instrument', logo: '/assets/logos/cannon-instruments.svg', note: 'Viscosidade · Ponto de inflamação', href: 'https://cannoninstrument.com/viscosity-flash-point-standards.html' },
      { name: 'AccuStandard', logo: '/assets/logos/accustandard.svg', note: 'Padrões orgânicos e petroquímicos', href: 'https://www.accustandard.com/' }
    ]
  }
];

function PadroesModal({ category, onClose }) {
  return (
    <motion.div
      key="overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" />
      <motion.div
        className="relative w-full max-w-sm rounded-3xl bg-white shadow-glow overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`bg-gradient-to-br ${category.color} p-6`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-flex rounded-full bg-white/20 text-white px-3 py-1 text-xs font-semibold">
                {category.tag}
              </span>
              <h3 className="mt-2 font-display text-xl font-bold text-white">{category.title}</h3>
              <p className="mt-1 text-sm text-white/80 leading-snug">{category.description}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 h-8 w-8 rounded-full bg-white/15 hover:bg-white/30 text-white grid place-items-center transition-colors mt-0.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-ink-400 mb-3">Escolha o fornecedor</p>
          <div className="flex flex-col gap-2">
            {category.brands.map((brand) => (
              <a
                key={brand.name}
                href={brand.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/b flex items-center gap-3 rounded-xl border border-ink-100 bg-ink-50/50 hover:bg-brand-50 hover:border-brand-200 px-3 py-3 transition-colors"
              >
                <div className="h-10 w-16 flex-shrink-0 rounded-lg bg-white border border-ink-100 grid place-items-center p-1.5">
                  <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-ink-900 leading-tight">{brand.name}</p>
                  <p className="text-[11px] text-ink-500 leading-tight mt-0.5">{brand.note}</p>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-ink-400 group-hover/b:text-brand-600 transition-colors flex-shrink-0">
                  <path d="M7 17 17 7m0 0H9m8 0v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Quimica() {
  const [activeCategory, setActiveCategory] = useState(null);
  return (
    <PageTransition>
      <PageHeader
        kicker="Química Analítica e Consumíveis"
        title="AAS, IC, ICP, CHNS, Digestão de Metais"
        subtitle="Consumíveis e equipamentos para AAS, IC, ICP, CHNS e digestão de metais, com compatibilidade multimarca e seleção por aplicação."
        image="/assets/slide4.JPG"
        actions={[
          { label: 'Explorar soluções', href: '#categorias' },
          { label: 'Solicitar informação', href: '/sobre#formulario-contacto', ghost: true }
        ]}
      />

      {/* ── Padrões Analíticos ── */}
      <section className="section" id="padroes">
        <div className="container-wide">
          <SectionHead
            kicker="Padrões Analíticos"
            title="Padrões inorgânicos, orgânicos e petroquímicos"
            description="Catálogo de padrões analíticos certificados por tipo de aplicação, com acesso directo ao site de cada fornecedor."
          />

          <div className="mt-8 md:mt-10 grid sm:grid-cols-3 gap-5">
            {padroesCategories.map((cat) => (
              <ScrollReveal key={cat.tag}>
                <button
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className="group w-full text-left flex flex-col h-full rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover"
                >
                  <div className={`bg-gradient-to-br ${cat.color} p-6`}>
                    <span className="inline-flex rounded-full bg-white/20 text-white px-3 py-1 text-xs font-semibold">
                      {cat.tag}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-bold text-white">{cat.title}</h3>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-ink-600 leading-relaxed text-sm flex-1">{cat.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {cat.brands.map((b) => (
                        <span key={b.name} className="rounded-full bg-brand-50 text-brand-700 px-3 py-1 text-xs font-semibold">
                          {b.name}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                      Ver fornecedores
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                        <path d="M7 17 17 7m0 0H9m8 0v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>

          <AnimatePresence>
            {activeCategory && (
              <PadroesModal category={activeCategory} onClose={() => setActiveCategory(null)} />
            )}
          </AnimatePresence>

          <ScrollReveal className="mt-14 md:mt-16">
            <BrandGrid
              brands={padroesBrands.exclusive}
              kicker="Padrões · Marcas"
              title="Marcas Exclusivas"
            />
          </ScrollReveal>

          <ScrollReveal className="mt-10 md:mt-12">
            <BrandGrid
              brands={padroesBrands.others}
              kicker="Padrões · Marcas"
              title="Outras Marcas"
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="section" id="categorias">
        <div className="container-wide">
          <SectionHead
            kicker="Categorias Principais"
            title="Consumíveis para equipamentos AAS, ICP, CHNS e digestão"
            description="Clique em cada categoria para abrir o catálogo detalhado com produtos, fotos, tabelas e referências."
          />

          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quimicaCategorias.map((cat, idx) => (
              <ScrollReveal key={cat.to} delay={idx * 0.08} className="h-full">
                <Link
                  to={cat.to}
                  className="group block h-full rounded-3xl bg-white border border-ink-100 shadow-soft p-8 card-hover"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 grid place-items-center text-white shadow-soft">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(30 12 12)" />
                        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(-30 12 12)" />
                      </svg>
                    </div>
                    <span className="inline-flex rounded-full bg-brand-50 text-brand-700 px-3 py-1 text-xs font-semibold">
                      {cat.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink-900 group-hover:text-brand-700 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="mt-3 text-ink-600 leading-relaxed">{cat.description}</p>
                  {cat.items && (
                    <ul className="mt-5 space-y-2 text-sm text-ink-700">
                      {cat.items.map((i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-400 flex-shrink-0" />
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                    Ver categoria
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="compatibilidade-aas">
        <div className="container-wide">
          <SectionHead
            kicker="Compatibilidade AAS"
            title="Tubos de grafite e equivalentes por fabricante"
            description="Linhas dedicadas Thermo Scientific e equivalentes para Hitachi, Agilent, PerkinElmer, Shimadzu e GBC."
          />
          <div className="mt-8 md:mt-10">
            <BrandGrid brands={brandsByArea.aas} />
          </div>
        </div>
      </section>

      <section className="section" id="marcas">
        <div className="container-wide">
          <ScrollReveal>
            <BrandGrid
              brands={brandsByArea.quimica.exclusive}
              kicker="Marcas"
              title="Marcas Exclusivas"
            />
          </ScrollReveal>

          <ScrollReveal className="mt-10 md:mt-12">
            <BrandGrid
              brands={brandsByArea.quimica.others}
              kicker="Marcas"
              title="Outras Marcas"
            />
          </ScrollReveal>
        </div>
      </section>

      <ContactCTA />
    </PageTransition>
  );
}
