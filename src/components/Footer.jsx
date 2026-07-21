import { Link } from 'react-router-dom';
import { contact } from '../data/contact';
import { categories } from '../data/categories';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 bg-gradient-to-b from-ink-900 via-ink-950 to-ink-950 text-white/80 overflow-hidden">
      {/* Decorative gradient blobs */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-24 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-brand-700/20 blur-3xl"
      />

      <div className="relative container-wide py-20">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" aria-label="Wonderstatus — Home">
              <img
                src="/assets/logos/wonderstatus-logo.png"
                alt="Wonderstatus"
                className="h-10 w-auto [filter:brightness(0)_invert(1)]"
              />
            </Link>
            <p className="mt-5 text-white/70 leading-relaxed max-w-sm">
              {contact.business}. Equipamentos laboratoriais, consumíveis e sistemas de purificação
              de água para aplicações científicas, industriais e médicas.
            </p>

            <div className="mt-6 space-y-2 text-sm text-white/70">
              <p className="font-semibold text-white">{contact.companyName}</p>
              {contact.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          {/* Áreas */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-display text-sm font-semibold uppercase tracking-[0.18em]">
              Áreas
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/${c.slug}`}
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    {c.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/produtos" className="text-white/75 hover:text-white">
                  Produtos e Consumíveis
                </Link>
              </li>
              <li>
                <Link to="/marcas" className="text-white/75 hover:text-white">
                  Marcas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contactos */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-display text-sm font-semibold uppercase tracking-[0.18em]">
              Contactos
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-white/80">
              <li>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Email</p>
                <a
                  href={contact.emailHref}
                  className="hover:text-white transition-colors font-medium"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Telefone</p>
                <a
                  href={contact.phoneHref}
                  className="hover:text-white transition-colors font-medium"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Horário</p>
                <p className="leading-relaxed">{contact.hours.weekdays}</p>
                <p className="leading-relaxed text-white/60">{contact.hours.weekends}</p>
              </li>
            </ul>

            <Link
              to="/sobre#formulario-contacto"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-all hover:-translate-y-0.5"
            >
              Pedir informação
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
        </div>

        <div className="mt-10 md:mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between text-xs text-white/50">
          <p>
            © {year} {contact.companyName}. Todos os direitos reservados.
          </p>
          <div className="flex gap-5">
            <a
              href={contact.mapLink}
              target="_blank" rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Google Maps
            </a>
            <Link to="/sobre" className="hover:text-white transition-colors">
              Sobre Nós
            </Link>
            <Link to="/politica-privacidade" className="hover:text-white transition-colors">
              Política de Privacidade
            </Link>
            <a
              href="https://www.livroreclamacoes.pt/"
              target="_blank" rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Livro de Reclamações
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
