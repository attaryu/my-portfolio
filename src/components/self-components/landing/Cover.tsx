'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { SplitTypeOptions } from 'split-type';

import useEvent from '@/hooks/useEvent';
import sequenceAnimation from '@/utils/text-animation/sequence';
import wipeAnimation from '@/utils/text-animation/wipe';
import textSplitter from '@/utils/textSplitter';
import Time from './Time';

gsap.registerPlugin(useGSAP);

export default function Cover() {
  const { subscribe } = useEvent('loadingAnimation@end');
  const { publish } = useEvent('cover-opening@end');
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    if (containerRef.current) {
      const titleText = textSplitter('.title', containerRef.current, {
        types: 'chars,lines',
      });

      const options: Partial<SplitTypeOptions> = {
        types: 'lines',
      };

      const timeText = textSplitter('.time', containerRef.current, options);
      const firstRoleText = textSplitter(
        '.role-1',
        containerRef.current,
        options,
      );
      const secondRoleText = textSplitter(
        '.role-2',
        containerRef.current,
        options,
      );
      const thirdRoleText = textSplitter(
        '.role-3',
        containerRef.current,
        options,
      );

      return subscribe(() => {
        setTimeout(() => {
          gsap
            .timeline()
            .add(sequenceAnimation(titleText, { from: 'top' }).play())
            .add(wipeAnimation(timeText).play(), '<20%')
            .add(wipeAnimation(firstRoleText).play(), '<20%')
            .add(wipeAnimation(secondRoleText).play(), '<20%')
            .add(wipeAnimation(thirdRoleText).play(), '<20%')
            .call(publish);
        }, 400);
      });
    }
  }, []);

  return (
    <section
      className="flex h-svh max-h-highest flex-col justify-end gap-10 px-8 pt-28 md:items-center md:px-20 md:pt-40 lg:pt-52 xl:h-svh xl:pt-44"
      ref={containerRef}
    >
      <h1 className="title mt-auto font-tusker-grotesk-medium text-7xl !leading-tight md:text-6xl lg:text-7xl xl:text-6xl">
        HELLO, <br className="md:hidden" />
        I'M ATTAR
      </h1>

      <div className="flex w-full flex-col-reverse justify-between gap-6 py-8 md:mt-auto md:flex-row md:items-end md:py-10 md:text-lg lg:py-12 lg:text-xl xl:py-5 xl:text-lg">
        <Time />

        <ul className="text-lg md:text-end lg:text-2xl xl:text-xl">
          <li className="role-1">UI Designer</li>
          <li className="role-2">Front-end Developer</li>
          <li className="role-3">Back-end Developer</li>
        </ul>
      </div>
    </section>
  );
}
