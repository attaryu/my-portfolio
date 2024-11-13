import { useGSAP, useGSAPConfig } from '@gsap/react';
import gsap from 'gsap';
import _ from 'lodash';
import { useCallback, useEffect } from 'react';

export type MatchMediaConditions = {
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isExtraLarge: boolean;
  isDoubleExtraLarge: boolean;
};

interface Config extends useGSAPConfig {
  revert?: boolean;
}

gsap.registerPlugin(useGSAP);

export default function useMatchMedia(
  fn: (context: MatchMediaConditions) => (() => void) | void,
  config: Config | unknown[] | undefined,
) {
  const handleResize = useCallback(
    _.debounce(() => gsap.matchMediaRefresh(), 200),
    [],
  );

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return useGSAP(() => {
    const matchMedia = gsap.matchMedia().add(
      {
        isSmall: '(max-width: 766px)',
        isMedium: '(min-width: 768px)',
        isLarge: '(min-width: 1024px)',
        isExtraLarge: '(min-width: 1280px)',
        isDoubleExtraLarge: '(min-width: 1536px)',
      },
      (context) => fn(context.conditions as MatchMediaConditions),
    );

    if (config && !Array.isArray(config)) {
      if (config.revert) {
        return () => matchMedia.revert();
      }
    }
  }, config);
}
