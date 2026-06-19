import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MotionLink = motion(Link);

const oceanSubItems = [
  { to: '/oceanografia/nke', label: 'Sondas e Data Loggers', sub: 'NKE Instruments' },
  { to: '/oceanografia/hydrobios', label: 'Amostragem Oceanográfica', sub: 'Hydrobios · WildCo' },
  { to: '/oceanografia/seaber', label: 'Micro-AUVs Subaquáticos', sub: 'Seaber' },
  { to: '/oceanografia/northlift', label: 'Guinchos de Campo', sub: 'NorthLift' },
  { to: '/oceanografia/wildco', label: 'Garrafas Van Dorn', sub: 'WildCo' },
  { to: '/oceanografia/general-oceanics', label: 'Instrumentação Clássica', sub: 'General Oceanics' },
  { to: '/oceanografia/aquatic-biotechnology', label: 'Tecnologias Aquáticas', sub: 'Aquatic-Biotechnology' },
  { to: '/oceanografia/kc-denmark', label: 'Amostragem · Investigação', sub: 'KC-Denmark' },
  { to: '/oceanografia/osil', label: 'Observação Oceânica', sub: 'Osil' },
];

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/material-laboratorio', label: 'Laboratório' },
  { to: '/oceanografia', label: 'Oceanografia', dropdown: oceanSubItems },
  { to: '/agua', label: 'Água' },
  { to: '/quimica', label: 'Química' },
  { to: '/drones', label: 'Drones' },
  { to: '/micotoxinas', label: 'Micotoxinas' },
  { to: '/produtos', label: 'Produtos' },
  { to: '/sobre', label: 'Sobre / Contactos' },
];

const mobileSections = [
  {
    label: 'Áreas de atuação',
    items: navItems.slice(1, 7)
  },
  {
    label: 'Catálogo',
    items: [navItems[7], { to: '/materiais-referencia', label: 'Mat. Referência' }]
  },
  {
    label: 'Empresa',
    items: [navItems[0], navItems[8]]
  }
];

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-30 shrink-0">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Navbar({ onSearchOpen, barVisible = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const dropdownTimerRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const openDropdown = (label) => {
    clearTimeout(dropdownTimerRef.current);
    setActiveDropdown(label);
  };
  const closeDropdown = () => {
    dropdownTimerRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const shouldBeSolid = scrolled || !isHome;

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 z-40 transition-all duration-500 ${barVisible ? 'top-10' : 'top-0'} ${
          shouldBeSolid
            ? 'bg-white/85 backdrop-blur-lg border-b border-ink-100 shadow-[0_2px_20px_rgba(10,44,85,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-wide flex h-16 md:h-20 items-center justify-between">
          <Link to="/" className="flex items-center group" aria-label="Wonderstatus — Home">
            <img
              src="/assets/logos/wonderstatus-logo.png"
              alt="Wonderstatus"
              className={`h-8 md:h-9 w-auto transition-all duration-500 ${
                shouldBeSolid ? '' : '[filter:brightness(0)_invert(1)]'
              }`}
            />
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {[...navItems.slice(1, 8), { to: '/materiais-referencia', label: 'Mat. Ref.' }].map((item) => (
              <li
                key={item.to}
                className="relative"
                onMouseEnter={() => item.dropdown && openDropdown(item.label)}
                onMouseLeave={() => item.dropdown && closeDropdown()}
              >
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      className={`relative flex items-center gap-1 px-2.5 py-1.5 text-[13px] font-semibold rounded-full transition-all duration-300 whitespace-nowrap ${
                        location.pathname.startsWith('/oceanografia')
                          ? shouldBeSolid
                            ? 'text-brand-700 bg-brand-50'
                            : 'text-white bg-white/20'
                          : shouldBeSolid
                          ? 'text-ink-700 hover:text-brand-700 hover:bg-brand-50/60'
                          : 'text-white/85 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                      <svg
                        width="12" height="12" viewBox="0 0 24 24" fill="none"
                        className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                      >
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          key="dropdown"
                          initial={{ opacity: 0, y: -6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                          onMouseEnter={() => clearTimeout(dropdownTimerRef.current)}
                          onMouseLeave={closeDropdown}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl shadow-[0_8px_40px_rgba(10,44,85,0.15)] border border-ink-100 overflow-hidden z-50"
                        >
                          <div className="py-1.5">
                            <p className="px-4 pt-2.5 pb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400">
                              Oceanografia — Áreas
                            </p>
                            {item.dropdown.map((sub) => (
                              <NavLink
                                key={sub.to}
                                to={sub.to}
                                onClick={() => setActiveDropdown(null)}
                                className={({ isActive }) =>
                                  `flex flex-col px-4 py-2.5 transition-colors border-l-2 mx-1.5 rounded-lg ${
                                    isActive
                                      ? 'bg-brand-50 border-brand-400 text-brand-700'
                                      : 'border-transparent hover:bg-ink-50 hover:border-ink-200 text-ink-800'
                                  }`
                                }
                              >
                                <span className="text-[13px] font-semibold leading-tight">{sub.label}</span>
                                <span className="text-[11px] text-ink-400 mt-0.5">{sub.sub}</span>
                              </NavLink>
                            ))}
                            <div className="mt-1.5 mx-1.5 mb-1.5 border-t border-ink-50 pt-1.5">
                              <NavLink
                                to="/oceanografia"
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-center justify-between px-4 py-2 rounded-lg text-[12px] font-semibold text-brand-600 hover:bg-brand-50 transition-colors"
                              >
                                Ver toda a área Oceanografia
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                  <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </NavLink>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `relative px-2.5 py-1.5 text-[13px] font-semibold rounded-full transition-all duration-300 whitespace-nowrap ${
                        isActive
                          ? shouldBeSolid
                            ? 'text-brand-700 bg-brand-50'
                            : 'text-white bg-white/20'
                          : shouldBeSolid
                          ? 'text-ink-700 hover:text-brand-700 hover:bg-brand-50/60'
                          : 'text-white/85 hover:text-white hover:bg-white/10'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-2">
            <button
              type="button"
              onClick={onSearchOpen}
              title="Pesquisar (Ctrl+K)"
              className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-300 ${
                shouldBeSolid
                  ? 'text-ink-500 hover:text-brand-700 bg-ink-50 hover:bg-brand-50'
                  : 'text-white/80 hover:text-white bg-white/10 hover:bg-white/20'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden xl:inline">Pesquisar</span>
              <span className={`hidden xl:inline text-[11px] font-mono rounded px-1.5 py-0.5 ${
                shouldBeSolid ? 'bg-ink-100 text-ink-400' : 'bg-white/15 text-white/60'
              }`}>⌘K</span>
            </button>
            <NavLink
              to="/sobre"
              className={({ isActive }) =>
                `text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? shouldBeSolid
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-white bg-white/20'
                    : shouldBeSolid
                    ? 'text-ink-700 hover:text-brand-700 hover:bg-brand-50/60'
                    : 'text-white/85 hover:text-white hover:bg-white/10'
                }`
              }
            >
              Sobre / Contactos
            </NavLink>
            <motion.button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
              whileTap={{ scale: 0.95, transition: { duration: 0.08 } }}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                shouldBeSolid
                  ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-soft hover:shadow-glow'
                  : 'bg-white text-brand-700 hover:bg-white/90'
              }`}
            >
              Pedir informação
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <motion.button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            whileTap={{ scale: 0.9, transition: { duration: 0.08 } }}
            className={`lg:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full transition-all duration-300 ${
              shouldBeSolid ? 'bg-brand-50 text-ink-900' : 'bg-white/10 backdrop-blur text-white'
            }`}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <span
              className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${
                mobileOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-opacity duration-300 ${
                mobileOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${
                mobileOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile drawer — full-screen panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-30 bg-ink-950/30 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key="drawer"
              className={`fixed ${barVisible ? 'top-26 md:top-30' : 'top-16 md:top-20'} inset-x-0 bottom-0 z-40 lg:hidden flex flex-col bg-white`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Scrollable nav sections */}
              <div className="flex-1 overflow-y-auto overscroll-contain divide-y divide-ink-50">
                {mobileSections.map((section) => (
                  <div key={section.label}>
                    <p className="px-6 pt-5 pb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-ink-400">
                      {section.label}
                    </p>
                    <ul>
                      {section.items.map((item) => (
                        <li key={item.to}>
                          {item.dropdown ? (
                            <>
                              <button
                                type="button"
                                onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                                className={`w-full flex items-center justify-between px-6 py-[14px] text-[15px] font-semibold transition-colors border-l-2 ${
                                  location.pathname.startsWith('/oceanografia')
                                    ? 'text-brand-700 bg-brand-50 border-brand-500'
                                    : 'text-ink-800 border-transparent hover:bg-ink-50 hover:border-ink-200'
                                }`}
                              >
                                {item.label}
                                <svg
                                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                                  className={`transition-transform duration-200 opacity-40 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                                >
                                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                              <AnimatePresence>
                                {mobileExpanded === item.label && (
                                  <motion.ul
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                    className="overflow-hidden bg-ink-50/60"
                                  >
                                    {item.dropdown.map((sub) => (
                                      <li key={sub.to}>
                                        <NavLink
                                          to={sub.to}
                                          className={({ isActive }) =>
                                            `flex flex-col pl-10 pr-6 py-3 border-l-2 transition-colors ${
                                              isActive
                                                ? 'text-brand-700 bg-brand-50 border-brand-400'
                                                : 'text-ink-700 border-transparent hover:bg-white hover:border-ink-200'
                                            }`
                                          }
                                        >
                                          <span className="text-[13px] font-semibold leading-tight">{sub.label}</span>
                                          <span className="text-[11px] text-ink-400 mt-0.5">{sub.sub}</span>
                                        </NavLink>
                                      </li>
                                    ))}
                                    <li>
                                      <NavLink
                                        to="/oceanografia"
                                        className={({ isActive }) =>
                                          `flex items-center gap-2 pl-10 pr-6 py-3 text-[12px] font-semibold transition-colors border-l-2 ${
                                            isActive && location.pathname === '/oceanografia'
                                              ? 'text-brand-700 bg-brand-50 border-brand-400'
                                              : 'text-brand-600 border-transparent hover:bg-white'
                                          }`
                                        }
                                      >
                                        Ver toda a área
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                                          <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                      </NavLink>
                                    </li>
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </>
                          ) : (
                            <NavLink
                              to={item.to}
                              className={({ isActive }) =>
                                `flex items-center justify-between px-6 py-[14px] text-[15px] font-semibold transition-colors border-l-2 ${
                                  isActive
                                    ? 'text-brand-700 bg-brand-50 border-brand-500'
                                    : 'text-ink-800 border-transparent hover:bg-ink-50 hover:border-ink-200'
                                }`
                              }
                            >
                              {item.label}
                              <ChevronRight />
                            </NavLink>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Bottom actions — always visible */}
              <div className="px-5 py-4 bg-white border-t border-ink-100 shadow-[0_-4px_20px_rgba(10,44,85,0.08)] flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => { setMobileOpen(false); onSearchOpen?.(); }}
                  className="flex items-center justify-center gap-2 w-full rounded-full border border-ink-200 bg-ink-50 text-ink-700 font-semibold py-3 text-sm hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Pesquisar no site
                </button>
                <motion.button
                  type="button"
                  onClick={() => { window.dispatchEvent(new CustomEvent('open-contact-modal')); setMobileOpen(false); }}
                  whileTap={{ scale: 0.96, transition: { duration: 0.08 } }}
                  className="btn-primary w-full justify-center"
                >
                  Pedir informação
                </motion.button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
