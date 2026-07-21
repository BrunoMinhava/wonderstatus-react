import { useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const TABS = [
  { to: '/quimica/icp-icpms',     label: 'ICP / ICP-MS' },
  { to: '/quimica/chns-toc',      label: 'CHN/O/S · TOC' },
  { to: '/quimica/lampadas',      label: 'Lâmpadas' },
  { to: '/quimica/tubos-grafite', label: 'Tubos de Grafite' },
  { to: '/quimica',               label: 'Padrões Analíticos', exact: true },
];

export default function QuimicaTabRail() {
  const railRef = useRef(null);
  const { pathname } = useLocation();

  return (
    <div className="sticky top-14 md:top-[4.5rem] z-30 bg-white/95 backdrop-blur-md border-b border-ink-100 shadow-sm">
      <div className="container-wide">
        <div ref={railRef} className="overflow-x-auto scrollbar-none">
          <div className="flex gap-2 min-w-max py-3 px-1">
            {TABS.map((tab) => {
              const isActive = tab.exact
                ? pathname === tab.to
                : pathname.startsWith(tab.to);
              return (
                <NavLink
                  key={tab.to}
                  to={tab.to}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-soft'
                      : 'bg-white border border-ink-200 text-ink-600 hover:border-brand-400 hover:text-brand-700 hover:bg-brand-50'
                  }`}
                >
                  {tab.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
