'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { SplitTypeOptions } from 'split-type';

import useMatchMedia from '@/hooks/useMatchMedia';
import sequenceAnimation from '@/utils/text-animation/sequence';
import textSplitter from '@/utils/textSplitter';

export default function SomeWord() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useMatchMedia(
    ({ isMedium, isExtraLarge }) => {
      gsap.registerPlugin(ScrollTrigger);

      if (containerRef.current) {
        const textSplitterConfig: Partial<SplitTypeOptions> = {
          types: 'chars,lines',
        };

        // container pin area
        let endContainerPin = '-=50%';

        if (isExtraLarge) {
          endContainerPin = '-=100%';
        } else if (isMedium) {
          endContainerPin = 'center';
        }

        ScrollTrigger.create({
          trigger: '.paragraph-container',
          start: 'top top',
          end: `bottom ${endContainerPin}`,
          pin: true,
        });

        // first text animation area
        const firstText = textSplitter(
          '.first-text',
          containerRef.current,
          textSplitterConfig,
        );

        const firstTextTimeline = sequenceAnimation(firstText);

        let endFirstTextEnter = 'top';

        if (isExtraLarge) {
          endFirstTextEnter = '-=50%';
        }

        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.first-text',
              start: 'top 60%',
              end: `top ${endFirstTextEnter}`,
              toggleActions: 'play none none reverse',
              scrub: isExtraLarge,
            },
          })
          .add(firstTextTimeline.play())
          .from(
            '.first-text',
            {
              xPercent: 50,
              duration: firstTextTimeline.totalDuration(),
            },
            '<',
          );

        // second text animation area
        const secondText = textSplitter(
          '.second-text',
          containerRef.current,
          textSplitterConfig,
        );

        const secondTextTimeline = sequenceAnimation(secondText, {
          from: 'top',
        });

        let startSecondTextEnter = '60%';
        let endSecondTextEnter = 'top';

        if (isExtraLarge) {
          startSecondTextEnter = 'center';
          endSecondTextEnter = '-=150%';
        } else if (isMedium) {
          startSecondTextEnter = 'center';
        }

        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.second-text',
              start: `top ${startSecondTextEnter}`,
              end: `top ${endSecondTextEnter}`,
              toggleActions: 'play none none reverse',
              scrub: true,
            },
          })
          .add(secondTextTimeline.play());

        let startSecondTextMovement = '60%';
        let endSecondTextMovement = '-=150%';

        if (isExtraLarge) {
          startSecondTextMovement = 'center';
        } else if (isMedium) {
          startSecondTextMovement = 'center';
          endSecondTextMovement = '-=200%';
        }

        gsap.fromTo(
          '.second-text',
          { xPercent: 110 },
          {
            xPercent: isExtraLarge ? -1 : -300,
            duration: secondTextTimeline.totalDuration(),
            scrollTrigger: {
              trigger: '.second-text',
              start: `top ${startSecondTextMovement}`,
              end: `top ${endSecondTextMovement}`,
              toggleActions: 'play none none reverse',
              scrub: true,
            },
          },
        );
      }
    },
    {
      dependencies: [],
      scope: containerRef,
    },
  );

  return (
    <section ref={containerRef} className="my-16 overflow-hidden px-8 md:px-20">
      <p className="paragraph-container flex h-[100vh] max-h-[1600px] w-full flex-col justify-center">
        <span className="first-text font-tusker-grotesk-semibold text-6xl !leading-tight md:text-7xl lg:text-8xl xl:mt-24">
          MAKE YOUR <br className="md:hidden" />
          DREAM WEBSITE...
        </span>

        <span className="second-text whitespace-nowrap font-tusker-grotesk-medium text-[14rem] xl:text-[14.5rem] 2xl:text-[16rem]">
          INTO A REALITY
        </span>
      </p>
    </section>
  );
}
