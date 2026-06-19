import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import oceanCatalog from '../data/ocean-catalog-data';

/* ─── Brand metadata ─────────────────────────────────────────────────── */
const marcasConfig = {
  wildco: {
    kicker: 'Oceanografia · Amostragem de Água',
    title: 'Garrafas Van Dorn e Amostragem — WildCo',
    subtitle: 'Garrafas Van Dorn horizontais e verticais, kits completos e componentes para recolha de água em oceanografia e limnologia. Séries Beta Plus e Alpha.',
    badgeTags: ['Van Dorn Beta Plus', 'Van Dorn Alpha', 'Horizontal e Vertical', 'PVC e Acrílico'],
    accentColor: 'teal',
    brandName: 'WildCo',
    brandKicker: 'Marca representada',
    brandDescription: 'WildCo é a referência internacional para garrafas Van Dorn — horizontal e vertical, em PVC ou acrílico, desde 2,2 L até 8,2 L, com kits completos e peças de manutenção.',
    siteUrl: 'https://store.sciencefirst.com/wildcoenvironmentalsampling',
  },
  northlift: {
    kicker: 'Oceanografia · Guinchos de Campo',
    title: 'Guinchos para Oceanografia — NorthLift',
    subtitle: 'Guinchos elétricos, hidráulicos e manuais para operação de redes, garrafas e linhas em embarcações de pequeno e médio porte.',
    badgeTags: ['Guinchos Elétricos', 'Guinchos Hidráulicos', 'Guinchos Manuais', 'Para embarcações'],
    accentColor: 'orange',
    brandName: 'NorthLift',
    brandKicker: 'Marca representada',
    brandDescription: 'NorthLift oferece guinchos robustos para uso em campo oceanográfico — desde levantamentos costeiros até campanhas em oceano aberto.',
    siteUrl: 'https://www.northlift.com/electric-haulers',
  },
  'general-oceanics': {
    kicker: 'Oceanografia · Instrumentação Clássica',
    title: 'Instrumentação Oceanográfica — General Oceanics',
    subtitle: 'Garrafas Niskin, Go-Flo, sistemas rosette, caudalímetros e instrumentação de referência para campanhas oceanográficas de investigação.',
    badgeTags: ['Garrafas Niskin', 'Go-Flo', 'Rosette', 'Caudalímetros'],
    accentColor: 'brand',
    brandName: 'General Oceanics',
    brandKicker: 'Marca representada',
    brandDescription: 'General Oceanics é uma das marcas mais reconhecidas em instrumentação oceanográfica clássica, com décadas de presença em campanhas de investigação em todo o mundo.',
    siteUrl: 'https://www.generaloceanics.com/',
  },
  'aquatic-biotechnology': {
    kicker: 'Oceanografia · Plankton e Amostragem',
    title: 'Redes, Amostradores e Sedimento — Aquatic-Biotechnology',
    subtitle: 'Redes de plankton WP2, amostradores de água, dragas Van Veen e material de exame de plankton para investigação aquática e ambiental.',
    badgeTags: ['Redes WP2', 'Niskin', 'Van Veen', 'Material Utermöhl'],
    accentColor: 'brand',
    brandName: 'Aquatic-Biotechnology',
    brandKicker: 'Marca representada',
    brandDescription: 'Aquatic-Biotechnology desenvolve equipamento especializado para monitorização e investigação de ambientes aquáticos — redes, amostradores e material de análise de plankton.',
    siteUrl: 'https://aquaticbiotechnology.com/',
  },
  'kc-denmark': {
    kicker: 'Oceanografia · Amostragem e Sedimento',
    title: 'Rosette, Amostradores e Corers — KC-Denmark',
    subtitle: 'Sistemas rosette Niskin, amostradores de água, corers e grabs de sedimento para investigação marinha e oceanográfica.',
    badgeTags: ['Rosette Niskin', 'Niskin Mini', 'Box Corer', 'Grabs'],
    accentColor: 'brand',
    brandName: 'KC-Denmark',
    brandKicker: 'Marca representada',
    brandDescription: 'KC-Denmark é uma empresa dinamarquesa com longa tradição no desenvolvimento de equipamento para investigação marinha — rosettes, amostradores, corers e grabs reconhecidos internacionalmente.',
    siteUrl: 'https://www.kc-denmark.dk/',
  },
  osil: {
    kicker: 'Oceanografia · Instrumentação e Observação',
    title: 'Niskin, Corers, Bóias e Salinómetros — Osil',
    subtitle: 'Garrafas Niskin, corers e grabs de sedimento, bóias meteo-oceanográficas, vibrocorers e salinómetros Autosal para observação oceânica.',
    badgeTags: ['Niskin', 'Corers', 'Bóias', 'Autosal'],
    accentColor: 'brand',
    brandName: 'Osil',
    brandKicker: 'Marca representada',
    brandDescription: 'Osil especializa-se em soluções integradas para observação oceânica e instrumentação de campanhas — desde simples garrafas Niskin a bóias oceanográficas de larga escala.',
    siteUrl: 'https://osil.com/',
  },
};

const accentMap = {
  teal:   { banner: 'from-teal-950 via-cyan-900 to-brand-900',     badge: 'text-teal-400',   btn: 'bg-teal-500 hover:bg-teal-400',   kicker: 'text-teal-600',   dot: 'bg-teal-400' },
  orange: { banner: 'from-orange-950 via-orange-900 to-brand-900', badge: 'text-orange-400', btn: 'bg-orange-500 hover:bg-orange-400', kicker: 'text-orange-600', dot: 'bg-orange-400' },
  brand:  { banner: 'from-brand-950 via-brand-900 to-ink-900',     badge: 'text-brand-400',  btn: 'bg-brand-500 hover:bg-brand-400',  kicker: 'text-brand-600',  dot: 'bg-brand-400' },
};

/* ─── Build product families from catalog ────────────────────────────── */
function buildFamilies(brandId) {
  const section = oceanCatalog.sections?.find((s) => s.brandId === brandId);
  if (!section) return [];

  const raw = section.families || [];
  if (!raw.length) return [];

  // WildCo: flat product list — group into 5 buckets
  if (brandId === 'wildco') {
    const betaPlusH = raw.filter((f) => f.name.startsWith('Beta Plus') && f.name.toLowerCase().includes('horizontal'));
    const betaPlusV = raw.filter((f) => f.name.startsWith('Beta Plus') && f.name.toLowerCase().includes('vertical'));
    const alphaH    = raw.filter((f) => f.name.startsWith('Alpha')     && f.name.toLowerCase().includes('horizontal'));
    const alphaV    = raw.filter((f) => f.name.startsWith('Alpha')     && f.name.toLowerCase().includes('vertical'));
    const comps     = raw.filter((f) => !f.name.startsWith('Beta') && !f.name.startsWith('Alpha'));
    return [
      { id: 'wc-beta-hz',  kicker: 'WildCo · Beta Plus Horizontal', title: 'Van Dorn Beta Plus — Horizontal', description: 'Garrafas e kits horizontais série Beta Plus em PVC e acrílico, de 2,2 L a 8,2 L. Sem partes metálicas em contacto com a amostra.', sourceUrl: section.sourceUrl, sourceLabel: section.sourceLabel, products: betaPlusH },
      { id: 'wc-beta-vt',  kicker: 'WildCo · Beta Plus Vertical',   title: 'Van Dorn Beta Plus — Vertical',   description: 'Garrafas e kits verticais série Beta Plus em PVC e acrílico para amostragem em coluna de água.', sourceUrl: section.sourceUrl, sourceLabel: section.sourceLabel, products: betaPlusV },
      { id: 'wc-alpha-hz', kicker: 'WildCo · Alpha Horizontal',      title: 'Van Dorn Alpha — Horizontal',     description: 'Série Alpha horizontal em acrílico para observação imediata do conteúdo da amostra — disponível de 2,2 L a 8,2 L.', sourceUrl: section.sourceUrl, sourceLabel: section.sourceLabel, products: alphaH },
      { id: 'wc-alpha-vt', kicker: 'WildCo · Alpha Vertical',        title: 'Van Dorn Alpha — Vertical',       description: 'Série Alpha vertical em acrílico — ideal para medições verticais com visibilidade total da amostra.', sourceUrl: section.sourceUrl, sourceLabel: section.sourceLabel, products: alphaV },
      { id: 'wc-comp',     kicker: 'WildCo · Acessórios',            title: 'Cabos, Centros e Componentes',    description: 'Conjuntos de cabo, centros de garrafa, juntas de estanquicidade, lastros e peças de substituição para toda a gama Van Dorn.', sourceUrl: section.sourceUrl, sourceLabel: section.sourceLabel, products: comps },
    ].filter((g) => g.products.length > 0);
  }

  // All other brands: families already have title + products[]
  // Normalise so each product has an image (fall back to family image)
  return raw.map((fam) => ({
    id:          fam.id,
    kicker:      `${marcasConfig[brandId]?.brandName} · ${fam.wonderLabel || fam.navLabel || ''}`,
    title:       fam.wonderLabel || fam.title || fam.navLabel,
    description: fam.summary || '',
    sourceUrl:   fam.sourceUrl,
    sourceLabel: `Ver ${fam.wonderLabel || fam.navLabel || 'produtos'} no site oficial`,
    products:    (fam.products || []).map((p) => ({
      name:    p.name,
      image:   p.image || fam.image,  // fall back to family image
      url:     p.url || fam.sourceUrl,
      summary: p.summary || '',
    })),
  }));
}

/* ─── Product card ───────────────────────────────────────────────────── */
function ProductCard({ product, brandName, delay = 0, accentKicker }) {
  return (
    <ScrollReveal delay={delay}>
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col rounded-2xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover h-full"
      >
        <div className="bg-gradient-to-b from-brand-50/40 to-white flex items-center justify-center p-4 h-44">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
              onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
            />
          ) : null}
          <div
            style={{ display: product.image ? 'none' : 'flex' }}
            className="w-full h-full items-center justify-center"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-ink-200">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M3 9l4-4 4 4 4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-1 border-t border-ink-100">
          <p className={`text-xs font-semibold uppercase tracking-widest ${accentKicker}`}>{brandName}</p>
          <h3 className="mt-1.5 font-display text-sm font-bold text-ink-900 group-hover:text-brand-700 transition-colors leading-snug">
            {product.name}
          </h3>
          {product.summary && (
            <p className="mt-1.5 text-xs text-ink-500 leading-relaxed flex-1">{product.summary}</p>
          )}
          <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:gap-2 transition-all">
            Ver produto
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </a>
    </ScrollReveal>
  );
}

/* ─── Main component ─────────────────────────────────────────────────── */
export default function OceanografiaMarca({ brandId }) {
  const config = marcasConfig[brandId];
  if (!config) return null;
  const accent  = accentMap[config.accentColor] || accentMap.brand;
  const families = buildFamilies(brandId);

  return (
    <PageTransition>
      <PageHeader
        kicker={config.kicker}
        title={config.title}
        subtitle={config.subtitle}
        image="/assets/slide2.JPG"
        actions={[
          { label: 'Ver produtos', href: '#produtos' },
          { label: 'Site oficial', href: config.siteUrl, ghost: true },
        ]}
      >
        <div className="flex flex-wrap gap-2 mt-6">
          {config.badgeTags.map((b) => (
            <span key={b} className="inline-flex rounded-full border border-white/25 bg-white/10 backdrop-blur px-3 py-1 text-sm font-medium">
              {b}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <Link to="/oceanografia" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Voltar a Oceanografia
          </Link>
        </div>
      </PageHeader>

      {/* Brand banner */}
      <div className={`bg-gradient-to-r ${accent.banner}`}>
        <div className="container-wide py-10 md:py-14 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-semibold uppercase tracking-widest ${accent.badge} mb-2`}>{config.brandKicker}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">{config.brandName}</h2>
            <p className="mt-2 text-lg text-white/70 max-w-xl">{config.brandDescription}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={config.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full ${accent.btn} text-white font-semibold px-5 py-2.5 text-sm transition-all`}
            >
              Site oficial
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#produtos" className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-5 py-2.5 text-sm transition-all">
              Ver produtos
            </a>
          </div>
        </div>
      </div>

      {/* Product families */}
      <div id="produtos">
        {families.map((family) => (
          <section key={family.id} className="section" id={family.id}>
            <div className="container-wide">
              <SectionHead
                kicker={family.kicker}
                title={family.title}
                description={family.description}
              />
              <div className="mt-8 md:mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {family.products.map((product, idx) => (
                  <ProductCard
                    key={product.url + product.name}
                    product={product}
                    brandName={config.brandName}
                    delay={idx * 0.035}
                    accentKicker={accent.kicker}
                  />
                ))}
              </div>
              {family.sourceUrl && (
                <ScrollReveal className="mt-8 text-center">
                  <a href={family.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    {family.sourceLabel}
                  </a>
                </ScrollReveal>
              )}
            </div>
          </section>
        ))}
      </div>

      <ContactCTA
        title={`Informação sobre ${config.brandName}?`}
        description={`Contacte-nos para saber mais sobre os produtos ${config.brandName} e como se integram na sua campanha oceanográfica.`}
      />
    </PageTransition>
  );
}
