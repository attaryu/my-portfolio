'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

import useEvent from '@/hooks/useEvent';
import { logos } from '@/utils/constant';
import BoxLogo from './BoxLogo';

gsap.registerPlugin(useGSAP);

export default function Marquee() {
  const { subscribe } = useEvent('timeline@loading');
  const scrollerPercentage = useRef(0);
  const velocity = useRef(0);
  const lastScrollPosition = useRef(0);
  const scrollDirection = useRef(1);

  const length = Math.round(logos.length / 2);
  const firstSectionLogo = logos.slice(0, length);
  const secondSectionLogo = logos.slice(length);

  useEffect(() => {
    if (window) {
      gsap.registerPlugin(ScrollTrigger);
      
      requestAnimationFrame(play);
      window.addEventListener('scroll', scrollHandler);

      return () => window.removeEventListener('scroll', scrollHandler);
    }
  }, []);

  useGSAP(() => {
    const transformer = gsap.utils.pipe(
      (value: number) => value / 1000,
      gsap.utils.clamp(0, 0.1),
      gsap.utils.snap(0.01),
    );

    function activeScrollTrigger() {
      ScrollTrigger.create({
        onUpdate: (self) => {
          velocity.current = transformer(
            self.getVelocity() * scrollDirection.current,
          );
        },
      });
    }

    if (window) {
      subscribe(() => setTimeout(activeScrollTrigger, 100));
    }
  }, []);

  // play marquee animation
  function play() {
    if (scrollerPercentage.current >= 100) {
      // for right direction
      scrollerPercentage.current = 0;
    } else if (scrollerPercentage.current < 0) {
      // for left direction
      scrollerPercentage.current = 100;
    }

    gsap.set('.scroller-1', { xPercent: -scrollerPercentage.current });
    gsap.set('.scroller-2', { xPercent: scrollerPercentage.current });

    if (window.innerWidth < 400) {
      scrollerPercentage.current +=
        (0.08 + velocity.current) * scrollDirection.current;
    } else {
      scrollerPercentage.current +=
        (0.05 + velocity.current) * scrollDirection.current;
    }

    requestAnimationFrame(play);
  }

  // to control scroll direction
  function scrollHandler() {
    const scrollPosition = window.scrollY;

    scrollDirection.current = lastScrollPosition.current > scrollPosition ? -1 : 1;
    lastScrollPosition.current = scrollPosition;
  }

  return (
    <div className="before:contents-[''] after:contents-[''] relative my-16 -rotate-1 before:pointer-events-none before:absolute before:-left-1 before:z-10 before:block before:h-full before:w-1/4 before:bg-gradient-to-l before:from-transparent before:to-white after:pointer-events-none after:absolute after:-right-1 after:top-0 after:z-10 after:block after:h-full after:w-1/4 after:bg-gradient-to-r after:from-transparent after:to-white md:my-20 before:xl:w-1/6 after:xl:w-1/6">
      <ul className="grid grid-cols-1 grid-rows-2 gap-5 md:gap-8 lg:gap-10">
        {/* direction 1 */}
        <div className="relative flex w-max">
          <div className="scroller-1 grid w-max grid-flow-col grid-rows-1 gap-5 pr-5 md:gap-8 md:pr-8 lg:gap-10 lg:pr-10">
            {firstSectionLogo.map((logo) => (
              <BoxLogo key={logo} name={logo} />
            ))}
          </div>

          <div className="scroller-1 absolute left-full grid w-max grid-flow-col grid-rows-1 gap-5 pr-5 md:gap-8 md:pr-8 lg:gap-10 lg:pr-10">
            {firstSectionLogo.map((logo) => (
              <BoxLogo key={logo} name={logo} aria-hidden />
            ))}
          </div>
        </div>

        {/* direction 2 */}
        <div className="relative flex w-max">
          <div className="scroller-2 grid w-max grid-flow-col grid-rows-1 gap-5 pr-5 md:gap-8 md:pr-8 lg:gap-10 lg:pr-10">
            {secondSectionLogo.map((logo) => (
              <BoxLogo key={logo} name={logo} />
            ))}
          </div>

          <div className="scroller-2 absolute right-full grid w-max grid-flow-col grid-rows-1 gap-5 pr-5 md:gap-8 md:pr-8 lg:gap-10 lg:pr-10">
            {secondSectionLogo.map((logo) => (
              <BoxLogo key={logo} name={logo} aria-hidden />
            ))}
          </div>
        </div>
      </ul>
    </div>
  );
}
