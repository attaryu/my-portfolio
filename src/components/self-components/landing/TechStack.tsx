'use client';

import type { Media, Tech } from '@prisma/client';
import type { SplitTypeOptions } from 'split-type';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

import Marquee from './Marquee';

import useEvent from '@/hooks/useEvent';
import sequenceAnimation from '@/utils/text-animation/sequence';
import textSplitter from '@/utils/textSplitter';

gsap.registerPlugin(useGSAP);

type Prop = { icons: Array<Tech & { media: Media }> };

export default function TechStack({ icons }: Readonly<Prop>) {
  const { subscribe } = useEvent('loadingAnimation@end');
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => subscribe(() => setLoading(false)), []);

  useGSAP(
    () => {
      if (!loading) {
        gsap.registerPlugin(ScrollTrigger);

        const setting: Partial<SplitTypeOptions> = {
          types: 'words,lines',
        };

        const titleText = textSplitter('h2', containerRef.current!, setting);
        const noteText = textSplitter('p span', containerRef.current!, setting);

        const scrollTriggerSetting: ScrollTrigger.Vars = {
          start: 'top 90%',
          end: 'top bottom',
          toggleActions: 'play none none reverse',
        };

        gsap
          .timeline({
            scrollTrigger: { ...scrollTriggerSetting, trigger: 'h2' },
          })
          .add(sequenceAnimation(titleText, { animatedType: 'words' }).play());

        gsap
          .timeline({
            scrollTrigger: { ...scrollTriggerSetting, trigger: 'p' },
          })
          .add(sequenceAnimation(noteText, { animatedType: 'words' }).play());
      }
    },
    {
      dependencies: [loading],
      scope: containerRef,
    },
  );

  return (
    <section
      className="w-full overflow-hidden py-14 md:py-32"
      ref={containerRef}
    >
      <h2 className="-rotate-1 px-8 font-neue-montreal-medium text-3xl md:px-20 md:text-5xl md:!leading-tight lg:text-6xl">
        Proudly presenting my expertise coupled with an understanding of the
        technology I use.
      </h2>

      <Marquee icons={icons} />

      <p className="mx-auto -rotate-1 px-8 text-right text-sm leading-tight md:px-20 md:text-xl lg:text-2xl xl:text-xl">
        <span className="md:inline-block md:w-3/4 lg:w-4/5">
          Even though I navigate a variety of technologies, mastery of certain
          technologies still eludes me; Nevertheless, I accepted the journey of
          rediscovering these tools in a short time.
        </span>
      </p>
    </section>
  );
}
