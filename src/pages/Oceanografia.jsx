import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    to: '/oceanografia/general-oceanics',
    kicker: 'Instrumentação Clássica',
    title: 'General Oceanics',
    description: 'Garrafas Niskin, Go-Flo, caudalímetros e instrumentação clássica para campanhas oceanográficas de investigação.',
    tags: ['Niskin', 'Go-Flo', 'Caudalímetros'],
    accent: 'from-brand-700 to-brand-500',
  },
  {
    to: '/oceanografia/aquatic-biotechnology',
    kicker: 'Tecnologias Aquáticas',
    title: 'Aquatic-Biotechnology',
    description: 'Soluções complementares para aplicações aquáticas e monitorização ambiental.',
    tags: ['Monitorização', 'Ambiente', 'Aquático'],
    accent: 'from-brand-700 to-cyan-600',
  },
  {
    to: '/oceanografia/kc-denmark',
    kicker: 'Amostragem e Investigação',
    title: 'KC-Denmark',
    description: 'Equipamento dinamarquês para amostragem e investigação marinha — armadilhas de sedimento e instrumentação especializada.',
    tags: ['Sediment Traps', 'Investigação', 'Marinha'],
    accent: 'from-red-700 to-rose-600',
  },
  {
    to: '/oceanografia/osil',
    kicker: 'Observação Oceânica',
    title: 'Osil',
    description: 'Integração de soluções para observação e instrumentação oceânica de larga escala.',
    tags: ['Observação', 'Sistemas integrados'],
    accent: 'from-brand-800 to-brand-600',
  },
];

export default function Oceanografia() {
  return (
    <PageTransition>
      <PageHeader
        kicker="Oceanografia e Monitorização Subaquática"
        title="Equipamento oceanográfico para campanhas exigentes"
        subtitle="Da amostragem de água a AUVs autónomos — representamos as marcas líderes em instrumentação oceanográfica. Selecione a área para explorar produtos e especificações."
        image="/assets/slide2.JPG"
        actions={[
          { label: 'Explorar marcas', href: '#marcas' },
          { label: 'Pedir informação', ghost: true, onClick: "contact" },
        ]}
      >
        <div className="flex flex-wrap gap-2 mt-6">
          {['NKE Instruments', 'Hydrobios', 'Seaber', 'WildCo', 'NorthLift', 'General Oceanics'].map((b) => (
            <span
              key={b}
              className="inline-flex rounded-full border border-white/25 bg-white/10 backdrop-blur px-3 py-1 text-sm font-medium"
            >
              {b}
            </span>
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
                  className="group flex flex-col rounded-2xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover h-full"
                >
                  <div className={`bg-gradient-to-br ${area.accent} p-6`}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/70">{area.kicker}</p>
                    <h3 className="mt-2 font-display text-xl font-bold text-white">{area.title}</h3>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-ink-600 leading-relaxed flex-1">{area.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {area.tags.map((tag) => (
                        <span key={tag} className="inline-flex rounded-full bg-ink-50 text-ink-600 text-xs font-medium px-2.5 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:gap-2 transition-all">
                      Ver produtos
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
