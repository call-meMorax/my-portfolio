import { useEffect, useRef, useState } from 'react';

/**
 * Subtle glowing dot that trails the mouse — desktop (fine pointer) only.
 * A tiny amber dot tracks 1:1 while a blurred halo lags behind it.
 * Renders nothing on coarse (touch) pointers.
 */
export default function CustomCursor() {
  const [enabled] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
  );
  const dotRef = useRef<HTMLDivElement | null>(null);
  const haloRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const pos = { x: -100, y: -100 };
    const halo = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };
    const loop = () => {
      halo.x += (pos.x - halo.x) * 0.16;
      halo.y += (pos.y - halo.y) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${halo.x}px, ${halo.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={haloRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] h-10 w-10 rounded-full bg-amber-500/15 blur-md"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[91] h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_14px_3px_rgba(245,158,11,0.7)]"
      />
    </>
  );
}
