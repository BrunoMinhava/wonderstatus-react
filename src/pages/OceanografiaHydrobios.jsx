import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import CatalogBrowser from '../components/CatalogBrowser';
import PageTransition from '../components/PageTransition';
import { hydroBiosFamilies } from '../data/ocean';
import oceanCatalog from '../data/ocean-catalog-data';

const hydroCatalog = {
  brands: oceanCatalog.brands.filter((b) => b.id === 'hydrobios' || b.id === 'wildco'),
  sections: oceanCatalog.sections
    ? oceanCatalog.sections.filter((s) => s.brandId === 'hydrobios' || s.brandId === 'wildco')
    : [],
};

const familyIcons = {
  'garrafas': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 2h6M8 7V4h8v3M7 7c-1 0-2 .9-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9c0-1.1-1-2-2-2H7z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

export default function OceanografiaHydrobios() {
  return (
    <PageTransition>
      <PageHeader
        kicker="Oceanografia · Amostragem"
        title="Amostragem Oceanográfica — Hydrobios"
        subtitle="Garrafas de Niskin, redes de plankton, sediment traps, dragas de fundo, câmaras de exame e muito mais. Equipamento de referência para campanhas oceanográficas e limnológicas."
        image="/assets/slide2.JPG"
        actions={[
          { label: 'Ver produtos', href: '#familias' },
          { label: 'Catálogo completo', href: '#catalogo', ghost: true },
        ]}
      >
        <div className="flex flex-wrap gap-2 mt-6">
          {['Garrafas de Niskin', 'Redes Plankton', 'Sediment Traps', 'Dragas de Fundo', 'WildCo Van Dorn'].map((b) => (
            <span
              key={b}
              className="inline-flex rounded-full border border-white/25 bg-white/10 backdrop-blur px-3 py-1 text-sm font-medium"
            >
              {b}
            </span>
          ))}
        </div>
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

      {/* Divisor de marca */}
      <div className="bg-gradient-to-r from-teal-950 via-cyan-900 to-brand-900">
        <div className="container-wide py-10 md:py-14 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-400 mb-2">Marca representada</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Hydrobios</h2>
            <p className="mt-2 text-lg text-white/70 max-w-xl">
              Referência mundial em equipamento oceanográfico de amostragem — desde 1931. Garrafas, redes, armadilhas, dragas e instrumentos de medição para oceanografia e limnologia.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="https://www.hydrobios.de/en/products"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-teal-500 hover:bg-teal-400 text-white font-semibold px-5 py-2.5 text-sm transition-all"
            >
              Ver site oficial
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#familias" className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-5 py-2.5 text-sm transition-all">
              Ver famílias
            </a>
          </div>
        </div>
      </div>

      {/* Resumo de famílias disponíveis */}
      <section className="section" id="familias">
        <div className="container-wide">
          <SectionHead
            kicker="Gama Hydrobios"
            title="Famílias de produtos para amostragem oceanográfica"
            description="Do clássico às soluções mais avançadas — cada família cobre uma necessidade específica de campanha, da coluna de água ao fundo marinho."
          />
          <div className="mt-8 md:mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hydroBiosFamilies.map((family, idx) => (
              <ScrollReveal key={family.id} delay={idx * 0.05}>
                <a
                  href={`#${family.id}`}
                  className="group flex flex-col rounded-2xl bg-white border border-ink-100 shadow-soft p-6 card-hover h-full transition-all"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">{family.kicker}</p>
                  <h3 className="mt-2 font-display text-base font-bold text-ink-900 group-hover:text-brand-700 transition-colors leading-snug">
                    {family.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed flex-1">{family.description}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:gap-2 transition-all">
                    Ver produtos
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hydrobios — todas as categorias de produtos */}
      {hydroBiosFamilies.map((family) => (
        <section key={family.id} className="section" id={family.id}>
          <div className="container-wide">
            <SectionHead
              kicker={family.kicker}
              title={family.title}
              description={family.description}
            />
            <div className="mt-8 md:mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {family.products.map((p, idx) => (
                <ScrollReveal key={p.url} delay={idx * 0.04}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col rounded-2xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover h-full"
                  >
                    <div className="bg-gradient-to-b from-brand-50/40 to-white flex items-center justify-center p-4 h-44">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1 border-t border-ink-100">
                      <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">Hydrobios</p>
                      <h3 className="mt-1.5 font-display text-sm font-bold text-ink-900 group-hover:text-brand-700 transition-colors leading-snug">
                        {p.name}
                      </h3>
                      <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:gap-2 transition-all">
                        Ver produto
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal className="mt-8 text-center">
              <a href={family.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                {family.sourceLabel}
              </a>
            </ScrollReveal>
          </div>
        </section>
      ))}

      {/* Catálogo Hydrobios + WildCo */}
      <section className="section" id="catalogo">
        <div className="container-wide">
          <SectionHead
            kicker="Catálogo por Marca"
            title="Hydrobios e WildCo — catálogo completo"
            description="Produtos organizados por marca e família — pesquise por nome, tipo ou referência."
          />
          <ScrollReveal className="mt-8 md:mt-10">
            <CatalogBrowser
              brands={hydroCatalog.brands}
              sections={hydroCatalog.sections}
              searchPlaceholder="Pesquisar garrafas, redes, Van Dorn..."
            />
          </ScrollReveal>
        </div>
      </section>

      <ContactCTA
        title="Preparar uma campanha de amostragem?"
        description="Apoiamos na seleção de garrafas, redes, sediment traps e todo o equipamento Hydrobios e WildCo para a sua campanha."
      />
    </PageTransition>
  );
}
