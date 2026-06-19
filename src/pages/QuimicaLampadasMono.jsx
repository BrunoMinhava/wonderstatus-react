import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import ZoomableImage from '../components/Lightbox';
import { Link } from 'react-router-dom';

export default function QuimicaLampadasMono() {
  return (
    <PageTransition>
      <PageHeader
        kicker="Subgrupo · Lâmpadas de Cátodo Oco"
        title="Lâmpadas de Cátodo Oco Mono-Elementares"
        subtitle="Lâmpadas mono-elementares Photron para métodos dedicados por elemento. Formatos 37 mm / 1.5&quot; e 50 mm / 2.0&quot; com versões uncoded, Agilent (Varian) e Thermo (Unicam)."
        image="/assets/slide4.JPG"
        actions={[
          { label: 'Ver gama 37 mm', href: '/quimica/lampadas' },
          { label: 'Pedir informação', href: '/sobre#formulario-contacto', ghost: true }
        ]}
      />

      {/* Breadcrumb */}
      <section className="py-6 border-b border-ink-100 bg-white/60">
        <div className="container-wide flex items-center gap-2 text-sm text-ink-500 flex-wrap">
          <Link to="/" className="hover:text-brand-700">Home</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-ink-300">
            <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <Link to="/quimica" className="hover:text-brand-700">Química</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-ink-300">
            <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <Link to="/quimica/lampadas" className="hover:text-brand-700">Lâmpadas Cátodo Oco e D2</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-ink-300">
            <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-ink-700 font-medium">Mono-Elementares</span>
        </div>
      </section>

      {/* Introdução */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Introdução"
            title="Lâmpadas dedicadas a um único elemento"
            description="Área reservada para referências, aplicações e compatibilidades deste subgrupo. Organização por elemento com notas de utilização e configurações específicas."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 gap-6">
            <ScrollReveal className="rounded-3xl bg-white border border-ink-100 shadow-soft p-8">
              <h3 className="font-display text-xl font-bold text-ink-900">Organização</h3>
              <ul className="mt-4 space-y-2 text-ink-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                  <span>Organização por elemento</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                  <span>Referências e configurações</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                  <span>Notas de utilização</span>
                </li>
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="rounded-3xl bg-gradient-to-br from-brand-700 to-brand-500 text-white p-8 shadow-glow">
              <h3 className="font-display text-xl font-bold">Estrutura para referências</h3>
              <p className="mt-3 text-white/85">Área preparada para receber:</p>
              <ul className="mt-4 space-y-2 text-white/85 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white flex-shrink-0" />
                  <span>Tabela de referências e variantes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white flex-shrink-0" />
                  <span>Condições de utilização</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white flex-shrink-0" />
                  <span>Compatibilidade por equipamento</span>
                </li>
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Imagens da gama"
            title="Fotografias oficiais Photron"
            description="Lâmpadas mono-elementares Photron para as linhas de 37 mm e 50 mm."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 gap-6">
            <ScrollReveal className="rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover">
              <ZoomableImage
                src="/assets/fotos/lampadas/mono-37mm-p801.jpg"
                alt="Lâmpada mono-elementar Photron P801 da série 37 mm"
                caption="37 mm / 1.5&quot; · Série P801 · mono-elementar Photron"
                imgClassName="w-full h-80 object-contain p-6 bg-gradient-to-b from-brand-50/40 to-white"
              />
              <div className="p-6 border-t border-ink-100">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">37 mm / 1.5"</p>
                <h3 className="mt-2 font-display text-lg font-bold text-ink-900">Série P801 mono-elementar</h3>
                <p className="mt-2 text-sm text-ink-600">Imagem oficial da série mono-elementar Photron com encaixe compacto para AAS multimarca.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover">
              <ZoomableImage
                src="/assets/fotos/lampadas/mono-51mm-p900.jpg"
                alt="Lâmpada mono-elementar Photron P900LL para 51 mm"
                caption="50 mm / 2.0&quot; · Série P900LL · mono-elementar Photron"
                imgClassName="w-full h-80 object-contain p-6 bg-gradient-to-b from-brand-50/40 to-white"
              />
              <div className="p-6 border-t border-ink-100">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">50 mm / 2.0"</p>
                <h3 className="mt-2 font-display text-lg font-bold text-ink-900">Série P900LL</h3>
                <p className="mt-2 text-sm text-ink-600">Visual oficial da série P900LL para configurações mono-elementares em formato 51 mm.</p>
              </div>
            </ScrollReveal>
          </div>
          <p className="mt-6 text-center text-sm text-ink-500">
            As imagens representam as duas famílias físicas principais da gama mono-elementar Photron.
          </p>
        </div>
      </section>

      {/* Link para tabela completa */}
      <section className="section">
        <div className="container-wide">
          <ScrollReveal className="rounded-3xl bg-gradient-to-br from-ink-900 via-brand-900 to-brand-700 text-white p-10 md:p-12 shadow-glow">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Tabela completa de referências</p>
              <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold">Consulte todas as referências Photron mono-elementares</h2>
              <p className="mt-4 text-white/85 leading-relaxed">
                Na página principal de Lâmpadas de Cátodo Oco e D2 encontra as tabelas completas com todos os elementos (Ag, Al, As, Au, B, Ba, Be, Bi, Ca, Cd, Co, Cr, Cu, Fe, K, Li...) em formatos 37 mm e 50 mm, com versões uncoded, Agilent e Thermo.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/quimica/lampadas"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 hover:bg-white/95 transition-all hover:-translate-y-0.5"
                >
                  Ver tabela completa
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  to="/quimica/lampadas-multi"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all hover:-translate-y-0.5"
                >
                  Ver multi-elementares
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ContactCTA
        title="Precisa de apoio para este subgrupo?"
        description="Apoiamos na seleção de referências e compatibilidades por equipamento."
      />
    </PageTransition>
  );
}
