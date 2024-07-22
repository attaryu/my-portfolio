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

interface Config extends useGSAPConfig {
  revert?: boolean
}

gsap.registerPlugin(useGSAP);

export default function useMatchMedia(
  fn: (context: Conditions) => (() => void) | void,
  config: Config | unknown[] | undefined,
) {
  const [screenWidth, setScreenWidth] = useState(0);

  const handleResize = useCallback(debounce(() => {
    const newWidth = window.innerWidth;

    if (screenWidth !== newWidth) {
      setScreenWidth(newWidth);
    }
  }, 200), [screenWidth]);

  useEffect(() => {
    if (window) {
      handleResize();
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => gsap.matchMediaRefresh(), [screenWidth]);

  return useGSAP(() => {
    const matchMedia = gsap.matchMedia().add({
      isSmall: '(max-width: 766px)',
      isMedium: '(min-width: 768px)',
      isLarge: '(min-width: 1024px)',
      isExtraLarge: '(min-width: 1280px)',
    }, (context) => fn(context.conditions as Conditions));
    
    if (config && !Array.isArray(config)) {
      if (config.revert) {
        return () => matchMedia.revert();
      }
    }
  }, config);
}
