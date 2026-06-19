import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

export default function NotFound() {
  return (
    <PageTransition>
      <section className="min-h-screen grid place-items-center pt-24 pb-24">
        <div className="container-wide text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Página não encontrada
          </p>
          <h1 className="mt-4 font-display text-6xl md:text-8xl font-bold text-ink-900">404</h1>
          <p className="mt-4 text-lg text-ink-700 max-w-xl mx-auto">
            A página que procura não existe ou foi movida. Pode voltar à página inicial ou explorar
            as áreas principais.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/" className="btn-primary">
              Voltar à página inicial
            </Link>
            <Link to="/sobre" className="btn-ghost">
              Contactar
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
