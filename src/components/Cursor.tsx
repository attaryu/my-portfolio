'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

export default function Cursor() {
  const pathname = usePathname();
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const hoverElements = useRef<NodeListOf<
    HTMLAnchorElement | HTMLButtonElement
  > | null>(null);

  const { contextSafe } = useGSAP(() => {
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

    window.addEventListener('mousemove', cursorHandle);

    return () => window.removeEventListener('mousemove', cursorHandle);
  }, []);

  useGSAP(() => {
    hoverElements.current = document.querySelectorAll('[data-hover]');

    hoverElements.current.forEach((element) => {
      element.addEventListener('mouseenter', cursorOnMouseEnter);
      element.addEventListener('mouseleave', cursorOnMouseLeave);
    });

    return () => {
      hoverElements.current?.forEach((element) => {
        element.removeEventListener('mouseenter', cursorOnMouseEnter);
        element.removeEventListener('mouseleave', cursorOnMouseLeave);
      });

      hoverElements.current = null;
    };
  }, [pathname]);

  const cursorHandle = contextSafe((e: MouseEvent) => {
    const { clientX: x, clientY: y } = e;

    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.6,
      ease: 'power3.out',
    });
  });

  const cursorOnMouseEnter = contextSafe((e: Event) => {
    const target = e.target as HTMLButtonElement | HTMLAnchorElement;

    gsap.to(cursorRef.current, {
      scale: target.getAttribute('data-hover-scale') ?? 3,
      duration: 0.4,
      ease: 'power2.out',
    });
  });

  const cursorOnMouseLeave = contextSafe(() => {
    gsap.to(cursorRef.current, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  });

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-50 hidden size-4 rounded-full bg-white mix-blend-difference xl:block"
    />
  );
}
