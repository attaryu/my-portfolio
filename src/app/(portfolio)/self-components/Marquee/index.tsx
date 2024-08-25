'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

import BoxLogo from './BoxLogo';

gsap.registerPlugin(useGSAP);

type Prop = {
  icons: any;
};

export default function Marquee({ icons }: Readonly<Prop>) {
  const scrollerPercentage = useRef(0);
  const lastScrollPosition = useRef(0);
  const scrollDirection = useRef(1);
  const { contextSafe } = useGSAP();

  const length = Math.round(icons.length / 2);
  const firstSectionLogo = icons.slice(0, length);
  const secondSectionLogo = icons.slice(length);

  useEffect(() => {
    if (window) {
      requestAnimationFrame(play);
      window.addEventListener('scroll', scrollHandler);

      return () => window.removeEventListener('scroll', scrollHandler);
    }
  }, []);

  // play marquee animation
  const play = contextSafe(() => {
    if (scrollerPercentage.current >= 100) {
      // for right direction
      scrollerPercentage.current = 0;
    } else if (scrollerPercentage.current < 0) {
      // for left direction
      scrollerPercentage.current = 100;
    }

    gsap.set('.scroller-1', { xPercent: -scrollerPercentage.current });
    gsap.set('.scroller-2', { xPercent: scrollerPercentage.current });

    scrollerPercentage.current += 0.08 * scrollDirection.current;

    requestAnimationFrame(play);
  });

  // to control scroll direction
  function scrollHandler() {
    const scrollPosition = window.scrollY;

    scrollDirection.current =
      lastScrollPosition.current > scrollPosition ? -1 : 1;
    lastScrollPosition.current = scrollPosition;
  }

  return (
    <div className="before:contents-[''] after:contents-[''] relative my-16 -rotate-1 before:pointer-events-none before:absolute before:-left-1 before:z-10 before:block before:h-full before:w-1/4 before:bg-gradient-to-l before:from-transparent before:to-white after:pointer-events-none after:absolute after:-right-1 after:top-0 after:z-10 after:block after:h-full after:w-1/4 after:bg-gradient-to-r after:from-transparent after:to-white md:my-20 before:xl:w-1/6 after:xl:w-1/6">
      <ul className="grid grid-cols-1 grid-rows-2 gap-5 md:gap-8 lg:gap-10">
        {/* direction 1 */}
        <div className="relative flex w-max">
          <div className="scroller-1 grid w-max grid-flow-col grid-rows-1 gap-5 pr-5 md:gap-8 md:pr-8 lg:gap-10 lg:pr-10">
            {firstSectionLogo.map((data: any) => (
              <BoxLogo
                key={data.id}
                url={data.attributes.icon.data.attributes.url}
                name={data.attributes.icon.data.attributes.alternativeText}
              />
            ))}
          </div>

          <div className="scroller-1 absolute left-full grid w-max grid-flow-col grid-rows-1 gap-5 pr-5 md:gap-8 md:pr-8 lg:gap-10 lg:pr-10">
            {firstSectionLogo.map((data: any) => (
              <BoxLogo
                key={data.id}
                url={data.attributes.icon.data.attributes.url}
                name={data.attributes.icon.data.attributes.alternativeText}
                aria-hidden
              />
            ))}
          </div>
        </div>

        {/* direction 2 */}
        <div className="relative flex w-max">
          <div className="scroller-2 grid w-max grid-flow-col grid-rows-1 gap-5 pr-5 md:gap-8 md:pr-8 lg:gap-10 lg:pr-10">
            {secondSectionLogo.map((data: any) => (
              <BoxLogo
                key={data.id}
                url={data.attributes.icon.data.attributes.url}
                name={data.attributes.icon.data.attributes.alternativeText}
              />
            ))}
          </div>

          <div className="scroller-2 absolute right-full grid w-max grid-flow-col grid-rows-1 gap-5 pr-5 md:gap-8 md:pr-8 lg:gap-10 lg:pr-10">
            {secondSectionLogo.map((data: any) => (
              <BoxLogo
                key={data.id}
                url={data.attributes.icon.data.attributes.url}
                name={data.attributes.icon.data.attributes.alternativeText}
                aria-hidden
              />
            ))}
          </div>
        </div>
      </ul>
    </div>
  );
}
