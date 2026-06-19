import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import RatingPopup from './components/RatingPopup';
import CustomCursor from './components/CustomCursor';
import GlobalSearch from './components/GlobalSearch';
import ContactModal from './components/ContactModal';

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Agua from './pages/Agua';
import Quimica from './pages/Quimica';
import QuimicaLampadas from './pages/QuimicaLampadas';
import QuimicaLampadasMono from './pages/QuimicaLampadasMono';
import QuimicaLampadasMulti from './pages/QuimicaLampadasMulti';
import QuimicaLampadasD2 from './pages/QuimicaLampadasD2';
import QuimicaLampadasTodosAA from './pages/QuimicaLampadasTodosAA';
import QuimicaTubosGrafite from './pages/QuimicaTubosGrafite';
import QuimicaEquivalentes from './pages/QuimicaEquivalentes';
import QuimicaICP from './pages/QuimicaICP';
import QuimicaCHNS from './pages/QuimicaCHNS';
import QuimicaDigestao from './pages/QuimicaDigestao';
import Oceanografia from './pages/Oceanografia';
import OceanografiaNKE from './pages/OceanografiaNKE';
import OceanografiaHydrobios from './pages/OceanografiaHydrobios';
import OceanografiaSeaber from './pages/OceanografiaSeaber';
import OceanografiaMarca from './pages/OceanografiaMarca';
import Drones from './pages/Drones';
import Micotoxinas from './pages/Micotoxinas';
import MaterialLaboratorio from './pages/MaterialLaboratorio';
import Produtos from './pages/Produtos';
import ProdutoDetalhe from './pages/ProdutoDetalhe';
import Marcas from './pages/Marcas';
import MateriaisReferencia from './pages/MateriaisReferencia';
import PoliticaPrivacidade from './pages/PoliticaPrivacidade';
import NotFound from './pages/NotFound';
import CookieBanner from './components/CookieBanner';
import FloatingContact from './components/FloatingContact';
import AnnouncementBar from './components/AnnouncementBar';
import BackToTop from './components/BackToTop';

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
    <>
      <AnnouncementBar visible={barVisible} onDismiss={dismissBar} />
      <CookieBanner />
      <ScrollToTop />
      <ScrollProgress />
      <Navbar onSearchOpen={() => setSearchOpen(true)} barVisible={barVisible} />
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <motion.main className="min-h-screen" style={{ skewY }}>
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
            <Route path="/quimica/digestao" element={<QuimicaDigestao />} />
            <Route path="/oceanografia" element={<Oceanografia />} />
            <Route path="/oceanografia/nke" element={<OceanografiaNKE />} />
            <Route path="/oceanografia/hydrobios" element={<OceanografiaHydrobios />} />
            <Route path="/oceanografia/seaber" element={<OceanografiaSeaber />} />
            <Route path="/oceanografia/wildco" element={<OceanografiaMarca brandId="wildco" />} />
            <Route path="/oceanografia/northlift" element={<OceanografiaMarca brandId="northlift" />} />
            <Route path="/oceanografia/general-oceanics" element={<OceanografiaMarca brandId="general-oceanics" />} />
            <Route path="/oceanografia/aquatic-biotechnology" element={<OceanografiaMarca brandId="aquatic-biotechnology" />} />
            <Route path="/oceanografia/kc-denmark" element={<OceanografiaMarca brandId="kc-denmark" />} />
            <Route path="/oceanografia/osil" element={<OceanografiaMarca brandId="osil" />} />
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
      </motion.main>
      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <RatingPopup />
      <FloatingContact />
      <BackToTop />
      <CustomCursor />
    </>
  );
}
