import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import ZoomableImage from '../components/Lightbox';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const flowSteps = [
  { num: '01', title: 'Preparar a amostra', text: 'Tubos e copos compatíveis com HotBlock e AutoBlock, com graduações integradas e formatos para 15, 50 e 100 mL.' },
  { num: '02', title: 'Clarificar o digestato', text: 'FilterMate para filtração no mesmo tubo ou FlipMate para transferência filtrada com apoio de vácuo.' },
  { num: '03', title: 'Escalar a produtividade', text: 'HotBlock 150 e 200 para controlo térmico robusto e soluções AutoBlock para reduzir a manipulação de ácidos.' }
];

const choices = [
  { badge: 'Se a prioridade é simplicidade', title: 'Menos transferências, menos risco', text: 'Combine tubos compatíveis com FilterMate para concentrar digestão, filtração e fecho num fluxo mais direto.' },
  { badge: 'Se a prioridade é flexibilidade', title: 'Mais opções de montagem e membrana', text: 'FlipMate e HotBlock 200 acomodam rotinas com maiores exigências de configuração, volume e clarificação.' },
  { badge: 'Se a prioridade é produtividade', title: 'Automatizar as etapas mais críticas', text: 'AutoBlock Plus e AutoBlock Fill ajudam a reduzir a exposição do operador e a normalizar a adição de reagentes.' }
];

const tubes = [
  { name: 'UC475-NL', image: '/assets/fotos/uc475-nl.jpeg', desc: 'Tubo de 50 mL com parede reforçada para HotBlock.' },
  { name: 'UC-485NL', image: '/assets/fotos/uc-485nl.jpeg', desc: 'Variante para volumes ajustados com graduação clara.' },
  { name: 'SC415', image: '/assets/fotos/sc415.jpeg', desc: 'Tubo standard para digestão de rotina.' },
  { name: 'SC490', image: '/assets/fotos/sc490.jpeg', desc: 'Tubo de maior volume, compatível com AutoBlock Plus.' }
];

const filterMateSystems = [
  {
    tag: 'FilterMate',
    name: 'FilterMate Systems',
    image: '/assets/fotos/digestao/filtermate-systems.jpg',
    desc: 'Sistema de filtração dentro do próprio tubo de digestão, minimizando transferências e contaminação.'
  },
  {
    tag: 'FlipMate',
    name: 'FlipMate Filtration Systems',
    image: '/assets/fotos/digestao/flipmate-systems.jpg',
    desc: 'Sistema de filtração com inversão do tubo e apoio de vácuo para maior eficiência em volumes maiores.'
  },
  {
    tag: 'FlipMate',
    name: 'FlipMate Filtration Assemblies',
    image: '/assets/fotos/digestao/flipmate-assemblies.jpg',
    desc: 'Conjuntos pré-montados para diferentes configurações de membrana e volume.'
  },
  {
    tag: 'FlipMate',
    name: 'FlipMate Vacuum Manifold',
    image: '/assets/fotos/digestao/flipmate-vacuum-manifold.jpg',
    desc: 'Múltiplas posições simultâneas com controlo de vácuo para alta produtividade.'
  }
];

const hotblocks = [
  { name: 'HotBlock Digestion Systems', image: '/assets/fotos/digestao/hotblock-150.jpg', desc: 'Solução completa para digestão EPA standard em volumes frequentes.' },
  { name: 'Heating Blocks', image: '/assets/fotos/digestao/hotblock-200-block.jpg', desc: 'Bloco aquecido da série 200 para maior temperatura e flexibilidade.' },
  { name: 'Controllers', image: '/assets/fotos/digestao/hotblock-200-controller.jpg', desc: 'Controlador independente para HotBlock 200 com programação de rampas.' },
  { name: 'AutoBlock Plus', image: '/assets/fotos/digestao/autoblock-plus.jpg', desc: 'Automatização da preparação com controlo de reagentes e redução de intervenção.' },
  { name: 'AutoBlock Fill', image: '/assets/fotos/digestao/autoblock-fill.jpg', desc: 'Dispensa automática de reagentes para digestão em rotina de metais traço.' },
  { name: 'HotBlock Hot Plate', image: '/assets/fotos/digestao/hotblock-hot-plate.jpg', desc: 'Placa aquecida standard para situações de preparação mais simples.' }
];

const faq = [
  {
    q: 'Os tubos servem para digestão e armazenamento?',
    a: 'Sim. Os tubos Environmental Express foram desenhados para funcionar como recipiente de digestão, recipiente graduado para ajuste a volume e unidade de armazenamento intermédio, reduzindo perdas de amostra.'
  },
  {
    q: 'Quando devo escolher FilterMate em vez de FlipMate?',
    a: 'FilterMate concentra digestão, filtração e fecho no mesmo tubo — ideal quando a prioridade é simplicidade e redução de risco. FlipMate é indicado quando precisa de maior volume, maior flexibilidade de membrana ou apoio de vácuo.'
  },
  {
    q: 'Que tamanhos de tubo são cobertos pela gama?',
    a: 'A gama cobre tipicamente 15, 50 e 100 mL, incluindo variantes com e sem graduação, paredes reforçadas e formatos otimizados para HotBlock e AutoBlock.'
  },
  {
    q: 'O HotBlock 200 usa controlador externo?',
    a: 'Sim. A série 200 separa bloco de aquecimento e controlador, permitindo maior flexibilidade de configuração e programação de rampas térmicas.'
  },
  {
    q: 'O AutoBlock Fill substitui o HotBlock?',
    a: 'Não. AutoBlock Fill complementa a solução automatizando a adição de reagentes; o aquecimento mantém-se no HotBlock ou AutoBlock Plus.'
  },
  {
    q: 'Estes sistemas são adequados para rotinas de metais traço?',
    a: 'Sim. Os materiais e o fluxo foram validados para rotinas EPA de metais traço, com foco em reduzir a contaminação cruzada e a exposição do operador.'
  }
];

export default function QuimicaDigestao() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <PageTransition>
      <PageHeader
        kicker="Preparação de Amostras · Environmental Express"
        title="Digestão de metais, filtração e automação num fluxo mais limpo"
        subtitle="Reunimos numa só área tubos, copos, filtração e sistemas de aquecimento para suportar a preparação de amostras em rotinas EPA de metais traço, com foco em redução de contaminação e produtividade."
        image="/assets/fotos/digestao-main.jpeg"
        actions={[
          { label: 'Ver equipamento', href: '#hotblock' },
          { label: 'Pedir informação', href: '/sobre#formulario-contacto', ghost: true }
        ]}
      />

      {/* Visão geral — fluxo 3 etapas */}
      <section className="section" id="visao">
        <div className="container-wide">
          <SectionHead
            kicker="Visão Geral"
            title="Uma página organizada pela sequência real da rotina"
            description="Reunimos consumíveis, sistemas de filtração e equipamento que entram na digestão de metais, para facilitar a seleção por etapa de trabalho."
          />

          <div className="mt-8 md:mt-10 grid md:grid-cols-3 gap-6">
            {flowSteps.map((s, idx) => (
              <ScrollReveal
                key={s.num}
                delay={idx * 0.1}
                className="relative rounded-3xl bg-white border border-ink-100 shadow-soft p-7 card-hover"
              >
                <p className="font-display text-5xl font-bold text-brand-200">{s.num}</p>
                <h3 className="mt-3 font-display text-xl font-bold text-ink-900">{s.title}</h3>
                <p className="mt-3 text-ink-600 leading-relaxed">{s.text}</p>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {choices.map((c, idx) => (
              <ScrollReveal
                key={c.title}
                delay={idx * 0.08}
                className="rounded-3xl bg-gradient-to-br from-brand-50 to-white border border-brand-100 p-7"
              >
                <span className="inline-flex rounded-full bg-white border border-brand-200 px-3 py-1 text-xs font-semibold text-brand-700">
                  {c.badge}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{c.title}</h3>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">{c.text}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tubos */}
      <section className="section" id="tubos">
        <div className="container-wide">
          <SectionHead
            kicker="Tubos e Copos"
            title="Tubos de digestão e preparação de amostras"
            description="Formatos e geometrias usuais na rotina — 15, 50 e 100 mL — com variantes para diferentes sistemas de aquecimento."
          />
          <div className="mt-8 md:mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tubes.map((t, idx) => (
              <ScrollReveal
                key={t.name}
                delay={idx * 0.06}
                className="rounded-2xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover"
              >
                <ZoomableImage
                  src={t.image}
                  alt={t.name}
                  caption={`${t.name} — Environmental Express`}
                  imgClassName="w-full h-44 object-contain p-4 bg-gradient-to-b from-brand-50/40 to-white"
                />
                <div className="p-5 border-t border-ink-100">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Tubo</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-ink-900">{t.name}</h3>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed">{t.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FilterMate / FlipMate */}
      <section className="section" id="filtração">
        <div className="container-wide">
          <SectionHead
            kicker="Filtração Pós-Digestão"
            title="FilterMate e FlipMate para clarificação do digestato"
            description="Dois caminhos técnicos para a mesma etapa: filtrar no tubo (FilterMate) ou transferir com vácuo (FlipMate)."
          />

          <div className="mt-8 md:mt-10 grid md:grid-cols-2 gap-6">
            <ScrollReveal className="rounded-3xl bg-white border border-ink-100 shadow-soft p-7 card-hover">
              <span className="inline-flex rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-semibold text-brand-700">
                Escolha rápida
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-ink-900">Quando optar por FilterMate</h3>
              <ul className="mt-4 space-y-2 text-ink-700">
                {[
                  'Minimiza transferências e risco de contaminação',
                  'Filtração no mesmo tubo de digestão',
                  'Fluxo mais rápido para rotinas de volume padrão'
                ].map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="rounded-3xl bg-white border border-ink-100 shadow-soft p-7 card-hover">
              <span className="inline-flex rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-semibold text-brand-700">
                Escolha rápida
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-ink-900">Quando optar por FlipMate</h3>
              <ul className="mt-4 space-y-2 text-ink-700">
                {[
                  'Maior flexibilidade de membrana',
                  'Apoio de vácuo para volumes maiores',
                  'Manifold para múltiplas posições em paralelo'
                ].map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filterMateSystems.map((s, idx) => (
              <ScrollReveal
                key={s.name}
                delay={idx * 0.06}
                className="rounded-2xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover"
              >
                <ZoomableImage
                  src={s.image}
                  alt={s.name}
                  caption={s.name}
                  imgClassName="w-full h-44 object-contain p-4 bg-gradient-to-b from-brand-50/40 to-white"
                />
                <div className="p-5 border-t border-ink-100">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">{s.tag}</p>
                  <h3 className="mt-1 font-display text-base font-bold text-ink-900">{s.name}</h3>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* HotBlock / AutoBlock */}
      <section className="section" id="hotblock">
        <div className="container-wide">
          <SectionHead
            kicker="Aquecimento e Automação"
            title="HotBlock, AutoBlock e automação da preparação"
            description="Dos sistemas EPA standard às soluções automatizadas que reduzem intervenção manual e tempo de exposição a ácidos."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hotblocks.map((h, idx) => (
              <ScrollReveal
                key={h.name}
                delay={idx * 0.06}
                className="rounded-2xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover"
              >
                <ZoomableImage
                  src={h.image}
                  alt={h.name}
                  caption={h.name}
                  imgClassName="w-full h-48 object-contain p-4 bg-gradient-to-b from-brand-50/40 to-white"
                />
                <div className="p-5 border-t border-ink-100">
                  <h3 className="font-display text-base font-bold text-ink-900">{h.name}</h3>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed">{h.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Construção técnica', text: 'Materiais selecionados para resistência a ácidos e estabilidade térmica.' },
              { title: 'Eficiência de energia', text: 'Controlo térmico afinado para reduzir consumo em regime prolongado.' },
              { title: 'Segurança', text: 'Proteções térmicas e desenho para reduzir exposição do operador a vapores.' },
              { title: 'Conformidade', text: 'Configurações validadas para métodos EPA de metais e preparação de amostras.' }
            ].map((c, idx) => (
              <ScrollReveal
                key={c.title}
                delay={idx * 0.05}
                className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 text-white p-5 shadow-soft"
              >
                <p className="font-display font-bold text-base">{c.title}</p>
                <p className="mt-2 text-xs text-white/85 leading-relaxed">{c.text}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vídeo */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Vídeo Técnico"
            title="Como maximizar a digestão de metais com HotBlock"
            description="Guia prático sobre a utilização dos sistemas HotBlock da Environmental Express para digestão de metais em rotinas EPA."
          />
          <ScrollReveal className="mt-8 md:mt-10 rounded-3xl overflow-hidden shadow-soft aspect-video">
            <iframe
              src="https://www.youtube.com/embed/WaovKqT7DOE"
              title="How to Maximise Metals Digestion With HotBlocks — Environmental Express"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-presentation"
              className="w-full h-full"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container-wide">
          <SectionHead
            kicker="FAQ"
            title="Questões técnicas frequentes"
            description="Respostas rápidas sobre tubos, filtração, HotBlock e sistemas AutoBlock."
          />
          <ScrollReveal className="mt-8 md:mt-10 rounded-3xl bg-white border border-ink-100 shadow-soft divide-y divide-ink-100 overflow-hidden">
            {faq.map((item, idx) => (
              <div key={idx}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-brand-50/30 transition-colors"
                >
                  <span className="font-display font-semibold text-ink-900">{item.q}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`text-ink-400 transition-transform flex-shrink-0 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  >
                    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden bg-brand-50/20"
                    >
                      <p className="p-5 md:p-6 pt-2 md:pt-2 text-ink-700 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <ContactCTA
        title="Precisa de ajuda para montar a configuração certa?"
        description="Apoiamos na seleção de tubos, filtração e sistemas de aquecimento conforme o método analítico e o volume de rotina."
      />
    </PageTransition>
  );
}
