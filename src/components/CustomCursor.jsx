import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    dot.style.opacity   = '1';
    ring.style.opacity  = '1';
    document.body.classList.add('custom-cursor-active');

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let state = 'default'; // 'default' | 'view' | 'button'
    let clicking = false;
    let raf;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;

      const isCard   = e.target.closest('[data-cursor="view"]');
      const isButton = !isCard && e.target.closest('button, [role="button"]');
      const isLink   = !isCard && !isButton && e.target.closest('a');

      if (isCard)        state = 'view';
      else if (isButton) state = 'button';
      else if (isLink)   state = 'link';
      else               state = 'default';
    };
    const onDown = () => { clicking = true; };
    const onUp   = () => { clicking = false; };

    const tick = () => {
      // Dot follows instantly
      dot.style.transform = `translate(${mx}px,${my}px)`;

      // Ring lerps behind
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);

      let ringScale, ringOpacity, dotScale, dotOpacity, labelOpacity;

      if (state === 'view') {
        ringScale   = 3.8;
        ringOpacity = 1;
        dotScale    = 0;
        dotOpacity  = 0;
        labelOpacity = 1;
      } else if (state === 'button') {
        ringScale   = 1.6;
        ringOpacity = 1;
        dotScale    = 1;
        dotOpacity  = 1;
        labelOpacity = 0;
      } else if (state === 'link') {
        ringScale   = 1.4;
        ringOpacity = 0.8;
        dotScale    = 1;
        dotOpacity  = 1;
        labelOpacity = 0;
      } else {
        ringScale   = clicking ? 0.8 : 1;
        ringOpacity = 1;
        dotScale    = clicking ? 0.5 : 1;
        dotOpacity  = 1;
        labelOpacity = 0;
      }

      ring.style.transform = `translate(${rx}px,${ry}px) scale(${ringScale})`;
      ring.style.opacity   = ringOpacity;
      ring.style.borderColor = state === 'view'
        ? 'rgba(255,255,255,0.55)'
        : state === 'button'
        ? 'rgba(3,102,191,0.8)'
        : 'rgba(3,102,191,0.38)';
      ring.style.backgroundColor = state === 'view' ? 'rgba(255,255,255,0.06)' : 'transparent';

      dot.style.transform = `translate(${mx}px,${my}px) scale(${dotScale})`;
      dot.style.opacity   = dotOpacity;

      label.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
      label.style.opacity   = labelOpacity;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      cancelAnimationFrame(raf);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"   style={{ opacity: 0 }} aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring"  style={{ opacity: 0 }} aria-hidden="true" />
      <div ref={labelRef} className="cursor-label" style={{ opacity: 0 }} aria-hidden="true">
        VER
        <svg className="ml-1" width="10" height="10" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );
}
