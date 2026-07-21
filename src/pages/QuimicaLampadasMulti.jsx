import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import ZoomableImage from '../components/Lightbox';
import { Link } from 'react-router-dom';

export default function QuimicaLampadasMulti() {
  return (
    <PageTransition>
      <PageMeta
        title="Lâmpadas de Cátodo Oco Multi-Elementares para AAS"
        description="Lâmpadas de cátodo oco multi-elementares para espectroscopia de absorção atómica. Ideal para determinação simultânea de vários metais. Compatíveis com Agilent, PerkinElmer, Hitachi e Shimadzu."
        path="/quimica/lampadas-multi"
      />
      <PageHeader
        kicker="Subgrupo · Lâmpadas de Cátodo Oco"
        title="Lâmpadas de Cátodo Oco Multi-Elementares"
        subtitle="Lâmpadas multi-elementares Photron para métodos multianalito. Reduzem tempo de rotina ao cobrir dois a quatro elementos numa só lâmpada."
        image="/assets/slide4.JPG"
        actions={[
          { label: 'Ver tabela completa', href: '/quimica/lampadas' },
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
          <span className="text-ink-700 font-medium">Multi-Elementares</span>
        </div>
      </section>

      {/* Introdução */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Introdução"
            title="Configurações multianalito para maior eficiência"
            description="Área para referências, aplicações e compatibilidades de lâmpadas multi-elementares. Combinações de elementos compatíveis numa só lâmpada para rotinas multianalito."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 gap-6">
            <ScrollReveal className="rounded-3xl bg-white border border-ink-100 shadow-soft p-8">
              <h3 className="font-display text-xl font-bold text-ink-900">Vantagens</h3>
              <ul className="mt-4 space-y-3 text-ink-700">
                {[
                  'Redução de trocas de lâmpada em rotinas multianalito',
                  'Compatibilidade com 2 a 4 elementos típicos por lâmpada',
                  'Conservação de tempo e gases',
                  'Otimização de consumíveis por método'
                ].map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="rounded-3xl bg-gradient-to-br from-brand-700 to-brand-500 text-white p-8 shadow-glow">
              <h3 className="font-display text-xl font-bold">Combinações típicas</h3>
              <p className="mt-3 text-white/85 text-sm">As combinações Photron multi-elementares cobrem as famílias de analitos mais frequentes em rotinas AA:</p>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  'Ca / Mg — rotinas ambientais',
                  'Cu / Fe / Mn / Zn — alimentos e águas',
                  'As / Se / Sb — toxicologia',
                  'Na / K / Li — análise clínica'
                ].map((l) => (
                  <li key={l} className="flex items-start gap-2 text-white/90">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white flex-shrink-0" />
                    <span>{l}</span>
                  </li>
                ))}
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
            title="Fotografias oficiais Photron multi-elementares"
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 gap-6">
            <ScrollReveal className="rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover">
              <ZoomableImage
                src="/assets/fotos/lampadas/multi-37mm-p570.jpg"
                alt="Lâmpada multi-elementar Photron P570 de 37 mm"
                caption="37 mm / 1.5&quot; · Série P570 · multi-elementar Photron"
                imgClassName="w-full h-80 object-contain p-6 bg-gradient-to-b from-brand-50/40 to-white"
              />
              <div className="p-6 border-t border-ink-100">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">37 mm / 1.5"</p>
                <h3 className="mt-2 font-display text-lg font-bold text-ink-900">Série P570 multi-elementar</h3>
                <p className="mt-2 text-sm text-ink-600">Formato compacto para combinações de 2 a 4 elementos em rotinas AA standard.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover">
              <ZoomableImage
                src="/assets/fotos/lampadas/multi-51mm-p605.jpg"
                alt="Lâmpada multi-elementar Photron P605 de 51 mm"
                caption="50 mm / 2.0&quot; · Série P605 · multi-elementar Photron"
                imgClassName="w-full h-80 object-contain p-6 bg-gradient-to-b from-brand-50/40 to-white"
              />
              <div className="p-6 border-t border-ink-100">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">50 mm / 2.0"</p>
                <h3 className="mt-2 font-display text-lg font-bold text-ink-900">Série P605</h3>
                <p className="mt-2 text-sm text-ink-600">Configuração para AAS PerkinElmer com maior durabilidade e volume de gás.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ContactCTA
        title="Precisa de apoio para multi-elementares?"
        description="Indique os elementos alvo e ajudamos a selecionar a combinação Photron multi-elementar correta."
      />
    </PageTransition>
  );
}
