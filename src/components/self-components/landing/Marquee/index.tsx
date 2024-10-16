'use client';

import type { Media, Tech } from '@prisma/client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import BoxLogo from './BoxLogo';

gsap.registerPlugin(useGSAP);

type Prop = {
  icons: Array<Tech & { media: Media }>;
};

export default function Marquee({ icons }: Readonly<Prop>) {
  const length = Math.round(icons.length / 2);
  const firstSectionLogo = icons.slice(0, length);
  const secondSectionLogo = icons.slice(length);

  // play marquee animation
  useGSAP(() => {
    const animation: GSAPTweenVars = {
      repeat: -1,
      ease: 'none',
      duration: 30,
    };

    gsap.to('.scroller-1', { ...animation, xPercent: -100 });
    gsap.to('.scroller-2', { ...animation, xPercent: 100 });
  }, []);

  return (
    <div className="before:contents-[''] after:contents-[''] relative my-16 -rotate-1 before:pointer-events-none before:absolute before:-left-1 before:z-10 before:block before:h-full before:w-1/4 before:bg-gradient-to-l before:from-transparent before:to-white after:pointer-events-none after:absolute after:-right-1 after:top-0 after:z-10 after:block after:h-full after:w-1/4 after:bg-gradient-to-r after:from-transparent after:to-white md:my-20 before:xl:w-1/6 after:xl:w-1/6">
      <ul className="grid grid-cols-1 grid-rows-2 gap-5 md:gap-8 lg:gap-10">
        {/* direction 1 */}
        <div className="relative flex w-max">
          <div className="scroller-1 grid w-max grid-flow-col grid-rows-1 gap-5 pr-5 md:gap-8 md:pr-8 lg:gap-10 lg:pr-10">
            {firstSectionLogo.map((data) => (
              <BoxLogo key={data.id} url={data.media.url} name={data.name} />
            ))}
          </div>

          <div className="scroller-1 absolute left-full grid w-max grid-flow-col grid-rows-1 gap-5 pr-5 md:gap-8 md:pr-8 lg:gap-10 lg:pr-10">
            {firstSectionLogo.map((data) => (
              <BoxLogo
                key={data.id}
                url={data.media.url}
                name={data.name}
                aria-hidden
              />
            ))}
          </div>
        </div>

        {/* direction 2 */}
        <div className="relative flex w-max">
          <div className="scroller-2 grid w-max grid-flow-col grid-rows-1 gap-5 pr-5 md:gap-8 md:pr-8 lg:gap-10 lg:pr-10">
            {secondSectionLogo.map((data) => (
              <BoxLogo key={data.id} url={data.media.url} name={data.name} />
            ))}
          </div>

          <div className="scroller-2 absolute right-full grid w-max grid-flow-col grid-rows-1 gap-5 pr-5 md:gap-8 md:pr-8 lg:gap-10 lg:pr-10">
            {secondSectionLogo.map((data) => (
              <BoxLogo
                key={data.id}
                url={data.media.url}
                name={data.name}
                aria-hidden
              />
            ))}
          </div>
        </div>
      </ul>
    </div>
  );
}
