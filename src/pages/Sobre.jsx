import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import SectionHead from '../components/SectionHead';
import ScrollReveal from '../components/ScrollReveal';
import PageTransition from '../components/PageTransition';
import AnimatedCounter from '../components/AnimatedCounter';
import { contact } from '../data/contact';

const storyCards = [
  {
    title: 'O que fazemos',
    intro: 'Fornecimento de:',
    list: [
      'Equipamentos laboratoriais',
      'Consumíveis técnicos e científicos',
      'Sistemas de purificação de água',
      'Soluções personalizadas para aplicações específicas'
    ],
    outro: 'Seleção técnica ajustada à aplicação laboratorial.'
  },
  {
    title: 'Especialização em sistemas de água',
    intro: 'Projeto e desenvolvimento de sistemas de purificação de água ajustados à aplicação. Produção de:',
    list: [
      'Água ultrapura (Tipo I)',
      'Água pura (Tipo II)'
    ],
    outro: 'Aplicações: Laboratórios · Indústria · Ambientes técnicos especializados.'
  },
  {
    title: 'Diferenciação',
    intro: 'Integração de tecnologia e desenvolvimento técnico:',
    list: [
      'Desenvolvimento próprio de equipamentos',
      'Integração de eletrónica, software e engenharia',
      'Soluções standard e personalizadas',
      'Acompanhamento técnico especializado'
    ]
  },
  {
    title: 'Compromisso',
    intro:
      'Soluções fiáveis e ajustadas à necessidade do cliente.',
    outro: 'Foco em eficiência e consistência operacional.'
  }
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { Nome: 100, Empresa: 150, Email: 254, Telefone: 30, Mensagem: 3000 };

export default function Sobre() {
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const lastSubmit = useRef(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side rate limit: 30 s entre submissões
    const now = Date.now();
    if (now - lastSubmit.current < 30_000) {
      setStatus({ state: 'error', message: 'Por favor aguarde 30 segundos antes de enviar novamente.' });
      return;
    }

    setSubmitting(true);
    setStatus({ state: 'idle', message: '' });

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot
    if (data.get('_honey')) { setSubmitting(false); return; }

    const nome     = data.get('Nome')?.trim().slice(0, LIMITS.Nome) ?? '';
    const empresa  = data.get('Empresa')?.trim().slice(0, LIMITS.Empresa) ?? '';
    const email    = data.get('Email')?.trim().slice(0, LIMITS.Email) ?? '';
    const telefone = data.get('Telefone')?.trim().slice(0, LIMITS.Telefone) ?? '';
    const mensagem = data.get('Mensagem')?.trim().slice(0, LIMITS.Mensagem) ?? '';

    // Validação manual (o form tem noValidate)
    if (!nome) {
      setStatus({ state: 'error', message: 'Por favor indique o seu nome.' });
      setSubmitting(false);
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setStatus({ state: 'error', message: 'Por favor indique um email válido.' });
      setSubmitting(false);
      return;
    }
    if (!mensagem) {
      setStatus({ state: 'error', message: 'Por favor escreva uma mensagem.' });
      setSubmitting(false);
      return;
    }

    const payload = {
      Nome: nome,
      Empresa: empresa || '—',
      Email: email,
      Telefone: telefone || '—',
      Mensagem: mensagem,
      _subject: contact.subject,
      _template: 'table',
      _replyto: email,
      _captcha: 'false',
      Origem: window.location.pathname
    };

    try {
      const res = await fetch(contact.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('network');
      lastSubmit.current = Date.now();
      setStatus({ state: 'success', message: contact.successMessage });
      form.reset();
    } catch (_err) {
      setStatus({
        state: 'error',
        message: 'Não foi possível enviar o pedido neste momento. Tente novamente ou envie email para ' + contact.email + '.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <PageHeader
        kicker="Wonderstatus"
        title="Sobre Nós / Contactos"
        subtitle={`${contact.companyName}. ${contact.business}, com atuação nas áreas de laboratório, equipamentos, consumíveis e sistemas de tratamento e purificação de água.`}
        image="/assets/slide4.JPG"
        actions={[
          { label: 'Pedir informação', href: '#formulario-contacto' },
          { label: 'Ver contactos', href: '#contactos', ghost: true }
        ]}
      />

      {/* Numbers / trust */}
      <section className="py-12 md:py-16 border-b border-ink-100">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {[
              { value: '6', label: 'Áreas técnicas', sub: 'Laboratório · Água · Química · Oceanografia · Drones · Micotoxinas' },
              { value: '25+', label: 'Marcas parceiras', sub: 'Fabricantes internacionais de referência' },
              { value: '100%', label: 'Desenvolvimento próprio', sub: 'Eletrónica · software · engenharia integrada' },
              { value: '20+', label: 'Anos de experiência', sub: 'Conhecimento técnico acumulado no sector' }
            ].map((item, idx) => (
              <ScrollReveal
                key={item.label}
                delay={idx * 0.08}
                className="text-center"
              >
                <AnimatedCounter
                  value={item.value}
                  className="block font-display text-4xl md:text-6xl font-bold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent"
                />
                <p className="mt-2 font-semibold text-ink-900 text-sm md:text-base">{item.label}</p>
                <p className="mt-1 text-xs text-ink-500">{item.sub}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section className="section" id="sobre">
        <div className="container-wide">
          <SectionHead
            kicker="Sobre Nós"
            title="Sobre a Wonderstatus"
            description="Fornecimento de equipamentos, consumíveis e soluções técnicas para laboratórios nas áreas científica, industrial e médica."
          />
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 gap-6">
            {storyCards.map((card, idx) => (
              <ScrollReveal
                key={card.title}
                delay={idx * 0.08}
                className="rounded-3xl bg-white border border-ink-100 shadow-soft p-8 card-hover"
              >
                <h3 className="font-display text-2xl font-bold text-ink-900">{card.title}</h3>
                {card.intro && (
                  <p className="mt-3 text-ink-700 leading-relaxed">{card.intro}</p>
                )}
                {card.list && (
                  <ul className="mt-4 space-y-2 text-ink-700">
                    {card.list.map((li) => (
                      <li key={li} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {card.outro && (
                  <p className="mt-4 text-ink-700 leading-relaxed">{card.outro}</p>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contactos */}
      <section className="section" id="contactos">
        <div className="container-wide">
          <SectionHead
            kicker="Contactos"
            title="Informação institucional e canais de contacto"
            description="Contactos principais para pedidos de informação, contacto comercial e apoio técnico."
          />

          <div className="mt-8 md:mt-10 grid lg:grid-cols-3 gap-6">
            <ScrollReveal className="rounded-3xl bg-gradient-to-br from-brand-700 to-brand-500 text-white p-8 shadow-glow">
              <p className="text-xs uppercase tracking-widest text-white/70 font-semibold">
                Empresa
              </p>
              <h3 className="mt-3 font-display text-xl font-bold">{contact.companyName}</h3>
              <p className="mt-2 text-white/85 leading-relaxed">{contact.business}</p>
              <div className="mt-6 space-y-1 text-sm text-white/85">
                {contact.addressLines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal
              delay={0.1}
              className="rounded-3xl bg-white border border-ink-100 shadow-soft p-8 card-hover"
            >
              <p className="text-xs uppercase tracking-widest text-brand-600 font-semibold">
                Email
              </p>
              <a
                href={contact.emailHref}
                className="mt-3 block font-display text-xl font-bold text-ink-900 hover:text-brand-700 transition-colors break-all"
              >
                {contact.email}
              </a>

              <p className="mt-6 text-xs uppercase tracking-widest text-brand-600 font-semibold">
                Telefone
              </p>
              <a
                href={contact.phoneHref}
                className="mt-3 block font-display text-xl font-bold text-ink-900 hover:text-brand-700 transition-colors"
              >
                {contact.phone}
              </a>
            </ScrollReveal>

            <ScrollReveal
              delay={0.2}
              className="rounded-3xl bg-white border border-ink-100 shadow-soft p-8 card-hover"
            >
              <p className="text-xs uppercase tracking-widest text-brand-600 font-semibold">
                Horário
              </p>
              <p className="mt-3 text-ink-800 font-semibold leading-relaxed">
                {contact.hours.weekdays}
              </p>
              <p className="mt-2 text-sm text-ink-600">{contact.hours.weekends}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="section" id="localizacao">
        <div className="container-wide">
          <SectionHead
            kicker="Localização"
            title="A nossa localização"
            description="Morada, mapa e acesso direto ao Google Maps."
          />

          <div className="mt-8 md:mt-10 grid lg:grid-cols-5 gap-6">
            <ScrollReveal className="lg:col-span-2 rounded-3xl bg-white border border-ink-100 shadow-soft p-8">
              <p className="text-xs uppercase tracking-widest text-brand-600 font-semibold">
                Onde estamos
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-ink-900">Wonderstatus</h3>
              <address className="mt-4 not-italic text-ink-700 leading-relaxed">
                {contact.addressLines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </address>
              <p className="mt-4 text-sm text-ink-600 leading-relaxed">
                Localização no Mercado Municipal de Sabrosa, com mapa interativo.
              </p>
              <a
                className="mt-6 btn-primary"
                href={contact.mapLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir no Google Maps
              </a>
            </ScrollReveal>

            <ScrollReveal
              delay={0.15}
              className="lg:col-span-3 rounded-3xl overflow-hidden border border-ink-100 shadow-soft bg-white"
            >
              <iframe
                title="Mapa da localização da Wonderstatus"
                src={contact.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin"
                className="w-full h-[420px]"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section className="section" id="formulario-contacto">
        <div className="container-wide">
          <SectionHead
            kicker="Formulário"
            title="Pedir Informação"
            description="Formulário para pedidos sobre equipamentos, consumíveis e sistemas de água."
          />

          <div className="mt-8 md:mt-10 grid lg:grid-cols-5 gap-6">
            <ScrollReveal className="lg:col-span-3 rounded-3xl bg-white border border-ink-100 shadow-soft p-8 md:p-10">
              <p className="text-xs uppercase tracking-widest text-brand-600 font-semibold">
                Formulário Central
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-ink-900">
                Envie a sua mensagem
              </h3>
              <p className="mt-2 text-ink-600">
                O pedido é enviado para o email geral da Wonderstatus com a origem do contacto.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Nome" name="Nome" required autoComplete="name" />
                  <Field
                    label="Empresa (opcional)"
                    name="Empresa"
                    autoComplete="organization"
                  />
                  <Field
                    label="Email"
                    name="Email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                  <Field
                    label="Telefone (opcional)"
                    name="Telefone"
                    type="tel"
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink-800 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    name="Mensagem"
                    required
                    rows={6}
                    maxLength={3000}
                    className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                  />
                </div>
                {/* honeypot */}
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                {status.state !== 'idle' && (
                  <div
                    className={`rounded-xl p-4 text-sm font-medium ${
                      status.state === 'success'
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                        : 'bg-red-50 border border-red-200 text-red-800'
                    }`}
                    role="status"
                  >
                    {status.message}
                  </div>
                )}

                <div className="flex items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-ink-500">
                    Campos obrigatórios devem ser preenchidos antes do envio.
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'A enviar…' : 'Enviar'}
                  </button>
                </div>
              </form>
            </ScrollReveal>

            <ScrollReveal
              delay={0.15}
              className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-ink-900 via-ink-950 to-brand-900 text-white p-8 md:p-10 shadow-glow"
            >
              <p className="text-xs uppercase tracking-widest text-white/60 font-semibold">
                Fluxo Centralizado
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold">Contacto centralizado</h3>
              <p className="mt-3 text-white/80 leading-relaxed">
                Informação institucional e formulário num único ponto de contacto.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/85">
                {[
                  `Envio direto para ${contact.email}`,
                  'Pedidos sobre laboratório, equipamentos, consumíveis e equipamentos de água ultrapura',
                  'Identificação da origem do pedido sempre que disponível',
                  'Fluxo de contacto consistente'
                ].map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-300 flex-shrink-0" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-xs uppercase tracking-widest text-white/60">Ou contacte</p>
                <a
                  href={contact.emailHref}
                  className="mt-2 block font-semibold hover:text-brand-200 transition-colors"
                >
                  {contact.email}
                </a>
                <a
                  href={contact.phoneHref}
                  className="mt-1 block font-semibold hover:text-brand-200 transition-colors"
                >
                  {contact.phone}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Avaliação do site ── */}
      <section className="section" id="avaliacao">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <SectionHead
                kicker="A sua opinião"
                title="Avalie o nosso site"
                description="Diga-nos o que pensa e deixe sugestões para melhorarmos. O feedback é anónimo e ajuda-nos diretamente."
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="mt-8 md:mt-10">
              <FeedbackForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

const STAR_LABELS = ['', 'Fraco', 'Razoável', 'Bom', 'Muito bom', 'Excelente'];

function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [phase, setPhase] = useState('form'); // 'form' | 'sending' | 'done'
  const formRef = useRef(null);
  const lastSubmit = useRef(0);

  const active = hovered || rating;

  const submit = async (e) => {
    e.preventDefault();
    if (rating === 0) return;
    if (Date.now() - lastSubmit.current < 60_000) return;
    setPhase('sending');
    try {
      await fetch(contact.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Avaliação do site — ${STAR_LABELS[rating]} (${rating}/5)`,
          _template: 'table',
          _captcha: 'false',
          Nome: name.trim().slice(0, 100) || '(anónimo)',
          Avaliação: `${rating}/5 — ${STAR_LABELS[rating]}`,
          Sugestões: comment.trim().slice(0, 1000) || '(sem comentário)',
          Origem: window.location.pathname
        })
      });
      lastSubmit.current = Date.now();
    } catch (_) { /* silencioso */ }
    setPhase('done');
  };

  const reset = () => {
    setRating(0);
    setComment('');
    setName('');
    setPhase('form');
  };

  if (phase === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl bg-gradient-to-br from-brand-50 to-white border border-ink-100 shadow-soft p-10 text-center"
      >
        <div className="text-5xl mb-4">🙏</div>
        <h3 className="font-display text-2xl font-bold text-ink-900">Obrigado pelo feedback!</h3>
        <p className="mt-2 text-ink-600">A sua avaliação foi enviada com sucesso.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors underline underline-offset-2"
        >
          Enviar outra avaliação
        </button>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} className="rounded-3xl bg-white border border-ink-100 shadow-soft p-8 md:p-10 space-y-7">

      {/* Estrelas */}
      <div>
        <p className="text-sm font-semibold text-ink-800 mb-4">Classificação geral</p>
        <div className="flex gap-2 sm:gap-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setRating(s)}
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(0)}
              className="flex flex-col items-center gap-1 group focus:outline-none"
              aria-label={`${s} estrelas — ${STAR_LABELS[s]}`}
            >
              <span className={`text-4xl sm:text-5xl leading-none transition-transform duration-150 group-hover:scale-110 ${s <= active ? 'text-amber-400' : 'text-ink-200'}`}>
                ★
              </span>
            </button>
          ))}
          <div className="ml-3 flex items-center">
            <AnimatePresence mode="wait">
              {active > 0 && (
                <motion.span
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="text-sm font-semibold text-amber-500"
                >
                  {STAR_LABELS[active]}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
        {rating === 0 && (
          <p className="mt-2 text-xs text-ink-400">Selecione uma classificação para continuar</p>
        )}
      </div>

      {/* Nome (opcional) */}
      <div>
        <label className="block text-sm font-semibold text-ink-800 mb-2">
          Nome <span className="font-normal text-ink-400">(opcional)</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="O seu nome ou empresa"
          maxLength={100}
          className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent placeholder:text-ink-400"
        />
      </div>

      {/* Sugestões */}
      <div>
        <label className="block text-sm font-semibold text-ink-800 mb-2">
          Sugestões e comentários <span className="font-normal text-ink-400">(opcional)</span>
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="O que podemos melhorar? Falta algum produto, informação ou funcionalidade?"
          rows={5}
          maxLength={1000}
          className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent placeholder:text-ink-400"
        />
      </div>

      <button
        type="submit"
        disabled={rating === 0 || phase === 'sending'}
        className="btn-primary disabled:opacity-40 disabled:cursor-default w-full sm:w-auto"
      >
        {phase === 'sending' ? 'A enviar…' : 'Enviar avaliação'}
      </button>
    </form>
  );
}

const FIELD_MAX = { Nome: 100, Empresa: 150, Email: 254, Telefone: 30 };

function Field({ label, name, type = 'text', required, autoComplete }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink-800 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        maxLength={FIELD_MAX[name] ?? 200}
        className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
      />
    </div>
  );
}
