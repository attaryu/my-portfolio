'uce client';

import textSplitter from '@/utils/textSplitter';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

export default function Loading() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const firstText = textSplitter('.text-1', container.current!);
      const secondText = textSplitter('.text-2', container.current!);

      const animation: GSAPTweenVars = {
        yPercent: -105,
        repeat: -1,
        ease: 'power2.out',
        stagger: { amount: 0.3 }
      }

      gsap.to(firstText.chars, animation);
      gsap.to(secondText.chars, animation);
    },
    {
      scope: container,
      dependencies: [],
    },
  );

  return (
    <div className="grid h-[95svh] place-items-center" ref={container}>
      <div className="relative pt-1 overflow-hidden">
        <h1 className="text-1 text-center font-tusker-grotesk-medium text-6xl">
          LOADING
        </h1>
        <h1 className="text-2 absolute top-[105%] text-center font-tusker-grotesk-medium text-6xl" aria-hidden>
          LOADING
        </h1>
      </div>
    </div>
  );
}
