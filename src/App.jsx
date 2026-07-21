import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import { lazy, Suspense, useState, useEffect } from 'react';
import Lenis from 'lenis';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import RatingPopup from './components/RatingPopup';
import CustomCursor from './components/CustomCursor';
import GlobalSearch from './components/GlobalSearch';
import ContactModal from './components/ContactModal';
import CookieBanner from './components/CookieBanner';
import FloatingContact from './components/FloatingContact';
import AnnouncementBar from './components/AnnouncementBar';
import BackToTop from './components/BackToTop';

// Lazy-loaded pages — each page becomes its own JS chunk (faster initial load)
const Home                  = lazy(() => import('./pages/Home'));
const Sobre                 = lazy(() => import('./pages/Sobre'));
const Agua                  = lazy(() => import('./pages/Agua'));
const Quimica               = lazy(() => import('./pages/Quimica'));
const QuimicaLampadas       = lazy(() => import('./pages/QuimicaLampadas'));
const QuimicaLampadasMono   = lazy(() => import('./pages/QuimicaLampadasMono'));
const QuimicaLampadasMulti  = lazy(() => import('./pages/QuimicaLampadasMulti'));
const QuimicaLampadasD2     = lazy(() => import('./pages/QuimicaLampadasD2'));
const QuimicaLampadasTodosAA= lazy(() => import('./pages/QuimicaLampadasTodosAA'));
const QuimicaTubosGrafite   = lazy(() => import('./pages/QuimicaTubosGrafite'));
const QuimicaEquivalentes   = lazy(() => import('./pages/QuimicaEquivalentes'));
const QuimicaICP            = lazy(() => import('./pages/QuimicaICP'));
const QuimicaCHNS           = lazy(() => import('./pages/QuimicaCHNS'));

const Oceanografia          = lazy(() => import('./pages/Oceanografia'));
const OceanografiaNKE       = lazy(() => import('./pages/OceanografiaNKE'));
const OceanografiaHydrobios = lazy(() => import('./pages/OceanografiaHydrobios'));
const OceanografiaWildco    = lazy(() => import('./pages/OceanografiaWildco'));
const OceanografiaSeaber    = lazy(() => import('./pages/OceanografiaSeaber'));
const OceanografiaMarca     = lazy(() => import('./pages/OceanografiaMarca'));
const OutrasMarcasOceanografia = lazy(() => import('./pages/OutrasMarcasOceanografia'));
const Drones                = lazy(() => import('./pages/Drones'));
const Micotoxinas           = lazy(() => import('./pages/Micotoxinas'));
const MaterialLaboratorio   = lazy(() => import('./pages/MaterialLaboratorio'));
const Produtos              = lazy(() => import('./pages/Produtos'));
const ProdutoDetalhe        = lazy(() => import('./pages/ProdutoDetalhe'));
const Marcas                = lazy(() => import('./pages/Marcas'));
const MateriaisReferencia   = lazy(() => import('./pages/MateriaisReferencia'));
const PeixeZebra            = lazy(() => import('./pages/PeixeZebra'));
const PoliticaPrivacidade   = lazy(() => import('./pages/PoliticaPrivacidade'));
const NotFound              = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-8 h-8 rounded-full border-2 border-brand-200 border-t-brand-600 animate-spin" />
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [barVisible, setBarVisible] = useState(
    () => !sessionStorage.getItem('ws_ann_dismissed')
  );

  const dismissBar = () => {
    sessionStorage.setItem('ws_ann_dismissed', '1');
    setBarVisible(false);
  };

  // Lenis ultra-smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 2,
    });
    window.lenis = lenis;
    let rafId;
    function raf(time) { lenis.raf(time); rafId = requestAnimationFrame(raf); }
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); window.lenis = null; };
  }, []);

  // Scroll velocity → subtle skewY on page content
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const rawSkew = useTransform(scrollVelocity, [-2800, 0, 2800], [-2.5, 0, 2.5]);
  const skewY = useSpring(rawSkew, { stiffness: 400, damping: 50, restDelta: 0.001 });

  // Open search with Ctrl+K or Cmd+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Listen for global open-contact-modal event
  useEffect(() => {
    const handler = () => setContactOpen(true);
    window.addEventListener('open-contact-modal', handler);
    return () => window.removeEventListener('open-contact-modal', handler);
  }, []);

  return (
    <HelmetProvider>
      <AnnouncementBar visible={barVisible} onDismiss={dismissBar} />
      <CookieBanner />
      <ScrollToTop />
      <ScrollProgress />
      <Navbar onSearchOpen={() => setSearchOpen(true)} barVisible={barVisible} />
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <motion.main className="min-h-screen" style={{ skewY }}>
        <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/agua" element={<Agua />} />
            <Route path="/quimica" element={<Quimica />} />
            <Route path="/quimica/lampadas" element={<QuimicaLampadas />} />
            <Route path="/quimica/lampadas-mono" element={<QuimicaLampadasMono />} />
            <Route path="/quimica/lampadas-multi" element={<QuimicaLampadasMulti />} />
            <Route path="/quimica/lampadas-d2" element={<QuimicaLampadasD2 />} />
            <Route path="/quimica/lampadas-todos-aa" element={<QuimicaLampadasTodosAA />} />
            <Route path="/quimica/tubos-grafite" element={<QuimicaTubosGrafite />} />
            <Route path="/quimica/equivalentes/:brand" element={<QuimicaEquivalentes />} />
            <Route path="/quimica/icp-icpms" element={<QuimicaICP />} />
            <Route path="/quimica/chns-toc" element={<QuimicaCHNS />} />

            <Route path="/oceanografia" element={<Oceanografia />} />
            <Route path="/oceanografia/nke" element={<OceanografiaNKE />} />
            <Route path="/oceanografia/hydrobios" element={<OceanografiaHydrobios />} />
            <Route path="/oceanografia/wildco" element={<OceanografiaWildco />} />
            <Route path="/oceanografia/seaber" element={<OceanografiaSeaber />} />
            <Route path="/oceanografia/northlift" element={<OceanografiaMarca brandId="northlift" />} />
            <Route path="/oceanografia/general-oceanics" element={<OceanografiaMarca brandId="general-oceanics" />} />
            <Route path="/oceanografia/aquatic-biotechnology" element={<OceanografiaMarca brandId="aquatic-biotechnology" />} />
            <Route path="/oceanografia/kc-denmark" element={<OceanografiaMarca brandId="kc-denmark" />} />
            <Route path="/oceanografia/osil" element={<OceanografiaMarca brandId="osil" />} />
            <Route path="/oceanografia/outras-marcas" element={<OutrasMarcasOceanografia />} />
            <Route path="/peixe-zebra" element={<PeixeZebra />} />
            <Route path="/drones" element={<Drones />} />
            <Route path="/micotoxinas" element={<Micotoxinas />} />
            <Route path="/material-laboratorio" element={<MaterialLaboratorio />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/produtos/:slug" element={<ProdutoDetalhe />} />
            <Route path="/marcas" element={<Marcas />} />
            <Route path="/materiais-referencia" element={<MateriaisReferencia />} />
            <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/privacy-policy" element={<PoliticaPrivacidade />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        </Suspense>
      </motion.main>
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <RatingPopup />
      <FloatingContact />
      <BackToTop />
      <CustomCursor />
    </HelmetProvider>
  );
}
