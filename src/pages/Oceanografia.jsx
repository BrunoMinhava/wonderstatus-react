import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import BrandGrid from '../components/BrandGrid';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import { brandsByArea } from '../data/brands';

const subAreas = [
  {
    to: '/oceanografia/nke',
    kicker: 'Sondas e Data Loggers',
    title: 'NKE Instruments',
    description: 'WiMo (sonda multiparamétrica) e WiSens (data loggers autónomos). Temperatura, CTD, oxigénio, clorofila-A e turbidez até 6000 m.',
    tags: ['WiMo', 'WiSens', 'WiHub', 'Até 6000 m'],
    accent: 'from-emerald-700 to-teal-600',
  },
  {
    to: '/oceanografia/hydrobios',
    kicker: 'Amostragem Oceanográfica',
    title: 'Hydrobios · WildCo',
    description: 'Garrafas de Niskin, redes de plankton, sediment traps, dragas de fundo, câmaras de exame e garrafas Van Dorn.',
    tags: ['Niskin', 'Plankton Nets', 'Sediment Traps', 'Van Dorn'],
    accent: 'from-teal-700 to-cyan-600',
  },
  {
    to: '/oceanografia/seaber',
    kicker: 'Veículos Autónomos Subaquáticos',
    title: 'Seaber',
    description: 'Micro-AUVs compactos e modulares para missões oceanográficas autónomas — lançamento individual sem embarcação de apoio.',
    tags: ['Micro-AUV', 'YUCO', 'CTD', 'Sonar Lateral'],
    accent: 'from-indigo-700 to-blue-600',
  },
  {
    to: '/oceanografia/northlift',
    kicker: 'Guinchos de Campo',
    title: 'NorthLift',
    description: 'Guinchos manuais e elétricos para operação de redes, linhas e equipamento em embarcações de pequeno e médio porte.',
    tags: ['Elétrico', 'Manual', 'Embarcações'],
    accent: 'from-orange-700 to-amber-600',
  },
  {
    to: '/oceanografia/wildco',
    kicker: 'Garrafas Van Dorn',
    title: 'WildCo',
    description: 'Garrafas Van Dorn horizontais e verticais, kits de amostragem e componentes para recolha de água em oceanografia e limnologia.',
    tags: ['Van Dorn', 'Horizontal', 'Vertical', 'Kits'],
    accent: 'from-teal-700 to-green-600',
  },
  {
    to: '/oceanografia/outras-marcas',
    kicker: 'Marcas complementares',
    title: 'Outras marcas representadas',
    description: 'General Oceanics, Aquatic-Biotechnology, KC-Denmark e Osil — marcas com soluções complementares de amostragem e instrumentação oceânica.',
    tags: ['General Oceanics', 'Aquatic-Biotechnology', 'KC-Denmark', 'Osil'],
    accent: 'from-ink-600 to-ink-400',
    isOthers: true,
  },
];

export default function Oceanografia() {
  return (
    <PageTransition>
      <PageMeta
        title="Equipamento de Oceanografia e Monitorização Aquática"
        description="Equipamentos para oceanografia, limnologia e monitorização aquática: sondas CTD, garrafas Niskin, redes de plâncton, AUVs e perfiladores. NKE, Hydrobios, Seaber, Wildco e General Oceanics."
        path="/oceanografia"
      />
      <PageHeader
        kicker="Oceanografia e Monitorização Subaquática"
        title="Equipamento oceanográfico para campanhas exigentes"
        subtitle="Da amostragem de água a AUVs autónomos — representamos as marcas líderes em instrumentação oceanográfica. Selecione a área para explorar produtos e especificações."
        image="/assets/slide2.JPG"
        minHeight="min-h-screen"
        actions={[
          { label: 'Explorar marcas', href: '#marcas' },
          { label: 'Pedir informação', ghost: true, onClick: "contact" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3 mt-6">
          {[
            { name: 'NKE Instruments', logo: '/assets/logos/nke-instruments.png', to: '/oceanografia/nke' },
            { name: 'Hydrobios', logo: '/assets/logos/hydrobios.png', to: '/oceanografia/hydrobios' },
            { name: 'Seaber', logo: '/assets/logos/seaber.png', to: '/oceanografia/seaber' },
            { name: 'WildCo', logo: '/assets/logos/wildco.png', to: '/oceanografia/wildco' },
            { name: 'NorthLift', logo: '/assets/logos/northlift.png', to: '/oceanografia/northlift' },
            { name: 'General Oceanics', logo: '/assets/logos/general-oceanics.png', to: '/oceanografia/general-oceanics' },
          ].map((brand) => (
            <Link
              key={brand.name}
              to={brand.to}
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur px-3 py-2 transition-colors hover:bg-white/20"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-5 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100"
              />
            </Link>
          ))}
        </div>
      </PageHeader>

      {/* Grid de sub-áreas */}
      <section className="section" id="marcas">
        <div className="container-wide">
          <SectionHead
            kicker="Áreas e Marcas"
            title="Selecione a área ou marca que pretende explorar"
            description="Cada marca tem a sua página dedicada com produtos, especificações técnicas e informação de campanha."
          />

          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {subAreas.map((area, idx) => (
              <ScrollReveal key={area.to} delay={idx * 0.05}>
                <Link
                  to={area.to}
                  className={`group flex flex-col rounded-2xl overflow-hidden card-hover h-full ${
                    area.isOthers
                      ? 'bg-ink-50 border-2 border-dashed border-ink-200'
                      : 'bg-white border border-ink-100 shadow-soft'
                  }`}
                >
                  <div className={`bg-gradient-to-br ${area.accent} p-6`}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/70">{area.kicker}</p>
                    <h3 className="mt-2 font-display text-xl font-bold text-white">{area.title}</h3>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-ink-600 leading-relaxed flex-1">{area.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {area.tags.map((tag) => (
                        <span key={tag} className="inline-flex rounded-full bg-ink-100 text-ink-600 text-xs font-medium px-2.5 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-ink-500 group-hover:gap-2 group-hover:text-brand-600 transition-all">
                      {area.isOthers ? 'Ver marcas' : 'Ver produtos'}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Marcas */}
      <section className="section">
        <div className="container-wide">
          <ScrollReveal>
            <BrandGrid
              brands={brandsByArea.oceanografia.exclusive}
              kicker="Marcas"
              title="Parceiros centrais da área"
            />
          </ScrollReveal>
          <ScrollReveal className="mt-10 md:mt-12">
            <BrandGrid
              brands={brandsByArea.oceanografia.others}
              kicker="Marcas"
              title="Parceiros adicionais e complementares"
            />
          </ScrollReveal>
        </div>
      </section>

      <ContactCTA
        title="Preparar uma campanha oceanográfica?"
        description="Apoiamos na seleção de equipamento NKE, Hydrobios, Seaber e todos os parceiros — do planeamento à entrega."
      />
    </PageTransition>
  );
}
