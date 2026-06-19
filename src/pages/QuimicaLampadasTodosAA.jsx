import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import ResponsiveTable from '../components/ResponsiveTable';
import { Link } from 'react-router-dom';
import lampadasExtras from '../data/lampadas-extras';

export default function QuimicaLampadasTodosAA() {
  const { allAA, allAA_highlights, allAA_configs } = lampadasExtras;

  return (
    <PageTransition>
      <PageHeader
        kicker="AAS · Compatibilidade Transversal"
        title="Lâmpadas para todos os instrumentos AA"
        subtitle="Estabilidade e intensidade para rotinas laboratoriais. Orientação por fabricante e tipo de lâmpada — cobertura transversal de plataformas AAS."
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
          <span className="text-ink-700 font-medium">Todos instrumentos AA</span>
        </div>
      </section>

      {/* Destaques */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Destaques"
            title="Estabilidade e intensidade para rotinas laboratoriais"
            description="Lâmpadas compatíveis com os principais fabricantes de AAS, com configurações adequadas para métodos quantitativos e controlo de qualidade."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {allAA_highlights.map((h, idx) => (
              <ScrollReveal
                key={h}
                delay={idx * 0.08}
                className="rounded-2xl bg-white border border-ink-100 shadow-soft p-6 card-hover"
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 grid place-items-center text-white mb-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-medium text-ink-800 leading-snug">{h}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Configurações */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Configurações"
            title="Configurações disponíveis por tipo de aplicação"
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allAA_configs.map((c, idx) => (
              <ScrollReveal
                key={c.title}
                delay={idx * 0.06}
                className="rounded-2xl bg-gradient-to-br from-brand-50 to-white border border-brand-100 p-6 card-hover"
              >
                <h3 className="font-display text-lg font-bold text-ink-900">{c.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{c.description}</p>
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
            title="Orientação por fabricante e tipo de lâmpada"
            description="Tabela de referência com formato recomendado e famílias disponíveis por fabricante."
          />

          <div className="mt-8 md:mt-10 rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
            <ResponsiveTable
              headers={allAA.headers}
              rows={allAA.rows}
              primaryColIndex={0}
              emptyMessage="Nenhum fabricante encontrado."
            />
          </div>
        </div>
      </section>

      <ContactCTA
        title="Precisa de ajuda para selecionar lâmpadas AA?"
        description="Apoiamos na seleção de referências e configurações para os principais fabricantes de espectrómetros AA."
      />
    </PageTransition>
  );
}
