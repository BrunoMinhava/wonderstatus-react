import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          if (window.lenis) window.lenis.scrollTo(el, { offset: -80, duration: 1.2 });
          else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
          else window.scrollTo({ top: 0, behavior: 'auto' });
        }
      }, 60);
    } else {
      if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
      else window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);

  return null;
}
