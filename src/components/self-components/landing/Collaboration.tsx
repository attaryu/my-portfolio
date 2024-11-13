'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

import Button from '@/components/Button';

import useEvent from '@/hooks/useEvent';
import sequenceAnimation from '@/utils/text-animation/sequence';
import textSplitter from '@/utils/textSplitter';

gsap.registerPlugin(useGSAP);

export default function Collaboration() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { subscribe } = useEvent('loadingAnimation@end');
  const [loading, setLoading] = useState(true);

  useEffect(() => subscribe(() => setLoading(false)), []);

  useGSAP(
    ({ isSmall }) => {
      gsap.registerPlugin(ScrollTrigger);

      if (containerRef.current && !loading && !isSmall) {
        const splittedText = textSplitter('.title', containerRef.current, {
          types: 'chars,lines',
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.title',
              start: 'top 90%',
              end: 'top bottom',
              toggleActions: 'play none none reverse',
            },
          })
          .add(sequenceAnimation(splittedText, { from: 'top' }).play());
      }
    },
    {
      scope: containerRef,
      dependencies: [loading],
    },
  );

  return (
    <section
      className="relative my-16 flex h-[90vh] max-h-highest flex-col overflow-hidden px-8 py-16 md:h-[60vh] md:max-h-[650px] md:p-20 xl:h-screen"
      ref={containerRef}
    >
      <p className="title font-neue-montreal-medium text-[3.3rem] leading-none *:pb-1 lg:text-[5rem] xl:text-[5.5rem]">
        Don't you think about making a masterpiece together after seeing all
        that?
      </p>

      <img
        src="/assets/wave.svg"
        alt=""
        className="-rotate-5 absolute right-1/3 top-3/4 w-full scale-[2.7] md:left-0 md:top-[55%] md:w-full md:rotate-0 md:scale-125 xl:top-1/2 xl:scale-100"
      />

      <p className="mt-auto flex items-center gap-4 self-end font-neue-montreal-medium md:gap-8">
        <Button asChild>
          <a href="mailto:mattarannaufal@gmail.com?subject=Project Collaboration Inquiry&body=Hi Matt, I'm interested in collaborating with you on a new project. Could you let me know if your schedule is open for a discussion? Looking forward to hearing from you!">
            Mail Me
          </a>
        </Button>{' '}
        <span className="md:text-xl lg:text-2xl">right now!</span>
      </p>
    </section>
  );
}
