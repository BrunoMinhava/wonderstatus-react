import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import ZoomableImage from '../components/Lightbox';

const yucoVariants = [
  {
    name: 'YUCO-CTD',
    tag: 'Perfis hidrográficos',
    description: 'Equipado com sensor CTD Legato da RBR para monitorização de salinidade, temperatura e profundidade ao longo de perfis subaquáticos.',
    specs: [
      'Comprimento: 112 cm · Peso: 10 kg',
      'Sensor CTD Legato — RBR',
      'Temperatura: -5 °C a +42 °C · Precisão: ±0,002 °C',
      'Condutividade: 0 a 85 mS/cm · Precisão: ±0,003 mS/cm',
      'DVL opcional (Waterlinked A50 — 1 MHz)',
    ],
  },
  {
    name: 'YUCO-PHYSICO',
    tag: 'Multiparamétrico',
    description: 'Integra a sonda multiparamétrica AML-RT3 com até 3 sensores AML à escolha: velocidade do som, condutividade, oxigénio dissolvido, turbidez, pH, clorofila-A, crude-oil.',
    specs: [
      'Comprimento: 123 cm · Peso: 9,5 kg',
      'Sonda AML-RT3 — até 3 sensores simultâneos',
      'Parâmetros: CTD, O₂ dissolvido, turbidez, pH, clorofila-A',
      'Frequência de amostragem: até 20 Hz',
      'Armazenamento de dados: 30 GB',
    ],
  },
  {
    name: 'YUCO-SCAN',
    tag: 'Sonar de varrimento lateral',
    description: 'Equipado com sonar lateral DeepVision para mapeamento do fundo marinho. Opção de câmara GoPro e iluminação subaquática para imagens de cor.',
    specs: [
      'Comprimento: 101 cm · Peso: 10 kg',
      'Sonar DeepVision — 200, 340 ou 680 kHz',
      'Alcance: até 50 m por canal · Abertura vert.: 60°',
      'Formatos de saída: DVS, XTF',
      'Opção câmara GoPro HERO9/10 + iluminação 1500 lm',
    ],
  },
  {
    name: 'YUCO-PAM',
    tag: 'Monitorização acústica passiva',
    description: 'Equipado com gravador Porpoise para monitorização contínua de ruído antropogénico e registo de mamíferos marinhos, incluindo botos e golfinhos de alta frequência.',
    specs: [
      'Comprimento: 98 cm · Peso: 9 kg',
      'Gravador Porpoise Recorder (ruído contínuo ou gravações "silenciosas")',
      'Capacidade: monitorização de ruídos industriais e mamíferos marinhos',
      'Sensor de pressão integrado · DVL opcional',
      'Pode regressar à superfície para registar posição GPS de cada gravação',
    ],
  },
  {
    name: 'YUCO-LUMEN',
    tag: 'Câmara subaquática',
    description: 'Câmara subaquática de alta qualidade com georreferenciação para captura de imagens fixas e vídeo. Pode integrar módulo de posicionamento e comunicação acústica.',
    specs: [
      'Câmara com captura georreferenciada — imagens + vídeo',
      'Iluminação subaquática integrada',
      'DVL para precisão de navegação e altitude do fundo',
      'Módulo de posicionamento acústico opcional',
      'Autonomia: 10 h a 3 nós / 6 h a 4 nós',
    ],
  },
  {
    name: 'YUCO-eDNA',
    tag: 'Monitorização de biodiversidade',
    description: 'Concebido para recolha de amostras de DNA ambiental (eDNA) para identificar seres vivos em ambientes naturais sem perturbação. Técnica não invasiva de monitorização de biodiversidade.',
    specs: [
      'Comprimento: 110 cm',
      'Sistema peristáltico estanque sem contaminação',
      'Compatível com kit de filtração VigiDNA© (Spygen)',
      'DVL para correção de corrente e altitude',
      'Medição opcional de caudal de água',
    ],
  },
  {
    name: 'YUCO-CARRIER',
    tag: 'Payload personalizável',
    description: 'Plataforma flexível para integrar qualquer tipo de sonda ou sensor estanque. Ideal para payloads customizados — nariz desenhado sob encomenda.',
    specs: [
      'Comprimento: 98 cm · Peso: 8 kg',
      'Interface série para gravação de dados',
      'API Ethernet estendida para dispositivos de alto nível',
      'Nariz personalizado sob pedido',
      'DVL opcional e baterias NiMH como alternativa',
    ],
  },
  {
    name: 'YUCO-3DSS',
    tag: 'Sonar 3D de varrimento lateral',
    description: 'Versão equipada com sonar 3D de varrimento lateral para levantamentos tridimensionais de alta resolução do fundo marinho.',
    specs: [
      'Sonar 3D de varrimento lateral',
      'Alta resolução 3D do fundo marinho',
      'Ideal para arqueologia subaquática, inspeção e mapeamento',
      'DVL integrado para máxima precisão de navegação',
      'Profundidade: até 300 m',
    ],
  },
];

const commonSpecs = [
  { param: 'Diâmetro', value: '12 cm' },
  { param: 'Profundidade máxima', value: '300 m' },
  { param: 'Velocidade', value: '2 a 6 nós' },
  { param: 'Autonomia', value: 'Até 10 h a 3 nós / 6 h a 4 nós (Li-Ion)' },
  { param: 'Bateria principal', value: 'Li-Ion recarregável 600 Wh / 14,8 V' },
  { param: 'Opção bateria', value: 'NiMH recarregável 200 Wh / 14,4 V' },
  { param: 'Precisão de navegação', value: '±2% da distância percorrida (com DVL)' },
  { param: 'Software de missão', value: 'SEAPLAN — planeamento gráfico e análise de missão' },
  { param: 'Comunicação de superfície', value: 'LoRa UHF ponto-a-ponto com SEACOMM (2,5 km / 5 km c/ antena ext.)' },
  { param: 'Alimentação do carregador', value: '100 a 240 VAC 50/60 Hz' },
  { param: 'Sistema de navegação', value: 'INX © — sistema proprietário SEABER' },
  { param: 'DVL (opcional)', value: 'Waterlinked A50 — 1 MHz, ±0,1 mm/s resolução, alt. máx. 50 m' },
];

export default function OceanografiaSeaber() {
  return (
    <PageTransition>
      <PageMeta
        title="Micro-AUVs para Oceanografia — Seaber YUCO"
        description="Micro-AUVs (veículos autónomos subaquáticos) Seaber YUCO para monitorização oceanográfica, mapeamento de fundo e recolha de dados CTD em ambientes costeiros e offshore."
        path="/oceanografia/seaber"
      />
      <PageHeader
        kicker="Oceanografia · Veículos Autónomos Subaquáticos"
        title="Micro-AUVs — Seaber YUCO"
        subtitle="Micro-AUVs compactos, modulares e acessíveis para investigação oceanográfica. 8 variantes YUCO com payloads intercambiáveis: CTD, SCAN, PHYSICO, PAM, LUMEN, eDNA, CARRIER e 3DSS."
        image="/assets/fotos/oceanografia/seaber/3dss-photo2.jpg"
        actions={[
          { label: 'Ver modelos YUCO', href: '#yuco' },
          { label: 'Especificações técnicas', href: '#specs', ghost: true },
        ]}
      >
        <div className="flex flex-wrap gap-2 mt-6">
          {['YUCO-CTD', 'YUCO-SCAN', 'YUCO-PHYSICO', 'Até 300 m', '10 h autonomia', 'DVL nativo'].map((b) => (
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
      <div className="bg-gradient-to-r from-indigo-950 via-blue-900 to-brand-900">
        <div className="container-wide py-10 md:py-14 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">Marca representada · Lorient, França</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Seaber</h2>
            <p className="mt-2 text-lg text-white/70 max-w-xl">
              Líder mundial em micro-AUVs — mais de 150 AUVs vendidos, 40+ distribuidores, 1200+ demonstrações e missões. Uma empresa para quem a oceanografia precisa de ser acessível.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="https://seaber.fr/"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-semibold px-5 py-2.5 text-sm transition-all"
            >
              Site oficial Seaber
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#yuco" className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-5 py-2.5 text-sm transition-all">
              Ver gama YUCO
            </a>
          </div>
        </div>
      </div>

      {/* Introdução YUCO */}
      <section className="section" id="yuco">
        <div className="container-wide">
          <SectionHead
            kicker="YUCO — Mercado Civil e Investigação"
            title="Plataforma YUCO: 8 variantes para cada necessidade oceanográfica"
            description="O YUCO é o micro-AUV de referência para investigação e monitorização ambiental. Diâmetro de 12 cm, payloads intercambiáveis e lançamento sem embarcação de apoio — missões prontas em menos de 10 minutos."
          />

          <div className="mt-8 md:mt-10 grid lg:grid-cols-2 gap-6 items-center">
            <ScrollReveal className="rounded-3xl bg-white border border-ink-100 shadow-soft p-8 md:p-10">
              <h3 className="font-display text-xl font-bold text-ink-900">A mudança de paradigma SEABER</h3>
              <p className="mt-3 text-ink-700 leading-relaxed">
                O YUCO foi concebido para preencher a lacuna na monitorização de águas costeiras — eficiente, robusto e acessível. Um operador, sem embarcação, lança o AUV e recolhe dados de qualidade equivalente a plataformas muito mais caras e complexas.
              </p>
              <ul className="mt-5 space-y-2 text-ink-700">
                {[
                  'Lançamento por 1 pessoa — sem embarcação de apoio',
                  'Missão programada e pronta a lançar em menos de 10 min',
                  'Payload intercambiável em campo — sem ferramentas especiais',
                  'Precisão de navegação: ±2% da distância percorrida (com DVL)',
                  'Autonomia até 10 horas a 3 nós com bateria Li-Ion',
                  'Profundidade máxima: 300 m',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '> 150', label: 'AUVs vendidos mundialmente' },
                  { value: '> 40', label: 'distribuidores no mundo' },
                  { value: '10 h', label: 'autonomia máxima a 3 nós' },
                  { value: '300 m', label: 'profundidade máxima certificada' },
                ].map((f, idx) => (
                  <ScrollReveal key={f.value} delay={idx * 0.08} className="rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-600 text-white p-6 shadow-soft">
                    <p className="font-display text-2xl md:text-3xl font-bold">{f.value}</p>
                    <p className="mt-2 text-sm text-white/85 leading-snug">{f.label}</p>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Proezas em missões reais */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Missões reais"
            title="Capacidades comprovadas em campo"
            description="Os AUVs Seaber têm sido usados em condições exigentes a nível mundial, demonstrando fiabilidade e precisão em missões complexas."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-3 gap-5">
            {[
              {
                title: 'Traversia do Canal da Mancha',
                text: '39 km do Reino Unido à França, de costa a costa, em missão autónoma de ~8 horas com 30% de bateria restante no final.',
              },
              {
                title: 'Arqueologia subaquática na Sicília',
                text: 'Frota de 3 YUCO-SCAN — 75 km² mapeados e prospectados até 200 m de profundidade com dados sonar de alta qualidade.',
              },
              {
                title: '1.º AUV lançado de drone aéreo',
                text: 'Exercício REPMUS em Portugal — o YUCO foi lançado a partir de um UAS Schiebel Camcopter S-100 e completou a missão autonomamente.',
              },
            ].map((item, idx) => (
              <ScrollReveal key={item.title} delay={idx * 0.07} className="rounded-2xl bg-white border border-ink-100 shadow-soft p-6 card-hover">
                <h4 className="font-display text-base font-bold text-ink-900">{item.title}</h4>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{item.text}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3DSS image showcase */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="YUCO-3DSS"
            title="Sonar 3D de varrimento lateral"
            description="Imagens de campo do YUCO-3DSS — levantamentos tridimensionais de alta resolução do fundo marinho."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 gap-5">
            {[
              { src: '/assets/fotos/oceanografia/seaber/3dss-render.png', label: 'YUCO-3DSS — Render técnico' },
              { src: '/assets/fotos/oceanografia/seaber/3dss-image.png', label: 'YUCO-3DSS — Imagem sonar' },
              { src: '/assets/fotos/oceanografia/seaber/3dss-photo1.jpg', label: 'YUCO-3DSS em missão' },
              { src: '/assets/fotos/oceanografia/seaber/3dss-photo2.jpg', label: 'YUCO-3DSS — detalhe' },
            ].map((img, idx) => (
              <ScrollReveal key={img.src} delay={idx * 0.07} className="rounded-2xl bg-white border border-ink-100 shadow-soft overflow-hidden card-hover">
                <ZoomableImage
                  src={img.src}
                  alt={img.label}
                  caption={img.label}
                  imgClassName="w-full h-56 object-cover"
                />
                <div className="p-3 border-t border-ink-100">
                  <p className="text-xs font-semibold text-ink-900">{img.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gama YUCO — variantes */}
      <section className="section">
        <div className="container-wide">
          <SectionHead
            kicker="Gama YUCO"
            title="8 variantes — uma para cada missão"
            description="Cada modelo YUCO é otimizado para um tipo específico de recolha de dados. Todos partilham o mesmo corpo estanque de 12 cm de diâmetro e as mesmas especificações de autonomia e profundidade."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {yucoVariants.map((v, idx) => (
              <ScrollReveal key={v.name} delay={idx * 0.05} className="group rounded-3xl bg-white border border-ink-100 shadow-soft p-7 card-hover">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">{v.tag}</p>
                <h3 className="mt-3 font-display text-xl font-bold text-ink-900 group-hover:text-brand-700 transition-colors">{v.name}</h3>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">{v.description}</p>
                <ul className="mt-5 space-y-1.5 text-sm text-ink-700">
                  {v.specs.map((s) => (
                    <li key={s} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Especificações técnicas comuns */}
      <section className="section" id="specs">
        <div className="container-wide">
          <SectionHead
            kicker="Especificações Técnicas"
            title="Características comuns a toda a gama YUCO"
            description="Todos os modelos YUCO partilham o mesmo sistema de propulsão, bateria e comunicação. O payload é o único elemento variável."
          />
          <ScrollReveal className="mt-8 md:mt-10 rounded-3xl bg-white border border-ink-100 shadow-soft overflow-hidden">
            <div className="p-6 md:p-8 border-b border-ink-100">
              <h3 className="font-display text-xl font-bold text-ink-900">Plataforma YUCO — Parâmetros comuns</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-ink-50 text-ink-700">
                  <tr>
                    <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Parâmetro</th>
                    <th className="text-left font-semibold uppercase tracking-wider text-xs px-6 py-4">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {commonSpecs.map((row, idx) => (
                    <tr key={idx} className="border-t border-ink-100 hover:bg-brand-50/40 transition-colors">
                      <td className="px-6 py-3 font-semibold text-ink-900">{row.param}</td>
                      <td className="px-6 py-3 text-ink-700">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Software SEAPLAN + SEACOMM */}
      <section className="section" id="software">
        <div className="container-wide">
          <SectionHead
            kicker="Software e Comunicação"
            title="SEAPLAN e SEACOMM — planeamento e controlo de missões"
            description="O ecossistema Seaber inclui software intuitivo de planeamento de missão e um dispositivo portátil de comunicação de campo."
          />
          <div className="mt-8 md:mt-10 grid lg:grid-cols-2 gap-6">
            <ScrollReveal className="rounded-3xl bg-white border border-ink-100 shadow-soft p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">Software · Planeamento e análise</p>
              <h3 className="mt-3 font-display text-xl font-bold text-ink-900">SEAPLAN</h3>
              <p className="mt-3 text-ink-700 leading-relaxed">
                Software gráfico de planeamento de missão para YUCO e MARVEL. Interface intuitiva para não-especialistas — missão programada e pronta em menos de 10 minutos.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink-700">
                {[
                  'Vista única com caminho 3D, controlo de velocidade e ativação do payload',
                  'Dashboard AUV com estado dos sensores e dicas de resolução',
                  'Exportação de logs para .CSV ou .XTF (para sonares)',
                  'Análise de missão pós-debrief com perfil de profundidade',
                  'Live Tracking: seguimento em tempo real até 10 AUVs em simultâneo',
                  'Compatible com ficheiros .GPX, .VTPK e .TPK',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="rounded-3xl bg-white border border-ink-100 shadow-soft p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">Dispositivo de campo · Comunicação</p>
              <h3 className="mt-3 font-display text-xl font-bold text-ink-900">SEACOMM</h3>
              <p className="mt-3 text-ink-700 leading-relaxed">
                Dispositivo portátil de comunicação para uso em campo durante as missões. Permite verificar o estado do YUCO, relocalizar o AUV no mar e enviar ordens — sem necessidade de PC.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { value: '2,5 km', label: 'alcance LoRa standard' },
                  { value: '5 km', label: 'com antena ext. opcional' },
                  { value: '10 h', label: 'autonomia (4×AA)' },
                  { value: 'IP65', label: 'resistência a salpicos' },
                ].map((f) => (
                  <div key={f.label} className="rounded-xl bg-blue-50 border border-blue-100 p-3">
                    <p className="font-display text-lg font-bold text-blue-700">{f.value}</p>
                    <p className="mt-0.5 text-xs text-ink-600 leading-snug">{f.label}</p>
                  </div>
                ))}
              </div>
              <ul className="mt-5 space-y-2 text-sm text-ink-700">
                {[
                  'Mostra bearing e distância relativa do AUV ao SEACOMM',
                  'Envia ordens: iniciar missão, pausar/retomar, retorno à base',
                  'Comunica com vários YUCOs em simultâneo',
                  'Frequência 868 MHz (EU) / compatível com AS923, AU915, US915, IN865',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* MARVEL — menção para survey/defesa */}
      <section className="section">
        <div className="container-wide">
          <ScrollReveal className="rounded-3xl overflow-hidden grid lg:grid-cols-2 bg-gradient-to-br from-indigo-900 to-blue-800 shadow-glow">
            <div className="p-8 md:p-10 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">Linha avançada · Survey e MCM</p>
              <h3 className="mt-3 font-display text-2xl font-bold">MARVEL — para survey e aplicações de defesa</h3>
              <p className="mt-4 text-white/85 leading-relaxed">
                O MARVEL é a nova geração de AUVs Seaber para mercados de survey marinho e contramedidas de minas (MCM). Inclui módulo Seatrac para posicionamento acústico e comunicação subaquática em tempo real.
              </p>
              <ul className="mt-5 space-y-2 text-white/90 text-sm">
                {[
                  'MARVEL-SCAN — sonar lateral de varrimento',
                  'MARVEL-MAGNETO — deteção de anomalias magnéticas',
                  'MARVEL-3DSS — sonar 3D de varrimento lateral',
                  'MARVEL-MBES — sonar multifeixe de fundo',
                  'MARVEL-LUMEN — câmara subaquática',
                  'Posicionamento USBL em tempo real · Live Tracking',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                  className="inline-flex items-center gap-2 rounded-full bg-white text-indigo-700 font-semibold px-5 py-2.5 text-sm transition-all hover:bg-white/90"
                >
                  Pedir informação sobre MARVEL
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center p-8 bg-white/5">
              <div className="rounded-2xl bg-white/10 border border-white/20 p-6 text-white text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300 mb-3">Variantes MARVEL</p>
                <div className="space-y-2 text-sm font-semibold">
                  {['MARVEL-SCAN', 'MARVEL-MAGNETO', 'MARVEL-3DSS', 'MARVEL-MBES', 'MARVEL-LUMEN', 'MARVEL SCAN-MAG'].map((m) => (
                    <div key={m} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ContactCTA
        title="Interessado nos micro-AUVs Seaber?"
        description="Apoiamos na seleção do modelo YUCO e payloads adequados para a sua campanha oceanográfica — CTD, SCAN, PHYSICO, eDNA e muito mais."
      />
    </PageTransition>
  );
}
