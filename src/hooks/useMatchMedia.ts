import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

type Conditions = {
  isSmall: boolean,
  isMedium: boolean,
  isLarge: boolean,
  isExtraLarge: boolean,
}

gsap.registerPlugin(useGSAP);

export default function useMatchMedia(
  fn: (context: Conditions) => (() => void) | void,
  depend: any[] = []
) {
  useGSAP(() => {
    gsap.matchMedia().add({
      isSmall: '(max-width: 766px)',
      isMedium: '(min-width: 768px)',
      isLarge: '(min-width: 1024px)',
      isExtraLarge: '(min-width: 1280px)',
    }, (context) => fn(context.conditions as Conditions));
  }, depend);
}
