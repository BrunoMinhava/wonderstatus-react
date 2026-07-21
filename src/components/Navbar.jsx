import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MotionLink = motion(Link);

// ── Tiny icon components ─────────────────────────────────────────────────────
const Ic = {
  flask:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6M10 3v7l-4 9h12l-4-9V3M6.7 18h10.6"/></svg>,
  filter:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  dna:      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 15c6.667-6 13.333 0 20-6M2 9c6.667 6 13.333 0 20 6M7 11.5 6.5 11M17 12.5l.5-.5M7 12.5 6.5 13M17 11.5l.5.5"/></svg>,
  cabinet:  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="2" width="18" height="20" rx="2"/><path d="M3 10h18M12 2v8M8 5.5h.01M8 14h.01"/></svg>,
  tool:     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  pipette:  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.5-1.5M3.5 20l14-14M17.5 6l.5-.5a2.83 2.83 0 0 0-4-4l-.5.5 4 4zM10 9 3 16v4h4l7-7"/></svg>,
  gauge:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 12 8 8"/></svg>,
  waves:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1C7 13 7 11 9.5 11c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>,
  atom:     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5zM15.7 15.7c2.04 2.03.02 7.36-4.5 11.9-4.54 4.52-9.87 6.54-11.9 4.5-2.04-2.03-.02-7.36 4.5-11.9 4.54-4.52 9.87-6.54 11.9-4.5z"/></svg>,
  flame:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  bulb:     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>,
  tubes:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2h8M9 2v13l-3 5h12l-3-5V2M12 2v6M9 8h6"/></svg>,
  snowflake:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="m20 6-8 6-8-6"/><path d="m20 18-8-6-8 6"/><path d="m2 12 4-2-4-2"/><path d="m22 10-4 2 4 2"/></svg>,
  award:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>,
  file:     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  // Ocean
  sonar:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  anchor:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>,
  submarine:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 0 5 1.774A8 8 0 0 0 17 17a5 5 0 0 0 5-5V9a1 1 0 0 0-1-1h-1a2 2 0 0 0-2-2h-1M8 9h.01M3 15v2a1 1 0 0 0 1 1h1"/><path d="M7 11v4"/></svg>,
  winch:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M3 12h3M18 12h3M12 3v3M12 18v3"/></svg>,
  bottle:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H9M12 2v4M8 6l-3 8v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6l-3-8"/></svg>,
  compass:  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
  net:      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18M3 9h18M3 15h18M9 3v18M15 3v18M3 21h18"/></svg>,
  buoy:     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="6"/><path d="M12 16v6M8 22h8"/></svg>,
  eye:      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  fish:     <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 12c0 0 2-4 7-4s7 4 7 4-2 4-7 4-7-4-7-4z"/><path d="M3.5 12 6 9.5M3.5 12 6 14.5M12 12h.01"/></svg>,
};

// ── Sub-item arrays ───────────────────────────────────────────────────────────
const oceanSubItems = [
  { to: '/oceanografia/nke',          label: 'Sondas e Data Loggers',      sub: 'WiMo, WiSens, Bóias e Flutuadores',                 icon: Ic.sonar,     logo: '/assets/logos/nke-instruments.png' },
  { divider: 'Amostragem' },
  { to: '/oceanografia/hydrobios',    label: 'Hydrobios',                  sub: 'Garrafas Niskin, redes plâncton e sediment traps',   icon: Ic.bottle,    logo: '/assets/logos/hydrobios.png' },
  { to: '/oceanografia/wildco',        label: 'WildCo Environmental',       sub: 'Recolha de peixes, macroinvertebrados e crivos',     icon: Ic.net,       logo: '/assets/logos/wildco.png' },
  { to: '/oceanografia/seaber',       label: 'Micro-AUVs Subaquáticos',    sub: 'Veículos autónomos para missões oceânicas',          icon: Ic.submarine, logo: '/assets/logos/seaber.png' },
  { to: '/oceanografia/northlift',    label: 'Guinchos de Campo',          sub: 'Guinchos elétricos e manuais para operação',         icon: Ic.winch,     logo: '/assets/logos/northlift.png' },
  { to: '/oceanografia/outras-marcas',label: 'Outras marcas representadas',sub: 'General Oceanics, KC-Denmark, Osil e mais',          icon: Ic.compass },
];

const quimicaSubItems = [
  { divider: 'Consumíveis' },
  { to: '/quimica/icp-icpms',             label: 'Consumíveis ICP / ICP-MS',         sub: 'Nebulizadores, tochas, câmaras e cones MS',       icon: Ic.waves,  logo: '/assets/logos/glass-expansion.png' },
  { to: '/quimica/chns-toc',              label: 'CHN/O/S, TOC e Análise Elementar', sub: 'Cápsulas, reagentes e padrões certificados',      icon: Ic.atom,   logo: '/assets/logos/elemental-microanalysis.png' },
  { to: '/quimica/lampadas',              label: 'Lâmpadas de Cátodo Oco e D2',       sub: 'Tabelas por elemento — 37 mm, 50 mm e Deutério', icon: Ic.bulb,   logo: '/assets/logos/photron.png' },
  { to: '/quimica/tubos-grafite',         label: 'Tubos de Grafite AAS',              sub: 'Thermo, Agilent, PerkinElmer, Shimadzu e GBC',   icon: Ic.tubes,  logo: '/assets/logos/thermo-scientific.png' },
  { divider: 'Padrões Analíticos' },
  { to: '/quimica#padroes-inorganicos',   label: 'Padrões Inorgânicos',   sub: 'Metais, aniões e catiões certificados',          icon: Ic.gauge,  logo: '/assets/logos/cpachem.png' },
  { to: '/quimica#padroes-organicos',     label: 'Padrões Orgânicos',     sub: 'Pesticidas, PAHs, PCBs, VOCs e ambientais',      icon: Ic.flask,  logo: '/assets/logos/hpc-standards.png' },
  { to: '/quimica#padroes-petroquimicos', label: 'Padrões Petroquímicos', sub: 'Combustíveis, viscosidade e derivados do petróleo',icon: Ic.filter, logo: '/assets/logos/cpachem.png' },
];

const labSubItems = [
  { to: '/material-laboratorio#vidro',      label: 'Vidros e Volumetria',         sub: 'Balões, provetas, frascos e recipientes',               icon: Ic.flask,     logo: '/assets/logos/auxilab.png' },
  { to: '/material-laboratorio#filtracao',  label: 'Filtração',                   sub: 'Papéis analíticos, microfibra, colunas HPLC e viais',   icon: Ic.filter,    logo: '/assets/logos/chmlab-group.png' },
  { to: '/material-laboratorio#pcr',        label: 'Biologia Molecular · PCR',    sub: 'Pontas, tubos eppendorf, kits PCR e consumíveis',        icon: Ic.dna,       logo: '/assets/logos/umura.png' },
  { to: '/material-laboratorio#cabinas',    label: 'Cabines e Biossegurança',     sub: 'Fluxo laminar, câmaras BSC e incubadoras',               icon: Ic.cabinet,   logo: '/assets/logos/cruma.png' },
  { to: '/material-laboratorio#bancada',    label: 'Equipamento de Bancada',      sub: 'Estufas, centrifugas, autoclaves, banhos e agitadores',  icon: Ic.tool,      logo: '/assets/logos/jp-selecta.png' },
  { to: '/material-laboratorio#pipetagem',  label: 'Micropipetas e Dispensadores',sub: 'Micropipetas de precisão e dispensadores automáticos',   icon: Ic.pipette,   logo: '/assets/logos/socorex.svg' },
  { to: '/material-laboratorio#medicao',    label: 'Medidores e Controladores',   sub: 'pH, CE, ORP, OD, turbidez e fotómetros',                icon: Ic.gauge,     logo: '/assets/logos/milwaukee-instruments.png' },
  { to: '/material-laboratorio#gelo',       label: 'Máquinas de Gelo',            sub: 'Diamond Ice compacto para laboratório e conservação',    icon: Ic.snowflake, logo: '/assets/logos/itv.png' },
];

// MRC usa `divider` para criar secções dentro do dropdown
const mrcSubItems = [
  { divider: 'Representação exclusiva' },
  { href: 'https://rofafrance.com/certified-reference-material-list-en/', label: 'ROFA France',        sub: 'Combustíveis, siderurgia, solos e cimento · França',          badge: 'Exclusivo', icon: Ic.award, logo: '/assets/logos/rofa-france.svg' },
  { divider: 'Distribuição autorizada' },
  { href: 'https://www.lgcstandards.com/',                                label: 'LGC Standards',      sub: 'Águas, solos, alimentos e matrizes ambientais · UK',           icon: Ic.file, logo: '/assets/logos/lgc-standards.svg' },
  { href: 'https://www.nist.gov/srm',                                     label: 'NIST',               sub: 'Standard Reference Materials — Estados Unidos',                icon: Ic.file, logo: '/assets/logos/nist.svg' },
  { href: 'https://www.eurofins.dk/miljoe/analyser-og-maalinger/vki-certificerede-referencematerialer/information-in-english/material-safety-data-sheets/', label: 'VKI (Eurofins)', sub: 'Materiais aquáticos e sedimentos certificados', icon: Ic.file, logo: '/assets/logos/vki.svg' },
  { href: 'https://www.canada.ca/en/environment-climate-change.html',     label: 'Environment Canada', sub: 'Matrizes ambientais e aquáticas · ECCC',                      icon: Ic.file, logo: '/assets/logos/eccc.svg' },
  { href: 'https://nrc.canada.ca/en/certifications-evaluations-standards/certified-reference-materials/list', label: 'NRC Canada', sub: 'MOOS, DOLT, PACS — National Research Council', icon: Ic.file, logo: '/assets/logos/nrc-canada.svg' },
  { href: 'https://crm.jrc.ec.europa.eu/',                                label: 'JRC — ERM',          sub: 'Materiais de referência europeus · ISO 17034',                icon: Ic.file, logo: '/assets/logos/jrc-erm.svg' },
  { href: 'https://www.basrid.co.uk/',                                    label: 'BAS',                sub: 'Bureau of Analysed Samples · Reino Unido',                    icon: Ic.file, logo: '/assets/logos/bas.svg' },
];

const mrcNavItem = {
  to: '/materiais-referencia',
  label: 'Mat. Ref.',
  dropdown: mrcSubItems,
  dropdownHeader: 'Mat. de Referência — Marcas',
  basePath: '/materiais-referencia',
  accent: 'from-emerald-500 to-teal-400',
};

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/material-laboratorio', label: 'Laboratório', dropdown: labSubItems,    dropdownHeader: 'Laboratório — Marcas', basePath: '/material-laboratorio', accent: 'from-brand-500 to-sky-400' },
  { to: '/oceanografia',          label: 'Oceanografia', dropdown: oceanSubItems, dropdownHeader: 'Oceanografia — Áreas', basePath: '/oceanografia',          accent: 'from-sky-500 to-teal-400' },
  { to: '/agua',          label: 'Água' },
  { to: '/quimica',       label: 'Química', dropdown: quimicaSubItems, dropdownHeader: 'Química — Áreas', basePath: '/quimica', accent: 'from-violet-500 to-brand-400' },
  { to: '/peixe-zebra',   label: 'Peixe Zebra' },
  { to: '/drones',        label: 'Drones' },
  { to: '/micotoxinas',   label: 'Micotoxinas' },
  { to: '/produtos',      label: 'Produtos' },
  { to: '/sobre',         label: 'Sobre / Contactos' },
];

const mobileSections = [
  { label: 'Áreas de atuação', items: navItems.slice(1, 8) },
  { label: 'Catálogo',         items: [navItems[8], { ...mrcNavItem, label: 'Mat. Referência' }] },
  { label: 'Empresa',          items: [navItems[0], navItems[9]] },
];

// ── Shared small components ───────────────────────────────────────────────────
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-30 shrink-0">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function DropdownItem({ sub, onClick }) {
  if (sub.divider !== undefined) {
    return (
      <div className="px-4 pt-3 pb-1">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink-400 border-t border-ink-100 pt-2">
          {sub.divider}
        </p>
      </div>
    );
  }

  const inner = (
    <>
      {sub.icon && (
        <span className="flex-shrink-0 mt-0.5 opacity-50 group-hover/item:opacity-80 transition-opacity">
          {sub.icon}
        </span>
      )}
      <span className="flex-1 min-w-0">
        <span className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[13px] font-semibold leading-tight">{sub.label}</span>
            {sub.badge && (
              <span className="inline-block px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-amber-100 text-amber-700 uppercase tracking-wide leading-none">
                {sub.badge}
              </span>
            )}
          </span>
          {sub.logo && (
            <span className="flex-shrink-0 flex items-center justify-center w-14 h-6 rounded px-1 py-0.5 bg-ink-50 group-hover/item:bg-white border border-ink-100 transition-colors">
              <img src={sub.logo} alt="" className="max-h-[18px] max-w-[48px] w-auto h-auto object-contain" />
            </span>
          )}
        </span>
        <span className="block text-[11px] text-ink-400 mt-0.5 leading-snug">{sub.sub}</span>
      </span>
    </>
  );

  const cls = 'flex items-start gap-2.5 px-3.5 py-2.5 transition-colors border-l-2 mx-1.5 rounded-lg group/item border-transparent hover:bg-ink-50 hover:border-ink-200 text-ink-800';

  if (sub.href) {
    return (
      <a href={sub.href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <NavLink
      to={sub.to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-start gap-2.5 px-3.5 py-2.5 transition-colors border-l-2 mx-1.5 rounded-lg group/item ${
          isActive
            ? 'bg-brand-50 border-brand-400 text-brand-700'
            : 'border-transparent hover:bg-ink-50 hover:border-ink-200 text-ink-800'
        }`
      }
    >
      {inner}
    </NavLink>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Navbar({ onSearchOpen, barVisible = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const dropdownTimerRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const openDropdown  = (label) => { clearTimeout(dropdownTimerRef.current); setActiveDropdown(label); };
  const closeDropdown = () => { dropdownTimerRef.current = setTimeout(() => setActiveDropdown(null), 120); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
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
        <nav className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 flex h-16 md:h-20 items-center gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center group shrink-0" aria-label="Wonderstatus — Home">
            <img
              src="/assets/logos/wonderstatus-logo.png"
              alt="Wonderstatus"
              className={`h-8 md:h-9 w-auto transition-all duration-500 ${
                shouldBeSolid ? '' : '[filter:brightness(0)_invert(1)]'
              }`}
            />
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden lg:flex items-center justify-center gap-0 flex-1 min-w-0 pl-6">
            {[...navItems.slice(1, 9), mrcNavItem].map((item) => (
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
                      className={`relative flex items-center gap-1 px-2 py-1.5 text-[12px] font-semibold rounded-full transition-all duration-300 whitespace-nowrap ${
                        location.pathname.startsWith(item.basePath)
                          ? shouldBeSolid ? 'text-brand-700 bg-brand-50' : 'text-white bg-white/20'
                          : shouldBeSolid ? 'text-ink-700 hover:text-brand-700 hover:bg-brand-50/60' : 'text-white/85 hover:text-white hover:bg-white/10'
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
                          initial={{ opacity: 0, y: -8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                          onMouseEnter={() => clearTimeout(dropdownTimerRef.current)}
                          onMouseLeave={closeDropdown}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-2xl shadow-[0_12px_48px_rgba(10,44,85,0.18)] border border-ink-100 overflow-hidden z-50"
                        >
                          {/* Colored accent bar */}
                          <div className={`h-0.5 bg-gradient-to-r ${item.accent || 'from-brand-500 to-brand-400'}`} />

                          <div className="py-2">
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 pt-2 pb-2">
                              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400">
                                {item.dropdownHeader}
                              </p>
                            </div>

                            {/* Items */}
                            {item.dropdown.map((sub, idx) => (
                              <DropdownItem
                                key={sub.to || `div-${idx}`}
                                sub={sub}
                                onClick={() => setActiveDropdown(null)}
                              />
                            ))}

                            {/* Footer link */}
                            <div className="mt-2 mx-1.5 mb-1.5 border-t border-ink-50 pt-1.5">
                              <NavLink
                                to={item.to}
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-center justify-between px-3.5 py-2 rounded-lg text-[12px] font-semibold text-brand-600 hover:bg-brand-50 transition-colors"
                              >
                                Ver toda a área {item.label}
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
                      `relative px-2 py-1.5 text-[12px] font-semibold rounded-full transition-all duration-300 whitespace-nowrap ${
                        isActive
                          ? shouldBeSolid ? 'text-brand-700 bg-brand-50' : 'text-white bg-white/20'
                          : shouldBeSolid ? 'text-ink-700 hover:text-brand-700 hover:bg-brand-50/60' : 'text-white/85 hover:text-white hover:bg-white/10'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop right actions */}
          <div className={`hidden lg:flex items-center gap-2 shrink-0 pl-4 ml-2 ${shouldBeSolid ? 'border-l border-ink-200' : 'border-l border-white/25'}`}>
            <button
              type="button"
              onClick={onSearchOpen}
              title="Pesquisar (Ctrl+K)"
              className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-300 ${
                shouldBeSolid ? 'text-ink-500 hover:text-brand-700 bg-ink-50 hover:bg-brand-50' : 'text-white/80 hover:text-white bg-white/10 hover:bg-white/20'
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
                    ? shouldBeSolid ? 'text-brand-700 bg-brand-50' : 'text-white bg-white/20'
                    : shouldBeSolid ? 'text-ink-700 hover:text-brand-700 hover:bg-brand-50/60' : 'text-white/85 hover:text-white hover:bg-white/10'
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
            <span className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-current transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
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
                                  location.pathname.startsWith(item.basePath)
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
                                    {item.dropdown.map((sub, idx) => {
                                      if (sub.divider !== undefined) {
                                        return (
                                          <li key={`div-${idx}`}>
                                            <p className="pl-10 pr-6 pt-3 pb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-ink-400">
                                              {sub.divider}
                                            </p>
                                          </li>
                                        );
                                      }
                                      const mobileInner = (
                                        <>
                                          {sub.icon && (
                                            <span className="flex-shrink-0 mt-0.5 opacity-40">{sub.icon}</span>
                                          )}
                                          <span>
                                            <span className="flex items-center gap-1.5">
                                              <span className="text-[13px] font-semibold leading-tight">{sub.label}</span>
                                              {sub.badge && (
                                                <span className="inline-block px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-amber-100 text-amber-700 uppercase tracking-wide">
                                                  {sub.badge}
                                                </span>
                                              )}
                                            </span>
                                            <span className="block text-[11px] text-ink-400 mt-0.5 leading-snug">{sub.sub}</span>
                                          </span>
                                        </>
                                      );
                                      const mobileCls = 'flex items-start gap-2.5 pl-10 pr-6 py-2.5 border-l-2 transition-colors text-ink-700 border-transparent hover:bg-white hover:border-ink-200';
                                      if (sub.href) {
                                        return (
                                          <li key={sub.href}>
                                            <a href={sub.href} target="_blank" rel="noopener noreferrer" className={mobileCls}>
                                              {mobileInner}
                                            </a>
                                          </li>
                                        );
                                      }
                                      return (
                                        <li key={sub.to}>
                                          <NavLink
                                            to={sub.to}
                                            className={({ isActive }) =>
                                              `flex items-start gap-2.5 pl-10 pr-6 py-2.5 border-l-2 transition-colors ${
                                                isActive
                                                  ? 'text-brand-700 bg-brand-50 border-brand-400'
                                                  : 'text-ink-700 border-transparent hover:bg-white hover:border-ink-200'
                                              }`
                                            }
                                          >
                                            {mobileInner}
                                          </NavLink>
                                        </li>
                                      );
                                    })}
                                    <li>
                                      <NavLink
                                        to={item.to}
                                        className={({ isActive }) =>
                                          `flex items-center gap-2 pl-10 pr-6 py-3 text-[12px] font-semibold transition-colors border-l-2 ${
                                            isActive && location.pathname === item.to
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

              {/* Bottom actions */}
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
