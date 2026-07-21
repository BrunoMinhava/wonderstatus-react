import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import HeroSlideshow from '../components/HeroSlideshow';
import SectionHead from '../components/SectionHead';
import CategoryCard from '../components/CategoryCard';
import ScrollReveal from '../components/ScrollReveal';
import ContactCTA from '../components/ContactCTA';
import PageTransition from '../components/PageTransition';
import ProductCarousel, { InfiniteCarousel } from '../components/ProductCarousel';
import { categories } from '../data/categories';
import { allBrands } from '../data/brands';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

function CountUp({ to, suffix = '', duration = 1600 }) {
  const [count, setCount] = useState(0);
  const triggered = useRef(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - (1 - t) ** 3;
            setCount(Math.round(eased * to));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const SCRAMBLE_CHARS = 'IVXLCDM·—';
function ScrambleText({ text }) {
  const [display, setDisplay] = useState(text);
  const triggered = useRef(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const chars = text.split('');
          const totalDuration = 1400;
          const start = performance.now();
          const frame = (now) => {
            const progress = Math.min((now - start) / totalDuration, 1);
            const resolved = Math.floor(progress * chars.length);
            const result = chars.map((ch, i) => {
              if (i < resolved || ch === ' ') return ch;
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            });
            setDisplay(result.join(''));
            if (progress < 1) requestAnimationFrame(frame);
            else setDisplay(text);
          };
          requestAnimationFrame(frame);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [text]);
  return <span ref={ref}>{display}</span>;
}

// ── Segment progress bar item ─────────────────────────────────────────────────
function SegmentBar({ progress, idx, total }) {
  const scaleX = useTransform(progress, [idx / total, (idx + 1) / total], [0, 1]);
  return (
    <motion.div
      style={{ scaleX }}
      className="h-[2px] w-6 bg-white/70 origin-left rounded-full"
    />
  );
}

// ── Horizontal Scroll Categories (desktop only) ─────────────────────────────
function HorizontalCategories({ categories }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const progressMV = useMotionValue(0);
  const scrollAmountRef = useRef(0);

  // Recalculate translateX amount when track size changes
  useEffect(() => {
    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      scrollAmountRef.current = Math.max(0, track.scrollWidth - window.innerWidth + 120);
      if (containerRef.current) {
        containerRef.current.style.height = `calc(100vh + ${scrollAmountRef.current}px)`;
      }
    };
    const ro = new ResizeObserver(update);
    if (trackRef.current) ro.observe(trackRef.current);
    update();
    return () => ro.disconnect();
  }, []);

  // Update progress from scroll (works with Lenis via native scroll event dispatch)
  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      if (!container || scrollAmountRef.current === 0) return;
      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      progressMV.set(Math.max(0, Math.min(1, scrolled / totalScrollable)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [progressMV]);

  const x = useTransform(progressMV, (p) => -p * scrollAmountRef.current);
  const xSmooth = useSpring(x, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section
      ref={containerRef}
      className="relative bg-ink-950 hidden md:block"
      style={{ height: '100vh' }}
      aria-label="Áreas de atuação"
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Section header */}
        <div className="container-wide pt-16 pb-8 flex items-end justify-between flex-shrink-0">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40"
            >
              Áreas de atuação
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 font-display text-3xl md:text-5xl font-bold text-white leading-tight"
            >
              Seis áreas técnicas.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex items-center gap-3 text-white/30 text-sm"
          >
            <span>scroll para explorar</span>
            <div className="flex gap-1">
              {categories.map((_, i) => (
                <SegmentBar key={i} progress={progressMV} idx={i} total={categories.length} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Horizontal card track */}
        <div className="flex-1 flex items-center overflow-visible">
          <motion.div
            ref={trackRef}
            style={{ x: xSmooth }}
            className="flex gap-5 pl-10 hscroll-track"
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: 420, minWidth: 420, flexShrink: 0 }}
              >
                <CategoryCard category={cat} index={i} cardClass="h-[460px]" noEntrance />
              </motion.div>
            ))}
            {/* End breathing room */}
            <div style={{ width: 120, flexShrink: 0 }} />
          </motion.div>
        </div>

        {/* Bottom progress bar */}
        <div className="container-wide pb-8 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-white/50"
                style={{ scaleX: progressMV, transformOrigin: 'left' }}
              />
            </div>
            <span className="text-xs text-white/25 font-display tabular-nums">
              <motion.span>{categories.length.toString().padStart(2, '0')}</motion.span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Parallax Strip ────────────────────────────────────────────────────────────
function ParallaxStrip() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32 md:py-48">
      {/* Parallax bg image */}
      <motion.div
        className="absolute inset-[-12%] bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/slide3.JPG)', y: bgY }}
      />
      {/* Color overlay — deep cinematic */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(6,28,60,0.95) 0%, rgba(3,69,140,0.82) 45%, rgba(10,118,210,0.60) 100%)' }}
      />
      {/* Grain texture */}
      <div className="noise-overlay absolute inset-0" />

      <motion.div style={{ opacity }} className="container-wide relative text-white">
        <div className="max-w-3xl">
          <ScrollReveal>
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 backdrop-blur px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em]">
              Desenvolvimento próprio
            </span>
            <h2 className="mt-6 font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.02] text-balance">
              Sistemas de produção de água projetados e integrados internamente.
            </h2>
            <p className="mt-6 text-lg text-white/75 max-w-2xl leading-relaxed">
              Água ultrapura (Tipo I) e pura (Tipo II) com controlo eletrónico, dispensa
              programável e pré-tratamento — numa plataforma modular pensada para laboratórios,
              hospitais e indústria.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/agua" className="btn-primary">Ver Sistemas de Água</Link>
              <Link to="/produtos" className="btn-outline-light">Explorar produtos</Link>
            </div>
          </ScrollReveal>
        </div>
      </motion.div>
    </section>
  );
}

const destaque = [
  // Água
  { id: 'water-75',    name: 'WATER 75',    tag: 'Água',        summary: 'Sistema compacto Tipo I/II para laboratórios com consumo diário controlado.', image: '/assets/fotos/water75-equipment.png', link: '/agua' },
  { id: 'water-75-xl', name: 'WATER 75 XL', tag: 'Água',        summary: 'Produção até 60 L/h para rotinas intermédias. Upgrade disponível.',           image: '/assets/fotos/water75xl-equipment-cutout.png', link: '/agua' },
  { id: 'water-300',   name: 'WATER 300',   tag: 'Água',        summary: 'Topo de gama — 180 L/h para instalações de alto consumo.',                    image: '/assets/fotos/water300-equipment-cutout.png',  link: '/agua' },
  // Laboratório
  { id: 'auxilab',  name: 'Auxilab — Beakers & Frascos',  tag: 'Laboratório', summary: 'Material de vidro, recipientes e volumetria para rotina laboratorial.', image: '/assets/fotos/auxilab-beakers.jpg', link: '/material-laboratorio' },
  { id: 'chm-lab',  name: 'CHM Lab — Filtração',          tag: 'Laboratório', summary: 'Papéis de filtração quantitativos, qualitativos e especiais.',            image: '/assets/fotos/chmlab-filtracao.jpg', link: '/material-laboratorio' },
  { id: 'umura',    name: 'Umura — Biologia Molecular',   tag: 'Laboratório', summary: 'Consumíveis PCR, pipetagem e tubos esterilizados.',                       image: '/assets/logos/umura.png', link: '/material-laboratorio' },
  // Oceanografia
  { id: 'wisens-td',  name: 'WiSens TD',       tag: 'Oceanografia', summary: 'Sensor autónomo de temperatura e profundidade.',              image: '/assets/fotos/oceanografia/wisens-cover.png',              link: '/oceanografia' },
  { id: 'wisens-ctd', name: 'WiSens CTD',      tag: 'Oceanografia', summary: 'Condutividade, temperatura e pressão integrados — salinidade.', image: '/assets/fotos/oceanografia/wisens-cover.png',             link: '/oceanografia' },
  { id: 'wimo',       name: 'WiMo Sonda',      tag: 'Oceanografia', summary: 'Sonda multiparamétrica com 4–7 sensores plug-and-play.',        image: '/assets/fotos/oceanografia/wimo-overview-hd-pt.png',      link: '/oceanografia' },
  { id: 'hydrobios',  name: 'Hydrobios Rosette', tag: 'Oceanografia', summary: 'Rosettes, redes de plâncton e garrafas de amostragem marinha.', image: '/assets/fotos/hydrobios-rosette.webp',  link: '/oceanografia' },
  { id: 'wildco',     name: 'Wildco Van Dorn', tag: 'Oceanografia', summary: 'Garrafas Van Dorn para amostragem horizontal e vertical.',       image: '/assets/fotos/oceanografia/wildco-van-dorn-horizontal.jpg', link: '/oceanografia' },
  // Química
  { id: 'tubos-grafite',  name: 'Tubos de Grafite AAS',    tag: 'Química', summary: 'Gama Thermo e equivalentes para Hitachi, Agilent, PerkinElmer, Shimadzu e GBC.', image: '/assets/fotos/thermo-scientific.jpeg',        link: '/quimica/tubos-grafite' },
  { id: 'lampadas-hcl',   name: 'Lâmpadas Cátodo Oco',     tag: 'Química', summary: 'Mono e multi-elementares 37 mm / 51 mm + deutério para AAS multimarca.',       image: '/assets/fotos/lampadas/mono-37mm-p801.jpg',   link: '/quimica/lampadas' },
  { id: 'icp-consumíveis', name: 'Consumíveis ICP / ICP-MS', tag: 'Química', summary: 'Nebulizadores, tochas, câmaras e cones para 11 fabricantes.',               image: '/assets/slide4.JPG',                          link: '/quimica/icp-icpms' },
  { id: 'chns-toc',       name: 'CHN/O/S · TOC',           tag: 'Química', summary: 'Consumíveis para análise elementar e carbono orgânico.',                      image: '/assets/slide4.JPG',                          link: '/quimica/chns-toc' },

  // Drones
  { id: 'hydra-7', name: 'Hydra 7', tag: 'Drones', summary: 'Plataforma 7" modular com DJI O4 Pro — cinematografia, inspeção e vigilância.', image: '/assets/fotos/drones/taurus-x8-banner.jpg', link: '/drones' },
  // Micotoxinas
  { id: 'myco-nativos', name: 'Standards Nativos',      tag: 'Micotoxinas', summary: '50+ referências nativas para calibração em LC-MS/MS e HPLC.',         image: '/assets/slide6.JPG', link: '/micotoxinas' },
  { id: 'myco-c13',     name: 'Standards C¹³ Labeled', tag: 'Micotoxinas', summary: 'Standards fully labeled para padrão interno em análise de micotoxinas.', image: '/assets/slide6.JPG', link: '/micotoxinas' },
];

export default function Home() {
  // 12 brands for marquee-style display
  const featuredBrands = allBrands.slice(0, 18);

  return (
    <PageTransition>
      <PageMeta
        title="Laboratório, Água Ultrapura e Oceanografia"
        description="Wonderstatus — soluções para laboratório, investigação e indústria em Portugal: sistemas de água ultrapura série WATER, material de laboratório, oceanografia, química analítica e materiais de referência certificados."
        path="/"
      />
      {/* FULLSCREEN SLIDESHOW — preservado */}
      <HeroSlideshow />

      {/* Intro — dark editorial */}
      <section className="relative bg-ink-950 overflow-hidden">
        {/* Dot grid */}
        <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
        {/* Glowing mesh blobs */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[800px] h-[600px] rounded-full bg-brand-700/15 blur-[140px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-brand-900/30 blur-[90px]" />
          <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-brand-600/10 blur-[70px]" />
        </div>
        <div className="noise-overlay" aria-hidden="true" />

        <div className="container-wide py-20 md:py-32 relative">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
              Wonderstatus
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h2 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] max-w-5xl text-balance text-gradient-flow">
              Tecnologia ao serviço<br className="hidden sm:block" /> da ciência.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <p className="mt-5 text-base sm:text-lg text-white/50 max-w-2xl leading-relaxed">
              Equipamentos laboratoriais, consumíveis técnicos e sistemas de purificação de água
              para aplicações científicas, industriais e médicas.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.24} className="mt-14 md:mt-20 border-t border-white/10 pt-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10">
              {[
                { node: <CountUp to={6} />, label: 'Áreas técnicas' },
                { node: <CountUp to={25} suffix="+" />, label: 'Marcas parceiras' },
                { node: <CountUp to={2000} suffix="+" />, label: 'Referências em catálogo' },
                { node: <ScrambleText text="I · II" />, label: 'Tipos de água ultrapura' },
              ].map((stat) => (
                <div key={stat.label} className="group">
                  <p className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-none group-hover:text-brand-300 transition-colors duration-500">{stat.node}</p>
                  <p className="mt-2 text-xs sm:text-sm text-white/40 tracking-wide leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── HORIZONTAL SCROLL CATEGORIES (desktop) ── */}
      <HorizontalCategories categories={categories} />

      {/* ── MOBILE SWIPE CATEGORIES ── */}
      <section className="bg-ink-950 pb-10 md:hidden">
        <div className="px-5 pt-10 pb-4 flex items-end justify-between">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Áreas de atuação
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">Seis áreas.</h2>
          </div>
          <span className="text-white/30 text-xs flex items-center gap-1">arraste →</span>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hidden px-5 pb-2">
          {categories.map((cat, i) => (
            <div key={cat.slug} className="w-[280px] shrink-0">
              <CategoryCard category={cat} index={i} cardClass="h-64" noEntrance />
            </div>
          ))}
        </div>
      </section>

      {/* Produtos em destaque — carousel horizontal */}
      <section className="section bg-gradient-to-b from-brand-50/30 to-white">
        <div className="container-wide">
          <SectionHead
            kicker="Produtos em Destaque"
            title="Gamas e equipamentos de cada área"
            description="Arraste ou use as setas para explorar produtos representativos de todas as áreas técnicas Wonderstatus."
          />
          <div className="mt-10 md:mt-12">
            <InfiniteCarousel items={destaque} speed={38} />
            <div className="mt-6 text-center">
              <Link to="/produtos" className="btn-ghost">
                Ver catálogo completo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARALLAX FEATURE STRIP ── */}
      <ParallaxStrip />

      {/* Porquê Wonderstatus — editorial bento */}
      <section className="section bg-gradient-to-b from-white to-brand-50/40">
        <div className="container-wide">
          <ScrollReveal>
            <span className="eyebrow">Diferenciação</span>
            <h2 className="mt-4 section-title max-w-2xl">
              Porquê escolher a Wonderstatus?
            </h2>
            <p className="mt-4 text-lg text-ink-600 leading-relaxed max-w-2xl">
              Mais do que um distribuidor — um parceiro técnico que desenvolve, integra e suporta
              cada solução do início ao fim.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                num: '01',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" /><path d="M15.54 8.46a5 5 0 010 7.07M8.46 8.46a5 5 0 000 7.07" />
                  </svg>
                ),
                title: 'Desenvolvimento Próprio',
                description: 'Design, eletrónica e impressão 3D internos. Criamos equipamentos que o mercado não tem.',
                accent: 'from-brand-600 to-brand-500',
              },
              {
                num: '02',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                ),
                title: 'Integração Total',
                description: 'Eletrónica, software e engenharia mecânica num só ponto de responsabilidade.',
                accent: 'from-brand-500 to-brand-400',
              },
              {
                num: '03',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                ),
                title: 'Suporte Especializado',
                description: 'Equipa técnica que seleciona o consumível certo por equipamento, método e aplicação.',
                accent: 'from-brand-700 to-brand-600',
              },
              {
                num: '04',
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                ),
                title: 'Catálogo Extenso',
                description: 'Mais de 2 000 referências de 25+ fabricantes, cobrindo química, oceanografia, água e drones.',
                accent: 'from-brand-600 to-brand-500',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.num} delay={i * 0.08}>
                <div className="group relative rounded-3xl border border-ink-100 bg-white shadow-soft p-7 hover:-translate-y-1.5 hover:shadow-glow transition-all duration-500 h-full flex flex-col">
                  <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${item.accent} grid place-items-center text-white group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                    {item.icon}
                  </div>
                  <span className="absolute top-5 right-5 font-display text-[11px] font-bold text-ink-200 tracking-[0.3em]">{item.num}</span>
                  <h3 className="mt-5 font-display text-base font-bold text-ink-900 leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-500 leading-relaxed flex-1">{item.description}</p>
                  <div className="mt-5 h-[2px] w-0 bg-gradient-to-r from-brand-500 to-brand-300 rounded-full group-hover:w-full transition-all duration-500" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brands marquee — dual row */}
      <section className="section relative overflow-hidden">
        <div className="container-wide">
          <SectionHead
            kicker="Marcas parceiras"
            title="Uma rede internacional de fabricantes e fornecedores."
            description="Trabalhamos com fabricantes de referência em química analítica, oceanografia e material de laboratório."
          />
        </div>
        <div className="mt-10 md:mt-12 space-y-4 relative" aria-hidden="true">
          {/* Row 1 — left */}
          <div className="mask-fade-sides overflow-hidden">
            <div className="marquee-track flex gap-6" style={{ animationDuration: '38s', width: 'max-content' }}>
              {[...allBrands, ...allBrands].map((brand, i) => (
                <div
                  key={`r1-${brand.id}-${i}`}
                  className="h-20 w-40 flex-shrink-0 grid place-items-center rounded-2xl bg-white border border-ink-100 shadow-soft"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-14 max-w-[75%] object-contain opacity-75 hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Row 2 — right (reverse direction) */}
          <div className="mask-fade-sides overflow-hidden">
            <div className="marquee-track-reverse flex gap-6" style={{ animationDuration: '50s', width: 'max-content' }}>
              {[...allBrands.slice(15), ...allBrands.slice(0, 15), ...allBrands.slice(15), ...allBrands.slice(0, 15)].map((brand, i) => (
                <div
                  key={`r2-${brand.id}-${i}`}
                  className="h-20 w-40 flex-shrink-0 grid place-items-center rounded-2xl bg-white border border-ink-100 shadow-soft"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-14 max-w-[75%] object-contain opacity-75 hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container-wide mt-12 text-center">
          <Link to="/marcas" className="btn-ghost">
            Ver todas as marcas
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14m-6-6 6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>

      <ContactCTA />
    </PageTransition>
  );
}
