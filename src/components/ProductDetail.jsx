import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductGallery from './ProductGallery';
import ScrollReveal from './ScrollReveal';
import SectionHead from './SectionHead';
import ContactCTA from './ContactCTA';
import PageTransition from './PageTransition';
import { contact } from '../data/contact';

/**
 * Template premium de ficha de produto. Recebe:
 * {
 *   name, kicker, subtitle, lead,
 *   images: [url | {src, label}],
 *   badges: [str],
 *   specs: [{label, value}],
 *   applications: [{title, description}],
 *   compatibility: [str],
 *   references: [{label, code, note}],
 *   relatedProducts: [{slug, name, image, kicker}],
 *   brand: {name, logo, url},
 *   category: {name, slug},
 * }
 */
export default function ProductDetail({
  product,
  breadcrumbs = [],
  relatedProducts = [],
  children
}) {
  const mailSubject = encodeURIComponent(`Pedido de informação — ${product.name}`);
  const mailBody = encodeURIComponent(
    `Olá,\n\nGostaria de receber informação e orçamento para o produto "${product.name}".\n\nObrigado.\n`
  );

  return (
    <PageTransition>
      {/* Breadcrumb hero premium */}
      <section className="relative pt-28 md:pt-36 pb-10 bg-gradient-to-b from-brand-50/60 via-white to-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 15% 20%, rgba(54,162,245,0.15), transparent 30%), radial-gradient(circle at 85% 10%, rgba(3,102,191,0.1), transparent 30%)'
          }}
        />
        <div className="container-wide relative">
          {/* Breadcrumb */}
          {breadcrumbs.length > 0 && (
            <nav className="mb-8 flex items-center gap-2 text-sm text-ink-500 flex-wrap">
              {breadcrumbs.map((b, i) => (
                <span key={i} className="flex items-center gap-2">
                  {b.to ? (
                    <Link to={b.to} className="hover:text-brand-700 transition-colors">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="text-ink-700 font-medium">{b.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-ink-300">
                      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Grid hero do produto */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Galeria */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductGallery
                images={product.images || [product.image].filter(Boolean)}
                alt={product.name}
                badges={product.badges}
              />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {product.brand && (
                <div className="flex items-center gap-3 mb-5">
                  {product.brand.logo && (
                    <div className="h-10 w-10 rounded-lg bg-white border border-ink-100 grid place-items-center p-1.5">
                      <img src={product.brand.logo} alt={product.brand.name} className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                  {product.brand.url ? (
                    <a
                      href={product.brand.url}
                      target="_blank" rel="noopener noreferrer"
                      className="text-sm font-semibold text-ink-700 hover:text-brand-700"
                    >
                      {product.brand.name}
                    </a>
                  ) : (
                    <span className="text-sm font-semibold text-ink-700">{product.brand.name}</span>
                  )}
                </div>
              )}

              {product.kicker && (
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                  {product.kicker}
                </p>
              )}
              <h1 className="mt-3 font-display text-3xl md:text-5xl font-bold text-ink-900 leading-[1.05] text-balance">
                {product.name}
              </h1>
              {product.subtitle && (
                <p className="mt-4 text-lg text-ink-700 leading-relaxed">{product.subtitle}</p>
              )}
              {product.lead && (
                <p className="mt-4 text-ink-600 leading-relaxed">{product.lead}</p>
              )}

              {/* Quick meta */}
              {product.meta && product.meta.length > 0 && (
                <ul className="mt-6 grid sm:grid-cols-2 gap-2">
                  {product.meta.map((m) => (
                    <li key={m} className="flex items-start gap-2 text-sm text-ink-700">
                      <span className="mt-1 grid place-items-center h-5 w-5 rounded-full bg-brand-500 text-white flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/sobre#formulario-contacto" className="btn-primary">
                  Pedir orçamento
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a
                  href={`mailto:${contact.email}?subject=${mailSubject}&body=${mailBody}`}
                  className="btn-ghost"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M3 8l9 6 9-6m-18 0v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8m-18 0 9-5 9 5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                  Email directo
                </a>
                <a href={contact.phoneHref} className="btn-ghost">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                  {contact.phone}
                </a>
              </div>

              {/* Trust row */}
              <div className="mt-8 pt-6 border-t border-ink-100 grid grid-cols-3 gap-4">
                {[
                  { icon: 'shield', label: 'Apoio técnico', sub: 'Seleção especializada' },
                  { icon: 'truck', label: 'Portugal', sub: 'Entrega e suporte local' },
                  { icon: 'chart', label: 'Multimarca', sub: 'Compatibilidade ampla' }
                ].map((t) => (
                  <div key={t.label} className="text-center">
                    <div className="mx-auto h-9 w-9 rounded-lg bg-brand-50 grid place-items-center text-brand-600 mb-2">
                      {t.icon === 'shield' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7l-9-5Z" stroke="currentColor" strokeWidth="1.8" />
                        </svg>
                      )}
                      {t.icon === 'truck' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M3 7h11v10H3V7Zm11 3h4l3 3v4h-7V10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                          <circle cx="7.5" cy="18" r="1.5" stroke="currentColor" strokeWidth="1.8" />
                          <circle cx="17.5" cy="18" r="1.5" stroke="currentColor" strokeWidth="1.8" />
                        </svg>
                      )}
                      {t.icon === 'chart' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M4 19V5m0 14h16M8 15v4m4-9v9m4-6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-ink-900">{t.label}</p>
                    <p className="text-xs text-ink-500 mt-0.5">{t.sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specs */}
      {product.specs && product.specs.length > 0 && (
        <section className="section">
          <div className="container-wide">
            <SectionHead
              kicker="Ficha Técnica"
              title="Especificações técnicas"
              description="Dados técnicos relevantes para integração e seleção."
            />
            <ScrollReveal className="mt-8 md:mt-10 rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
              <div className="grid md:grid-cols-2">
                {product.specs.map((s, i) => (
                  <div
                    key={i}
                    className={`flex items-baseline justify-between gap-6 p-5 md:p-6 border-ink-100 ${
                      i % 2 === 0 ? 'md:border-r' : ''
                    } ${i < product.specs.length - 2 ? 'border-b' : i === product.specs.length - 2 ? 'md:border-b-0 border-b' : ''}`}
                  >
                    <span className="text-sm font-semibold text-ink-500 uppercase tracking-wider">
                      {s.label}
                    </span>
                    <span className="text-ink-900 font-display font-semibold text-right">{s.value}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Aplicações */}
      {product.applications && product.applications.length > 0 && (
        <section className="section">
          <div className="container-wide">
            <SectionHead
              kicker="Aplicações"
              title="Onde este produto se aplica"
              description="Áreas e rotinas típicas em que este produto traz valor."
            />
            <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {product.applications.map((a, idx) => (
                <ScrollReveal
                  key={a.title}
                  delay={idx * 0.05}
                  className="rounded-2xl bg-white border border-ink-100 shadow-soft p-6 card-hover"
                >
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 grid place-items-center text-white mb-4">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-display text-lg font-bold text-ink-900">{a.title}</h3>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed">{a.description}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Compatibilidade */}
      {product.compatibility && product.compatibility.length > 0 && (
        <section className="section">
          <div className="container-wide">
            <SectionHead
              kicker="Compatibilidade"
              title="Equipamentos e sistemas compatíveis"
              description="Lista de referências de compatibilidade para integração rápida."
            />
            <ScrollReveal className="mt-8 md:mt-10 rounded-3xl bg-gradient-to-br from-brand-700 to-brand-500 text-white p-8 md:p-12 shadow-glow">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {product.compatibility.map((c) => (
                  <div
                    key={c}
                    className="flex items-start gap-3 rounded-xl bg-white/10 backdrop-blur border border-white/15 px-4 py-3"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white flex-shrink-0" />
                    <span className="text-sm">{c}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Referências */}
      {product.references && product.references.length > 0 && (
        <section className="section">
          <div className="container-wide">
            <SectionHead
              kicker="Referências"
              title="Part numbers e códigos associados"
              description="Contacte-nos para disponibilidade, volumes de encomenda e preço."
            />
            <ScrollReveal className="mt-8 md:mt-10 rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-ink-50 text-ink-700">
                    <tr>
                      <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Descrição</th>
                      <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Referência</th>
                      <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Notas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.references.map((r, i) => (
                      <tr key={i} className="border-t border-ink-100 hover:bg-brand-50/40 transition-colors">
                        <td className="px-6 py-3 font-semibold text-ink-900">{r.label}</td>
                        <td className="px-6 py-3 font-mono text-brand-700">{r.code}</td>
                        <td className="px-6 py-3 text-ink-700">{r.note || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Custom children */}
      {children}

      {/* Produtos relacionados */}
      {relatedProducts.length > 0 && (
        <section className="section">
          <div className="container-wide">
            <SectionHead
              kicker="Também pode interessar"
              title="Produtos relacionados"
            />
            <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((r, idx) => (
                <motion.div
                  key={r.slug || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.06 }}
                >
                  {r.slug ? (
                    <Link
                      to={r.slug}
                      className="group block rounded-2xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover h-full"
                    >
                      <RelatedContent r={r} />
                    </Link>
                  ) : (
                    <article className="rounded-2xl bg-white border border-ink-100 shadow-soft overflow-hidden h-full">
                      <RelatedContent r={r} />
                    </article>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCTA
        title={`Interessado no ${product.name}?`}
        description="Entre em contacto para orçamento, disponibilidade e apoio à seleção técnica."
      />
    </PageTransition>
  );
}

function RelatedContent({ r }) {
  return (
    <>
      <div className="aspect-square bg-gradient-to-br from-brand-50 to-white border-b border-ink-100 overflow-hidden">
        {r.image && (
          <img
            src={r.image}
            alt={r.name}
            className="h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-5">
        {r.kicker && (
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">{r.kicker}</p>
        )}
        <h4 className="mt-2 font-display text-base font-bold text-ink-900 group-hover:text-brand-700 transition-colors">
          {r.name}
        </h4>
        {r.description && <p className="mt-2 text-xs text-ink-600 line-clamp-2">{r.description}</p>}
      </div>
    </>
  );
}
