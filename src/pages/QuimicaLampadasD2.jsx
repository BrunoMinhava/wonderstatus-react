import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import ZoomableImage from '../components/Lightbox';
import ResponsiveTable from '../components/ResponsiveTable';
import { Link } from 'react-router-dom';
import lampadasExtras from '../data/lampadas-extras';

export default function QuimicaLampadasD2() {
  const [query, setQuery] = useState('');
  const { d2 } = lampadasExtras;

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return d2.rows;
    return d2.rows.filter((r) => r.join(' ').toLowerCase().includes(q));
  }, [d2.rows, query]);

  return (
    <PageTransition>
      <PageHeader
        kicker="AAS · Correção de Fundo"
        title="Lâmpadas de Deutério D2"
        subtitle="Correção de fundo com emissão contínua no ultravioleta para espectrometria AA e UV-Vis. Compatibilidade transversal para os principais fabricantes."
        image="/assets/slide4.JPG"
        actions={[
          { label: 'Ver tabela', href: '#tabela' },
          { label: 'Pedir informação', href: '/sobre#formulario-contacto', ghost: true }
        ]}
      />

      {/* Breadcrumb */}
      <section className="py-6 border-b border-ink-100 bg-white/60">
        <div className="container-wide flex items-center gap-2 text-sm text-ink-500 flex-wrap">
          <Link to="/" className="hover:text-brand-700">Home</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-ink-300"><path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          <Link to="/quimica" className="hover:text-brand-700">Química</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-ink-300"><path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          <Link to="/quimica/lampadas" className="hover:text-brand-700">Lâmpadas Cátodo Oco e D2</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-ink-300"><path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          <span className="text-ink-700 font-medium">Deutério D2</span>
        </div>
      </section>

      {/* Hero split com imagem e descrição */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <ScrollReveal>
              <p className="eyebrow">Tecnologia D2</p>
              <h2 className="mt-4 section-title">Correção de fundo com emissão contínua no ultravioleta</h2>
              <p className="mt-5 section-lead">
                As lâmpadas de deutério Photron garantem uma fonte UV contínua e estável para
                correção de fundo em espectrometria de absorção atómica e UV-Vis, fundamentais
                para melhorar a qualidade analítica em matrizes complexas.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: 'Emissão contínua', value: '180–400 nm' },
                  { label: 'Estabilidade', value: 'Alta, controlada' },
                  { label: 'Aplicação', value: 'AA · UV-Vis' },
                  { label: 'Formato', value: 'Série P700+' }
                ].map((m) => (
                  <div key={m.label} className="rounded-xl bg-white border border-ink-100 p-3 shadow-soft">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">{m.label}</p>
                    <p className="mt-1 font-display text-sm font-bold text-ink-900">{m.value}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <ZoomableImage
                src="/assets/fotos/lampadas/d2-p736.jpg"
                alt="Lâmpada de deutério Photron P736"
                caption="Photron · Lâmpada de Deutério D2"
                className="rounded-3xl overflow-hidden bg-gradient-to-br from-brand-50 to-white border border-ink-100 shadow-soft"
                imgClassName="w-full h-96 object-contain p-8"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Aplicações */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Aplicações principais"
            title="Onde as D2 Photron se aplicam"
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Correção de fundo AA', desc: 'Compensação de absorção não-específica em métodos AA de chama e câmara de grafite.' },
              { title: 'Detetores UV HPLC', desc: 'Fonte de luz UV para detetores de absorvância em cromatografia líquida.' },
              { title: 'Espectrometria UV-Vis', desc: 'Fonte UV contínua para espectrofotómetros UV-Vis de bancada e laboratório.' },
              { title: 'Retrofit de sistemas', desc: 'Substituição direta em equipamentos instalados das principais marcas internacionais.' }
            ].map((a, idx) => (
              <ScrollReveal
                key={a.title}
                delay={idx * 0.06}
                className="rounded-2xl bg-white border border-ink-100 shadow-soft p-6 card-hover"
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 grid place-items-center text-white mb-4 shadow-soft">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 2v3M12 19v3M22 12h-3M5 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="font-display text-base font-bold text-ink-900">{a.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{a.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tabela */}
      <section className="section" id="tabela">
        <div className="container-wide">
          <SectionHead
            kicker="Compatibilidade"
            title="Fabricantes, famílias instrumentais e referências D2"
            description={`${d2.rows.length} fabricantes cobertos com referências Photron diretas e compatíveis.`}
          />

          <div className="mt-8 md:mt-10 rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
            {/* Search */}
            <div className="p-6 border-b border-ink-100">
              <div className="relative max-w-md">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Pesquisar fabricante, modelo, referência..."
                  className="w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="m20 20-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className="mt-3 text-xs text-ink-500">
                {filteredRows.length} {filteredRows.length === 1 ? 'fabricante' : 'fabricantes'} mostrados
              </p>
            </div>

            <ResponsiveTable
              headers={d2.headers}
              rows={filteredRows}
              primaryColIndex={0}
              monoColIndexes={[2]}
              emptyMessage="Nenhum resultado para a pesquisa."
            />
          </div>
        </div>
      </section>

      <ContactCTA
        title="Precisa de ajuda para selecionar lâmpadas D2?"
        description="Indique o equipamento ou a aplicação e identificamos a referência Photron D2 correta."
      />
    </PageTransition>
  );
}
