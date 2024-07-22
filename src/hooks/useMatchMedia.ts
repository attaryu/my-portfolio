import type { useGSAPConfig } from '@gsap/react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useCallback, useEffect, useState } from 'react';

import debounce from '@/utils/debounce';

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

  const handleResize = useCallback(debounce(() => {
    setScreenWidth(window.innerWidth);
  }, 150), []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [handleResize]);

  useEffect(() => { gsap.matchMediaRefresh() }, [screenWidth]);

  return useGSAP(() => {
    const matchMedia = gsap.matchMedia().add({
      isSmall: '(max-width: 766px)',
      isMedium: '(min-width: 768px)',
      isLarge: '(min-width: 1024px)',
      isExtraLarge: '(min-width: 1280px)',
    }, (context) => fn(context.conditions as Conditions));

    return () => matchMedia.revert();
  }, config);
}
