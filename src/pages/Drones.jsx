import PageHeader from '../components/PageHeader';
import ProductGallery from '../components/ProductGallery';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import { hydra7 } from '../data/drones';

export default function Drones() {
  return (
    <PageTransition>
      <PageHeader
        kicker="Drones"
        title={hydra7.name}
        subtitle={hydra7.subtitle}
        image={hydra7.heroImage}
        actions={[
          { label: 'Ver aplicações', href: '#casos-uso' },
          { label: 'Pedir informação', href: '/sobre#formulario-contacto', ghost: true }
        ]}
      />

      {/* Intro + Summary */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-6">
            <ScrollReveal className="lg:col-span-3 rounded-3xl bg-white border border-ink-100 shadow-soft p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                Introdução
              </p>
              <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold text-ink-900 text-balance">
                Equilíbrio entre versatilidade FPV, autonomia longa e estabilidade assistida.
              </h2>
              <p className="mt-5 text-ink-700 leading-relaxed">{hydra7.intro}</p>
              <p className="mt-4 text-ink-700 leading-relaxed">
                A base técnica do projeto junta transmissão digital DJI O4 Pro, controladora de
                voo aberta e uma calibração afinada de sensores e GPS. O resultado é um drone
                preparado para captação de imagem, inspeção, agricultura, vigilância e integração
                de sensores especializados.
              </p>
            </ScrollReveal>

            <ScrollReveal
              delay={0.15}
              className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-ink-900 via-brand-900 to-brand-700 text-white p-8 md:p-10 shadow-glow"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Resumo Técnico
              </p>
              <ul className="mt-5 space-y-5">
                {hydra7.summary.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-baseline justify-between gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0"
                  >
                    <span className="text-white/65 text-sm font-semibold uppercase tracking-wider">
                      {s.label}
                    </span>
                    <span className="font-display text-sm md:text-base text-right max-w-[60%]">
                      {s.value}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Galeria de Fotos */}
      <section className="section">
        <div className="container-wide">
          <SectionHead kicker="Galeria" title="Fotos do Hydra 7" />
          <div className="mt-8">
            <ProductGallery images={hydra7.images} alt={hydra7.name} />
          </div>
        </div>
      </section>

      {/* Comando DJI RC Plus */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Controlo & Integração"
            title="DJI RC Plus — comando enterprise com ecrã integrado"
          />
          <div className="mt-8 md:mt-10">
            <ScrollReveal className="relative overflow-hidden rounded-3xl shadow-soft">
              <img
                src="/assets/fotos/drones/dji-rc-plus.png"
                alt="DJI RC Plus"
                className="w-full object-cover"
              />
            </ScrollReveal>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              {[
                { label: 'Ecrã', value: '7.02" Full HD táctil' },
                { label: 'Sistema', value: 'Android + DJI Pilot 2' },
                { label: 'Apps', value: 'DJI Pilot 2, Mission Planner' },
              ].map((item) => (
                <ScrollReveal
                  key={item.label}
                  className="rounded-2xl bg-white border border-ink-100 shadow-soft p-6 text-center"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                    {item.label}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold text-ink-900">{item.value}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Especificações */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Especificações"
            title="Base técnica do sistema"
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 gap-6">
            <ScrollReveal className="rounded-3xl bg-white border border-ink-100 shadow-soft p-8">
              <ul className="space-y-4">
                {hydra7.specsLeft.map((s, i) => (
                  <li key={i} className="text-ink-700 leading-relaxed">
                    <span className="text-ink-900 font-semibold">
                      {s.split(':')[0]}:
                    </span>
                    {s.split(':').slice(1).join(':')}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="rounded-3xl bg-white border border-ink-100 shadow-soft p-8">
              <ul className="space-y-4">
                {hydra7.specsRight.map((s, i) => (
                  <li key={i} className="text-ink-700 leading-relaxed">
                    <span className="text-ink-900 font-semibold">
                      {s.split(':')[0]}:
                    </span>
                    {s.split(':').slice(1).join(':')}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Diferenciais Estratégicos"
            title="Capacidades que distinguem o Hydra 7 em operação"
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 gap-6">
            {hydra7.differentiators.map((d, idx) => (
              <ScrollReveal
                key={d.title}
                delay={idx * 0.08}
                className="rounded-3xl bg-gradient-to-br from-white to-brand-50/40 border border-ink-100 shadow-soft p-8 card-hover"
              >
                <h3 className="font-display text-xl font-bold text-ink-900">{d.title}</h3>
                <p className="mt-3 text-ink-600 leading-relaxed">{d.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Proposta de Valor */}
      <section className="section">
        <div className="container-wide">
          <ScrollReveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 text-white p-10 md:p-16 shadow-glow">
            <div
              aria-hidden="true"
              className="absolute -top-20 -right-10 h-80 w-80 rounded-full bg-white/10 blur-3xl"
            />
            <div className="relative grid lg:grid-cols-2 gap-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                  Proposta de Valor
                </p>
                <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold leading-tight text-balance">
                  Potência e flexibilidade do FPV com a confiança de um piloto automático avançado.
                </h2>
                <p className="mt-5 text-white/85 leading-relaxed">
                  O Hydra 7 foi concebido para oferecer independência operacional. Reúne a
                  agilidade de um drone FPV, a estabilidade de voo assistido, a autonomia
                  necessária para missões prolongadas e uma arquitetura de manutenção simples,
                  com custos de reparação reduzidos.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {hydra7.metrics.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-white/25 bg-white/10 backdrop-blur px-4 py-1.5 text-sm font-semibold"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <ul className="space-y-3 text-white/90 text-sm md:text-base leading-relaxed">
                {hydra7.valueList.map((v) => (
                  <li key={v} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-200 flex-shrink-0" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Plano de Voo & Mission Planner */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                Planeamento de Missões
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-ink-900 text-balance">
                Define rotas, monitoriza em tempo real.
              </h2>
              <p className="mt-5 text-ink-700 leading-relaxed">
                Compatível com Mission Planner e QGroundControl via protocolo MAVLink. Define
                waypoints num mapa, configura altitudes e velocidades — o drone executa o plano
                com precisão total, com retorno automático em caso de perda de sinal.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Missões autónomas com waypoints GPS',
                  'Telemetria em tempo real no comando DJI RC Plus',
                  'Retorno automático ao ponto de partida (RTL)',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-ink-700">
                    <span className="h-2 w-2 rounded-full bg-brand-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <img
                src="/assets/fotos/drones/mission-planner.jpg"
                alt="Mission Planner — exemplo de plano de voo"
                className="w-full rounded-3xl shadow-soft border border-ink-100"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Óculos DJI Goggles 3 */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <ScrollReveal delay={0.1} className="order-2 lg:order-1">
              <img
                src="/assets/fotos/drones/dji-goggles.webp"
                alt="DJI Goggles 3"
                className="w-full max-w-md mx-auto drop-shadow-xl"
              />
            </ScrollReveal>
            <ScrollReveal className="order-1 lg:order-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                Visão Imersiva FPV
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-ink-900 text-balance">
                DJI Goggles 3 — micro-OLED, O4 Pro, latência 13ms.
              </h2>
              <p className="mt-5 text-ink-700 leading-relaxed">
                Compatíveis com o sistema O4 Pro do Hydra 7, os DJI Goggles 3 oferecem
                transmissão 1080p com painéis micro-OLED a 100Hz e latência de apenas 13ms.
                Real View PiP permite ver a imagem real e o feed FPV em simultâneo.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {['1080p Micro-OLED', '100Hz', '13ms latência', 'O4 Pro', 'Real View PiP'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Casos de Uso */}
      <section className="section" id="casos-uso">
        <div className="container-wide">
          <SectionHead
            kicker="Casos de Uso"
            title="Aplicações práticas do Hydra 7"
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hydra7.useCases.map((u, idx) => (
              <ScrollReveal
                key={u.title}
                delay={idx * 0.06}
                className="rounded-3xl bg-white border border-ink-100 shadow-soft p-7 card-hover"
              >
                <h3 className="font-display text-xl font-bold text-ink-900">{u.title}</h3>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">{u.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusão */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Conclusão Comercial"
            title="Mais independência operacional, menos paragem."
          />
          <div className="mt-8 md:mt-10 grid lg:grid-cols-2 gap-6">
            <ScrollReveal className="space-y-5 rounded-3xl bg-white border border-ink-100 shadow-soft p-8">
              {hydra7.conclusion.map((c, i) => (
                <p key={i} className="text-ink-700 leading-relaxed">
                  {c}
                </p>
              ))}
            </ScrollReveal>
            <ScrollReveal delay={0.15} className="rounded-3xl bg-gradient-to-br from-brand-50 to-white border border-brand-100 p-8">
              <ul className="space-y-3">
                {hydra7.microList.map((m) => (
                  <li key={m} className="flex items-start gap-3 text-ink-800">
                    <span className="mt-1 grid place-items-center h-5 w-5 rounded-full bg-brand-500 text-white flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 6 9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ContactCTA
        title="Quer ver o Hydra 7 a operar na sua aplicação?"
        description="Do cinema ao mar, da agricultura à inspeção industrial — adaptamos a configuração à missão."
      />
    </PageTransition>
  );
}
