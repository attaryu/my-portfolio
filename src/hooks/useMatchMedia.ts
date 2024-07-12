import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useState } from 'react';

type Conditions = {
  isSmall: boolean,
  isMedium: boolean,
  isLarge: boolean,
  isExtraLarge: boolean,
}

gsap.registerPlugin(useGSAP);

export default function useMatchMedia(fn: (context: Conditions) => (() => void) | void, depend: any[] = []) {
  const [width, setWidth] = useState(0);

  useGSAP(() => { gsap.matchMediaRefresh() }, [width]);

  useGSAP(() => {
    const handler = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handler);

    return () => window.removeEventListener('resize', handler);
  }, []);

  useGSAP(() => {
    gsap.matchMedia().add({
      isSmall: '(max-width: 766px)',
      isMedium: '(min-width: 768px)',
      isLarge: '(min-width: 1024px)',
      isExtraLarge: '(min-width: 1280px)',
    }, (context) => fn(context.conditions as Conditions));
  }, depend);
}
