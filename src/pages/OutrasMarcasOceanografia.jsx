import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';

const marcas = [
  {
    id: 'general-oceanics',
    name: 'General Oceanics',
    logo: '/assets/logos/general-oceanics.png',
    description: 'Garrafas Niskin, Go-Flo, sistemas rosette, caudalímetros e instrumentação de referência para campanhas oceanográficas de investigação.',
    url: 'https://www.generaloceanics.com/',
  },
  {
    id: 'aquatic-biotechnology',
    name: 'Aquatic-Biotechnology',
    logo: '/assets/logos/aquatic-biotechnology.png',
    description: 'Redes de plankton WP2, amostradores de água, dragas Van Veen e material de exame de plankton para investigação aquática e ambiental.',
    url: 'https://aquaticbiotechnology.com/',
  },
  {
    id: 'kc-denmark',
    name: 'KC-Denmark',
    logo: '/assets/logos/kc-denmark.png',
    description: 'Sistemas rosette Niskin, amostradores, corers e grabs de sedimento para investigação marinha e oceanográfica.',
    url: 'https://www.kc-denmark.dk/',
  },
  {
    id: 'osil',
    name: 'Osil',
    logo: '/assets/logos/osil.png',
    description: 'Garrafas Niskin, corers e grabs de sedimento, bóias meteo-oceanográficas, vibrocorers e salinómetros Autosal para observação oceânica.',
    url: 'https://osil.com/',
  },
];

export default function OutrasMarcasOceanografia() {
  return (
    <PageTransition>
      <PageMeta
        title="Outras Marcas de Oceanografia Representadas"
        description="General Oceanics, Aquatic-Biotechnology, KC-Denmark e Osil — marcas representadas na área de oceanografia com ligação direta ao site oficial."
        path="/oceanografia/outras-marcas"
      />
      <PageHeader
        kicker="Oceanografia · Outras marcas"
        title="Outras marcas representadas"
        subtitle="Marcas complementares que representamos na área de oceanografia e amostragem. Clique em qualquer marca para visitar o site oficial."
        image="/assets/slide2.JPG"
      >
        <div className="mt-4">
          <Link
            to="/oceanografia"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Voltar a Oceanografia
          </Link>
        </div>
      </PageHeader>

      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Marcas complementares"
            title="Acesso direto ao site oficial de cada marca"
            description="Estas marcas completam a nossa oferta de oceanografia — para cotações e informação técnica contacte-nos diretamente."
          />
          <div className="mt-8 md:mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {marcas.map((marca, idx) => (
              <ScrollReveal key={marca.id} delay={idx * 0.07}>
                <a
                  href={marca.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl bg-white border border-ink-100 shadow-soft p-7 card-hover h-full"
                >
                  <div className="h-16 w-full grid place-items-center mb-5">
                    <img
                      src={marca.logo}
                      alt={marca.name}
                      loading="lazy"
                      decoding="async"
                      className="max-h-14 max-w-[80%] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="font-display text-base font-bold text-ink-900 group-hover:text-brand-700 transition-colors">
                    {marca.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink-500 leading-relaxed flex-1">{marca.description}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 group-hover:gap-2.5 transition-all">
                    Visitar site oficial
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 0 2-2h6M15 3h6v6m-11 5L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA
        title="Pretende informação sobre estas marcas?"
        description="Contacte-nos para cotações, compatibilidade e prazos de entrega."
      />
    </PageTransition>
  );
}
