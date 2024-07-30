'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import TextReveal from '@/components/TextReveal';
import useEvent from '@/hooks/useEvent';
import Time from './Time';

gsap.registerPlugin(useGSAP);

export default function Cover() {
  const { subscribe } = useEvent('timeline@loading');
  const { publish } = useEvent('timeline@cover-opening');
  const titleTimelineRef = useRef<GSAPTimeline>();
  const timeTimelineRef = useRef<GSAPTimeline>();
  const roleTimelineRef = useRef<GSAPTimeline[]>([]);

  const addRoleTimelineRef = (timeline: GSAPTimeline) =>
    roleTimelineRef.current.push(timeline);

  const addNestedTimline = (mainTimeline: GSAPTimeline) => {
    roleTimelineRef.current.forEach((nestedTimeline) => {
      mainTimeline.add(nestedTimeline.play(), '<10%');
    });
  };

  useGSAP(
    () =>
      subscribe(() => {
        setTimeout(() => {
          const timeline = gsap.timeline();

          timeline
            .add(titleTimelineRef?.current?.play() ?? '')
            .add(timeTimelineRef?.current?.play() ?? '', '<80%');

          addNestedTimline(timeline);

          timeline.call(publish);
        }, 400);
      }),
    [],
  );

  return (
    <section className="flex h-svh max-h-highest flex-col justify-end gap-10 px-8 pt-16 md:items-center md:px-20 md:pt-36 xl:h-svh">
      <TextReveal
        className="md:mt-auto"
        type="upwards"
        timelineRef={titleTimelineRef}
      >
        <h1 className="font-tusker-grotesk-medium text-7xl leading-tight md:text-6xl md:leading-relaxed lg:text-7xl xl:text-6xl">
          HELLO, <br className="md:hidden" />
          I'M ATTAR
        </h1>
      </TextReveal>

      <div className="flex w-full flex-col-reverse justify-between gap-6 py-8 md:mt-auto md:flex-row md:items-end md:py-10 md:text-lg lg:py-12 lg:text-xl xl:py-5 xl:text-lg">
        <TextReveal type="slider" timelineRef={timeTimelineRef}>
          <Time />
        </TextReveal>

        <ul className="text-lg md:text-end">
          <li>
            <TextReveal type="slider" timelineRef={addRoleTimelineRef}>
              <span>UI Designer</span>
            </TextReveal>
          </li>
          <li>
            <TextReveal type="slider" timelineRef={addRoleTimelineRef}>
              <span>Front-end Developer</span>
            </TextReveal>
          </li>
          <li>
            <TextReveal type="slider" timelineRef={addRoleTimelineRef}>
              <span>Back-end Developer</span>
            </TextReveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
