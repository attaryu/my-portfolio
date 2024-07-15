import type { useGSAPConfig } from '@gsap/react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useState } from 'react';

type Conditions = {
  isSmall: boolean,
  isMedium: boolean,
  isLarge: boolean,
  isExtraLarge: boolean,
}

gsap.registerPlugin(useGSAP);

export default function useMatchMedia(
  fn: (context: Conditions) => (() => void) | void,
  config: useGSAPConfig | unknown[],
) {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    if (window) {
      window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
    }

    return () => {
      window.removeEventListener('resize', () => setScreenWidth(window.innerWidth));
    }
  }, []);

  useGSAP(() => {
    gsap.matchMedia().add({
      isSmall: '(max-width: 766px)',
      isMedium: '(min-width: 768px)',
      isLarge: '(min-width: 1024px)',
      isExtraLarge: '(min-width: 1280px)',
    }, (context) => fn(context.conditions as Conditions));
  }, config);

  useEffect(() => { gsap.matchMediaRefresh() }, [screenWidth]);
}
